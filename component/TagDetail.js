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

var TagFeedList = require('./TagFeeds');

const windowWidth = Dimensions.get('window').width;

var TagDetail = React.createClass({

  back: function(){
    this.props.navigator.pop();
  },

  nav2TagDetail: function(tag) {
    console.log(tag.tag);
    this.props.navigator.push({
      title: tag.tag,
      component: TagDetail,
      navigationBarHidden: true
    });
  },

  render: function(){
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <TagFeedList navigator={this.props.navigator} nav2TagDetail={this.nav2TagDetail}/>
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

  }

});


module.exports = TagDetail;
