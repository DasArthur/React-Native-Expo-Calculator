import { ColorSchemeName } from "react-native"

export type functionTypes = "%"|"equals"|"plus"|"minus"|"divide"|"multiply"|null

export type functionButtonType = {
    text:string,
    colorScheme:ColorSchemeName,
    functionButtonPressed:functionTypes,
    onFunctionButtonPressed:any,
    type: functionTypes
}

export type genericButtonType = {
    item:number|string,
    colorScheme:ColorSchemeName,
    onNumberButtonPress:any
}