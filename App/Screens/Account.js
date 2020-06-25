import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Store from '../Store/index';
import {login} from '../Store/actions/userAction';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {spacing} from '../Themes/fonts';
import getImage from '../utils/getImage';
function Account({navigation, userInfo}) {
  let [isEditing, setEditing] = useState(false);
  let [showModal, setModalVisible] = useState(false);
  // useEffect(() => {
  //   AsyncStorage.removeItem('userInfo').then(res => {
  //     console.log('logut>>>', res);
  //     Store.dispatch(login(res));
  //   });
  // }, []);
  console.log('editing enabled', isEditing);
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, borderWidth: 5, borderColor: 'red'}}>
        <View
          style={{height: spacing(100), borderColor: 'red', borderWidth: 5}}
        />
        <View
          style={{
            paddingVertical: 24,
            paddingHorizontal: 20,
            borderWidth: 5,
            borderColor: 'red',
          }}>
          <View
            style={{
              borderColor: 'red',
              borderWidth: 5,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 5,
                borderColor: 'red',
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Quicksand-Bold',
                    color: 'rgb(255,255,255)',
                    fontSize: 18,
                    lineHeight: 18,
                  }}>
                  MS
                </Text>
                <Image
                  source={getImage('Diamond')}
                  style={{
                    width: 24,
                    height: 17,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    transform: [{translateY: 5}],
                  }}
                />
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
            <View style={{marginTop: 35, borderWidth: 5, borderColor: 'red'}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: 'rgb(47,11,71)',
                    fontSize: 16,
                    fontFamily: 'Quicksand-Bold',
                  }}>
                  Profile Settings
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    borderWidth: 3,
                    borderColor: 'red',
                    alignItems: 'center',
                  }}
                  onPress={() => setEditing(value => !value)}>
                  <Image source={getImage('edit')}></Image>
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
                <Text
                  style={{
                    color: 'rgb(17,36,61)',
                    fontFamily: 'AvenirNext-Regular',
                    fontSize: 14,
                    lineHeight: 18,
                    letterSpacing: 0,
                  }}>
                  Email
                </Text>
                <View
                  style={{
                    width: 75,
                    height: 23,
                    borderRadius: 4,
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
                style={{
                  marginTop: 10,
                  backgroundColor: 'rgb(237,237,237)',
                  borderRadius: 8,
                  justifyContent: 'center',
                  paddingLeft: 16,
                  paddingVertical: 17,
                }}
                onPress={() => (isEditing ? setModalVisible(true) : undefined)}>
                <Text
                  style={{
                    color: 'rgb(0,0,0)',
                    lineHeight: 18,
                    fontSize: 14,
                    fontFamily: 'AvenirNext-Bold',
                    letterSpacing: 0,
                  }}>
                  emailusedforregistration@gmail.com
                </Text>
              </TouchableOpacity>
              <View style={{marginTop: 24}}>
                <Text
                  style={{
                    color: 'rgb(17,36,61)',
                    fontSize: 14,
                    lineHeight: 18,
                    letterSpacing: 0,
                    fontFamily: 'AvenirNext-Regular',
                  }}>
                  Phone number
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    backgroundColor: 'rgb(237,237,237)',
                    borderRadius: 8,
                    justifyContent: 'center',
                    paddingLeft: 16,
                    paddingVertical: 17,
                  }}
                  onPress={() =>
                    isEditing ? setModalVisible(true) : undefined
                  }>
                  <Text
                    style={{
                      color: 'rgb(0,0,0)',
                      lineHeight: 18,
                      fontSize: 14,
                      fontFamily: 'AvenirNext-Bold',
                      letterSpacing: 0,
                    }}>
                    emailusedforregistration@gmail.com
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 24}}>
                <Text
                  style={{
                    color: 'rgb(17,36,61)',
                    fontSize: 14,
                    lineHeight: 18,
                    letterSpacing: 0,
                    fontFamily: 'AvenirNext-Regular',
                  }}>
                  Password
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    height: spacing(52),
                    backgroundColor: 'rgb(237,237,237)',
                    borderRadius: 8,
                    justifyContent: 'center',
                    paddingLeft: 16,
                  }}
                  onPress={() =>
                    isEditing ? setModalVisible(true) : undefined
                  }>
                  <Text
                    style={{
                      color: 'rgb(0,0,0)',
                      fontFamily: 'AvenirNext-Bold',
                      letterSpacing: 0,
                    }}
                    secureTextEntry={true}>
                    emailusedforregistration@gmail.com
                  </Text>
                </TouchableOpacity>
              </View>
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
          <View
            style={{
              backgroundColor: 'rgb(255,255,255)',
              flexDirection: 'row',
              paddingHorizontal: 25,
              paddingVertical: 22,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'rgb(103,39,180)',
                fontFamily: 'Quicksand-Bold',
                fontSize: 14,
              }}>
              View Membership Status
            </Text>
            <Image source={getImage('RightArrow')} />
          </View>
          <View
            style={{
              marginTop: 1,
              backgroundColor: 'rgb(255,255,255)',
              flexDirection: 'row',
              paddingHorizontal: 25,
              paddingVertical: 22,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'rgb(103,39,180)',
                fontFamily: 'Quicksand-Bold',
                fontSize: 14,
              }}>
              View Saved Payment Methods
            </Text>
            <Image source={getImage('RightArrow')} />
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
            <View style={{height: 200, backgroundColor: 'white'}}>
              <Header header={'Change or Verify Email'} />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
function Header({header = ''}) {
  return (
    <View
      style={{
        borderWidth: 5,
        borderColor: 'red',
        backgroundColor: 'rgb(248,248,248)',
      }}>
      <Text
        style={{
          fontFamily: 'Quicksand-Bold',
          fontSize: 18,
          lineHeight: 20,
          color: 'rgb(47,11,71)',
        }}>
        {header}
      </Text>
    </View>
  );
}
export default Account;
