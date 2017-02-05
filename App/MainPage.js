'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import FeedList from './component/FeedList';


var MainPage = React.createClass({

  getInitialState: function() {
    return {
      sent: false,
      barVisible: false,
    };
  },

  componentWillReceiveProps: function(nextProps) {
    console.log('new props ' + this.props.id + ' : ' + nextProps.id);
    if(nextProps.id == this.props.id ) return ;
    this.setState({sent: nextProps.sent, barVisible: true});
    //if(nextProps.id == this.props.id ) return ;
    if(nextProps.sent) {
      this.timer = setTimeout(() => {
        this.setState({sent: false, barVisible: false})
      },
      1000);
    }

  },
  componentWillUnmount() {
     this.timer && clearTimeout(this.timer);
  },

  render: function(){
    return (
      <View style={styles.container}>
        <NavigationBar
        style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3'}}
        title={{title: '首页'}}/>
        {this.state.barVisible && (!this.state.sent ?
        <View style={{height: 25,justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(251, 189, 8, 0.8)'}}>
          <Text style={{color: 'white'}}>发送中...</Text>
        </View> :
        <View style={{height: 25,justifyContent: 'center',alignItems: 'center',backgroundColor: '#00B5AD',}}>
          <Text style={{color: 'white'}}>已发送</Text>
        </View>
        )
        }
        <FeedList {...this.props}/>
      </View>
    );
  },
});



var styles = StyleSheet.create({
  container: {
    flex:1,
  },
  header: {
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 189, 8, 0.8)',
  }
});

module.exports = MainPage;
