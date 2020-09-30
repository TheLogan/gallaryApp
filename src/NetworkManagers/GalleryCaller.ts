import Axios, {AxiosRequestConfig} from 'axios';

export async function sendRequest() {
  try {
    let cfg: AxiosRequestConfig = {
      baseURL: 'http://192.168.0.184:3003/gallery',
      method: 'POST',
      data: {hello: 'world'},
    };
    let response = await Axios(cfg);
    if (response.status > 199 && response.status < 299) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
