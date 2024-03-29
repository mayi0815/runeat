/**
 * Created by ljunb on 16/8/21.
 */
import React, {PureComponent} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import {Navigator} from 'react-native-deprecated-custom-components'
import {observer, inject} from 'mobx-react/native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import FeedsCategoryBar from '../../components/FeedsCategoryBar'
import FeedHomeList from './FeedHomeList';
import FeedEvaluatingList from '../../pages/feed/FeedEvaluatingList'
import FeedKnowledgeList from '../../pages/feed/FeedKnowledgeList';
import FeedDelicacyList from '../../pages/feed/FeedDelicacyList';

const titles = ['mayi', '标题1', '标题2', '标题3'];
const controllers = [
    {categoryId: 1, controller: FeedHomeList},
    {categoryId: 2, controller: FeedEvaluatingList},
    {categoryId: 3, controller: FeedKnowledgeList},
    {categoryId: 4, controller: FeedDelicacyList}
]

@inject('account')
@observer
export default class Home extends PureComponent {

    _pictureAction = () => {
        const {account: {name}} = this.props
        if (name) {
            alert(name)
        } else {
            this.props.navigator.push({
                id: 'Login',
                sceneConfig: Navigator.SceneConfigs.FloatFromBottom
            })
        }
    }

    render() {
        const {navigator} = this.props;

        return (
            <View style={{flex: 1}}>
                <HeaderView searchAction={this.searchAction}/>
                <ScrollableTabView
                    renderTabBar={() => <FeedsCategoryBar tabNames={titles}/>}
                    tabBarPosition='top'
                    scrollWithoutAnimation={false}
                >
                    {controllers.map((data, index) => {
                        let Component = data.controller;
                        return (
                            <Component
                                key={titles[index]}
                                tabLabel={titles[index]}
                                categoryId={data.categoryId}
                                navigator={navigator}
                            />
                        )
                    })}
                </ScrollableTabView>
            </View>
        )
    }
}

// const HeaderView = ({pictureAction}) => {
//     return (
//         <View style={[styles.header, {borderBottomWidth: gScreen.onePix}]}>
//             <Image
//                 style={{width: 60, height: 30}}
//                 source={require('../../resource/ic_feed_nav.png')}
//                 resizeMode="contain"
//             />
//             <TouchableOpacity
//                 activeOpacity={0.75}
//                 style={styles.photo}
//                 onPress={pictureAction}
//             >
//                 <Image
//                     style={{width: 20, height: 20}}
//                     source={require('../../resource/ic_feed_camera.png')}
//                     resizeMode="contain"
//                 />
//             </TouchableOpacity>
//         </View>
//     )
// }
const HeaderView = ({searchAction}) => {
    return (
        <Image
            style={styles.headerContainer}
            source={require('../../resource/img_home_bg.png')}
        >
        <Text style={{color: 'white', marginBottom: 15, fontSize: 15}} resizeMode='contain'>RUN EAT
            </Text>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.headerSearchContainer}
                    onPress={searchAction}
                >
                    <Image style={{width: 20, height: 20, marginHorizontal: 5}}
                           source={require('../../resource/ic_home_search.png')}/>
                    <TextInput style={{color: 'rgba(222, 113, 56, 0.8)', fontSize: 15}} placeholder='请输入餐厅名称' />
                </TouchableOpacity>
            </View>
        </Image>
    )
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: gScreen.navBarHeight,
        paddingTop: gScreen.navBarPaddingTop,
        alignItems: 'center',
        borderBottomColor: '#d9d9d9',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    photo: {
        width: __IOS__ ? 44 : 50,
        height: __IOS__ ? 44 : 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: gScreen.navBarPaddingTop
    },
    headerContainer: {
        height: 220,
        width: gScreen.window,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: __IOS__ ? 20 + 15 : 15,
        paddingBottom: 28,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(1,1,1,0)',
        overflow: 'hidden'
    },
    headerLogo: {
        width: 66,
        height: 24,
    },
    headerSearchContainer: {
        height: 50,
        width: gScreen.width - 16 * 2,
        backgroundColor: 'white',
        borderRadius: 4,
        alignItems: 'center',
        flexDirection: 'row'
    },
})
