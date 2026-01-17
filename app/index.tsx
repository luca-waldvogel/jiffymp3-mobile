import { useState} from 'react';
import { Text, View} from "react-native";
import { Link, useRouter} from 'expo-router';
import {commonStyles} from '@/styles/common';
import {firebaseConfig} from '@/components/firebase-config'
import {initializeApp} from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    function handleEmail(e: any) {
        setEmail(e.target.value);
    }

    function handlePW(e: any) {
        setPassword(e.target.value);
    }

    function handleSubmit(e: any) {
        signInWithEmailAndPassword(auth, email, password)
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
        <form onSubmit={handleSubmit}>
            <label>Email:
                <input
                    type="text"
                    value={email}
                    onChange={handleEmail}
                />
            </label>
            <label>Password:
                <input
                    type="text"
                    value={password}
                    onChange={handlePW}
                />
            </label>
            <input type="submit" />
        </form>
    )
}

export default function Index() {
  return (
    <View
      style={commonStyles.container}
    >
      <SignInForm/>

        <Link href="/(tabs)/converter" dismissTo>
            <Text>Login(Mock)</Text>
        </Link>
        <Link href="/register" dismissTo>
            <Text style={commonStyles.text}>Register</Text>
        </Link>
    </View>
  );
}
