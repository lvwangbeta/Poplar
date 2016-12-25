
import URLConf from './URLConf';
import Secret from '../util/Secret';
import Md5 from '../util/Md5';

const FEED_URL = URLConf.API_HOST + '/timeline/';
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
      });
    })
    .done();
}

export function getFeedsOfUser(uid, feedId, page, that) {
  var path = FEED_URL+'user/'+uid+'/page/'+page+'/startfrom/'+feedId;
  var sign = Md5.hex_md5(path.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+Secret.secret);
  console.log('sign:' + sign);
  var url = path+'?ts=123456&sign=' + sign;
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
      var loadedFeeds = responseData.feeds;
      if(loadedFeeds.length < PAGE_SIZE) {
        that.setState({noMore: true});
      }

      var feeds = that.state.feeds;
      for(var i=0; i < loadedFeeds.length; i++) {
        feeds.push(loadedFeeds[i]);
      }
      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(feeds),
        isLoadingMore: false,
        loaded: true,
        feedId: feeds[feeds.length-1].id,
      });
    })
    .done();
}

/**
* id 上送的当前第一个feed id作为上次刷新位置
*/
export function refresh(id, that) {
  FEED_URL = FEED_URL+id;
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
      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(responseData.feeds),
        isRefreshing: false,
        loaded: true,
        noMore: false,
        page: 1,
        feeds: responseData.feeds,
        feedId: 0,
      });
    })
    .done();
}

/**
* 下滑持续加载
* id 当前最后一条feed
*/
export function load(id, page, that) {
  var path = FEED_URL+'page/'+page+'/startfrom/'+id;
  var sign = Md5.hex_md5(path.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+Secret.secret);
  console.log('sign:' + sign);
  var url = path+'?ts=123456&sign=' + sign;
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
      var loadedFeeds = responseData.feeds;
      if(loadedFeeds.length < PAGE_SIZE) {
        that.setState({noMore: true});
      }

      var feeds = that.state.feeds;
      for(var i=0; i < loadedFeeds.length; i++) {
        feeds.push(loadedFeeds[i]);
      }
      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(feeds),
        isRefreshing: false,
        isLoadingMore: false,
        loaded: true,
        feedId: feeds[feeds.length-1].id,
      });
    })
    .done();
}


export function newFeed(text, photos, tags, token) {
  var sign = Md5.hex_md5(NEW_FEED_URL.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+Secret.secret);
  console.log('sign:' + sign);
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
  fetch(url, options).then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
    }).done();
}
