import React from 'react';
import {View, Text, Image} from 'react-native';
import {ForwardArrowSVG} from '../../Components/allSVG';

function Notification() {
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <ForwardArrowSVG />
        <View>
          <Text>Notifications</Text>
        </View>
      </View>
    </View>
  );
}

export default Notification;
