const BASE_URL = "https://v6.exchangerate-api.com/v6/dc8213add5a42b6c8ef2ace9";

export async function exchangeRateApi(fromCurrency) {
  try {
    const response = await fetch(`${BASE_URL}/latest/${fromCurrency}`);

    if (!response.ok) {
      throw new Error('Erro na resposta da API');
    }

    const data = await response.json();

    // 🔒 Blindagem contra resposta inválida
    if (data.result !== 'success' || !data.conversion_rates) {
      throw new Error('Formato de resposta inválido da API');
    }

    return data;
  } catch (err) {
    console.log('Erro no fetch:', err);
    throw err; // ⬅️ IMPORTANTE: propaga o erro
  }
}
