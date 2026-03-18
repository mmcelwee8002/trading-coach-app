import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function TradingScreen() {
  const [balance, setBalance] = useState(10000);
  const [shares, setShares] = useState(0);

  const stockPrice = 150;

  const handleBuy = () => {
    if (balance >= stockPrice) {
      setBalance(balance - stockPrice);
      setShares(shares + 1);
    }
  };

  const handleSell = () => {
    if (shares > 0) {
      setBalance(balance + stockPrice);
      setShares(shares - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trading Simulator</Text>

      <Text style={styles.balance}>Balance: ${balance}</Text>
      <Text style={styles.shares}>Shares Owned: {shares}</Text>

      <View style={styles.stockBox}>
        <Text style={styles.stock}>AAPL</Text>
        <Text style={styles.price}>${stockPrice}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sellButton} onPress={handleSell}>
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
    marginBottom: 10,
  },
  shares: {
    color: '#e5e7eb',
    fontSize: 18,
    marginBottom: 30,
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
  },
  price: {
    color: '#9ca3af',
    fontSize: 18,
    marginTop: 5,
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
});