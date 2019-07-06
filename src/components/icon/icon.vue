<template>
    <div class="com-icon" :class="supportSize">
        <span :class="classMap[type]" class="icon"></span>
    </div>
</template>
<script>
// size 1,2,3,4代表图标样式
    export default {
        props: ['type', 'size'],
        data() {
            return {
                classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
            };
        },
        computed: {
            supportSize() {
                return 'icon-' + this.size;
            }
        }
    };
</script>
<style lang="stylus">
@import '../../common/stylus/mixin';
    .com-icon {
        display inline-block
        font-size 0
        .icon {
            display inline-block
            background-repeat no-repeat
        }
        &.icon-1 {
            .icon {
                width 12px
                height 12px
                background-size 12px 12px
            }
            .decrease {
                bg-image('decrease_1');
            }
            .discount {
                bg-image('discount_1');
            }
            .special {
                bg-image('special_1');
            }
            .invoice {
                bg-image('invoice_1');
            }
            .guarantee {
                bg-image('guarantee_1');
            }
        }
        &.icon-2 {
            .icon {
                width 16px
                height 16px
                background-size 16px 16px
            }
            .decrease {
                bg-image('decrease_2');
            }
            .discount {
                bg-image('discount_2');
            }
            .special {
                bg-image('special_2');
            }
            .invoice {
                bg-image('invoice_2');
            }
            .guarantee {
                bg-image('guarantee_2');
            }
        }
        &.icon-3 {
            .icon {
                width 12px
                height 12px
                background-size 12px 12px
            }
            .decrease {
                bg-image('decrease_3');
            }
            .discount {
                bg-image('discount_3');
            }
            .special {
                bg-image('special_3');
            }
            .invoice {
                bg-image('invoice_3');
            }
            .guarantee {
                bg-image('guarantee_3');
            }
        }
        &.icon-4 {
            .icon {
                width 16px
                height 16px
                background-size 16px 16px
            }
            .decrease {
                bg-image('decrease_4');
            }
            .discount {
                bg-image('discount_4');
            }
            .special {
                bg-image('special_4');
            }
            .invoice {
                bg-image('invoice_4');
            }
            .guarantee {
                bg-image('guarantee_4');
            }
        }
    }
</style>
