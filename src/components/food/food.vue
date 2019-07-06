<template>
    <div class="food-com" v-show="showFood" transition="move" v-el:food-wrapper>
        <!-- 这层用于better-scroll滚动 -->
        <div>
            <div class="food-header">
                <div class="back" @click="hide">
                    <span class="icon-arrow_lift"></span>
                </div>
                <div class="img">
                    <img :src="food.image">
                </div>
                <div class="content">
                    <div class="name">{{food.name}}</div>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rate">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="curPrice">￥{{food.price}}</span>
                        <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    <div class="cart" v-show="!food.count" @click="addCart" transition="hide">加入购物车</div>
                </div>
            </div>
            <split v-show="food.info"></split>
            <div class="intro" v-show="food.info">
            	<div class="title">商品介绍</div>
            	<div class="info" >{{food.info}}</div>
            </div>
            <split></split>
            <div class="food-rate">
                <div class="header">
                    <div class="title">商品评价</div>
                    <choose :ratings="food.ratings" :desc="desc"></choose>
                </div>
                <div class="content">
                    <ul class="rating-list">
                        <li class="rating-item border-1px" v-for="item in food.ratings" v-show="needShow(item)">
                            <div class="time">{{item.rateTime | fmtDate}}</div>
                            <div class="text-wrapper">
                                <span :class="{'icon-thumb_up': item.rateType === 0, 'icon-thumb_down': item.rateType === 1}"></span>
                                <span class="text">{{item.text}}</span>
                            </div>
                            <div class="user-info">
                                <div class="userName">{{item.username}}</div>
                                <img  class="avatar" :src="item.avatar"></img>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import split from 'components/split/split';
import choose from 'components/rating-select/rating-select';
import BScroll from 'better-scroll';
import {formatDate} from 'common/js/date';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFood: false,
                desc: ['全部', '推荐', '吐槽'],
                type: 'ALL',
                hasContent: false
            };
        },
        methods: {
            show() {
                this.showFood = true;
                this.$nextTick(() => {
	                if(this.scroll) {
	                    this.scroll.refresh();
	                } else {
	                    this.scroll = new BScroll(this.$els.foodWrapper, {
	                        click: true
	                    });
	                }                		
                });
            },
            hide() {
                this.showFood = false;
            },
            addCart(event) {
            	if(!event._constructed) {
                    return;
                }
            	if(!this.food.count) {
                    Vue.set(this.food, 'count', 1);
            	} else {
            		this.food.count += 1;
            	}
                this.$dispatch('cart.add', event.target);
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
            },
            'only-content'(onlyContent) {
                this.hasContent = onlyContent;
            }
        },
        filters: {
            fmtDate(date) {
                return formatDate(date, 'YYYY-MM-DD hh:mm');
            }
        },
        components: {
            cartcontrol,
            split,
            choose
        }
    };
</script>
<style lang="stylus">
@import '../../common/stylus/mixin';

    .food-com {
        position absolute
        width 100%
        top 0
        bottom 46px;
        background-color #ffffff
        transition all 0.4s
        &.move-transition {
            left 0
        }
        &.move-enter, &.move-leave {
            left 100%
        }
        .food-header {
            position relative
            .back {
                position: absolute;
                top: 10px;
                left: 10px;
                z-index: 10;
                padding: 5px;
            }
            .img {
                position: relative;
                width: 100%
                height 0
                padding-top 100%
                img {
                    position absolute
                    width 100%
                    height 100%
                    top 0
                }
            }
            .content {
                position relative
                margin 18px
                .name {
                    font-size 14px
                    font-weight 700
                    color rgb(7,17,27)
                    line-height 28px
                    margin-bottom 8px
                }
                .detail {
                    font-size 0
                    margin-bottom 18px
                    .sell-count, .rate {
                        font-size 10px
                        color rgb(147,153,159)
                    }
                    .rate {
                        margin-left 12px
                    }
                }
                .price {
                    line-height 24px
                    .curPrice {
                        font-size 14px
                        color rgb(240,20,20)
                        font-weight 700
                    }
                    .oldPrice {
                        font-size 10px
                        font-weight 700
                        color rgb(147,153,159)
                        text-decoration line-through
                    }
                }
                .cartcontrol-wrapper {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
                .cart {
                	position: absolute;
				    right: 0;
				    bottom: 5px;
				    width: 74px;
				    height: 24px;
				    font-size: 10px;
				    background: rgb(0,160,220);
				    color: #fff;
				    border-radius: 12px;
				    text-align: center;
				    line-height: 24px;
				    transition: all 0.4s
				    &.hide-transition {
				    	opacity: 1
				    }
				    &.hide-enter, &.hide-leave {
						opacity: 0
				    }
                }
            }    
        }
        .intro {
        	margin: 18px
        	.title {
        		font-size: 14px;
        		margin-bottom: 6px
        	}
        	.info {
				padding: 0 8px
				font-size: 12px
				font-weight: 200
				color: rgb(77,85,93)
        	}
        }
        .food-rate {
            margin 18px 0
            .header {
                padding: 0 18px;
                border-bottom 1px solid rgba(7,17,27,0.1)
                .title {
                    margin-bottom 18px
                    font-size: 14px;
                }
            }
            .content {
                margin 0 18px
                .rating-item {
                    position relative
                    margin-top 16px
                    padding-bottom 16px
                    color rgb(147,153,159)
                    border-1px(rgba(7,17,27,0.1))
                    &:last-child:after {
                        border-none()
                    }
                    .time {
                        font-size 10px
                        line-height 12px
                        margin-bottom 6px
                    }
                    .text-wrapper {
                        font-size 0
                        .icon-thumb_up, .icon-thumb_down {
                            font-size 15px
                            margin-right 4px
                        }
                        .icon-thumb_up {
                            color rgb(0,160,220)
                        }
                        .text {
                            font-size 12px
                            color rgb(7,17,27)
                            line-height 16px
                        }
                    }
                    .user-info {
                        position absolute
                        right 0
                        top 0
                        font-size 0
                        .userName {
                            display inline-block
                            font-size 10px
                            line-height 12px
                            vertical-align top
                            margin-right 6px
                        }
                        .avatar {
                            display inline-block
                            width 12px
                            height 12px
                            border-radius 50%
                            vertical-align top
                        }
                    }
                }
            }
        }
    }
</style>
