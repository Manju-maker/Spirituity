import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {SHOW_LOADING} from '../../utils/constant';
import {connect} from 'react-redux';
import {
  CircleSVG,
  HidePasswordSVG,
  CheckArrowSVG,
  WavesSVG,
} from '../../Components/allSVG';
import {
  checkField,
  validPassword,
  calculatePasswordScore,
  formatText,
} from '../../utils/validation';
import CallApi from '../../utils/callApi';
import {showSnackBar} from '../../Components/snackbar';
import {
  GoogleFacebookLogin,
  SigningButton,
  InputField,
} from '../../ReusableComponents/commonComponent';
import Store from '../../Store/index';
import {getOtp, resetOtpResponse} from '../../Store/actions/userAction';
import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';
import Loader from '../../Components/loader';
import {GoogleSignUp, FacebookSignUp} from '../../Components/socialSignin';
import BackgroundImage from '../../Components/backgroundImage';

let {purple, offWhite} = colors;

function SignUp({navigation, userInfo}) {
  const [progress, setProgress] = useState([-1, -1, -1, -1]);
  const [boolState, setBoolState] = useState({
    isOver18: false,
    isChecked: false,
    isPasswordHide: true,
  });
  const {isOver18, isChecked, isPasswordHide} = boolState;

  let eleRef = useRef([]);

  let changeState = (key, value) => {
    setBoolState({...boolState, [key]: !value});
  };

  const [state, setState] = useState({
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordError: '',
    emailError: '',
    firstNameError: '',
    phoneNumberError: '',
    lastNameError: '',
    disable: true,
    countryCode: '+91',
  });
  const {
    email,
    phoneNumber,
    firstName,
    password,
    lastName,
    passwordError,
    emailError,
    firstNameError,
    phoneNumberError,
    lastNameError,
    countryCode,
    disable,
  } = state;

  let {isLoading = false} = userInfo;

  let signUp = () => {
    let data = {
      mobile: phoneNumber.replace(/\s/g, ''),
      country_code: countryCode,
      type: 'signup',
    };
    let headers = {
      'content-type': 'application/json',
      token: 'jj2njndejn1oi3ien3ndono11inn3nfy8r7',
    };
    Store.dispatch({type: SHOW_LOADING, payload: true});
    CallApi('post', 'users/otp', data, headers)
      .then(response => {
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (response.status === 200) {
          let data = {
            firstName,
            lastName,
            country_code: countryCode,
            email,
            password,
            mobile: phoneNumber.replace(/\s/g, ''),
            type: 'signup',
          };
          navigation.navigate('OTP', data);
        }
      })
      .catch(error => {
        let {status} = error.response || {};
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (status === 409) {
          showSnackBar({
            message: 'This Number or email is already in use',
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

  let facebookLogin = () => {
    FacebookSignUp()
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  let googleLogin = () => {
    GoogleSignUp()
      .then(res => {
        console.log('response', res);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  let SignIn = () => {
    navigation.navigate('SignIn');
  };
  let checkValidation = () => {
    if (
      passwordError === true &&
      emailError === true &&
      firstNameError === true &&
      phoneNumberError === true &&
      lastNameError === true &&
      isChecked === true &&
      isOver18 === true
    ) {
      return false;
    }
    return true;
  };
  let setData = async (key, text) => {
    let isValid = checkField(key, text.trim());
    if (key == 'password') {
      isValid = validPassword(key, text.trim());
      let calculateScore = calculatePasswordScore(text, isValid);
      if (isValid.length == 0) {
        isValid = true;
      }
      setProgress(calculateScore);
    }
    let formatedText = await formatText(text, key);
    setState({
      ...state,
      [key]: formatedText,
      [`${key}Error`]: isValid,
    });
  };
  useEffect(() => {
    let isValidInput = checkValidation();
    setState({...state, disable: isValidInput});
  }, [
    passwordError,
    emailError,
    firstNameError,
    phoneNumberError,
    lastNameError,
    isChecked,
    isOver18,
  ]);

  let setRef = (ref, field) => {
    eleRef.current[field] = ref;
  };

  let onFocused = field => {
    eleRef.current[field].setNativeProps({style: {borderColor: purple}});
  };

  let onBlur = field => {
    eleRef.current[field].setNativeProps({style: {borderColor: offWhite}});
  };
  let checkArrowStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderColor: colors.offWhite,
    borderRadius: 4,
    borderWidth: 1,
    marginRight: 9,
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}>
      <Loader visible={isLoading} />
      <BackgroundImage />
      <View style={styles.signinChildContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.boldText, styles.marB_13]}>
            Let's Get Started
          </Text>
          <Text style={styles.regularText}>Sign up to start building</Text>
          <Text style={styles.regularText}> your CloudBar</Text>
        </View>
        <View style={{flex: 1, marginBottom: 19}}>
          {[
            {
              header: 'Phone number',
              code: countryCode,
              field: 'phoneNumber',
              placeHolder: 'Enter phone number',
              value: phoneNumber,
              keyboardType: 'number-pad',
              autoCapitalize: 'none',
              error: phoneNumberError,
            },
            {
              header: 'First Name',
              placeHolder: 'Enter FirstName',
              value: firstName,
              field: 'firstName',
              autoCapitalize: 'none',
              error: firstNameError,
            },
            {
              header: 'Last Name',
              placeHolder: 'Enter LastName',
              value: lastName,
              field: 'lastName',
              autoCapitalize: 'none',
              error: lastNameError,
            },
            {
              header: 'Email address',
              placeHolder: 'Enter email address',
              value: email,
              field: 'email',
              autoCapitalize: 'none',
              error: emailError,
            },
            {
              header: 'Password',
              placeHolder: '* * * * *',
              value: password,
              field: 'password',
              autoCapitalize: 'none',
              error: passwordError,
            },
          ].map((item, index) => {
            return (
              <View style={[styles.textInputWrapper]} key={index}>
                <Text style={[styles.text, styles.marB_9]}>{item.header}</Text>
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
                  ref={ref => setRef(ref, item.field)}>
                  {item.field === 'phoneNumber' && (
                    <TextInput
                      value={countryCode}
                      style={{
                        width: 60,
                        textAlign: 'center',
                        borderRightWidth: 1,
                        borderRightColor: offWhite,
                      }}
                    />
                  )}
                  <TextInput
                    style={[{flex: 1, paddingLeft: 16}]}
                    placeholder={item.placeHolder}
                    value={item.value}
                    secureTextEntry={
                      item.field === 'password' ? isPasswordHide : false
                    }
                    autoCapitalize={item.autoCapitalize}
                    onFocus={() => onFocused(item.field)}
                    onBlur={() => onBlur(item.field)}
                    maxLength={item.field === 'phoneNumber' ? 12 : undefined}
                    keyboardType={
                      item.field === 'phoneNumber' ? 'number-pad' : undefined
                    }
                    onChangeText={text => setData(item.field, text)}
                  />
                  {item.field === 'password' && (
                    <TouchableOpacity
                      style={{marginHorizontal: 14}}
                      activeOpacity={0.8}
                      onPress={() =>
                        changeState('isPasswordHide', isPasswordHide)
                      }>
                      <HidePasswordSVG />
                    </TouchableOpacity>
                  )}
                  <Text>
                    {item.error === true && item.field != 'password' && (
                      <CheckArrowSVG />
                    )}
                  </Text>
                </View>
                {item.field != 'password' && item.error != true && (
                  <Text style={{color: 'red'}}>{item.error}</Text>
                )}
              </View>
            );
          })}

          <View style={[styles.rowViewWrapperCenter]}>
            {progress.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    height: 2,
                    borderRadius: 2,
                    marginRight: 2,
                    backgroundColor: item == -1 ? offWhite : 'green',
                  }}
                />
              );
            })}
          </View>
          <Text style={{color: 'red'}}>{passwordError}</Text>
          <View style={[styles.rowViewWrapperEnd, styles.marV_24]}>
            <TouchableOpacity
              style={checkArrowStyle}
              activeOpacity={1}
              onPress={() => changeState('isChecked', isChecked)}>
              {isChecked && <CheckArrowSVG />}
            </TouchableOpacity>
            <Text style={styles.text_12_B}>I agree with the</Text>
            <TouchableOpacity>
              <Text
                style={styles.colorTextRegular}>{` Terms & Conditions`}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.rowViewWrapperEnd, styles.marB_20]}>
            <TouchableOpacity
              style={checkArrowStyle}
              activeOpacity={1}
              onPress={() => changeState('isOver18', isOver18)}>
              {isOver18 && <CheckArrowSVG />}
            </TouchableOpacity>
            <Text style={styles.text_12_B}>I am 18 years or older</Text>
          </View>
          <SigningButton
            text={'SIGN UP'}
            click={() => signUp()}
            style={[styles.button, disable && {backgroundColor: 'gray'}]}
            disable={disable}
          />
          <View style={[styles.rowViewWrapperCenter, {height: 15}]}>
            <View style={[styles.or, styles.marR_15]} />
            <Text style={styles.text_12}>OR</Text>
            <View style={[styles.or, styles.marL_15]} />
          </View>
        </View>
        <GoogleFacebookLogin
          text={[
            {
              text: 'Connect with Facebook',
              imageName: 'Facebook',
              click: () => facebookLogin(),
            },
            {
              text: 'Connect with Google',
              imageName: 'Google',
              click: () => googleLogin(),
            },
          ]}
        />
        <View style={[styles.rowViewWrapperCenter, styles.marT_10]}>
          <Text style={[styles.bottomText]}>You have an account already?</Text>
          <TouchableOpacity style={styles.marL_8} onPress={() => SignIn()}>
            <Text style={styles.colorsText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const mapStateToProps = state => {
  return {userInfo: state.reducer};
};

export default connect(mapStateToProps)(SignUp);
