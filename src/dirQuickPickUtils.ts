import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'

export type DirQuickPickOptions = {
  groupDirectories: boolean
  files: fs.Dirent[]
  history: string[]
}

export type FileItem = vscode.QuickPickItem & {
  uri: vscode.Uri
  isDirectory: boolean
  buttons: vscode.QuickInputButton[]
}

const groupDirectoriesButton: vscode.QuickInputButton = {
  iconPath: new vscode.ThemeIcon('group-by-ref-type'),
  tooltip: vscode.l10n.t('Group directories at the top'),
}

const ungroupDirectoriesButton: vscode.QuickInputButton = {
  iconPath: new vscode.ThemeIcon('ungroup-by-ref-type'),
  tooltip: vscode.l10n.t('Sort files and directories alphabetically'),
}

export function getDirQuickPickCommonProps(options: DirQuickPickOptions) {
  const { groupDirectories, history } = options
  const dirPath = getCurrentDirPathFromHistory(history)
  const showBackButton = history.length > 1
  const buttons = []
  const items = getItems(dirPath, options)

  if (showBackButton) {
    buttons.push(vscode.QuickInputButtons.Back)
  }

  buttons.push(groupDirectories ? ungroupDirectoriesButton : groupDirectoriesButton)

  return {
    title: dirPath,
    value: '',
    buttons,
    items,
  }
}

export function getCurrentDirPathFromHistory(history: string[]) {
  return history.slice(-1)[0]
}

function getItems(dirPath: string, options: DirQuickPickOptions): FileItem[] {
  const { files } = options
  const items = files.map((file) => {
    const isDirectory = file.isDirectory()
    const icon = isDirectory ? '$(folder)' : '$(list-selection)'
    const label = `${icon} ${file.name}`
    const uri = vscode.Uri.file(path.join(dirPath, file.name))
    const buttons: vscode.QuickInputButton[] = !isDirectory
      ? [{ iconPath: new vscode.ThemeIcon('split-horizontal'), tooltip: vscode.l10n.t('Open to the side') }]
      : []

    return { label, uri, isDirectory, buttons }
  })

  // Add the parent directory if the current one is not the root
  const parentDirectoryPath = path.dirname(dirPath)

  if (parentDirectoryPath !== dirPath) {
    items.unshift({
      label: '$(folder) ..',
      isDirectory: true,
      uri: vscode.Uri.file(parentDirectoryPath),
      buttons: [],
    })
  }

  return arrangeDirQuickPickItems(items, options)
}

function arrangeDirQuickPickItems(items: FileItem[], options: DirQuickPickOptions) {
  const { groupDirectories } = options

  if (groupDirectories) {
    const sortedItems = [...items]

    sortedItems.sort((a, b) => {
      if (a.isDirectory === b.isDirectory) {
        return 0
      }
      return a.isDirectory ? -1 : 1
    })

    return sortedItems
  }

  return items
}
