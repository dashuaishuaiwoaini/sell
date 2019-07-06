<template>
  <div class="star" :class="starType">
      <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass" track-by="$index"></span>
  </div>
</template>
<script>
let LENGTH = 5;
let CLS_ON = 'on';
let CLS_OFF = 'off';
let CLS_HALF = 'half';
export default {
  props: ['size', 'score'],
  computed: {
      starType() {
          return 'star-' + this.size;
      },
      itemClasses() {
          let result = [];
          let score = Math.floor(this.score * 2) / 2;
          let hasDecimal = score % 1 !== 0;
          let integer = Math.floor(score);
          for(var i = 0; i < integer; i++) {
              result.push(CLS_ON);
          }
          if(hasDecimal) {
              result.push(CLS_HALF);
          }
          while(result.length < LENGTH) {
              result.push(CLS_OFF);
          }
          return result;
      }
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin';
    .star {
        display inline-block
        font-size 0
        &.star-48 {
            .star-item {
                width 20px
                height 20px
                background-size 20px 20px
                margin-right 22px
                &.on {
                    bg-image('star48_on')
                }
                &.off {
                    bg-image('star48_off')
                }
                &.half {
                    bg-image('star48_half')
                }
            }
        }
        &.star-36 {
            .star-item {
                width 15px
                height 15px
                background-size 15px 15px
                margin-right 6px
                &.on {
                    bg-image('star36_on')
                }
                &.off {
                    bg-image('star36_off')
                }
                &.half {
                    bg-image('star36_half')
                }
            }
        }
        &.star-24 {
            .star-item {
                width 10px
                height 10px
                background-size 10px 10px
                margin-right 3px
                &.on {
                    bg-image('star24_on')
                }
                &.off {
                    bg-image('star24_off')
                }
                &.half {
                    bg-image('star24_half')
                }
            }
        }
        .star-item {
            display inline-block
            background-repeat no-repeat 
            &:last-child {
                margin-right 0
            }
        }
    }
</style>
