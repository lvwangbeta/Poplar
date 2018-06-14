
import URLConf from './URLConf';
import Secret from '../util/Secret';
import Md5 from '../util/Md5';
import PoplarEnv from '../util/PoplarEnv';
import {getToken} from '../util/Secret';

const COMMENT_URL = URLConf.API_HOST + '/comment/';
const COMMENT_CREATE_URL = COMMENT_URL + '/create';

export function getCommentsOfObject(objectType, objectID, limit, callback) {

  getToken((token) => {
    var sign = Md5.hex_md5(COMMENT_URL.replace(URLConf.APP_SERVER_HOST, '')+objectType+'/'+objectID+'?ts=123456&'+Secret.secret);
    console.log('sign:' + sign);
    var url = COMMENT_URL+objectType+'/'+objectID+'?ts=123456&sign=' + sign;
    console.log('get comment url : ' + url);
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
        if(responseData.errno == PoplarEnv.dic.SUCCESS) {
          callback(true, responseData.data.comments.slice(0, limit));
        }
      })
      .done();
  });
}

export function reply(objectType, objectID, content, commentParent, callback) {

  getToken((token) => {
    var sign = Md5.hex_md5(COMMENT_CREATE_URL.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+Secret.secret);
    console.log('sign:' + sign);
    var url = COMMENT_CREATE_URL+'?ts=123456&sign=' + sign;
    var options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token':token,
      },
      body: JSON.stringify({
        comment_object_type: objectType,
        comment_object_id: objectID,
        comment_content: content,
        comment_parent: commentParent
      })
    };

    fetch(url, options).then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if(responseData.errno == PoplarEnv.dic.SUCCESS_COMMENT_CREATE) {
          var comment = responseData.data.comment;
          comment.comment_content = content;
          callback(comment);
        }

      }).done();
  });


}
