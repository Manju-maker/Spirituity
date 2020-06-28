import config from '../Config/config';
import {isEmpty} from 'lodash';
import axios from 'axios';

const CallApi = (
  method,
  url,
  data,
  headers = {
    'content-type': 'application/json',
    Accept: 'application/json',
  },
) => {
  return new Promise((resolve, reject) => {
    if (method === 'get' && !isEmpty(data)) {
      let queryParams = encodeURI(JSON.stringify(data));
      url = `${config.serverURL}${url}?params=${queryParams}`;
    } else {
      url = `${config.serverURL}${url}`;
    }
    let options = {
      method,
      url,
      data,
      headers,
    };
    console.log('confiddd', options);

    if (method === 'get') delete options['data'];

    axios({...options})
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.log('errr of axios', error);
        reject(error);
      });
  });
};

export default CallApi;
