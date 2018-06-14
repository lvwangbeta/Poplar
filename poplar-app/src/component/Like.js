'use strict';

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import {getToken} from '../util/Secret';
import {like, undoLike} from '../api/ActionAPI';
// import PopupLoginRegPage from '../PopupLoginRegPage';

export default class Like extends Component{

  constructor(props){
    super(props);
    this.state = {
      counter: this.props.counter,
      isLiked: this.props.isLiked,
      loginRegPageVisible: false,
    };

  }

  // checkLogin:function(token) {
  //   console.log('like btn token:' + token);
  //   if(!token) {
  //     this.setState({loginRegPageVisible: true});
  //   } else {
  //     like();
  //     let i = 1;
  //     if(this.state.isLiked) {
  //       i = -1;
  //     }
  //     this.setState({
  //       isLiked: !this.state.isLiked,
  //       counter : this.state.counter + i,
  //     });
  //   }
  // },

  pressLike() {
    //getToken(this.checkLogin);

    if(this.props.isLiked)  {
      if(this.props.isLikedInDetail != undefined && this.props.isLikedInDetail == false) {
        like(this.props.feed.user_id, this.props.feed.object_type, this.props.feed.object_id, (result, err) => {
          if(!result ) {
            if(err == 'not logged in') {
              this.setState({loginRegPageVisible: true});
            }
          } else {
            this.setState({
              isLiked: true,
              counter : this.state.counter + 1,
            });
            this.props.incrLikeCount();
          }
        });
      } else {
        undoLike(this.props.feed.object_type, this.props.feed.object_id, (result, err) => {
          if(!result ) {
            if(err == 'not logged in') {
              this.setState({loginRegPageVisible: true});
            }
          } else {
            this.setState({
              isLiked: false,
              counter : this.state.counter - 1,
            });
            this.props.decrLikeCount();
          }
        });
      }
    } else {
        like(this.props.feed.user_id, this.props.feed.object_type, this.props.feed.object_id, (result, err) => {
          if(!result ) {
            if(err == 'not logged in') {
              this.setState({loginRegPageVisible: true});
            }
          } else {
            this.setState({
              isLiked: true,
              counter : this.state.counter + 1,
            });
            this.props.incrLikeCount();
          }
        });
    }
  }

  hideLoginRegPage() {
    this.setState({
      loginRegPageVisible: false,
    });
  }

  refresh(isLogin, token) {
    this.setState({
      loginRegPageVisible: false,
    }, this.props.refresh(isLogin, token));
  }

  render(){
    return (
      <View style={{flexDirection: 'row', }}>
        {/* {this.state.loginRegPageVisible && <PopupLoginRegPage hideLoginRegPage={this.hideLoginRegPage} refresh={this.refresh}/>} */}
        <TouchableOpacity onPress={()=>this.pressLike()}>
          {this.props.from=='FeedCell'?(
            this.props.isLiked?
            <Image style={{width:24, height:24, marginRight: 4}} source={require('../imgs/like.png')} /> :
            <Image style={{width:24, height:24, marginRight: 4}} source={require('../imgs/like_empty.png')} />
            ):
            (
              this.state.isLiked?
              <Image style={{width:24, height:24, marginRight: 4}} source={require('../imgs/like.png')} /> :
              <Image style={{width:24, height:24, marginRight: 4}} source={require('../imgs/like_empty.png')} />
            )
          }

        </TouchableOpacity>
        {
          this.props.from=='FeedCell'?
          <Text style={{top: 4, left: 2}}>{this.props.counter}</Text>:
          <Text style={{top: 4, left: 2}}>{this.state.counter}</Text>
        }

      </View>
    );
  }



};

// module.exports = Like;
