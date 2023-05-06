import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import Button from './components/Button';

function Login() {
    const [isLogin, setIsLogin] = useState(true)
    const [details, setDetails] = useState({
        name: '',
        password: '',
        email: ''
    })

    return (
        <SafeAreaView>
            <View style={styles.container} >
                <Text style={styles.topTile}>
                    {isLogin ? "Login" : "Register"}
                </Text>
                <View style={styles.form}>
                    {!isLogin && <TextInput 
                        value={details.name}
                        placeholder='UserName' style={styles.inputField}/>}
                    <TextInput 
                        value={details.email}
                        placeholder='Email' style={styles.inputField}/>
                    <TextInput 
                        value={details.password}
                        placeholder='Password' style={styles.inputField}/>
                    
                    <Button backgroundColor="orange">Login</Button>
                     
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
                    <Text>{isLogin ? "Don't have an accont? " : "Already have an account? "}</Text>
                    <TouchableOpacity onPress={() => {setIsLogin(!isLogin)}}>
                        <Text style={{ color: "blue", fontWeight: "600" }}>{isLogin ? "Sign Up" : "Login"}</Text>
                    </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    primaryButton: {
        padding: 10,
        borderRadius: 5,
        color: 'white',
        backgroundColor: 'blue'
    },
    container: {
        justifyContent: 'center',
        height: '100%',
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: 'lightgreen'
    },
    inputField: {
        marginVertical: 10,
        paddingHorizontal: 10,
        padding: 5,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5
    },
    topTile: {
        fontSize: 40,
        color: 'black',
        fontWeight: '600'
    },
    form: {
        marginTop: 10,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 15,
        width: "80%"
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default Login;  