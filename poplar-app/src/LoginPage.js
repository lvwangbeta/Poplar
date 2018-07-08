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
import {showLoginPage, isLogin} from  './actions/loginAction';
import {showRegPage} from './actions/RegisterAction';
import RegisterPage from './RegisterPage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const margin = 20;

const LOGIN_URL = URLConf.API_HOST + '/user/login';

function trim(str){
  return str.replace(/(^\s*)|(\s*$)/g,"");
}

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: 'lvwangbeta@163.com',
      password: '12345678',
      animated: true,
      transparent: false,
      inTheLog: false,
      visible: false,
      keyBoardIsShow: false,
    };
  }

  checkInfo() {
    if(this.state.email == '' || trim(this.state.email).length == 0) {
      Alert.alert('请输入邮箱');
      return false;
    }

    if(this.state.password == '' || trim(this.state.password).length == 0) {
      Alert.alert('请输入密码');
      return false;
    }
    return true;
  }

  login() {

    if(!this.checkInfo()) return;

    this.setState({
      inTheLog: true,
    });
    var url = LOGIN_URL + "/" + this.state.email + "/" + this.state.password;
    var options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify({email: this.state.email, password: this.state.password})
    };
    fetch(url, options).then((response) => response.json())
      .then((responseData) => {
        var retCode = responseData.errno;
        console.log(responseData);
        if(retCode == PoplarEnv.dic.SUCCESS_ACCOUNT_LOGIN) {
          var user = responseData.data.user;
          AsyncStorage.multiSet([['token', responseData.data.token], ['userId', user.id.toString()], ['userName', user.user_name], ['avatar', user.user_avatar]], ()=> {
            this.props.showLoginPage(false);
            this.props.isLogin();
            //this.props.refresh(true, responseData.token);
          });
          //this.props.showLoginPage(false);
        } else {
          if(retCode == PoplarEnv.dic.ERROR_EMAIL_EMPTY) {
            Alert.alert('请输入邮箱');
          } else if(retCode == PoplarEnv.dic.ERROR_EMAIL_NOT_REG) {
            Alert.alert('您还没有注册哦');
          } else if(retCode == PoplarEnv.dic.ERROR_PWD_EMPTY) {
            Alert.alert('请输入密码');
          } else if(retCode == PoplarEnv.dic.ERROR_PWD_DIFF) {
            Alert.alert('密码错误');
          } else {
            Alert.alert('登录异常, 请重试');
          }
          this.setState({inTheLog: false});
        }
      }).done();

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
    const {loginPageVisible, showLoginPage, showRegPage} = this.props;
    console.log('visible:'+loginPageVisible);
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
          visible={loginPageVisible}
          onRequestClose={this.cancle}>
            <RegisterPage />
            <TouchableWithoutFeedback onPress={()=>this.hideKeyBoard()}>
            <View style={{flex:1}}>
              <View style={styles.cancleBtn}>
                <TouchableOpacity onPress={()=>showLoginPage(false)}>
                  <Image style={{width: 16, height: 16}} source={require('./imgs/multiply.png')}/>
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <View style={{marginTop: 80, height: 80,}}>
                  <Image style={{width: 80, height: 80}} source={require('./imgs/poplar_logo_108.png')}/>
                </View>

                <View style={styles.inputs}>
                  <TextInput
                            style={{height: 40,
                                    width: windowWidth-margin*2,
                                    padding:10,
                                    borderColor: '#9B9B9B',
                                    borderWidth: 0.2,
                                    borderRadius: 2,
                                    color: '#9B9B9B'}}
                            placeholder="邮箱"
                            editable={this.state.inTheLog ? false: true}
                            onChangeText={(email) => this.setState({email})}
                            defaultValue='lvwangbeta@163.com'
                          />
                  <TextInput
                            style={{height: 40,
                                    width: windowWidth-margin*2,
                                    padding: 10,
                                    borderColor: '#9B9B9B',
                                    borderWidth: 0.2,
                                    marginTop: 10,
                                    borderRadius: 2,
                                    color: '#9B9B9B'}}
                            placeholder="密码"
                            secureTextEntry={true}
                            editable={this.state.inTheLog ? false: true}
                            onChangeText={(password) => this.setState({password})}
                            defaultValue='12345678'
                          />
                  <View>
                    {
                      this.state.inTheLog ?
                      <View style={[styles.loginBtn, {backgroundColor: '#59A2F7'}]}>
                        <Text style={{color: 'white', fontSize: 16, marginTop: 6}}>登录中</Text>
                      </View> :
                      <TouchableOpacity onPress={()=>this.login()} style={styles.loginBtn}>
                        <Text style={{color: 'white', fontSize: 16, marginTop: 6}}>登录</Text>
                      </TouchableOpacity>
                    }

                  </View>
                </View>
                {/* end inputs */}
                <View style={{marginTop:40}}><Text style={{color:'#9B9B9B'}}>——————————     或     ——————————</Text></View>
                <View style={{marginTop: 30, height: 30,flexDirection:'row'}}>
                  <Image style={{width: 30, height: 30,marginLeft:-14}} source={require('./imgs/weibo.png')}/>
                  <Text style={{width: 90, height: 30, marginTop:7,color:'#9B9B9B'}}>使用微博登录</Text>
                </View>
                <View style={{position:'absolute', bottom:20, flexDirection:'row'}}>
                  <Text style={{color:'#9B9B9B'}}>还没有账号?</Text>
                  <Text style={{color:'#4A90E2',}} onPress={()=>showRegPage(true)}> 注册</Text>
                </View>
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
  },
  cancleBtn: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
  },

  inputs: {
    marginTop: 30,
  },
  loginBtn: {
    width: windowWidth-margin*2,
    height: 48,
    marginTop: 10,
    borderRadius: 2,
    alignItems: 'center',
    padding: 10,
    //backgroundColor: '#00B5AD',
    backgroundColor: '#4A90E2',
  },

});

export default connect((state) => ({
  loginPageVisible: state.showLoginPage.loginPageVisible,
}), (dispatch) => ({
  isLogin: () => dispatch(isLogin()),
  showLoginPage: (flag) => dispatch(showLoginPage(flag)),
  showRegPage: (flag) => dispatch(showRegPage(flag)),
}))(LoginPage)


//module.exports = LoginPage;
