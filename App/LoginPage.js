'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  Alert,
  AsyncStorage
} from 'react-native';

import PoplarEnv from './util/PoplarEnv';
import URLConf from './api/URLConf';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const margin = 20;

const LOGIN_URL = URLConf.API_HOST + '/account/login';

var LoginPage = React.createClass({


  getInitialState() {
    return {
      email: 'osfdemo1@163.com',
      password: 'demo123456',
      animated: true,
      transparent: false,
      inTheLog: false,

    };
  },

  cancle: function() {
    this.props.hideLoginPage();
  },

  login: function() {

    this.setState({
      inTheLog: true,
    });
    var url = LOGIN_URL;
    var options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_email: this.state.email, user_pwd: this.state.password})
    };
    fetch(url, options).then((response) => response.json())
      .then((responseData) => {
        var retCode = responseData.status;
        console.log(responseData);
        if(retCode == PoplarEnv.dic.SUCCESS_ACCOUNT_LOGIN) {
          var user = responseData.user;
          AsyncStorage.multiSet([['token', responseData.token], ['userId', user.id.toString()], ['userName', user.user_name], ['avatar', user.user_avatar]], ()=> {
            this.props.hideLoginPage();
            this.props.refresh(true, responseData.token);
          });
        }
      }).done();

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
          visible={this.props.modalVisible}
          onRequestClose={this.cancle}>

            <View style={{flex:1}}>
              <View style={styles.cancleBtn}>
                <TouchableOpacity onPress={this.cancle}>
                  <Image style={{width: 16, height: 16}} source={require('./imgs/multiply.png')}/>
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <View style={{marginTop: 100, height: 100,}}>
                  <Image style={{width: 100, height: 100}} source={require('./imgs/default-avatar.jpg')}/>
                </View>

                <View style={styles.inputs}>
                  <TextInput
                            style={{height: 40,
                                    width: windowWidth-margin*2,
                                    padding:10,
                                    borderColor: '#9B9B9B',
                                    borderWidth: 0.2,
                                    borderRadius: 3,
                                    color: '#9B9B9B'}}
                            placeholder="邮箱"
                            editable={this.state.inTheLog ? false: true}
                            onChangeText={(email) => this.setState({email})}
                            defaultValue='osfdemo1@163.com'
                          />
                  <TextInput
                            style={{height: 40,
                                    width: windowWidth-margin*2,
                                    padding: 10,
                                    borderColor: '#9B9B9B',
                                    borderWidth: 0.2,
                                    marginTop: 10,
                                    borderRadius: 3,
                                    color: '#9B9B9B'}}
                            placeholder="密码"
                            secureTextEntry={true}
                            editable={this.state.inTheLog ? false: true}
                            onChangeText={(password) => this.setState({password})}
                            defaultValue='demo123456'
                          />
                  <View>
                    {
                      this.state.inTheLog ?
                      <View style={[styles.loginBtn, {backgroundColor: '#00ccc3'}]}>
                        <Text style={{color: 'white', fontSize: 16}}>登录中</Text>
                      </View> :
                      <TouchableOpacity onPress={this.login} style={styles.loginBtn}>
                        <Text style={{color: 'white', fontSize: 16}}>登录</Text>
                      </TouchableOpacity>
                    }

                  </View>
                </View>
              </View>

            </View>
        </Modal>

      //</View>
    );
  },

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cancleBtn: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
  },

  inputs: {
    marginTop: 30,
  },
  loginBtn: {
    width: windowWidth-margin*2,
    height: 40,
    marginTop: 10,
    borderRadius: 3,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#00B5AD',
  },

});

module.exports = LoginPage;
