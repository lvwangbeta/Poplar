import React from 'react';

import {
  View,
  Image,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  StyleSheet
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';

const windowWidth = Dimensions.get('window').width;

var CommentBar = React.createClass({

  getInitialState: function() {
    return ({
      text: '',
      margin: 50,
    });
  },

  hide: function() {
    this.props.hideCommentBar();
  },

  componentDidMount: function() {
    this.refs.commentBar.focus();
  },

  comment: function() {
    var comment = { id: 19,
     comment_object_type: 2,
     comment_object_id: 77,
     comment_author: 23,
     comment_author_name: 'demo1',
     comment_author_avatar: '5245526e-9b78-4c69-9a99-4bd454f015a0.jpeg',
     comment_ts: 1465097153000,
     comment_content: '呵呵hhhhhh',
     comment_parent: 0,
     comment_parent_author: 0,
     comment_parent_author_name: null };


     this.props.pushComment2Feed(comment);
     console.log('call back');
     //this.hide();
  },

  render: function(){
      return(
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <TextInput
              ref='commentBar'
              style={styles.input}
              placeholder='reply kevin:'
              keyboardType='web-search'
              autoFocus={this.props.visible}
              onBlur={this.hide}
              onChangeText={(text) => this.setState({text})}
            />
            <TouchableOpacity onPress={this.comment} style={{flex:1,justifyContent: 'center', alignItems: 'center',}}>
              <Text style={styles.commentBtn}>回复</Text>
            </TouchableOpacity>
          </View>
          <KeyboardSpacer/>
        </View>

      );
  },
});



var styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    width:windowWidth,
    height: 40,
    paddingLeft:20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  input: {
    height: 30,
    flex: 9,
    borderRadius: 2,
    backgroundColor: '#F3F3F3',
    paddingLeft: 5,
    marginRight:10,
  },
  commentBtn: {
    flex: 1,
    color: '#00B5AD',
  }
});

module.exports = CommentBar;
