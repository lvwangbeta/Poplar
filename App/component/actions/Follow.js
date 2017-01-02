import React from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import {getToken} from '../../util/Secret';
import {isFollow, follow, undoFollow} from '../../api/ActionAPI';
import PopupLoginRegPage from '../../PopupLoginRegPage';

var Follow = React.createClass({

  getInitialState: function() {
    return ({
      isFollowed: false,
      loginRegPageVisible: false,
    });
  },

  componentDidMount: function() {
    isFollow(this.props.uid, (result) => {
      this.setState({isFollowed: result});
    });
  },


  onPress: function() {
    if(!this.state.isFollowed) {
      follow(this.props.uid, (result, err) => {
        if(result) {
          this.setState({
            isFollowed: true,
          });
        } else {
          if(err == 'not logged in') {
            this.setState({loginRegPageVisible: true});
          }
        }
      });
    } else {
      undoFollow(this.props.uid, (result, err) => {
        if(result) {
          this.setState({
            isFollowed: false,
          });
        }
      });
    }

  },

  showLoginRegPage: function() {
    this.setState({
      loginRegPageVisible: true,
    })
  },

  hideLoginRegPage: function() {
    this.setState({
      loginRegPageVisible: false,
    });
    //getToken(this.updateFollowBtnStatus);
  },

  refresh: function(isLogin, token) {
    this.setState({
      loginRegPageVisible: false,
    }, this.props.refresh(isLogin, token));
  },

  render: function() {
    return(
      <View>
        {this.state.loginRegPageVisible && <PopupLoginRegPage hideLoginRegPage={this.hideLoginRegPage} refresh={this.refresh}/>}
        <TouchableOpacity ref={'btn'} style={[styles.btn, {backgroundColor: this.state.isFollowed?'#FBBD08':'rgba(0,0,0,0.0)'}]} onPress={this.onPress} >
          <Text style={{color: this.state.isFollowed?'#F3F3F3':'#FBBD08'}}>{this.state.isFollowed?'已关注':'+ 关注'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

});

var styles = StyleSheet.create({

  btn: {
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#FBBD08',
    borderRadius: 15,
  },

  text: {
    color: '#FBBD08',
  },

});

module.exports = Follow;
