
import URLConf from './URLConf';
import Secret from '../util/Secret';
import Md5 from '../util/Md5';
import {getToken} from '../util/Secret';
import PoplarEnv from '../util/PoplarEnv';

const TAG_FEED_URL = URLConf.API_HOST + '/feed/with/tag/';

export function getTagFeedsOfPage(id, page, callback) {

  getToken((token) => {
    var sign = Md5.hex_md5(TAG_FEED_URL.replace(URLConf.APP_SERVER_HOST, '') + id + '/page/' + page + '?ts=123456&'+Secret.secret);
    console.log('sign:' + sign);
    var url = TAG_FEED_URL + id + '/page/' + page  +'?ts=123456&sign=' + sign;
    var headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': token,
    }};
    console.log('[GET] ' + url);
    fetch(url, headers)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('[RTN] ' + responseData);
        callback(true, responseData.data.feeds);
      })
      .done();
  });
}

export function isInterest(id, callback) {
  getToken((token)=>{
    if(!token) {
      //not login
      callback(false, 'not logged in');
      return ;
    }

    var path =  URLConf.API_HOST + '/action/is/interested/in/tag/' + id;
    var sign = Md5.hex_md5(path.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+Secret.secret);
    console.log('sign:' + sign);
    var url = path+'?ts=123456&sign=' + sign;
    var options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token':token,
      },
    };

    console.log('[GET] ' + url);
    fetch(url, options)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('[RTN] ' + responseData);
        if(responseData.errno == PoplarEnv.dic.SUCCESS) {
          if(responseData.data.is_interest) {
            callback(true, 'followed');
          }
        } else {
          callback(false, 'not follow');
        }
      })
      .done();


  });
}
