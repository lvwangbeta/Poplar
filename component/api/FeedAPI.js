
import URLConf from './URLConf';
import Secret from '../util/Secret';
import Md5 from '../util/Md5';

const FEED_URL = URLConf.API_HOST + '/timeline/';
const NEW_FEED_URL = FEED_URL + 'new';

export function getMyFeeds(that) {
  var sign = Md5.hex_md5(FEED_URL.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+Secret.secret);
  console.log('sign:' + sign);
  var url = FEED_URL+'?ts=123456&sign=' + sign;
  var headers = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token':Secret.token,
  }};

  fetch(url, headers)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(responseData.feeds),
        loaded: true,
      });
    })
    .done();
}


export function newFeed(text, photos, tags) {
  var sign = Md5.hex_md5(NEW_FEED_URL.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+Secret.secret);
  console.log('sign:' + sign);
  var url = NEW_FEED_URL+'?ts=123456&sign=' + sign;
  var options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token':Secret.token,
    },
    body: JSON.stringify({album_desc: text, photos: photos, tags: tags})
  };
  fetch(url, options).then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
    }).done();
}
