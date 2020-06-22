import React, {useState} from 'react';
import {Modal, Text, View, TouchableOpacity} from 'react-native';
import styles from '../Themes/styles';
import {spacing} from '../Themes/fonts';
import {BackArrowBlack} from './allSVG';

function FAQmodal({navigation, ...restprops}) {
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
            backgroundColor: 'rgb(229,229,229)',
            borderRadius: 8,
            height: spacing(365),
            width: spacing(274),
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
              marginTop: spacing(59),
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: spacing(34),
              marginRight: spacing(30),
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
