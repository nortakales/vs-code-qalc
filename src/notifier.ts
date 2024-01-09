
import * as vscode from 'vscode';

const exchangeRatesLimitedMessage = 'Qalc has reached its quota for retrieving free exchange rates for this month.' +
    ' If this is important to you, please use your own API key, which will also give you a TTL of 1 day instead of 14 days';

export function displayRateLimitedNotification(ctx: vscode.ExtensionContext) {

    const nextNotificationTime = ctx.globalState.get<number>('nextExchangeRateNotificationTime');
    if (nextNotificationTime && Date.now() < nextNotificationTime) {
        return;
    }

    vscode.window.showInformationMessage(exchangeRatesLimitedMessage,
        'Configure API Key',
        'Remind Me Next Month'
    ).then(selection => {
        switch (selection) {
            case 'Configure API Key':
                vscode.commands.executeCommand('workbench.action.openSettings', 'qalc.currency.apiKey');
                break;
            case 'Remind Me Next Month':
                ctx.globalState.update('nextExchangeRateNotificationTime', calculateNextNotificationTimeMillis());
                break;
            default:
                break;
        }
    });
}

function calculateNextNotificationTimeMillis() {
    const nextNotificationDate = new Date();
    // First day of next month. Month is 0 indexed and 12 rolls over the year automatically.
    nextNotificationDate.setMonth(nextNotificationDate.getMonth() + 1, 1);
    nextNotificationDate.setHours(0, 0, 0, 0);
    return nextNotificationDate.getTime();
}