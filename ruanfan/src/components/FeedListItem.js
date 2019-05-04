import React, { PureComponent } from 'react';
import FeedSingleImageCell from './FeedSingleImageCell'
import FeedMultiImageCell from './FeedMultiImageCell'

export default class FeedListItem extends PureComponent {

  // static propTypes = {
  //     feed: PropTypes.object,
  //     onPress: PropTypes.func
  // }

  _onPress = () => {
      const {feed, onPress} = this.props
      onPress && onPress(feed)
  }

  render() {
      const {feed: {title, source, tail, images}} = this.props
      const cellData = {title, source, images, viewCount: tail}

      if (images.length === 1) {
          return <FeedSingleImageCell {...cellData} onPress={this._onPress}/>
      }
      return <FeedMultiImageCell {...cellData} onPress={this._onPress}/>
  }
}