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

import Store from '../../Store/index';
import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';
import getImage from '../../utils/getImage';
import {SigningButton} from '../../ReusableComponents/commonComponent';
import CheckArrowSVG from '../../Components/checkArrowSVG';
import HidePasswordSVG from '../../Components/hidePasswordSVG';
import {checkField} from '../../utils/validation';
import {SnackBar} from '../../Components/snackbar1';
const height = Dimensions.get('window').height / 4;

function ForgotPassword({navigation, ...restProps}) {
  let {purple, offWhite} = colors;
  let eleRef = useRef([]);
  let [state, setState] = useState({
    email: '',
    emailError: '',
    phoneNumber: '',
    phoneNumberError: '',
    disable: true,
  });
  let {email, emailError, phoneNumber, phoneNumberError, disable} = state;

  useEffect(() => {
    console.log('emailErr', emailError, 'phone>>>', phoneNumberError);

    if (emailError === true || phoneNumberError === true) {
      setState({...state, disable: false});
    } else {
      setState({...state, disable: true});
    }
  }, [emailError, phoneNumberError]);

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

  let submit = () => {
    navigation.navigate('ResetPassword');
    // <SnackBar message={'Reset link has been sent to your registered email'} />;
  };

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
          <Text style={[styles.boldText, styles.mar_13]}>Forgot Password</Text>
        </View>
      </ImageBackground>
      <View style={{flex: 3, marginHorizontal: 20}}>
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
          <View style={[styles.rowViewWrapperCenter, {marginBottom: 20}]}>
            <View style={[styles.or, styles.marR_15]} />
            <Text style={styles.text_12}>OR</Text>
            <View style={[styles.or, styles.marL_15]} />
          </View>
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
                value={'+65'}
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
                maxLength={8}
              />
              <Text>{phoneNumberError === true && <CheckArrowSVG />}</Text>
            </View>
            <Text style={{color: 'red'}}>{phoneNumberError}</Text>
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

export default ForgotPassword;
