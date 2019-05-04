/**
 * Created by ljunb on 16/5/26.
 */
import React, { PureComponent } from "react";
import ScrollableTabView from "react-native-scrollable-tab-view";
// import { observer, inject } from "mobx-react/native";
import { connect } from 'react-redux';
import { updateBarStyle } from '../store/actions/app';
import Feed from "./feed/Feed";
import FoodEncyclopedia from "./home/FoodEncyclopedia";
import Profile from "./profile/Profile";
import TabBar from "../components/TabBar";

const tabTitles = ["发现", "发起订单", "接单", "消息", "我的"];
const tabIcons = [
  require("../resource/ic_tab_search.png"),
  require("../resource/ic_tab_homepage.png"),
  require("../resource/ic_tab_homepage.png"),
  require("../resource/ic_tab_homepage.png"),
  require("../resource/ic_tab_my.png")
];
const tabSelectedIcon = [
  require("../resource/ic_tab_search_select.png"),
  require("../resource/ic_tab_homepage_select.png"),
  require("../resource/ic_tab_my_select.png")
];

// @inject("app")
// @observer
class TabBarView extends PureComponent {
  onChangeTab = ({ i }) => {
    const { updateBarStyle } = this.props;
    updateBarStyle(i === 1 ? "default" : "light-content")
  };

  renderTabBar = () => {
    return (
      <TabBar
        tabNames={tabTitles}
        tabIconNames={tabIcons}
        selectedTabIconNames={tabSelectedIcon}
      />
    );
  };

  render() {
    return (
      <ScrollableTabView
        locked
        scrollWithoutAnimation
        renderTabBar={this.renderTabBar}
        tabBarPosition="bottom"
        onChangeTab={this.onChangeTab}
      >
        <Feed tabLabel="Home" />
        <FoodEncyclopedia tabLabel="Food" />
        <FoodEncyclopedia tabLabel="Food" />
        <FoodEncyclopedia tabLabel="Food" />
        <Profile tabLabel="Profile" />
      </ScrollableTabView>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  app: state.app
})

const mapDispatchToProps = dispatch => {
  return {
    updateBarStyle: (style) => dispatch(updateBarStyle(style)),
  }
}

const TabBarViewContainer = connect(mapStateToProps, mapDispatchToProps)(TabBarView)

export default TabBarViewContainer
