import React, {useEffect} from 'react';
import {View, StatusBar, ScrollView, KeyboardAvoidingView} from 'react-native';
import {spacing} from '../../Themes/fonts';
import Swiper from 'react-native-swiper';
import {OnBoardingScreen} from '../../ReusableComponents/commonComponent';
import styles from '../../Themes/styles';

export default function BoardingScreen({navigation}) {
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Swiper
          dot={<View style={styles.dot} />}
          activeDot={
            <View
              style={{
                backgroundColor: '#fff',
                width: 20,
                height: 8,
                borderRadius: 5,
                marginLeft: 7,
                marginRight: 7,
              }}
            />
          }
          paginationStyle={{
            top: spacing(50),
          }}
          loop={false}>
          <OnBoardingScreen
            image={'BoardingScreen1'}
            text={`Your friends are already here! \n Elevate life with Barz`}
            navigation={navigation}
            leftImageStyle={{
              width: spacing(84),
              height: spacing(84),
              position: 'absolute',
              left: spacing(-15),
              top: spacing(100),
            }}
            rightImageStyle={{
              width: spacing(120),
              height: spacing(120),
              position: 'absolute',
              top: spacing(40),
              right: spacing(-42),
            }}
            leftImage={'Boarding3Left'}
            rightImage={'Boarding3Right'}
          />
          <OnBoardingScreen
            image={'BoardingScreen2'}
            text={
              'Get your favourite liquor anytime, anywhere from your CloudBar'
            }
            navigation={navigation}
            leftImageStyle={{
              width: spacing(120),
              height: spacing(120),
              position: 'absolute',
              left: -spacing(60),
              bottom: spacing(45),
            }}
            rightImageStyle={{
              // width: 49,
              // height: 80,
              position: 'absolute',
              bottom: spacing(250),
              right: spacing(30),
            }}
            leftImage={'Triangle'}
            rightImage={'Straw'}
          />
          <OnBoardingScreen
            image={'BoardingScreen3'}
            text={' Come on board with Barz to enjoy your virtual bar!'}
            navigation={navigation}
            leftImageStyle={{
              width: 84,
              height: 84,
              position: 'absolute',
              left: -5,
              bottom: spacing(60),
            }}
            rightImageStyle={{
              position: 'absolute',
              top: spacing(110),
              right: spacing(25),
            }}
            leftImage={'MultiColor3'}
            rightImage={'MultiColor'}
          />
        </Swiper>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
