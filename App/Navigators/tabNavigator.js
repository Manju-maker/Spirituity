import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../Screens/HomeScreen/homescreen"
const Tab = createBottomTabNavigator();

function MyTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
        </Tab.Navigator>
    )
}
export default MyTab;