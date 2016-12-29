
import URLConf from './URLConf';
import Secret from '../util/Secret';
import {getToken} from '../util/Secret';
import Md5 from '../util/Md5';

const LIKE_URL = URLConf.API_HOST + '/action/like/do';
const UNDO_LIKE_URL = URLConf.API_HOST + '/action/like/undo';

const FOLLOW_URL = URLConf.API_HOST + '/action/follow/do';
const UNDO_FOLLOW_URL = URLConf.API_HOST + '/action/follow/undo';


export function like(author, objectType, objectId, callback) {
  return getToken((token)=>{
    console.log('like token: ' + token);
    if(!token) {
      //not login
      return false;
    }

    return true;

  });
}

export function undoLike() {

}

export function follow() {

}

export function undoFollow() {

}

export function followTag() {

}

export function undoFollowTag() {

}
