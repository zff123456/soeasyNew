<template>
    <div class="container">
       <div class="nav" >
            <div @click="toother(1)" class="item">
                <img :src="require('@/assets/image/score/sj_03.png')" style="margin-top: 70px">
                <div style="margin-top: 10px;font-size: 20px;font-weight: bold">成绩统计</div>
            </div>
            <div @click="toother(2)" class="item">
                <img :src="require('@/assets/image/score/sj_05.png')" style="margin-top:70px">
                <div style="margin-top: 10px;font-size: 20px;font-weight: bold">错题统计</div>
            </div><div @click="toother(3)" class="item">
            <img :src="require('@/assets/image/score/j_09.png')" style="margin-top: 70px">
            <div style="margin-top: 10px;font-size: 20px;font-weight: bold">视频统计</div>
        </div><div @click="toother(4)" class="item">
            <img :src="require('@/assets/image/score/sj_10.png')" style="margin-top:70px">
            <div style="margin-top: 10px;font-size: 20px;font-weight: bold">直播统计</div>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "chengji",
        data(){
            return {

            }
        },
        mounted(){

        },
        methods: {
            toother(val){
                if(val==1){ this.$router.push('/score')}
                if(val==2){ this.$router.push('/Error_statistics')}
                if(val==3){ this.$router.push('/Video_statistics')}
                if(val==4){ this.$router.push('/Live_broadcast_statistics')}
            },
            }

    }

</script>

<style scoped>

.container{
    width:100%;
    min-height:100%;
    background:url('../../assets/image/score/scorebg.png') no-repeat;
    background-size:100% 100%;
    border-top:1px solid transparent;
    /* padding-top:61px; */
}
    .bg{
        position: fixed;
        width: 100%;
    }
    .nav{
        width: 550px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-left: 250px;
        margin-top: 150px;

    }
    .item{
        width:250px;
        height: 250px;
        background: #fff;
        margin-top: 20px;
        border-radius: 10px;
        margin-left: 20px;
        text-align: center;
        cursor: pointer;
        color: #393939;
    }


</style>