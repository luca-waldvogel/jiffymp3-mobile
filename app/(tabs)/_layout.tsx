import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="converter" options={{ title: 'Converter' }} />
            <Tabs.Screen name="info" options={{ title: 'Info' }} />
        </Tabs>
    );
}
