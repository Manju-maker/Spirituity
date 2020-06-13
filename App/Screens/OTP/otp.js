import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  AsyncStorage,
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
import {WavesSVG, CircleSVG} from '../../Components/allSVG';

function OTP({navigation, ...restProps}) {
  console.log('Propssssssssssssssssssssssss', restProps);
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
  }, [one, two, three, four]);

  let handleChange = (text, field) => {
    setState({...state, [field]: text});
    if (text.length === 1) {
      if (field === 'one') {
        eleRef.current['two'].focus();
      } else if (field === 'two') {
        eleRef.current['three'].focus();
      } else if (field === 'three') {
        eleRef.current['four'].focus();
      }
    }
  };
  return (
    <View style={styles.container}>
      <Loader visible={isLoading} />
      <View
        style={{
          position: 'absolute',
          transform: [{translateX: -57}],
          left: 0,
          height: 100,
          width: 100,
          top: 50,
        }}>
        <WavesSVG />
      </View>
      <View
        style={{
          position: 'absolute',
          transform: [{translateX: 13}],
          right: 0,
          height: 100,
          width: 100,
          top: 50,
        }}>
        <CircleSVG />
      </View>
      <View style={{flex: 1, marginHorizontal: 0}}>
        <Text
          style={[
            styles.boldText,
            {position: 'absolute', top: spacing(50), alignSelf: 'center'},
          ]}>
          Verify Mobile Number
        </Text>

        <View style={{flex: 1, marginVertical: spacing(40)}}>
          <Text
            style={[
              styles.regularText,
              {textAlign: 'center', paddingVertical: 30},
            ]}>{`OTP has been sent to you on your \n mobile phone. Please enter it below`}</Text>

          <View style={{flex: 1, marginHorizontal: 8, marginTop: spacing(50)}}>
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
              ].map(item => {
                return (
                  <TextInput
                    autoFocus={item.focus}
                    value={item.value}
                    style={styles.otpInput}
                    maxLength={1}
                    onFocus={() => onFocus(item.field)}
                    onBlur={() => onBlur(item.field)}
                    onChangeText={text => handleChange(text, item.field)}
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
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {userInfo: state.reducer};
};

export default connect(mapStateToProps)(OTP);
