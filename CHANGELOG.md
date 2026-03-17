# Change Log

All notable changes to this extension are documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [1.0.0] - 2026-03-17

### Added
- Default keyboard shortcut: `Ctrl+Shift+.` (`Cmd+Shift+.` on macOS)

### Changed
- Replaced `vscode-ext-codicons` dependency with native VS Code `ThemeIcon` API, reducing bundle size
- Moved `@vscode/l10n-dev` to devDependencies (build-time only)
- Improved `files.exclude` filtering: uses `path.join` and short-circuit evaluation
- Improved button identity checks using `ThemeIcon.id` instead of object reference comparison
- Extended `FileItem` type to properly include `buttons` property

### Removed
- Removed unused dependencies: `glob`, `@types/glob`, `mocha`, `@types/mocha`, `vscode-ext-codicons`

### Fixed
- Fixed `watch` script not passing `--watch` flag to esbuild

### Updated
- TypeScript 4.9 → 5.7
- esbuild 0.17 → 0.24
- Prettier 2 → 3
- Husky 8 → 9
- Jest 29.5 → 29.7
- ESLint tooling updated to latest v8.x
- Node.js target updated from 18 to 20
- GitHub Actions updated to v4 (checkout, setup-node) and publish-vscode-extension v2

## [0.5.0] - 2023-05-24

### Added
- Added functionality to filter the files and directories based on the user's `files.exclude` settings

## [0.4.0] - 2023-05-18

### Added
- Toggle button to group directories at the top of the list, feature state persists across VS Code restarts

## [0.3.2] - 2023-05-17

### Changed
- Updated README with a link for downloading the extension from the Open VSX Registry

## [0.3.1] - 2023-05-17

### Changed
- README and changelog updates (overlooked in v0.3.0)

## [0.3.0] - 2023-05-17

### Added
- Spanish translations for enhanced localization
- Continuous Integration setup for improved development workflow
- Extension published to the Open VSX Registry

### Changed
- Core implementation refactor for better testability and maintainability
- Documentation updated with a GIF replacing demo video

### Improved
- Test coverage expanded through unit testing of the core implementation

## [0.2.4] - 2023-05-05
- Set up esbuild for bundle file generation

## [0.2.3] - 2023-05-05
- Embedded demo video for Marketplace visibility

## [0.2.2] - 2023-05-05
- Added demo video to the README

## [0.2.1] - 2023-05-05
- Fixed broken links in the README

## [0.2.0] - 2023-05-05
- Updated file icon in Quick Pick

## [0.1.0] - 2023-05-05
- Code cleanup and file/folder reorganization
- Added extension icon and updated README with relevant information
- Initial implementation of the `relativeFileNavigator.open` command for displaying files and directories in the same directory as the current file in Quick Pick
