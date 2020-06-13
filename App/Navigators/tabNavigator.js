import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

function ABC() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "yellow" }}>
            <Text>Home!</Text>
            <Button title="Go to Settings" onPress={() => navigation.navigate('SettingsScreen')} />

        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "pink" }}>
            <Text>Settings!</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('ABC')} />

        </View>
    );
}
function MyTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="ABC" component={ABC} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}
function App() {
    return (

        <MyTab />

    );
}
export default App;