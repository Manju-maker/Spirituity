import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppContainer from '../App/Navigators/appContainer';
import {Provider} from 'react-redux';
import Store from './Store/index';
import Snackbar from './Components/snackbar';
import ConfimationModal from './Components/ConfimationModal';

export default function App() {
  useEffect(() => {
    setInterval(() => {
      SplashScreen.hide();
    }, 500);
  }, []);
  return (
    <Provider store={Store}>
      <Snackbar />
      <AppContainer />
      <ConfimationModal />
    </Provider>
  );
}
