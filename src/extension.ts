import * as vscode from 'vscode';
import EditorDecorator from './decorator';

export function activate(context: vscode.ExtensionContext) {

    let decorator = new EditorDecorator(context);
    context.subscriptions.push(decorator);

    let copyWithDelimiterCommand = vscode.commands.registerCommand('qalc.copy.withDelimiter', () => {
        decorator.copyToClipboardWithOutput(true);
    });
    context.subscriptions.push(copyWithDelimiterCommand);

    let copyWithoutDelimiterCommand = vscode.commands.registerCommand('qalc.copy.withoutDelimiter', () => {
        decorator.copyToClipboardWithOutput(false);
    });
    context.subscriptions.push(copyWithoutDelimiterCommand);
}
