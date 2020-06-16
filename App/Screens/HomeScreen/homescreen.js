import React, {useEffect, useState} from 'react';
import {Text, Button, ImageBackground, View} from 'react-native';
import {connect} from 'react-redux';
import {login} from '../../Store/actions/userAction';
import Store from '../../Store/index';
import {spacing} from '../../Themes/fonts';
import TabNavigator from '../../Navigators/tabNavigator';
import styles from '../../Themes/styles';

import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SearchSVG,
  NotificationSVG,
  BarzWalletSVG,
  VodkaSVG,
  BrandySVG,
  WhiskeySVG,
  RumSVG,
  GinSVG,
} from '../../Components/allSVG';

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
      <View
        style={{
          flex: 1,
          marginTop: 48,
          marginHorizontal: 24,
          // backgroundColor: 'blue',
        }}>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: 18,
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <SearchSVG />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <BarzWalletSVG />
          </View>

          <View
            style={{
              justifyContent: 'center',
            }}>
            <NotificationSVG />
          </View>
          <View />
        </View>
        <View style={{flex: 1, borderColor: 'green', borderWidth: 2}}>
          <Swiper
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,.3)',
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  marginLeft: 5,
                  marginRight: 5,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: '#fff',
                  width: 18,
                  height: 6,
                  borderRadius: 3,
                  marginLeft: 5,
                  marginRight: 5,
                }}
              />
            }
            paginationStyle={{
              marginBottom: spacing(10),
            }}
            loop={false}>
            {[
              {clr: 'red'},
              {clr: 'yellow'},
              {clr: 'pink'},
              {clr: 'green'},
              {clr: 'purple'},
              {clr: 'white'},
              {clr: 'orange'},
            ].map(item => {
              return (
                <View
                  style={{
                    width: '100%',
                    height: 134,
                    backgroundColor: item.clr,
                    borderRadius: 8,
                  }}
                />
              );
            })}
          </Swiper>
        </View>
        <View style={{flex: 1}}>
          <Text
            style={[styles.boldWhiteText16, {marginLeft: 5, marginBottom: 13}]}>
            Build your CloudBar
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginHorizontal: 2,
              borderColor: 'yellow',
              borderWidth: 2,
            }}>
            {[
              {drink: 'Vodka'},
              {drink: 'Brandy'},
              {drink: 'Whiskey'},
              {drink: 'Rum'},
              {drink: 'Gin'},
            ].map(item => {
              return (
                <View
                  style={{
                    width: 52,
                    marginHorizontal: 7,
                    height: 78,
                    borderWidth: 1,
                    borderColor: 'pink',
                  }}>
                  <View
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 8,
                      borderColor: 'white',
                      borderWidth: 1,
                      marginBottom: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <VodkaSVG />
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#ffffff',
                      fontSize: 10,
                    }}>
                    {item.drink}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View style={{position: 'absolute', bottom: 0}}>
        <Button title="L" onPress={() => logout()} />
      </View>
    </ImageBackground>
  );
}
const mapStateToProps = state => {
  return {state};
};

export default connect(mapStateToProps)(HomeScreen);
