import React from 'react';
import {GoogleSignin} from 'react-native-google-signin';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId:
    '272701560663-ce31l6rahu7667p4htmkp5run62pfs6a.apps.googleusercontent.com',
  offlineAccess: true,
  hostedDomain: '',
  loginHint: '',
  forceConsentPrompt: true,
  accountName: '',
});

function GoogleSignUp() {
  return new Promise((resolve, reject) => {
    GoogleSignin.hasPlayServices()
      .then(response => {
        GoogleSignin.signIn()
          .then(res => {
            console.log('Success google login>>>', res);
            resolve(res);
          })
          .catch(error => {
            console.log('Google login error>>>', error);
            reject(err);
          });
      })
      .catch(error => {
        console.log('Error while checkign play sercices', error);
        reject(err);
      });
    console.warn('googlelogin');
  });
}

export {GoogleSignUp};
