import { create } from 'apisauce';
import AppConfig from './Appconfig.json';
import { SERVER_NAME }  from './ServerUtil.js';
const apiUrls = AppConfig.TEST_API_URLS;

const api = create({
  baseURL: `${SERVER_NAME}${apiUrls.API_BASE_STATUS}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  //after 10 secons
  timeout: 15000,
});

export const testEndpointAPI = apiStatus => new Promise((resolve, reject) => {
  api
    .post(`/${apiStatus}`, null, {})
    .then((response) => {
      console.log()
      resolve(response);
    })
    .catch((error) => {
      resolve('error');
      reject(error);
    });
});
