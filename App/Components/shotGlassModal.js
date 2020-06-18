import React, {useState, useEffect, Component} from 'react';
import {Modal, Text, View, TouchableOpacity} from 'react-native';
import styles from '../Themes/styles';
import {colors} from '../Themes/colors';
import {scale} from '../Themes/fonts';
import {BackArrowBlack, QuestionmarkSVG, CrossSVG, ShotSVG} from './allSVG';

function ShotGlassModal({navigation, ...restprops}) {
  console.log('modallllllllllllllllllllllllllll', restprops);
  let {visible, setVisible} = restprops;

  return (
    <Modal animationType={'slide'} visible={visible} transparent={true}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: '#9852eb',
            borderRadius: 8,
            height: scale(365),
            width: scale(274),
          }}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 18,
              borderWidth: 1,
              borderColor: 'black',
            }}>
            <View
              style={{
                borderWidth: 2,
                borderColor: 'red',
                top: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('FAQmodal')}>
                <QuestionmarkSVG />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <CrossSVG />
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: scale(26),
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'green',
                borderWidth: 0.5,
                marginVertical: 13,
              }}>
              <Text
                style={[
                  styles.faqTitle,
                  {marginBottom: 6, textAlign: 'center', color: 'white'},
                ]}>
                Approximate Number of Shots
              </Text>
              <Text style={styles.shotglassText}>per 700ml bottle</Text>
            </View>
            <View style={{borderColor: 'yellow', borderWidth: 5}}>
              {[1, 2, 3].map(item => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: 49,
                      borderColor: 'pink',
                      borderWidth: 0.5,
                    }}>
                    <View>
                      <View style={{width: 80, height: 35}} />
                      <Text style={styles.AR_11_18_white}>BAR TIER</Text>
                    </View>
                    <ShotSVG />
                  </View>
                );
              })}
            </View>
            <Text
              style={[
                styles.AR_11_11_white,
                {marginTop: 22, textAlign: 'center'},
              ]}>
              1 SHOT IS ABOUT 30ml
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default ShotGlassModal;
