import * as vscode from 'vscode'
import * as path from 'path'
import { browseDirectoryQuickPick } from './browseDirectoryQuickPick'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('relativeFileNavigator.open', async () => {
    const currentEditor = vscode.window.activeTextEditor
    const currentFilePath = currentEditor?.document.uri.fsPath
    if (currentFilePath) {
      const currentDirectoryPath = path.dirname(currentFilePath)
      await browseDirectoryQuickPick(currentDirectoryPath, [])
    } else {
      await vscode.window.showErrorMessage(vscode.l10n.t('No file open in the editor'))
    }
  })

  context.subscriptions.push(disposable)
}

export function deactivate() {}
