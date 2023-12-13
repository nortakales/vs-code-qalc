import axios from 'axios';
import { ExtensionContext } from 'vscode';

const defaultData = {
    base: "USD",
    rates: { USD: 1.0 },
};

// 7 days
const dataTtl = 7 * 24 * 60 * 60 * 1000;

export interface ExchangeData {
    readonly base: string,
    readonly date?: string,
    readonly rates: {
        [currency: string]: number,
    },
    readonly error?: {
        readonly code: number,
        readonly type: string,
        readonly info: string
    }
}

export async function getExchangeRates(ctx: ExtensionContext): Promise<ExchangeData> {
    let data = ctx.globalState.get<ExchangeData>("exchangeRates");

    if (!data || !data.date || (data.date && Date.now() - new Date(data.date).getTime() > dataTtl)) {
        console.log("Fetching latest currency exchange rates...");

        try {
            let response = await axios.get("https://api.exchangerate.host/latest?base=USD");
            data = response.data;
            await ctx.globalState.update("exchangeRates", data);
        } catch (error) {
            console.log("Error fetching currency exchange info.", error);
        }
    }

    if (data?.error) {
        data = defaultData;
    }

    return data ?? defaultData;
}
