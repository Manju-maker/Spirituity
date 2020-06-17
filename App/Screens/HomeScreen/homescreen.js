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
  EmptyCloudCartSVG,
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

function HomeScreen({navigation}) {
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
          }}>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              marginBottom: 18,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{justifyContent: 'center', flex: 1}}
              onPress={() => navigation.navigate('Search')}>
              <SearchSVG />
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('CloudBar')}>
                <BarzWalletSVG />
                <View style={{position: 'absolute', top: 25, right: 30}}>
                  <EmptyCloudCartSVG />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{justifyContent: 'center', flex: 1}}
              onPress={() => navigation.navigate('Notification')}>
              <NotificationSVG />
            </TouchableOpacity>
            <View />
          </View>

          <Swiper
            style={{height: 190}}
            activeDot={<View style={styles.activeDot} />}
            loop={false}>
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
                    borderRadius: 8,
                  }}>
                  {item}
                </View>
              );
            })}
          </Swiper>

          <View style={{}}>
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
                        <View style={styles.drinkCategoryStyle}>
                          <VodkaSVG />
                        </View>
                        <Text style={styles.drinkName}>{item.drink}</Text>
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
            {header: 'Rum', showAll: 'View all'},
          ].map(item => {
            return (
              <>
                <View style={styles.title}>
                  <Text style={styles.titleText}>{item.header}</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => alert('Clicked')}>
                    <Text style={styles.viewAll}>{item.showAll}</Text>
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
                          marginRight: 8,
                          borderRadius: 7,
                          backgroundColor: 'rgb(255,255,255)',
                          shadowColor: '#26000000',
                          shadowOffset: {height: 5, width: 0},
                          shadowOpacity: 1,
                          shadowRadius: 1,
                          elevation: 5,
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
                            <Text style={styles.liquorTitle} numberOfLines={1}>
                              Liquor is one line
                            </Text>
                            <Text style={styles.quantity}>700ml</Text>
                            <Text style={styles.price}>$167.50</Text>
                            <View style={styles.cloudbarText}>
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
