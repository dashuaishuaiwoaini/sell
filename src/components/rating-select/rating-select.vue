<template>
    <div class="rating-select-com">
        <div class="block-wrapper border-1px">
            <div class="block-item up" :class="{'active': type === 'ALL'}" @click="changeType('ALL', $event)">{{desc[0]}} {{ratings.length}}</div>
            <div class="block-item up" :class="{'active': type === 'POSITIVE'}" @click="changeType('POSITIVE', $event)">{{desc[1]}} {{positiveCount}}</div>
            <div class="block-item down" :class="{'active': type === 'NEGATIVE'}" @click="changeType('NEGATIVE', $event)">{{desc[2]}} {{negativeCount}}</div>
        </div>
        <div class="only-content">
            <span class="icon-check_circle" @click="onlyContent" :class="{'active': hasContent}"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        ratings: {
            type: Array,
            default: function() {
                return [];
            }
        },
        desc: {
            type: Array
        }
    },
    data() {
        return {
            type: 'ALL',
            hasContent: false
        };
    },
    computed: {
        positiveCount() {
            let positiveArr = this.ratings.filter((item) => {
                return item.rateType === 0;
            });
            return positiveArr.length;
        },
        negativeCount() {
            let negativeArr = this.ratings.filter((item) => {
                return item.rateType === 1;
            });
            return negativeArr.length;
        }
    },
    methods: {
        changeType(type, event) {
            if(!event._constructed) {
                return;
            }
            this.type = type;
            this.$dispatch('select-type', type);
        },
        onlyContent(event) {
            if(!event._constructed) {
                return;
            }
            this.hasContent = !this.hasContent;
            this.$dispatch('only-content', this.hasContent);
        }
    }
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixin';

    .rating-select-com {
        .block-wrapper {
            padding-bottom 18px
            font-size 0
            border-1px(rgba(7,17,27,0.1))
            .block-item {
                display inline-block
                padding 8px
                margin-right 8px
                font-size 12px
                line-height 16px
                border-radius 6px
                color rgb(77,85,93)
                &.up {
                    background-color rgba(0,160,220,0.2)
                    &.active {
                        color #ffffff
                        background-color rgb(0,160,220)
                    }
                }
                &.down {
                    background-color rgba(77,85,93,0.2)
                    &.active {
                        color #ffffff
                        background-color rgb(77,85,93)
                    }
                }
            }
        }
        .only-content {
            font-size 0
            margin 12px 0
            color rgb(147,153,159)
            .icon-check_circle {
                font-size 20px
                vertical-align middle
                margin-right 4px
                &.active {
                    color green
                }
            }
            .text {
                vertical-align middle
                font-size 12px
            } 
        }
    }
</style>
