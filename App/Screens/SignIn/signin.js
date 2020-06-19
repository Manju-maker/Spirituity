import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import Store from '../../Store/index';
import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';
import {SigningButton} from '../../ReusableComponents/commonComponent';
import {checkField, formatText} from '../../utils/validation';

import {showSnackBar} from '../../Components/snackbar';
import {SHOW_LOADING} from '../../utils/constant';
import CallApi from '../../utils/callApi';
import {getOtp} from '../../Store/actions/userAction';
import Loader from '../../Components/loader';
import BackgroundImage from '../../Components/backgroundImage';
import {spacing} from '../../Themes/fonts';
const height = spacing(Dimensions.get('window').height / 3);
let {purple, offWhite, disableColor} = colors;

function SignIn({navigation, ...restProps}) {
  let eleRef = useRef([]);
  let [state, setState] = useState({
    phoneNumber: '',
    phoneNumberError: '',
    countryCode: '+91',
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
    // Store.dispatch(getOtp(data));
    let headers = {
      'content-type': 'application/json',
      token: 'jj2njndejn1oi3ien3ndono11inn3nfy8r7',
    };
    Store.dispatch({type: SHOW_LOADING, payload: true});
    CallApi('post', 'users/otp', data, headers)
      .then(response => {
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (response.status === 200) {
          navigation.navigate('OTP', data);
        }
      })
      .catch(error => {
        let {data, status} = error.response || {};
        console.log('Error in sign in???', data);
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (status === 404) {
          showSnackBar({
            message: 'Mobile number not found.',
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

  useEffect(() => {
    if (phoneNumberError === true) {
      console.log('Errrrrrrrrrrrrrr', phoneNumberError);
      setState({...state, disable: false});
    } else {
      setState({...state, disable: true});
    }
  }, [phoneNumberError]);

  let setData = async (field, text) => {
    console.log('textttt', text);
    let formatedText = await formatText(text, field);
    console.log('formatedddtext', formatedText);
    let isValid = checkField(field, formatedText.trim());
    console.log('is validdddddddddddddddddddddddd', isValid);

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
      keyboardShouldPersistTaps={'always'}>
      <Loader visible={isLoading} />
      <View style={styles.container}>
        <View style={{height, backgroundColor: colors.mudGrey}} />
        <View
          style={{
            flex: 1,
            marginTop: 10,
            marginBottom: 20,
          }}>
          <ImageBackground
            style={{
              flex: 1,
              height: spacing(150),
              justifyContent: 'center',
            }}
            resizeMode={'contain'}
            source={require('../../Assets/images/BG.png')}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.boldText, styles.mar_13]}>Enter your </Text>
              <Text style={[styles.boldText, styles.mar_13]}>phone number</Text>
            </View>
          </ImageBackground>
          <View style={{flex: 2, marginHorizontal: 20}}>
            <View style={{flex: 1}}>
              <View style={styles.textInputWrapper}>
                <View
                  style={[
                    styles.inputBox,
                    {flexDirection: 'row', paddingLeft: 0},
                  ]}
                  ref={ref => setRef(ref, 'phoneNumber')}>
                  <TextInput
                    value={countryCode}
                    style={{width: 40, textAlign: 'right'}}
                  />
                  <TextInput
                    style={[{flex: 1}]}
                    placeholder="Enter phone number"
                    keyboardType={'number-pad'}
                    value={phoneNumber}
                    onFocus={() => onFocus('phoneNumber')}
                    onBlur={() => onBlur('phoneNumber')}
                    maxLength={12}
                    onChangeText={text => setData('phoneNumber', text)}
                  />
                </View>
                <Text style={[styles.regularText, {color: 'red'}]}>
                  {phoneNumberError}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignInViaEmail')}>
                  <Text
                    style={[
                      styles.colorsText,
                      {color: 'blue', textAlign: 'center', marginTop: 20},
                    ]}>
                    Sign In via Email
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

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
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.colorsText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const mapStateToProps = state => {
  return {userInfo: state.reducer};
};

export default connect(mapStateToProps)(SignIn);
