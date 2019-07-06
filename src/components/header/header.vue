<template>
    <div class="header">
      <div class="content-wrapper">
        <div class="avator">
          <img :src="seller.avatar" alt="" width="64" height="64">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand">
            </span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div class="support" v-if="seller.supports">
            <support-icon :type="seller.supports[0].type" :size="1"></support-icon>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div class="support-count" v-if="seller.supports && seller.supports.length > 0" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="bulletin-wrapper">
        <span class="bulletin"></span>
        <span class="bulletin-text">{{seller.bulletin}}</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
      <div class="background">
        <img :src="seller.avatar">
      </div>
      <div class="detail" v-show="detailShow" transition="fade">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>  
            </div>
            <div class="title-wrapper">
              <title :text="'优惠信息'"></title>
            </div>
            <ul class="supports">
              <li class="support-item" v-for="item in seller.supports" track-by="$index">
                <support-icon :type="seller.supports[$index].type" :size="2" style="vertical-align: middle;"></support-icon>
                <span class="text">{{seller.supports[$index].description}}</span>
              </li>
            </ul>
            <div class="title-wrapper">
              <title :text="'商家公告'"></title>
            </div>
            <div class="bulletin">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="closeDetail"></i>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import star from 'components/star/star';
import title from 'components/title/title';
import supportIcon from 'components/icon/icon';
  export default {
      props: ['seller'],
      data() {
        return {
          detailShow: false
        };
      },
      methods: {
        showDetail() {
          this.detailShow = true;
        },
        closeDetail() {
          this.detailShow = false;
        }
      },
      components: {
        star,
        title,
        supportIcon
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin';
  .header {
    position relative
    overflow hidden
    .content-wrapper {
      position relative
      padding: 24px 12px 18px 24px;
      background:  rgba(7,17,27,0.5);
      color: #ffffff;
      font-size 0
      .avator {
        display: inline-block;
        vertical-align top
      }
      .content {
        display: inline-block;
        font-size 14px;
        margin-left 16px
        .title {
          margin 2px 0 8px 0
          .brand {
            width: 30px;
            height 18px;
            display inline-block
            bg-image('brand');
            background-size 30px 18px 
            background-repeat no-repeat
            vertical-align top
          }
          .name {
            margin-left 6px
            font-size 16px
            font-weight bold
            line-height 18px
          }
        }
        .description {
          font-size 12px
          font-weight 200
          line-height 12px
          margin-bottom 10px
        }
        .support {
          margin-bottom 2px
          .text {
            font-size 10px
            font-weight 200
            line-height 12px
            vertical-align top
          }
        }
      }
      .support-count {
        position absolute
        bottom 18px
        right 12px
        background-color rgba(0,0,0,0.2)
        padding: 7px 8px;
        border-radius: 15px;
        height 24px
        line-height 24px
        .count {
          font-size 10px
        }
        .icon-keyboard_arrow_right {
          font-size 10px
          margin-left 2px
        }
      }
    }
    .bulletin-wrapper {
      position relative
      height 28px
      line-height 28px
      background rgba(7,17,27,0.2)
      padding 0 22px 0 12px
      color #ffffff
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      .bulletin {
        display inline-block
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
        vertical-align middle
      }
      .bulletin-text {
        font-size 10px
        font-weight 200
        margin-left 4px
      }
      .icon-keyboard_arrow_right {
        position absolute
        right 12px
        top 8px
      }
    }
    .background {
      position absolute
      width 100%
      height 100%
      top: 0;
      z-index: -1;
      filter: blur(10px);
    }
    .detail {
      position fixed
      width 100%
      height 100%
      overflow auto
      top 0
      z-index 100
      color #ffffff
      background rgba(7,17,27,0.8) 
      -webkit-backdrop-filter blur(10px)
      transition all 0.5s
      &.fade-transition {
        opacity 1
      }
      &.fade-enter, &.fade-leave {
        opacity 0
      }
      .detail-wrapper {
        min-height 100%
        width 100%
        .detail-main {
          margin-top 64px
          padding-bottom 64px
          .name {
            font-size 16px
            font-weight 700
            line-height 16px
            text-align center
          }
          .star-wrapper {
            margin-top: 16px;
            padding: 2px 0;
            text-align: center;
            font-size: 0;
          }
          .title-wrapper {
            width 80%
            margin 0 auto
            margin 28px auto 24px auto
          }
          .supports {
            width 80%
            margin 0 auto
            padding-left 12px
            font-size 12px
            font-weight 200
            line-height 24px
            font-size 0
            .text{
              vertical-align middle
              font-size 12px
              font-weight 200
              margin-left 6px
            }
          }
          .bulletin {
            width 77%
            margin 0 auto
            font-size 12px
            font-weight 200
            line-height 24px
          }
        }
      }
      .detail-close {
        margin: -64px auto 0 auto;
        width 32px
        height 32px
        font-size 32px
        .icon-close {
          color: rgba(255,255,255,0.5)
        }
      }
    }
  }
</style>