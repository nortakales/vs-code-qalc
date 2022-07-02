import * as vscode from 'vscode';
import EditorDecorator from './decorator';

export function activate(context: vscode.ExtensionContext) {

    let decorator = new EditorDecorator(context);
    context.subscriptions.push(decorator);

    let copyWithDelimiterCommand = vscode.commands.registerCommand('qalc.copy.withDelimiter', () => {
        decorator.copyToClipboard(false, true);
    });
    context.subscriptions.push(copyWithDelimiterCommand);

    let copyWithoutDelimiterCommand = vscode.commands.registerCommand('qalc.copy.withoutDelimiter', () => {
        decorator.copyToClipboard(false, false);
    });
    context.subscriptions.push(copyWithoutDelimiterCommand);

    let copyOutputOnly = vscode.commands.registerCommand('qalc.copy.resultOnly', () => {
        decorator.copyToClipboard(true, false);
    });
    context.subscriptions.push(copyOutputOnly);
}
