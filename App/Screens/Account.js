import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Store from '../Store/index';
import {login} from '../Store/actions/userAction';
import {View} from 'react-native';
function Account({navigation, userInfo}) {
  useEffect(() => {
    AsyncStorage.removeItem('userInfo').then(res => {
      console.log('logut>>>', res);
      Store.dispatch(login(res));
    });
  }, []);
  return <View />;
}
export default Account;
