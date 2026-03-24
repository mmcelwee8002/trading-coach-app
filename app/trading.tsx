import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, } from 'react-native';
import { useEffect, useState } from 'react';

export default function TradingScreen() {
  const [balance, setBalance] = useState(10000);
  const [shares, setShares] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);

  const [symbol, setSymbol] = useState('AAPL');
  const [quantity, setQuantity] = useState('1');
  const [stockPrice, setStockPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiKey = process.env.EXPO_PUBLIC_ALPHA_VANTAGE_API_KEY;

const stockMap: Record<string, string> = {
  tesla: 'TSLA',
  microsoft: 'MSFT',
  apple: 'AAPL',
  amazon: 'AMZN',
  nvidia: 'NVDA',
  google: 'GOOGL',
  alphabet: 'GOOGL',
  meta: 'META',
};

  const fetchStockPrice = async () => {
    console.log('FUNCTION RUNNING');

    if (!apiKey) {
      setError('Missing API key. Check your .env file.');
      setLoading(false);
      return;
    }

    const userInput = symbol.trim().toLowerCase();
  const lookupSymbol = stockMap[userInput] || symbol.trim().toUpperCase();


    try {
      setLoading(true);
      setError('');

      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${lookupSymbol}&apikey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      console.log('Alpha Vantage response:', data);

      if (data['Error Message']) {
        throw new Error('Invalid API request or symbol.');
      }

      if (data['Note']) {
        throw new Error('API limit reached. Try again later.');
      }

      if (data['Information']) {
        throw new Error(data['Information']);
      }

      const quote = data['Global Quote'];
      const priceString = quote?.['05. price'];
      setSymbol(lookupSymbol);

      if (!quote || !priceString) {
        throw new Error('No price data returned.');
      }

      const parsedPrice = Number(priceString);

      if (Number.isNaN(parsedPrice)) {
        throw new Error('Price could not be parsed.');
      }

      setStockPrice(parsedPrice);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong fetching stock data.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  //useEffect(() => {
   // fetchStockPrice();
  //}, []);

 const handleBuy = () => {
  if (stockPrice === null) return;

  const qty = parseInt(quantity, 10);

  if (isNaN(qty) || qty <= 0) {
    setError('Enter a valid quantity.');
    return;
  }

  const purchaseCost = stockPrice * qty;

  if (balance >= purchaseCost) {
    const totalCost = avgPrice * shares + purchaseCost;
    const newShares = shares + qty;

    setShares(newShares);
    setAvgPrice(totalCost / newShares);
    setBalance(balance - purchaseCost);
    setError('');
  } else {
    setError('Not enough balance for this trade.');
  }
};

 const handleSell = () => {
  if (stockPrice === null) return;

  const qty = parseInt(quantity, 10);

  if (isNaN(qty) || qty <= 0) {
    setError('Enter a valid quantity.');
    return;
  }

  if (shares >= qty) {
    const newShares = shares - qty;

    setShares(newShares);
    setBalance(balance + stockPrice * qty);
    setError('');

    if (newShares === 0) {
      setAvgPrice(0);
    }
  } else {
    setError('Not enough shares to sell.');
  }
};

  const profitLoss = stockPrice !== null ? (stockPrice - avgPrice) * shares : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trading Simulator</Text>

      <Text style={styles.balance}>Balance: ${balance.toFixed(2)}</Text>
      <Text style={styles.shares}>Shares: {shares}</Text>
      <Text style={styles.avg}>Avg Price: ${avgPrice.toFixed(2)}</Text>
      <Text style={styles.avg}>
  Position Value: ${(shares * (stockPrice ?? 0)).toFixed(2)}
</Text>

      <Text
        style={[
          styles.pnl,
          { color: profitLoss >= 0 ? '#22c55e' : '#ef4444' },
        ]}
      >
        P/L: ${profitLoss.toFixed(2)}
      </Text>
<TextInput
  style={[styles.input, {color: 'white'}]}
  value={symbol}
  onChangeText={setSymbol}
  placeholder="Enter symbol"
  placeholderTextColor="#888"
  autoCapitalize="characters"
/>

<TextInput
  style={styles.input}
  value={quantity}
  onChangeText={(text) => setQuantity(text)}
  placeholder="Enter quantity"
  placeholderTextColor="#888"
  keyboardType="numeric"
/>

<TouchableOpacity
  style={styles.button}
  onPress={fetchStockPrice}
>
  <Text style={styles.buttonText}>Get Price</Text>
</TouchableOpacity>


      <View style={styles.stockBox}>
        <Text style={styles.stock}>{symbol}</Text>

        {loading ? (
          <ActivityIndicator />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <Text style={styles.price}>${stockPrice?.toFixed(2)}</Text>
        )}

        <TouchableOpacity style={styles.refreshButton} onPress={fetchStockPrice}>
          <Text style={styles.refreshText}>Refresh Price</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuy} disabled={stockPrice === null}>
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sellButton} onPress={handleSell} disabled={stockPrice === null}>
          <Text style={styles.buttonText}>Sell</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0f19',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  balance: {
    color: '#22c55e',
    fontSize: 20,
  },
  shares: {
    color: '#e5e7eb',
    fontSize: 18,
  },
  avg: {
    color: '#9ca3af',
    fontSize: 16,
    marginBottom: 10,
  },
  pnl: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  stockBox: {
    backgroundColor: '#111827',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  stock: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  price: {
    color: '#9ca3af',
    fontSize: 18,
    marginBottom: 12,
  },
  error: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  refreshButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginTop: 8,
  },
  refreshText: {
    color: 'white',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  buyButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  sellButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 12,
  marginTop: 10,
  color: 'white',
},

button: {
  backgroundColor: '#007AFF',
  padding: 14,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 10,
},
});