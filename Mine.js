'use strict';

import React from 'react';
var t = require('tcomb-form-native');
var PoplarEnv = require('./PoplarEnv');
import { StyleSheet,AsyncStorage, Text, View, TouchableHighlight } from 'react-native';
var store = require('./Store');

var Form = t.form.Form;

var API_KEY = 'api_key';

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

var Mine = React.createClass({

  getInitialState: function(){

      return {
        login: false,
        api_key: null,
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

  onPress: function() {
    this.setState({
      login: true,
      api_key: 'login',
    });
    store.setItem('api_key', 'login');
    console.log(store.getItem('api_key'));
  },

  checkLoginStatus: function(){
    var api_key = this.state.api_key;
    if(api_key !== null) {
      console.log('api_key:'+api_key);
      for(var key in api_key) {
        console.log(key);
      }
      return true;
    } else {
      return false;
    }
  },

  render: function() {

    if(this.checkLoginStatus()) {
      return (<View><Text>ccc</Text></View>);
    } else {
      return (
        <View style={styles.container}>
          {/* display */}
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
      );
    }


  }
});

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
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
