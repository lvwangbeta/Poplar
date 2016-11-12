'use strict';

import React from 'react';
import {
  Image,
  Text,
  TextInput,
  Keyboard,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  Modal,
  Navigator,
  StyleSheet,
} from 'react-native';

var ImagePickerManager = require('NativeModules').ImagePickerManager;

var options = {
  title: 'Select Avatar', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  customButtons: {
    'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  },
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 100, // photos only
  maxHeight: 100, // photos only
  aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.2, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
};


var NewFeed = React.createClass({

  getInitialState() {

    return {
      animated: true,
      modalVisible: true,
      transparent: false,
      avatarSource: null,
      videoSource: null
    };
  },

  pickImage: function() {
    ImagePickerManager.launchImageLibrary(options, (response)  => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {


        // uri (on iOS)
        const source = {uri: response.uri.replace('file://', ''), isStatic: true};


        this.setState({
          avatarSource: source
        });
      }
    });
  },

  cancle: function() {
    this.props.hideNewFeedMode();
  },

  render: function() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    return (
      <View style={styles.container}>
        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.props.modalVisible}>
            <View style={{flex: 1, flexDirection: 'column'}}>
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
              <View style={styles.footer}>
                <Text onPress={this.pickImage}>footer</Text>
              </View>
            </View>
        </Modal>

      </View>
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
});



module.exports = NewFeed;
