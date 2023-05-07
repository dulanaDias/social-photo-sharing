import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TextField from "../components/TextField";
import Network from "../Network";

export default () => {
    const [details, setDetails] = useState({
        name: '',
        email: '',
        profilePicture: '',
        password: ''
    })

    useEffect(() => {
        Network.get("user/profile").then((result) => {
            setDetails({
                ...result.data.profile,
                password: ''
            })
        })
    }, [])

    const onChange = (name) => {
        return (text) => {
            setDetails({
                ...details,
                [name]: text
            })
        }
    }

    const onSave = async () => {
        await Network.put("user/profile", details)
    }

    return <View style={styles.root}>
        <Text style={styles.heading}>Profile</Text>
        <TextField value={details.name} placeholder="Name" />
        <TextField value={details.email} placeholder="Email" />
        <TextField value={details.password} placeholder="Password" />
    </View>
}

const styles = StyleSheet.create({
    root: {
        height: "100%",
        justifyContent: "center",
        alignItems: "stretch",
        padding: 20
    },
    heading: {
        color: "black",
        fontSize: 30,
        fontWeight: "800"
    }
})