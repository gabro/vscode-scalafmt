'use strict';
import * as vscode from 'vscode';
import { format } from 'scalafmt';
import { existsSync, readFileSync } from 'fs';

const scalaLanguageId = 'scala';
const sbtLanguageId = 'sbt';

// courtesy of
// https://github.com/esbenp/prettier-vscode/blob/7431dd3dc8c0e324be98378efcd1a90ce4f547fa/src/PrettierEditProvider.ts#L162
function fullDocumentRange(document: vscode.TextDocument): vscode.Range {
  const lastLineId = document.lineCount - 1;
  return new vscode.Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}

function retrieveConfig(): string | undefined {
  const configFilePath =
    vscode.workspace.getConfiguration('scalafmt').configFilePath
    .replace('${workspaceRoot}', vscode.workspace.rootPath);
  if (existsSync(configFilePath)) {
    return readFileSync(configFilePath, 'utf8');
  }
}

async function formatDocument(document: vscode.TextDocument, isSbt: Boolean, range: vscode.Range | undefined, output: vscode.OutputChannel): Promise<vscode.TextEdit[]> {

  return vscode.window.withProgress({
    location: vscode.ProgressLocation.Window,
    title: "Formatting with Scalafmt..."
  }, progress => new Promise<vscode.TextEdit[]>((resolve, reject) => {
    try {
      const scalafmtConfig = retrieveConfig(); 
      const formattedFile = format(
        document.getText(),
        isSbt,
        scalafmtConfig,
        range ? [{ start: range.start.line, end: range.end.line + 1 }] : undefined
      );
      output.clear();
      resolve([vscode.TextEdit.replace(fullDocumentRange(document), formattedFile)]);
    } catch (e) {
      console.error(e);
      output.clear();
      output.appendLine('An error occurred while formatting this file with Scalafmt:\n');
      output.append(e);
      output.appendLine('\nIf this is unexpected, consider filing an issue at https://github.com/gabro/vscode-scalafmt/issues/new');
      vscode.window.showErrorMessage(
        `Error while formatting document: ${e}`,
        'Show full output'
      ).then(selection => {
        switch(selection) {
          case 'Show full output': output.show(true);
        }
      });
      reject([]);
    }
  }));
  
}

function createScalafmtStatusBarItem(): vscode.StatusBarItem {
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -1);
  item.text = 'Scalafmt';
  item.command = 'scalafmt.open-output';
  return item;
}

function showOrHideScalafmtStatusBarItem(editor: vscode.TextEditor, statusBarItem: vscode.StatusBarItem): void {
    if (!editor) {
      return;
    }
    const { scheme } = editor.document.uri;
    if (scheme === 'debug' || scheme === 'output') {
      return;
    }
    if (editor.document.languageId === scalaLanguageId) {
      statusBarItem.show();
    } else {
      statusBarItem.hide();
    }
}

export function activate(context: vscode.ExtensionContext) {

  const scalafmtOutput = vscode.window.createOutputChannel('Scalafmt');

  const supportedLanguages = [scalaLanguageId, sbtLanguageId];

  const formattingEditProviders = supportedLanguages.map(languageId => {
    return vscode.languages.registerDocumentFormattingEditProvider(languageId, {
      async provideDocumentFormattingEdits(document: vscode.TextDocument): Promise<vscode.TextEdit[]> {
        return formatDocument(document, languageId === sbtLanguageId, undefined, scalafmtOutput);
      }
    });
  });

  const rangeFormattingEditProviders = supportedLanguages.map(languageId => {
    return vscode.languages.registerDocumentRangeFormattingEditProvider(scalaLanguageId, {
      async provideDocumentRangeFormattingEdits(document: vscode.TextDocument, range: vscode.Range): Promise<vscode.TextEdit[]> {
        return formatDocument(document, languageId === sbtLanguageId, range, scalafmtOutput);
      }
    });
  });

  const statusBarItem = createScalafmtStatusBarItem();

  const statusBarItemDisplayer = vscode.window.onDidChangeActiveTextEditor(editor => {
    showOrHideScalafmtStatusBarItem(editor, statusBarItem);
  });
  showOrHideScalafmtStatusBarItem(vscode.window.activeTextEditor, statusBarItem);

  const openScalafmtOutput = vscode.commands.registerCommand('scalafmt.open-output', () => {
    scalafmtOutput.show();
  });

  context.subscriptions.push(
    ...formattingEditProviders,
    ...rangeFormattingEditProviders,
    statusBarItemDisplayer,
    scalafmtOutput
  );
}

export function deactivate() {}
