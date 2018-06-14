'use strict';

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';

import Swiper from 'react-native-swiper';
import PhotoView from 'react-native-photo-view';
import URLConf from '../api/URLConf';

const { width, height } = Dimensions.get('window');
const IMAGE_BASE_URL = URLConf.IMG_BASE_URL;
const img_thumbnail = '?imageView2/1/w/200/h/200';
const img_slide_thumbnail = '?imageView2/1/w/'+ width;

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


export default class PhotoSwiper extends Component{

  constructor(props) {
    super(props);
    this.state = {
      imgList:this.props.imgList,
      showViewer: false,
      showIndex: 0,
    };
  }


  viewerPressHandle() {
    this.props.viewerPressHandle();
  }

  renderPhotoView() {

    var imagesView = [];
    for(var i=0; i<this.state.imgList.length; i++) {
        console.log(IMAGE_BASE_URL + this.state.imgList[i]+img_slide_thumbnail);
        imagesView.push(<View style={styles.slide}>
                        <TouchableOpacity onPress={()=>this.viewerPressHandle()}>
                          <PhotoView
                            source={{uri: IMAGE_BASE_URL + this.state.imgList[i] + img_slide_thumbnail}}
                            resizeMode='contain'
                            // minimumZoomScale={0.5}
                            // maximumZoomScale={3}
                            androidScaleType='center'
                            style={styles.photo} />
                        </TouchableOpacity>
                      </View>);
    }
    return imagesView;
  }

  render() {
    return (
      <View style={{position: 'relative'}}>
        {this.props.showViewer &&
          <Swiper index={this.props.showIndex}
                  style={styles.wrapper}
                  viewerPressHandle={()=>this.viewerPressHandle()}
                  renderPagination={renderPagination}
                  >
                  {this.renderPhotoView()}
          </Swiper>
        }
      </View>);
  }
}


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
    width: width,
    //height: width*2,
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
});
