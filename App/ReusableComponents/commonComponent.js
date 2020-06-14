import React from 'react';
import {TouchableOpacity, Text, View, ImageBackground} from 'react-native';
import styles, {centerText} from '../Themes/styles';
import ForwardArrowSVG from '../Components/forwardArrowSVG';
import FacebookSVG from '../Components/facebookSVG';
import GoogleSVG from '../Components/googleSVG';
import getImage from '../utils/getImage';
import BarzWhiteSVG from '../Components/barzWhiteSVG';
import {colors} from '../Themes/colors';
import {spacing} from '../Themes/fonts';

let {brightWhite, transparent} = colors;
const textAlign = {textAlign: 'center'};
let {purple, offWhite} = colors;
let {textInputWrapper, text, marB_9, inputBox} = styles;

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
function SigningButton({click, text, style, disable = false}) {
  return (
    <TouchableOpacity
      disabled={disable}
      style={[
        {
          marginBottom: spacing(16),
          flexDirection: 'row',
          shadowColor: 'rgba(0,0,0,0.25)',
          shadowOffset: {height: 1, width: 1},
          shadowOpacity: 1,
          shadowRadius: 1,
          elevation: 5,
        },
        style,
      ]}
      onPress={() => click()}>
      <Text style={[styles.buttonText, {marginRight: spacing(10)}]}>
        {text}
      </Text>
      <ForwardArrowSVG />
    </TouchableOpacity>
  );
}
// function InputField(props) {
//   let {setRef = () => {},} = props;
//   return (
//     <View style={[styles.textInputWrapper]}>
//       <Text style={[styles.text, styles.marB_9]}>Phone number</Text>
//       <View
//         style={[
//           styles.inputBox,
//           {
//             flexDirection: 'row',
//             paddingLeft: 0,
//             alignItems: 'center',
//             paddingHorizontal: 5,
//           },
//         ]}
//         ref={ref => setRef(ref, 'phoneNumber')}>
//         <TextInput
//           value={countryCode}
//           style={{
//             width: 60,
//             textAlign: 'center',
//             borderRightWidth: 1,
//             borderRightColor: offWhite,
//           }}
//         />
//         <TextInput
//           style={[{flex: 1, paddingLeft: 16}]}
//           placeholder="Enter phone number"
//           value={phoneNumber}
//           onFocus={() => onFocused('phoneNumber')}
//           onBlur={() => onBlur('phoneNumber')}
//           keyboardType={'number-pad'}
//           onChangeText={text => setData('phoneNumber', text)}
//         />
//         <Text>{phoneNumberError === true && <CheckArrowSVG />}</Text>
//       </View>
//       <Text style={{color: 'red'}}>{phoneNumberError}</Text>
//     </View>
//   );
// }

function OnBoardingScreen({image, text, navigation}) {
  return (
    <ImageBackground
      style={{flex: 1}}
      source={getImage(image)}
      resizeMode="stretch">
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
        <TouchableOpacity
          style={styles.barzButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.barzButtonText}>JOIN BARZ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.barzButton,
            {
              backgroundColor: transparent,
              borderWidth: 1,
              borderColor: brightWhite,
              marginBottom: spacing(29),
            },
          ]}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.barzButtonText}>SIGN IN</Text>
        </TouchableOpacity>
        <Text style={styles.barzButtonText}>EXPLORE APP</Text>
      </View>
    </ImageBackground>
  );
}

export {OnBoardingScreen, GoogleFacebookLogin, SigningButton};
