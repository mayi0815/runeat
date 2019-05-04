import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { gScreen } from "../../global";
import { connect } from 'react-redux';
import { getFeed } from '../../store/actions/feed';
import FeedHomeItem from '../../components/FeedHomeItem';
import FeedListItem from '../../components/FeedListItem';
import Loading from "../../components/Loading";
// import FeedBaseStore from "../../store/feedBaseStore";
import AutoResponisve from "autoresponsive-react-native";

const cardItemWidth = (gScreen.width - 15 * 2 - 10) / 2;
const itemWidth = gScreen.width - 40;

class FeedList extends Component {

  componentDidMount() {
    if (!this.props.feed[this.props.storeName].data) {
      this.props.getFeed(this.props.id, 1)
    }
  }

  onMomentumScrollEnd = event => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const { storeName, id, feed } = this.props;
    const { page, totalPages } = feed[storeName];

    const contentSizeH = contentSize.height;
    const viewBottomY = contentOffset.y + layoutMeasurement.height;

    const hasMorePage = page < totalPages

    if (viewBottomY >= contentSizeH && Math.abs(viewBottomY - contentSizeH) <= 40 && hasMorePage) {
      this.props.getFeed(id, page + 1)
    }
  };

  onRefresh = () => {
    // this.homeFeedStore.page = 1;
    // canLoadMore = false;
  };

  getAutoResponsiveProps = () => ({ itemMargin: 10 });

  renderChildren = (feed, key) => {
    // 默认高度
    let height = cardItemWidth + 50;
    let titleHeight = 30;
    if (feed.description) {
      if (feed.description.length !== 0 && feed.description.length < 13) {
        titleHeight += 25;
      } else if (feed.description.length >= 13) {
        titleHeight += 40;
      }
    }
    height += titleHeight;

    if (feed.content_type !== 5) height = cardItemWidth + 50;

    const style = {
      width: cardItemWidth,
      height,
      marginLeft: 15
    };

    if (parseInt(this.props.id, 10) === 1) {
      return (
        <FeedHomeItem
          titleHeight={titleHeight}
          style={style}
          key={`${feed.item_id}-${key}`}
          feed={feed}
          onPress={this.onPressCell}
        />
      );
    }

    return (
      <FeedListItem key={`${feed.item_id}-${key}`} feed={feed} style={{width: itemWidth}}/>
    )
  };

  onPressCell = feed => {
    // this.props.navigator.push({
    //   id: "FeedDetail",
    //   passProps: { feed }
    // });
  };

  render() {
    const { storeName, feed, isFetching, loadMoreFeed } = this.props;
    const feeds = feed[storeName];
    let scrollViewH = gScreen.height - gScreen.navBarHeight - 44 - 49;

    return (
      <View style={{ backgroundColor: "#f5f5f5", flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingTop: 10 }}
          ref={scrollView => (this.scrollView = scrollView)}
          style={{ width: gScreen.width, height: scrollViewH }}
          automaticallyAdjustContentInsets={false}
          removeClippedSubviews
          bounces
          scrollEventThrottle={16}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={this.onRefresh}
              colors={["rgb(217, 51, 58)"]}
            />
          }
        >
          {!isFetching && feeds.data && (
            <AutoResponisve {...this.getAutoResponsiveProps()}>
              {feeds.data.map(this.renderChildren)}
            </AutoResponisve>
          )}
          {!isFetching && (
            <View style={[styles.loadingContainer]}>
              <ActivityIndicator />
              <Text style={{ fontSize: 14, marginLeft: 5 }}>
                正在加载更多的数据...
              </Text>
            </View>
          )}
        </ScrollView>
        <Loading isShow={isFetching} />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  feed: state.feed
})

const mapDispatchToProps = dispatch => {
  return {
    getFeed: (categoryId, page) => dispatch(getFeed(categoryId, page)),
  }
}

const FeedListContainer = connect(mapStateToProps, mapDispatchToProps)(FeedList)
export default FeedListContainer

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden"
  },
  loadingContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  }
});
