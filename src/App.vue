<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
  import Header from "@/components/Header/Header";
  import Footer from "@/components/Footer/Footer";

  export default {
    name: 'App',
    components: {
      Header,
      Footer
    },
    mounted() {
      //获取三级联动的数据
      this.$store.dispatch('home/getTypeNavAction')
    }
  }
</script>

<style></style>
