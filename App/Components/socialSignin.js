import {GoogleSignin} from 'react-native-google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest,
} from 'react-native-fbsdk';

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
  });
}

function FacebookSignUp() {
  return new Promise((resolve, reject) => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then(data => {
            const {accessToken} = data;

            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log('Error>>>>', error);
                reject(error);
              } else {
                console.log('result from face book>>>', result);
                resolve(result);
              }
            };
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,last_name,picture',
                  },
                },
              },
              responseInfoCallback,
            );

            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      },
    );
  });
}

export {GoogleSignUp, FacebookSignUp};
