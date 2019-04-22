/**
 * Created by ljunb on 2017/02/28.
 */
import {observable, computed, action, runInAction} from 'mobx'
import {get} from '../common/HttpTool'

export default class FeedStore {
    @observable feedList = [];
    @observable errorMsg = '';
    @observable page = 1;
    @observable isRefreshing = false;
    @observable isNoMore = true;

    constructor(categoryId) {
        this.categoryId = categoryId;
        this.fetchFeedList()
    }

    @action
    fetchFeedList = async () => {
        try {
            if (this.isRefreshing) this.page = 1
            const url = 'http://food.boohee.com/fb/v1/feeds/category_feed'
            const params = {
                page: this.page,
                category: this.categoryId,
                per: 10
            }
            // const responseData = await get({url, params, timeout: 30}).then(res => res.json())
            console.log('----responseData----')
            // console.log(responseData)
            const responseData = {"page":1,"total_pages":220,"feeds":[{"item_id":19403,"title":"美式炒蛋","card_image":"http://one.boohee.cn/food/2018/11/1/06D76A83-CE14-4E71-A861-A8E178682B77.jpg?imageView2/2/w/640","publisher":"WhoisSijia","publisher_avatar":"http://one.boohee.cn/t/2018/1/8/BD7E9876-2D89-40E0-8C7E-5DAF8EE767DA.jpg","description":"今日早餐。\nwholemeal sourdough bread\nsalami\nscrambled eggs\nsalad","content_type":5,"type":"food_card","like_ct":446},{"item_id":19368,"title":"麦片粥","card_image":"http://one.boohee.cn/food/2018/10/30/652147df-ef76-4653-9327-9c0b7ccc80e9?imageView2/2/w/640","publisher":"小仙女你太瘦啦","publisher_avatar":"http://one.boohee.cn/one/2018/10/30/6b56a38c-bf85-4abc-b0e3-b313b44c5a52","description":"小仙女的自制早餐","content_type":5,"type":"food_card","like_ct":580},{"item_id":19364,"title":" ","card_image":"http://one.boohee.cn/food/2018/10/30/3DE59915-5F6E-4DB4-B3AF-1CEC758A7CF4.jpg?imageView2/2/w/640","publisher":"卢卢35846","publisher_avatar":"http://one.boohee.cn/t/2018/10/20/980A0AF1-4865-4812-9321-F0A21F96A972.jpg","description":"一天心情 全在笑脸上☻","content_type":5,"type":"food_card","like_ct":410},{"item_id":19290,"title":"紫薯","card_image":"http://one.boohee.cn/food/2018/10/25/826F6307-5FBF-4D4A-85E5-85AF12BEFD14.jpg?imageView2/2/w/640","publisher":"卢卢35846","publisher_avatar":"http://one.boohee.cn/t/2018/10/20/980A0AF1-4865-4812-9321-F0A21F96A972.jpg","description":"","content_type":5,"type":"food_card","like_ct":226},{"item_id":19485,"title":"Marks \u0026 Spencer 鸡肉培根沙拉","card_image":"http://one.boohee.cn/food/2018/11/06/46bfea22-e6a5-41c6-a363-72df7883a34b?imageView2/2/w/640","publisher":"FLOWER90015","publisher_avatar":"http://qzapp.qlogo.cn/qzapp/1103837446/F79B5D85FE29DEC2E3987F58BA43C2C4/100","description":"第三天，早午饭一起吃了，起太晚，","content_type":5,"type":"food_card","like_ct":67},{"item_id":19479,"title":"早餐","card_image":"http://one.boohee.cn/food/2018/11/6/27A663C5-D79A-4AAE-A32D-3EFACAA315EC.jpg?imageView2/2/w/640","publisher":"北茶以君","publisher_avatar":"http://one.boohee.cn/t/2018/10/31/EF35BF91-44E8-4392-89A5-CAF675247630.jpg","description":"","content_type":5,"type":"food_card","like_ct":412},{"item_id":19478,"title":"南瓜小米粥","card_image":"http://one.boohee.cn/food/2018/11/06/887cbac1-5b5f-41c8-b9e0-2680109a66d9?imageView2/2/w/640","publisher":"卫囧囧是小喵咪","publisher_avatar":"http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoAJ4gYia5Gr7yabtFe8uT22jaTDDN2kWicNNkDl649jm5ZAOzSc0Dc8t7TiaEoy4dVJibMx9nicbMSR6A/132","description":"秋冬季节最喜欢暖暖的南瓜粥，翻出几样喜欢的水果，还有每天必吃的水煮蛋，吃着早点就觉得满满的幸福！","content_type":5,"type":"food_card","like_ct":149},{"item_id":19235,"title":"     芝士 黑咖啡","card_image":"http://one.boohee.cn/food/2018/10/21/1A8D6D74-B16C-4A17-86FD-63A91D92CA06.jpg?imageView2/2/w/640","publisher":"RrrrrrH","publisher_avatar":"http://one.boohee.cn/t/2018/10/9/4712BF91-F5CC-4857-8FA9-0FD356DA3352.jpg","description":"#1021今天休息 早餐时间 嘿嘿 超醇今天就要过期了 很舍不得就吃了一片和一个红豆面包","content_type":5,"type":"food_card","like_ct":75},{"item_id":19242,"title":"坚持","card_image":"http://one.boohee.cn/food/2018/10/22/4E2EFC80-8D6B-4F7B-AC58-51E2C7F1FD26.jpg?imageView2/2/w/640","publisher":"卢卢35846","publisher_avatar":"http://one.boohee.cn/t/2018/10/20/980A0AF1-4865-4812-9321-F0A21F96A972.jpg","description":"坚持！","content_type":5,"type":"food_card","like_ct":446},{"item_id":19240,"title":"兔子们吃的","card_image":"http://one.boohee.cn/food/2018/10/21/1A9A89AF-B1BC-4813-8D49-1E8C18F8C551.jpg?imageView2/2/w/640","publisher":"邓邓邓邓邓27715","publisher_avatar":"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJtrRoAc3M9Egeh9uZKsGrZaBn8Lgqe15lCAnuuonxhFEyicic1O15Biab3aanhSNAjvNhJD5HFSAhMQ/132","description":"","content_type":5,"type":"food_card","like_ct":692}]}
            const {feeds, page, total_pages} = responseData

            runInAction(() => {
                this.isRefreshing = false
                this.errorMsg = ''
                this.isNoMore = page >= total_pages

                if (this.page === 1) {
                    this.feedList.replace(feeds)
                } else {
                    this.feedList.splice(this.feedList.length, 0, ...feeds);
                }
            })
        } catch (error) {
            if (error.msg) {
                this.errorMsg = error.msg
                console.log('-----mayi----')
                console.log(error.msg)
            } else {
                this.errorMsg = error
            }
        }
    }

    @computed
    get isFetching() {
        return this.feedList.length === 0 && this.errorMsg === ''
    }

    @computed
    get isLoadMore() {
        return this.page !== 1
    }
}