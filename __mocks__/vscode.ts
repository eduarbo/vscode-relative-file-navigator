import type { PathLike } from 'fs'
import type { FileHandle } from 'fs/promises'
import { jest } from '@jest/globals'

enum QuickInputButtonsEnum {
  Back,
  // Add other buttons as needed
}

export const l10n = {
  t: jest.fn().mockImplementation((key) => key),
}

export const Uri = {
  file: (f: PathLike | FileHandle): PathLike | FileHandle => f,
  parse: jest.fn(),
}

export const ThemeIcon = jest.fn().mockImplementation((iconName) => ({ iconName }))

export const QuickInputButtons = QuickInputButtonsEnum
