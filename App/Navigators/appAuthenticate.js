import React, {useEffect} from 'react';
import {Platform, Linking} from 'react-native';
import Store from '../Store/index';

export default function AppAuthenticate({navigation}) {
  // if (Platform.OS === 'android') {
  //   Linking.getInitialURL().then(url => {
  //     console.log('urlll', url);
  //     navigate(url);
  //   });
  // } else {
  //   Linking.addEventListener('url', () => {
  //     handleOpenURL;
  //   });
  // }
  // return () => {
  //   Linking.removeEventListener('url', handleOpenURL());
  // };

  // handleOpenURL = event => {
  //   navigate(event.url);
  // };

  // let navigate = url => {
  // const {navigate} = navigation;
  // console.log('url', url);
  // navigate('ResetPassword');
  // const route = url.replace(/.*?:\/\//g, '');
  // const id = route.match(/\/([^\/]+)\/?$/)[1];
  // const routeName = route.split('/')[0];
  // if (routeName === 'reset') {
  //   navigate('ResetPassword');
  // }
  // };

  return <></>;
}
