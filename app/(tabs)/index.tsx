

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {useRouter } from 'expo-router'

export default function HomeScreen() {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trading Coach</Text>

      <Text style={styles.subtitle}>
        Learn to trade with guided coaching and practice trades.
      </Text>

      <View style={styles.balanceBox}>
        <Text style={styles.balanceLabel}>Paper Balance</Text>
        <Text style={styles.balance}>$10,000</Text>
      </View>

      <TouchableOpacity style={styles.button}
        onPress={()=> router.push('/trading')}>

        <Text style={styles.buttonText}>Start Trading</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryText}>View Lessons</Text>
      </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 30,
  },
  balanceBox: {
    backgroundColor: '#111827',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#9ca3af',
    fontSize: 14,
  },
  balance: {
    color: '#22c55e',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#374151',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  secondaryText: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
  },
});