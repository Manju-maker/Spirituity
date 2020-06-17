import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {BackArrowBlack} from '../../Components/allSVG';
import {scale} from '../../Themes/fonts';
import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';

function Notification() {
  let data = [
    {
      bar: 'Barz',
      color: 'purple',
      text:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. up to three lines',
    },
    {
      bar: 'Harry',
      color: 'green',
      text:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. up to three lines',
    },
    {
      bar: 'Harry’s Seletar',
      color: 'pink',
      text:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. up to three lines',
    },
    {
      bar: 'Barz',
      color: 'blue',
      text:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. up to three lines',
    },
    {
      bar: 'Harry',
      color: 'yellow',
      text:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. up to three lines',
    },
    {
      bar: 'Harry’s Seletar',
      color: 'red',
      text:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. up to three lines',
    },
  ];
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          marginTop: scale(66),
          marginBottom: scale(22),
          borderWidth: 2,
          borderColor: 'green',
        }}>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: 'red',
          }}>
          <View style={{marginLeft: 21}}>
            <BackArrowBlack />
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.liquorTitle, {textAlign: 'center'}]}>
              Notifications
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: '#f8f8f8'}}>
        {data.map(item => {
          return (
            <View
              style={{
                // borderWidth: 2,
                // borderColor: 'green',
                marginLeft: 20,
                height: 80,
                flexDirection: 'row',
                marginBottom: 12,
              }}>
              <View style={{height: 80, width: 61}}>
                <View
                  style={{
                    width: 47,
                    height: 47,
                    borderRadius: 40,
                    backgroundColor: item.color,
                    marginTop: 8,
                  }}
                />
              </View>
              <View>
                <Text
                  style={[
                    styles.titleText,
                    {color: colors.lightPurple, marginTop: 8},
                  ]}>
                  {item.bar}
                </Text>
                <Text
                  numberOfLines={3}
                  style={[styles.text, {flex: 1, marginRight: 48}]}>
                  {item.text}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Notification;
