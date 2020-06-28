import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from '../Themes/styles';
import {spacing} from '../Themes/fonts';
import {QuestionmarkSVG, CrossSVG, BarTierSVG} from './allSVG';
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
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
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
              backgroundColor: 'rgb(152,82,235)',
              borderRadius: 8,
              borderWidth: 5,
              borderColor: 'red',
              width: spacing(274),
            }}>
            <View
              style={{
                marginHorizontal: 18,
              }}>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={() => handlePress()}>
                  <QuestionmarkSVG />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 24,
                    height: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => setVisible(false)}>
                  <CrossSVG fillColor={'#FFF'} />
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
                <Text style={[styles.shotglassText, {paddingTop: 5}]}>
                  per 700ml bottle
                </Text>
              </View>
              <View style={{borderColor: 'yellow', borderWidth: 5}}>
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
                        borderColor:"red",
                        borderWidth:4
                      }}>
                      <View
                        style={{ 
                          justifyContent: 'center',
                        }}>
                        <BarTierSVG />
                        <Text style={styles.AR_11_18_white}>BAR TIER</Text>
                      </View>
                      <Image
                        source={require('../Assets/images/shots.png')}
                        style={{width: 62, height: 49}}
                      />
                    </View>
                  );
                })}
              </View>
              <Text
                style={[
                  styles.AR_11_11_white,
                  {
                    marginTop: 22,
                    textAlign: 'center',
                    marginBottom: 23,
                    paddingTop: 5,
                  },
                ]}>
                1 SHOT IS ABOUT 30ml
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
export default ShotGlassModal;
