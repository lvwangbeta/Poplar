'use strict';

import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListView,
  Dimensions
} from 'react-native';

import URLConf from '../api/URLConf';
import NavigationBar from 'react-native-navbar';
import {getNotifications} from '../api/NotifyAPI';

const avatar_thumbnail = '?imageView2/1/w/50/h/50';
const windowWidth = Dimensions.get('window').width;
const margin = 20;
const dic = {system:0, comment:1, reply:2, like: 3, follow: 4};
const type = {album: 2, post: 4};


var NotificationList = React.createClass({
  getInitialState: function(){
    return {
      notifications:[],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentWillReceiveProps: function(nextProps) {
    getNotifications((result, notifications) => {
      if(result) {
        this.setState({dataSource: this.state.dataSource.cloneWithRows(notifications)});
      }
    });
  },

  componentWillMount: function() {
    getNotifications((result, notifications) => {
      if(result) {
        //console.log(notifications);
        this.setState({dataSource: this.state.dataSource.cloneWithRows(notifications)});
      }
    });
  },

  renderMsg: function(notification) {
    var msg = '';
    if(notification.notify_type == dic.like) {
      msg = '喜欢了你的说说';
    } else if(notification.notify_type == dic.comment) {
      msg = '评论了你的说说';
    } else if(notification.notify_type == dic.reply) {
      msg = '回复了你';
    } else if(notification.notify_type == dic.follow) {
      msg = '关注了你';
    }
    return (<View style={{flex:4, marginTop: 18, }}><Text style={{color: '#9B9B9B', fontSize: 16}}>{msg}</Text></View>);
  },

  renderNotification: function(notification) {
    //console.log('notification:' + notification);
    return (
      <TouchableOpacity style={{flex: 1,
                    flexDirection: 'row',
                    height: 54,
                    marginTop: 5,
                    marginBottom: 5,
                    paddingLeft: margin,
                    paddingRight: margin,
                    borderBottomWidth: 0.5,
                    borderColor: '#EEEEEE'}}>
        <View style={{flex:1}}>
          <Image source={{uri:URLConf.IMG_BASE_URL + notification.notifier_avatar + avatar_thumbnail}} style={{width: 48, height: 48, borderRadius: 24}}/>
        </View>
        {this.renderMsg(notification)}
        <View style={{flex:1}}>
          {notification.object_type == type.album ?
            <Image source={{uri:URLConf.IMG_BASE_URL + notification.object_title + avatar_thumbnail}} style={{width: 48, height: 48, }}/>:
            <View/>}

        </View>
      </TouchableOpacity>
    );
  },

  render: function() {
    return(
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderNotification}
          style={{marginTop: 0,}}
        />
    );
  },

});

module.exports = NotificationList;
