<template>
    <div class="cartcontrol">
        <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click.stop="decreaseCart" transition="move"></div>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
    </div>
</template>
<script>
import Vue from 'vue';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
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
            decreaseCart(event) {
                if(!event._constructed) {
                    return;
                }
                this.food.count--;
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol {
        .cart-decrease, .cart-count, .cart-add {
            display inline-block
            line-height 24px
        }
        .cart-decrease, .cart-add {
            font-size 24px
            color rgb(0,160,220)
            padding 5px
        }
        .cart-decrease {
            transition all 0.4s linear
            &.move-transition {
                opacity 1
                transform translate3d(0, 0, 0);
                
            }
            &.move-enter, &.move-leave {
                opacity 0    
                transform translate3d(30px, 0, 0);
            }
        }
        .cart-count {
            width 12px
            vertical-align top
            padding-top 5px
            font-size 10px
            color rgb(147,153,159)
            text-align center    
        }
    }
</style>

