import { commonStyles } from '@/styles/common';
import { useRouter } from 'expo-router';
import { UserCredential } from "firebase/auth";
import { useState } from 'react';
import { Image, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

interface AuthFormProps {
    onSubmit: (email: string, password: string) => Promise<UserCredential>;
    errorMessage: string;
    buttonText: string;
    buttonStyle: 'button' | 'buttonRegister';
    navigationHref: string;
    navigationText: string;
    successMessage: string;
}

export default function AuthForm({
    onSubmit,
    errorMessage,
    buttonText,
    buttonStyle,
    navigationHref,
    navigationText,
    successMessage
}: AuthFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    function handleSubmit() {
        Keyboard.dismiss()
        setError(false);
        onSubmit(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(successMessage.replace('${user.uid}', user.uid).replace('${user.email}', user.email || ''));
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
                        <TouchableOpacity onPress={() => {
                            Keyboard.dismiss();
                            router.push(navigationHref as any);
                        }}>
                            <Text style={commonStyles.navigatorText}>{navigationText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
