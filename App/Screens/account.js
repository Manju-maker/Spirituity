import React, {useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from 'react-native';
import getImage from '../utils/getImage';
import {
  BackArrowWhite,
  ArrowSVG,
  PurpleForwardArrowSVG,
} from '../Components/allSVG';
import {connect} from 'react-redux';
import styles from '../Themes/styles';
import Store from '../Store/index';
import {login} from '../Store/actions/userAction';
import Events from 'react-native-simple-events';
import {ScrollView} from 'react-native-gesture-handler';

function Account({navigation, userInfo}) {
  let {loginResponse} = userInfo;
  useEffect(() => {
    if (loginResponse === null) {
      Events.trigger('showConfirmationModal', {
        header: 'Sign up required',
        message: 'Please sign up to continue using Barz App',
        buttonText: 'JOIN BARZ',
        showExit: true,
        exitModal: true,
        navigation: navigation,
      });
    }
  }, []);

  let logout = () => {
    AsyncStorage.removeItem('userInfo').then(res => {
      console.log('logut>>>', res);
      Store.dispatch(login(res));
    });
  };

  let contents = [
    {text: 'Profile Settings', screen: 'ProfileSettings'},
    {text: 'My Purchases'},
    {text: 'My Orders'},
    {text: 'Order History'},
    {text: 'About Barz'},
    {text: 'Contact Us'},
  ];
  return (
    <ImageBackground style={{flex: 1}} source={getImage('searchBackGround')}>
      <View
        style={{
          marginTop: 60,
          marginHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrowWhite />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()} style={styles.logout}>
          <Text style={[styles.titleText, {letterSpacing: 1.33}]}>LOG OUT</Text>
          <ArrowSVG />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <View style={styles.round}>
          <Text style={styles.QB_18_18_white}>MS</Text>
          <Image source={getImage('Diamond')} style={styles.diamond} />
        </View>
        <Text style={[styles.cloudBarTextBold, {marginTop: 18}]}>
          You are a Silver Member
        </Text>
        <Text style={[styles.cloudBarTextLight, {paddingVertical: 2.5}]}>
          10,000 PTS to reach Gold Membership
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 21,
          marginHorizontal: 8,
          backgroundColor: 'white',
        }}>
        <ScrollView>
          {contents.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => item.screen && navigation.navigate(item.screen)}
                style={{
                  height: 63,
                  borderBottomWidth: 1,
                  borderBottomColor: '#EDEDED',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginHorizontal: 25,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.colorsText]}>{item.text}</Text>
                  <PurpleForwardArrowSVG />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
const mapStateToProps = state => {
  return {userInfo: state.reducer};
};
export default connect(mapStateToProps)(Account);
