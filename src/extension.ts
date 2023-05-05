import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'
import { ThemeIcons, codicons } from 'vscode-ext-codicons'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('relativeFileNavigator.open', async () => {
    const currentEditor = vscode.window.activeTextEditor
    const currentFilePath = currentEditor?.document.uri.fsPath
    if (currentFilePath) {
      const currentDirectoryPath = path.dirname(currentFilePath)
      await showFilesInDirectory(currentDirectoryPath, [])
    } else {
      await vscode.window.showErrorMessage(vscode.l10n.t('No file open in the editor'))
    }
  })

  context.subscriptions.push(disposable)
}

type FileItem = {
  label: string
  uri: vscode.Uri
  isDirectory: boolean
  description?: string
  detail?: string
}

async function showFilesInDirectory(directoryPath: string, history: string[]) {
  const quickPick = vscode.window.createQuickPick<FileItem>()
  quickPick.placeholder = vscode.l10n.t('Select a file or directory')

  try {
    const files = await fs.promises.readdir(directoryPath, { withFileTypes: true })
    const items = files.map((file) => {
      const isDirectory = file.isDirectory()
      // List of ThemeIcon ids that can be rendered inside labels and descriptions:
      // https://code.visualstudio.com/api/references/icons-in-labels#icon-listing
      const icon = isDirectory ? codicons.folder : codicons.list_selection
      const label = `${icon} ${file.name}`
      // TODO use fs.state to bring the file size and other useful data that
      // can be displayed in `description` or `detail` props. Just take into
      // account that this could increase the load time
      const uri = vscode.Uri.file(path.join(directoryPath, file.name))
      // const buttons = !isDirectory ? [new vscode.ThemeIcon('split-horizontal')] : []
      const buttons = !isDirectory
        ? [{ iconPath: ThemeIcons.split_horizontal, tooltip: vscode.l10n.t('Open to the side') }]
        : []

      return { label, uri, isDirectory, buttons }
    })

    // Add the parent directory if the current directory is not the root directory
    const parentDirectoryPath = path.dirname(directoryPath)
    if (parentDirectoryPath !== directoryPath) {
      items.unshift({
        label: `${codicons.folder} ..`,
        isDirectory: true,
        uri: vscode.Uri.file(parentDirectoryPath),
        buttons: [],
      })
    }

    quickPick.title = directoryPath
    quickPick.items = items
    quickPick.buttons = history.length ? [vscode.QuickInputButtons.Back] : []

    quickPick.onDidTriggerItemButton(async ({ button, item }) => {
      if (button.iconPath === ThemeIcons.split_horizontal) {
        await openFile(item.uri, {
          viewColumn: vscode.ViewColumn.Beside,
        })
      }
    })

    quickPick.onDidTriggerButton(async (button) => {
      if (button === vscode.QuickInputButtons.Back) {
        const previousDirectoryPath = history.pop() ?? ''
        await showFilesInDirectory(previousDirectoryPath, history)
      }
    })

    quickPick.onDidChangeSelection(async ([selectedItem]) => {
      if (selectedItem) {
        if (selectedItem.isDirectory) {
          await showFilesInDirectory(selectedItem.uri.fsPath, [...history, directoryPath])
        } else {
          await openFile(selectedItem.uri)
        }
      }
    })

    quickPick.onDidHide(() => quickPick.dispose())
    quickPick.show()
  } catch (error: unknown) {
    await handleError(vscode.l10n.t('Error reading directory'), error)
  }
}

async function openFile(filePath: vscode.Uri, options?: vscode.TextDocumentShowOptions) {
  try {
    await vscode.window.showTextDocument(filePath, options)
  } catch (error: unknown) {
    await handleError(vscode.l10n.t('Error opening the file'), error)
  }
}

async function handleError(message: string, error: unknown) {
  const errorMessage = error instanceof Error ? `${message}: ${error.message}` : message
  await vscode.window.showErrorMessage(errorMessage)
}

export function deactivate() {}
