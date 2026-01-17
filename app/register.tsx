import {Button, StyleSheet, Text, View} from "react-native";
import { Link } from 'expo-router';

export default function Register() {
    return (
        <View
            style={styles.container}
        >
            <Text style={styles.text}>Register Page</Text>
            <Button title="Register" onPress={() => {}} />
            <Link href="/" dismissTo>
                <Text>Register</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#000',
    },
});
