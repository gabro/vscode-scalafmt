'use strict';
import * as vscode from 'vscode';
import { format } from 'scalafmt';

// courtesy of
// https://github.com/esbenp/prettier-vscode/blob/7431dd3dc8c0e324be98378efcd1a90ce4f547fa/src/PrettierEditProvider.ts#L162
function fullDocumentRange(document: vscode.TextDocument): vscode.Range {
  const lastLineId = document.lineCount - 1;
  return new vscode.Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode-scalafmt" is now active!');

  let disposable = vscode.languages.registerDocumentFormattingEditProvider('scala', {
      provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
        try {
          const formattedFile = format(document.getText());
          return [vscode.TextEdit.replace(fullDocumentRange(document), formattedFile)];
        } catch (e) {
          console.error(e);
          return [];
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}
