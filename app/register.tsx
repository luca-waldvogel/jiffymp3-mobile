import { useState} from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Link, useRouter} from 'expo-router';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { commonStyles } from '@/styles/common';
import { firebaseConfig } from '@/components/firebase-config'

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    function handleSubmit() {
        setError(false);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(`New user ${user.uid} created with email: ${user.email}`);
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

                        {error && (
                            <Text style={commonStyles.errorText}>
                                Must be a valid email address and a password with 6 or more characters
                            </Text>
                        )}

                        <TouchableOpacity
                            style={commonStyles.buttonRegister}
                            onPress={handleSubmit}
                        >
                            <Text style={{ color: 'white' }}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={commonStyles.navigator}>
                        <Link href="/" dismissTo>
                            <Text style={commonStyles.navigatorText}>Back to Login</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
