import React from 'react';
import {
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {
  SearchSVG,
  BarzWalletSVG,
  EmptyCloudCartSVG,
  NotificationSVG,
  BackArrowWhite,
  ProductDetailWavesSVG,
  YellowCircleSVG,
} from '../../Components/allSVG';
import {spacing} from '../../Themes/fonts';
import {ScrollView} from 'react-native-gesture-handler';
import getImage from '../../utils/getImage';
import styles from '../../Themes/styles';

const width = Dimensions.get('screen').width;

let buttonWidth = width / 2 - 20;
const ProductDetail = ({navigation}) => {
  return (
    <View
      style={{flex: 1, borderColor: 'red', borderWidth: 5, marginBottom: 20}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          style={{height: 369, width, borderWidth: 3, borderColor: 'black'}}
          source={require('../../Assets/images/product.png')}>
          <View
            style={{
              flex: 1,
              marginTop: 48,
            }}>
            <View style={{marginHorizontal: 20}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginBottom: spacing(18),
                  borderColor: 'red',
                  borderWidth: 2,
                }}>
                <TouchableOpacity
                  style={{justifyContent: 'center'}}
                  activeOpacity={1}
                  onPress={() => navigation.goBack()}>
                  <BackArrowWhite />
                </TouchableOpacity>

                <View
                  style={{
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: 'black',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <TouchableOpacity activeOpacity={1}>
                    <BarzWalletSVG />
                    <View style={{position: 'absolute', top: 25, right: 30}}>
                      <EmptyCloudCartSVG />
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{justifyContent: 'center'}}
                  activeOpacity={1}>
                  <NotificationSVG />
                </TouchableOpacity>

                <View />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                borderColor: 'green',
                borderWidth: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{width: 66, height: 254}}
                source={require('../../Assets/images/wine.png')}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  transform: [{translateX: 0}],
                  right: 0,
                  width: 39,
                  height: 52,
                }}>
                <YellowCircleSVG />
              </View>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            borderWidth: 2,
            borderColor: 'red',
            flex: 1,
            marginHorizontal: 20,
          }}>
          <View
            style={{
              transform: [{translateX: -70}],
              position: 'absolute',
              top: 0,
              left: 0,
              height: 63,
              width: 40,
            }}>
            <ProductDetailWavesSVG />
          </View>
          <View
            style={{
              marginTop: 23,
              borderColor: 'green',
              borderWidth: 2,
              flex: 1,
              marginBottom: 14,
            }}>
            <Text style={styles.productDetailTitle}>
              Jack Daniel’s Old No.7 Tennessee Whiskey
            </Text>
            <Text style={styles.productDetailQuantity}>700ml</Text>
            <Text
              style={[
                styles.AR_14_black,
                {marginTop: 17},
              ]}>{`With a unique freshness from the same Highland spring water they’ve used since 1887, its distinctive fruitiness comes from the high cut point William Grant always insisted upon. \n\n Carefully matured in the finest American oak and European oak sherry casks for at least 12 years, it is mellowed in oak marrying tuns to create its sweet and subtle oak flavours.`}</Text>
            <View
              style={{
                marginTop: 15,
                flexDirection: 'row',
                borderWidth: 5,
                borderColor: 'red',
                alignItems: 'center',
                paddingHorizontal: 24,
              }}>
              <Image
                source={getImage('pallet')}
                style={{width: 20, height: 20}}
              />
              <Text
                style={[
                  styles.text_12,
                  {
                    flex: 1,
                    flexWrap: 'wrap',
                    marginLeft: 24,
                    borderColor: 'red',
                    borderWidth: 5,
                  },
                ]}>
                This liquor is a specialty item. You can only consume this in
                <Text style={{color: '#6727B4'}}> select bars</Text>
              </Text>
            </View>
            <View
              style={{
                marginTop: 8,
                borderWidth: 2,
                borderColor: 'red',
              }}>
              <Text style={{marginTop: 28, marginBottom: 16}}>
                Tasting Notes
              </Text>
              <View
                style={{
                  marginTop: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 24,
                  height: 77,
                  borderWidth: 5,
                  borderColor: 'red',
                  backgroundColor: '#F6F4F4',
                }}>
                <Image
                  source={getImage('pallet')}
                  style={{width: 20, height: 20}}
                />
                <Text
                  style={[
                    styles.text_12,
                    {
                      flex: 1,
                      flexWrap: 'wrap',
                      marginLeft: 24,
                      borderColor: 'red',
                      borderWidth: 5,
                    },
                  ]}>
                  Taste pallet infobox. Distinctively fresh and fruity with a
                  hint of pear. Beautifully crafted single malt with a
                  delicately balanced
                </Text>
              </View>
              <View
                style={{
                  marginTop: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 24,
                  height: 77,
                  borderWidth: 5,
                  borderColor: 'red',
                  backgroundColor: '#F6F4F4',
                  marginBottom: 24,
                }}>
                <Image
                  source={getImage('pallet')}
                  style={{width: 20, height: 20}}
                />
                <Text
                  style={[
                    styles.text_12,
                    {
                      flex: 1,
                      flexWrap: 'wrap',
                      marginLeft: 24,
                      borderColor: 'red',
                      borderWidth: 5,
                    },
                  ]}>
                  Taste pallet infobox. Distinctively fresh and fruity with a
                  hint of pear. Beautifully crafted single malt with a
                  delicately balanced
                </Text>
              </View>
            </View>
            <View style={{marginTop: 8}}>
              <Text style={{marginTop: 24}}>Yield</Text>
              <Text style={{marginTop: 14}}>
                Approximate number of shots per bottle in bar class level
              </Text>
              <View
                style={{
                  borderWidth: 5,
                  borderColor: 'red',
                  marginTop: 15,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#222222',
                    width: 57,
                    height: 28,
                    marginLeft: 8,
                  }}>
                  <Text>700 ml</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#C2C2C2',
                    width: 57,
                    height: 28,
                    marginLeft: 8,
                  }}>
                  <Text>1000 ml</Text>
                </View>
                <View></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          height: 56,
          justifyContent: 'center',
          marginHorizontal: 20,
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: '#9852eb',
            borderTopLeftRadius: 28,
            borderBottomLeftRadius: 28,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.colorsText, {letterSpacing: 1}]}>BUY NOW</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#9852eb',
            borderTopRightRadius: 28,
            borderBottomRightRadius: 28,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.barzButtonText, {letterSpacing: 1}]}>
            ADD TO CART
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;
