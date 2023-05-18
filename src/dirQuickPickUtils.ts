import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'
import { ThemeIcons, codicons } from 'vscode-ext-codicons'

export type DirQuickPickOptions = {
  groupDirectories: boolean
  files: fs.Dirent[]
  history: string[]
}

export type FileItem = {
  label: string
  uri: vscode.Uri
  isDirectory: boolean
  description?: string
  detail?: string
}

const groupDirectoriesButton = {
  iconPath: ThemeIcons.group_by_ref_type,
  tooltip: vscode.l10n.t('Group directories at the top'),
}

const ungroupDirectoriesButton = {
  iconPath: ThemeIcons.ungroup_by_ref_type,
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
