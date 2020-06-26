import React, {useState, useEffect} from 'react';
import {Text, ImageBackground, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {getCategory} from '../../Store/actions/userAction';
import Store from '../../Store/index';
import styles from '../../Themes/styles';

import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';
import {
  BarzPromotion,
  ArrowSVG,
  ShortGlassSVG,
  GreyArrowSVG,
  CloudCartSVG,
  EmptyCloudCartSVG,
  SearchSVG,
  NotificationSVG,
  BarzWalletSVG,
  VodkaSVG,
  BrandySVG,
  WhiskeySVG,
  RumSVG,
  GinSVG,
  TaquilaSVG,
  WineSVG,
  BeerSVG,
  NonAlcoholicSVG,
  MoreSVG,
} from '../../Components/allSVG';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import getImage from '../../utils/getImage';
import {spacing} from '../../Themes/fonts';
import ShotGlassModal from '../../Components/shotGlassModal';

function HomeScreen({navigation, userInfo}) {
  const [visible, setVisibility] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  let {allCategory} = userInfo;

  useEffect(() => {
    Store.dispatch(getCategory());
  }, []);

  useEffect(() => {
    setAllCategories(allCategory);
  }, [userInfo]);

  console.log('allcategory>>>>>>>>>>>>>>>', allCategories);
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../Assets/images/homescreen.png')}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ShotGlassModal
          visible={visible}
          setVisible={value => setVisibility(value)}
          navigation={navigation}
        />
        <View
          style={{
            flex: 1,
            marginTop: 48,
            marginBottom: 20,
          }}>
          <View style={{marginHorizontal: 24}}>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                marginBottom: spacing(18),
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Search')}
                style={{justifyContent: 'center', flex: 1}}
                activeOpacity={1}>
                <SearchSVG />
              </TouchableOpacity>

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <TouchableOpacity activeOpacity={1}>
                  <BarzWalletSVG />
                  <View style={{position: 'absolute', top: 25, right: 30}}>
                    <EmptyCloudCartSVG />
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetail')}
                style={{justifyContent: 'center', flex: 1}}
                activeOpacity={1}>
                <NotificationSVG />
              </TouchableOpacity>
              <View />
            </View>

            <Swiper
              style={{height: spacing(160)}}
              activeDot={<View style={styles.activeDot} />}
              dot={<View style={styles.promotionDot} />}
              paginationStyle={{bottom: 0}}
              loop={true}
              autoplay={true}>
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
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {item}
                  </View>
                );
              })}
            </Swiper>

            <Text
              style={[
                styles.boldWhiteText16,
                {
                  marginLeft: 5,
                  marginBottom: spacing(13),
                  marginTop: spacing(23),
                },
              ]}>
              Build your CloudBar
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {allCategories.length > 0 &&
                allCategories.map(item => {
                  return (
                    <View
                      style={{
                        width: 52,
                        marginHorizontal: 7,
                        height: 78,
                        marginBottom: 7,
                      }}>
                      <TouchableOpacity
                        style={styles.drinkCategoryStyle}
                        onFocus={{backgroundColor: 'yellow'}}>
                        <Image
                          source={{
                            uri: item.img_key,
                          }}
                          style={{width: 25, height: 25}}
                        />
                      </TouchableOpacity>
                      <Text style={styles.drinkName}>{item.category_name}</Text>
                    </View>
                  );
                })}
            </View>
          </View>
          {allCategories.length > 0 &&
            allCategories.map(item => {
              return (
                <>
                  <View style={[styles.title, {marginHorizontal: 25}]}>
                    <Text style={styles.titleText}>{item.category_name}</Text>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      activeOpacity={1}>
                      <Text style={styles.viewAll}>View all</Text>
                      <ArrowSVG />
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    horizontal={true}
                    contentContainerStyle={{
                      flexGrow: 1,
                      paddingHorizontal: 10,
                    }}>
                    {[
                      {image: getImage('Liquor')},
                      {image: getImage('wine')},
                      {image: getImage('Liquor')},
                      {image: getImage('wine')},
                    ].map((item, index) => {
                      return (
                        <View
                          style={{
                            width: 109,
                            height: 145,
                            marginRight: index < 3 ? 8 : undefined,
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
                                marginBottom: 4,
                              }}>
                              <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => setVisibility(true)}>
                                <ShortGlassSVG />
                              </TouchableOpacity>
                              <Image source={item.image} />
                              <TouchableOpacity
                                activeOpacity={1}
                                onPress={() =>
                                  navigation.navigate('ProductDetail')
                                }>
                                <GreyArrowSVG />
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={[styles.liquorTitle]}
                                numberOfLines={1}>
                                Liquor is one line
                              </Text>
                              <Text style={[styles.quantity]}>700ml</Text>
                              <Text style={[styles.price]}>$167.50</Text>
                              <View style={styles.cloudbarText}>
                                <CloudCartSVG />
                                <Text
                                  style={[
                                    styles.text_9_B,
                                    {
                                      marginLeft: 6,
                                      paddingTop: 7,
                                      paddingBottom: 7,
                                    },
                                  ]}>
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
      </ScrollView>
    </ImageBackground>
  );
}
const mapStateToProps = state => {
  return {userInfo: state.reducer};
};

export default connect(mapStateToProps)(HomeScreen);
