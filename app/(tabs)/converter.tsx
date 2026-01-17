import {Button, StyleSheet, Text, View} from "react-native";
import { Link } from 'expo-router';

export default function Converter() {
    return (
        <View
            style={styles.container}
        >
            <Text style={styles.text}>Converter Page</Text>
            <Button title="Convert" onPress={() => {}} />
            <Link href="/" dismissTo>
                <Text style={styles.text}>Logout</Text>
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
