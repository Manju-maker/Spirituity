import React from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import getImage from '../../utils/getImage';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native-gesture-handler';
import styles from '../../Themes/styles';

import {spacing} from '../../Themes/fonts';
import {
  SearchSVG,
  NotificationSVG,
  BarzWalletSVG,
  BackArrowWhite,
  ArrowSVG,
  ShortGlassSVG,
  GreyArrowSVG,
  CloudCartSVG,
  EmptyCloudCartSVG,
} from '../../Components/allSVG';

function Search({navigation}) {
  return (
    <ScrollView
    contentContainerStyle={{flexGrow: 1}}
    showsVerticalScrollIndicator={false}>
    <ImageBackground
      source={getImage('searchBackGround')}
      style={{
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <View
          style={{
            marginTop: 48,
            marginHorizontal: 24,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 18,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackArrowWhite />
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                borderColor: 'red',
                borderWidth: 2,
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
              onPress={() => navigation.navigate('Notification')}>
              <NotificationSVG />
            </TouchableOpacity>
            <View />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 13,
            }}>
            <TextInput
              style={{
                flex: 1,
                color: 'white',
                fontFamily: 'AvenirNext-Regular',
              }}
              placeholderTextColor={'white'}
              placeholderStyle={{
                size: 14,
                fontFamily: 'AvenirNext-Regular',
              }}
              placeholder="Single malt"
            />
            <SearchSVG />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 9,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: spacing(140),
                height: 46,
                borderRadius: 23,
                flexDirection: 'row',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: 'rgba(0,0,0, 0.15)',
                shadowOffset: {height: 10, width: 0},
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Quicksand-Bold',
                    fontSize: 12,
                    color: 'rgb(103,39,180)',
                  }}
                  numberOfLines={1}>
                  SORT BY
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  marginRight: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Quicksand-Bold',
                    fontSize: 12,
                    color: 'rgb(47,11,71)',
                  }}
                  numberOfLines={1}>
                  PRICE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: spacing(100),
                height: 46,
                borderRadius: 23,
                flexDirection: 'row',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: 'rgba(0,0,0, 0.15)',
                shadowOffset: {height: 10, width: 0},
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Quicksand-Bold',
                    fontSize: 12,
                    color: 'rgb(103,39,180)',
                  }}
                  numberOfLines={1}>
                  FILTERS
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  marginRight: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Quicksand-Bold',
                    fontSize: 12,
                    color: 'rgb(47,11,71)',
                  }}
                  numberOfLines={1}>
                  3
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 12,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 5,
            }}>
            <Text
              style={{
                color: 'rgb(255,255,255)',
                fontFamily: 'Quicksand-Bold',
                fontSize: 14,
              }}>
              Showing 25 items
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: 'rgb(255,255,255)',
                  fontFamily: 'Quicksand-Bold',
                  fontSize: 14,
                  marginRight: 8,
                }}>
                Search by Category
              </Text>
              <View style={{marginTop: 6}}>
                <ArrowSVG />
              </View>
            </View>
          </View>
        
            <View
              style={{
                flex: 1,
                marginTop: 8,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
              }}>
              {[
                {image: getImage('Liquor')},
                {image: getImage('wine')},
                {image: getImage('Liquor')},
                {image: getImage('wine')},
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
                      marginBottom: 5,
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
                        <TouchableOpacity onPress={() => setVisibility(true)}>
                          <ShortGlassSVG />
                        </TouchableOpacity>
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
            </View>
        </View>
      </View>
    </ImageBackground>
    </ScrollView>
  );
}

export default Search;
