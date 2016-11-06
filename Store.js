/**
* Poplar local storage
*/

'use strict';

import React from 'react';
import ReactNative from 'react-native';
var {
  AsyncStorage
} = ReactNative;

var Store = {

  getInitialState: function(){

      return {

      };
  },
  render: function() {
    return ({});
  },

  async clear(){
    await AsyncStorage.clear();
  },

  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('set key:'+key+ ' value:'+value);
    } catch (error) {
      console.log('item save error');
    }
  },
  async getItem(key) {
    try {
      // var value = await AsyncStorage.getItem(key);
      var v;
      AsyncStorage.getItem(key).then((value)=>{
        v = value;
      }).done();
      console.log('get key:'+key + ' value:'+v);
      return v+'';
    } catch (error) {
      console.log('item get error');
    }
  },

};

module.exports = Store;
