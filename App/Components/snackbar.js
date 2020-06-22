import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import Events from 'react-native-simple-events';
import SnackBar from 'rn-snackbar';
import {CrossSVG} from './allSVG';
import styles from '../Themes/styles';

export const showSnackBar = (data = {}) => {
  Events.trigger('showSnackBar', data);
};

const Snackbar = (data = {}) => {
  let [isConnected, setIsConnected] = useState(true);
  console.log(data);
  useEffect(() => {
    let unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    Events.on('showSnackBar', '123456789', showSnack);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isConnected == false) {
      console.log('isConnected', isConnected);
      showSnack({
        message: 'Internet connection is required to proceed',
      });
    }
  }, [isConnected]);

  let showSnack = (data = {}) => {
    let {message, height = 80, ok = false, duration = 3000} = data;
    SnackBar.show('Making the world happier', {
      style: {marginBottom: 12, marginHorizontal: 12, borderRadius: 8},
      duration,
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
          }}>
          <View
            style={{
              flex: 1,
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
            <View
              style={{
                marginTop: 12,
                alignSelf: 'flex-start',
                marginRight: 12,
              }}>
              {ok ? (
                <Text style={[styles.buttonText, {marginRight: 5, flex: 1}]}>
                  OK
                </Text>
              ) : (
                <CrossSVG fillColor={'#FFF'} />
              )}
            </View>
          </View>
        </View>
      ),
    });
  };

  return <View />;
};

export default Snackbar;
