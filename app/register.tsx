import { useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback} from "react-native";
import { Link, useRouter} from 'expo-router';
import {commonStyles} from '@/styles/common';
import {firebaseConfig} from '@/components/firebase-config'
import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    function handleSubmit() {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.navigate('/(tabs)/converter')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={commonStyles.container}>
                <View style={{marginBottom: 100}}>
                <View style={{
                    alignItems: 'center',
                }}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={commonStyles.imageBig}
                    />
                </View>

                <View style={commonStyles.form}>
                    <TextInput
                        style={commonStyles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder="Email"
                        placeholderTextColor="#999999"
                    />

                    <TextInput
                        style={commonStyles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor="#999999"

                    />

                    <TouchableOpacity
                        style={commonStyles.buttonRegister}
                        onPress={handleSubmit}
                    >
                        <Text style={{ color: 'white' }}>Create Account</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <Link href="/" dismissTo>
                        <Text style={{ color: '#007AFF', fontSize: 16 }}>Back to Login</Text>
                    </Link>
                </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
