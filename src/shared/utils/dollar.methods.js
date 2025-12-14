// Consume la API para obtener el precio del dólar en Venezuela
const getPriceDollarToday = async () => {
    const price = await fetch('https://api.dolarvzla.com/public/exchange-rate');
    const data = await price.json();
    return data.current.usd.toFixed(2);
}

const conversionDolarToBsToday = async (amountInDollars) => {
    const price = await getPriceDollarToday();
    console.log("Conversion:" + price);
    return (parseFloat(amountInDollars) * parseFloat(price)).toFixed(2);
}

export default { conversionDolarToBsToday };