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

import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';
import {SigningButton} from '../../ReusableComponents/commonComponent';
import {HidePasswordSVG} from '../../Components/allSVG';
import {checkField, validPassword} from '../../utils/validation';
import {showSnackBar} from '../../Components/snackbar1';
import {formatPhoneNumber} from 'react-phone-number-input';

function ResetPassword({navigation, ...restProps}) {
  let {purple, offWhite, transparent} = colors;
  let eleRef = useRef([]);
  const [progress, setProgress] = useState([-1, -1, -1, -1]);
  let [state, setState] = useState({
    newPassword: '',
    newPasswordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    isPasswordHide: true,
    disable: true,
  });
  let {
    newPassword,
    newPasswordError,
    confirmPassword,
    confirmPasswordError,
    isPasswordHide,
    disable,
  } = state;

  useEffect(() => {
    console.log(
      'nrewPSsrd',
      newPasswordError,
      'confirmPdjn',
      confirmPasswordError,
    );
    if (newPasswordError === true && confirmPasswordError === true) {
      setState({...state, disable: false});
    } else {
      setState({...state, disable: true});
    }
  }, [newPasswordError, confirmPasswordError]);

  let setData = (field, text) => {
    let isValid = validPassword(field, text.trim());
    let a = [-1, -1, -1, -1];
    if (field == 'newPassword') {
      if (text.length > 0) {
        if (!isValid.includes('1 digit')) {
          a.pop();
          a.unshift(0);
        }

        if (!isValid.includes('1 special character')) {
          a.pop();
          a.unshift(0);
        }

        if (!isValid.includes('1 capital alphabet')) {
          a.pop();
          a.unshift(0);
        }

        if (!isValid.includes('min 8 characters')) {
          a.pop();
          a.unshift(0);
        }
      } else {
        a = [-1, -1, -1, -1];
      }

      setProgress(a);
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
      showSnackBar({message: 'Password successfully updated'});
    } else {
      showSnackBar({message: 'Password mismatched'});
    }
  };
  console.log('errrrrrrr', newPasswordError);

  return (
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
                secureTextEntry={isPasswordHide}
                onFocus={() => onFocus('newPassword')}
                onBlur={() => onBlur('newPassword')}
                onChangeText={text => setData('newPassword', text)}
              />
              <TouchableOpacity
                style={{marginHorizontal: 14}}
                activeOpacity={0.8}
                onPress={() => changeState('isPasswordHide', isPasswordHide)}>
                <HidePasswordSVG />
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
                    }}
                  />
                );
              })}
            </View>
            <Text style={{color: 'red'}}>{newPasswordError}</Text>
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
                secureTextEntry={isPasswordHide}
                onFocus={() => onFocus('confirmPassword')}
                onBlur={() => onBlur('confirmPassword')}
                onChangeText={text => setData('confirmPassword', text)}
              />
              <TouchableOpacity
                style={{marginHorizontal: 14}}
                activeOpacity={0.8}
                onPress={() => changeState('isPasswordHide', isPasswordHide)}>
                <HidePasswordSVG />
              </TouchableOpacity>
            </View>
            <Text style={{color: 'red'}}>{confirmPasswordError}</Text>
          </View>
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
      </View>
    </View>
  );
}

export default ResetPassword;
