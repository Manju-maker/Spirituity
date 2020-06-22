import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';

import Loader from '../../Components/loader';
import Header from '../../Components/Header';
import {CheckArrowSVG} from '../../Components/allSVG';

import Store from '../../Store/index';
import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';

import {SigningButton} from '../../ReusableComponents/commonComponent';
import {checkField} from '../../utils/validation';
import {showSnackBar} from '../../Components/snackbar';

import {SHOW_LOADING} from '../../utils/constant';
import CallApi from '../../utils/callApi';
import {formatText} from '../../utils/validation';

import BackgroundImage from '../../Components/backgroundImage';
import {spacing} from '../../Themes/fonts';
const height = spacing(Dimensions.get('window').height / 4);

function ForgotPassword({navigation, ...restProps}) {
  let {purple, offWhite, disableColor} = colors;
  let {isLoading = false} = restProps.userInfo;
  let eleRef = useRef([]);
  let [state, setState] = useState({
    email: '',
    emailError: '',
    phoneNumber: '',
    phoneNumberError: '',
    countryCode: '+91',
    disable: true,
  });
  let [showEmailField, setEmailField] = useState(false);
  let {
    email,
    emailError,
    phoneNumber,
    phoneNumberError,
    countryCode,
    disable,
  } = state;

  useEffect(() => {
    if (showEmailField === true && emailError === true) {
      setState({...state, disable: false});
    } else if (showEmailField === false && phoneNumberError === true) {
      setState({...state, disable: false});
    } else {
      setState({...state, disable: true});
    }
  }, [emailError, phoneNumberError, showEmailField]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    navigation.pop();
    setTimeout(() => navigation.navigate('SignInViaEmail'), 500);
    return true;
  };

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

  let callService = (method, route, data) => {
    let headers = {
      'content-type': 'application/json',
      token: 'jj2njndejn1oi3ien3ndono11inn3nfy8r7',
    };
    Store.dispatch({type: SHOW_LOADING, payload: true});
    CallApi(method, route, data, headers)
      .then(res => {
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (res.status === 200) {
          console.log('response>>>>>', res.data);
          if (showEmailField === false) {
            let data = {
              country_code: countryCode,
              mobile: phoneNumber.replace(/\s/g, ''),
              type: 'reset',
            };
            navigation.pop();
            setTimeout(() => navigation.navigate('OTP', data), 500);
          } else {
            showSnackBar({
              message: 'Email sent successfully.',
            });
          }
        }
      })
      .catch(error => {
        let {data, status} = error.response || {};
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (status === 404) {
          showSnackBar({
            message: data.statusMessage,
          });
        } else if (error.message === 'Network Error') {
          showSnackBar({
            message: 'No Internet Connection,Please check!',
          });
        } else {
          showSnackBar({message: 'Something Went Wrong'});
        }
      });
  };

  let submit = () => {
    let data = {};
    if (showEmailField === true) {
      data = {email};
      callService('post', 'users/reset-password/email', data);
    } else if (showEmailField === false) {
      let data = {
        mobile: phoneNumber.replace(/\s/g, ''),
        country_code: countryCode,
        type: 'reset',
      };
      callService('post', 'users/otp', data);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps={'always'}>
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
        <Header navigation={navigation} previousScreen={'SignInViaEmail'} />
        <BackgroundImage top={50} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: spacing(20),
            marginBottom: spacing(36),
          }}>
          <Text style={[styles.boldText, styles.mar_13]}>Enter your Email</Text>
        </View>

        <View style={{flex: 2, marginHorizontal: 20}}>
          <View style={{flex: 1, marginTop: 20}}>
            {showEmailField && (
              <View style={styles.textInputWrapper}>
                <Text style={[styles.text, styles.marB_9]}>Email address</Text>
                <View
                  style={[
                    styles.inputBox,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 5,
                    },
                  ]}
                  ref={ref => setRef(ref, 'email')}>
                  <TextInput
                    style={{flex: 1}}
                    placeholder="Enter email address"
                    value={email}
                    autoCapitalize={'none'}
                    onFocus={() => onFocus('email')}
                    onBlur={() => onBlur('email')}
                    onChangeText={text => setData('email', text)}
                  />
                  <Text>{emailError === true && <CheckArrowSVG />}</Text>
                </View>
                <Text style={[styles.regularText, {color: 'red'}]}>
                  {emailError}
                </Text>
              </View>
            )}
            {!showEmailField && (
              <View style={styles.textInputWrapper}>
                <Text style={[styles.text, styles.marB_9]}>Phone number</Text>
                <View
                  style={[
                    styles.inputBox,
                    {
                      flexDirection: 'row',
                      paddingLeft: 0,
                      alignItems: 'center',
                      paddingHorizontal: 5,
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
                    value={phoneNumber}
                    onFocus={() => onFocus('phoneNumber')}
                    onBlur={() => onBlur('phoneNumber')}
                    keyboardType={'number-pad'}
                    onChangeText={text => setData('phoneNumber', text)}
                    maxLength={12}
                  />
                  <Text>{phoneNumberError === true && <CheckArrowSVG />}</Text>
                </View>
                <Text style={[styles.text, {color: 'red', marginTop: 5}]}>
                  {phoneNumberError}
                </Text>
              </View>
            )}
          </View>
          <View style={{alignSelf: 'center', marginBottom: 30}}>
            <TouchableOpacity
              style={{marginBottom: 10}}
              onPress={() => {
                setState({...state, disable: true});
                setEmailField(true);
              }}>
              <Text style={[styles.colorsText, {textAlign: 'center'}]}>
                Reset Using Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setState({...state, disable: true});
                setEmailField(false);
              }}>
              <Text style={[styles.colorsText, {textAlign: 'center'}]}>
                Reset Using Mobile Number
              </Text>
            </TouchableOpacity>
          </View>

          <SigningButton
            text={'SUBMIT'}
            click={() => submit()}
            style={[
              styles.button,
              {marginBottom: 10},
              disable && {backgroundColor: disableColor},
            ]}
            disable={disable}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  return {userInfo: state.reducer};
};

export default connect(mapStateToProps)(ForgotPassword);
