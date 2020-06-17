import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../Screens/SignUp/signup';
import SignIn from '../Screens/SignIn/signin';
import OTP from '../Screens/OTP/otp';
import BoardingScreen from '../Screens/BoardingScreen/boardingScreen';
import {connect} from 'react-redux';
import Store from '../Store/index';
import SignInViaEmail from '../Screens/SignIn/signInViaEmail';
import ForgotPassword from '../Screens/ForgotPassword/forgotPassword';
import ResetPassword from '../Screens/ResetPassword/resetPassword';
import AsyncStorage from '@react-native-community/async-storage';
import TabNavigater from './tabNavigator';
import Events from 'react-native-simple-events';

import {login} from '../Store/actions/userAction';
import Search from '../Screens/Search/search';
import CloudBar from '../Screens/CloudBar/cloudBar';

const Stack = createStackNavigator();
function AppContainer({userInfo, navigation}) {
  let {loginResponse: data} = userInfo;
  let {token} = data || {};
  useEffect(() => {
    AsyncStorage.multiGet(['userInfo', 'showAgeModal']).then(res => {
      console.log('resposneeeee', res);
      if (res[1][1] == null) {
        Events.trigger('showConfirmationModal', {
          header: 'Age Verification',
          message: 'This app requires you to be 18 years or older',
          buttonText: 'I’M OVER 18',
          showExit: true,
        });
      }
      if (res[0][1] != null) {
        let token1 = res[0][1];
        Store.dispatch(login(JSON.parse(token1)));
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {token ? (
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={TabNavigater} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="CloudBar" component={CloudBar} />
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
  return {userInfo: state.reducer};
};

export default connect(mapStateToProps)(AppContainer);
