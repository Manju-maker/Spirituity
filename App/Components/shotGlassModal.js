import React, {useState, useEffect, Component} from 'react';
import {Modal, Text, View} from 'react-native';
import styles from '../Themes/styles';
import {colors} from '../Themes/colors';
import {scale} from '../Themes/fonts';
import {QuestionmarkSVG} from './allSVG';

function ConfirmationModal() {
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
            backgroundColor: '#9852eb',
            borderRadius: 8,
            paddingVertical: scale(224),
            paddingHorizontal: scale(50),
          }}
        />
      </View>
    </Modal>
  );
}
export default ConfirmationModal;

//<Text
// style={[
//     styles.boldText,
//     styles.marB_13,
//     {width: 200, textAlign: 'center'},
//   ]}>
//   {header}
// </Text>
