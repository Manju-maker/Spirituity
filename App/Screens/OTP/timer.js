import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from '../../Themes/styles';
import CallApi from '../../utils/callApi';

function Timer({
  onRefresh = () => {},
  refreshFocus = () => {},
  data = {},
  isExpired = () => {},
}) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [minutes, setMinutes] = useState(3);
  useEffect(() => {
    if (timeLeft == 0) {
      if (minutes == 0) {
        isExpired(true);
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

  let resendOTP = () => {
    let headers = {
      'content-type': 'application/json',
      token: 'jj2njndejn1oi3ien3ndono11inn3nfy8r7',
    };

    CallApi('put', 'users/otp/resend', data, headers)
      .then(res => {
        console.log('response of otp resend', res);
      })
      .catch(err => {
        console.log('errrrrrrrr>>>>>>>>', err);
      });
    onRefresh();
    refreshFocus();
    setMinutes(3);
    setTimeLeft(0);
  };

  return (
    <>
      <View style={{marginTop: 29, alignItems: 'center'}}>
        <Text style={styles.text_12}>
          OTP Expires in {minutes}:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 29,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={[styles.text]}>Didn’t receive OTP?</Text>
        <TouchableOpacity style={{marginLeft: 8}} onPress={() => resendOTP()}>
          <Text style={styles.colorsText}>Resend OTP Code</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
export default Timer;
