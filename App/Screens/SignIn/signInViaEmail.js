import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  AsyncStorage,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import Store from '../../Store/index';
import {login} from '../../Store/actions/userAction';
import styles from '../../Themes/styles';

import {colors} from '../../Themes/colors';
import {SigningButton} from '../../ReusableComponents/commonComponent';
import {HidePasswordSVG} from '../../Components/allSVG';

import {SHOW_LOADING} from '../../utils/constant';
import {checkField} from '../../utils/validation';
import Loader from '../../Components/loader';

import {showSnackBar} from '../../Components/snackbar';
import BackgroundImage from '../../Components/backgroundImage';
import CallApi from '../../utils/callApi';

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
    let headers = {
      'content-type': 'application/json',
      token: 'jj2njndejn1oi3ien3ndono11inn3nfy8r7',
    };
    Store.dispatch({type: SHOW_LOADING, payload: true});
    CallApi('post', 'users/signin', data, headers)
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
        console.log('data', data, 'status', status);
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (status === 401) {
          showSnackBar({
            message: 'Password is not Valid',
          });
        } else if (status === 404) {
          showSnackBar({
            message: 'Email id not found.',
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

  useEffect(() => {
    if (emailError === true && passwordError === true) {
      setState({...state, disable: false});
    } else {
      setState({...state, disable: true});
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
          marginBottom: 20,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: 43,
            marginBottom: 30,
          }}>
          <BackgroundImage top={0} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.boldText, styles.mar_13]}>
              Enter your Email
            </Text>
          </View>
        </View>
        <View style={{flex: 2, marginHorizontal: 20}}>
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
                        <HidePasswordSVG />
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text style={{color: 'red'}}>{item.error}</Text>
                </View>
              );
            })}
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
