import React from 'react';
import {View, TouchableOpacity, ImageBackground} from 'react-native';
import {
  SearchSVG,
  NotificationSVG,
  BarzWalletSVG,
  BackArrowWhite,
  BarzPromotion,
  ArrowSVG,
  ShortGlassSVG,
  GreyArrowSVG,
  CloudCartSVG,
  EmptyCloudCartSVG,
} from '../../Components/allSVG';
function CloudBar() {
  return (
      <ImageBackground
        source={require('../../Assets/images/emptyCloudbar.png')}
        style={{flex: 1}}>
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
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('CloudBar')}>
              <BarzWalletSVG />
              <View style={{position: 'absolute', top: 25, right: 30}}>
                <EmptyCloudCartSVG />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <NotificationSVG />
          </TouchableOpacity>
          <View />
        </View>
      </ImageBackground>
  );
}

export default CloudBar;
