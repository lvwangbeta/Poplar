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
  ScrollView,
  Modal,
  Navigator,
  StyleSheet,
  Dimensions,
  NativeModules
} from 'react-native';

import {newFeed} from './api/FeedAPI';
import {Auth,ImgOps,Conf,Rs,Rpc} from 'react-native-qiniu';
var ImagePicker = NativeModules.ImageCropPicker;
import KeyboardSpacer from 'react-native-keyboard-spacer';

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
      tags: [], //已经添加的tag
      tag: '',  //正在输入的tag
      tagCountLimit: 5,
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

        this.props.sendOk(false, 0);
        Rpc.uploadFile(img.uri, uptoken, formData).then((response) => response.json()).then((responseData) => {
         console.log(responseData);
         this.state.imagesID.push({key:responseData.hash });
         if(this.state.imagesID.length == this.state.images.length) {
           newFeed(this.state.text, this.state.imagesID, this.state.tags, (result, id) => {
             this.props.sendOk(result, id);
           });
         }
        });
        this.cancle();
      }

    } else {
      this.props.sendOk(false, 0);
      newFeed(this.state.text, '', this.state.tags, (result, id) => {
        this.props.sendOk(result, id);
      });
      this.cancle();
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

  checkTagInput: function(tag) {
    //empty check
    if(tag.indexOf(' ') == 0) return;

    //end input with blank space
    if(tag.indexOf(' ') > 0) {
      tag = tag.replace(/(^\s*)|(\s*$)/g,"");
      console.log('['+tag+']');
      for(let i in this.state.tags) {
        if(this.state.tags[i] == tag) {
          return;
        }
      }
      this.state.tags.push(tag);
      this.setState({tag: ''});
    } else {
      this.setState({tag: tag});
    }

    //console.log('['+tag+']');
  },

  delTag: function(tag) {
    console.log('del ' + tag);
    var tags = this.state.tags;
    for(let i in tags) {
      if(tags[i] == tag) {
        tags.splice(i,1);
        break;
      }
    }
    this.setState({tags: tags});
  },

  renderTags: function() {
    var tagViews = [];
    for(let i in this.state.tags) {
      tagViews.push(<TouchableOpacity style={styles.tag} onPress={() => this.delTag(this.state.tags[i])}>
                      <Text style={{color: '#9B9B9B'}}>{this.state.tags[i]} X</Text>
                    </TouchableOpacity>);
    }
    return tagViews;
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
          animationType={"slide"}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}>
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
            <ScrollView style={{ flex: 1, flexDirection: 'column'}}>

              <View style={styles.input}>
                <View>
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
                  <Text style={{position: 'absolute', bottom: 10, right: 20, color: '#9B9B9B'}}>{textLengthLimit-this.state.text.length}</Text>
                </View>

              </View>
              <View style={styles.imgContainer}>
                  {this.renderImgsPicked()}
              </View>
              <View style={styles.tagsContainer}>
                <View style={{flex:1, flexDirection: 'row'}}>
                  {/* <Image style={styles.tagIcon} source={require('./imgs/tag.png')} /> */}
                  <Text style={styles.tagIcon}>#</Text>
                  <TextInput
                    style={styles.tagInput}
                    placeholder="添加标签"
                    returnKeyType="done"
                    autoFocus={false}
                    multiline={false}
                    keyboardType='twitter'
                    maxLength = {140}
                    value={this.state.tag}
                    onChangeText={(tag) => {this.checkTagInput(tag)}}
                  />
                  </View>
                <View style={styles.tags}>
                {this.state.tags.length > 0 &&  this.renderTags()}
                </View>
              </View>
              <KeyboardSpacer/>
            </ScrollView>

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
    //position: 'relative',
    //flexDirection:'column',
  },
  footer: {
    height: 30,
    backgroundColor:'#ff99ff',
  },
  multiline: {
    // borderWidth: 1,
    // borderColor: 'black',
    flex: 1,
    fontSize: 18,
    height: 150,
    padding: 20,
    paddingBottom: 40,
  },
  tagIcon: {
    width: 20,
    height: 40,
    color: '#9B9B9B',
    fontSize: 23,
    marginLeft: 20,
  },

  tagsContainer: {
    flex:1,
    height: 100,
    marginBottom: 50,
  },
  tagInput: {
    flex:1,
    height: 30,
    // borderWidth: 1,
    // borderColor: 'black',
    width: windowWidth-margin*4,
    marginRight: 20,
    //marginLeft: margin,
  },
  tags: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: windowWidth-margin*2,
    height: 100,
    margin: margin,
    marginTop: 30,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  tag: {
    height: 26,
    marginRight: 10,
    marginBottom: 5,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F3F3F3',
    // borderColor: '#adadad',
    // borderWidth: 0.5,
    borderRadius: 5,
  },
  imgContainer: {
    //height: windowHeight - 70 - 150 - 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 0,
    marginLeft: margin,
    marginBottom: 20,
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
