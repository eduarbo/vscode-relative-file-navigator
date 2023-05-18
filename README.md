# Relative File Navigator

[![Version](https://img.shields.io/visual-studio-marketplace/v/eduarbo.relative-file-navigator)](https://marketplace.visualstudio.com/items?itemName=eduarbo.relative-file-navigator)
[![License](https://img.shields.io/github/license/eduarbo/vscode-relative-file-navigator)](https://github.com/eduarbo/vscode-relative-file-navigator/blob/main/LICENSE)
[![Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/eduarbo.relative-file-navigator?label=Marketplace%20Installs)](https://marketplace.visualstudio.com/items?itemName=eduarbo.relative-file-navigator)
[![Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/eduarbo.relative-file-navigator?label=Marketplace%20Downloads)](https://marketplace.visualstudio.com/items?itemName=eduarbo.relative-file-navigator)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/eduarbo/relative-file-navigator?label=Open%20VSX%20Downloads)](https://open-vsx.org/extension/eduarbo/relative-file-navigator)

Relative File Navigator is a VSCode extension that allows you to easily access and open files located in the same directory as the currently open file. This comes in handy when you're working on a file and need to access related files, such as navigating between style and implementation files in a component-based project.

## Features

- Quickly browse and open files in the same directory as the currently open file, it's perfect for navigating between related files in component-based projects
- `Back` button for navigaing to previously opened folders

![Relative File Navigator Extension Demo](https://github.com/eduarbo/vscode-relative-file-navigator/assets/335073/d27376b7-f5ea-4e3f-afff-94f1fb165fff)

### Available Commands

* `relativeFileNavigator.open`: Open Relative File Navigator - Open a Quick Pick dialog showing the files and directories in the same directory as the current file

## Installation

Relative File Navigator can be installed via the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=eduarbo.relative-file-navigator) or [Open VSX Registry](https://open-vsx.org/extension/eduarbo/relative-file-navigator).

## Usage

1. With a file open in the editor, press `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS) to open the Command Palette
2. Type `Open Relative File Navigator` and press `Enter`
3. A quick pick dialog will appear, showing you the files and directories in the same directory as the current file
4. Navigate through directories or open a file

## TODO
- [X] Add [localization](https://github.com/microsoft/vscode-l10n)
- [X] Add spanish translations
- [X] [Bundle extension](https://aka.ms/vscode-bundle-extension)
- [X] Add tests
- [ ] Add button and command to group directories and display them to the top
- [ ] Add button to reset history and go to the directory of the currently open file
- [ ] Display file-type icons (not possible for now, keep an eye on: https://github.com/microsoft/vscode/issues/59826)

## Contributing

If you have any suggestions or find any bugs, please feel free to create an issue or submit a pull request.

## License

- Licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/eduarbo/vscode-relative-file-navigator/main/LICENSE) file for details.
- [Icon](assets/icon.png) made by <a href="https://www.flaticon.com/free-icons/html" title="html icons">Freepik - Flaticon</a>.

## Changelog

For the latest updates and changes, please see the [CHANGELOG](CHANGELOG.md) file.

## Support

If you like this extension and want to support its development, please consider giving it a rating on the Visual Studio Code Marketplace or sharing it with your friends and colleagues. Your support is greatly appreciated!
