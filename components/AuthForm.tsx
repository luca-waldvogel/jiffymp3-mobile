import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Link, useRouter } from 'expo-router';
import { commonStyles } from '@/styles/common';
import { UserCredential } from "firebase/auth";

interface AuthFormProps {
    onSubmit: (email: string, password: string) => Promise<UserCredential>;
    errorMessage: string;
    buttonText: string;
    buttonStyle: 'button' | 'buttonRegister';
    navigationHref: string;
    navigationText: string;
}

export default function AuthForm({
    onSubmit,
    errorMessage,
    buttonText,
    buttonStyle,
    navigationHref,
    navigationText
}: AuthFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    function handleSubmit() {
        setError(false);
        onSubmit(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(`User ${user.uid} authenticated successfully`);
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
                    <View style={commonStyles.logoContainer}>
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
                                {errorMessage}
                            </Text>
                        )}

                        <TouchableOpacity
                            style={commonStyles[buttonStyle]}
                            onPress={handleSubmit}
                        >
                            <Text style={commonStyles.buttonText}>{buttonText}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={commonStyles.navigator}>
                        <Link href={navigationHref} dismissTo>
                            <Text style={commonStyles.navigatorText}>{navigationText}</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
