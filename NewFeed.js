'use strict';

import React from 'react';
import {
  Image,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  Modal,
  Navigator,
  StyleSheet,
  Dimensions,
  NativeModules
} from 'react-native';

import {Auth,ImgOps,Conf,Rs,Rpc} from 'react-native-qiniu';
var ImagePicker = NativeModules.ImageCropPicker;

const windowWidth = Dimensions.get('window').width;
const margin = 20;
const imgInterval = 5;

var NewFeed = React.createClass({

  getInitialState() {

    return {
      images: [],
      animated: true,
      modalVisible: true,
      transparent: false,
    };
  },


  cancle: function() {
    this.props.hideNewFeedMode();
  },

  pickMultiple: function() {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      this.setState({
        image: null,
        images: images.map((i, index) => {
          console.log('received image', i);
          return {uri: i.path, width: i.width, height: i.height, mime: i.mime, index: index};
        })
      });
    }).catch(e => alert(e));

  },

  delImg: function(index) {
    this.state.images.splice(index, 1);
  },

  renderImgsPicked: function() {
    var imgViews = [];
    if(this.state.images !== null && this.state.images.length != 0) {
      for(let img of this.state.images) {
        imgViews.push(<View style={styles.imgWrapper}>
                        <Image style={styles.img} source={img} />
                      </View>
                    );
      }
    }

    return imgViews || <View/>;
  },

  render: function() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    return (
      //<View style={styles.container}>
        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.props.modalVisible}>
            <View style={{position: 'relative', flex: 1, flexDirection: 'column'}}>
              <View style={styles.nav}>
                <View style={styles.cancleBtn} >
                  <Text onPress={this.cancle}>cancle</Text>
                </View>
                <View style={styles.title}><Text style={{textAlign: 'center'}}>newFeed</Text></View>
                <View style={styles.sendBtn}><Text style={{textAlign: 'right'}}>send</Text></View>
              </View>
              <View style={styles.input}>
                <TextInput
                  style={styles.multiline}
                  placeholder="说点什么吧..."
                  returnKeyType="next"
                  multiline={true}
                />
              </View>
              <View style={styles.imgContainer}>
                  {this.renderImgsPicked()}
              </View>
              <View style={styles.footer}>
                <TouchableOpacity onPress={this.pickMultiple}>
                  <Text>Muti</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>

      //</View>
    );
  },
});


var styles = StyleSheet.create({
  container: {
    //justifyContent: 'center',
    //marginTop: 70,
    //padding: 20,
    flex : 1,
    // backgroundColor: '#ffffff',
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  cancleBtn: {
    width: 50,
  },
  sendBtn: {
    width: 50,
  },
  wrap: {
    flex: 1,
    flexDirection:'column',
  },
  nav: {
    //flex: 1,
    flexDirection: 'row',
    height: 70,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex:1,
    //flexDirection:'column',
  },
  footer: {
    height: 30,
    backgroundColor:'#ff99ff',
  },
  multiline: {
    borderTopWidth: 0.5,
    borderTopColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    height: 200,
    padding: 0,
  },

  imgContainer: {
    position: 'absolute',
    top: 200,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: margin,
  },
  imgWrapper: {
    position: 'relative',
    width: (windowWidth-margin*2-imgInterval*2) / 3,
    height:(windowWidth-margin*2-imgInterval*2) / 3,
    marginBottom: imgInterval,
    marginRight: imgInterval,
  },
  img: {
    width: (windowWidth-margin*2-imgInterval*2) / 3,
    height:(windowWidth-margin*2-imgInterval*2) / 3,
    marginBottom: imgInterval,
    marginRight: imgInterval,
    resizeMode: 'cover',
  },
  delIcon: {
    position: 'absolute',
    top:0,
    right: 0,
  }

});



module.exports = NewFeed;
