'use strict';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  AsyncStorage
} from 'react-native';
var ImagePicker = require('react-native-image-picker');
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
var CustomTabBar = require('./CustomTabBar');
import PoplarEnv from '../util/PoplarEnv';
import Md5 from '../util/Md5';
import Secret from '../util/Secret';
import {getToken} from '../util/Secret';
import {Auth,ImgOps,Conf,Rs,Rpc} from 'react-native-qiniu';
import FeedCell from './FeedCell';
import {getFeedsOfUser, refresh, load} from '../api/FeedAPI';
import {getUserInfo} from '../util/Secret';
import URLConf from '../api/URLConf';
import Followings from './Followings';
import Followers from './Followers';
import FeedList from './FeedList';
const avatar_thumbnail = '?imageView2/1/w/100/h/100';
const windowWidth = Dimensions.get('window').width;
const CHANGE_AVATAR_URL = URLConf.API_HOST + '/user/replace/avatar/';

export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      userId: 0,
      userName: '',
      avatar: null,
      feeds:[],
      feedId: 0,
    };
  }

  componentDidMount() {
    getUserInfo((user) => {
      this.setState({userName:user.userName, avatar: user.avatar, userId: user.userId});
      getFeedsOfUser(user.userId, this.state.feeds, this.state.feedId, 10, (result, feeds, noMore) => {
        console.log('result:'+result+' hasnoMore:'+noMore+ ' userFeeds'+feeds);
        if(result) {
          if(!noMore) {
            this.setState({
              feeds: feeds,
              feedId: feeds[feeds.length-1].id,
            });
          } else {
          }

        }
      });
    });
  }

  genId(){
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0,
         v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
     }).toUpperCase();
  }

  upload() {
    //set your key
    Conf.ACCESS_KEY = URLConf.ACCESS_KEY;
    Conf.SECRET_KEY = URLConf.SECRET_KEY;

    var putPolicy = new Auth.PutPolicy2(
        {scope: URLConf.IMG_BUCKET}
    );
    var uptoken = putPolicy.token();
    console.log('[INFO] uptoken:' + uptoken);
    var id = this.genId()
    let key = id + '.jpg';
    console.log('[INFO] img to upload:'+key);
    let formData = {
      key: key,
    };

    Rpc.uploadFile(this.state.avatarSource.uri, uptoken, formData)
       .then((responseData) => {
         if(responseData.status == 200) {
           console.log('[RTN] upload success');
           this.setState({
             avatar: key,
           });
           getToken((token) => {
             //update database
             var url = CHANGE_AVATAR_URL + id;
             var sign = Md5.hex_md5(url.replace(URLConf.APP_SERVER_HOST, '') + '?ts=123456&'+Secret.secret);
             console.log('[INFO] sign for' + url + ' ' + sign);
             url = url+'?ts=123456&sign=' + sign;
             var options = {
               method: 'GET',
               headers: {
                 //'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'X-Auth-Token': token,
               },
             };
             console.log('[GET] ' + url);
             fetch(url, options).then((resp) => resp.json())
               .then((respData) => {
                 var retCode = respData.errno;
                 if(retCode == PoplarEnv.dic.SUCCESS_AVATAR_CHANGE) {
                   console.log('[RTN] update avatar success');
                   //update localstorage
                   console.log('[INFO] refresh local storage<avatar>:'+key);
                   AsyncStorage.setItem('avatar', key);
                 }
               }).done();
           });
         }
       });
  }

  selectPhotoTapped() {
     const options = {
       title: null,
       takePhotoButtonTitle: null,
       chooseFromLibraryButtonTitle: '从相册选择',
       quality: 1.0,
       maxWidth: 500,
       maxHeight: 500,
       storageOptions: {
         skipBackup: true
       }
     };

     ImagePicker.showImagePicker(options, (response) => {
       console.log('Response = ', response);

       if (response.didCancel) {
         console.log('User cancelled photo picker');
       }
       else if (response.error) {
         console.log('ImagePicker Error: ', response.error);
       }
       else if (response.customButton) {
         console.log('User tapped custom button: ', response.customButton);
       }
       else {
         var source;

         // You can display the image using either:
         //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

         //Or:
         if (Platform.OS === 'android') {
           source = {uri: response.uri, isStatic: true};
         } else {
           source = {uri: response.uri.replace('file://', ''), isStatic: true};
         }

         this.setState({
           avatarSource: source
         }, () => this.upload());
       }
     });
   }

  renderAvatar() {
    return (
      <TouchableOpacity onPress={()=>this.selectPhotoTapped()}>
          <Image source={{uri:URLConf.IMG_BASE_URL + this.state.avatar + avatar_thumbnail}} style={styles.avatar}/>
      </TouchableOpacity>
    );
  }

  header() {
    return (
      <View style={styles.minecard}>
        <View>
          <Image resizeMode='cover' style={styles.background} source={require('../imgs/tag1.jpg')} />
          {this.renderAvatar()}
        </View>
        <View style={styles.metas}>
          <View style={styles.desc}>
            <Text style={styles.name}>{this.state.userName}</Text>
            <Text style={styles.motto}>你好吗? 我很好</Text>
            {/* <FollowBtn/> */}
          </View>
          <ScrollableTabView
                 initialPage={2}
                 renderTabBar={() => <CustomTabBar/>}>
                 <Followings tabLabel='12 关注'/>
                 <Followers tabLabel='56 粉丝' />
                 <FeedList tabLabel='108 状态' caller={'user'} uid={this.state.userId} />
          </ScrollableTabView>
        </View>
      </View>
    );
  }


  render() {
    return(
      <FlatList
        style={styles.container}
        ListHeaderComponent={()=>this.header()}
      />
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listView: {
    //marginTop: 65,
    backgroundColor: 'white',
  },
  minecard: {
    position: 'relative',
  },
  background: {
    height: 180,
    width:windowWidth,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    position: 'absolute',
    bottom: -20,
    left: windowWidth/2 - 40,
    borderColor: 'white',
    borderWidth: 2,
  },
  desc: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#F3F3F3',
    paddingBottom: 10,
  },
  motto:{
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    fontSize: 15,
    //lineHeight: 14,
    color: '#9B9B9B',
  },
  name: {
    marginTop: 30,
    alignSelf: 'center',
    fontSize: 17,
    lineHeight: 18,
  },
  myfeedsList: {

  },
});
