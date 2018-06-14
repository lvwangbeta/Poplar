'use strict';

import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Modal,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {getToken} from '../util/Secret';
import {followTag, undoFollowTag} from '../api/ActionAPI';
import {isInterest} from '../api/TagAPI';
// import PopupLoginRegPage from '../PopupLoginRegPage';

export default class TagFollow extends Component{

  constructor(props) {
    super(props);
    this.state= {
      isFollowed: false,
      loginRegPageVisible: false,
    }
  }

  componentWillMount() {
    isInterest(this.props.tagId, (result, err) => {
      if(result) {
        this.setState({
          isFollowed: true,
        });
      }
    });
  }

  onPress() {
    if(this.state.isFollowed)  {
      undoFollowTag(this.props.tagId, (result, err) => {
        if(!result) {
          if(err == 'not logged in') {
            this.setState({loginRegPageVisible: true});
          }
        } else {
          this.setState({
            isFollowed: false,
          });
        }
      });
    } else {
      followTag(this.props.tagId, (result, err) => {
        if(!result) {
          if(err == 'not logged in') {
            this.setState({loginRegPageVisible: true});
          }
        } else {
          this.setState({
            isFollowed: true,
          });
        }
      });
    }
  }

  showLoginRegPage() {
    this.setState({
      loginRegPageVisible: true,
    })
  }

  updateFollowBtnStatus(token) {
    if(token) {
      this.setState({
        isFollowed: true,
      });
    }
  }

  hideLoginRegPage() {
    this.setState({
      loginRegPageVisible: false,
    });
    getToken(this.updateFollowBtnStatus);
  }

  refresh(isLogin, token) {
    this.setState({
      loginRegPageVisible: false,
    }, this.props.refresh(isLogin, token));
  }

  render() {
    return(
      <View>
        {/* {this.state.loginRegPageVisible && <PopupLoginRegPage hideLoginRegPage={this.hideLoginRegPage} refresh={this.refresh}/>} */}
        <TouchableOpacity ref={'btn'} style={[styles.btn, {backgroundColor: this.state.isFollowed?'#FBBD08':'rgba(0,0,0,0.0)'}]} onPress={()=>this.onPress()} >
          <Text style={{color: this.state.isFollowed?'#F3F3F3':'#FBBD08'}}>{this.state.isFollowed?'已关注':'+ 关注'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

};

var styles = StyleSheet.create({
  btn: {
    height: 24,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#FBBD08',
    borderRadius: 12,
  },
  text: {
    color: '#FBBD08',
  },

});
