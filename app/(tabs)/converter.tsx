import {Button, Text, View} from "react-native";
import { Link } from 'expo-router';

export default function Converter() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Converter Page</Text>
            <Button title="Convert" onPress={() => {}} />
            <Link href="/" dismissTo>
                <Text>Logout</Text>
            </Link>
        </View>
    );
}