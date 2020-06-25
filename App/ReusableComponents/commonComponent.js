import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import styles, {centerText} from '../Themes/styles';
import getImage from '../utils/getImage';
import {
  BarzWhiteSVG,
  FacebookSVG,
  GoogleSVG,
  ForwardArrowSVG,
} from '../Components/allSVG';
import {colors} from '../Themes/colors';
import {spacing} from '../Themes/fonts';

let {brightWhite, transparent} = colors;
const textAlign = {textAlign: 'center'};

function GoogleFacebookLogin(props) {
  let {text = []} = props;
  return (
    <>
      {text.length > 0 &&
        text.map(item => {
          return (
            <TouchableOpacity
              style={[
                styles.inputBox,
                styles.textInputWrapper,
                {...centerText},
              ]}
              onPress={() => item.click()}>
              <View style={[styles.imageIcon, centerText]}>
                {item.imageName == 'Facebook' ? <FacebookSVG /> : <GoogleSVG />}
              </View>
              <Text style={[styles.boldText_14, {color: '#37475C'}]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
    </>
  );
}
function SigningButton({
  click,
  text,
  style,
  disable = false,
  showArrow = true,
}) {
  let shadow = !disable
    ? {
        shadowColor: 'rgba(0,0,0,0.25)',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 5,
      }
    : {};
  return (
    <TouchableOpacity
      disabled={disable}
      style={[
        {
          marginBottom: spacing(16),
          flexDirection: 'row',
          ...shadow,
        },

        style,
      ]}
      onPress={() => click()}>
      <Text style={[styles.buttonText, {marginRight: spacing(10)}]}>
        {text}
      </Text>
      {showArrow && <ForwardArrowSVG />}
    </TouchableOpacity>
  );
}

function OnBoardingScreen({
  image,
  text,
  navigation,
  leftImageStyle,
  rightImageStyle,
  leftImage,
  rightImage,
}) {
  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={getImage(image)}
      resizeMode={'cover'}>
      <View style={{alignItems: 'center', marginTop: spacing(50)}}>
        <BarzWhiteSVG />
        <Text style={styles.boardingTitle}> Your Barz Anywhere</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: spacing(50)}}>
        <Text style={[styles.boldTextWhite, styles.marH_53, textAlign]}>
          {text}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          marginBottom: spacing(30),
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Image
          source={getImage('wineGlass')}
          style={{
            width: spacing(282),
            height: spacing(305),
            position: 'absolute',
            bottom: spacing(-80),
          }}
          resizeMode={'contain'}
        />

        <Image source={getImage(leftImage)} style={{...leftImageStyle}} />

        <Image source={getImage(rightImage)} style={{...rightImageStyle}} />

        <TouchableOpacity
          style={styles.barzButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.barzButtonText, {letterSpacing: 1}]}>
            JOIN BARZ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.barzButton,
            {
              backgroundColor: transparent,
              borderWidth: 1,
              borderColor: brightWhite,
              flexDirection: 'row',
              marginBottom: spacing(29),
            },
          ]}
          onPress={() => navigation.navigate('SignIn')}>
          <Text
            style={[styles.barzButtonText, {marginRight: 8, letterSpacing: 1}]}>
            SIGN IN
          </Text>
          <ForwardArrowSVG />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NoRegister')}>
          <Text style={styles.barzButtonText}>EXPLORE APP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export {OnBoardingScreen, GoogleFacebookLogin, SigningButton};
