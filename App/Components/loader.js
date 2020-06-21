import React from 'react';
import {View, Modal} from 'react-native';
import {LoaderSvg} from '../Components/allSVG';
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
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            height: 81,
            width: 81,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(255,255,255)',
          }}>
          <LoaderSvg />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
