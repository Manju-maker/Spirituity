import React, {useState, useEffect, Component} from 'react';
import {Modal, Text, View, TouchableOpacity} from 'react-native';
import styles from '../Themes/styles';
import {colors} from '../Themes/colors';
import {scale} from '../Themes/fonts';
import {BackArrowBlack} from './allSVG';

function FAQmodal({navigation, ...restprops}) {
  console.log('responseeeeeeee>>>>>>>>>>', restprops);
  let {visible} = restprops;
  const [modalVisible, setVisible] = useState(visible);
  return (
    <Modal animationType={'slide'} visible={modalVisible} transparent={true}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            width: 300,
            backgroundColor: 'rgb(229,229,229)',
            borderRadius: 8,
            height: scale(365),
            width: scale(274),
          }}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              position: 'absolute',
              left: 24,
              top: 14,
              width: 20,
              height: 20,
              backgroundColor: 'yellow',
            }}>
            <BackArrowBlack />
          </TouchableOpacity>
          <View
            style={{
              marginTop: scale(59),
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: scale(34),
              marginRight: scale(30),
              marginBottom: 24,
            }}>
            <Text style={[styles.faqTitle, {marginBottom: 11}]}>FAQ Card</Text>
            <Text
              style={[
                styles.text_12_B,
                {textAlign: 'center', marginBottom: 15},
              ]}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
              turpis. Suspendisse urna nibh, viverra non, semper suscipit,
              posuere a, pede.
            </Text>

            <Text style={[styles.text_12_B, {textAlign: 'center'}]}>
              Donec nec justo eget felis facilisis fermentum. Aliquam porttitor
              mauris sit amet orci. Aenean dignissim pellentesque felis. Donec
              nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
              sit amet orci. Aenean dignissim pellentesque felis.
            </Text>
          </View>
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
