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
            ]}>{`With a unique freshness from the same Highland spring water they’ve used since 1887, its distinctive fruitiness comes from the high cut point William Grant always insisted upon. \n Carefully matured in the finest American oak and European oak sherry casks for at least 12 years, it is mellowed in oak marrying tuns to create its sweet and subtle oak flavours.`}</Text>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{height: 30, width: 20, backgroundColor: 'yellow'}} />
            <Text style={styles.text_12}>
              This liquor is a specialty item. You can only consume this in
              select bars
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 56,
              width: width - 40,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderWidth: 2,
                borderColor: '#9852eb',
                borderTopLeftRadius: 28,
                borderBottomLeftRadius: 28,
                width: buttonWidth,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.colorsText, {letterSpacing: 1}]}>
                BUY NOW
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#9852eb',
                borderTopRightRadius: 28,
                borderBottomRightRadius: 28,
                width: buttonWidth,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.barzButtonText, {letterSpacing: 1}]}>
                ADD TO CART
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;
