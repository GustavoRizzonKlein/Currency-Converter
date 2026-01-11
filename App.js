import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useState } from 'react';

import { Button } from './src/components/button';
import { styles } from './App.styles';
import { currencies } from './src/constants/currencies';
import { Input } from './src/components/input';
import { ResultCard } from './src/components/ResultCard';
import { exchangeRateApi } from './src/services/api';
import { convertCurrency } from './src/utils/convertCurrency';

export default function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [result, setResult] = useState('');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchExchangeRate() {
    if (loading) return;
  
    const numericAmount = convertCurrency(amount);
  
    if (!numericAmount || numericAmount <= 0) {
      Alert.alert('Erro', 'Digite um valor válido para conversão');
      return;
    }
  
    try {
      setLoading(true);
  
      const data = await exchangeRateApi(fromCurrency);
  
      if (!data || !data.conversion_rates) {
        throw new Error('Resposta inválida da API');
      }
  
      const rate = data.conversion_rates[toCurrency];
  
      if (!rate) {
        throw new Error('Moeda de destino não encontrada');
      }
  
      const convertedValue = numericAmount * rate;
  
      setExchangeRate(rate);
      setResult(convertedValue.toFixed(2));
    } catch (error) {
      console.log('Erro ao converter:', error);
      Alert.alert('Erro', 'Não foi possível realizar a conversão');
    } finally {
      setLoading(false);
    }
  }
  function handleSwap() {
    setFromCurrency((prevFrom) => {
      setToCurrency(prevFrom);
      return toCurrency;
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.ScrollView}>
        <View style={styles.content}>
          <StatusBar style="light" />

          <View style={styles.header}>
            <Text style={styles.title}>Conversor de Moedas</Text>
            <Text style={styles.subTitle}>
              Converta valores entre diferentes moedas
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>De:</Text>

            <View style={styles.currencyGrid}>
              {currencies.map((currency) => (
                <Button
                  key={currency.code}
                  variant="primary"
                  currency={currency}
                  onPress={() => setFromCurrency(currency.code)}
                  isSelected={fromCurrency === currency.code}
                />
              ))}
            </View>

            <Input
              label="Valor:"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />

            <TouchableOpacity
              style={styles.swapButton}
              onPress={handleSwap}
            >
              <Text style={styles.swapButtonText}>↑↓</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Para:</Text>

            <View style={styles.currencyGrid}>
              {currencies.map((currency) => (
                <Button
                  key={currency.code}
                  variant="secondary"
                  currency={currency}
                  onPress={() => setToCurrency(currency.code)}
                  isSelected={toCurrency === currency.code}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.convertButton,
              (!amount || loading) && styles.convertButtonDisable,
            ]}
            onPress={fetchExchangeRate}
            disabled={!amount || loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.convertButtonText}>Converter</Text>
            )}
          </TouchableOpacity>

          <ResultCard
            exchangeRate={exchangeRate}
            result={result}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            currencies={currencies}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
