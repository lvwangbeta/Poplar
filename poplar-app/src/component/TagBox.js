'use strict';

import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

// import TagDetail from './TagDetail';
import URLConf from '../api/URLConf';

const IMAGE_BASE_URL = URLConf.IMG_BASE_URL;
const tag_thumbnail = '?imageView2/1/w/200/h/200';
const windowWidth = Dimensions.get('window').width;
const margin = 10;
const interval = 5;
const tagWidth = (windowWidth-margin*2-interval*2 ) / 3;

export default class TagBox extends Component {

  showTagDetail(tag) {
    const { navigate } = this.props.navigation;
    navigate('TagDetail',{tag: tag, navigate:navigate});
  }

  render() {
    console.log(IMAGE_BASE_URL + this.props.tag.cover + tag_thumbnail);
    return(
      <TouchableOpacity onPress={()=>this.showTagDetail(this.props.tag)} style={styles.tagBox}>
        <View style={styles.tagTitle}><Text style={{color: 'white', fontSize: 13,textAlign: 'center'}}>{this.props.tag.tag}</Text></View>
        <Image resizeMode='cover' style={styles.image} source={{uri: IMAGE_BASE_URL + this.props.tag.cover + tag_thumbnail}} />
      </TouchableOpacity>
    );
  }
};


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
