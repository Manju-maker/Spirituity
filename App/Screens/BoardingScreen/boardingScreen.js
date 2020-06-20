import React, {useEffect} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import {spacing} from '../../Themes/fonts';
import Swiper from 'react-native-swiper';
import {OnBoardingScreen} from '../../ReusableComponents/commonComponent';
import styles from '../../Themes/styles';

export default function BoardingScreen({navigation}) {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
            bottom: spacing(270),
          }}
          loop={false}>
          <OnBoardingScreen
            image={'BoardingScreen1'}
            text={'Build your Cloud Bar anytime, anywhere'}
            navigation={navigation}
          />
          <OnBoardingScreen
            image={'BoardingScreen2'}
            text={
              'Consume your virtual drinks in any partner bars in Singapore'
            }
            navigation={navigation}
          />
          <OnBoardingScreen
            image={'BoardingScreen3'}
            text={' Singapore is your playground'}
            navigation={navigation}
          />
        </Swiper>
      </View>
    </ScrollView>
  );
}
