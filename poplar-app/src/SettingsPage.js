'use strict';

import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import BackBtn from './component/navbar/BackBtn';
import About from './About';
import { connect } from 'react-redux';
import {logout} from  './actions/loginAction';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const margin = 20;

class SettingsPage extends Component{

  constructor(props) {
    super(props);
  }

  nav2AboutPage() {
    const {navigate} = this.props.navigation;
    navigate(
      'AboutPage',
      {
        navigate: navigate,
      }
    );
  }

  logout() {
    this.props.logout();
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
        style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3'}}
        title={{title: '设置'}}
        leftButton={<BackBtn onPress={()=>this.props.navigation.goBack()}/>}
        />
        <TouchableOpacity style={styles.cell} onPress={()=>this.nav2AboutPage()}>
          <Text style={{fontSize: 16}}>关于</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center',}}>
            <TouchableOpacity style={styles.logoutBtn} onPress={()=>this.logout()}>
              <Text style={{color: 'red', fontSize: 16,}}>退出登录</Text>
            </TouchableOpacity>
        </View>
      </View>
    );

  }
}


var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  cell: {
    height: 40,
    marginTop: 10,
    width:windowWidth,
    paddingLeft: margin,
    paddingRight: margin,
    paddingTop: 10,
    borderColor: '#F3F3F3',
    borderWidth: 1,
  },
  logoutBtn: {
    width: windowWidth,
    height: 40,
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    borderColor: '#F3F3F3',
    borderWidth: 1,
  },
});


const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin.status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
