import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Button from "./Button";
import settingIcon from '../assets/profileSettings.png'

export default ({ navigation }) => {
    const logout = () => {
        navigation.navigate("auth")
    }
    return <View>
        <TouchableOpacity
            onPress={logout}
        >
            <Image source={settingIcon} style={{
                height: 20,
                width: 20
            }} />
        </TouchableOpacity>
        <Button
            backgroundColor="lightBlue"
            color="white">
            Logout
        </Button>
    </View>
}