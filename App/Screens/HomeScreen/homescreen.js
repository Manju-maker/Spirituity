import React, {useEffect} from 'react';
import {Text, Button, ImageBackground, Image, View} from 'react-native';
import {connect} from 'react-redux';
import {login} from '../../Store/actions/userAction';
import Store from '../../Store/index';
import TabNavigator from '../../Navigators/tabNavigator';
import AsyncStorage from '@react-native-community/async-storage';

function HomeScreen() {
  const logout = () => {
    AsyncStorage.removeItem('userInfo').then(res => {
      console.log('logut>>>', res);
      Store.dispatch(login(res));
    });
  };

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../Assets/images/homescreen.png')}>
      <Text>OKK</Text>
      <Button title="logout" onPress={() => logout()} />
      <Image
        style={{position: 'absolute', bottom: 0, width: '100%'}}
        source={require('../../Assets/images/bottomTab.png')}
      />
      <View
        style={{position: 'absolute', bottom: 0, height: 50, width: '100%'}}>
        <Image
          style={{height: 40, width: 40}}
          source={require('../../Assets/images/home.png')}
        />
      </View>
    </ImageBackground>
  );
}
const mapStateToProps = state => {
  return {state};
};

export default connect(mapStateToProps)(HomeScreen);
