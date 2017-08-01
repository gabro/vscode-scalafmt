# vscode-scalafmt

Visual Studio Code extension for formatting Scala code with [scalafmt](https://github.com/scalameta/scalafmt).

> # 🔥 WARNING: This is currently under development and far from stable. Use at your own risk! If you get stuck refer to the [Troubleshooting](#troubleshooting) section below 👇

![vscode-scalafmt](https://thumbs.gfycat.com/CautiousTeemingCatfish-size_restricted.gif)

## Try this out
The extension is not yet published on the Marketplace, so you will need to build it from source.

1. Clone this repo
2. Run `npm install` to install its dependencies
3. Run `npm run build`

Now you should have a file named `vscode-scalafmt-0.0.1.vsix` in the current directory.

Open VS Code, open the Command Palette (`CMD + Shift + P`) and select `Install from VSIX...`. Now pick the file above and you should be ready to go! 

## How to use

The extension integrates directly with the `Format Document` and `Format Selection` commands of VSCode.

### Manually
1. Open the Command Palette (`CMD + Shift + P`)
2. Select `Format Document`

or simply

1. `Alt + Shift + F`

Alternatively you can format a selection of lines and using `Format Selection` in the Command Palette (`CMD + K CMD + F`).

### Automatically, on save
It respects the `editor.formatOnSave` setting.

## Configuration
Create a `.scalafmt.conf` file as described in http://scalameta.org/scalafmt/#Configuration. By default the extension will look for this file in `${workspaceRoot}/.scalafmt.conf`. You can customize this path with the `scalafmt.configFilePath` setting of VS Code.

## Troubleshooting
### I get a Scala syntax error when formatting
The file you're formatting needs to be syntactically correct for Scalafmt to work. Fix the syntax of your code and retry.

### I get a weird `null`-related error or a `MatchError`
This is most likely a bug in the parsing of the configuration file. The way it's currently done is hackish (to use kind words). If you face one of these, please open an issue including the entire `.scalafmt.conf` you're using.

### Nothing happens when I use the format shortcut 
Open the Command Palette (`CMD + P`) and check if you have the `Format Document` option available. If you don't... have you tried turning it off and on again? Seriously, something is off, try restarting VS Code and/or re-installing the extension.
