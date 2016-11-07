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

  render: function(){
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ScrollView style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.header}>
            <Image resizeMode='cover' style={styles.headerImg} source={require('../imgs/tag2.jpg')} />
            <Text style={{position: 'absolute',left:10, bottom: 10, color: 'white', fontSize: 25, opacity: 0.9}}>#摄影</Text>
          </View>
          <View style={styles.feedList}>
            <TagFeedList token={'6b6478dd-33ab-492e-b06d-05b7f1106c47'} secret={'osf'} navigator={this.props.navigator}/>

          </View>


        </ScrollView>
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
