import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Image,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../Components/Header';

import Loader from '../../Components/loader';
import {spacing} from '../../Themes/fonts';
import styles from '../../Themes/styles';

import {colors} from '../../Themes/colors';
import {SigningButton} from '../../ReusableComponents/commonComponent';
import BackgroundImage from '../../Components/backgroundImage';

import {validPassword, calculatePasswordScore} from '../../utils/validation';
import {login} from '../../Store/actions/userAction';
import {SHOW_LOADING} from '../../utils/constant';

import {showSnackBar} from '../../Components/snackbar';
import Store from '../../Store';
import CallApi from '../../utils/callApi';
import getImage from '../../utils/getImage';

function ResetPassword({navigation, ...restProps}) {
  let {isLoading = false} = restProps.userInfo;
  let {mobile, country_code, otp} =
    (restProps.route && restProps.route.params && restProps.route.params) || {};
  let {purple, offWhite, disableColor} = colors;
  let eleRef = useRef([]);
  const [progress, setProgress] = useState([-1, -1, -1, -1]);
  let [state, setState] = useState({
    newPassword: '',
    newPasswordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    isNewPasswordHide: true,
    isConfirmPasswordHide: true,
    disable: true,
  });
  let {
    newPassword,
    newPasswordError,
    confirmPassword,
    confirmPasswordError,
    isNewPasswordHide,
    isConfirmPasswordHide,
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
    setTimeout(() => navigation.navigate('ForgotPassword'), 500);
    return true;
  };

  useEffect(() => {
    if (newPasswordError === true && confirmPasswordError === true) {
      setState({...state, disable: false});
    } else {
      setState({...state, disable: true});
    }
  }, [newPasswordError, confirmPasswordError]);

  let setData = (field, text) => {
    let isValid = validPassword(field, text.trim());
    if (field == 'newPassword') {
      isValid = validPassword(field, text.trim());
      let calculateScore = calculatePasswordScore(text, isValid);
      if (isValid.length == 0) {
        isValid = true;
      }
      setProgress(calculateScore);
    }
    if (isValid.length == 0) {
      isValid = true;
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

  let submit = () => {
    if (newPassword === confirmPassword) {
      let data = {
        mobile,
        country_code,
        otp,
        password: newPassword,
      };
      Store.dispatch({type: SHOW_LOADING, payload: true});
      CallApi('put', 'users/reset-password/otp', data)
        .then(res => {
          Store.dispatch({type: SHOW_LOADING, payload: true});
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
          if (status === 404) {
            showSnackBar({
              message: 'Mobile number not found',
            });
          } else if (error.message === 'Network Error') {
            showSnackBar({
              message: 'Internet connection is required to proceed',
            });
          } else {
            showSnackBar({message: 'Something Went Wrong'});
          }
        });
    } else {
      showSnackBar({message: `Passwords doesn't match`});
    }
  };

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
        <Loader visible={isLoading} />

        <Header navigation={navigation} previousScreen={'ForgotPassword'} />
        <BackgroundImage top={50} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: spacing(20),
            marginBottom: spacing(36),
          }}>
          <Text style={[styles.boldText, styles.mar_13]}>Reset Password</Text>
        </View>

        <View style={{flex: 2, marginHorizontal: 20}}>
          <View style={{flex: 1}}>
            <View style={styles.textInputWrapper}>
              <Text style={[styles.text, styles.marB_9]}>New Passsword</Text>
              <View
                style={[
                  styles.inputBox,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  },
                ]}
                ref={ref => setRef(ref, 'newPassword')}>
                <TextInput
                  style={{flex: 1}}
                  placeholder="* * * * *"
                  value={newPassword}
                  secureTextEntry={isNewPasswordHide}
                  onFocus={() => onFocus('newPassword')}
                  onBlur={() => onBlur('newPassword')}
                  onChangeText={text => setData('newPassword', text)}
                />
                <TouchableOpacity
                  style={{marginHorizontal: 14}}
                  activeOpacity={0.8}
                  onPress={() =>
                    changeState('isNewPasswordHide', isNewPasswordHide)
                  }>
                  <Image
                    source={getImage(
                      isNewPasswordHide ? 'PasswordOff' : 'PasswordOn',
                    )}
                    style={{width: 20, height: 20}}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.rowViewWrapperCenter,
                  {
                    marginVertical: 10,
                    justifyContent: 'space-between',
                  },
                ]}>
                {console.log('progress', progress)}
                {progress.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        height: 2,
                        borderRadius: 2,
                        backgroundColor: item == -1 ? offWhite : 'green',
                        marginRight: 2,
                      }}
                    />
                  );
                })}
              </View>
              <Text style={[styles.text, {color: 'red', marginTop: 5}]}>
                {newPasswordError}
              </Text>
            </View>
            <View style={styles.textInputWrapper}>
              <Text style={[styles.text, styles.marB_9]}>Confirm Password</Text>
              <View
                style={[
                  styles.inputBox,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  },
                ]}
                ref={ref => setRef(ref, 'confirmPassword')}>
                <TextInput
                  style={{flex: 1}}
                  placeholder="* * * * *"
                  value={confirmPassword}
                  secureTextEntry={isConfirmPasswordHide}
                  onFocus={() => onFocus('confirmPassword')}
                  onBlur={() => onBlur('confirmPassword')}
                  onChangeText={text => setData('confirmPassword', text)}
                />
                <TouchableOpacity
                  style={{marginHorizontal: 14}}
                  activeOpacity={0.8}
                  onPress={() =>
                    changeState('isConfirmPasswordHide', isConfirmPasswordHide)
                  }>
                  <Image
                    source={getImage(
                      isConfirmPasswordHide ? 'PasswordOff' : 'PasswordOn',
                    )}
                    style={{width: 20, height: 20}}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              </View>
              <Text style={[styles.text, {color: 'red', marginTop: 5}]}>
                {confirmPasswordError}
              </Text>
            </View>
          </View>

          <SigningButton
            text={'SUBMIT'}
            click={() => submit()}
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
  return {userInfo: state.reducer};
};
export default connect(mapStateToProps)(ResetPassword);
