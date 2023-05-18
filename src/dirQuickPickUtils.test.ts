import * as fs from 'fs'
import { describe, expect, test, jest } from '@jest/globals'
import { QuickInputButtons } from 'vscode'

import { getDirQuickPickCommonProps } from './dirQuickPickUtils'

const parentDir = {
  buttons: [],
  isDirectory: true,
  label: '$(folder) ..',
  uri: 'a/b',
}

const splitHorizontalButton = {
  iconPath: {
    iconName: 'split-horizontal',
  },
  tooltip: 'Open to the side',
}

describe('getDirQuickPickCommonProps()', () => {
  test('show only the parent dir when no files are present', () => {
    const currentDirPath = 'a/b/c'
    const history = [currentDirPath]
    const props = getDirQuickPickCommonProps(history, [])

    expect(props).toMatchObject({
      title: currentDirPath,
      value: '',
      buttons: [],
      items: [parentDir],
    })
  })

  test('do not show the parent dir if the root dir has been reached', () => {
    const currentDirPath = '/'
    const history = [currentDirPath]
    const props = getDirQuickPickCommonProps(history, [])

    expect(props).toMatchObject({
      title: currentDirPath,
      value: '',
      buttons: [],
      items: [],
    })
  })

  test('show the back button if there is history', () => {
    const currentDirPath = 'a/b/c'
    const history = ['a/b', currentDirPath]
    const props = getDirQuickPickCommonProps(history, [])

    expect(props).toMatchObject({
      title: currentDirPath,
      value: '',
      buttons: [QuickInputButtons.Back],
      items: [parentDir],
    })
  })

  test('show parent dir and list of files/directories in current directory', () => {
    const currentDirPath = 'a/b/c'
    const history = [currentDirPath]
    const props = getDirQuickPickCommonProps(history, mockDirentArray(['file1.txt', 'file2.txt', 'dir1/', 'dir2/']))

    expect(props).toMatchObject({
      title: currentDirPath,
      value: '',
      items: [
        parentDir,
        {
          buttons: [splitHorizontalButton],
          isDirectory: false,
          label: '$(list-selection) file1.txt',
          uri: 'a/b/c/file1.txt',
        },
        {
          buttons: [splitHorizontalButton],
          isDirectory: false,
          label: '$(list-selection) file2.txt',
          uri: 'a/b/c/file2.txt',
        },
        {
          buttons: [],
          isDirectory: true,
          label: '$(folder) dir1',
          uri: 'a/b/c/dir1',
        },
        {
          buttons: [],
          isDirectory: true,
          label: '$(folder) dir2',
          uri: 'a/b/c/dir2',
        },
      ],
    })
  })
})

function mockDirent(isFile: boolean, name: string): fs.Dirent {
  return {
    isBlockDevice: jest.fn().mockReturnValue(false),
    isCharacterDevice: jest.fn().mockReturnValue(false),
    isDirectory: jest.fn().mockReturnValue(!isFile),
    isFIFO: jest.fn().mockReturnValue(false),
    isFile: jest.fn().mockReturnValue(isFile),
    isSocket: jest.fn().mockReturnValue(false),
    isSymbolicLink: jest.fn().mockReturnValue(false),
    name,
  } as fs.Dirent
}

function mockDirentArray(items: string[]): fs.Dirent[] {
  return items.map((item) => {
    const isFile = !item.endsWith('/')
    const name = isFile ? item : item.slice(0, -1)
    return mockDirent(isFile, name)
  })
}
