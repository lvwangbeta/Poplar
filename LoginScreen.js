'use strict';

import React from 'react';
var t = require('tcomb-form-native');
var PoplarEnv = require('./PoplarEnv');
import {
  StyleSheet,
  AsyncStorage,
  Modal,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
var store = require('./Store');
var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
  email: t.String,              // a required string
  password: t.String,  // an optional string
});

var options = {
  email: {
    // you can use strings or JSX
    error: 'Insert a valid email'
  }

}; // optional rendering options (see documentation)

var value = {
  email: 'osfdemo1@163.com',
  password: 'demo123456',
};



var LoginScreen = React.createClass({

  getInitialState() {

    return {
      animated: true,
      modalVisible: true,
      transparent: false,
    };
  },

  login: function() {
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
            token: responseData.token,
          });
          console.log('key:'+responseData.token);

        }

      }).done();
    }
  },

  onPress: function () {
    // call getValue() to get the values of the form
    this.login();
    store.setItem('api_key', 'login');
    this.setState({modalVisible: false});
    this.props.callbackParent(true);
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
          visible={this.state.modalVisible}>
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[innerContainerTransparentStyle]}>
              <Form
                ref="form"
                type={Person}
                value={value}
                options={options}
              />
              <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>登录</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // marginTop: 50,
    padding: 20,
    flex : 1,
    // backgroundColor: '#ffffff',
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
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

module.exports = LoginScreen;
