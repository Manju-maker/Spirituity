import React, {useEffect, useState} from 'react';
import {
  Text,
  Button,
  ImageBackground,
  Image,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import {CheckArrowSVG} from '../../Components/allSVG';
import {login} from '../../Store/actions/userAction';
import Store from '../../Store/index';
import styles from '../../Themes/styles';

import {BarzWhiteSVG} from '../../Components/allSVG';
import {spacing} from '../../Themes/fonts';
import TabNavigator from '../../Navigators/tabNavigator';
import AsyncStorage from '@react-native-community/async-storage';

function HomeScreen() {
  const [visible, setVisibility] = useState(false);
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
      <Button title="L" onPress={() => logout()} />
      <View
        style={{
          width: '100%',
          height: 50,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'red',
        }}
      />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setVisibility(true)}
        style={{
          width: '100%',
          alignItems: 'center',
          position: 'absolute',
          top: 70,
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisibility(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              height: 300,
              position: 'absolute',
              bottom: 0,
            }}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
              <ImageBackground
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingTop: 30,
                  marginVertical: 10,
                  marginHorizontal: 10,
                  borderRadius: 10,
                }}
                resizeMode={'stretch'}
                source={require('../../Assets/images/homescreen.png')}>
                <View style={{alignItems: 'center', marginTop: spacing(50)}}>
                  <BarzWhiteSVG />
                  <Text style={styles.boardingTitle}> Your Barz Anywhere</Text>
                </View>
                <View style={{alignItems: 'center', marginTop: spacing(50)}}>
                  <Text
                    style={[
                      styles.boldTextWhite,
                      styles.marH_53,
                      {textAlign: 'center'},
                    ]}>
                    Build your Cloud Bar anytime, anywhere
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>
      </Modal>

      {/* <Image
        style={{position: 'absolute', bottom: 0, width: '100%'}}
        source={require('../../Assets/images/bottomTab.png')}
      />
      <View
        style={{position: 'absolute', bottom: 0, height: 50, width: '100%'}}>
        <Image
          style={{height: 40, width: 40}}
          source={require('../../Assets/images/home.png')}
        />
      </View> */}
    </ImageBackground>
  );
}
const mapStateToProps = state => {
  return {state};
};

export default connect(mapStateToProps)(HomeScreen);
