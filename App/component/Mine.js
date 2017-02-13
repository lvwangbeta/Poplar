import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    ListView,
    Platform
} from 'react-native';

import PoplarEnv from '../util/PoplarEnv';
import FollowBtn from './actions/Follow';
import FeedCell from './FeedCell';
import FeedDetail from './FeedDetail';
import BlankTemplate from './BlankTemplate';
import {Auth,ImgOps,Conf,Rs,Rpc} from 'react-native-qiniu';
import {getFeedsOfUser, refresh, load} from '../api/FeedAPI';
import {getUserInfo} from '../util/Secret';
import URLConf from '../api/URLConf';

import ImagePicker from 'react-native-image-picker';

const windowWidth = Dimensions.get('window').width;
const avatar_thumbnail = '?imageView2/1/w/100/h/100';

var Mine = React.createClass({

  getInitialState: function(){
      return {
        avatarSource: null,
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        page: 1,
        feedId: 0,
        feeds:[],
        noMore: false,
        loaded: false,
        isRefreshing: false,
        isLoadingMore: false,
        userName: '',
        avatar: null,        
      };
  },

  componentWillMount: function() {
    getUserInfo((user) => {
      this.setState({userId: user.userId, userName:user.userName, avatar: user.avatar});
    });
  },

  componentDidMount: function() {
    this.fetchData();
  },

  updateFeedList: function(result, feeds, noMore) {
    if(result) {
      if(!noMore) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feeds),
          isRefreshing: false,
          isLoadingMore: false,
          loaded: true,
          page: this.state.page+1,
          feedId: feeds != null&&feeds.length != 0 ? feeds[feeds.length-1].id: 0,
        });
      } else {
        this.setState({
          isLoadingMore: false,
          loaded: true,
          noMore: true,
        });
      }
    }
  },

  updateList: function() {
    getUserInfo((user) => {
      getFeedsOfUser(user.userId, this.state.feeds, this.state.feedId, 10, (result, feeds, noMore) => {
        if(result) {
          if(!noMore) {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(feeds),
              isLoadingMore: false,
              loaded: true,
              feedId: feeds[feeds.length-1].id,
            });
          } else {
            this.setState({
              isLoadingMore: false,
              loaded: true,
              noMore: true,
            });
          }

        }
      });
    });
  },

  fetchData: function() {
    //getMyFeeds(this);
    // load(0, this.state.feeds, this.state.page, (result, feeds, noMore) => {this.updateFeedList(result, feeds, noMore)});
    this.updateList();
  },

  upload: function() {

    //set your key
    //Conf.ACCESS_KEY = <AK>;
    //Conf.SECRET_KEY = <SK>;

    var putPolicy = new Auth.PutPolicy2(
        {scope: "osfimgs2"}
    );
    var uptoken = putPolicy.token();

    let formData = new FormData();
    formData.append('file', {uri: this.state.avatarSource.uri, type: 'application/octet-stream', name: 'avatar_demo'});
    formData.append('key', 'avatar_demo');
    formData.append('token', uptoken);

    Rpc.uploadFile(this.state.avatarSource.uri, uptoken, formData).then((response) => response.json()).then((responseData) => {
      console.log(responseData.hash);
    });
  },


  selectPhotoTapped: function() {
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
  },

  selectFeed: function(feed, avatarCanClick=false) {
    //this.props.hideTabBar();
    let navigator = this.props.navigator;
    this.props.navigator.push({
      title: '正文',
      component: FeedDetail,
      params: {token:this.props.token, navigator, feed, nav2TagDetail:this.nav2TagDetail, avatarCanClick:avatarCanClick}
    });
  },

  pressAvatar: function(feed) {
    return ;
  },

  onEndReached: function() {
    if(this.state.noMore || this.state.isLoadingMore || this.state.feedId == 0) return;
    this.setState({isLoadingMore: true}, this.updateList());
  },

  renderFooter: function() {
    if(this.state.isLoadingMore) {
      return (
        <View style={styles.footer}>
          <Text>正在加载...</Text>
        </View>

      );
    } else if(this.state.noMore){
      return(
        <View style={styles.footer}>
          <Text>没有更多了</Text>
        </View>
      );
    }
  },

  renderFeed: function(feed) {
    return(
      <FeedCell
        navigator={this.props.navigator}
        onSelect={() => this.selectFeed(feed)}
        feed={feed}
        page={this.state.page}
        token={this.props.token}
        pressAvatar={() =>this.pressAvatar(feed)}
        push2FeedDetail={() => this.selectFeed(feed)}
        nav2TagDetail={this.nav2TagDetail}
      />
    );
  },

  renderAvatar: function() {
    return (
      <TouchableOpacity onPress={this.selectPhotoTapped}>
          <Image source={{uri:URLConf.IMG_BASE_URL + this.state.avatar + avatar_thumbnail}} style={styles.avatar}/>
      </TouchableOpacity>
    );
  },

  renderHeader: function() {
    return (
          <View style={styles.card}>
            <View>
              <Image resizeMode='cover' style={styles.background} source={require('../imgs/tag1.jpg')} />
              {this.renderAvatar()}
            </View>
            <View style={styles.metas}>
              <View style={styles.desc}>
                <Text style={styles.name}>{this.state.userName}</Text>
                <Text style={styles.motto}>Time to do it</Text>
                {/* <FollowBtn/> */}
              </View>
              <View
                style={{flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomWidth: 1,
                        borderBottomColor: '#F3F3F3',
                        marginTop: 10,
                        paddingBottom: 10,}}>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}><Text>12</Text><Text>关注</Text></View>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}><Text>56</Text><Text>粉丝</Text></View>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}><Text>108</Text><Text>状态</Text></View>
              </View>
            </View>
          </View>
      );
  },

  renderLoadingView: function() {
    return (
      <BlankTemplate/>

    );
  },

  render: function() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View>
        <ListView
          isComment={this.state.isComment}
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader}
          renderRow={this.renderFeed}
          renderFooter={this.renderFooter}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0}
          style={styles.listView}
        />
      </View>

    );

      // return (
      //   <ScrollView style={styles.container}>
      //     <View style={styles.card}>
      //       <View>
      //         <Image resizeMode='cover' style={styles.background} source={require('./imgs/tag1.jpg')} />
      //         <TouchableOpacity onPress={this.selectPhotoTapped}>
      //           {this.state.avatarSource === null ?
      //             <Image style={styles.avatar} source={require('./imgs/tag2.jpg')} />:
      //             <Image style={styles.avatar} source={this.state.avatarSource} />}
      //         </TouchableOpacity>
      //       </View>
      //       <View style={styles.metas}>
      //         <View style={styles.desc}>
      //           <Text style={styles.name}>断鸿</Text>
      //           <Text style={styles.motto}>Time to do it</Text>
      //           {/* <FollowBtn/> */}
      //         </View>
      //         <View
      //           style={{flex: 1,
      //                   flexDirection: 'row',
      //                   justifyContent: 'space-between',
      //                   borderBottomWidth: 1,
      //                   borderBottomColor: '#F3F3F3',
      //                   marginTop: 10,
      //                   paddingBottom: 10,}}>
      //           <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}><Text>12</Text><Text>关注</Text></View>
      //           <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}><Text>56</Text><Text>粉丝</Text></View>
      //           <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}><Text>108</Text><Text>状态</Text></View>
      //         </View>
      //       </View>
      //     </View>
      //     <View style={styles.myfeedsList}>
      //       <FeedList
      //         {...this.props}
      //       />
      //
      //     </View>
      //   </ScrollView>
      // );


  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listView: {
    //marginTop: 65,
    backgroundColor: 'white',
  },
  card: {
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
    lineHeight: 14,
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
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  footer: {
    width:windowWidth,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = Mine;
