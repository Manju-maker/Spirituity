import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {get} from 'lodash';
import Store from '../../Store/index';
import {signinViaEmail, isLogin, login} from '../../Store/actions/userAction';
import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';
import getImage from '../../utils/getImage';
import {SigningButton} from '../../ReusableComponents/commonComponent';
import CheckArrowSVG from '../../Components/checkArrowSVG';
import HidePasswordSVG from '../../Components/hidePasswordSVG';
import {checkField} from '../../utils/validation';
import Loader from '../../Components/loader';
import { showSnackBar } from '../../Components/snackbar';
const height = Dimensions.get('window').height / 4;

function SignInViaEmail({navigation, ...restProps}) {
  let {purple, offWhite} = colors;
  let {userInfo} = restProps;
  let {isLoading = false, loginResponse} = userInfo;
  let eleRef = useRef([]);
  let [state, setState] = useState({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    isPasswordHide: true,
    disable: true,
  });
  let {
    email,
    emailError,
    password,
    passwordError,
    isPasswordHide,
    disable,
  } = state;

  let signIn = () => {
    let data = {email, password};

    Store.dispatch(signinViaEmail(data));

    // navigation.navigate('ForgotPassword');
  };

  useEffect(() => {
    console.log('otpRESPONSE of emaillll>>>>>>>>', loginResponse);
    if (loginResponse && loginResponse.status == true) {
      let {response: userInfo} = loginResponse;
      let {token, data} = userInfo;
      console.log('userInfouserInfouserInfo', userInfo);
      let userData = {data, token};
      AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      Store.dispatch(login(userData));
    } else if (loginResponse && loginResponse.status === 401) {
      showSnackBar({message: 'Invalid email or password'});
    }
  }, [loginResponse]);

  useEffect(() => {
    if (emailError === true && passwordError === true) {
      setState({...state, disable: false});
    }
  }, [emailError, passwordError]);

  let setData = (field, text) => {
    let isValid = checkField(field, text.trim());
    setState({...state, [field]: text, [`${field}Error`]: isValid});
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

  let changeState = (field, value) => {
    setState({...state, [field]: !value});
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps={'always'}>
      <Loader visible={isLoading} />
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
            <Text style={[styles.boldText, styles.mar_13]}>
              Enter your Email
            </Text>
          </View>
        </ImageBackground>
        <View style={{flex: 2, marginHorizontal: 20}}>
          <View style={{flex: 1}}>
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
                  onFocus={() => onFocus('email')}
                  onBlur={() => onBlur('email')}
                  onChangeText={text => setData('email', text)}
                />
                <Text>{emailError === true && <CheckArrowSVG />}</Text>
              </View>
              <Text style={{color: 'red'}}>{emailError}</Text>
            </View>
            <View style={styles.textInputWrapper}>
              <Text style={[styles.text, styles.marB_9]}>Password</Text>
              <View
                style={[
                  styles.inputBox,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  },
                ]}
                ref={ref => setRef(ref, 'password')}>
                <TextInput
                  style={{flex: 1}}
                  placeholder="* * * * *"
                  value={password}
                  secureTextEntry={isPasswordHide}
                  onFocus={() => onFocus('password')}
                  onBlur={() => onBlur('password')}
                  onChangeText={text => setData('password', text)}
                />
                <TouchableOpacity
                  style={{marginHorizontal: 14}}
                  activeOpacity={0.8}
                  onPress={() => changeState('isPasswordHide', isPasswordHide)}>
                  <HidePasswordSVG />
                </TouchableOpacity>
              </View>
              <Text style={{color: 'red'}}>{passwordError}</Text>
            </View>
            <Text
              onPress={() => navigation.navigate('ForgotPassword')}
              style={[
                styles.colorsText,
                {color: 'blue', textAlign: 'center', marginBottom: 20},
              ]}>
              Forgot Password
            </Text>
          </View>

          <SigningButton
            text={'SIGN IN'}
            click={() => signIn()}
            style={[
              styles.button,
              {marginBottom: 0},
              disable && {backgroundColor: 'gray'},
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

export default connect(mapStateToProps)(SignInViaEmail);
