import React from 'react';
import {View, Text, Modal} from 'react-native';

const Loader = props => {
  let {visible} = props;
  console.log('Visible', visible);
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,.7)',
        }}>
        <View
          style={{
            height: 81,
            width: 81,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Loader</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
