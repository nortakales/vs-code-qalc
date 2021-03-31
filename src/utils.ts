import { Range, TextEditor } from "vscode";

export function createFullDocumentRange(editor: TextEditor) {
    const firstLine = editor.document.lineAt(0);
    const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
    return new Range(firstLine.range.start, lastLine.range.end);
}