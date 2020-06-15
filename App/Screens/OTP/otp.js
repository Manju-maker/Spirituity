import React, {useRef, useState, useEffect} from 'react';
// import RNOtpVerify from 'react-native-otp-verify';
import {View, Text, TextInput, AsyncStorage, ScrollView} from 'react-native';
import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';
import Timer from './timer';
import {spacing} from '../../Themes/fonts';
import {showSnackBar} from '../../Components/snackbar';
import {connect} from 'react-redux';
import Store from '../../Store/index';
import {OtpVerifyAndSignup, login} from '../../Store/actions/userAction';
import Loader from '../../Components/loader';
import {SquareSVG, StrawSvg} from '../../Components/allSVG';

function OTP({navigation, ...restProps}) {
  let {
    firstName = '',
    lastName = '',
    countryCode = '',
    email = '',
    password = '',
    mobile = '',
    type = '',
  } =
    (restProps.route && restProps.route.params && restProps.route.params) || {};
  console.log('typeeeeee>>>>>>>>>>>>>>>', type);
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

  let {isLoading = false, signupResponse} = userInfo;
  // useEffect(() => {
  //     RNOtpVerify.getOtp()
  //       .then(p => RNOtpVerify.addListener(otpHandler))
  //       .catch(p => console.log(p));
  // }, []);
  // let otpHandler = message => {
  //   console.log('otp message>>>>>', message);
  //   const otp = /(\d{4})/g.exec(message)[1];
  //   this.setState({otp});
  //   RNOtpVerify.removeListener();
  //   Keyboard.dismiss();
  // };
  useEffect(() => {
    if (signupResponse && signupResponse.Success) {
      let token = {token: 1};
      AsyncStorage.setItem('token', JSON.stringify(token)).then(res => {
        if (type === 'signup') {
          Store.dispatch();
        } else {
          Store.dispatch(login(token));
        }
      });
    } else if (signupResponse && !signupResponse.Success) {
      showSnackBar({message: 'Invalid otp'});
    }
  }, [signupResponse]);

  let onSubmit = () => {
    let otp = otpArray[0] + otpArray[1] + otpArray[2] + otpArray[3];
    let data = {
      first_name: firstName,
      last_name: lastName,
      password,
      mobile: mobile.replace(/\s/g, ''),
      email,
      otp: parseInt(otp),
      country_code: countryCode,
    };
    if (stopTime === false) {
      Store.dispatch(OtpVerifyAndSignup(data));
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
            data={{country_code: countryCode, mobile, type: 'signup'}}
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
