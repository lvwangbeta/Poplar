
import URLConf from './URLConf';
import Secret from '../util/Secret';
import Md5 from '../util/Md5';
import PoplarEnv from '../util/PoplarEnv';
import {getToken} from '../util/Secret';

const FEED_URL = URLConf.API_HOST + '/feed/';
const NEW_FEED_URL = FEED_URL + 'new';
const PAGE_SIZE = 10;

export function getMyFeeds(that) {
  var sign = Md5.hex_md5(FEED_URL.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+Secret.secret);
  console.log('sign:' + sign);
  var url = FEED_URL+'?ts=123456&sign=' + sign;
  var headers = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token':that.props.token,
  }};

  fetch(url, headers)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      var feeds = responseData.feeds;
      that.setState({
        feedId: feeds[feeds.length-1].id,
        feeds: responseData.feeds,
        dataSource: that.state.dataSource.cloneWithRows(responseData.feeds),
        loaded: true,
        page: that.state.page+1,
      });
    })
    .done();
}

export function getFeedsOfUser(uid, feeds, page, start, callback) {

  getToken((token) => {
    console.log('[INFO] uid:'+uid + ' callback:'+callback);
    var path = FEED_URL+'of/user/'+uid+'/page/'+ page + '/startfrom/'+start;
    var sign = Md5.hex_md5(path.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+Secret.secret);
    var url = path+'?ts=123456&sign=' + sign;
    var headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token':token,
    }};
    console.log('[GET] ' + url);
    fetch(url, headers)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('[RTN] '+responseData);
        if(responseData.errno == PoplarEnv.dic.SUCCESS_FEED_LOAD) {
          var noMore = false;
          var loadedFeeds = responseData.data.feeds;
          if(loadedFeeds.length == 0) {
            //that.setState({noMore: true});
            noMore = true;
          }
          for(var i=0; i < loadedFeeds.length; i++) {
            feeds.push(loadedFeeds[i]);
          }
          console.log('[INFO] feeds' + feeds);
          callback(true, feeds, noMore);
        } else {
          callback(false, feeds, true);
        }

      })
      .done();
  });
}

/**
* id 上送的当前第一个feed id作为上次刷新位置
*/
export function refresh(id, callback) {
  getToken((token) => {
    var path = FEED_URL+'page/1/startfrom/0';
    var sign = Md5.hex_md5(path.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+Secret.secret);
    console.log('sign:' + sign);
    var url = path+'?ts=123456&sign=' + sign;
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
        console.log(responseData);
        callback(true, responseData.feeds);
      })
      .done();
  });
}

/**
* 下滑持续加载
* id 当前最后一条feed
*/
export function load(id, feeds, page, callback) {

  console.log('call back fun: ' +callback);
  getToken((token) => {
    var path = FEED_URL+'page/'+page+'/startfrom/'+(id+1);
    var sign = Md5.hex_md5(path.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+Secret.secret);
    console.log('sign:' + sign);
    var url = path+'?ts=123456&sign=' + sign;
    var headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token':token,
    }};
    console.log('[GET] ' + url);
    fetch(url, headers)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('[RTN] '+responseData);
        var loadedFeeds = responseData.feeds;
        var noMore = false;
        if(loadedFeeds.length == 0) {
          noMore = true;
        }
        for(var i=0; i < loadedFeeds.length; i++) {
          feeds.push(loadedFeeds[i]);
        }
        callback(true, feeds, noMore);
      })
      .done();
  });
}


export function newFeed(text, photos, tags, callback) {
  getToken((token) => {
    var sign = Md5.hex_md5(NEW_FEED_URL.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+Secret.secret);
    var url = NEW_FEED_URL+'?ts=123456&sign=' + sign;
    var options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token':token,
      },
      body: encodeURI(JSON.stringify({album_desc: text, photos: photos, tags: tags}), 'utf-8')
    };
    console.log('[POST] ' + url);
    fetch(url, options).then((response) => response.json())
      .then((responseData) => {
        if(responseData.errno == PoplarEnv.dic.SUCCESS_ALBUM_CREATE) {
          console.log('[RTN] ' + responseData);
          callback(true, responseData.data.album.id);
        }
      }).done();
  });

}
