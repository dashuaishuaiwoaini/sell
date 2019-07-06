<template>
    <div class="goods">
        <div class="menu-wrapper" v-el:menu-wrapper>
            <div>
                <div class="menu-item" v-for="item in goods" :class="{current: $index === currentIndex}" @click="selectedMenu($index,$event)">
                    <div class="item-content-wrapper border-1px">
                        <support-icon :size="3" :type="item.type" v-show="item.type >= 0"></support-icon>
                        <span class="name">{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="foods-wrapper" v-el:food-wrapper>
            <ul>
                <li v-for="item in goods" class="food-wrapper-hook">
                    <h1 class="name">{{item.name}}</h1>
                    <div>
                        <ul class="foods-item-wrapper">
                            <li class="foods-item border-1px" v-for="subItem in item.foods" @click="selCurFood(subItem, $event)">
                                <div class="image">
                                    <img :src="subItem.image" alt="" width="64" height="64">
                                </div>
                                <div class="content">
                                    <div class="title">{{subItem.name}}</div>
                                    <div class="descript">{{subItem.description}}</div>
                                    <div class="info">
                                        <span class="count">月售{{subItem.sellCount}}份</span><span class="rating">好评率{{subItem.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="new-price">￥{{subItem.price}}</span>
                                        <span class="old-price" v-show="subItem.oldPrice">￥{{subItem.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol :food="subItem"></cartcontrol>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div> 
                </li>
            </ul>
        </div>
    </div>
    <food v-ref:food-com :food="curFood"></food>
</template>

<script type="text/ecmascript-6">
import supportIcon from 'components/icon/icon';
import shoppingcar from 'components/shoppingcar/shoppingcar';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import food from 'components/food/food';
import BScroll from 'better-scroll';
const ERR_OK = 0;
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            goods: [],
            scrollY: 0,
            listHeight: [],
            curFood: {}
        };
    },
    created() {
        this.$http.get('goods').then(res => {
            res = res.body;
            if(res.errno === ERR_OK) {
                this.goods = res.data;
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHight();
                });
                this.$dispatch('goods', this.goods);
            } 
        }, res => {});
    },
    methods: {
        _initScroll() {
            this.menuScroll = new BScroll(this.$els.menuWrapper, {
                click: true
            });
            this.foodScroll = new BScroll(this.$els.foodWrapper, {
                probeType: 3,
                click: true
            });
            this.foodScroll.on('scroll', (pos) => {
                this.scrollY = Math.ceil(Math.abs(pos.y));
            });
        },
        _calculateHight() {
            let height = 0;
            this.listHeight.push(height);
            let foodList = document.getElementsByClassName('food-wrapper-hook');
            for(var i = 0; i < foodList.length; i++) {
                height += foodList[i].offsetHeight;
                this.listHeight.push(height);
            }
        },
        selectedMenu(index, event) {
            if(!event._constructed) return;
            let foodList = document.getElementsByClassName('food-wrapper-hook');
            let el = foodList[index];
            this.foodScroll.scrollToElement(el, 200);
        },
        _drop(target) {
           this.$refs.shopcart.drop(target); 
        },
        selCurFood(food, event) {
            if(!event._constructed) return;
            this.curFood = food;
            this.showDetail();
        },
        showDetail() {
            this.$refs.foodCom.show();
        }
    },
    computed: {
        currentIndex() {
            for(let i = 0; i < this.listHeight.length; i++) {
                if(this.scrollY === 0) return 0;
                if(!this.listHeight[i + 1] || (this.scrollY >= this.listHeight[i] && this.scrollY < this.listHeight[i + 1])) {
                    return i;
                }
            }
        }     
    },
    components: {
        supportIcon,
        shoppingcar,
        cartcontrol,
        food
    }
};
</script>
    
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin';

    .goods{
       position absolute
       top 174px
       bottom 46px
       width 100%
       display flex
       .menu-wrapper {
            flex: 0 1 80px
            background-color #f3f5f7
            overflow hidden
            .menu-item {
                display: table;
                height 54px
                padding: 0 12px;
                box-sizing border-box
                width 100%
                .item-content-wrapper {
                    display table-cell
                    vertical-align middle
                    width 56px
                    border-1px(#93999f)
                    .name {
                        font-size 12px
                        line-height 14px
                        color #93999f
                    }
                }
                &.current {
                    background-color #ffffff
                    position: relative;
                    top: -1px;
                    .name {
                        font-weight 700
                        color:#000
                    }
                    .item-content-wrapper:after {
                        border-none()
                    }
                }
                &:last-child {
                    .item-content-wrapper:after {
                        border-none()
                    }
                }
            }       
       }
       .foods-wrapper {
           flex:1
           overflow hidden
           .name {
               border-left 2px solid #d9dde1
               padding-left 14px
               background-color #f3f5f7
               font-size 12px
               color rgb(147,153,159)
               line-height 26px
           }
           .foods-item-wrapper {
               .foods-item {
                   display flex
                   padding 18px 0
                   margin 0 18px
                   font-size: 0
                   border-1px(rgba(7,17,27,0.1))
                   .image {
                       flex 0 1 64px
                       vertical-align top
                   }
                   .content {
                       flex 1
                       position relative
                       margin-left 10px
                       .title {
                           margin-top 2px
                           font-size 14px
                           color rgb(7,17,27)
                           line-height 14px
                       }
                       .descript {
                           margin-top 8px
                           font-size 10px
                           color rgb(147,153,159)
                           line-height 14px
                       }
                       .info {
                           margin-top 8px
                           line-height 10px
                           color rgb(147,153,159)
                           font-size 10px
                           .rating {
                               margin-left 12px
                           }
                       }
                       .price {
                            margin-top 8px
                            line-height 24px
                            .new-price {
                                font-size 14px
                                color rgb(240,20,20)
                                font-weight bold
                            }
                            .old-price {
                                margin-left 8px
                                font-size 10px
                                color rgb(147,153,159)
                                font-weight bold
                                text-decoration: line-through;
                            }
                       }
                       .cartcontrol-wrapper {
                            position: absolute;
                            right: 0;
                            bottom: 0;   
                        }
                   }
                   &:last-child:after {
                       border-none()
                   }
               }
           }
       }
    }
</style>


