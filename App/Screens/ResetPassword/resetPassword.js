import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Image
} from 'react-native';

import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';
import {SigningButton} from '../../ReusableComponents/commonComponent';
import {HidePasswordSVG} from '../../Components/allSVG';
import {validPassword, calculatePasswordScore} from '../../utils/validation';
import {login} from '../../Store/actions/userAction';
import {SHOW_LOADING} from '../../utils/constant';
import {showSnackBar} from '../../Components/snackbar';
import Store from '../../Store';
import CallApi from '../../utils/callApi';
import getImage from '../../utils/getImage';

function ResetPassword({navigation, ...restProps}) {
  let {mobile, country_code, otp} =
    (restProps.route && restProps.route.params && restProps.route.params) || {};
  let {purple, offWhite, transparent, disableColor} = colors;
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
      console.log('data to send to server>>>', data);
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
          console.log('response>>>>', res.data);
        })
        .catch(error => {
          console.log('Error>>>>', error);
          let {data, status} = error.response || {};
          console.log('Error>>>>>>', data);
          Store.dispatch({type: SHOW_LOADING, payload: false});
          if (error.message === 'Network Error') {
            showSnackBar({
              message: 'No Internet Connection,Please check!',
            });
          } else {
            showSnackBar({message: 'Something Went Wrong'});
          }
        });
    } else {
      showSnackBar({message: 'Password mismatched'});
    }
  };
  console.log('errrrrrrr', newPasswordError);

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
            <Text style={[styles.boldText, styles.mar_13]}>Reset Password</Text>
          </View>
        </ImageBackground>
        <View style={{flex: 2, marginHorizontal: 20}}>
          <View style={{flex: 1}}>
            <View style={styles.textInputWrapper}>
              <Text style={[styles.text, styles.marB_9]}>New Psssword</Text>
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
                  {/* <HidePasswordSVG /> */}
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
              <Text style={[styles.regularText, {color: 'red'}]}>
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
                  {/* <HidePasswordSVG /> */}
                  <Image
                    source={getImage(
                      isConfirmPasswordHide ? 'PasswordOff' : 'PasswordOn',
                    )}
                    style={{width: 20, height: 20}}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              </View>
              <Text style={[styles.regularText, {color: 'red'}]}>
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

export default ResetPassword;
