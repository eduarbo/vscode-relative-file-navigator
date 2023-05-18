import * as vscode from 'vscode'
import * as fs from 'fs'
import { ThemeIcons } from 'vscode-ext-codicons'

import { getDirQuickPickCommonProps, getCurrentDirPathFromHistory } from './dirQuickPickUtils'

type FileItem = {
  label: string
  uri: vscode.Uri
  isDirectory: boolean
  description?: string
  detail?: string
}

export async function createDirQuickPick(directoryPath: string) {
  const quickPick = vscode.window.createQuickPick<FileItem>()
  const history: string[] = [directoryPath]

  const changeDirectory = async (props?: Partial<vscode.QuickPick<FileItem>>) => {
    try {
      const currentDirPath = getCurrentDirPathFromHistory(history)
      const files = await fs.promises.readdir(currentDirPath, { withFileTypes: true })
      const commonProps = getDirQuickPickCommonProps(history, files)

      Object.assign(quickPick, commonProps, props)
    } catch (error) {
      await handleError(vscode.l10n.t('Error reading directory'))
    }
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
      history.pop()
      await changeDirectory()
    }
  })

  quickPick.onDidChangeSelection(async ([selectedItem]) => {
    if (!selectedItem) return

    if (selectedItem.isDirectory) {
      history.push(selectedItem.uri.fsPath)
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
