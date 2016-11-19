'use strict';

import React from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Dimensions
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {getTagFeedsOfPage} from './api/TagAPI';
var TagFeedCell = require('../TagFeedCell');
var FeedDetail = require('../FeedDetail');
var TagFollow = require('./actions/TagFollow');

const windowWidth = Dimensions.get('window').width;

const PARALLAX_HEADER_HEIGHT = 220;
const STICKY_HEADER_HEIGHT = 70;

var TagFeeds = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function() {
    getTagFeedsOfPage(29, 1, this);
  },


  render: function() {
    const { onScroll = () => {} } = this.props;
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
        <View style={{flex: 1}}>
          <ListView
            ref="ListView"
            dataSource={this.state.dataSource}
            renderRow={this.renderFeed}
            style={styles.listView}
            renderScrollComponent=
            {
              props => (
                        <ParallaxScrollView
                          onScroll={onScroll}
                          backgroundColor="rgba(255,255,255,1)"
                          headerBackgroundColor="#333"
                          stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                          parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                          backgroundSpeed={10}

                          renderBackground={() => (
                            <View key="background">
                              <Image resizeMode='cover' style={styles.headerImg} source={require('../imgs/tag2.jpg')} />
                              <View style={{position: 'absolute',
                                            top: 0,
                                            width: windowWidth,
                                            backgroundColor: 'rgba(0,0,0,.4)',
                                            height: PARALLAX_HEADER_HEIGHT}}/>
                            </View>
                          )}

                          renderForeground={() => (
                            <View key="parallax-header" style={ styles.parallaxHeader }>
                              <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center',alignItems: 'center', position: 'absolute',left:20, bottom: 40, backgroundColor: 'rgba(0,0,0,0)',}}>
                                <Text style={{color: 'white', fontSize: 24, opacity: 0.9, marginRight: 10}}>#摄影</Text>
                              </View>
                            </View>
                          )}

                          renderStickyHeader={() => (
                            <View key="sticky-header" style={styles.stickySection}>
                              <Text style={styles.stickySectionText}>摄影</Text>
                            </View>
                          )}

                          renderFixedHeader={() => (
                            <View key="fixed-header" style={styles.fixedSection}>
                              <TagFollow />
                            </View>
                          )}


                          />
                        )
            }
          />
        </View>
    );
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
  selectFeed: function(feed: Object) {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        type: 'feed',
        component: FeedDetail,
        passProps: {feed:feed, secret:this.props.secret, token:this.props.token, nav2TagDetail: this.props.nav2TagDetail},
      });
    }
  },


  renderFeed: function(feed) {
    return(
      <TagFeedCell
        onSelect={() => this.selectFeed(feed)}
        feed={feed}
        secret={this.props.secret}
        token={this.props.token}
        push2FeedDetail={() => this.selectFeed(feed)}
        navigator={this.props.navigator}
        nav2TagDetail={this.props.nav2TagDetail}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  listView: {
    backgroundColor: 'white',
  },
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:50,
    backgroundColor: '#00B5AD',
  },
  back: {
    marginLeft:10,
    marginTop:23,
  },
  title: {
    alignSelf:'center',
    marginTop: 10,
  },
  right: {
    marginRight:10,
    marginTop:23,
  },
  parallaxHeader: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingBottom: 20,
  },

  headerImg: {
    height: PARALLAX_HEADER_HEIGHT,
  },

  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  stickySectionText: {
    color: 'black',
    fontSize: 18,
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },


});

module.exports = TagFeeds;
