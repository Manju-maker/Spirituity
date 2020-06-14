import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';
import Timer from './timer';
import {spacing} from '../../Themes/fonts';
import Snackbar from '../../Components/snackbar';
import {connect} from 'react-redux';
import CallApi from '../../utils/callApi';
import Store from '../../Store/index';
import {OtpVerifyAndSignup, login} from '../../Store/actions/userAction';
import Loader from '../../Components/loader';
import {SquareSVG, StrawSvg} from '../../Components/allSVG';
import {getLastUpdateTime} from 'react-native-device-info';

function OTP({navigation, ...restProps}) {
  let {
    firstName = '',
    lastName = '',
    countryCode = '',
    email = '',
    password = '',
    mobile = '',
  } = restProps.route && restProps.route.params && restProps.route.params;
  let {userInfo} = restProps;
  let eleRef = useRef([]);
  let {purple, offWhite} = colors;
  const [state, setState] = useState({one: '', two: '', three: '', four: ''});
  const [otpArray, setOtpArray] = useState(['', '', '', '']);
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
  useEffect(() => {
    console.log('resp[onse>>>>>>>>>>>>>', signupResponse);

    if (signupResponse && signupResponse.Success) {
      let token = {token: 1};
      AsyncStorage.setItem('token', JSON.stringify(token)).then(res => {
        Store.dispatch(login(token));
      });
    } else if (signupResponse && !signupResponse.Success) {
      Snackbar({message: 'Invalid otp', height: 30});
    }
  }, [signupResponse]);

  let onSubmit = (one, two, three, four) => {
    let otp = one + two + three + four;
    let data = {
      first_name: firstName,
      last_name: lastName,
      password,
      mobile,
      email,
      otp: parseInt(otp),
      country_code: countryCode,
    };

    Store.dispatch(OtpVerifyAndSignup(data));
  };

  useEffect(() => {
    if (
      one.length === 1 &&
      two.length === 1 &&
      three.length === 1 &&
      four.length === 1
    ) {
      onSubmit(one, two, three, four);
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
            onRefresh={() =>
              setState({...state, one: '', two: '', three: '', four: ''})
            }
            refreshFocus={() => {
              eleRef.current['one'].focus();
            }}
            data={{country_code: countryCode, mobile, type: 'signup'}}
            isExpired={(expired) => {
              console.log('time expired',expired);
            }}
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
