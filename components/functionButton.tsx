import React from 'react';
import { TouchableOpacity, Text,StyleSheet, ColorSchemeName } from "react-native"
import colors from '../constants/colors';
import { styles } from '../constants/styles';
import { functionButtonType } from '../types';

export const FunctionButton = ({text, colorScheme, functionButtonPressed, onFunctionButtonPressed, type}:functionButtonType) =>{

    const innerStyle = StyleSheet.create({
        buttonGenericStyle: {
            ...styles.buttonGenericStyle,
            color: colors[colorScheme || "light"].actionButtonColor
        }
    });

    return(
        <TouchableOpacity
            onPress={() => onFunctionButtonPressed(type)}
            style={
                functionButtonPressed == type && type != "equals"? {
                    borderRadius: 10,
                    backgroundColor: colors[colorScheme || "light"].actionButtonColorSelected
                }: null
            }
        >
            <Text
                style={innerStyle.buttonGenericStyle}
            >{text}</Text>
        </TouchableOpacity>
    )
}
