import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,SafeAreaView, Text, useColorScheme, View, ColorSchemeName, TouchableOpacity } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../constants/colors';


type functionTypes = "percentage"|"equals"|"plus"|"minus"|"divide"|"multiply"|null


export default function MainScreen() {
    const colorScheme:ColorSchemeName = useColorScheme();
    const insets:EdgeInsets = useSafeAreaInsets();
    // console.log(colorScheme)
    
    const [ calculatorValue, setCalculatorValue ] = React.useState("0");
    const [ memoryValue, setMemoryValue ] = React.useState<null|number>(null);
    const [ memoryFunction, setMemoryFunction ] = React.useState<functionTypes>(null);
    const [ functionButtonPressed, setFunctionButtonPressed ] = React.useState<functionTypes>(null);

    const cleanMemory = () =>{
        setCalculatorValue("0");
        setMemoryValue(null);
        setFunctionButtonPressed(null);
        setMemoryFunction(null);
    }

    const onNumberButtonPress = (input:number) =>{
        console.log(calculatorValue);
        if(calculatorValue.toString() == "0."){
            setCalculatorValue(calculatorValue + '' + input);
            if(functionButtonPressed != null){
                setFunctionButtonPressed(null);
            }
        }else if(calculatorValue == "0" || functionButtonPressed != null ){
            setCalculatorValue(input.toString());
            setFunctionButtonPressed(null);
        }else{
            if((input != 0 || input == 0 && calculatorValue != "0") && calculatorValue.toString().length < 7 ){
                var setNewCalculatorValue = calculatorValue + '' + input;
                setCalculatorValue(setNewCalculatorValue.toString())
            }
            
        }
    }

    const onCommaPressed = () =>{
        if(calculatorValue == "0" || functionButtonPressed != null ){
            setCalculatorValue( "0." );
        }else{
            if(calculatorValue.includes(".")){
                return null
            }else{
                setCalculatorValue(calculatorValue+".")
            }
        }
    }

    const onFunctionButtonPressed = (type:functionTypes) =>{

        let disposableCalculatorValue = parseFloat(calculatorValue);
        if(disposableCalculatorValue.toString()[disposableCalculatorValue.toString().length-1] == "."){
            disposableCalculatorValue = parseFloat(disposableCalculatorValue.toString().substring(0, disposableCalculatorValue.toString().length-1) );
        }

        if(type == "percentage"){
            let disposableValue = disposableCalculatorValue / 100;
            setCalculatorValue(disposableValue.toString());
        }else if(functionButtonPressed == null){
            if(memoryValue != null){
                let disposableValue = 0.0;
                if(type != "equals"){
                    disposableValue = doCalculations(type , disposableCalculatorValue);
                    setMemoryValue(disposableValue);
                }else{
                    disposableValue = doCalculations(memoryFunction , disposableCalculatorValue);
                    //to clean history
                    setMemoryValue(null);
                }
                setCalculatorValue(disposableValue.toString());
            }else{
                if(type != "equals"){
                    setMemoryValue(disposableCalculatorValue);
                }
            }

            setMemoryFunction( type != "equals"? type : null);
            setFunctionButtonPressed(type != "equals"? type : null);

            console.log(disposableCalculatorValue, memoryValue)
        }else if( functionButtonPressed != type){
            setFunctionButtonPressed(type)
        }
    }

    const doCalculations = (type:functionTypes, value:number):number =>{
        let disposableValue = 0;
        if(memoryValue != null){
            if(type == "plus"){
                disposableValue = memoryValue + value;
            }else if(type == "minus"){
                disposableValue = memoryValue - value;
            }else if(type == "divide"){
                disposableValue = memoryValue / value;
            }else if(type == "multiply"){
                disposableValue = memoryValue * value;
            }
        }
        return disposableValue;
    }

    const onMinusPlusPressed = () =>{
        setCalculatorValue((parseFloat(calculatorValue) * -1).toString())
    }

  return (
      <View style={{
            flex: 1,
            paddingTop: insets.top,
            backgroundColor: colors[colorScheme || "light"].background
        }}>
        
            <View
                style={
                    [
                    styles.containerText,
                    styles.containerGeneric,
                    {
                        backgroundColor: ""
                    }
                ]
                }
            >
                <Text
                    style={{
                        color: colors[colorScheme || "light"].text,
                        fontSize: 70,
                        fontWeight: "600",
                    }}
                >
                    {calculatorValue}
                </Text>
            </View>
            <View
                style={
                    [
                        styles.containerFunctionButtons,
                        {
                            paddingBottom: insets.bottom,
                            backgroundColor: colors[colorScheme || "light"].backgroundButtons
                        }
                    ]
            }
            >
            
                <View
                    style={[styles.containerButtonRow]}
                >
                    <TouchableOpacity
                        onPress={cleanMemory}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        >C</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onMinusPlusPressed}
                    >
                        <Text
                            style={[
                                styles.buttonGenericStyle,
                                {}
                            ]}
                        >+/-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onFunctionButtonPressed("percentage")}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        >%</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onFunctionButtonPressed("divide")}
                        style={
                            functionButtonPressed == "divide"? {
                                borderRadius: 10,
                                backgroundColor: colors[colorScheme || "light"].actionButtonColorSelected
                            }: null
                        }
                    >
                        <Text
                            style={[styles.buttonGenericStyle , {
                                color: colors[colorScheme || "light"].actionButtonColor
                            }]}
                        >÷</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[styles.containerButtonRow]}
                >
                    <TouchableOpacity
                        onPress={() => onNumberButtonPress(7)}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        >7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onNumberButtonPress(8)}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        >8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onNumberButtonPress(9)}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        >9</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onFunctionButtonPressed("multiply")}
                        style={
                            functionButtonPressed == "multiply"? {
                                borderRadius: 10,
                                backgroundColor: colors[colorScheme || "light"].actionButtonColorSelected
                            }: null
                        }
                    >
                        <Text
                            style={[styles.buttonGenericStyle , {
                                color: colors[colorScheme || "light"].actionButtonColor
                            }]}
                        >×</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[styles.containerButtonRow]}
                >
                    <TouchableOpacity
                        onPress={() => onNumberButtonPress(4)}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        >4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onNumberButtonPress(5)}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        >5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onNumberButtonPress(6)}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        >6</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onFunctionButtonPressed("minus")}
                        style={
                            functionButtonPressed == "minus"? {
                                borderRadius: 10,
                                backgroundColor: colors[colorScheme || "light"].actionButtonColorSelected
                            }: null
                        }
                    >
                        <Text
                            style={[styles.buttonGenericStyle , {
                                color: colors[colorScheme || "light"].actionButtonColor
                            }]}
                        >−</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[styles.containerButtonRow]}
                >
                    <TouchableOpacity
                        onPress={() => onNumberButtonPress(1)}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        >1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onNumberButtonPress(2)}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        >2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onNumberButtonPress(3)}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        >3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onFunctionButtonPressed("plus")}
                        style={
                            functionButtonPressed == "plus"? {
                                borderRadius: 10,
                                backgroundColor: colors[colorScheme || "light"].actionButtonColorSelected
                            }: null
                        }
                    >
                        <Text
                            style={[styles.buttonGenericStyle , {
                                color: colors[colorScheme || "light"].actionButtonColor
                            }]}
                        >+</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[styles.containerButtonRow]}
                >
                    <TouchableOpacity
                        disabled={true}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        > </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onNumberButtonPress(0)}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        >0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onCommaPressed}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        >.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => onFunctionButtonPressed("equals")}
                    >
                        <Text
                            style={[styles.buttonGenericStyle , {
                                color: colors[colorScheme || "light"].actionButtonColor
                            }]}
                        >=</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
  );
}

const styles = StyleSheet.create({
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
