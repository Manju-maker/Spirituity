import React, {useEffect, useState} from 'react';
import {Text, Button, ImageBackground, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {login} from '../../Store/actions/userAction';
import Store from '../../Store/index';
import {spacing} from '../../Themes/fonts';
import TabNavigator from '../../Navigators/tabNavigator';
import styles from '../../Themes/styles';
import {
  BarzPromotion,
  ArrowSVG,
  ShortGlassSVG,
  GreyArrowSVG,
  CloudCartSVG,
} from '../../Components/allSVG';

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
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import getImage from '../../utils/getImage';

function HomeScreen() {
  const [visible, setVisibility] = useState(false);
  const logout = () => {
    AsyncStorage.removeItem('userInfo').then(res => {
      console.log('logut>>>', res);
      Store.dispatch(login(res));
    });
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../Assets/images/homescreen.png')}>
        <View
          style={{
            flex: 1,
            marginTop: 48,
            marginHorizontal: 24,
            marginBottom: 20,
            // backgroundColor: 'blue',
          }}>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              marginBottom: 18,
              borderWidth: 5,
              borderColor: 'red',
              justifyContent: 'space-between',
            }}>
            <SearchSVG />

            <BarzWalletSVG />

            <NotificationSVG />
            <View />
          </View>
          <View style={{borderWidth: 5, borderColor: 'red'}}>
            <Swiper style={{height: 200}} loop={false}>
              {[
                <BarzPromotion />,
                <BarzPromotion />,
                <BarzPromotion />,
                <BarzPromotion />,
                <BarzPromotion />,
                <BarzPromotion />,
                <BarzPromotion />,
              ].map(item => {
                return (
                  <View
                    style={{
                      borderColor: 'green',
                      borderWidth: 4,
                      borderRadius: 8,
                    }}>
                    {item}
                  </View>
                );
              })}
            </Swiper>
          </View>
          <View style={{borderWidth: 5, borderColor: 'red'}}>
            <Text
              style={[
                styles.boldWhiteText16,
                {marginLeft: 5, marginBottom: 13},
              ]}>
              Build your CloudBar
            </Text>
            {[1, 2].map(item => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
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
                          marginBottom: 7,
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
              );
            })}
          </View>
          {[
            {header: 'Whiskey', showAll: 'View all'},
            {header: 'Wine', showAll: 'View all'},
            {header: 'Rhum', showAll: 'View all'},
          ].map(item => {
            return (
              <>
                <View
                  style={{
                    borderWidth: 5,
                    borderColor: 'red',
                    flexDirection: 'row',
                    marginBottom: 12,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: 'rgb(255,255,255)',
                      fontSize: 12,
                      fontFamily: 'Quicksand-Bold',
                    }}>
                    {item.header}
                  </Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => alert('Clicked')}>
                    <Text
                      style={{
                        color: 'rgb(255,255,255)',
                        fontSize: 12,
                        fontFamily: 'Quicksand-Bold',
                        marginRight: 8,
                      }}>
                      {item.showAll}
                    </Text>
                    <ArrowSVG />
                  </TouchableOpacity>
                </View>
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={{flexGrow: 1}}>
                  {[
                    {image: getImage('Liquor')},
                    {image: getImage('wine')},
                    {image: getImage('Liquor')},
                    {image: getImage('wine')},
                  ].map(item => {
                    return (
                      <View
                        style={{
                          width: 109,
                          height: 145,
                          marginRight:8,
                          borderRadius: 7,
                          backgroundColor: 'rgb(255,255,255)',

                        }}>
                        <View
                          style={{
                            paddingHorizontal: 6,
                            paddingVertical: 5,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                            }}>
                            <ShortGlassSVG />
                            <Image source={item.image} />
                            <GreyArrowSVG />
                          </View>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'AvenirNext-Medium',
                                fontSize: 12,
                                textAlign: 'center',
                              }}
                              numberOfLines={1}>
                              Liquor is one line
                            </Text>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontFamily: 'AvenirNext-Regular',
                                fontSize: 9,
                                marginTop: 3,
                                color: 'rgb(34,34,34)',
                              }}>
                              700ml
                            </Text>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontFamily: 'AvenirNext-Bold',
                                color: 'rgb(0,0,0)',
                              }}>
                              $167.50
                            </Text>
                            <View
                              style={{
                                width: 95,
                                height: 24,
                                borderRadius: 10.5,
                                backgroundColor: '#9852eb',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                              }}>
                              <CloudCartSVG />
                              <Text style={[styles.text_9_B, {marginLeft: 6}]}>
                                CLOUDBAR
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </>
            );
          })}
        </View>
        <View style={{position: 'absolute', bottom: 0}}>
          <Button title="L" onPress={() => logout()} />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
const mapStateToProps = state => {
  return {state};
};

export default connect(mapStateToProps)(HomeScreen);
