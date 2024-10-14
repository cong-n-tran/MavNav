import React, {useState} from "react";
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NativeModules } from 'react-native'

const { FirebaseAuthModule } = NativeModules;

const Register = ({navigation}) => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const handleRegister = () => {
        if (registerEmail && registerPassword){
            FirebaseAuthModule.registerUser(
                registerEmail,
                registerPassword,
                (userEmail) => {
                    Alert.alert('Registration successful', `User registered: ${userEmail}`);
                    navigation.goBack();
                },
                (error) => {
                    Alert.alert('Registration failed', error);
                }
            );
        }
        else{
            Alert.alert('Email or Password is empty!');
        }
    };
    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Email"
                value={setRegisterEmail}
                onChangeText={setRegisterEmail}
                style={{ marginBottom: 10, borderBottomWidth: 1 }}
            />
            <TextInput
                placeholder="Password"
                value={setRegisterPassword}
                onChangeText={setRegisterPassword}
                secureTextEntry
                style={{ marginBottom: 10, borderBottomWidth: 1 }}
            />
            <Button title="Register" onPress={handleRegister} />
            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
            />
        </View>
    )


}
export default Register; 
