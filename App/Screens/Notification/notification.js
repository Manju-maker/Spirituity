import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {BackArrowBlack} from '../../Components/allSVG';
import {scale} from '../../Themes/fonts';
import styles from '../../Themes/styles';
import {colors} from '../../Themes/colors';

function Notification({navigation}) {
  let data = [
    {
      bar: 'Barz',
      color: 'purple',
      time: '2 mins ago',
      text:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. up to three lines',
    },
    {
      bar: 'Harry',
      color: 'green',
      time: '2 mins ago',
      text:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. up to three lines',
    },
    {
      bar: 'Harry’s Seletar',
      color: 'pink',
      time: 'yesterday',
      text:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. up to three lines',
    },
    {
      bar: 'Barz',
      color: 'blue',
      time: '2 days ago',
      text:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. up to three lines',
    },
    {
      bar: 'Harry',
      color: 'yellow',
      time: '3 months ago',
      text:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. up to three lines',
    },
    {
      bar: 'Harry’s Seletar',
      color: 'red',
      time: '3 months ago',
      text:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. up to three lines',
    },
    {
      bar: 'Harry’s Seletar',
      color: 'red',
      time: '4 months ago',
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
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{marginLeft: 21}}
            onPress={() => navigation.goBack()}>
            <BackArrowBlack />
          </TouchableOpacity>
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
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginRight: 20,
                  }}>
                  <Text
                    style={[
                      styles.titleText,
                      {color: colors.lightPurple, marginTop: 8},
                    ]}>
                    {item.bar}
                  </Text>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      flex: 1,
                    }}>
                    <Text style={[styles.time]}>2 minutes </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginRight: 31,
                  }}>
                  <Text numberOfLines={3} style={[styles.text, {flex: 1}]}>
                    {item.text}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Notification;
