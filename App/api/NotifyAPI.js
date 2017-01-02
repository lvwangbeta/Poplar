
import URLConf from './URLConf';
import Secret from '../util/Secret';
import Md5 from '../util/Md5';
import {getToken} from '../util/Secret';
import PoplarEnv from '../util/PoplarEnv';

const NOTIFY_URL = URLConf.API_HOST + '/notify/all';

export function getNotifications(callback) {
  getToken((token) => {
    var sign = Md5.hex_md5(NOTIFY_URL.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+Secret.secret);
    console.log('sign:' + sign);
    var url = NOTIFY_URL+'?ts=123456&sign=' + sign;
    var headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': token,
    }};

    fetch(url, headers)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if(responseData.status = PoplarEnv.dic.SUCCESS) {
          callback(true, responseData.notifications);
        } else {
          callback(false, '');
        }

      })
      .done();
  });

}
