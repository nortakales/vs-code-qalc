import axios from 'axios';
//import { ExtensionContext, window } from 'vscode';

// 7 days
const dataTtl = 7 * 24 * 60 * 60 * 1000;

export interface ExchangeData {
    readonly base: string,
    readonly date?: string,
    readonly rates: {
        [currency: string]: number,
    },
}

//@ts-ignore
export async function getExchangeRates(ctx: ExtensionContext): Promise<ExchangeData> {
    let data = ctx.globalState.get<ExchangeData>("exchangeRates");

    if (!data || (data.date && Date.now() - new Date(data.date).getTime() > dataTtl)) {
        console.log("Fetching latest currency exchange rates...");

        try {
            let response = await axios.get("https://api.exchangeratesapi.io/latest?base=USD");
            data = response.data;
            await ctx.globalState.update("exchangeRates", data);
        } catch (error) {
            console.log("Error fetching currency exchange info.", error);
            //@ts-ignore
            window.showWarningMessage("Error fetching currency exchange info, do you have an internet connection?");
        }
    }

    return data ?? {
        base: "USD",
        rates: {USD: 1.0},
    };
}
