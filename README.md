
# DEPRECATED

This extension is now deprecated in favor of [Metals](https://scalameta.org/metals).

Read more about the deprecation [here](./MIGRATING.md).

---

# vscode-scalafmt


Visual Studio Code extension for formatting Scala code with [scalafmt](https://github.com/scalameta/scalafmt).

![vscode-scalafmt](https://thumbs.gfycat.com/CautiousTeemingCatfish-size_restricted.gif)

## Try this out!
This extension is published on the Marketplace. Just search for `vscode-scalafmt` and install it!

> ## Building from source
> You can also try the latest unpublished version by building from source:

> 1. Clone this repo
> 2. Run `npm install` to install its dependencies
> 3. Run `npm run build`

> Now you should have a file named `vscode-scalafmt-{version}.vsix` in the current directory.

> Open VS Code, open the Command Palette (`CMD + Shift + P`) and select `Install from VSIX...`. Now pick the file above and you should be ready to go!

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

### I get a `java.lang.Error`
This is again a failure in the parsing of the configuration file. If this happens, check if your config file contains unwrapped string literals (i.e. strings without the quotes) that have a `/` in it (e.g. `some/path`). This is a known bug [that is already being addressed](https://github.com/unicredit/shocon/pull/21). An easy workaround is to wrap those strings in quotes (e.g. `"some/path"`).
