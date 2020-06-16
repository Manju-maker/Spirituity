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
import {getOtp} from '../../Store/actions/userAction';
import Loader from '../../Components/loader';
import BackgroundImage from '../../Components/backgroundImage';

const height = Dimensions.get('window').height / 3;
let {purple, offWhite} = colors;

function SignIn({navigation, ...restProps}) {
  let eleRef = useRef([]);
  let [state, setState] = useState({
    phoneNumber: '',
    phoneNumberError: '',
    countryCode: '+91',
    disable: true,
  });
  let {phoneNumber, phoneNumberError, countryCode, disable} = state;

  let {isLoading = false, otpResponse = null} = restProps.userInfo;

  let signIn = () => {
    let data = {
      mobile: phoneNumber.replace(/\s/g, ''),
      country_code: countryCode,
      type: 'signin',
    };
    Store.dispatch(getOtp(data));
  };

  useEffect(() => {
    if (otpResponse && otpResponse.status == true) {
      let data = {
        type: 'SignIn',
        mobile: phoneNumber.replace(/\s/g, ''),
        country_code: countryCode,
      };
      navigation.navigate('OTP', data);
    } else if (otpResponse != null && otpResponse.data.status == false) {
      showSnackBar({
        message:
          otpResponse.data &&
          otpResponse.data.statusMessage &&
          otpResponse.data.statusMessage,
      });
    }
  }, [otpResponse]);

  useEffect(() => {
    if (phoneNumberError === true) {
      setState({...state, disable: false});
    } else {
      setState({...state, disable: true});
    }
  }, [phoneNumberError]);

  let setData = async (field, text) => {
    let isValid = checkField(field, text.trim());
    let formatedText = await formatText(text, field);

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
            height: 150,
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
              <Text style={{color: 'red'}}>{phoneNumberError}</Text>
              <Text
                onPress={() => navigation.navigate('SignInViaEmail')}
                style={[
                  styles.colorsText,
                  {color: 'blue', textAlign: 'center'},
                ]}>
                Sign In via Email
              </Text>
            </View>
          </View>

          <SigningButton
            text={'SIGN IN'}
            click={() => signIn()}
            style={[
              styles.button,
              {marginBottom: 20},
              disable && {backgroundColor: 'gray'},
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
