
import URLConf from './URLConf';
import Secret from '../util/Secret';
import Md5 from '../util/Md5';

const TAG_FEED_URL = URLConf.API_HOST + '/tag/';

export function getTagFeedsOfPage(id, page, that) {
  var sign = Md5.hex_md5(TAG_FEED_URL.replace(URLConf.APP_SERVER_HOST, '') + id + '/page/' + page + '?ts=123456&'+Secret.secret);
  console.log('sign:' + sign);
  var url = TAG_FEED_URL + id + '/page/' + page  +'?ts=123456&sign=' + sign;
  var headers = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': Secret.token,
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
