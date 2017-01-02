'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    ListView,
    TouchableOpacity
} from 'react-native';

import FollowBtn from './actions/Follow';
import FeedDetail from './FeedDetail';
import TagDetail from './TagDetail';
import FeedCell from './FeedCell';
import {getFeedsOfUser} from '../api/FeedAPI';
import URLConf from '../api/URLConf';

const IMAGE_BASE_URL = URLConf.IMG_BASE_URL;
const avatar_thumbnail = '?imageView2/1/w/100/h/100';
const windowWidth = Dimensions.get('window').width;

var HomePage = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      feeds: [],
      isLoadingMore: false,
      noMore: false,
      page: 1,
      feedId: 0,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    //getFeedsOfUser(23, this.state.feedId, this.state.page, this);
    getFeedsOfUser(this.props.userId, this.state.feeds, this.state.feedId, 10, (result, feeds, noMore) => {
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
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>

      </View>

    );
  },

  renderFeed: function(feed) {
    return(
      <FeedCell
        onSelect={() => this.props.selectFeed(feed, false)}
        feed={feed}
        navigator={this.props.navigator}
        push2FeedDetail={() => this.props.selectFeed(feed, false)}
        nav2TagDetail={this.props.nav2TagDetail}
        refresh={this.props.refresh}
      />
    );
  },

  renderHeader: function() {
    return (
        <View style={styles.card}>
          <TouchableOpacity onPress={() => this.props.navigator.pop()} style={{position: 'absolute', top: 30, left: 20, zIndex: 10}}>
            <Image
              source={require('../imgs/back.png')}
              style={{ width: 18, height: 18}}/>
          </TouchableOpacity>
          <View>
            <Image resizeMode='cover' style={styles.background} source={require('../imgs/tag1.jpg')} />
            <Image style={styles.avatar} source={{uri: IMAGE_BASE_URL + this.props.avatar + avatar_thumbnail}} />
          </View>
          <View style={styles.metas}>
            <View style={styles.desc}>
              <Text style={styles.name}>{this.props.userName}</Text>
              <Text style={styles.motto}>Time to do it</Text>
              <FollowBtn refresh={this.props.refresh} uid={this.props.userId}/>
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

  renderFeedList: function() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader}
          renderRow={this.renderFeed}
          renderFooter={this.renderFooter}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0}
          refresh={this.props.refresh}
        />
    );
  },

  onEndReached: function() {
    if(this.state.noMore || this.state.isLoadingMore) return;
    console.log('is loading more..');
    var page = this.state.page+1;
    this.setState({isLoadingMore: true, page: this.state.page+1}, getFeedsOfUser(this.props.userId, this.state.feeds, this.state.feedId, 10, (result, feeds, noMore) => {
          if(result) {
            if(!noMore) {
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(feeds),
                isLoadingMore: false,
                loaded: true,
                feedId: feeds[feeds.length-1].id,
                noMore: noMore
              });
            } else {
              this.setState({
                isLoadingMore: false,
                loaded: true,
                noMore: true,
              });
            }

          }
        }));
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
          <Text style={{color: '#adadad'}}>没有更多了</Text>
        </View>
      );
    }
  },

  render: function() {

    return (
      <View style={styles.myfeedsList}>
        {this.renderFeedList()}
      </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    flex:1,
    backgroundColor: 'white',
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
  },
});

module.exports = HomePage;
