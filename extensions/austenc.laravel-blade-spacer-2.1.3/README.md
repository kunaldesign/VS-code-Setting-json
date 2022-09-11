# Laravel Blade Spacer

An extension to automatically add spacing to blade templating markers.

## Features

Supports the following tags:

- `{{ }}`
- `{!! !!}`
- `{{-- --}}`

![Extension Preview](https://github.com/austenc/vscode-blade-spacer/raw/HEAD/img/preview.gif)

## Known Issues

- Wrapping selected text with `{!! !!}` and `{{-- --}}` tags doesn't work. PR welcomed!

## Release Notes

### 2.1.3

- Fixed npm vulnerabilities
- Use async/await to fix interaction with some extensions - [#17](https://github.com/austenc/vscode-blade-spacer/issues/17)

### 2.1.2

- Fixed npm vulnerability

### 2.1.1

- Fixed issues noted in [#14](https://github.com/austenc/vscode-blade-spacer/issues/14)

### 2.1.0

- Automatically enable `editor.autoClosingBrackets` for blade and html language types
- Fixed greedy regex for `{{ }}` and `{!! !!}` tag pairs - [#11](https://github.com/austenc/vscode-blade-spacer/issues/11)

### 2.0.2

- Fixed bug causing issues with other extensions, thanks @KapitanOczywisty!

### 2.0.1

- Fixed bug with comment and unescaped tag types when making from existing `{{`

### 2.0.0

- Dropped support for `{{{ }}}` tags
- Improved how extension activates, should be more performant
- Fixed https://github.com/austenc/vscode-blade-spacer/issues/3
- Fixed https://github.com/austenc/vscode-blade-spacer/issues/4

### 1.0.2

- Fixed an issue that caused extraneous brackets when cursor at the beginning of a comment - [#2](https://github.com/austenc/vscode-blade-spacer/issues/2)

### 1.0.1

- Added workaround for braces not matching when a trailing quote or angle bracket exists - see [Microsoft/vscode#35197](https://github.com/Microsoft/vscode/issues/35197)

### 1.0.0

- Improved support for multi cursor and selection wrapping
- Fixed multi cursor undo problem
- Added support for triple brace syntax
- Added support for comment syntax

### 0.1.0

- Initial version supporting `{{` and `{!!` tags. Buggy, but it's a start!
