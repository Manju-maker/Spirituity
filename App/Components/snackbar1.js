import React, {Component} from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
  Dimensions,
} from 'react-native';
import Events from 'react-native-simple-events';
import {isIphoneX} from '../utils/common';

const width = Dimensions.get('window').width;

export const showSnackBar = (data = {}) => {
  let {
    message = 'Your custom message',
    textColor = '#FFF',
    position = 'bottom',
    confirmText = 'OPEN',
    buttonColor = 'white',
    duration = 3000,
    animationTime = 250,
    backgroundColor = 'rgb(250,114,104)',
    onConfirm = () => {},
    ...otherProps
  } = data;

  Events.trigger('showSnackBar', {
    message,
    textColor, // message text color
    position, // enum(top/bottom).
    confirmText, // button text.
    buttonColor, // default button text color
    duration, // (in ms), duartion for which snackbar is visible.
    animationTime, // time duration in which snackbar will complete its open/close animation.
    backgroundColor, //background color for snackbar
    onConfirm, //  perform some task here on snackbar button press.
    ...otherProps,
  });
};

export default class SnackBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Had a snack at snackBar.',
      confirmText: null,
      onConfirm: null,
      position: 'bottom',
      show: false,
      duration: 2000,
      animationTime: 250,
      height: isIphoneX() ? 88 : 64,
      textColor: '#FFF',
      buttonColor: 'white',
      backgroundColor: '#323232',

      top: new Animated.Value(isIphoneX() ? -88 : -64),
      bottom: new Animated.Value(isIphoneX() ? -88 : -64),
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });

    this.left = 0;
    this.top = 0;
    this.shouldHide = false;

    this.snackBarSwipeAbleStyle = {
      opacity: 1,
      left: this.left,
      // top: this.top,
    };

    this.timeout = undefined;
  }

  componentWillMount() {
    let {id = null} = this.props;
    Events.on('showSnackBar', id ? id : '123456789', this.onRequest);
  }

  componentWillUnmount() {
    let {id = null} = this.props;
    Events.remove('showSnackBar', id ? id : '123456789');
    this.timeout && clearTimeout(this.timeout);
  }

  onRequest = options => {
    let {
      message,
      confirmText,
      onConfirm,
      position = 'bottom',
      height = isIphoneX() ? 88 : 64,
      duration = 4000,
      animationTime = 250,
      show = true,
      ...otherOptions
    } = options;

    if (message) {
      this.timeout && clearTimeout(this.timeout);
      console.log('PPPPPPPPPPPPPP', options);
      this.setState(
        {
          message,
          confirmText,
          onConfirm,
          position,
          height,
          duration,
          show,
          ...otherOptions,
          top: new Animated.Value(-1 * height),
          bottom: new Animated.Value(-1 * height),
        },
        () => {
          position === 'top' &&
            Animated.sequence([
              Animated.timing(this.state.top, {
                toValue: 0,
                duration: animationTime,
              }),
              Animated.delay(duration),
              Animated.timing(this.state.top, {
                toValue: -1 * height,
                duration: animationTime,
              }),
            ]).start();

          position === 'bottom' &&
            Animated.sequence([
              Animated.timing(this.state.bottom, {
                toValue: 0,
                duration: animationTime,
              }),
              Animated.delay(duration),
              Animated.timing(this.state.bottom, {
                toValue: -1 * height,
                duration: animationTime,
              }),
            ]).start();

          this.timeout = setTimeout(() => {
            this.snackBarSwipeAbleStyle.opacity = 1;
            this.snackBarSwipeAbleStyle.left = 0;
            this.snackBarSwipeAbleStyle.top = 0;
            this.updateSnackBarStyle();
            this.setState({show: false});
          }, duration + 2 * animationTime);
        },
      );
    }
  };
  hideSnackBar = () => {
    let {position, height, animationTime} = this.state;
    position === 'top' &&
      Animated.sequence([
        Animated.timing(this.state.top, {
          toValue: -1 * height,
          duration: animationTime,
        }),
      ]).start();

    position === 'bottom' &&
      Animated.sequence([
        Animated.timing(this.state.bottom, {
          toValue: -1 * height,
          duration: animationTime,
        }),
      ]).start();
  };

  handlePanResponderMove = (e, gestureState) => {
    if (gestureState.dx > Math.abs(gestureState.dy)) {
      this.snackBarSwipeAbleStyle.left = this.left + gestureState.dx;
      this.snackBarSwipeAbleStyle.top = 0;
    } else {
      if (this.top + gestureState.dy <= 0)
        this.snackBarSwipeAbleStyle.top = this.top + gestureState.dy;
      this.snackBarSwipeAbleStyle.left = 0;
    }
    this.setSnackBarOpacity();
    this.updateSnackBarStyle();
  };

  handlePanResponderEnd = (e, gestureState) => {
    this.shouldHide && this.setState({show: false});

    this.snackBarSwipeAbleStyle.opacity = 1;
    this.snackBarSwipeAbleStyle.left = 0;
    this.snackBarSwipeAbleStyle.top = 0;
    this.updateSnackBarStyle();
  };

  updateSnackBarStyle = (style = {}) => {
    this.snackBar &&
      this.snackBar.setNativeProps({
        style: {...this.snackBarSwipeAbleStyle, ...style},
      });
  };

  setSnackBarOpacity = () => {
    let leftFactor = Math.abs(this.snackBarSwipeAbleStyle.left) / width;
    let topFactor =
      Math.abs(this.snackBarSwipeAbleStyle.top) / this.state.height;

    if ((leftFactor || topFactor) > 0.5) {
      this.snackBarSwipeAbleStyle.opacity = 0;
      this.shouldHide = true;
    } else {
      this.snackBarSwipeAbleStyle.opacity = 1 - (leftFactor || topFactor) / 0.5;
      this.shouldHide = false;
    }
  };

  render() {
    let {
      height,
      show,
      message,
      confirmText,
      position,
      top,
      bottom,
      textColor,
      buttonColor,
      backgroundColor,
      onConfirm = this.hideSnackBar,
    } = this.state;
    console.log(':LSSSSSSSSSSSSSSSSS', position);

    let snackbarStyle = [
      {
        position: 'absolute',
        flexDirection: 'row',
        minHeight: height,
        maxHeight: 88,
        height: isIphoneX() ? 88 : height,
        paddingTop: isIphoneX() ? 24 : 0,
        width, // left: 0, right: 0,
        backgroundColor: backgroundColor,
        paddingHorizontal: 24,
        marginHorizontal: 12,
        shadowRadius: 2,
        shadowColor: 'black',
        shadowOffset: {height: 3, width: 1},
        shadowOpacity: 0.4,
        elevation: 24,
      },
      position === 'top' && {top: top},
      position === 'bottom' && {bottom: bottom},
      this.snackBarSwipeAbleStyle,
    ];
    console.log(
      'snackbarstyleeeee>>>',
      snackbarStyle,
      'position>>>>>>>>',
      position,
    );
    let buttonTextStyle = [
      {
        color: buttonColor,
        fontFamily: 'OpenSans-SemiBold',
        textAlign: 'left',
        fontSize: 14,
      },
    ];
    let messageTextStyle = [
      {color: textColor, fontFamily: 'OpenSans', fontSize: 14},
    ];

    if (show) {
      return (
        <Animated.View
          style={snackbarStyle}
          ref={snackBar => {
            this.snackBar = snackBar;
          }}
          {...this.panResponder.panHandlers}>
          <View
            style={[
              {
                flex: 10,
                paddingVertical: 14,
                justifyContent: 'center',
              },
            ]}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={messageTextStyle}>
              {message}
            </Text>
          </View>
          {confirmText ? (
            <View style={[{flex: 3, paddingLeft: 24}]}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  onConfirm && onConfirm();
                  this.hideSnackBar();
                }}
                style={{flex: 1}}>
                <View
                  style={[
                    {
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <Text style={buttonTextStyle}>
                    {confirmText.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </Animated.View>
      );
    } else {
      return <View />;
    }
  }
}
