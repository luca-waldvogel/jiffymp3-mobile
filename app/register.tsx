import {Button, Text, View} from "react-native";
import { Link } from 'expo-router';

export default function Register() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Register Page</Text>
            <Button title="Register" onPress={() => {}} />
            <Link href="/" dismissTo>
                <Text>Register</Text>
            </Link>
        </View>
    );
}
