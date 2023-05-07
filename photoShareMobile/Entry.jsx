import React, { useEffect, useState } from "react"
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./pages/Login";
import Home from "./pages/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default () => {
    const Stack = createNativeStackNavigator()
  
    return <NavigationContainer>
        <Stack.Navigator
             initialRouteName="home">
            <Stack.Screen
                name="auth"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />    
        </Stack.Navigator>
    </NavigationContainer>
}