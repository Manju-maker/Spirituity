import React, {useEffect} from 'react';
import {View, StatusBar, ScrollView} from 'react-native';
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
          paginationStyle={{
            bottom: spacing(270),
          }}
          loop={false}>
          <OnBoardingScreen
            image={'BoardingScreen1'}
            text={`Your friends are already here! \n Elevate life with Barz`}
            navigation={navigation}
            leftImageStyle={{
              width: 84,
              height: 84,
              position: 'absolute',
              left: -5,
              bottom: spacing(110),
            }}
            rightImageStyle={{
              width: 49,
              height: 80,
              position: 'absolute',
              bottom: spacing(235),
              right: 41,
            }}
            leftImage={'MultiColor3'}
            rightImage={'MultiColor'}
          />
          <OnBoardingScreen
            image={'BoardingScreen2'}
            text={
              'Get your favourite liquor anytime, anywhere from your CloudBar'
            }
            navigation={navigation}
            leftImageStyle={{
              width: 84,
              height: 84,
              position: 'absolute',
              left: 0,
              bottom: spacing(100),
            }}
            rightImageStyle={{
              // width: 49,
              // height: 80,
              position: 'absolute',
              bottom: spacing(250),
              right: 41,
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
              bottom: spacing(197),
            }}
            rightImageStyle={{
              // width: 49,
              // height: 80,
              position: 'absolute',
              bottom: spacing(263),
              right: 0,
            }}
            leftImage={'Boarding3Left'}
            rightImage={'Boarding3Right'}
          />
        </Swiper>
      </View>
    </ScrollView>
  );
}
