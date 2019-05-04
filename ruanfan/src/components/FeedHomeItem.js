import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { gScreen } from "../global";

export default class FeedHomeItem extends Component {
  onPress = () => {
    const { onPress, feed } = this.props;
    onPress && onPress(feed);
  };

  render() {
    const { feed, onPress, style, titleHeight } = this.props;
    let imageH = feed.content_type != 5 ? style.width + 50 : style.width;

    // 返回的数据中，头像出现null的情况，所以source仍然做个判断
    let publisherAvatar = feed.publisher_avatar
      ? { uri: feed.publisher_avatar }
      : require("../resource/img_default_avatar.png");

    return (
      <TouchableOpacity
        activeOpacity={0.75}
        style={[{ backgroundColor: "#fff" }, style]}
        onPress={this.onPress}
      >
        <Image
          style={{ width: style.width, height: imageH }}
          source={{ uri: feed.card_image.split("?")[0] }}
          defaultSource={require("../resource/img_horizontal_default.png")}
        />
        {feed.content_type == 5 && (
          <View
            style={{
              height: titleHeight,
              width: style.width,
              paddingHorizontal: 4,
              paddingTop: 8
            }}
          >
            <View
              style={{
                height: titleHeight - 8,
                width: style.width - 8,
                justifyContent: "space-around",
                borderBottomWidth: gScreen.onePix,
                borderColor: "#ccc"
              }}
            >
              <Text style={{ fontSize: 14, color: "black" }} numberOfLines={1}>
                hello
              </Text>
              {feed.description != "" && (
                <Text style={{ color: "gray", fontSize: 13 }} numberOfLines={2}>
                  Desription
                </Text>
              )}
            </View>
          </View>
        )}
        {feed.content_type == 5 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height: 50,
              paddingHorizontal: 4
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ height: 30, width: 30, borderRadius: 15 }}
                source={publisherAvatar}
                defaultSource={require("../resource/img_default_avatar.png")}
              />
              <Text
                style={{
                  fontSize: 11,
                  color: "gray",
                  marginLeft: 8,
                  width: style.width * 0.4
                }}
                numberOfLines={1}
              >
                {feed.publisher}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ height: 12, width: 12 }}
                source={require("../resource/ic_feed_like.png")}
              />
              <Text style={{ fontSize: 11, color: "gray", marginLeft: 2 }}>
                {feed.like_ct}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}
