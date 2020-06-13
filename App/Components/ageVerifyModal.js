import React, {useState, useEffect, Component} from 'react';
import {Modal, Text, View} from 'react-native';
import Events from 'react-native-simple-events';
import RNExitApp from 'react-native-exit-app';
import styles from '../Themes/styles';
import {colors} from '../Themes/colors';
import {SigningButton} from '../ReusableComponents/commonComponent';
import AsyncStorage from '@react-native-community/async-storage';

class AgeVerifyModal extends Component {
  constructor() {
    super();
    this.state = {modalVisible: false};
  }
  componentDidMount() {
    console.log('onside did mouont');
    Events.on('showAgeVerifyModal', 'myId', this.onShow);
  }
  componentWillUnmount() {
    Events.rm('showAgeVerifyModal', 'myId');
  }
  onShow = data => {
    console.log('dataaa', data);
    this.setState({modalVisible: true});
  };
  onClick = () => {
    this.setState({modalVisible: false});
    AsyncStorage.setItem('showAgeModal', JSON.stringify(true));
  };
  render() {
    return (
      <Modal
        animationType={'fade'}
        visible={this.state.modalVisible}
        transparent={true}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: colors.mudGrey,
          }}>
          <View
            style={{
              height: 294,
              width: 335,
              backgroundColor: '#FFFFFF',
              borderRadius: 8,
            }}>
            <View style={{marginTop: 64, marginBottom: 27, flex: 1}}>
              <View style={{alignItems: 'center'}}>
                <Text style={[styles.boldText, styles.marB_13]}>
                  Age Verification
                </Text>
                <Text style={styles.regularText}>
                  This app requires you to be{' '}
                </Text>
                <Text style={[styles.regularText, {marginBottom: 36}]}>
                  18 years or older.
                </Text>
              </View>
              <SigningButton
                text={'I’M OVER 18'}
                style={[styles.button, {marginHorizontal: 71}]}
                click={this.onClick}
              />
              <Text
                style={[
                  styles.buttonText,
                  {color: 'black', textAlign: 'center'},
                ]}
                onPress={() => {
                  RNExitApp.exitApp();
                }}>
                EXIT
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
export default AgeVerifyModal;
