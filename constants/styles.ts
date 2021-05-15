import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    containerText: {
      flex: 3/8,
      justifyContent: "flex-end",
      alignItems: "flex-end"
    },
    containerGeneric: {
      paddingHorizontal: 30,
      paddingBottom: 10,
    },
    containerButtonRow: {
      justifyContent: "space-between",
      flexDirection: "row",
      paddingBottom: 20
    },
    containerFunctionButtons: {
      paddingHorizontal: 20,
      paddingTop: 15,
      flex: 5/8,
      justifyContent: "space-around"
    },
    buttonGenericStyle: {
        fontSize: 41,
        padding: 16,
        fontWeight: "500"
    }
  });