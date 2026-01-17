import {Button, Text, View} from "react-native";
import { Link } from 'expo-router';
import { commonStyles } from '@/styles/common';

export default function Converter() {
    return (
        <View
            style={commonStyles.container}
        >
            <Text style={commonStyles.text}>Converter Page</Text>
            <Button title="Convert" onPress={() => {}} />
            <Link href="/" dismissTo>
                <Text style={commonStyles.text}>Logout</Text>
            </Link>
        </View>
    );
}
