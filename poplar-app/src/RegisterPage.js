'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  Alert,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import PoplarEnv from './util/PoplarEnv';
import URLConf from './api/URLConf';
import {showRegPage} from './actions/RegisterAction';
import {showLoginPage, isLogin} from  './actions/loginAction';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const margin = 20;

const PWD_MIN_LEN = 8;
const PWD_MAX_LEN = 16;
const NAME_MAX_LEN = 20;

const REGISTER_URL = URLConf.API_HOST + '/user/register/';

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function trim(str){
  return str.replace(/(^\s*)|(\s*$)/g,"");
}

class RegisterPage extends Component{


  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      cfmPassword: '',
      userName: '',
      animated: true,
      transparent: false,
      inTheReg: false,
      next: false,
      keyBoardIsShow: false,
    };
  }

  cancle() {
    this.props.navigator.pop();
  }

  isEmailExist(callback) {
    var url = URLConf.API_HOST + '/user/check/email/'+this.state.email;
    var options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
    console.log('[GET] ' + url);
    fetch(url, options).then((response) => response.json())
      .then((responseData) => {
        var retCode = responseData.errno;
        console.log('[RTN] ' + responseData);
        if(retCode == PoplarEnv.dic.ERROR_EMAIL_NOT_REG) {
          return callback(false);
        } else if(retCode == PoplarEnv.dic.ERROR_EMAIL_EXIST){
          return callback(true);
        }
      }).done();
  }

  checkInfo() {

    if(this.state.email == '' || trim(this.state.email).length == 0){
      Alert.alert('请输入邮箱');
      return;
    }

    if(!validateEmail(this.state.email)) {
      Alert.alert('请输入正确的邮箱格式');
      return;
    }

    if(this.state.password.length < PWD_MIN_LEN) {
      Alert.alert('密码至少8位哦~');
      return;
    }
    if(this.state.password.length > PWD_MAX_LEN) {
      Alert.alert('密码最多16位哦~');
      return;
    }

    if(this.state.cfmPassword.length == 0) {
      Alert.alert('请输入确认密码');
      return;
    }

    if(this.state.cfmPassword != this.state.password) {
      Alert.alert('两次密码输入不一致');
      return;
    }
    this.isEmailExist((result) => {
      if(!result) {
        this.setState({
          next: true,
        });
      } else {
        Alert.alert('此账户已注册');
        return;
      }
    });
  }

  register() {

    if(this.state.userName.length == 0) {
      Alert.alert('请输入昵称');
      return;
    }

    if(this.state.userName.length > NAME_MAX_LEN) {
      Alert.alert('做多只能'+NAME_MAX_LEN+'个字符');
      return;
    }

    var url = REGISTER_URL + this.state.userName + '/' + this.state.email + '/' + this.state.password;
    var options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify({user_email: this.state.email, user_pwd: this.state.password, user_cfm_pwd: this.state.cfmPassword, user_name: this.state.userName})
    };
    console.log('[GET] ' + url);
    fetch(url, options).then((response) => response.json())
      .then((responseData) => {
        var retCode = responseData.errno;
        console.log('[RTN] ' + responseData.errno);
        if(retCode == PoplarEnv.dic.SUCCESS_ACCOUNT_REG) {
          // AsyncStorage.setItem('token', responseData.token, ()=> {
          //   this.props.hideRegPage();
          //   this.props.refresh(true, responseData.token);
          // });
          AsyncStorage.multiSet([['token', responseData.data.token],
                                 ['userId', String(responseData.data.user.id)],
                                 ['userName', responseData.data.user.user_name],
                                 ['avatar', responseData.data.user.user_avatar]],
                                 ()=>{this.hide()}
            );
        }
      }).done();

  }

  hide() {
    const {showRegPage, showLoginPage, isLogin} = this.props;
    showRegPage(false);
    showLoginPage(false);
    isLogin();
  }

  hideKeyBoard() {
    if (this.state.keyBoardIsShow) {
      Keyboard.dismiss();
    }
  }

  componentWillMount () {
     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', ()=>this._keyboardDidShow());
     this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', ()=>this._keyboardDidHide());
   }

   componentWillUnmount () {
     this.keyboardDidShowListener.remove();
     this.keyboardDidHideListener.remove();
   }

   _keyboardDidShow () {
     this.setState({
         keyBoardIsShow: true
       });
   }

   _keyboardDidHide () {
     this.setState({
       keyBoardIsShow: false
     });
   }

  render() {
    const {regPageVisible, showRegPage} = this.props;
    console.log('reg page visible:'+regPageVisible);
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    return (
      //<View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={this.state.transparent}
          visible={regPageVisible}>
            <TouchableWithoutFeedback onPress={()=>this.hideKeyBoard()}>
            <View style={{flex:1}}>
              <View style={styles.cancleBtn}>
                <TouchableOpacity onPress={()=>{showRegPage(false)}}>
                  <Image style={{width: 16, height: 16}} source={require('./imgs/multiply.png')}/>
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <View style={{marginTop: 80, height: 80,}}>
                  <Image style={{width: 80, height: 80}} source={require('./imgs/poplar_logo_108.png')}/>
                </View>

                <View style={styles.inputs}>
                  {!this.state.next &&
                  <View>
                    <TextInput
                              style={{height: 40,
                                      width: windowWidth-margin*2,
                                      padding:10,
                                      borderColor: '#9B9B9B',
                                      borderWidth: 0.2,
                                      borderRadius: 3,
                                      color: '#9B9B9B'}}
                              placeholder="邮箱"
                              returnKeyType="next"
                              editable={this.state.inTheReg ? false: true}
                              onChangeText={(email) => this.setState({email})}
                            />
                    <TextInput
                              style={{height: 40,
                                      width: windowWidth-margin*2,
                                      padding: 10,
                                      borderColor: '#9B9B9B',
                                      borderWidth: 0.2,
                                      marginTop: 10,
                                      borderRadius: 3,
                                      color: '#9B9B9B'}}
                              placeholder="密码(8~16位)"
                              returnKeyType="next"
                              secureTextEntry={true}
                              editable={this.state.inTheReg ? false: true}
                              onChangeText={(password) => this.setState({password})}
                            />
                    <TextInput
                              style={{height: 40,
                                      width: windowWidth-margin*2,
                                      padding: 10,
                                      borderColor: '#9B9B9B',
                                      borderWidth: 0.2,
                                      marginTop: 10,
                                      borderRadius: 3,
                                      color: '#9B9B9B'}}
                              placeholder="确认密码"
                              returnKeyType="done"
                              secureTextEntry={true}
                              editable={this.state.inTheReg ? false: true}
                              onChangeText={(cfmPassword) => this.setState({cfmPassword})}
                            />
                    </View>
                  }
                  {this.state.next &&
                    <View>
                    <TextInput
                              style={{height: 40,
                                      width: windowWidth-margin*2,
                                      padding: 10,
                                      borderColor: '#9B9B9B',
                                      borderWidth: 0.2,
                                      marginTop: 10,
                                      borderRadius: 3,
                                      color: '#9B9B9B'}}
                              placeholder="取个昵称吧(20字符以内)"
                              returnKeyType="done"
                              editable={this.state.inTheReg ? false: true}
                              onChangeText={(userName) => this.setState({userName})}
                            />
                    </View>
                  }
                  <View>
                    {
                      this.state.inTheReg ?
                      <View style={[styles.regBtn, {backgroundColor: '#59A2F7'}]}>
                        <Text style={{color: 'white', fontSize: 16, marginTop: 6}}>注册中</Text>
                      </View> :
                      <TouchableOpacity onPress={this.state.next ? ()=>this.register(): ()=>this.checkInfo()} style={styles.regBtn}>
                        <Text style={{color: 'white', fontSize: 16, marginTop: 6}}>{this.state.next ? '完成': '下一步'}</Text>
                      </TouchableOpacity>
                    }

                  </View>
                </View>
                {/* end inputs view */}

              </View>

            </View>
          </TouchableWithoutFeedback>
        </Modal>

      //</View>
    );
  }

};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    height: windowHeight,
  },
  cancleBtn: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
  },

  inputs: {
    flex:1,
    marginTop: 30,
  },
  regBtn: {
    width: windowWidth-margin*2,
    height: 48,
    marginTop: 20,
    borderRadius: 3,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#4A90E2',
  },

});

export default connect((state) => ({
  regPageVisible: state.showRegPage.regPageVisible,
}), (dispatch) => ({
  isLogin: () => dispatch(isLogin()),
  showLoginPage: (flag) => dispatch(showLoginPage(flag)),
  showRegPage: (flag) => dispatch(showRegPage(flag)),
}))(RegisterPage)

// module.exports = RegisterPage;
