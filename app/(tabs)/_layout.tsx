import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#000',
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerShadowVisible: false,
                headerTintColor: '#000',
                tabBarStyle: {
                    backgroundColor: '#fff',
                },
            }}
        >
            <Tabs.Screen
                name="converter"
                options={{
                    title: 'JiffyMP3',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'play' : 'play-outline'} color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="info"
                options={{
                    title: 'Info',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
                    )
            }} />
        </Tabs>
    );
}
