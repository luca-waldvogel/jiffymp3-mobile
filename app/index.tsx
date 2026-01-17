import {Button, Text, View} from "react-native";
import { Link } from 'expo-router';
import { commonStyles } from '@/styles/common';

export default function Index() {
  return (
    <View
      style={commonStyles.container}
    >
      <Text style={commonStyles.text}>Login Page</Text>
      <Button title="Login" onPress={() => {}} />
        <Link href="/(tabs)/converter" dismissTo>
            <Text>Login(Mock)</Text>
        </Link>
        <Link href="/register" dismissTo>
            <Text style={commonStyles.text}>Register</Text>
        </Link>
    </View>
  );
}
