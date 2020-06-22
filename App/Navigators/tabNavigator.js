import * as React from 'react';
import {Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/homescreen';
import {
  IconExplore,
  SvgRedeem,
  IconPromos,
  SvgAccount,
  HomeIcon,
} from '../Components/allSVG';
import Account from '../Screens/Account';
const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#5312A1',
        inactiveTintColor: '#C2C2C2',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <HomeIcon customColor={focused ? '#5312A1' : '#C2C2C2'} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({focused, color, size}) => (
            <IconExplore customColor={focused ? '#5312A1' : '#C2C2C2'} />
          ),
        }}
      />
      <Tab.Screen
        name="scan"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <View style={{transform: [{translateY: -10}]}}>
              <SvgRedeem />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Promos"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Promos',
          tabBarIcon: ({focused, color, size}) => (
            <IconPromos customColor={focused ? '#5312A1' : '#C2C2C2'} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({focused, color, size}) => (
            <SvgAccount customColor={focused ? '#5312A1' : '#C2C2C2'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTab;
