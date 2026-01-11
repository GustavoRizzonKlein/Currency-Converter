import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        margin: 4,
        borderRadius: 8,
        alignItems: "center",   // garante centralização horizontal
        justifyContent: "center" // centraliza vertical
    },

    buttonText: {
        color: colors.text,
        fontWeight: "500",
        fontSize: 16,
        textAlign: "center"
    },

    buttonPrimary: {
        backgroundColor: colors.primary // corrigido
    },

    buttonSecondary: {
        backgroundColor: colors.secondary
    }
});
