import {Button, Text, View, StyleSheet} from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>Login Page</Text>
      <Button title="Login" onPress={() => {}} />
        <Link href="/(tabs)/converter" dismissTo>
            <Text>Login(Mock)</Text>
        </Link>
        <Link href="/register" dismissTo>
            <Text style={styles.text}>Register</Text>
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
