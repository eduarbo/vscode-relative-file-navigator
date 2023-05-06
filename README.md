# Relative File Navigator

[![Version](https://img.shields.io/visual-studio-marketplace/v/eduarbo.relative-file-navigator)](https://marketplace.visualstudio.com/items?itemName=eduarbo.relative-file-navigator)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/eduarbo.relative-file-navigator)](https://marketplace.visualstudio.com/items?itemName=eduarbo.relative-file-navigator)
[![License](https://img.shields.io/github/license/eduarbo/vscode-relative-file-navigator)](https://github.com/eduarbo/vscode-relative-file-navigator/blob/main/LICENSE)

Relative File Navigator is a VSCode extension that allows you to easily access and open files located in the same directory as the currently open file. This comes in handy when you're working on a file and need to access related files, such as navigating between style and implementation files in a component-based project.

## Features

- Quickly browse and open files in the same directory as the currently open file, it's perfect for navigating between related files in component-based projects
- `Back` button for navigaing to previously opened folders

<video src="https://user-images.githubusercontent.com/335073/236550674-32b2edb1-5eef-4ff7-9615-7a15d6fbb643.mp4" controls title="Relative File Navigator extension Demo"></video>

### Available Commands

* `relativeFileNavigator.open`: Open Relative File Navigator - Open a Quick Pick dialog showing the files and directories in the same directory as the current file

## Installation

Relative File Navigator can be installed via the VS Code [Marketplace](https://marketplace.visualstudio.com/items?itemName=eduarbo.relative-file-navigator).

## Usage

1. With a file open in the editor, press `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS) to open the Command Palette
2. Type `Open Relative File Navigator` and press `Enter`
3. A quick pick dialog will appear, showing you the files and directories in the same directory as the current file
4. Navigate through directories or open a file

## TODO
- [X] Add [localization](https://github.com/microsoft/vscode-l10n)
- [ ] [Bundle extension](https://aka.ms/vscode-bundle-extension)
- [ ] Display file-type icons (not possible for now, keep an eye on: https://github.com/microsoft/vscode/issues/59826)
- [ ] Add tests
- [ ] Add option to group folders and move them to the top

## Contributing

If you have any suggestions or find any bugs, please feel free to create an issue or submit a pull request.

## License

- Licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/eduarbo/vscode-relative-file-navigator/main/LICENSE) file for details.
- [Icon](assets/icon.png) made by <a href="https://www.flaticon.com/free-icons/html" title="html icons">Freepik - Flaticon</a>.

## Changelog

For the latest updates and changes, please see the [CHANGELOG](CHANGELOG.md) file.

## Support

If you like this extension and want to support its development, please consider giving it a rating on the Visual Studio Code Marketplace or sharing it with your friends and colleagues. Your support is greatly appreciated!
