import React from 'react';
import { TouchableOpacity, Text } from "react-native"
import colors from '../constants/colors';
import { styles } from '../constants/styles';
import { genericButtonType } from '../types';

export const GenericButton = ({ item, colorScheme, onNumberButtonPress }: genericButtonType) => {

    return (
        <TouchableOpacity
            onPress={() => onNumberButtonPress(item)}
        >
            <Text
                style={
                    {
                        ...styles.buttonGenericStyle,
                        color: colors[colorScheme || "light"].buttonColor
                    }
                }
            >{item}</Text>
        </TouchableOpacity>
    )
}