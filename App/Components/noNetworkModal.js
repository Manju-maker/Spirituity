import React, {Component} from 'react';
import NetInfo from '@react-native-community/netinfo';

class NoNetworkModal extends Component {
  constructor() {
    super();
    this.state = {isConnected: true};
  }
  componentWillMount() {
    console.log('did mount');
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({isConnected: state.isConnected});
    });
  }

  componentWillReceiveProps(nextprops) {
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
