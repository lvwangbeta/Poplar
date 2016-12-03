'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native';

var LoginPage = require('./LoginPage');
var RegisterPage = require('./RegisterPage');

var LoginRegPage = React.createClass({

  getInitialState: function() {
    return {
      loginPageVisible: false,
      regPageVisible: false,
    };
  },

  showLoginPage: function() {
    this.setState({
      loginPageVisible: true,
    });
  },
  hideLoginPage: function() {
    this.setState({
      loginPageVisible: false,
    });
  },

  showRegPage: function() {
    this.setState({
      regPageVisible: true,
    });
  },

  hideRegPage: function() {
    this.setState({
      regPageVisible: false,
    });
  },

  render: function() {
      return(
        <View style={{flex:1}}>
          {
            this.state.loginPageVisible && <LoginPage visible={true} hideLoginPage={this.hideLoginPage}/>
          }
          {
            this.state.regPageVisible && <RegisterPage visible={true} hideRegPage={this.hideRegPage}/>
          }
          <View style={{flex:2, justifyContent: 'center',alignItems: 'center',}}>
            <Image source={require('./imgs/default-avatar.jpg')}/>
            <Text style={{color: '#9B9B9B',fontSize: 14, width: 200, marginTop: 30, textAlign: 'center'}}>欢迎加入Poplar</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.loginBtn}>
              <TouchableOpacity onPress={this.showLoginPage}>
                <Text style={{color:'#00B5AD', fontSize: 16}}>登录</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.regBtn}>
              <TouchableOpacity onPress={this.showRegPage}>
                <Text style={{color: '#9B9B9B',fontSize: 16}}>注册</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

      );
  },


});



var styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  loginBtn: {
    borderColor: '#F3F3F3',
    borderWidth: 1,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 3,
  },
  regBtn: {
    marginLeft: 10,
    paddingTop: 5,
  }
});

module.exports = LoginRegPage;
