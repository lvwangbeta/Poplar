
import URLConf from './URLConf';
import Secret from '../util/Secret';
import {getToken} from '../util/Secret';
import Md5 from '../util/Md5';
import PoplarEnv from '../util/PoplarEnv';

export function like(author, objectType, objectId, callback) {
  //console.log('author:'+author + ' type:' + objectType+ ' id:'+objectId);
  getToken((token)=>{
    console.log('like token: ' + token);
    if(!token) {
      //not login
      callback(false, 'not logged in');
      return ;
    }

    var path =  URLConf.API_HOST + '/action/' +author + '/do/like/'+ objectType +'/' + objectId;
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

    fetch(url, options)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if(responseData.status == PoplarEnv.dic.SUCCESS_LIKE) {
            callback(true, 'success');
        } else {
          callback(false, 'error');
        }
      })
      .done();


  });
}

export function undoLike(objectType, objectId, callback) {
  getToken((token) => {
    console.log('undo like token: ' + token);
    if(!token) {
      //not login
      callback(false, 'not logged in');
      return;
    }

    var path =  URLConf.API_HOST + '/action/undo/like/'+ objectType +'/' + objectId;
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

    fetch(url, options)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if(responseData.status == PoplarEnv.dic.SUCCESS_LIKE_UNDO) {
            callback(true, 'success');
        } else {
          callback(false, 'error');
        }
      })
      .done();


  });
}

export function isFollow(anothor, callback) {
  getToken((token) => {
    if(!token) {
      callback(false);
      return;
    }


  var path =  URLConf.API_HOST + '/action/is/follow/'+ anothor;
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

  fetch(url, options)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      if(responseData.status == PoplarEnv.dic.SUCCESS) {
          callback(responseData.isfollow);
      } else {
        callback(false);
      }
    })
    .done();

  })
}

export function follow(id, callback) {
  getToken((token) => {
    console.log('follow token: ' + token);
    if(!token) {
      //not login
      callback(false, 'not logged in');
      return;
    }

    var path =  URLConf.API_HOST + '/action/do/follow/'+ id;
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

    fetch(url, options)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if(responseData.status == PoplarEnv.dic.SUCCESS_FOLLOW) {
            callback(true, 'success');
        } else {
          callback(false, 'error');
        }
      })
      .done();

  });
}

export function undoFollow(id, callback) {
  getToken((token) => {
    console.log('follow token: ' + token);
    if(!token) {
      //not login
      callback(false, 'not logged in');
      return;
    }

    var path =  URLConf.API_HOST + '/action/undo/follow/'+ id;
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

    fetch(url, options)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if(responseData.status == PoplarEnv.dic.SUCCESS_FOLLOW_UNDO) {
            callback(true, 'success');
        } else {
          callback(false, 'error');
        }
      })
      .done();

  });
}

export function followTag(tagId, callback) {
  getToken((token) => {
    console.log('follow tag token: ' + token);
    if(!token) {
      //not login
      callback(false, 'not logged in');
      return;
    }

    var path =  URLConf.API_HOST + '/action/do/followtag/'+ tagId;
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

    fetch(url, options)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if(responseData.status == PoplarEnv.dic.SUCCESS_INTEREST) {
            callback(true, 'success');
        } else {
          callback(false, 'error');
        }
      })
      .done();


  });
}

export function undoFollowTag(tagId, callback) {
  getToken((token) => {
    console.log('undo follow tag token: ' + token);
    if(!token) {
      //not login
      callback(false, 'not logged in');
      return;
    }

    var path =  URLConf.API_HOST + '/action/undo/followtag/'+ tagId;
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

    fetch(url, options)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if(responseData.status == PoplarEnv.dic.SUCCESS_INTEREST_UNDO) {
            callback(true, 'success');
        } else {
          callback(false, 'error');
        }
      })
      .done();

    });
}
