import axios from 'axios';

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

    if (!data || !data.date || (data.date && Date.now() - new Date(data.date).getTime() > dataTtl)) {
        console.log("Fetching latest currency exchange rates...");

        try {
            // Temporarily non-https and free access key until finding a new solution
            // Looks like https://api.exchangerate.host/latest?base=USD might work
            let response = await axios.get("http://api.exchangeratesapi.io/latest?access_key=ce3783aaf8f32b673a37a1d73479a80c");
            data = response.data;
            await ctx.globalState.update("exchangeRates", data);
        } catch (error) {
            console.log("Error fetching currency exchange info.", error);
        }
    }

    return data ?? {
        base: "USD",
        rates: {USD: 1.0},
    };
}
