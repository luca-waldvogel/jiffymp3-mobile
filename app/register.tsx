import {Button, Text, View} from "react-native";
import { Link } from 'expo-router';
import { commonStyles } from '@/styles/common';

export default function Register() {
    return (
        <View
            style={commonStyles.container}
        >
            <Text style={commonStyles.text}>Register Page</Text>
            <Button title="Register" onPress={() => {}} />
            <Link href="/(tabs)/converter" dismissTo>
                <Text>Register</Text>
            </Link>
        </View>
    );
}
