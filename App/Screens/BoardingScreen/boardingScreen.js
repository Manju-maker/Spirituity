import React, {useEffect} from 'react';
import {View, StatusBar, Dimensions} from 'react-native';
import {spacing} from '../../Themes/fonts';
import Swiper from 'react-native-swiper';
import {OnBoardingScreen} from '../../ReusableComponents/commonComponent';
import styles from '../../Themes/styles';

export default function BoardingScreen({navigation}) {
  return (
    <View style={styles.container}>
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
          bottom: spacing(250),
        }}
        loop={false}>
        <OnBoardingScreen
          image={'onBoarding1'}
          text={'Build your Cloud Bar anytime, anywhere'}
          navigation={navigation}
        />
        <OnBoardingScreen
          image={'onBoarding2'}
          text={'Consume your virtual drinks in any partner bars in Singapore'}
          navigation={navigation}
        />
        <OnBoardingScreen
          image={'onBoarding3'}
          text={' Singapore is your playground'}
          navigation={navigation}
        />
      </Swiper>
    </View>
  );
}
