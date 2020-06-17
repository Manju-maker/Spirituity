import React from 'react';
import {View, Text, Image} from 'react-native';

function CloudBar() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={require('../../Assets/images/emptyCloudbar.png')} />
    </View>
  );
}

export default CloudBar;
