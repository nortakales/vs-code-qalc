
import axios from 'axios';
import { ExtensionContext } from 'vscode';
import { isTest } from './global';

const defaultData = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    rates: { USD: 1.0 },
    base: 'USD'
};
const oneDayInSeconds = 24 * 60 * 60;
const defaultTtl = 14 * oneDayInSeconds;
const customTTL = oneDayInSeconds;

const baseUrl = 'https://openexchangerates.org/api/latest.json?base=USD&app_id=';
// If you are reading this, please just get your own FREE key at https://openexchangerates.org/
const defaultApiKey = '310f1a4a67d14970a31078dc604a9622';
const testApiKey = '266b276ee7044816ad288d1b85ef811b';

export interface ExchangeData {
    readonly base: string,
    readonly timestamp?: number,
    readonly rates: {
        [currency: string]: number,
    },
    readonly error?: boolean,
    readonly status?: number,
    readonly message?: string,
    readonly description?: string
}

export async function getExchangeRates(ctx: ExtensionContext): Promise<ExchangeData> {
    const cachedData = ctx.globalState.get<ExchangeData>("exchangeRates");
    let data = cachedData;

    // TODO move isTest into settings file so it can apply to any setting
    let apiKey;
    if (isTest()) {
        // For tests, use special test API key that will not run out of quota
        apiKey = testApiKey;
    } else {
        // Attempt to get user key from settings
        const settings = await import('./settings');
        apiKey = settings.currencyApiKey();
    }
    let ttl = customTTL;
    if (!apiKey) {
        console.log('No custom API key for currency exchange rates, using default key and ttl');
        ttl = defaultTtl;
        apiKey = defaultApiKey;
    }

    if (!data || data.error || !data.timestamp || (data.timestamp && (Date.now() / 1000) - data.timestamp > ttl)) {
        console.log("Fetching latest currency exchange rates...");

        try {
            const response = await axios.get(baseUrl + apiKey);
            data = response.data;
            if (data) {
                if (data.error) {
                    console.log(`Error retrieving exchange rates, status=${data.status}, message=${data.message}`);
                    if (data.status === 429) {
                        notify(ctx);
                    }
                    data = cachedData;
                } else {
                    console.log("Retrieved new exchange rates, updating cache");
                    await ctx.globalState.update("exchangeRates", data);
                }
            } else {
                console.log("Error retrieving exchange rates, received no data");
            }
        } catch (error) {
            if (error instanceof Error && error.message.includes('Request failed with status code 429')) {
                console.log("Error fetching currency exchange info, request failed with status code 429");
                notify(ctx);
            } else {
                console.log("Error fetching currency exchange info.", error);
            }
        }
    }

    return data ?? cachedData ?? defaultData;
}

async function notify(ctx: ExtensionContext) {
    if (!isTest()) {
        const notifier = await import('./notifier');
        notifier.displayRateLimitedNotification(ctx);
    }
}