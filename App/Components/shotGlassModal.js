import React, {useState} from 'react';
import {Modal, Text, View, TouchableOpacity, Image} from 'react-native';
import styles from '../Themes/styles';
import {spacing} from '../Themes/fonts';
import {QuestionmarkSVG, CrossSVG, ShotSVG} from './allSVG';
import FAQmodal from '../Components/FAQmodal';

function ShotGlassModal({navigation, ...restprops}) {
  let {visible = false, setVisible = {}} = restprops;
  console.log('props', navigation);

  const [faqVisible, setFaqVisible] = useState(false);
  console.log('faq Visile in shotglass', faqVisible);

  let handlePress = () => {
    setFaqVisible(!faqVisible);
  };

  return (
    <Modal animationType={'fade'} visible={visible} transparent={true}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <FAQmodal
          faqVisible={faqVisible}
          setVisible={value => setFaqVisible(value)}
        />
        <View
          style={{
            backgroundColor: '#9852eb',
            borderRadius: 8,
            height: spacing(365),
            width: spacing(274),
          }}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 18,
            }}>
            <View
              style={{
                top: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => handlePress()}>
                <QuestionmarkSVG />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <CrossSVG />
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: spacing(26),
                justifyContent: 'center',
                alignItems: 'center',
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
            {/* <View style={{borderColor: 'yellow', borderWidth: 5}}> */}
            {[1, 2, 3].map(item => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 49,
                    marginBottom: 6,
                    marginLeft: 6,
                    marginRight: 11,
                  }}>
                  <View>
                    <View style={{width: 80, height: 35}} />
                    <Text style={styles.AR_11_18_white}>BAR TIER</Text>
                  </View>
                  <Image
                    source={require('../Assets/images/shots.png')}
                    style={{width: 62, height: 49}}
                  />
                </View>
              );
            })}
            {/* </View> */}
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
