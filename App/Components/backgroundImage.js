import React from 'react';
import {View} from 'react-native';
import {CircleSVG, WavesSVG} from '../Components/allSVG';
export default function BackgroundImage({top = 50}) {
  let commonStyle = {position: 'absolute', height: 100, width: 100, top: top};
  return (
    <>
      <View
        style={[
          commonStyle,
          {
            transform: [{translateX: -57}],
            left: 0,
          },
        ]}>
        <WavesSVG />
      </View>
      <View
        style={[
          commonStyle,
          {
            transform: [{translateX: 13}],
            right: 0,
          },
        ]}>
        <CircleSVG />
      </View>
    </>
  );
}
