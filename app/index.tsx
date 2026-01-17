import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Link, useRouter } from 'expo-router';
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { commonStyles } from '@/styles/common';
import { firebaseConfig } from '@/components/firebase-config'

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    function handleSubmit() {
        setError(false);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(`User ${user.uid} logged in successfully`);
                router.navigate('/(tabs)/converter')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(true);
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={commonStyles.container}>
                <View style={commonStyles.signInContainer}>
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
                        {error && (
                            <Text style={commonStyles.errorText}>
                                Email or Password is incorrect
                            </Text>
                        )}

                        <TouchableOpacity
                            style={commonStyles.button}
                            onPress={handleSubmit}
                        >
                            <Text style={{ color: 'white' }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={commonStyles.navigator}>
                        <Link href="/register" dismissTo>
                            <Text style={commonStyles.navigatorText}>Register</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
