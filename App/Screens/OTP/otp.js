import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TextInput, AsyncStorage, ScrollView} from 'react-native';
import SmsRetriever from 'react-native-sms-retriever';
import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';
import Timer from './timer';
import {spacing} from '../../Themes/fonts';
import {showSnackBar} from '../../Components/snackbar';
import CallApi from '../../utils/callApi';
import {connect} from 'react-redux';
import Store from '../../Store/index';
import {SHOW_LOADING} from '../../utils/constant';
import {
  OtpVerifyAndSignup,
  login,
  signinViaOtp,
  forgetViaOtp,
} from '../../Store/actions/userAction';
import Loader from '../../Components/loader';
import {SquareSVG, StrawSvg} from '../../Components/allSVG';

function OTP({navigation, ...restProps}) {
  let {
    firstName = '',
    lastName = '',
    country_code = '',
    email = '',
    password = '',
    mobile = '',
    type = '',
  } =
    (restProps.route && restProps.route.params && restProps.route.params) || {};
  let {userInfo} = restProps;
  let eleRef = useRef([]);
  let {purple, offWhite} = colors;
  const [state, setState] = useState({one: '', two: '', three: '', four: ''});
  const [maxLimit, setMaxLimit] = useState(0);
  const [otpArray, setOtpArray] = useState(['', '', '', '']);
  const [stopTime, setExpired] = useState(false);
  const {one, two, three, four} = state;
  let setRef = (ref, field) => {
    eleRef.current[field] = ref;
  };
  let onFocus = field => {
    eleRef.current[field].setNativeProps({style: {borderColor: purple}});
  };
  let onBlur = field => {
    eleRef.current[field].setNativeProps({style: {borderColor: offWhite}});
  };

  let {isLoading = false} = userInfo;

  let callService = (method, route, data, reset = false) => {
    let headers = {
      'content-type': 'application/json',
      token: 'jj2njndejn1oi3ien3ndono11inn3nfy8r7',
    };
    Store.dispatch({type: SHOW_LOADING, payload: true});
    CallApi(method, route, data, headers)
      .then(res => {
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (res.status === 200) {
          if (reset) {
            console.log('response for otp resest>>>>', res.data);
            let {mobile, country_code, otp} = data;
            let dataToSend = {mobile, country_code, otp};
            navigation.navigate('ResetPassword', dataToSend);
          } else {
            let {response} = res.data;
            let {data, token} = response;
            let userData = {data, token};
            AsyncStorage.setItem('userInfo', JSON.stringify(userData));
            Store.dispatch(login(userData));
          }
        }
      })
      .catch(error => {
        let {status} = error.response || {};
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (status === 400) {
          showSnackBar({
            message: 'Invalid OTP',
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

  let onSubmit = () => {
    let otp = otpArray[0] + otpArray[1] + otpArray[2] + otpArray[3];
    if (stopTime === false) {
      if (type === 'signup') {
        let data = {
          first_name: firstName,
          last_name: lastName,
          password,
          mobile,
          email,
          otp: parseInt(otp),
          country_code: country_code,
        };
        // Store.dispatch(OtpVerifyAndSignup(data));
        callService('post', 'users/signup', data);
      } else if (type === 'signin') {
        let data = {
          mobile,
          country_code: '+91',
          otp: parseInt(otp),
        };
        console.log('sign iva otp>>>>>>>>>>>');
        // Store.dispatch(signinViaOtp(data));
        callService('post', 'users/signin/otp-verify', data);
      } else if (type === 'reset') {
        let data = {
          mobile,
          country_code: country_code,
          otp: parseInt(otp),
        };
        navigation.navigate('ResetPassword', data);
        // Store.dispatch(forgetViaOtp(data));
        callService('post', 'users/otp/verify', data, true); //// api will be provided to verify otp
      }
    } else {
      showSnackBar({message: 'Otp Expired'});
    }
  };

  let validateOtp = otp => {
    let final = otp.every(item => {
      return item.length >= 1;
    });
    return final;
  };
  useEffect(() => {
    let valid = validateOtp(otpArray);
    if (valid) {
      onSubmit();
    }
  }, [otpArray]);

  let handleChange = (text, index) => {
    const otpArrayCopy = otpArray.concat();
    otpArrayCopy[index] = text;
    setOtpArray(otpArrayCopy);
    if (text != '') {
      if (index === 0) {
        eleRef.current['two'].focus();
      } else if (index === 1) {
        eleRef.current['three'].focus();
      } else if (index === 2) {
        eleRef.current['four'].focus();
      }
    }
  };
  let onOtpKeyPress = (index, field) => {
    return ({nativeEvent: {key: value}}) => {
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          eleRef.current['one'].focus();
        } else if (index === 2) {
          eleRef.current['two'].focus();
        } else if (index === 3) {
          eleRef.current['three'].focus();
        }
        if (index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps={'always'}>
      <View style={[styles.container]}>
        <Loader visible={isLoading} />
        <View
          style={{
            position: 'absolute',
            transform: [{translateX: 30}],
            left: -40,
            height: 100,
            width: 100,
            top: spacing(120),
          }}>
          <StrawSvg />
        </View>
        <View
          style={{
            position: 'absolute',
            right: -65,
            height: 100,
            width: 100,
            top: spacing(140),
          }}>
          <SquareSVG />
        </View>
        <View
          style={{
            marginTop: spacing(110),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.boldText, {textAlign: 'center'}]}>
            Verify Mobile Number
          </Text>
          <Text
            style={[
              styles.regularText,
              {
                textAlign: 'center',
                marginTop: 12,
                marginHorizontal: spacing(44),
              },
            ]}>{`OTP has been sent to you on your  mobile phone. Please enter it below`}</Text>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: spacing(40),
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: 53,
              justifyContent: 'center',
            }}>
            {[
              {field: 'one', value: one, focus: true},
              {field: 'two', value: two, focus: false},
              {field: 'three', value: three, focus: false},
              {field: 'four', value: four, focus: false},
            ].map((item, index) => {
              return (
                <TextInput
                  autoFocus={item.focus}
                  value={otpArray[index]}
                  style={styles.otpInput}
                  maxLength={1}
                  onKeyPress={onOtpKeyPress(index, item.field)}
                  keyboardType={'number-pad'}
                  onFocus={() => onFocus(item.field)}
                  onBlur={() => onBlur(item.field)}
                  onChangeText={text => handleChange(text, index)}
                  ref={ref => setRef(ref, item.field)}
                />
              );
            })}
          </View>
          <Timer
            onRefresh={() => {
              setMaxLimit(maxLimit + 1);
              setOtpArray(['', '', '', '']);
              setExpired(false);
            }}
            refreshFocus={() => {
              eleRef.current['one'].focus();
            }}
            setLimit={() => setMaxLimit(0)}
            maxLimit={maxLimit}
            data={{country_code, mobile, type}}
            isExpired={value => setExpired(value)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  return {userInfo: state.reducer};
};

export default connect(mapStateToProps)(OTP);
