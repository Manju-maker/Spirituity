import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {
  BarzWalletSVG,
  BackArrowWhite,
  EmptyCloudCartSVG,
  DiamondSVG,
  EmptyBottleSVG,
} from '../../Components/allSVG';
import {spacing} from '../../Themes/fonts';
import styles from '../../Themes/styles';
function CloudBar({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <ImageBackground
        source={require('../../Assets/images/emptyCloudbar.png')}
        style={{flex: 1, marginBottom: spacing(81)}}>
        <View
          style={{
            flex: 1,
            marginTop: 48,
            marginHorizontal: 24,
            marginBottom: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 17,
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
            <View />
          </View>
          <View
            style={{
              marginHorizontal: spacing(44),
              alignItems: 'flex-end',
            }}>
            <View style={{position: 'absolute', top: 0, left: 0}}>
              <DiamondSVG />
            </View>
            <Text style={[styles.cloudBarTextBold]}>
              You are a Silver Member
            </Text>
            <Text style={[styles.cloudBarTextLight]}>
              10,000 PTS to reach Gold Membership
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <EmptyBottleSVG />
            <Text style={[styles.AR_14_white, {marginTop: spacing(42)}]}>
              Your Bar is empty
            </Text>
            <Text style={styles.AR_14_white}>Start building your Cloudbar</Text>
          </View>
          <View style={styles.buildCloudbarButton}>
            <Text style={styles.buildCloudbarText}>BUILD YOUR CLOUDBAR</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default CloudBar;
