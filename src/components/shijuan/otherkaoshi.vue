<template>
    <div style="padding-top: 80px;background-color: #f0f0f0;"    >
            <div class="other-box"  v-loading="loading" element-loading-text="暂无数据"  element-loading-spinner="el-icon-loading">
                没有内容
            </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped lang="less">
.other-box{
    width:92%;
    margin:0 auto;
    background-color: #fff;
}
</style>
