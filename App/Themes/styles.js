import {StyleSheet} from 'react-native';
import {
  AR_12_18,
  QB_13,
  AB_14,
  QB_24,
  AR_16,
  AR_12,
  QB_14_18,
  QM_13_21,
  spacing,
  QR_14_18,
} from './fonts';
import {colors} from './colors';

export const centerText = {alignItems: 'center', justifyContent: 'center'};
const {
  lightPeach,
  greyBlack,
  darkBlack,
  black,
  purple,
  offWhite,
  lightBlack,
  hexYellow,
  brightWhite,
  lightGrey,
  offBlack,
  white,
} = colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
  },

  inputBox: {
    borderWidth: 1,
    borderColor: offWhite,
    borderRadius: 8,
    height: 53,
    paddingLeft: 16,
  },
  text: {
    color: lightBlack,
    ...AR_12_18,
  },
  bottomText: {
    color: offBlack,
    ...QR_14_18,
  },
  boldText_14: {
    color: greyBlack,
    ...QB_14_18,
  },
  textInputWrapper: {
    marginBottom: 14,
    // backgroundColor: "yellow"
  },
  button: {
    borderRadius: 8,
    height: 53,
    backgroundColor: hexYellow,
    ...centerText,
  },
  buttonText: {
    ...QB_13,
    letterSpacing: 1,
    color: brightWhite,
  },
  or: {
    flex: 1,
    height: 1,
    backgroundColor: lightGrey,
  },
  text_12: {
    color: lightBlack,
    ...AR_12,
  },
  text_12_B: {
    color: darkBlack,
    ...AR_12,
  },
  imageIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 20,
  },
  colorsText: {
    ...QB_14_18,
    color: purple,
  },
  colorTextRegular: {
    ...AB_14,
    color: purple,
  },

  boldText: {
    color: black,
    ...QB_24,
  },
  boldTextWhite: {
    color: brightWhite,
    ...QB_24,
  },
  regularText: {
    color: black,
    ...AR_16,
  },
  signinChildContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 30,
  },
  titleContainer: {
    marginTop: 18,
    marginBottom: 17,
    ...centerText,
  },
  boardingTitle: {
    ...QM_13_21,
    color: lightPeach,
  },

  otpInput: {
    height: 53,
    width: 53,
    borderRadius: 8,
    borderColor: colors.offWhite,
    borderWidth: 1,
    marginHorizontal: 12,
    textAlign: 'center',
  },
  checkbox: {
    height: 24,
    width: 24,
    marginRight: 9,
  },
  rowViewWrapperEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rowViewWrapperCenter: {
    flexDirection: 'row',
    ...centerText,
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 7,
    marginRight: 7,
  },
  barzButton: {
    height: 50,
    width: 170,
    backgroundColor: hexYellow,
    marginHorizontal: 45,
    ...centerText,
    borderRadius: 8,
    marginBottom: 7,
  },
  barzButtonText: {
    color: brightWhite,
    ...QB_14_18,
  },
  marH_53: {
    marginHorizontal: 53,
  },
  marB_9: {
    marginBottom: 9,
  },
  marB_13: {
    marginBottom: 13,
  },
  marB_20: {
    marginBottom: spacing(20),
  },
  marL_15: {
    marginLeft: 15,
  },
  marR_15: {
    marginRight: 15,
  },
  marV_24: {
    marginVertical: 24,
  },
  marT_10: {
    marginTop: 10,
  },
  marL_8: {
    marginLeft: 8,
  },
});

export default styles;
