import {Text, View} from "react-native";
import { commonStyles } from '@/styles/common';

export default function Info() {
    return (
        <View
            style={commonStyles.container}
        >
            <Text style={commonStyles.text}>Info Page</Text>
        </View>
    );
}
