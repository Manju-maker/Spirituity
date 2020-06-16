import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {
  CircleSVG,
  HidePasswordSVG,
  CheckArrowSVG,
  WavesSVG,
} from '../../Components/allSVG';
import Store from '../../Store/index';
import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';
import getImage from '../../utils/getImage';
import {SigningButton} from '../../ReusableComponents/commonComponent';
import {checkField} from '../../utils/validation';
import {SnackBar} from '../../Components/snackbar1';
import {forgot, getOtpForFoget} from '../../Store/actions/userAction';
import {formatText} from '../../utils/validation';
const height = Dimensions.get('window').height / 4;

function ForgotPassword({navigation, ...restProps}) {
  let {purple, offWhite} = colors;
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

  let {forgotEmailResponse = '', forgetOtpResponse = ''} = restProps.userInfo;

  useEffect(() => {
    if (showEmailField === true && emailError === true) {
      setState({...state, disable: false});
    } else if (showEmailField === false && phoneNumberError === true) {
      setState({...state, disable: false});
    }
  }, [emailError, phoneNumberError, showEmailField]);

  useEffect(() => {
    console.log('server response>>>>>>>>>>>>>>>>', forgotEmailResponse);
  }, [forgotEmailResponse]);

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
  let commonStyle = {position: 'absolute', height: 100, width: 100, top: 50};

  let changeState = (field, value) => {
    setState({...state, [field]: !value});
  };

  let submit = () => {
    let data = {};
    if (showEmailField === true) {
      data = {email};
      Store.dispatch(forgot(data));
    } else if (showEmailField === false) {
      let data = {
        mobile: phoneNumber.replace(/\s/g, ''),
        country_code: countryCode,
        type: 'reset',
      };
      Store.dispatch(getOtpForFoget(data));
    }
    console.log('data >>>>>>>>>>>>>>>>>>>>', data);
    // Store.dispatch(forgot(data));
    // navigation.navigate('ResetPassword');
    // <SnackBar message={'Reset link has been sent to your registered email'} />;
  };

  useEffect(() => {
    console.log('forgetOtpResponse>>>>', forgetOtpResponse);
    if (forgetOtpResponse && forgetOtpResponse.status == true) {
      let data = {
        countryCode,
        mobile: phoneNumber.replace(/\s/g, ''),
        type: 'Forget',
      };
      navigation.navigate('OTP', data);
    }
  }, [forgetOtpResponse]);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps={'always'}>
      <View
        style={{
          flex: 1,
          marginTop: 10,
          marginBottom: 20,
        }}>
        <View
          style={[
            commonStyle,
            {
              transform: [{translateX: -57}],
              left: 0,
            },
          ]}>
          <WavesSVG />
        </View>
        <View
          style={[
            commonStyle,
            {
              transform: [{translateX: 13}],
              right: 0,
            },
          ]}>
          <CircleSVG />
        </View>
        <View style={styles.signinChildContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.boldText, styles.mar_13]}>
              Forgot Password
            </Text>
          </View>
          <View style={{alignSelf: 'center', marginTop: 30, marginBottom: 30}}>
            <TouchableOpacity
              style={{marginBottom: 10}}
              onPress={() => {
                setState({...state, disable: true});
                setEmailField(true);
              }}>
              <Text style={styles.colorsText}>Forgot Using Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setState({...state, disable: true});
                setEmailField(false);
              }}>
              <Text style={styles.colorsText}>Forgot Using Mobile Number</Text>
            </TouchableOpacity>
          </View>
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
                <Text style={{color: 'red'}}>{emailError}</Text>
              </View>
            )}
            {/* <View style={[styles.rowViewWrapperCenter, {marginBottom: 20}]}>
              <View style={[styles.or, styles.marR_15]} />
              <Text style={styles.text_12}>OR</Text>
              <View style={[styles.or, styles.marL_15]} />
            </View> */}
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
                <Text style={{color: 'red'}}>{phoneNumberError}</Text>
              </View>
            )}
          </View>

          <SigningButton
            text={'SUBMIT'}
            click={() => submit()}
            style={[
              styles.button,
              {marginBottom: 0},
              disable && {backgroundColor: 'gray'},
            ]}
            disable={disable}
          />
          <View style={[styles.rowViewWrapperCenter, {marginTop: 20}]}>
            <Text style={[styles.bottomText]}>Don't have an account?</Text>
            <TouchableOpacity
              style={styles.marL_8}
              onPress={() => navigation.navigate('ResetPassword')}>
              <Text style={styles.colorsText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  return {userInfo: state.reducer};
};

export default connect(mapStateToProps)(ForgotPassword);
