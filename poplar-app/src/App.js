/**
 * Poplar React Native App
 * https://github.com/lvwangbeta/Poplar
 * lvwangbeta@163.com
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import * as WeChat from 'react-native-wechat';
import TabNavigator from 'react-native-tab-navigator';
import { connect } from 'react-redux';
import {showLoginPage, isLogin} from  './actions/loginAction';
import {showNewFeedPage} from './actions/NewFeedAction';
import LoginPage from './LoginPage';
import ExplorePage from './ExplorePage';
import NewFeed from './NewFeed';
import MainPage from './MainPage';
import MinePage from './MinePage';
import {rmToken} from './util/Secret';

class App extends Component<{}> {

  static navigationOptions = {
    title: '首页',
  };

  constructor(props) {
    super(props);
    this.state= {
      selectedTab:'mainTab',
      notifCount: 0,
      addTabSelected:false,
    }

  }

  componentWillMount() {
    //rmToken();
    this.props.isLogin();
  }

  componentDidMount() {
    WeChat.registerApp('appkey');
  }

  showNewFeedPageIfLoggedIn() {
    const {status,showLoginPage,showNewFeedPage} = this.props;
    console.log('login staus:'+status);
    if(status == 'NOT_LOGGED_IN') {
      showLoginPage();
    } else {
      showNewFeedPage();
    }
    this.setState({
      addTabSelected: true,
    });
  }

  render() {
    const {showLoginPage, loginPageVisible, status,showNewFeedPage} = this.props;
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'mainTab'}
          renderIcon={() => <Image style={styles.icon} source={require('./imgs/icons/home.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('./imgs/icons/home_selected.png')} />}
          onPress={() => {
                          this.setState({ selectedTab: 'mainTab' });
                          if(status == 'NOT_LOGGED_IN') {
                            showLoginPage();
                          }
                      }
                   }
        >

          {status == 'NOT_LOGGED_IN'?<LoginPage {...this.props}/>:<MainPage {...this.props}/>}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'exploreTab'}
          renderIcon={() => <Image style={styles.icon} source={require('./imgs/icons/search.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('./imgs/icons/search_selected.png')} />}
          onPress={() => this.setState({ selectedTab: 'exploreTab' })}>
          <ExplorePage {...this.props}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          // selected={this.state.selectedTab === 'addTab'}
          selected={this.state.addTabSelected}
          renderIcon={() => <Image style={{height: 32, width: 32,}} source={require('./imgs/icons/add_selected.png')} />}
          renderSelectedIcon={() => <Image style={{height: 32, width: 32}} source={require('./imgs/icons/add_selected.png')} />}
          /*
          onPress={this.state.isLogin ? ()=>{this.props.navigator.push({
            title: '发状态',
            component: NewFeed,
            params: {sendOk:(result, id)=>this.sendOk(result, id), pop: ()=>this.props.navigator.pop()}
          })} : ()=>this.setState({ selectedTab: 'addTab' })}
          */
          onPress={()=>{this.showNewFeedPageIfLoggedIn()}}
          >

            {status == 'NOT_LOGGED_IN'?<LoginPage {...this.props} />:<NewFeed callback={()=>{this.setState({addTabSelected:false})}}/>}
          {/* {this.state.isLogin ? <View/> : <LoginRegPage refresh={this.refresh}/>} */}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'alarmTab'}
          renderIcon={() => <Image style={styles.icon} source={require('./imgs/icons/alarm.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('./imgs/icons/alarm_selected.png')} />}
          onPress={() => this.setState({ selectedTab: 'alarmTab' })}>
          {/* {this.state.isLogin ? <AlarmPage {...this.props}/> : <LoginRegPage refresh={this.refresh}/>} */}
          <View/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'iTab'}
          renderIcon={() => <Image style={styles.icon} source={require('./imgs/icons/user.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('./imgs/icons/user_selected.png')} />}
          onPress={() => {
                          this.setState({ selectedTab: 'iTab' });
                          if(status == 'NOT_LOGGED_IN') {
                            showLoginPage();
                          }
                      }
                   }
        >
          {status == 'NOT_LOGGED_IN'?<LoginPage {...this.props}/>:<MinePage {...this.props}/>}
        </TabNavigator.Item>
      </TabNavigator>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  loginBtn: {
    borderWidth: 1,
    padding: 5,
  },
  icon: {
    height: 26,
    width: 26,
  },
});

export default connect((state) => ({
  status: state.isLogin.status, //登录状态
  loginPageVisible: state.showLoginPage.loginPageVisible
}), (dispatch) => ({
  isLogin: () => dispatch(isLogin()),
  showLoginPage: () => dispatch(showLoginPage()),
  showNewFeedPage: () => dispatch(showNewFeedPage()),
}))(App)
