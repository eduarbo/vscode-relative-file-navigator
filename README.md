# Relative File Navigator

[![Version](https://img.shields.io/visual-studio-marketplace/v/eduarbo.relative-file-navigator)](https://marketplace.visualstudio.com/items?itemName=eduarbo.relative-file-navigator)
[![License](https://img.shields.io/github/license/eduarbo/vscode-relative-file-navigator)](https://github.com/eduarbo/vscode-relative-file-navigator/blob/main/LICENSE)
[![Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/eduarbo.relative-file-navigator?label=Marketplace%20Installs)](https://marketplace.visualstudio.com/items?itemName=eduarbo.relative-file-navigator)
[![Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/eduarbo.relative-file-navigator?label=Marketplace%20Downloads)](https://marketplace.visualstudio.com/items?itemName=eduarbo.relative-file-navigator)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/eduarbo/relative-file-navigator?label=Open%20VSX%20Downloads)](https://open-vsx.org/extension/eduarbo/relative-file-navigator)

Relative File Navigator is a VS Code extension that allows you to easily access and open files located in the same directory as the currently open file. This comes in handy when you're working on a file and need to access related files, such as navigating between style and implementation files in a component-based project.

## Features

- Quickly browse and open files in the same directory as the currently open file, it's perfect for navigating between related files in component-based projects
  > ![Relative File Navigator Extension - Demo](https://github.com/eduarbo/vscode-relative-file-navigator/assets/335073/64147557-4208-4a33-a1a1-692bfa51c6c0)

- Back button for navigating to previously opened folders
  > ![Relative File Navigator Extension - Demo Back Button](https://github.com/eduarbo/vscode-relative-file-navigator/assets/335073/9e94a02b-ae61-4796-b53e-fcd8e5e6f700)

- Toggle button to group directories at the top of the list, your selection persists across VS Code restarts for a consistent navigation experience
  > ![Relative File Navigator Extension - Demo Group Directories Button](https://github.com/eduarbo/vscode-relative-file-navigator/assets/335073/c58dac58-5bc8-4ed6-a018-3a0beee6b273)

- Open files to the side using the split button on each file entry

- Files and directories matching your `files.exclude` settings are automatically hidden

### Available Commands

* `relativeFileNavigator.open`: Open Relative File Navigator - Open a Quick Pick dialog showing the files and directories in the same directory as the current file

### Keyboard Shortcuts

| Shortcut | macOS | Description |
|----------|-------|-------------|
| `Ctrl+Shift+.` | `Cmd+Shift+.` | Open Relative File Navigator |

## Installation

Relative File Navigator can be installed via the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=eduarbo.relative-file-navigator) or [Open VSX Registry](https://open-vsx.org/extension/eduarbo/relative-file-navigator).

## Usage

1. Press `Ctrl+Shift+.` (`Cmd+Shift+.` on macOS) to open the navigator, or use the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and type `Open Relative File Navigator`
2. A quick pick dialog will appear, showing you the files and directories in the same directory as the current file
3. Navigate through directories or open a file

> **Note:** Display of file-type icons is not yet supported by the VS Code QuickPick API. See [microsoft/vscode#59826](https://github.com/microsoft/vscode/issues/59826) for progress.

## Contributing

If you have any suggestions or find any bugs, please feel free to create an issue or submit a pull request.

## License

- Licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/eduarbo/vscode-relative-file-navigator/main/LICENSE) file for details.
- [Icon](assets/icon.png) made by <a href="https://www.flaticon.com/free-icons/html" title="html icons">Freepik - Flaticon</a>.

## Changelog

For the latest updates and changes, please see the [CHANGELOG](CHANGELOG.md) file.

## Support

If you like this extension and want to support its development, please consider giving it a rating on the Visual Studio Code Marketplace or sharing it with your friends and colleagues. Your support is greatly appreciated!
