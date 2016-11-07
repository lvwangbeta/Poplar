'use strict';

import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  Navigator,
} from 'react-native';
var TagDetail = require('./TagDetail');

const windowWidth = Dimensions.get('window').width;
const margin = 10;
const interval = 5;
const tagWidth = (windowWidth-margin*2-interval*2 ) / 3;

var TagBox = React.createClass({

  showTagDetail: function() {
    this.props.navigator.push({
      title: '正文',
      component: TagDetail,
      passProps: {secret:this.props.secret, token:this.props.token},
    });
    //this.props.navigator.push({type:"tagDetail"});
  },

  render: function() {
    return(

      <TouchableOpacity onPress={this.showTagDetail} style={styles.tagBox}>
        <View style={styles.tagTitle}><Text style={{color: 'white', fontSize: 13,textAlign: 'center'}}>摄影</Text></View>
        <Image resizeMode='cover' style={styles.image} source={require('../imgs/tag1.jpg')} />
      </TouchableOpacity>

    );
  },

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  tagBox: {
    position: 'relative',
    width: tagWidth,
    height: tagWidth,
    marginLeft: interval,
    marginBottom: interval,
  },
  tagTitle: {
    position: 'absolute',
    bottom:0,
    width: tagWidth,
    height: 18,
    padding: 2,
    backgroundColor: 'rgba(0,0,0,.4)',
    zIndex: 1,
  },
  image: {
    width: tagWidth,
    height: tagWidth,
  },
});

module.exports = TagBox;
