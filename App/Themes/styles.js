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
  QB_16_20,
  QB_9_9,
  AM_10_12,
  QB_12_14,
  QB_10_12,
  AM_12_14,
  AR_9_12,
  AB_11_11,
  AB_20_24,
  AM_16_18,
  AR_11_11,
  AR_11_18,
} from './fonts';
import {colors} from './colors';

export const centerText = {alignItems: 'center', justifyContent: 'center'};
let space = {letterSpacing: 0.4};
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
  lightWhite,
} = colors;

const styles = StyleSheet.create({
  text_9_B: {
    ...QB_9_9,
    color: brightWhite,
  },
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

  AR_11_11_white: {
    ...AR_11_11,
    color: lightWhite,
  },
  AR_11_18_white: {
    ...AR_11_18,
    color: lightWhite,
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
  boldWhiteText16: {
    ...QB_16_20,
    color: brightWhite,
  },

  otpInput: {
    height: 53,
    width: 53,
    borderRadius: 8,
    borderColor: offWhite,
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
  shotglassText: {
    ...AM_16_18,
    color: white,
  },
  faqTitle: {
    ...AB_20_24,
    color: darkBlack,
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 7,
    marginRight: 7,
  },
  activeDot: {
    backgroundColor: brightWhite,
    width: 14,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  drinkCategoryStyle: {
    width: 52,
    height: 52,
    borderRadius: 8,
    borderColor: lightWhite,
    borderWidth: 1,
    marginBottom: 4,
    ...centerText,
  },
  drinkCategoryWrapper: {
    width: 52,
    height: 78,
    marginBottom: 7,
    marginHorizontal: 7,
  },
  drinkName: {
    ...AM_10_12,
    textAlign: 'center',
    color: lightWhite,
  },
  title: {
    flexDirection: 'row',
    marginVertical: 12,
    justifyContent: 'space-between',
  },
  titleText: {
    color: lightWhite,
    ...QB_12_14,
  },
  viewAll: {
    color: lightWhite,
    ...QB_10_12,
    marginRight: 8,
    ...space,
  },
  liquorTitle: {
    ...AM_12_14,
    textAlign: 'center',
    marginTop: 3,
    ...space,
  },
  quantity: {
    ...AR_9_12,
    color: black,
    textAlign: 'center',
    marginTop: 3,
    ...space,
  },
  time: {
    ...AR_9_12,
    color: '#717171',
  },
  price: {
    ...AB_11_11,
    textAlign: 'center',
    color: darkBlack,
    marginVertical: 5,
  },
  cloudbarText: {
    width: 95,
    height: 24,
    borderRadius: 10.5,
    backgroundColor: '#9852eb',
    flexDirection: 'row',
    ...centerText,
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
