import { useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import { Link, useRouter} from 'expo-router';
import {commonStyles} from '@/styles/common';
import {firebaseConfig} from '@/components/firebase-config'
import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    function handleSubmit() {
        createUserWithEmailAndPassword (auth, email, password)
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
        <View>
            <Text>Email:</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text>Password:</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={{ backgroundColor: '#007AFF', padding: 15, alignItems: 'center' }}
                onPress={handleSubmit}
            >
                <Text style={{ color: 'white' }}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}


export default function Register() {
    return (
        <View
            style={commonStyles.container}
        >
            <SignUpForm />

            <Link href="/(tabs)/converter" dismissTo>
                <Text>Register(Mock)</Text>
            </Link>
        </View>
    );
}

