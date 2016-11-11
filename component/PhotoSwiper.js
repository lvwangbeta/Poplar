'use strict';

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ScrollView
} from 'react-native';

import Swiper from 'react-native-swiper';
import PhotoView from 'react-native-photo-view';

const { width, height } = Dimensions.get('window');
const IMAGE_BASE_URL = 'http://7xkkim.com1.z0.glb.clouddn.com/';

const renderPagination = (index, total, context) => {
  return (
    <View style={{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 25,
      left: 0,
      right: 0
    }}>
      <View style={{
        borderRadius: 7,
        backgroundColor: 'rgba(255,255,255,.15)',
        padding: 3,
        paddingHorizontal: 7
      }}>
        <Text style={{
          color: '#fff',
          fontSize: 14
        }}>{index + 1} / {total}</Text>
      </View>
    </View>
  )
};

const Viewer = props => <Swiper index={props.index} style={styles.wrapper} renderPagination={renderPagination}>
  {
    props.imgList.map((item, i) => <View key={i} style={styles.slide}>
      <TouchableWithoutFeedback onPress={e => props.pressHandle()}>
        <PhotoView
          source={{uri: IMAGE_BASE_URL + item}}
          resizeMode='contain'
          minimumZoomScale={0.5}
          maximumZoomScale={3}
          androidScaleType='center'
          style={styles.photo} />
      </TouchableWithoutFeedback>
    </View>)
  }
</Swiper>


var PhotoSwiper = React.createClass({

  getInitialState: function() {
    return ({
      imgList:this.props.imgList,
      showViewer: false,
      showIndex: 0,
    });
  },


  viewerPressHandle: function() {
    this.props.viewerPressHandle();
  },

  renderPhotoView: function() {
    var imagesView = [];
    for(var i=0; i<this.state.imgList.length-1; i++) {
        imagesView.push(<View style={styles.slide}>
                        <TouchableOpacity onPress={this.viewerPressHandle}>
                          <PhotoView
                            source={{uri: IMAGE_BASE_URL + this.state.imgList[i]}}
                            resizeMode='contain'
                            minimumZoomScale={0.5}
                            maximumZoomScale={3}
                            androidScaleType='center'
                            style={styles.photo} />
                        </TouchableOpacity>
                      </View>);
    }
    return imagesView;
  },

  render: function() {
    return (
      <View>
        {this.props.showViewer &&
          <Swiper index={this.props.showIndex} style={styles.wrapper} renderPagination={renderPagination}>
            {this.renderPhotoView()}
          </Swiper>
        }
      </View>);
  },


});


var styles = StyleSheet.create({

  feedContentImages: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginBottom: 10,
  },
  feedContentImage: {
    width: 100,
    height:100,

  },
  wrapper: {
    backgroundColor: '#000',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width,
    height: 300,
    flex: 1
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
});

module.exports = PhotoSwiper;
