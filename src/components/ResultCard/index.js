import { Text, View } from "react-native";
import { styles } from "./styles";



export function ResultCard({
    exchangerate,
    result,
    fromCurrency,
    toCurrency,
    currencies,
}){
    
    if( !result || !exchangerate) return null

    const toSymbol = currencies.find( currency => currency.code === toCurrency ).symbol

    return(

        <View style= {styles.container} >
            <Text style={styles.label} > Resultado: </Text>
            <Text style={styles.amount} >
                {toSymbol} {result}
                </Text>
                <Text style={styles.rate}>
                    Taxa de Câmbio 1: { fromCurrency } = { exchangerate.toFixed(4)} {toCurrency}
                </Text>
        </View>
    )
}