<template>
    <div class="shoppingcar">
        <div class="content">
            <div class="content-left" @click="toggleList">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight': totalCount> 0}">
                        <i class="icon-shopping_cart" :class="{'highlight': totalCount> 0}"></i>
                    </div>
                    <span class="number" v-show="totalCount > 0">{{totalCount}}</span>
                </div>
                <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div>
                <div class="delivery-price">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" :class="{'highlight': minPrice <= totalPrice}">
                {{payDesc}}
            </div>
        </div>
        <div class="ball-container">
            <div transition="drop" v-for="ball in balls" class="ball" v-show="ball.show">
                <div class="inner inner-hook"></div>
            </div>
        </div>
        <div class="shopcar-list" v-show="listShow" transition="fold">
            <div class="header">
                <div class="title">购物车</div>
                <div class="empty" @click="empty">清空</div>
            </div>
            <div class="list-content" v-el:content-wrapper>
                <ul class="food-list">
                    <li class="food-item border-1px" v-for="item in selectFood">
                        <span class="name">{{item.name}}</span>
                        <span class="price">￥{{item.count * item.price}}</span>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :food="item"></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mask" v-show="listShow" @click="hideMask"></div>
    </div>
</template>

<script>
import cartcontrol from 'components/cartcontrol/cartcontrol';
import BScroll from 'better-scroll';
    export default {
        props: {
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            },
            selectFood: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                balls: [{
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }],
                dropBalls: [],
                fold: true
            };
        },
        computed: {
            totalPrice() {
                let total = 0;
                this.selectFood.forEach((item) => {
                    total += item.price * item.count;
                });
                return total;
            },
            totalCount() {
                let total = 0;
                this.selectFood.forEach((item) => {
                    total += item.count;
                });
                return total;
            },
            payDesc() {
                let str = '';
                if(this.totalPrice === 0) {
                    str = `￥${this.minPrice}起送`;
                } else if(this.totalPrice > 0 && this.totalPrice < this.minPrice) {
                    str = `还差￥${this.minPrice - this.totalPrice}元起送`;
                } else {
                    str = '去结算';
                }
                return str;
            },
            listShow() {
                if(!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if(show) {
                    this.$nextTick(() => {
                        if(!this.scroll) {
                            this.scroll = new BScroll(this.$els.contentWrapper, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            }
        },
        methods: {
            drop(el) {
                for(let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if(!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },
            toggleList() {
                if(!this.totalCount) return;
                this.fold = !this.fold;
            },
            empty() {
                this.selectFood.forEach((item) => {
                    item.count = 0;
                });
            },
            hideMask() {
                this.fold = true;
            }
        },
        components: {
            cartcontrol
        },
        transitions: {
            drop: {
                beforeEnter(el) {
                    let count = this.balls.length;
                    while(count--) {
                        let ball = this.balls[count];
                        if(ball.show) {
                            let rect = ball.el.getBoundingClientRect();
                            let x = rect.left - 40;
                            let y = -(window.innerHeight - 25 - rect.top);
                            el.style.transform = `translate3d(0, ${y}px, 0)`;
                            el.getElementsByClassName('inner-hook')[0].style.transform = `translate3d(${x}px, 0, 0)`;
                        }
                    }
                },
                enter(el) {
                    let rf = el.offsetHeight;
                    // this.$nextTick(() => {
                        el.style.transform = 'translate3d(0, 0, 0)';
                        el.getElementsByClassName('inner-hook')[0].style.transform = 'translate3d(0, 0, 0)';
                    // });
                },
                afterEnter(el) {
                    let ball = this.dropBalls.shift();
                    if(ball) {
                        ball.show = false;
                        el.style.display = 'none';
                    }
                }
            }
        }
    };
</script>

<style lang="stylus">
@import '../../common/stylus/mixin';
    .shoppingcar {
        position fixed
        bottom 0
        height 46px
        width 100%
        z-index 10
        .content {
            height: 100%;
            display flex
            .content-left {
                flex:1
                background-color rgb(20,29,39)
                font-size 0
                color: rgb(122,133,138);
                .logo-wrapper {
                    display: inline-block;
                    height: 58px;
                    width: 58px;
                    position: relative;
                    top: -12px;
                    border-radius: 50%;
                    text-align: center;
                    margin-left: 18px;
                    background-color rgb(20,29,39)
                    .logo {
                        width: 44px;
                        height: 44px;
                        background: #fff;
                        border-radius: 50%;
                        position: relative;
                        top: 6px;
                        bottom: 8px;
                        line-height: 44px;
                        display: inline-block;
                        background-color: rgb(43,52,60);
                        &.highlight {
                            background-color #00a0dc
                        }
                        .icon-shopping_cart {
                            font-size: 22px;
                            vertical-align: middle;
                            &.highlight {
                                color: #ffffff
                            }
                        }
                    }
                    .number {
                        font-size: 9px;
                        position: absolute;
                        background-color: rgb(240,20,20);
                        line-height: 16px;
                        width: 24px;
                        height: 16px;
                        top: 0;
                        right: 0;
                        border-radius: 16px;
                        font-weight: 700;
                        color: #fff;
                        box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
                    }
                }
                .price {
                    vertical-align top
                    display inline-block
                    margin 12px 0 0 12px
                    margin-left 12px
                    padding 5px 12px 5px 0
                    font-size 16px
                    font-weight 700
                    border-right 1px solid rgb(122,133,138)
                    &.highlight {
                        color #ffffff
                    }
                }
                .delivery-price {
                    vertical-align top
                    display inline-block
                    font-size 10px
                    margin-top: 12px;
                    margin-left: 12px;
                    padding-top: 5px;
                }
            }
            .content-right {
                flex: 0 1 105px
                background-color rgb(43,51,59);
                color: rgb(122,133,138);
                text-align: center;
                line-height: 46px;
                font-weight 700
                font-size 12px
                &.highlight {
                    color #ffffff
                    background-color #00b43c
                }                
            }
        }
        .ball-container {
            .ball {
                position: fixed;
                bottom: 25px;
                left: 40px;
                &.drop-transition {
                    transition: all 0.5s cubic-bezier(.49,-0.29,.75,.41)
                    .inner {
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background-color: #00a0dc;
                        transition: all 0.5s linear
                    }
                }
            }
        }
        .shopcar-list {
            position: absolute;
            left 0
            top: 0
            width: 100%;
            z-index: -10;
            transition all 0.4s
            &.fold-transition {
                opacity 1
                transform: translate3d(0, -100%, 0)
            }
            &.fold-enter, &.fold-leave {
                opacity 0
                transform: translate3d(0, 0, 0)
            }
            .header {
                height 40px
                line-height: 40px;
                background-color #f3f5f7
                border-bottom 1px solid rgba(7,17,27,0.1)
                .title {
                    float left
                    font-size 14px
                    font-weight 200
                    color rgb(7,17,27)
                    margin-left: 18px;
                }
                .empty {
                    float right 
                    font-size 12px
                    color rgb(0,160,220)
                    margin-right 18px    
                }
            }
            .list-content {
                max-height: 220px;
                overflow: hidden;
                background-color #ffffff
                .food-list {
                    margin 0 18px
                    .food-item {
                        position relative
                        padding 12px 0
                        border-1px(rgba(7,17,27,0.1))
                        line-height 24px
                        .name {
                            font-size 14px
                            color rgb(7,17,27)
                        }
                        .price {
                            position absolute
                            right: 100px;
                            font-size 14px
                            font-weight 700
                            color rgb(240,20,20)
                        }
                        .cartcontrol-wrapper {
                            position absolute
                            right: 0;
                            top: 8px;
                        }
                    }
                }
            }
        }
        .mask {
            position fixed
            width 100%
            height 100%
            top 0
            left 0
            background-color rgba(7,17,27,0.6)
            -webkit-backdrop-filter blur(10px)
            z-index: -100;
        }
    }
</style>

