/**
 * Created by ljunb on 16/8/21.
 */
import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet
} from "react-native";
// import { connect } from 'react-redux';
// import { getFeed } from '../../store/actions/feed';
// import { Navigator } from "react-native-deprecated-custom-components";
import { gScreen } from "../../global";
// import { observer, inject } from "mobx-react/native";
// import { State } from "react-native-gesture-handler";
import ScrollableTabView from "react-native-scrollable-tab-view";
import FeedsCategoryBar from "../../components/FeedsCategoryBar";
import FeedList from "./FeedList";

import { feedListMap } from '../../common/constanst';
// import FeedHomeList from "./FeedHomeList";
// import FeedEvaluatingList from "../../pages/feed/FeedEvaluatingList";
// import FeedKnowledgeList from "../../pages/feed/FeedKnowledgeList";
// import FeedDelicacyList from "../../pages/feed/FeedDelicacyList";

const titles = ["标题0", "标题1", "标题2", "标题3"];
const idToStoreName = Object.entries(feedListMap)

export default class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderView searchAction={this.searchAction} />
        <ScrollableTabView
          renderTabBar={() => <FeedsCategoryBar tabNames={titles} />}
          tabBarPosition="top"
          scrollWithoutAnimation={false}
        >
          {idToStoreName.map(([id, storeName]) => (
            <FeedList key={`${id}-${storeName}`} id={id} storeName={storeName}/>
          ))}
        </ScrollableTabView>
      </View>
    );
  }
}

const HeaderView = ({ searchAction }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.headerContainer}>
        <Image
          style={{ flex: 1, height: 220, width: gScreen.width }}
          source={require("../../resource/img_home_bg.png")}
        />
        <Text
          style={{ color: "black", marginBottom: 15, fontSize: 15 }}
          resizeMode="contain"
        >
          RUN EAT
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.headerSearchContainer}
        onPress={searchAction}
      >
        <Image
          style={{ width: 20, height: 20, marginHorizontal: 5 }}
          source={require("../../resource/ic_home_search.png")}
        />
        <TextInput
          style={{ color: "rgba(222, 113, 56, 0.8)", fontSize: 15 }}
          placeholder="请输入餐厅名称"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: gScreen.navBarHeight,
    paddingTop: gScreen.navBarPaddingTop,
    alignItems: "center",
    borderBottomColor: "#d9d9d9",
    backgroundColor: "white",
    justifyContent: "center"
  },
  photo: {
    width: Platform.select({ ios: 44, android: 50 }),
    height: Platform.select({ ios: 44, android: 50 }),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: gScreen.navBarPaddingTop
  },
  headerContainer: {
    height: 320,
    width: gScreen.width,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.select({ ios: 15, android: 15 }),
    paddingBottom: 28,
    paddingHorizontal: 16,
    backgroundColor: "rgba(1,1,1,0)",
    overflow: "hidden"
  },
  headerLogo: {
    width: 66,
    height: 24
  },
  headerSearchContainer: {
    height: 50,
    width: gScreen.width - 16 * 2,
    backgroundColor: "white",
    borderRadius: 4,
    alignItems: "center",
    flexDirection: "row"
  }
});
