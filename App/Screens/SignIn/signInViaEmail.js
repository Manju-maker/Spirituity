import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  AsyncStorage,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import getImage from '../../utils/getImage';

import Store from '../../Store/index';
import {login} from '../../Store/actions/userAction';
import styles from '../../Themes/styles';

import {colors} from '../../Themes/colors';
import Header from '../../Components/Header';
import {SigningButton} from '../../ReusableComponents/commonComponent';

import {SHOW_LOADING} from '../../utils/constant';
import {checkField} from '../../utils/validation';
import Loader from '../../Components/loader';
import {spacing} from '../../Themes/fonts';

import {showSnackBar} from '../../Components/snackbar';
import BackgroundImage from '../../Components/backgroundImage';
import CallApi from '../../utils/callApi';
import config from '../../Config/config';

const height = spacing(Dimensions.get('window').height / 4);

function SignInViaEmail({navigation, ...restProps}) {
  let {purple, offWhite, disableColor} = colors;
  let {userInfo} = restProps;
  let {isLoading = false} = userInfo;
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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    navigation.pop();
    setTimeout(() => navigation.navigate('SignIn'), 500);
    return true;
  };

  let signIn = () => {
    let data = {email: email.trim(), password};
    let headers = {
      'content-type': 'application/json',
      token: config.headerToken,
    };
    Store.dispatch({type: SHOW_LOADING, payload: true});
    CallApi('post', 'auth/users/signin', data, headers)
      .then(res => {
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (res.status === 200) {
          let {response} = res.data;
          let {data, token} = response;
          let userData = {data, token};
          AsyncStorage.setItem('userInfo', JSON.stringify(userData));
          Store.dispatch(login(userData));
        }
      })
      .catch(error => {
        let {data, status} = error.response || {};
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (status === 401) {
          showSnackBar({
            message: 'Password is invalid',
          });
        } else if (status === 404) {
          showSnackBar({
            message: 'Email not registered',
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

  useEffect(() => {
    if (emailError === true && passwordError === true) {
      setState({...state, disable: false});
    } else {
      setState({...state, disable: true});
    }
  }, [emailError, passwordError]);

  let setData = (field, text) => {
    let isValid = checkField(field, text.trim());
    if (text.trim().length < 8) {
      isValid = false;
    }
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
      <TouchableWithoutFeedback onPress={() => navigation.pop()}>
        <View style={{height}} />
      </TouchableWithoutFeedback>
      <Loader visible={isLoading} />
      <View
        style={{
          flex: 1,
          marginTop: 10,
          backgroundColor: 'white',
        }}>
        <Header navigation={navigation} previousScreen={'SignIn'} />
        <BackgroundImage />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: spacing(20),
            marginBottom: spacing(36),
          }}>
          <Text style={[styles.boldText, styles.mar_13, {textAlign: 'center'}]}>
            Enter your Email
          </Text>
        </View>

        <View style={{flex: 2, marginHorizontal: 20, marginBottom: 20}}>
          <View style={{flex: 1}}>
            {[
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
                <View style={styles.textInputWrapper} key={index}>
                  <Text style={[styles.text, styles.marB_9]}>
                    {item.header}
                  </Text>
                  <View
                    style={[
                      styles.inputBox,
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                      },
                    ]}
                    ref={ref => setRef(ref, item.field)}>
                    <TextInput
                      style={{flex: 1}}
                      placeholder={item.placeHolder}
                      value={item.value}
                      maxLength={item.length === 'email' ? 50 : 30}
                      secureTextEntry={
                        item.field === 'password' ? isPasswordHide : undefined
                      }
                      onFocus={() => onFocus(item.field)}
                      onBlur={() => onBlur(item.field)}
                      onChangeText={text => setData(item.field, text)}
                    />
                    {item.field === 'password' && (
                      <TouchableOpacity
                        style={{marginHorizontal: 14}}
                        activeOpacity={0.8}
                        onPress={() =>
                          changeState('isPasswordHide', isPasswordHide)
                        }>
                        <Image
                          source={getImage(
                            isPasswordHide ? 'PasswordOff' : 'PasswordOn',
                          )}
                          style={{width: 20, height: 20}}
                          resizeMode={'contain'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text style={[styles.text, {color: 'red', marginTop: 5}]}>
                    {item.error}
                  </Text>
                </View>
              );
            })}
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
                setTimeout(() => navigation.navigate('ForgotPassword'), 500);
              }}>
              <Text
                style={[
                  styles.colorsText,
                  {color: 'purple', textAlign: 'center', marginBottom: 20},
                ]}>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>

          <SigningButton
            text={'SIGN IN'}
            click={() => signIn()}
            style={[
              styles.button,
              {marginBottom: 0},
              disable && {backgroundColor: disableColor},
            ]}
            disable={disable}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const mapStateToProps = state => {
  return {userInfo: state.User};
};

export default connect(mapStateToProps)(SignInViaEmail);
