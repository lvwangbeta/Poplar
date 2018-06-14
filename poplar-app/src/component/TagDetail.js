'use strict';

import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Modal,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import URLConf from '../api/URLConf';
import TagFollow from './TagFollow';
import FeedList from './FeedList';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const IMAGE_BASE_URL = URLConf.IMG_BASE_URL;
const window = Dimensions.get('window');
const windowWidth = window.width;
const PARALLAX_HEADER_HEIGHT = 220;
const STICKY_HEADER_HEIGHT = 70;
const tag_thumbnail = '?imageView2/1/w/'+windowWidth+'/h/'+PARALLAX_HEADER_HEIGHT;

export default class TagDetail extends Component {

  back(){
    this.props.navigation.goBack();
  }

  nav2TagDetail(tag) {
    console.log(tag.tag);
    this.props.navigator.push({
      title: tag.tag,
      component: TagDetail,
      params: {tag: tag}
    });
  }


  render(){
    const {tag} = this.props.navigation.state.params;
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <ParallaxScrollView
        backgroundColor="rgba(255,255,255,1)"
        headerBackgroundColor="#333"
        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
        backgroundSpeed={10}
        style={{flex:1}}

        renderBackground={() => (
          <View key="background">
            <Image resizeMode='cover' style={styles.headerImg} source={{uri: IMAGE_BASE_URL + tag.cover + tag_thumbnail}} />
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
              <Text style={{color: 'white', fontSize: 24, opacity: 0.9, marginRight: 10}}>#{tag.tag}</Text>
            </View>
          </View>
        )}

        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>{tag.tag}</Text>
          </View>
        )}

        renderFixedHeader={() => (
          <View key="fixed-header" style={styles.fixedSection}>
            <View style={{left: -(windowWidth-50), bottom: 2,}}>
              <TouchableOpacity onPress={()=>this.back()}>
                <Image style={{width: 18, height: 18}} source={require('../imgs/back.png')} />
              </TouchableOpacity>
            </View>
            <TagFollow tagId={tag.id}/>
          </View>
          )}>

          {/* <TagFeedList tagId={this.props.tag.id} token={this.props.token} navigator={this.props.navigator} nav2TagDetail={this.nav2TagDetail} refresh={this.props.refresh}/> */}
          <FeedList {...this.props} caller={'tag'} tag={tag}/>
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
  }
}

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
