# vscode-scalafmt

Visual Studio Code extension for formatting Scala code with [scalafmt](https://github.com/scalameta/scalafmt).

> # 🔥 WARNING: This is currently under development and far from stable. Use at your own risk!

![vscode-scalafmt](https://thumbs.gfycat.com/CautiousTeemingCatfish-size_restricted.gif)

## Try this out
The extension is not yet published on the Marketplace, so you will need to build it from source.

1. Clone this repo
2. Run `npm install` to install its dependencies
3. Run `npm run build`

Now you should have a file named `vscode-scalafmt-0.0.1.vsix` in the current directory.

Open VS Code, open the Command Palette (`CMD + Shift + P`) and select `Install from VSIX...`. Now pick the file above and you should be ready to go! 

## How to use

The extension integrates directly with the `Format Document` command of VSCode.

### Manually
1. Open the Command Palette (`CMD + Shift + P`)
2. Select `Format Document`

or simply

1. `Alt + Shift + F`

### Automatically, on save
It respects the `editor.formatOnSave` setting.

## Configuration
Work in progress: see #1.
