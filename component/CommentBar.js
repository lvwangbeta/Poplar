import React from 'react';

import {
  View,
  Image,
  Text,
  Modal,
  TextInput,
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

  render: function(){
      return(
        <View style={styles.container}>
          <TextInput
            ref='commentBar'
            style={{height: 40,borderWidth: 1, marginBottom: 0, paddingLeft: 10}}
            placeholder='reply kevin:'
            keyboardType='web-search'
            autoFocus={this.props.visible}
            onBlur={this.hide}
            onChangeText={(text) => this.setState({text})}
          />
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
    width:windowWidth,
  },
});

module.exports = CommentBar;
