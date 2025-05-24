<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->

<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <app-header 
      title="Tsingpe" 
      :dropdown-items="menuItems"
    />

    <!-- 主要内容区域 -->
    <main class="main-content">
      <div class="page-title">
        <h2>清北智能产品中心</h2>
        <p>请选择一项服务继续：</p>
      </div>

      <!-- 服务卡片区域 -->
      <div class="services-grid">
        <!-- CAD识别服务卡片 -->
        <div class="service-card" @click="openService('http://47.115.213.11:8093', true)">
          <div class="card-content">
            <div class="card-image-container">
              <img :src="cadRecognitionImage" alt="CAD识别服务" class="card-image" />
            </div>
            <h3 class="card-title">CAD识别服务</h3>
            <p class="card-domain">链接: cad_recognition.tsingpe-ai.cn</p>
            <button class="card-button" @click.stop="openService('http://47.115.213.11:8093', true)">打开服务</button>
          </div>
        </div>

        <!-- 机械CAD服务卡片 -->
        <div class="service-card" @click="openService('http://47.115.213.11:8092', true)">
          <div class="card-content">
            <div class="card-image-container">
              <img :src="mechanicalCadImage" alt="机械CAD服务" class="card-image" />
            </div>
            <h3 class="card-title">机械CAD服务</h3>
            <p class="card-domain">链接: mechanicalcad.tsingpe-ai.cn</p>
            <button class="card-button" @click.stop="openService('http://47.115.213.11:8092', true)">打开服务</button>
          </div>
        </div>

        <!-- 其他服务卡片 -->
        <div class="service-card" @click="openService('http://47.115.213.11:8090/about', false)">
          <div class="card-content">
            <div class="card-image-container">
              <img :src="dataAnalysisImage" alt="数据分析服务" class="card-image" />
            </div>
            <h3 class="card-title">其他服务</h3>
            <p class="card-domain">链接: data-analysis.tsingpe-ai.cn</p>
            <button class="card-button" @click.stop="openService('http://47.115.213.11:8090/about', false)">打开服务</button>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <app-footer 
      company-name="清北智能科技"
      company-slogan="智能 CAD 解决方案提供商"
      copyright-text="© 2025 浙江清北智能科技有限公司. 保留所有权利."
      :social-links="socialLinks"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import cadRecognitionImage from '../assets/images/cad_recognition.jpg';
import mechanicalCadImage from '../assets/images/mechanical_cad.jpg';
import dataAnalysisImage from '../assets/images/other.jpg';

// 固定的菜单项列表
const menuItems = ref([
  { 
    id: 1, 
    name: '产品介绍视频',
    type: 'video'
  },
  { 
    id: 'manual', 
    name: '用户使用指南',
    type: 'manual'
  }
]);

// 社交媒体链接
const socialLinks = ref([
  { icon: 'Location', url: '#' },
  { icon: 'Message', url: '#' },
  { icon: 'Phone', url: '#' }
]);

const openService = (url, newTab = true) => {
  if (newTab) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
};
</script>

<style lang="scss">
// 全局容器
.home-container {
  min-height: 100vh;
  width: 100%;
  background-color: #f9fafb; // bg-gray-50
}

// 主要内容区域
.main-content {
  width: 100%;
  padding: 3rem 1.5rem;
  
  .page-title {
    text-align: center;
    margin-bottom: 3rem;
    
    h2 {
      font-size: 2.25rem;
      font-weight: 700;
      color: #1f2937; // text-gray-800
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 1.125rem;
      color: #4b5563; // text-gray-600
    }
  }
}

// 服务卡片网格
.services-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  max-width: 1024px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .service-card {
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    transform: translateY(0);
    position: relative;
    border: 1px solid transparent;
    
    &:hover {
      box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.3);
      transform: translateY(-0.25rem);
      border: 1px solid rgba(59, 130, 246, 0.3);
      cursor: pointer;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 0.75rem;
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    &:hover::before {
      box-shadow: 0 0 25px 8px rgba(59, 130, 246, 0.4);
      opacity: 1;
    }
    
    .card-content {
      padding: 1.5rem;
    }
    
    .card-image-container {
      height: 12rem;
      margin-bottom: 1.5rem;
      border-radius: 0.5rem;
      overflow: hidden;
      
      .card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
      }
    }
    
    .card-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937; // text-gray-800
      margin-bottom: 0.5rem;
    }
    
    .card-domain {
      color: #4b5563; // text-gray-600
      margin-bottom: 1rem;
    }
    
    .card-button {
      background-color: #3b82f6; // bg-blue-500
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 0.375rem;
      transition: background-color 0.2s;
      cursor: pointer;
      white-space: nowrap;
      border: none;
      
      &:hover {
        background-color: #2563eb; // hover:bg-blue-600
      }
    }
  }
}
</style>

