import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import styles from '../../Themes/styles';
import CallApi from '../../utils/callApi';
import config from '../../Config/config';

function Timer({
  onRefresh = () => {},
  data = {},
  isExpired = () => {},
  maxLimit,
  setLimit = () => {},
  closeTimer,
}) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [minutes, setMinutes] = useState(3);
  const [disable, setDisable] = useState(false);
  const [message, setMessage] = useState('OTP Expires in ');
  const [ref, setTimerReference] = useState(null);
  useEffect(() => {
    if (timeLeft == 0) {
      if (minutes == 0) {
        if (maxLimit === 3) {
          setMessage('OTP expires in');
          isExpired(false);
          setDisable(false);
          setLimit();
        } else {
          isExpired(true);
        }
        return;
      }
      setTimeLeft(59);
      setMinutes(minutes - 1);
      return;
    }
    let timerRef = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    setTimerReference(timerRef);
    return () => clearInterval(timerRef);
  }, [timeLeft, minutes]);

  useEffect(() => {
    console.log('timer ref >>>>creted>>>', ref);
    if (closeTimer === true) {
      clearInterval(ref);
    }
  }, [closeTimer]);

  let CallService = () => {
    let headers = {
      'content-type': 'application/json',
      token: config.headerToken,
    };
    console.log('data for resed >>>', data);
    CallApi('put', 'auth/users/otp/resend', data, headers)
      .then(res => {
        console.log('response for resend otp>>>', res.data);
      })
      .catch(error => {
        console.log('Error for resend otp', error.response.data);
      });
  };

  let resendOTP = () => {
    CallService();
    onRefresh();
    setMinutes(3);
    setTimeLeft(0);
  };
  let extendsTime = () => {
    setMessage('You have exceed the limit, please wait for ');
    isExpired(true);
    setDisable(true);
    setMinutes(15);
    setTimeLeft(0);
  };
  console.log('timer is running');
  return (
    <>
      <View style={{marginTop: 29, alignItems: 'center'}}>
        <Text style={styles.text_12}>
          {message}
          {minutes}:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 14,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.text}>Didn’t receive OTP?</Text>
        <TouchableOpacity
          style={{
            marginLeft: 8,
            alignItems: 'center',
          }}
          disabled={disable}
          onPress={maxLimit === 3 ? () => extendsTime() : () => resendOTP()}>
          <Text style={styles.colorsText}>Resend OTP Code</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const mapStateToProps = state => {
  return {userInfo: state.User};
};
export default connect(mapStateToProps)(Timer);
