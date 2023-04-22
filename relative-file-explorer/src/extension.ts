import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('relativeFileExplorer.open', async () => {
    const currentEditor = vscode.window.activeTextEditor
    if (currentEditor) {
      const currentFilePath = currentEditor.document.uri.fsPath
      const currentDirectoryPath = path.dirname(currentFilePath)
      await showFilesInDirectory(currentDirectoryPath)
    } else {
      await vscode.window.showErrorMessage('No hay archivo abierto en el editor')
    }
  })

  context.subscriptions.push(disposable)
}

async function showFilesInDirectory(directoryPath: string) {
  const files = await fs.promises.readdir(directoryPath, { withFileTypes: true })
  try {
    const items = files.map((file) => {
      const label = file.name
      const description = file.isDirectory() ? 'Dir' : 'Archivo'
      const uri = vscode.Uri.file(path.join(directoryPath, file.name))

      return { label, description, uri, file }
    })

    const selectedItem = await vscode.window.showQuickPick(items, {
      placeHolder: 'Selecciona un archivo o directorio',
    })

    if (selectedItem) {
      if (selectedItem.file.isDirectory()) {
        await showFilesInDirectory(selectedItem.uri.fsPath)
      } else {
        await openFile(selectedItem.uri)
      }
    }
  } catch (error) {
    await handleError('Error al leer el directorio', error)
  }
}

async function openFile(filePath: vscode.Uri) {
  try {
    const doc = await vscode.workspace.openTextDocument(filePath)
    await vscode.window.showTextDocument(doc)
  } catch (error: unknown) {
    await handleError('Error al abrir el archivo', error)
  }
}

async function handleError(message: string, error: unknown) {
    const errorMessage = error instanceof Error ? `${message}: ${error.message}` : message
    await vscode.window.showErrorMessage(errorMessage)
}

export function deactivate() {}
