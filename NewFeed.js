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

import {newFeed} from './component/api/FeedAPI';
import {Auth,ImgOps,Conf,Rs,Rpc} from 'react-native-qiniu';
var ImagePicker = NativeModules.ImageCropPicker;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const margin = 20;
const imgInterval = 5;
const imgCountLimit = 9;
const textLengthLimit = 140;

var NewFeed = React.createClass({

  getInitialState() {

    return {
      text: '',
      images: [],
      imagesID: [], //上传图片返回的 hash id
      uploadAlready: false,
      animated: true,
      modalVisible: true,
      transparent: false,
    };
  },


  cancle: function() {
    this.setState({
      modalVisible: false,
    });
    this.props.pop();
  },

  pickMultiple: function() {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: imgCountLimit - this.state.images.length,
    }).then(images => {
      var newImages = this.state.images;
      images.map((i, index) => {
        console.log('received image', i);
        newImages.push({uri: i.path, width: i.width, height: i.height, mime: i.mime, index: index});
      });
      this.setState({
        images: newImages,
      });
    }).catch(e => alert(e));

  },

  upload: function() {

    //set your key
    //Conf.ACCESS_KEY = <AK>;
    //Conf.SECRET_KEY = <SK>;

    var putPolicy = new Auth.PutPolicy2(
        {scope: "osfimgs2"}
    );
    var uptoken = putPolicy.token();

    if(this.state.images !== null && this.state.images.length != 0) {
      let formData = new FormData();
      for(let img of this.state.images) {

        formData.append('file'+img.index, {uri: img.uri, type: 'application/octet-stream',name: img.index});
        formData.append('token', uptoken);

        Rpc.uploadFile(img.uri, uptoken, formData).then((response) => response.json()).then((responseData) => {
         console.log(responseData);
         this.state.imagesID.push({key:responseData.hash });
         if(this.state.imagesID.length == this.state.images.length) {
           newFeed(this.state.text, this.state.imagesID, '');
         }
        });

      }

    }
  },

  delImg: function(index) {
    this.state.images.splice(index, 1);
  },

  renderImgsPicked: function() {


    var imgViews = [];
    if(this.state.images !== null && this.state.images.length != 0) {
      for(let img of this.state.images) {
        imgViews.push(<View style={styles.imgWrapper}>
                        {/* <Text style={styles.delIcon} onPress={this.delImg(img.index)}>x</Text> */}
                        <Image style={styles.img} source={img} />
                      </View>
                    );
      }
    }

    if(this.state.images.length < imgCountLimit) {
      imgViews.push(<View style={styles.imgWrapper}>
                      {/* <Text style={styles.delIcon} onPress={this.delImg(img.index)}>x</Text> */}
                      <TouchableOpacity onPress={this.pickMultiple}>
                        <Image style={styles.img} source={require('./imgs/pickBtn.png')} />
                      </TouchableOpacity>
                    </View>);
    }
    //this.upload();

    return imgViews || <View/>;
  },

  send: function() {
    this.upload();
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
          visible={this.state.modalVisible}>
            <View style={{position: 'relative', flex: 1, flexDirection: 'column'}}>
              <View style={styles.nav}>
                <View style={styles.cancleBtn}>
                  <Text onPress={this.cancle}>取消</Text>
                </View>
                <View style={styles.title}><Text style={{textAlign: 'center', fontWeight: 'bold'}}>发状态</Text></View>
                <View style={styles.sendBtn}>
                  <TouchableOpacity onPress={this.send}>
                    <Text style={{textAlign: 'right', color: '#00B5AD'}}>发送</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.input}>
                <TextInput
                  style={styles.multiline}
                  placeholder="说点什么吧..."
                  returnKeyType="next"
                  autoFocus={true}
                  multiline={true}
                  keyboardType='twitter'
                  maxLength = {140}
                  value={this.state.text}
                  onChangeText={(text) => this.setState({text})}
                />
                <Text style={{position: 'absolute', bottom: -10, right: 20, color: '#9B9B9B'}}>{textLengthLimit-this.state.text.length}</Text>
              </View>
              <View style={styles.imgContainer}>
                  {this.renderImgsPicked()}
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
    paddingTop: 35,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: '#9B9B9B',
  },
  input: {
    //flex:1,
    position: 'relative',
    //flexDirection:'column',
  },
  footer: {
    height: 30,
    backgroundColor:'#ff99ff',
  },
  multiline: {
    //borderTopWidth: 0.5,
    //borderTopColor: '#0f0f0f',
    flex: 1,
    fontSize: 16,
    height: 150,
    padding: 20,
    paddingBottom: 40,
  },

  imgContainer: {
    height: windowHeight - 70 - 150 - 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
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
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  }

});



module.exports = NewFeed;
