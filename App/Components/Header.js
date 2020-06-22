import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {BackArrowBlack, CrossSVG} from './allSVG';

export default function Header({
  navigation,
  previousScreen = 'none',
  showCross = true,
}) {
  return (
    <View
      style={{
        marginTop: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          if (previousScreen === 'none') {
            navigation.pop();
          } else {
            navigation.pop();
            setTimeout(() => navigation.navigate(previousScreen), 100);
          }
        }}
        style={{
          width: 22,
          height: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <BackArrowBlack />
      </TouchableOpacity>
      {showCross && (
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{
            width: 22,
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CrossSVG />
        </TouchableOpacity>
      )}
    </View>
  );
}
