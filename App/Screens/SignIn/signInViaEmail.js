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
import {signinViaEmail, login} from '../../Store/actions/userAction';
import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';
import getImage from '../../utils/getImage';
import {SigningButton} from '../../ReusableComponents/commonComponent';
import {CheckArrowSVG, HidePasswordSVG} from '../../Components/allSVG';
import {checkField} from '../../utils/validation';
import Loader from '../../Components/loader';
import {showSnackBar} from '../../Components/snackbar';
import BackgroundImage from '../../Components/backgroundImage';
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
    if (loginResponse != null && loginResponse.status == true) {
      let {response: userInfo} = loginResponse;
      let {token, data} = userInfo;
      let userData = {data, token};
      AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      Store.dispatch(login(userData));
    } else if (loginResponse != null && loginResponse.status === 401) {
      showSnackBar({message: 'Invalid email or password', height: 30});
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
          marginBottom: 20,
          borderColor: 'red',
          borderWidth: 3,
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
                <View style={styles.textInputWrapper}>
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
                      placeholder="* * * * *"
                      value={item.value}
                      secureTextEntry={isPasswordHide}
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
            <View style={[styles.rowViewWrapperCenter]}>
              <Text style={[styles.bottomText]}>Don't have an account?</Text>
              <TouchableOpacity
                style={styles.marL_8}
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.colorsText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
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
