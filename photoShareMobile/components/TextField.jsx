import React from "react"
import { StyleSheet, TextInput } from 'react-native'
export default ({onChange, placeholder, password = false, value, style = {}}) => {
    return <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        textContentType={password ? "password" : "none"}
         style={{
            ...styles.inputField,
            ...style
    }} />
}

const styles = StyleSheet.create({
    inputField: {
        marginVertical: 10,
        paddingHorizontal: 10,
        padding: 5,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5
    }
})