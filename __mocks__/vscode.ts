import { jest } from '@jest/globals'

enum QuickInputButtonsEnum {
  Back,
  // Add other buttons as needed
}

export const l10n = {
  t: jest.fn().mockImplementation((key) => key),
}

export const Uri = {
  file: (f: any) => f,
  parse: jest.fn(),
}

export const ThemeIcon = jest.fn().mockImplementation((iconName) => {
  return { iconName: iconName }
})

export const QuickInputButtons = QuickInputButtonsEnum
