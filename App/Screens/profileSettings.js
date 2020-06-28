import React, {useEffect, useState} from 'react';
import Store from '../Store/index';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ImageBackground,
} from 'react-native';
import {spacing} from '../Themes/fonts';
import getImage from '../utils/getImage';
import styles from '../Themes/styles';
import {colors} from '../Themes/colors';
import {showSnackBar} from '../Components/snackbar';
import Config from '../Config/config';
import {SHOW_LOADING} from "../utils/constant"
import {updateUserInfo} from '../Store/actions/userAction';
import {
  CrossSVG,
  ForwardArrowSVG,
  PurpleForwardArrowSVG,
  BackArrowWhite,
} from '../Components/allSVG';
import {
  checkField,
  validPassword,
  calculatePasswordScore,
  formatText,
} from '../utils/validation';
import CallApi from '../utils/callApi';

let {lightBlack, offWhite, darkBlack, lightWhite, disableColor} = colors;
function ProfileSettings({navigation, userInfo}) {
  let [isEditing, setEditing] = useState(false);
  let [showModal, setModalVisible] = useState(false);
  let [selectedScreen, setSelectedScreen] = useState('');
  const [progress, setProgress] = useState([-1, -1, -1, -1]);
  let [isPasswordHide, setPasswordHide] = useState({
    passwordHide: true,
    oldPasswordHide: true,
    newPasswordHide: true,
    confirmPasswordHide: true,
  });
  let [buttonState, setButtonVisible] = useState(true);
  let [fieldValue, setFieldValue] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailError: '',
    passwordError: '',
    phoneNumberError: '',
    oldPasswordError: '',
    newPasswordError: '',
    confirmPasswordError: '',
  });
  let {
    passwordHide,
    oldPasswordHide,
    newPasswordHide,
    confirmPasswordHide,
  } = isPasswordHide;
  let {
    email,
    password,
    phoneNumber,
    oldPassword,
    newPassword,
    confirmPassword,
    phoneNumberError,
    emailError,
    passwordError,
    oldPasswordError,
    newPasswordError,
    confirmPasswordError,
  } = fieldValue;
  let {data = '', token = ''} = userInfo;
  let {mobile = '', first_name = '', last_name = ''} = data || {};
  let changeText = async (text, field) => {
    let formatedText = await formatText(text, field);
    let isValid = checkField(field, formatedText.trim());
    if (
      field == 'password' ||
      field === 'oldPassword' ||
      field === 'newPassword' ||
      field === 'confirmPassword'
    ) {
      isValid = validPassword(field, formatedText.trim());
      let calculateScore = calculatePasswordScore(text, isValid);
      if (isValid.length == 0) {
        isValid = true;
      }
      setProgress(calculateScore);
    }
    setFieldValue({
      ...fieldValue,
      [field]: formatedText,
      [`${field}Error`]: isValid,
    });
  };

  let emptyAllField = value => {
    setModalVisible(value);
    setSelectedScreen('');
    setPasswordHide({
      ...isPasswordHide,
      passwordHide: true,
      oldPasswordHide: true,
      newPasswordHide: true,
      confirmPasswordHide: true,
    });
    setFieldValue({
      ...fieldValue,
      email: '',
      password: '',
      phoneNumber: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      emailError: '',
      passwordError: '',
      phoneNumberError: '',
      confirmPasswordError: '',
      newPasswordError: '',
      oldPasswordError: '',
    });
  };
  useEffect(() => {
    let isValidInput = checkValidation();
    setButtonVisible(isValidInput);
  }, [
    confirmPassword,
    emailError,
    passwordError,
    phoneNumberError,
    confirmPasswordError,
    newPasswordError,
    oldPasswordError,
  ]);

  let checkValidation = () => {
    if (selectedScreen === 'changeEmail') {
      if (emailError === true && passwordError === true) {
        return false;
      }
    } else if (selectedScreen === 'changePhoneNumber') {
      if (phoneNumberError === true && passwordError === true) {
        return false;
      }
    } else if (selectedScreen === 'changePassword') {
      if (
        oldPasswordError === true &&
        confirmPasswordError === true &&
        newPasswordError === true
      ) {
        return false;
      }
    }
    return true;
  };

  let changeEyeState = (field, value) => {
    setPasswordHide({...isPasswordHide, [field]: !value});
  };

  let showEditingModal = field => {
    // if (field == 'changeEmail') {
    //   setFieldValue({...fieldValue, email: userInfo.data.email});
    // } else if (field === 'changePhoneNumber') {
    //   setFieldValue({...fieldValue, phoneNumber: userInfo.data.mobile});
    // }
    setModalVisible(true);
    setSelectedScreen(field);
  };

  let submit = () => {
    let headers = {
      'content-type': 'application/json',
      token,
    };
    let data;
    if (selectedScreen === 'changeEmail') {
      data = {email};
      Store.dispatch(updateUserInfo(data, headers));
    } else if (selectedScreen === 'changePhoneNumber') {
      data = {
        mobile: phoneNumber.replace(/\s/g, ''),
        country_code: Config.countryCode,
        type: 'change',
      };
      callService('post', 'auth/users/otp', data, headers);
    } else if (selectedScreen === 'changePassword') {
      if (newPassword != confirmPassword) {
        showSnackBar({
          message: 'Password Not Matched',
        });
      } else {
        data = {old_password: oldPassword, new_password: newPassword};
        Store.dispatch(updateUserInfo(data, headers));
      }
    }
    emptyAllField(false);
    setEditing(false);
  };

  let callService = (method, route, data, headers) => {
    headers.token = Config.headerToken;
    CallApi(method, route, data, headers)
      .then(response => {
        console.log('response of OTP>>>>>', response);
        if (response.status === 200) {
          navigation.navigate('OTPSCREEN', data);
        }
      })
      .catch(error => {
        let {status} = error.response || {};
        Store.dispatch({type: SHOW_LOADING, payload: false});
        if (status === 409) {
          showSnackBar({
            message: 'Mobile Number already Registered',
          });
        }
        console.log('Error>>>>>', error.response.data);
      });
  };

  let fields = {
    changeEmail: [
      {
        title: 'Email',
        field: 'email',
        keyboardType: 'email',
        value: email,
        error: emailError,
      },
      {
        title: 'Enter Password',
        field: 'password',
        secureTextEntry: true,
        showEye: true,
        value: password,
        isEyeOff: passwordHide,
        error: passwordError,
      },
    ],
    changePhoneNumber: [
      {
        title: 'Phone Number',
        field: 'phoneNumber',
        keyboardType: 'number-pad',
        value: phoneNumber,
        maxLength: 12,
        error: phoneNumberError,
      },
      {
        title: 'Enter Password',
        field: 'password',
        secureTextEntry: true,
        showEye: true,
        value: password,
        isEyeOff: passwordHide,
        error: passwordError,
      },
    ],
    changePassword: [
      {
        title: 'Old Password',
        field: 'oldPassword',
        secureTextEntry: true,
        showEye: true,
        value: oldPassword,
        isEyeOff: oldPasswordHide,
        error: oldPasswordError,
      },
      {
        title: 'New Password',
        field: 'newPassword',
        secureTextEntry: true,
        showEye: true,
        value: newPassword,
        isEyeOff: newPasswordHide,
        error: newPasswordError,
      },
      {
        title: 'Confirm New Password',
        field: 'confirmPassword',
        secureTextEntry: true,
        showEye: true,
        value: confirmPassword,
        isEyeOff: confirmPasswordHide,
        error: confirmPasswordError,
      },
    ],
  };

  let headerText = {
    changeEmail: {
      headerTitle: 'Change or Verify Email',
      buttonText: 'SAVE & VERIFY EMAIL',
    },
    changePhoneNumber: {
      headerTitle: 'Change Phone Number',
      buttonText: 'SAVE CHANGES',
    },
    changePassword: {
      headerTitle: 'Change Password',
      buttonText: 'SAVE CHANGES',
    },
  };
  let commonTextInputStyle = {
    marginTop: 10,
    height: 52,
    borderWidth: 1,
    borderColor: offWhite,
    borderRadius: 8,
    paddingLeft: 16,
    backgroundColor: 'rgb(249,249,249)',
  };
  let commonField = {
    backgroundColor: 'rgb(255,255,255)',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 22,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  };
  let shadow = !buttonState
    ? {
        shadowColor: 'rgba(0,0,0,0.25)',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 5,
      }
    : {};
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <ImageBackground
          style={{flex: 1}}
          source={getImage('searchBackGround')}>
          <View
            style={{
              height: spacing(108),
            }}>
            <View
              style={{
                marginTop: spacing(66),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 21,
              }}>
              <TouchableOpacity
                style={{position: 'absolute', left: 0}}
                onPress={() => navigation.goBack()}>
                <BackArrowWhite />
              </TouchableOpacity>
              <Text style={[styles.AM_12_14, {lineHeight: 16}]}>Account</Text>
            </View>
          </View>
          <View
            style={{
              paddingVertical: 24,
              paddingHorizontal: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#EDEDED',
              backgroundColor: lightWhite,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LinearGradient
                start={{x: 1, y: 0}}
                end={{x: 0, y: 1}}
                colors={['rgb(251,143,102)', 'rgb(112,51,255)']}
                style={styles.round}>
                <Text
                  style={[
                    styles.QB_18_18_white,
                    {paddingTop: 10, paddingBottom: 10},
                  ]}>
                  {first_name.charAt(0)}
                  {last_name.charAt(0)}
                </Text>
                <Image source={getImage('Diamond')} style={styles.diamond} />
              </LinearGradient>
              <Text
                style={[
                  styles.profileScreenText,
                  {
                    marginTop: 16,
                  },
                ]}>
                {first_name} {last_name}
              </Text>
            </View>
            <View style={{marginTop: 35}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={[styles.boldWhiteText16, {color: 'rgb(47,11,71)'}]}>
                  Profile Settings
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => setEditing(value => !value)}>
                  <Image source={getImage('edit')} />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: isEditing ? 'rgb(194,194,194)' : 'rgb(103,39,180)',
                      fontFamily: 'Quicksand-Bold',
                      fontSize: 12,
                    }}>
                    {isEditing ? 'EDITING SETTINGS' : 'EDIT'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 24,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.AR_14_white, {color: lightBlack}]}>
                  Email
                </Text>
                <View
                  style={{
                    width: 75,
                    height: 23,
                    borderRadius: 8,
                    backgroundColor:
                      selectedScreen === 'changeEmail' && isEditing
                        ? 'rgb(255,231,229)'
                        : 'rgb(204,240,202)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color:
                        selectedScreen === 'changeEmail' && isEditing
                          ? 'rgb(250,114,104)'
                          : 'rgb(8,141,0)',
                      fontFamily: 'AvenirNext-DemiBold',
                      fontSize: 11,
                    }}>
                    {selectedScreen === 'changeEmail' && isEditing
                      ? 'UNVERIFIED'
                      : 'VERIFIED'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  commonTextInputStyle,
                  {
                    justifyContent: 'center',
                  },
                ]}
                onPress={() => isEditing && showEditingModal('changeEmail')}>
                <Text
                  style={[
                    isEditing ? styles.AR_14_white : styles.AB_14_bold,
                    {color: darkBlack},
                  ]}>
                  {userInfo.data.email}
                </Text>
              </TouchableOpacity>
              <View style={{marginTop: 24}}>
                <Text style={[styles.AR_14_white, {color: lightBlack}]}>
                  Phone number
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[
                    commonTextInputStyle,
                    {flexDirection: 'row', alignItems: 'center'},
                  ]}
                  onPress={() =>
                    isEditing && showEditingModal('changePhoneNumber')
                  }>
                  <View
                    style={{
                      width: 60,
                      height: 52,
                      textAlign: 'center',
                      borderRightWidth: 1,
                      borderRightColor: offWhite,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      value={'+61'}
                      style={[
                        isEditing ? styles.AR_14_white : styles.AB_14_bold,
                        {
                          color: darkBlack,
                        },
                      ]}
                      editable={false}>
                      {Config.countryCode}
                    </Text>
                  </View>
                  <Text
                    style={[
                      isEditing ? styles.AR_14_white : styles.AB_14_bold,
                      {color: darkBlack, paddingLeft: 16},
                    ]}>
                    {mobile}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 24}}>
                <Text style={[styles.AR_14_white, {color: lightBlack}]}>
                  Password
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[commonTextInputStyle, {justifyContent: 'center'}]}
                  onPress={() =>
                    isEditing && showEditingModal('changePassword')
                  }>
                  <Text
                    style={[
                      isEditing ? styles.AR_14_white : styles.AB_14_bold,
                      {color: darkBlack},
                    ]}
                    secureTextEntry={true}>
                    * * * * *
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'rgb(248,248,248)',
              marginTop: 9,
              marginHorizontal: 8,
              marginBottom: spacing(50),
            }}>
            <View style={commonField}>
              <Text style={styles.colorsText}>View Membership Status</Text>
              <PurpleForwardArrowSVG />
            </View>
            <View style={commonField}>
              <Text style={styles.colorsText}>View Saved Payment Methods</Text>
              <PurpleForwardArrowSVG />
            </View>
          </View>
          <Modal
            visible={showModal}
            transparent={true}
            animationType={'slide'}
            onRequestClose={() => {
              setEditing(false);
              setModalVisible(false);
            }}>
            <View style={{flex: 1}}>
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'flex-end',
                }}
                keyboardShouldPersistTaps={'always'}
                showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: 'red',
                  }}>
                  <Header
                    header={
                      selectedScreen.length > 0 &&
                      headerText[selectedScreen].headerTitle
                    }
                    closeModal={value => {
                      emptyAllField(value);
                    }}
                  />
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginBottom: 14,
                    }}>
                    {selectedScreen.length > 0 &&
                      fields[selectedScreen].map((item, index) => {
                        return (
                          <>
                            <Text
                              style={[
                                styles.AR_14_white,
                                {color: lightBlack, marginBottom: 10},
                              ]}>
                              {item.title}
                            </Text>
                            <View
                              style={[
                                styles.inputBox,
                                {
                                  paddingLeft: 0,
                                  flexDirection:
                                    item.field === 'phoneNumber' || item.showEye
                                      ? 'row'
                                      : undefined,
                                },
                              ]}>
                              {item.field === 'phoneNumber' && (
                                <TextInput
                                  value={Config.countryCode}
                                  style={[
                                    {
                                      color: 'rgb(0,0,0)',
                                      width: 60,
                                      textAlign: 'center',
                                      borderRightWidth: 1,
                                      borderRightColor: offWhite,
                                    },
                                  ]}
                                  editable={false}
                                />
                              )}
                              <TextInput
                                style={{
                                  flex: 1,
                                  height: 50,
                                  borderRadius: 8,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                }}
                                secureTextEntry={item.isEyeOff}
                                keyboardType={item.keyboardType}
                                value={item.value}
                                maxLength={item.maxLength}
                                onChangeText={text =>
                                  changeText(text, item.field)
                                }
                              />
                              {item.showEye && (
                                <TouchableOpacity
                                  style={{
                                    marginRight: 14,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                  activeOpacity={0.8}
                                  onPress={() =>
                                    changeEyeState(
                                      `${item.field}Hide`,
                                      item.isEyeOff,
                                    )
                                  }>
                                  <Image
                                    source={getImage(
                                      item.isEyeOff
                                        ? 'PasswordOff'
                                        : 'PasswordOn',
                                    )}
                                    style={{width: 20, height: 20}}
                                    resizeMode={'contain'}
                                  />
                                </TouchableOpacity>
                              )}
                              {item.showEye && (
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
                                          backgroundColor:
                                            item == -1 ? offWhite : 'green',
                                        }}
                                      />
                                    );
                                  })}
                                </View>
                              )}
                            </View>

                            <Text
                              style={[
                                styles.text,
                                {
                                  color: 'red',
                                  marginTop: 5,
                                  marginBottom: 10,
                                },
                              ]}>
                              {item.error && item.error}
                            </Text>
                          </>
                        );
                      })}

                    <TouchableOpacity
                      style={[
                        {
                          height: 56,
                          backgroundColor: buttonState
                            ? disableColor
                            : 'rgb(152,82,235)',
                          borderRadius: 28,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 13,
                          ...shadow,
                        },
                      ]}
                      onPress={() => submit()}
                      disabled={buttonState}>
                      <Text
                        style={[
                          styles.barzButtonText,
                          {letterSpacing: 1, marginRight: 7},
                        ]}>
                        {selectedScreen.length > 0 &&
                          headerText[selectedScreen].buttonText}
                      </Text>
                      <ForwardArrowSVG />
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Modal>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}
function Header({header = '', closeModal = {}}) {
  return (
    <View
      style={{
        backgroundColor: 'rgb(248,248,248)',
        height: 82,
        marginBottom: 26,
        alignItems: 'center',
      }}>
      <Text
        style={{
          marginTop: 38,
          fontFamily: 'Quicksand-Bold',
          fontSize: 18,
          lineHeight: 20,
          color: 'rgb(47,11,71)',
        }}>
        {header}
      </Text>
      <TouchableOpacity
        onPress={() => closeModal(false)}
        style={{position: 'absolute', top: 20, right: 20}}>
        <CrossSVG />
      </TouchableOpacity>
    </View>
  );
}
const mapStateToProps = state => {
  return {userInfo: state.User.loginResponse};
};
export default connect(mapStateToProps)(ProfileSettings);
