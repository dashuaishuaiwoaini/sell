<template>
  <div class="seller" v-el:seller-wrapper>
    <div class="seller-wrapper">
      <div class="overview">
        <div class="name">{{seller.name}}</div>
        <div class="star-wrapper border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="sell-count">({{seller.sellCount}})</span>
          <span class="sell-count">月售{{seller.sellCount}}单</span>
        </div>
        <div class="favourite">
          <span class="icon-favorite" :class="{on: isFavourite}" @click="collect"></span>
          <div class="text" v-show="!isFavourite">收藏</div>
          <div class="text" v-show="isFavourite">已收藏</div>
        </div>
        <div class="detail">
          <ul class="detail-list">
            <li class="detail-item">
              <div class="text">起送价</div>
              <div class="price-wrapper">
                <span class="price">{{seller.minPrice}}</span>
                <span class="unit">元</span>
              </div>
            </li>
            <li class="detail-item">
              <div class="text">商家配送</div>
              <div class="price-wrapper">
                <span class="price">{{seller.deliveryPrice}}</span>
                <span class="unit">元</span>
              </div>
            </li>
            <li class="detail-item">
              <div class="text">平均配送时间</div>
              <div class="price-wrapper">
                <span class="price">{{seller.deliveryTime}}</span>
                <span class="unit">分钟</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="bulletin-wrapper">
        <div class="title">公告与活动</div>
        <div class="bulletin border-1px">{{seller.bulletin}}</div>
        <div class="supports-wrapper">
          <ul class="supports-list">
            <li class="supports-item border-1px" v-for="item in seller.supports">
              <support-icon :type="item.type" :size="4" style="vertical-align: middle;"></support-icon>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="real">
        <div class="title">商家实景</div>
        <div class="pics" v-el:pic-wrapper>
          <ul class="pic-list" v-el:pic-list>
            <li class="pic-item" v-for="item in seller.pics">
              <img :src="item" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="business-wrapper">
        <div class="title border-1px">商家信息</div>
        <div class="info-wrapper">
          <ul class="info-list">
            <li class="info-item border-1px" v-for="item in seller.infos">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from 'components/star/star';
import split from 'components/split/split';
import supportIcon from 'components/icon/icon';
import BScroll from 'better-scroll';
import {setDate, getDate} from 'common/js/util';
export default {
    props: {
        seller: {
          type: Object
        }
    },
    data() {
      return {
        isFavourite: getDate(this.seller.id, 'isFavourite') ? getDate(this.seller.id, 'isFavourite') : false
      };
    },
    ready() {
      this._initScroll();
      this._initPics();
    },
    watch: {
      'seller': function() {
        this._initScroll();
        this._initPics();
      }
    },
    methods: {
      _initScroll() {
        if(!this.sellerScroll) {
          this.sellerScroll = new BScroll(this.$els.sellerWrapper, {
             click: true
          });
        } else {
          this.sellerScroll.refresh();
        }
      },
      _initPics() {
        if(this.seller.pics && this.seller.pics.length > 0) {
          let width = this.seller.pics.length * 126 - 6;
          this.$els.picList.style.width = width + 'px';
          this.$nextTick(() => {
            this.picScroll = new BScroll(this.$els.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          });
        }
      },
      collect(event) {
        if(!event._constructed) return;
        this.isFavourite = !this.isFavourite;
        setDate(this.seller.id, 'isFavourite', this.isFavourite);
      }
    },
    components: {
      star,
      split,
      supportIcon
    }
};
</script>

<style  lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin';

  .seller {
    position absolute
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .seller-wrapper {
      padding-bottom 20px
      .overview {
        position: relative
        margin 18px 18px 0 18px
        .name {
          font-size 14px
          color rgb(7,17,27)
          line-height 14px
          margin-bottom 8px
        }
        .star-wrapper {
          font-size 0
          padding-bottom 18px
          border-1px(rgba(7,17,27,0.1))
          .sell-count {
            font-size 10px
            color rgb(77,85,93)
            line-height 18px
            vertical-align top
            margin-left 12px
          }
        }
        .favourite {
          position: absolute;
          width: 40px
          top: 0;
          right: 0;
          text-align: center;
          .icon-favorite {
            font-size: 24px;
            line-height: 24px;
            color: rgb(77,85,93)
            &.on {
              color: rgb(240,20,20);
            }
          }
          .text {
            margin-top: 4px
            font-size: 10px;
            color: rgb(77,85,93);
            line-height: 10px;
          }
        }
        .detail {
          padding 18px 0
          .detail-list {
            display flex
            .detail-item {
              flex 1
              text-align center
              .text {
                font-size 10px
                color rgb(147,153,159)
                line-height 10px
                margin-bottom 4px
              }
              .price-wrapper {
                font-size:0
                .price {
                 font-size 24px
                 font-weight 200
                 color rgb(7,17,27)
                 line-height 24px 
                }
                .unit {
                  font-size 10px
                  color rgb(7,17,27)
                }
              }
            }
          }
        }
      }
      .bulletin-wrapper {
        margin 0 18px
        .title {
          margin-top 18px
          font-size: 14px;
          color: #07111b;
          margin-bottom: 8px;
        }
        .bulletin {
          padding 0 12px
          font-size 12px
          font-weight 200
          color rgb(240,20,20)
          line-height 24px
          padding-bottom 16px
          border-1px(rgba(7,17,27,0.1))
        }
        .supports-wrapper {
          .supports-list {
            .supports-item {
              padding 16px 12px
              border-1px(rgba(7,17,27,0.1))
              &:last-child:after {
                border-none()
              }
              .text {
                vertical-align: middle;
                font-size 12px
                font-weight 200
                color rgb(7,17,27)
                line-height 16px
              }
            }
          }
        }
      }
      .real {
        margin 18px
        .title {
          font-size: 14px;
          color: #07111b;
          margin-bottom: 12px;
        }
        .pics {
          .pic-list {
            white-space nowrap
            .pic-item {
              display inline-block
              margin-right 6px
              &:last-child {
                margin-right 0
              }
            }
          }
        }
      }
      .business-wrapper {
        margin 0 18px
        .title {
          margin-top 18px
          font-size: 14px;
          color: #07111b;
          padding-bottom: 12px;
          border-1px(rgba(7,17,27,0.1))
        }
        .info-wrapper {
          .info-list {
            .info-item {
              padding: 16px 12px
              border-1px(rgba(7,17,27,0.1))
              font-size: 12px
              font-weight: 200
              color: rgb(7,17,27)
              line-height: 16px
            }
          }
        }
      }
    }
  }
</style>