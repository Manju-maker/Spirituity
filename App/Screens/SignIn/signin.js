import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import Store from '../../Store/index';

import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';
import {SigningButton} from '../../ReusableComponents/commonComponent';

import Header from '../../Components/Header';
import {checkField, formatText} from '../../utils/validation';
import {showSnackBar} from '../../Components/snackbar';

import {SHOW_LOADING} from '../../utils/constant';
import CallApi from '../../utils/callApi';
import Loader from '../../Components/loader';
import {CheckArrowSVG} from '../../Components/allSVG';

import BackgroundImage from '../../Components/backgroundImage';
import {spacing} from '../../Themes/fonts';
import config from '../../Config/config';
const height = spacing(Dimensions.get('window').height / 4);

let {purple, offWhite, disableColor} = colors;

function SignIn({navigation, ...restProps}) {
  let eleRef = useRef([]);
  let [state, setState] = useState({
    phoneNumber: '',
    phoneNumberError: '',
    countryCode: config.countryCode,
    disable: true,
  });
  let {phoneNumber, phoneNumberError, countryCode, disable} = state;

  let {isLoading = false} = restProps.userInfo;

  let signIn = () => {
    let data = {
      mobile: phoneNumber.replace(/\s/g, ''),
      country_code: countryCode,
      type: 'signin',
    };
    let headers = {
      'content-type': 'application/json',
      token: config.headerToken,
    };
    Store.dispatch({type: SHOW_LOADING, payload: true});
    CallApi('post', 'auth/users/otp', data, headers)
      .then(response => {
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (response.status === 200) {
          navigation.pop();
          setTimeout(() => navigation.navigate('OTP', data), 500);
        }
      })
      .catch(error => {
        let {data, status} = error.response || {};
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (status === 404) {
          showSnackBar({
            message: 'Phone number not registered',
          });
        } else if (error.message === 'Network Error') {
          showSnackBar({
            message: 'Internet connection is required to proceed',
          });
        } else {
          showSnackBar({message: 'Something Went Wrong'});
        }
      });
  };

  useEffect(() => {
    if (phoneNumberError === true) {
      setState({...state, disable: false});
    } else {
      setState({...state, disable: true});
    }
  }, [phoneNumberError]);

  let setData = async (field, text) => {
    let formatedText = await formatText(text, field);
    let isValid = checkField(field, formatedText.trim());
    setState({...state, [field]: formatedText, [`${field}Error`]: isValid});
  };

  let setRef = (ref, field) => {
    eleRef.current[field] = ref;
  };
  let onFocus = field => {
    eleRef.current[field].setNativeProps({style: {borderColor: purple}});
  };
  let onBlur = field => {
    eleRef.current[field].setNativeProps({style: {borderColor: offWhite}});
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}>
      <Loader visible={isLoading} />
      <TouchableWithoutFeedback onPress={() => navigation.pop()}>
        <View style={{height}} />
      </TouchableWithoutFeedback>
      <View
        style={{
          flex: 1,
          marginTop: 10,
          backgroundColor: 'white',
        }}>
        <Header navigation={navigation} showCross={false} />
        <BackgroundImage top={50} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: spacing(20),
            marginBottom: spacing(36),
          }}>
          <Text style={[styles.boldText, styles.mar_13]}>Enter your </Text>
          <Text style={[styles.boldText, styles.mar_13]}>phone number</Text>
        </View>

        <View style={{flex: 2, marginHorizontal: 20, marginBottom: 14}}>
          <View style={{flex: 1}}>
            <View style={styles.textInputWrapper}>
              <View
                style={[
                  styles.inputBox,
                  {
                    flexDirection: 'row',
                    paddingLeft: 0,
                    alignItems: 'center',
                    paddingRight: 5,
                  },
                ]}
                ref={ref => setRef(ref, 'phoneNumber')}>
                <TextInput
                  value={countryCode}
                  style={{
                    width: 60,
                    textAlign: 'center',
                    borderRightWidth: 1,
                    borderRightColor: offWhite,
                  }}
                />
                <TextInput
                  style={[{flex: 1, paddingLeft: 16}]}
                  placeholder="Enter phone number"
                  keyboardType={'number-pad'}
                  value={phoneNumber}
                  onFocus={() => onFocus('phoneNumber')}
                  onBlur={() => onBlur('phoneNumber')}
                  maxLength={12}
                  onChangeText={text => setData('phoneNumber', text)}
                />
                <Text>{phoneNumberError === true && <CheckArrowSVG />}</Text>
              </View>
              <Text style={[styles.text, {color: 'red', marginTop: 5}]}>
                {phoneNumberError}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
              setTimeout(() => navigation.navigate('SignInViaEmail'), 500);
            }}>
            <Text
              style={[
                styles.colorsText,
                {color: purple, textAlign: 'center', marginBottom: 14},
              ]}>
              Sign In via Email
            </Text>
          </TouchableOpacity>

          <SigningButton
            text={'SIGN IN'}
            click={() => signIn()}
            style={[
              styles.button,
              {marginBottom: 20},
              disable && {backgroundColor: disableColor},
            ]}
            disable={disable}
          />

          <View style={[styles.rowViewWrapperCenter]}>
            <Text style={[styles.bottomText]}>Don't have an account?</Text>
            <TouchableOpacity
              style={styles.marL_8}
              onPress={() =>
                navigation.dispatch(StackActions.replace('SignUp'))
              }>
              <Text style={styles.colorsText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const mapStateToProps = state => {
  return {userInfo: state.User};
};

export default connect(mapStateToProps)(SignIn);
