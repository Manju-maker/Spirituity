import {Dimensions, Platform, PixelRatio} from 'react-native';
// NOTE: To get the correct font size, use the fontSize(14) function
export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return isIos
    ? dimen.height === 812 ||
        dimen.width === 812 ||
        (dimen.height === 896 || dimen.width === 896)
    : dimen.height > 736;
};

export const isIphone6 = () => {
  const dimen = Dimensions.get('window');
  return dimen.height > 600 && dimen.height < 750;
};

const widthPercentageToDP = (
  iphoneWidthPercent,
  androidWidthPercent = iphoneWidthPercent,
) => {
  const elemWidth =
    typeof iphoneWidthPercent === 'number'
      ? isIos
        ? iphoneWidthPercent
        : androidWidthPercent
      : parseFloat(isIos ? iphoneWidthPercent : androidWidthPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

export const HeightPercentageToDP = (
  iphoneHeightPercent,
  androidHeightPercent = iphoneHeightPercent,
) => {
  const elemHeight =
    typeof iphoneHeightPercent === 'number'
      ? isIos
        ? iphoneHeightPercent
        : androidHeightPercent
      : parseFloat(isIos ? iphoneHeightPercent : androidHeightPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

export const deviceDimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  WPTDP: widthPercentageToDP,
  HPTDP: HeightPercentageToDP,
};

export const heiWidScale = 0.125;

export const scales = size => {
  return deviceDimensions.HPTDP(heiWidScale * size);
};

const iphoneXBottomSpace = scales(35);

export const dimensions = {
  topExtraSpace: 6,
  roundBtnHeight:
    Math.min(deviceDimensions.height, deviceDimensions.width) * 0.2,
  bottomButtonHeight: 60,
  numKeyboardHeight: deviceDimensions.height * 0.67,
  iphoneXBottomSpace,
  tabBarHeight: deviceDimensions.HPTDP(isIphoneX() ? '7.5%' : '10%', '10%'),
};

export const fontScale = 0.15;

export const fontSize = size => {
  return deviceDimensions.HPTDP(fontScale * size);
};

export const marginPaddingScale = 0.17;
export const svgWidthScale = 0.122;
export const svgHeightScale = 0.126;

export const spacing = size => {
  return deviceDimensions.HPTDP(marginPaddingScale * size);
};
export const scale = value => fontSize(value);

const QB_9_9 = {
  fontSize: scale(9),
  lineHeight: 9,
  fontFamily: 'Quicksand-Bold',
};
const AR_12_18 = {
  fontSize: scale(13),
  lineHeight: 18,
  fontFamily: 'AvenirNextLTPro-Regular',
};
const QB_13 = {
  fontSize: scale(13),
  lineHeight: 16,
  fontFamily: 'Quicksand-Bold',
};
const QB_14_18 = {
  fontSize: scale(14),
  lineHeight: 18,
  fontFamily: 'Quicksand-Bold',
};

const AB_14 = {
  fontSize: scale(14),
  lineHeight: 18,
  fontFamily: 'AvenirNextLTPro-Bold',
};

const QB_24 = {
  fontSize: scale(24),
  lineHeight: 28,
  fontFamily: 'Quicksand-Bold',
};
const AR_16 = {
  fontSize: scale(16),
  lineHeight: 22,
  fontFamily: 'AvenirNextLTPro-Regular',
};
const AR_12 = {
  fontSize: scale(12),
  lineHeight: 16,
  fontFamily: 'AvenirNextLTPro-Regular',
};
const QM_13_21 = {
  fontSize: scale(13.5),
  lineHeight: 21,
  fontFamily: 'Quicksand-Medium',
};

const QR_14_18 = {
  fontSize: scale(14),
  lineHeight: 18,
  fontFamily: 'Quicksand-Regular',
};
const QB_16_20 = {
  fontSize: scale(16),
  lineHeight: 20,
  fontFamily: 'Quicksand-Bold',
};
export {
  QB_9_9,
  AR_12_18,
  QB_13,
  AB_14,
  QB_24,
  AR_16,
  AR_12,
  QB_14_18,
  QM_13_21,
  QR_14_18,
  QB_16_20,
};
