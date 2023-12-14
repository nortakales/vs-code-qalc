import axios from 'axios';
import { ExtensionContext } from 'vscode';
import { isTest } from './test/tests';
// import { currencyApiKey } from './settings';

const defaultData = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    rates: { USD: 1.0 },
    base: 'USD'
};
const oneDayInSeconds = 24 * 60 * 60;
const defaultTtl = 7 * oneDayInSeconds;
const customTTL = oneDayInSeconds;

const baseUrl = 'https://openexchangerates.org/api/latest.json?base=USD&app_id=';
// If you are reading this, please just get your own FREE key at https://openexchangerates.org/
const defaultApiKey = '310f1a4a67d14970a31078dc604a9622';

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
    let data = ctx.globalState.get<ExchangeData>("exchangeRates");

    // TODO move this into settings file so it can apply to any setting
    let apiKey;
    if (!isTest()) {
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
            let response = await axios.get(baseUrl + apiKey);
            data = response.data;
            if (data?.error) {
                console.log("Error retrieving exchange rates: " + data.message);
                data = defaultData;
            } else {
                await ctx.globalState.update("exchangeRates", data);
            }
        } catch (error) {
            console.log("Error fetching currency exchange info.", error);
        }
    }

    return data ?? defaultData;
}
