<template>
    <div class="com-title">
        <div class="line"></div>
        <div class="text">{{text}}</div>
        <div class="line"></div>
    </div>
</template>
<script>
export default {
  props: ['text']
};
</script>
<style lang="stylus">
    .com-title {
        display flex
        .line{
            flex 1
            border-bottom 1px solid rgba(255,255,255,0.2)
            position: relative;
            top: -6px;
        }
        .text {
            font-size 14px
            font-weight 700
            line-height 14px
            padding 0 12px
        }
    }
</style>
