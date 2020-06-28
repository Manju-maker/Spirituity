import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  ScrollView,
  Keyboard,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import RNOtpVerify from 'react-native-otp-verify';

import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';
import Timer from './timer';

import {spacing} from '../../Themes/fonts';
import {showSnackBar} from '../../Components/snackbar';
import CallApi from '../../utils/callApi';

import {connect} from 'react-redux';
import Store from '../../Store/index';
import {SquareSVG, StrawSvg} from '../../Components/allSVG';

import {SHOW_LOADING} from '../../utils/constant';
import Loader from '../../Components/loader';
import {UPDATE_USER_DATA_SUCCESS} from '../../utils/constant';
import config from '../../Config/config';

import {digit} from '../../utils/validation';

function OTP({navigation, ...restProps}) {
  let {country_code = '', mobile = '', type = ''} =
    (restProps.route && restProps.route.params && restProps.route.params) || {};
  let {userInfo} = restProps;
  let eleRef = useRef([]);
  let {purple, offWhite} = colors;
  const [state, setState] = useState({one: '', two: '', three: '', four: ''});
  const [closeTimer, setTimerClose] = useState(false);
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
  console.log('userInfouserInfouserInfouserInfouserInfo', userInfo);
  let {isLoading = false, loginResponse} = userInfo;
  let {token = ''} = loginResponse;

  useEffect(() => {
    readOtp();
  }, []);

  let handleOTP = otp => {
    return new Promise((resolve, reject) => {
      let a = otp;
      let c = a.toString();
      let b = [];
      let j = 0;
      for (let i of c) {
        b[j] = i;
        j++;
      }
      resolve(b);
    });
  };

  let otpHandler = async message => {
    try {
      const otp = /(\d{4})/g.exec(message)[1];
      let finalOTP = await handleOTP(otp);
      setOtpArray(otp => {
        let final = otp.every(item => {
          return item.length == 0;
        });
        if (final) {
          return finalOTP;
        }
        return otp;
      });

      Keyboard.dismiss();
      RNOtpVerify.removeListener();
    } catch (error) {
      console.log('Error raeding otp');
    }
  };

  let callService = (method, route, data) => {
    let headers = {
      'content-type': 'application/json',
      token: token,
    };
    Store.dispatch({type: SHOW_LOADING, payload: true});
    CallApi(method, route, data, headers)
      .then(res => {
        if (res.status === 200) {
          setTimerClose(true);
          CallApi('get', 'users/home/profile', {}, headers)
            .then(response => {
              if (response.status === 200) {
                Store.dispatch({type: SHOW_LOADING, payload: false});
                Store.dispatch({
                  type: UPDATE_USER_DATA_SUCCESS,
                  payload: response.data.response,
                });
                navigation.pop();
              }
            })
            .catch(error => {
              Store.dispatch({type: SHOW_LOADING, payload: true});
            });
          console.log('Suucess>>>>>>>', res);
        }
      })
      .catch(error => {
        let {data, status} = error.response || {};
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (status === 400) {
          showSnackBar({
            message: 'Invalid OTP',
          });
        } else if (status === 409) {
          showSnackBar({
            message: 'Email already  registered',
          });
        } else if (status === 404) {
          showSnackBar({
            message: data.statusMessage,
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

  let onSubmit = () => {
    let otp = otpArray[0] + otpArray[1] + otpArray[2] + otpArray[3];
    if (stopTime === false) {
      let data = {
        mobile,
        country_code: country_code,
        otp,
      };
      callService('put', 'auth/users/profile', data);
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
    if (digit(text) || text === '') {
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
          otpArrayCopy[index - 1] = '';
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  let readOtp = () => {
    RNOtpVerify.getOtp()
      .then(p => {
        RNOtpVerify.addListener(otpHandler);
      })
      .catch(err => console.log('err of otp verigy>>>>>>>>>', err));
    return () => RNOtpVerify.removeListener();
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
            ]}>{`An OTP has been sent to you on your  mobile phone. Please enter it below`}</Text>
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
              eleRef.current['one'].focus();
              readOtp();
              setMaxLimit(maxLimit + 1);
              setOtpArray(['', '', '', '']);
              setExpired(false);
              setTimerClose(false);
            }}
            closeTimer={closeTimer}
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
  return {userInfo: state.User};
};

export default connect(mapStateToProps)(OTP);
