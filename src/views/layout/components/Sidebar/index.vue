<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <div class="logo" @click="toHome">
      <img src="/static/images/logo.png"
           style="transform:translate(0px, -4px);width:26px;vertical-align: middle;"></img>
      <!--<svg-icon iconClass="rotate" style="margin-right:0px;"></svg-icon>-->
      <span v-if="!isCollapse">{{ config.shortTitle }}</span>
    </div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#ffffff"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routers"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {BaseVue} from '@lib'
  import SidebarItem from './SidebarItem'
  import {constantRouterMap, asyncRouterMap} from '@/router'
  import Vue from 'vue'

  export default {
    components: {SidebarItem},
    mixins: [BaseVue],
    computed: {
      ...mapGetters(['permission_routers', 'sidebar']),
      routers() {
        if (Vue.config.login_type === 'pass') {
          return constantRouterMap.concat(asyncRouterMap)
        }
        else {   //If u wan't to pass login, take effect this line
          return this.permission_routers
        }
      },
      isCollapse() {
        return !this.sidebar.opened
      },
      menuDisable() {
        return !(this.$route.name === 'dashboard' && this.platform === null)
      },

    },
    data(){
      return {
        config: Vue.config,
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .logo {
    height: 50px;
    background: #409EFF;
    font-size: 20px;
    font-weight: bold;
    color: white;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }
</style>
