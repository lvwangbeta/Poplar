'use strict';

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListView,
  Dimensions
} from 'react-native';

import URLConf from './api/URLConf';
import NavigationBar from 'react-native-navbar';
import NotificationList from './component/NotificationList';


var AlarmPage = React.createClass({
  render: function() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationBar style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3'}}
                     title={{title: '消息'}}/>
        <NotificationList {...this.props} />
      </View>
    );
  },


});

module.exports = AlarmPage;
