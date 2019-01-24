# ⚠️ Deprecating vscode-scalafmt in favor of Metals

The vscode-scalafmt extension is now deprecated in favor of Metals.

## Migrating to Metals
The migration from vscode-scalafmt to Metals is very simple:

- Remove vscode-scalafmt

- [Install Metals](https://scalameta.org/metals/docs/editors/vscode.html)

Done 🎉

Note: if you don't have a `version` in your `.scalafmft.conf`, Metals will
automatically prompt you to add it. `version` is required because Metals doesn't
assume a default Scalafmt version.

## Why

[Metals](https://scalameta.org/metals) is a language server for Scala that provides many IDE-like features,
including formatting Scala documents using Scalafmt.

Metals support for Scalafmt is way better than the one provided by this
extension. Here's why:

- Metals uses lightbend/config for parsing `.scalafmt.conf` (this extension uses
  a Scala.js HOCON parser, which has known drawbacks)

- Metals respects `project.excludeFilters` and `project.includeFilters` in
  `.scalafmt.conf`

- Metals respects `version` in `.scalafmt.conf`, dynamically loading the
  appropriate version of Scalafmt

- Metals shows in-line syntax errors, allowing you to fix issues much faster

- Metals shows in-line errors in `.scalafmt.conf` in case of misconfiguration
  (e.g., wrong HOCON syntax, missing `version`, etc)

- Metals works in a
  [variety of editors](https://scalameta.org/metals/docs/editors/overview.html),
  making the Scalafmt support consistent across all all them.

In order to avoid duplicate efforts, we've decided to sunset the vscode-scalafmt
extension and focus on Scalafmt support for Metals instead.
