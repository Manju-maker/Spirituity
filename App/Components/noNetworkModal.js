import React, {useState, useEffect, Component} from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import styles from '../Themes/styles';
import RNExitApp from 'react-native-exit-app';
import {colors} from '../Themes/colors';
import Snackbar from './snackbar';

// const NoNetworkModal = () => {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     unsubscribe = NetInfo.addEventListener(state => {
//       console.log('state>>>>', state);
//       if (state.isConnected === false) {
//         Snackbar({
//           message: 'Network not connected',
//           ok: true,
//           height: 50,
//         });
//       }
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return <></>;
// };

class NoNetworkModal extends Component {
  constructor() {
    super();
    this.state = {isConnected: true};
  }
  componentWillMount() {
    console.log('did mount');
    this.unsubscribe = NetInfo.addEventListener(state => {
      console.warn('state>>>>', state);
      this.setState({isConnected: state.isConnected});
    });
  }

  componentWillReceiveProps(nextprops) {
    console.warn('prev propsss>>>>>>>>>>>>>>>>', this.props);
    console.warn('next props>>>>>>>>>>>>>>>>>>>>>', nextprops);
    if (this.props != nextprops) {
    }
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return <></>;
  }
}

export default NoNetworkModal;
