<template>
  <div class="manual-container">
    <app-header 
      title="Tsingpe" 
      :dropdown-items="menuItems"
      @select-item="handleMenuSelect"
    />
    
    <main class="manual-content">
      <div class="manual-wrapper">
        <h1 class="manual-title">
          <span class="title-text">用户使用指南</span>
        </h1>
        
        <div class="manual-section">
          <h2>欢迎使用清北智能科技产品</h2>
          <p>本指南将帮助您快速上手我们的产品，了解各项功能的使用方法和最佳实践。</p>
          
          <div class="section-card">
            <h3>1. 产品概述</h3>
            <p>清北智能科技专注于提供智能CAD解决方案，我们的产品能够帮助工程设计人员提高工作效率，减少重复劳动，优化设计流程。主要产品包括：</p>
          </div>
          
          <div class="section-card">
            <h3>2. 使用入门</h3>
          </div>
          
          <div class="section-card">
            <h3>3. 核心功能</h3>
          </div>
          
          <div class="section-card">
            <h3>4. 常见问题</h3>
          </div>
        </div>
      </div>
    </main>
    
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
import { useRouter } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';

const router = useRouter();

// 导航菜单项
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

// 处理菜单选择
const handleMenuSelect = (item) => {
  if (item.type === 'video') {
    router.push({ path: '/about', query: { videoId: item.id } });
  }
};
</script>

<style lang="scss" scoped>
.manual-container {
  min-height: 100vh;
  width: 100%;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
}

.manual-content {
  flex: 1;
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.manual-wrapper {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.manual-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  position: relative;
  
  .title-text {
    padding-left: 1rem;
    border-left: 4px solid #3b82f6;
  }
}

.manual-section {
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.05rem;
    color: #4b5563;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
  
  .section-card {
    background-color: #f9fafb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-left: 3px solid #3b82f6;
    
    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
    }
    
    ul, ol {
      margin-left: 1.5rem;
      margin-bottom: 1rem;
      
      li {
        margin-bottom: 0.5rem;
        color: #4b5563;
        line-height: 1.6;
      }
    }
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
    
    .feature-item {
      background-color: white;
      border-radius: 0.5rem;
      padding: 1.25rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      
      h4 {
        font-size: 1.1rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.75rem;
      }
      
      p {
        font-size: 0.95rem;
        margin-bottom: 0;
      }
    }
  }
  
  .faq-item {
    margin-bottom: 1.5rem;
    
    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }
    
    p {
      margin-bottom: 0.75rem;
    }
  }
  
  .resource-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
    
    .resource-link {
      display: block;
      background-color: white;
      border-radius: 0.5rem;
      padding: 1rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      .resource-title {
        display: block;
        font-size: 1rem;
        font-weight: 600;
        color: #2563eb;
        margin-bottom: 0.5rem;
      }
      
      .resource-desc {
        display: block;
        font-size: 0.875rem;
        color: #6b7280;
      }
    }
  }
  
  .link {
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

// 媒体查询，适应小屏幕
@media (max-width: 768px) {
  .manual-wrapper {
    padding: 1.5rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .resource-list {
    grid-template-columns: 1fr;
  }
}
</style> 