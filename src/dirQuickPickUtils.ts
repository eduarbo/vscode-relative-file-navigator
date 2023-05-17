import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'
import { ThemeIcons, codicons } from 'vscode-ext-codicons'

export function getDirQuickPickCommonProps(history: string[], currentDirfiles: fs.Dirent[]) {
  const dirPath = getCurrentDirPathFromHistory(history)
  const showBackButton = history.length > 1

  return {
    title: dirPath,
    value: '',
    buttons: showBackButton ? [vscode.QuickInputButtons.Back] : [],
    items: getItems(dirPath, currentDirfiles),
  }
}

export function getCurrentDirPathFromHistory(history: string[]) {
  return history.slice(-1)[0]
}

function getItems(dirPath: string, files: fs.Dirent[]) {
  const items = files.map((file) => {
    const isDirectory = file.isDirectory()
    // List of ThemeIcon ids that can be rendered inside labels and descriptions:
    // https://code.visualstudio.com/api/references/icons-in-labels#icon-listing
    const icon = isDirectory ? codicons.folder : codicons.list_selection
    const label = `${icon} ${file.name}`
    // TODO use fs.state to bring the file size and other useful data that
    // can be displayed in `description` or `detail` props. Just take into
    // account that this could increase the load time
    const uri = vscode.Uri.file(path.join(dirPath, file.name))
    // const buttons = !isDirectory ? [new vscode.ThemeIcon('split-horizontal')] : []
    const buttons = !isDirectory
      ? [{ iconPath: ThemeIcons.split_horizontal, tooltip: vscode.l10n.t('Open to the side') }]
      : []

    return { label, uri, isDirectory, buttons }
  })

  // Add the parent directory if the current one is not the root
  const parentDirectoryPath = path.dirname(dirPath)

  if (parentDirectoryPath !== dirPath) {
    items.unshift({
      label: `${codicons.folder} ..`,
      isDirectory: true,
      uri: vscode.Uri.file(parentDirectoryPath),
      buttons: [],
    })
  }

  return items
}
