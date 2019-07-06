<template>
    <div class="ratings" v-el:rating-wrapper>
        <div class="rating-wrapper">
            <div class="overview-wrapper">
                <div class="overview-left">
                    <div class="score">{{seller.score}}</div>
                    <div class="text">综合评分</div>
                    <div class="higher">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="attitude">
                        <span class="text">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score-num">{{seller.serviceScore}}</span>
                    </div>
                    <div class="food-score">
                        <span class="text">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score-num">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-time">
                        <span class="text">送达时间</span>
                        <span class="time">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <div class="rating-choose">
                <choose :ratings="ratings" :desc="desc"></choose>
            </div>
            <div class="rating-detail">
                <ul class="rating-list">
                    <li class="rating-item border-1px" v-for="item in ratings" v-show="needShow(item)">
                        <div class="left-info">
                            <img :src="item.avatar" width="28" height="28">
                        </div>
                        <div class="right-info">
                            <div class="name">{{item.username}}</div>
                            <div class="rate-time">{{item.rateTime | fmtDate}}</div>
                            <div class="star">
                                <star :size="24" :score="item.score"></star>
                                <span class="delivery-time">{{item.deliveryTime}}分钟送达</span>
                            </div>
                            <div class="text">{{item.text}}</div>
                            <div class="recommend">
                                <span :class="{'icon-thumb_up': item.rateType === 0, 'icon-thumb_down': item.rateType === 1}" class="icon"></span>
                                <ul class="recommend-list">
                                    <li class="recommend-item" v-for="subItem in item.recommend">{{subItem}}</li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import star from 'components/star/star';
import split from 'components/split/split';
import choose from 'components/rating-select/rating-select';
import BScroll from 'better-scroll';
import {formatDate} from 'common/js/date';
const ERR_OK = 0;
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            desc: ['全部', '满意', '不满意'],
            ratings: [],
            type: 'ALL',
            hasContent: false
        };
    },
    created() {
         this.$http.get('ratings').then(res => {
            res = res.body;
            if(res.errno === ERR_OK) {
                this.ratings = res.data;
                this.$nextTick(() => {
                    this._initScroll();
                });
            } 
        }, res => {});
    },
    methods: {
        _initScroll() {
            this.scroll = new BScroll(this.$els.ratingWrapper, {
                click: true
            });
        },
        needShow(rating) {
            if(this.hasContent && !rating.text) {
                return false;
            }
            if(this.type === 'ALL') {
                return true;
            } else if(this.type === 'POSITIVE') {
                return rating.rateType === 0;
            } else {
                return rating.rateType === 1;
            }
        }
    },
    events: {
        'select-type'(type) {
            this.type = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        'only-content'(onlyContent) {
            this.hasContent = onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        }
    },
    filters: {
        fmtDate(date) {
            return formatDate(date, 'YYYY-MM-DD hh:mm');
        }
    },
    components: {
        star,
        split,
        choose
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin';

    .ratings {
        position absolute
        top 174px
        bottom 46px
        width 100%
        overflow: hidden;
        .rating-wrapper {
            .overview-wrapper {
                display: flex;
                margin: 18px 0;
                .overview-left {
                    flex 0 1 138px
                    @media screen and (max-width: 320px) {
                        flex 0 1 115px
                    }
                    border-right: 1px solid rgb(147,153,159);
                    text-align: center;
                    .score {
                        font-size: 24px;
                        color: rgb(255,153,0);
                        line-height: 28px;
                        margin-bottom: 6px;
                    }
                    .text {
                        font-size: 12px;
                        color: rgb(7,17,27);
                        line-height: 12px;
                        margin-bottom: 8px;
                    }
                    .higher {
                        font-size: 10px;
                        color: rgb(147,153,159);
                        margin-bottom: 6px;
                    }
                }
                .overview-right {
                    flex 1
                    padding: 0 24px;
                    @media screen and (max-width: 320px) {
                        padding: 0 5px;
                    }
                    color: rgb(7,17,27);
                    .attitude, .food-score, .delivery-time {
                        font-size: 0;
                        margin-bottom 8px
                    }
                    .text, .score-num, .time {
                        vertical-align: text-bottom;
                        font-size: 12px;
                    }
                    .score-num {
                        color: rgb(255,153,0);
                    }
                    .text {
                        margin-right 12px;    
                    }
                    .score-num {
                        margin-left 12px;
                    }
                    .time {
                        color rgb(147,153,159);
                    }
                }
            }
            .rating-choose {
                margin-top 18px;
                padding 0 18px
                border-bottom 1px solid rgba(7,17,27,0.1)
            }
            .rating-detail {
                margin 0 18px
                .rating-list {
                    padding-bottom 25px
                    .rating-item {
                        display flex
                        margin-top 18px
                        padding-bottom 18px
                        border-1px(rgba(7,17,27,0.1))
                        .left-info {
                            flex 0 1 40px
                            img {
                                border-radius 50%
                            }
                        }
                        .right-info {
                            flex 1
                            .name {
                                font-size 10px
                                color rgb(7,17,27)
                                margin-bottom 4px
                            }
                            .rate-time {
                                position absolute
                                top 0
                                right 0
                                font-size 10px
                                font-weight 200
                                color rgb(147,153,159)
                                line-height 12px
                            }
                            .star {
                                margin-bottom 6px
                                .delivery-time {
                                    margin-left 6px
                                    font-size 10px
                                    font-weight 200
                                    color rgb(147,153,159)
                                    line-height 12px
                                }
                            }
                            .text {
                                font-size 12px
                                color rgb(7,17,27)
                                line-height 18px
                                margin-bottom 8px
                            }
                            .recommend {
                                font-size 0
                                .icon {
                                    width 10%
                                    font-size 12px
                                    line-height 16px
                                    margin-right 8px
                                    vertical-align top
                                    &:before {
                                        vertical-align top
                                    }
                                }
                                .icon-thumb_up {
                                    color rgb(0,160,220)
                                }
                                .icon-thumb_down {
                                    color rgb(183,187,189)
                                }
                                .recommend-list {
                                    display inline-block
                                    width 90%
                                    .recommend-item {
                                        display inline-block
                                        width 25%
                                        font-size 9px
                                        color rgb(147,153,159)
                                        line-height 16px
                                        border: 1px solid rgba(7,17,27,0.1);
                                        padding: 4px 6px;
                                        margin-right: 8px;
                                        margin-top: 2px;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>