<template>
  <div class="wrapper" style="margin-top:70px;">
      其他试卷
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {
    back(){
       this.$router.go(-1);//返回上一层
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.wrapper{}
</style>