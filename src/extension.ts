'use strict';
import * as vscode from 'vscode';
import { format } from 'scalafmt';
import { statSync, readFileSync } from 'fs';

// courtesy of
// https://github.com/esbenp/prettier-vscode/blob/7431dd3dc8c0e324be98378efcd1a90ce4f547fa/src/PrettierEditProvider.ts#L162
function fullDocumentRange(document: vscode.TextDocument): vscode.Range {
  const lastLineId = document.lineCount - 1;
  return new vscode.Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}

// FIXME(gabro): currently blocked by https://github.com/olafurpg/metaconfig/issues/28
function retrieveConfig(): string | undefined {
  return "";
  // const configFilePath =
  //   vscode.workspace.getConfiguration('scalafmt').configFilePath
  //   .replace('${workspaceRoot}', vscode.workspace.rootPath);
  // if (statSync(configFilePath)) {
  //   return readFileSync(configFilePath, 'utf8');
  // }
}

function formatDocument(document: vscode.TextDocument, range?: vscode.Range): vscode.TextEdit[] {
  try {
    const scalafmtConfig = retrieveConfig(); 
    const formattedFile = format(
      document.getText(),
      scalafmtConfig,
      range ? [{ start: range.start.line, end: range.end.line + 1 }] : undefined
    );
    return [vscode.TextEdit.replace(fullDocumentRange(document), formattedFile)];
  } catch (e) {
    console.error(e);
    vscode.window.showErrorMessage(`Error while formatting document: ${e}`);
    return [];
  }
}


export function activate(context: vscode.ExtensionContext) {

  let formattingEditProvider = vscode.languages.registerDocumentFormattingEditProvider('scala', {
      provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
        return formatDocument(document);
      }
    }
  );

  let rangeFormattingEditProvider = vscode.languages.registerDocumentRangeFormattingEditProvider('scala', {
      provideDocumentRangeFormattingEdits(document: vscode.TextDocument, range: vscode.Range): vscode.TextEdit[] {
        return formatDocument(document, range);
      }
    }
  );

  context.subscriptions.push(formattingEditProvider, rangeFormattingEditProvider);
}

export function deactivate() {}