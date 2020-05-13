<template>
    <div id="play">
        <div  class="prism-player" id="J_prismPlayer"></div>

    </div>
</template>
<style scoped>
    #J_prismPlayer{
        height: 610px !important;
        width: 90% !important;
        margin-left: 5% !important;
        margin-top: 100px !important;
        position: absolute;
    }
</style>

<script>
    export default {

        mounted: function() {
            var player = new Aliplayer({
                id: 'J_prismPlayer',
                autoplay: false,
                prismType: 2,
                vid: 'db09b2332a554166beeb747277660ee8',
                accId: 'STS.NJcpLE6Thqth9uhrvTYcnCjjv',
                accSecret: '9DiQyic6TDUQ8A87vaP4lxquUDkHHx9alpXvsqnV2U8J',
                apiKey: '',
                showBarTime: 3000000,
            },function(player){
                console.log('播放器创建好了。')
            });
        }
    }
</script>