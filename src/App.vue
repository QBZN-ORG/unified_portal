<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <div class="app-container">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style>
.app-container {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

/* 重置一些Vue默认样式 */
#app {
  max-width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
