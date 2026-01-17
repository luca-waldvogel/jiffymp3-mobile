import {Button, Text, View} from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Login Page</Text>
      <Button title="Login" onPress={() => {}} />
        <Link href="/(tabs)/converter" dismissTo>
            <Text>Login(Mock)</Text>
        </Link>
        <Link href="/register" dismissTo>
            <Text>Register</Text>
        </Link>
    </View>
  );
}
