import {StyleSheet, Text, View} from "react-native";

export default function Info() {
    return (
        <View
            style={styles.container}
        >
            <Text style={styles.text}>Info Page</Text>
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
