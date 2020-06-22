import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
} from 'react-native';
// import TabSvg from '../../Components/TabBar';
// import {SvgUri} from 'react-native-svg';
function CustomisedTabView({state, descriptors, navigation}) {
  return (
    <ImageBackground
      source={require('../Assets/images/BGfinal.png')}
      style={{
        height: 50,
      }}
      resizeMode={'stretch'}>
      {/* <SvgUri uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"/> */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1}}>
              <Image
                source={require('../Assets/images/ICON_ACCOUNTtab.png')}
                style={{width: 20, height: 20}}
              />
              <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ImageBackground>
  );
}
export default CustomisedTabView;
