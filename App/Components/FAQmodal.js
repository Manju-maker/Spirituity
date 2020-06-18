import React, {useState, useEffect, Component} from 'react';
import {Modal, Text, View} from 'react-native';
import styles from '../Themes/styles';
import {colors} from '../Themes/colors';
import {scale} from '../Themes/fonts';
import {QuestionmarkSVG} from './allSVG';

function FAQmodal() {
  const [visible, setVisible] = useState(true);
  return (
    <Modal animationType={'fade'} visible={visible}>
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
          }}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <QuestionmarkSVG />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
export default FAQmodal;

//<Text
// style={[
//     styles.boldText,
//     styles.marB_13,
//     {width: 200, textAlign: 'center'},
//   ]}>
//   {header}
// </Text>
