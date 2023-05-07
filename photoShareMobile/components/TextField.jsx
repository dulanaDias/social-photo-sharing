import React from "react"
import { StyleSheet, TextInput } from 'react-native'
export default ({ onChange, placeholder, multiline = false, value, style = {} }) => {
    if (multiline) {
        return <TextInput
            placeholder={placeholder}
            value={value}

            multiline
            numberOfLines={10}
            textAlignVertical="top"
            onChangeText={onChange}
            style={{
                ...styles.inputField,
                ...style
            }} />
    }
    return <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
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