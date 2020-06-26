import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Store from '../Store/index';
import {connect} from 'react-redux';
import {login} from '../Store/actions/userAction';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
  ImageBackground,
} from 'react-native';
import {spacing} from '../Themes/fonts';
import getImage from '../utils/getImage';
import styles from '../Themes/styles';
import {colors} from '../Themes/colors';
import {
  CrossSVG,
  ForwardArrowSVG,
  PurpleForwardArrowSVG,
  BackArrowWhite,
} from '../Components/allSVG';

let {lightBlack, offWhite, darkBlack, lightWhite} = colors;
function ProfileSettings({navigation, userInfo}) {
  let [isEditing, setEditing] = useState(false);
  let [showModal, setModalVisible] = useState(false);
  let [selectedScreen, setSelectedScreen] = useState('');
  let {mobile} = userInfo.loginResponse.data;

  useEffect(() => {
    console.log('selectedScren>>>>>>>>>>>>>>>>>>>>>>>>>>', selectedScreen);
  }, [selectedScreen]);

  let fields = {
    changeEmail: [
      {value: 'manju@gmail.com', title: 'Email'},
      {value: '22334656', title: 'Enter Password'},
    ],
    changePhoneNumber: [
      {phoneNumber: '7865457600', title: 'Phone Number'},
      {password: '22334656', title: 'Enter Password'},
    ],
    changePassword: [
      {value: 'manju@gmail.com', title: 'Old Password'},
      {value: '22334656', title: 'New Password'},
      {value: 'manju@gmail.com', title: 'Confirm New Password'},
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
    borderWidth: 1,
    borderColor: offWhite,
    borderRadius: 8,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingVertical: 17,
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
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{position: 'absolute', left: 20, bottom: 22}}>
              <BackArrowWhite />
            </TouchableOpacity>

            <Text
              style={[
                styles.AM_12_14,
                {
                  lineHeight: 16,
                  marginTop: 66,
                },
              ]}>
              Account
            </Text>
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
              <View style={styles.round}>
                <Text style={styles.QB_18_18_white}>MS</Text>
                <Image source={getImage('Diamond')} style={styles.diamond} />
              </View>
              <Text
                style={{
                  marginTop: 16,
                  color: 'rgb(103,39,180)',
                  fontSize: 18,
                  fontFamily: 'Quicksand-Bold',
                  lineHeight: 20,
                }}>
                Miguel Salvador
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
                    backgroundColor: 'rgb(204,240,202)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'rgb(8,141,0)',
                      fontFamily: 'AvenirNext-DemiBold',
                      fontSize: 11,
                    }}>
                    VERIFIED
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                style={commonTextInputStyle}
                onPress={() => {
                  isEditing ? setModalVisible(true) : undefined;
                  setSelectedScreen('changeEmail');
                }}>
                <Text
                  style={[
                    isEditing ? styles.AB_14_bold : styles.AR_14_white,
                    {color: darkBlack},
                  ]}>
                  emailusedforregistration@gmail.com
                </Text>
              </TouchableOpacity>
              <View style={{marginTop: 24}}>
                <Text style={[styles.AR_14_white, {color: lightBlack}]}>
                  Phone number
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  style={commonTextInputStyle}
                  onPress={() => {
                    isEditing ? setModalVisible(true) : undefined;
                    setSelectedScreen('changePhoneNumber');
                  }}>
                  <Text style={[styles.AR_14_white, {color: darkBlack}]}>
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
                  style={commonTextInputStyle}
                  onPress={() => {
                    isEditing ? setModalVisible(true) : undefined;
                    setSelectedScreen('changePassword');
                  }}>
                  <Text
                    style={[styles.AR_14_white, {color: darkBlack}]}
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
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <View
                style={{
                  // height: 200,
                  backgroundColor: 'white',

                  borderWidth: 2,
                  borderColor: 'red',
                }}>
                <Header
                  header={
                    selectedScreen.length > 0 &&
                    headerText[selectedScreen].headerTitle
                  }
                  closeModal={value => setModalVisible(value)}
                />
                <View
                  style={{
                    marginHorizontal: 20,
                    marginBottom: 14,
                    borderWidth: 2,
                    borderColor: 'green',
                    paddingTop: 25,
                  }}>
                  {selectedScreen.length > 0 &&
                    fields[selectedScreen].map((item, index) => {
                      console.log('item>>>>>>>>>>>>>>>>>', item);
                      return (
                        <View>
                          <Text
                            style={[
                              styles.AR_14_white,
                              {color: lightBlack, marginVertical: 13},
                            ]}>
                            {item.title}
                          </Text>
                          <View style={[styles.inputBox, {paddingLeft: 0}]}>
                            <TextInput
                              style={{
                                height: 50,
                                borderRadius: 8,
                                paddingLeft: 16,
                                borderColor: 'red',
                                borderWidth: 2,
                              }}
                              value={item.value}
                            />
                          </View>
                          {/* <Text
                        style={[
                          styles.AR_14_white,
                          {color: lightBlack, marginTop: 12, marginBottom: 10},
                        ]}>
                        Email
                      </Text>
                      <View style={[styles.inputBox, {paddingLeft: 0}]}>
                        <TextInput
                          style={{
                            height: 50,
                            borderRadius: 8,
                            paddingLeft: 16,
                            borderColor: 'red',
                            borderWidth: 2,
                          }}
                          value={item.password}
                        />
                      </View> */}
                        </View>
                      );
                    })}
                  <TouchableOpacity
                    style={{
                      height: 56,
                      backgroundColor: 'purple',
                      borderRadius: 28,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 25,
                    }}>
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
        borderWidth: 5,
        borderColor: 'red',
        backgroundColor: 'rgb(248,248,248)',
        height: 82,
        // justifyContent: 'center',
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
  return {userInfo: state.reducer};
};
export default connect(mapStateToProps)(ProfileSettings);
