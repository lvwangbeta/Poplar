import React from 'react';
var PoplarEnv = require('./PoplarEnv');
import {
    StyleSheet,
    AsyncStorage,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Dimensions,
    ScrollView,
    Platform
} from 'react-native';
var store = require('./Store');
var FollowBtn = require('./component/actions/Follow');
var FeedList = require('./FeedList');
import {Auth,ImgOps,Conf,Rs,Rpc} from 'react-native-qiniu';

import ImagePicker from 'react-native-image-picker';

const windowWidth = Dimensions.get('window').width;


var Mine = React.createClass({

  getInitialState: function(){
      return {
        login: false,
        api_key: null,
        avatarSource: null,
      };
  },

/*
  onPress: function () {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
      fetch('http://localhost:8080/com.lvwang.osf/api/v1/account/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"user_email": value.email,"user_pwd": value.password})
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        //if(responseData.status == '104001') {
        if(responseData.status == PoplarEnv.dic.SUCCESS_ACCOUNT_LOGIN) {
          this.setState({
            login: true,
            api_key: responseData.api_key,
          });
          console.log('key:'+responseData.api_key);

        }

      }).done();
    }
  },
*/



  upload: function() {

    //set your key
    //Conf.ACCESS_KEY = <AK>;
    //Conf.SECRET_KEY = <SK>;

    var putPolicy = new Auth.PutPolicy2(
        {scope: "osfimgs2"}
    );
    var uptoken = putPolicy.token();

    let formData = new FormData();
    formData.append('file', {uri: this.state.avatarSource.uri, type: 'application/octet-stream', name: 'avatar_demo'});
    formData.append('key', 'avatar_demo');
    formData.append('token', uptoken);

    Rpc.uploadFile(this.state.avatarSource.uri, uptoken, formData).then((response) => response.json()).then((responseData) => {
      console.log(responseData.hash);
    });
  },


  selectPhotoTapped: function() {
    const options = {
      title: null,
      takePhotoButtonTitle: null,
      chooseFromLibraryButtonTitle: '从相册选择',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source;

        // You can display the image using either:
        //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        //Or:
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.setState({
          avatarSource: source
        }, () => this.upload());


      }
    });
  },

  render: function() {

      return (
        <ScrollView style={styles.container}>
          {/* display */}
          {/*
          <Form
            ref="form"
            type={Person}
            value={value}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>登录</Text>
          </TouchableHighlight>
          */}
          <View style={styles.card}>
            <View>
              <Image resizeMode='cover' style={styles.background} source={require('./imgs/tag1.jpg')} />
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                {this.state.avatarSource === null ?
                  <Image style={styles.avatar} source={require('./imgs/tag2.jpg')} />:
                  <Image style={styles.avatar} source={this.state.avatarSource} />}
              </TouchableOpacity>
            </View>
            <View style={styles.metas}>
              <View style={styles.desc}>
                <Text style={styles.name}>断鸿</Text>
                <Text style={styles.motto}>Time to do it</Text>
                <FollowBtn/>
              </View>
              <View
                style={{flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomWidth: 1,
                        borderBottomColor: '#F3F3F3',
                        marginTop: 10,
                        paddingBottom: 10,}}>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}><Text>12</Text><Text>关注</Text></View>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}><Text>56</Text><Text>粉丝</Text></View>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}><Text>108</Text><Text>状态</Text></View>
              </View>
            </View>
          </View>
          <View style={styles.myfeedsList}>
            <FeedList
              token={'6b6478dd-33ab-492e-b06d-05b7f1106c47'}
              secret={'osf'}
              navigator={this.props.navigator}
            />

          </View>
        </ScrollView>
      );


  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  card: {
    position: 'relative',
  },
  background: {
    height: 180,
    width:windowWidth,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    position: 'absolute',
    bottom: -20,
    left: windowWidth/2 - 40,
    borderColor: 'white',
    borderWidth: 2,
  },
  desc: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#F3F3F3',
    paddingBottom: 10,
  },
  motto:{
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    fontSize: 15,
    lineHeight: 14,
    color: '#9B9B9B',
  },
  name: {
    marginTop: 30,
    alignSelf: 'center',
    fontSize: 17,
    lineHeight: 18,
  },
  myfeedsList: {

  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = Mine;
