import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../Screens/SignUp/signup';
import SignIn from '../Screens/SignIn/signin';
import OTP from '../Screens/OTP/otp';
import BoardingScreen from '../Screens/BoardingScreen/boardingScreen';
import HomeScreen from '../Screens/HomeScreen/homescreen';
import AppAuthenticate from './appAuthenticate';
import {connect} from 'react-redux';
import Store from '../Store/index';
import SignInViaEmail from '../Screens/SignIn/signInViaEmail';
import ForgotPassword from '../Screens/ForgotPassword/forgotPassword';
import ResetPassword from '../Screens/ResetPassword/resetPassword';
import AsyncStorage from '@react-native-community/async-storage';
import Events from 'react-native-simple-events';

import {isLogin} from '../Store/actions/userAction';

const Stack = createStackNavigator();
function AppContainer({token, navigation}) {
  useEffect(() => {
    AsyncStorage.multiGet(['token', 'showAgeModal']).then(res => {
      console.log('resposneeeee', res);
      if (res[1][1] == null) {
        Events.trigger('showAgeVerifyModal', {show: true});
      }
      if (res[0][1] != null) {
        let token1 = res[0][1];
        Store.dispatch(isLogin(JSON.parse(token1)));
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {console.log('Tokennnn>>>>', token)}
      {token ? (
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="BoardingScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignInViaEmail" component={SignInViaEmail} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="BoardingScreen" component={BoardingScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
const mapStateToProps = state => {
  return {token: state.reducer.token};
};

export default connect(mapStateToProps)(AppContainer);
