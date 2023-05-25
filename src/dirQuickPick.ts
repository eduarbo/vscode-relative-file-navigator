import * as vscode from 'vscode'
import * as fs from 'fs'
import * as micromatch from 'micromatch'
import { ThemeIcons } from 'vscode-ext-codicons'

import { getDirQuickPickCommonProps, getCurrentDirPathFromHistory } from './dirQuickPickUtils'
import type { DirQuickPickOptions, FileItem } from './dirQuickPickUtils'

export async function createDirQuickPick(directoryPath: string, globalState: vscode.Memento) {
  const quickPick = vscode.window.createQuickPick<FileItem>()
  const dirQuickOptions: DirQuickPickOptions = {
    history: [directoryPath],
    files: [],
    groupDirectories: globalState.get('groupDirectories', false),
  }

  const changeDirectory = async (props?: Partial<vscode.QuickPick<FileItem>>) => {
    try {
      const currentDirPath = getCurrentDirPathFromHistory(dirQuickOptions.history)
      const allFiles = await fs.promises.readdir(currentDirPath, { withFileTypes: true })

      // Get the exclude settings from VS Code's configuration
      const excludeSettings = vscode.workspace.getConfiguration('files').get('exclude') as { [key: string]: boolean }

      // Filter files/directories based on the exclude settings
      dirQuickOptions.files = allFiles.filter((file) => {
        const filePath = vscode.Uri.file(`${currentDirPath}/${file.name}`).fsPath

        // If any of the exclude patterns match, we exclude this file/directory
        let isExcluded = false
        Object.entries(excludeSettings).forEach(([pattern, shouldExclude]) => {
          if (shouldExclude && micromatch.isMatch(filePath, pattern)) {
            isExcluded = true
          }
        })

        // If none of the patterns matched, this file/directory is included
        return !isExcluded
      })

      const commonProps = getDirQuickPickCommonProps(dirQuickOptions)
      Object.assign(quickPick, commonProps, props)
    } catch (error) {
      await handleError(vscode.l10n.t('Error reading directory'))
    }
  }

  const toggleGroupDirectories = async () => {
    dirQuickOptions.groupDirectories = !dirQuickOptions.groupDirectories
    await globalState.update('groupDirectories', dirQuickOptions.groupDirectories)
    const commonProps = getDirQuickPickCommonProps(dirQuickOptions)
    Object.assign(quickPick, commonProps)
  }

  await changeDirectory({
    placeholder: vscode.l10n.t('Select a file or directory'),
  })

  quickPick.onDidTriggerItemButton(async ({ button, item }) => {
    if (button.iconPath === ThemeIcons.split_horizontal) {
      await openFile(item.uri, {
        viewColumn: vscode.ViewColumn.Beside,
      })
    }
  })

  quickPick.onDidTriggerButton(async (button) => {
    if (button === vscode.QuickInputButtons.Back) {
      dirQuickOptions.history.pop()
      await changeDirectory()
    }
    if (button.iconPath === ThemeIcons.group_by_ref_type || button.iconPath === ThemeIcons.ungroup_by_ref_type) {
      await toggleGroupDirectories()
    }
  })

  quickPick.onDidChangeSelection(async ([selectedItem]) => {
    if (!selectedItem) return

    if (selectedItem.isDirectory) {
      dirQuickOptions.history.push(selectedItem.uri.fsPath)
      await changeDirectory()
    } else {
      await openFile(selectedItem.uri)
    }
  })

  quickPick.onDidHide(() => {
    quickPick.dispose()
  })
  quickPick.show()
}

async function openFile(filePath: vscode.Uri, options?: vscode.TextDocumentShowOptions) {
  try {
    await vscode.window.showTextDocument(filePath, options)
  } catch (error: unknown) {
    await handleError(vscode.l10n.t('Error opening the file'))
  }
}

async function handleError(message: string, error?: unknown) {
  await vscode.window.showErrorMessage(error instanceof Error ? error.message : message)
}
