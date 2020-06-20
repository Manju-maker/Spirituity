import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import styles from '../../Themes/styles';
import {resendOtp} from '../../Store/actions/userAction';
import Store from '../../Store';
import CallApi from '../../utils/callApi';
// import {} from '../../Store/actions/userAction';

function Timer({
  onRefresh = () => {},
  refreshFocus = () => {},
  data = {},
  isExpired = () => {},
  maxLimit,
  setLimit = () => {},
  userInfo,
}) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [minutes, setMinutes] = useState(3);
  const [disable, setDisable] = useState(false);
  const [message, setMessage] = useState('OTP Expires in ');
  useEffect(() => {
    if (timeLeft == 0) {
      if (minutes == 0) {
        if (maxLimit === 4) {
          setMessage('OTP Expires in');
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
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, minutes]);

  let CallService = () => {
    let headers = {
      'content-type': 'application/json',
      token: 'jj2njndejn1oi3ien3ndono11inn3nfy8r7',
    };
    console.log('data for resed >>>', data);
    CallApi('put', 'users/otp/resend', data, headers)
      .then(res => {
        console.log('response for resend otp>>>', res.data);
      })
      .catch(error => {
        console.log('Error for resend otp', error.response.data);
      });
  };

  let resendOTP = () => {
    // Store.dispatch(resendOtp(data));
    CallService();
    onRefresh();
    refreshFocus();
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
          onPress={maxLimit === 4 ? () => extendsTime() : () => resendOTP()}>
          <Text style={styles.colorsText}>Resend OTP Code</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const mapStateToProps = state => {
  return {userInfo: state.reducer};
};
export default connect(mapStateToProps)(Timer);
