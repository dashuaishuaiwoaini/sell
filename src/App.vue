<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <shoppingcar :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-food="selectedFood" v-ref:shopcart></shoppingcar>
    <router-view keep-alive :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from 'common/js/util';
  import shoppingcar from 'components/shoppingcar/shoppingcar';
  import header from 'components/header/header.vue';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        },
        goods: []
      };
    },
    created() {
      this.$http.get('seller').then(res => {
        res = res.body;
        if(res.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, res.data);
        } 
      }, res => {});
    },
    methods: {
        _drop(target) {
           this.$refs.shopcart.drop(target); 
        }
    },
    computed: {
        selectedFood() {
            let selectFood = [];
            this.goods.forEach((item) => {
                item.foods.forEach((subItem) => {
                    if(subItem.count) {
                        selectFood.push(subItem);
                    }
                });
            });
            return selectFood;
        }
    },
    components: {
      'v-header': header,
      shoppingcar
    },
    events: {
        'cart.add'(target) {
            this._drop(target);
        },
        'goods'(goods) {
          this.goods = goods;
        }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/mixin';
   .tab {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-1px(rgba(7, 17, 27, 0.1));
      .tab-item {
          flex: 1;
          text-align: center;
          & > a {
              display: block;
              font-size: 14px;
              color: rgb(77, 85, 93);
              &.active {
                color: rgb(240, 20, 20);
              }
          }
      }
   }
</style>
