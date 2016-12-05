'use strict';

import React from 'react';

import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Modal,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';

var TagFollow = require('./actions/TagFollow');
var TagFeedList = require('./TagFeeds');
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

const windowWidth = Dimensions.get('window').width;
const window = Dimensions.get('window');

const PARALLAX_HEADER_HEIGHT = 220;
const STICKY_HEADER_HEIGHT = 70;

var TagDetail = React.createClass({


  back: function(){
    this.props.navigator.pop();
  },

  nav2TagDetail: function(tag) {
    console.log(tag.tag);
    this.props.navigator.push({
      title: tag.tag,
      component: TagDetail,
      params: {token: this.props.token}
    });
  },


  render: function(){
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
      <ParallaxScrollView
        backgroundColor="rgba(255,255,255,1)"
        headerBackgroundColor="#333"
        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
        backgroundSpeed={10}
        style={{flex:1}}

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
            <View style={{left: -(windowWidth-112), bottom: -5,}}>
              <TouchableOpacity onPress={()=>this.props.navigator.pop()}>
                <Image style={{width: 18, height: 18}} source={require('../imgs/back.png')} />
              </TouchableOpacity>
            </View>
            <TagFollow token={this.props.token} refresh={this.props.refresh} />
          </View>
          )}>

          {/* <ScrollableTabView
                style={{marginTop: 10, }}
                tabBarUnderlineStyle={{backgroundColor: '#00B5AD', height: 2,}}
                tabBarActiveTextColor={'rgb(0,0,0)'}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}
              >
                <ScrollView tabLabel='热门' style={{borderBottomColor: '#00B5AD'}}><TagFeedList token={this.props.token} navigator={this.props.navigator} nav2TagDetail={this.nav2TagDetail}/></ScrollView>
                <ScrollView tabLabel='最新'><TagFeedList token={this.props.token} navigator={this.props.navigator} nav2TagDetail={this.nav2TagDetail}/></ScrollView>
              </ScrollableTabView> */}

        </ParallaxScrollView>

      </View>
    );
  },
});

var styles = StyleSheet.create({
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
  header: {
    height: 180,
    position: 'relative',
  },
  headerImg: {
    height: 180,
  },
  feedList: {

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
    marginTop: 13,
  },
  stickySectionText: {
    color: 'black',
    fontSize: 18,
  },
  fixedSection: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 20
  },

});


module.exports = TagDetail;
