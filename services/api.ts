const API_KEY = process.env.EXPO_PUBLIC_ALPHA_VANTAGE_API_KEY;

export const getStockPrice = async (symbol: string) => {
  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );

    const data = await res.json();
    console.log("Alpha Vantage response:", data);

    return data["Global Quote"];
  } catch (error) {
    console.error("API error:", error);
    return null;
  }
};