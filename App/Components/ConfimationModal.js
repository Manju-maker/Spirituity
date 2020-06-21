import React, {Component} from 'react';
import {Modal, Text, View} from 'react-native';
import Events from 'react-native-simple-events';
import RNExitApp from 'react-native-exit-app';
import styles from '../Themes/styles';
import {AgeModalWavesSVG, AgeModalCirclesSVG} from './allSVG';
import {colors} from '../Themes/colors';
import {SigningButton} from '../ReusableComponents/commonComponent';
import AsyncStorage from '@react-native-community/async-storage';

class ConfirmationModal extends Component {
  constructor() {
    super();
    this.state = {modalVisible: false, modalData: {}};
  }
  componentDidMount() {
    Events.on('showConfirmationModal', 'myId', this.onShow);
  }
  componentWillUnmount() {
    Events.rm('showConfirmationModal', 'myId');
  }
  onShow = data => {
    let {
      header = '',
      message = '',
      buttonText = '',
      showExit = false,
      showArrow = true,
    } = data;
    let finalData = {
      header,
      message,
      buttonText,
      showExit,
      showArrow,
    };
    this.setState({modalVisible: true, modalData: finalData});
  };
  onClick = () => {
    this.setState({modalVisible: false});
    AsyncStorage.setItem('showAgeModal', JSON.stringify(true));
  };
  render() {
    let {
      header,
      message,
      buttonText,
      showExit,
      showArrow,
    } = this.state.modalData;
    return (
      <Modal animationType={'fade'} visible={this.state.modalVisible}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: colors.mudGrey,
          }}>
          <View
            style={{
              width: 300,
              backgroundColor: '#FFFFFF',
              borderRadius: 8,
              paddingTop: 57,
              paddingBottom: 27,
            }}>
            <View style={{position: 'absolute', top: 22, left: 0}}>
              <AgeModalCirclesSVG />
            </View>
            <View style={{position: 'absolute', top: 14, right: 0}}>
              <AgeModalWavesSVG />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={[
                  styles.boldText,
                  styles.marB_13,
                  {width: 200, textAlign: 'center'},
                ]}>
                {header}
              </Text>
              <Text
                style={[
                  styles.regularText,
                  {marginBottom: 36, textAlign: 'center', width: 200},
                ]}>
                {message}
              </Text>
            </View>
            <SigningButton
              text={buttonText}
              style={[styles.button, {marginHorizontal: 71}]}
              click={this.onClick}
              showArrow={showArrow}
            />
            {showExit && (
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
            )}
          </View>
        </View>
      </Modal>
    );
  }
}
export default ConfirmationModal;
