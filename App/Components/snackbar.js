import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Events from 'react-native-simple-events';
import SnackBar from 'rn-snackbar';
import CrossSVG from './crossSVG';
import styles from '../Themes/styles';

const Snackbar = (data = {}) => {
  let {message, height = 80, ok = false} = data;
  console.log('ok', ok);
  SnackBar.show('Making the world happier', {
    style: {marginBottom: 12, marginHorizontal: 12, borderRadius: 8},
    duration: 3000,
    buttonColor: 'blue',
    textColor: 'yellow',
    confirmText: 'Learn more',
    id: 'CUSTOM_ID',
    tapToClose: true,
    onConfirm: () => {
      console.log('Thank you');
      SnackBar.dismiss();
    },
    cancelText: 'No thanks',
    onCancel: () => {
      console.log('Hope to see you again');
      SnackBar.dismiss();
    },
    renderContent: () => (
      <View
        style={{
          height: height,
          borderRadius: 8,

          backgroundColor: 'rgb(250,114,104)',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            marginLeft: 23,
            marginRight: 40,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'AvenirNext-Regular',
              fontSize: 12,
              lineHeight: 16,
            }}>
            {message}
          </Text>
        </View>
        {ok ? (
          <Text style={[styles.buttonText, {marginRight: 5}]}>OK</Text>
        ) : (
          <CrossSVG />
        )}
      </View>
    ),
  });

  return <View />;
};

export default Snackbar;
