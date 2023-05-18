import * as vscode from 'vscode'
import * as path from 'path'

import { createDirQuickPick } from './dirQuickPick'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('relativeFileNavigator.open', async () => {
    const currentEditor = vscode.window.activeTextEditor
    const currentFilePath = currentEditor?.document.uri.fsPath

    if (currentFilePath) {
      const currentDirPath = path.dirname(currentFilePath)
      await createDirQuickPick(currentDirPath, context.globalState)
    } else {
      await vscode.window.showErrorMessage(vscode.l10n.t('No file open in the editor'))
    }
  })
  context.subscriptions.push(disposable)
}

export function deactivate() {}
