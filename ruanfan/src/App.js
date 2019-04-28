/**
 * Created by ljunb on 2017/5/25.
 */
import React, { PureComponent } from "react";
import { Provider, connect } from 'react-redux';
import store from './store/appStore';
import { View, Text, StatusBar, Platform } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
// import { Navigator } from "react-native-deprecated-custom-components";
// import { observer, inject } from "mobx-react/native";
import TabBarView from './pages/TabBarView';
import Splash from './pages/Splash';
// import Router from "./common/Routers";
import './global.js'

// const initialPage = Platform.select({
//   ios: "TabBarView",
//   android: "Splash"
// });

const Landing = Platform.select({
  ios: TabBarView,
  android: Splash
})

// @inject("app")
// @observer
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Landing />
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: App
  }
});

export default createAppContainer(AppNavigator);
