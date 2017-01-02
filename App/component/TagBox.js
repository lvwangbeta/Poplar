'use strict';

import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import TagDetail from './TagDetail';
import URLConf from '../api/URLConf';

const IMAGE_BASE_URL = URLConf.IMG_BASE_URL;
const tag_thumbnail = '?imageView2/1/w/200/h/200';
const windowWidth = Dimensions.get('window').width;
const margin = 10;
const interval = 5;
const tagWidth = (windowWidth-margin*2-interval*2 ) / 3;

var TagBox = React.createClass({

  showTagDetail: function() {
    this.props.navigator.push({
      title: '正文',
      component: TagDetail,
      params: {refresh:this.props.refresh, tag:this.props.tag}
    });
  },

  render: function() {
    return(
      <TouchableOpacity onPress={this.showTagDetail} style={styles.tagBox}>
        <View style={styles.tagTitle}><Text style={{color: 'white', fontSize: 13,textAlign: 'center'}}>{this.props.tag.tag}</Text></View>
        <Image resizeMode='cover' style={styles.image} source={{uri: IMAGE_BASE_URL + this.props.tag.cover + tag_thumbnail}} />
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
