import React, {useState} from 'react';
import {Text, ImageBackground, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {login} from '../../Store/actions/userAction';
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

function HomeScreen({navigation}) {
  const [visible, setVisibility] = useState(false);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../Assets/images/homescreen.png')}>
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
              {[
                {drink: 'Vodka', image: <VodkaSVG />},
                {drink: 'Brandy', image: <BrandySVG />},
                {drink: 'Whiskey', image: <WhiskeySVG />},
                {drink: 'Rum', image: <RumSVG />},
                {drink: 'Gin', image: <GinSVG />},
                {drink: 'Tequila', image: <TaquilaSVG />},
                {drink: 'Wine', image: <WineSVG />},
                {drink: 'Beer', image: <BeerSVG />},
                {drink: 'Non Alcoholic', image: <NonAlcoholicSVG />},
                {drink: 'Non Alcoholic', image: <MoreSVG />},
              ].map(item => {
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
                      {item.image}
                    </TouchableOpacity>
                    <Text style={styles.drinkName}>{item.drink}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          {[
            {header: 'Whiskey', showAll: 'View all'},
            {header: 'Wine', showAll: 'View all'},
            {header: 'Brandy', showAll: 'View all'},
          ].map(item => {
            return (
              <>
                <View style={[styles.title, {marginHorizontal: 25}]}>
                  <Text style={styles.titleText}>{item.header}</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    activeOpacity={1}>
                    <Text style={styles.viewAll}>{item.showAll}</Text>
                    <ArrowSVG />
                  </TouchableOpacity>
                </View>
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={{flexGrow: 1, paddingHorizontal: 10}}>
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
                              style={[
                                styles.liquorTitle,
                                {borderWidth: 1, borderColor: 'red'},
                              ]}
                              numberOfLines={1}>
                              Liquor is one line
                            </Text>
                            <Text
                              style={[
                                styles.quantity,
                                {borderWidth: 1, borderColor: 'green'},
                              ]}>
                              700ml
                            </Text>
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
      </ImageBackground>
    </ScrollView>
  );
}
const mapStateToProps = state => {
  return {state};
};

export default connect(mapStateToProps)(HomeScreen);
