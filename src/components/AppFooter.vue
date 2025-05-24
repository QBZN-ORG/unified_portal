<template>
  <!-- 页脚 -->
  <footer class="main-footer">
    <div class="footer-content">
      <div class="footer-sections">
        <!-- Logo区域 -->
        <div class="footer-logo">
          <router-link to="/">
            <img src="@/assets/logo_without_background.png" alt="清北智能科技" class="footer-logo-image" />
          </router-link>
          <div class="company-text">
            <h2>{{ companyName }}</h2>
            <p>{{ companySlogan }}</p>
          </div>
        </div>
        
        <!-- 导航区域 -->
        <div class="footer-nav">
          <div class="nav-item">
            <router-link to="/about">关于我们</router-link>
          </div>
          <div class="nav-item">
            <router-link to="/">产品服务</router-link>
          </div>
          <div class="nav-item">
            <router-link to="/">技术支持</router-link>
          </div>
        </div>
        
        <!-- 联系信息区域 -->
        <div class="contact-info">
          <div class="contact-icons">
            <div class="icon-wrapper">
              <el-icon><Location /></el-icon>
            </div>
            <div class="icon-wrapper">
              <el-icon><Message /></el-icon>
            </div>
            <div class="icon-wrapper">
              <el-icon><Phone /></el-icon>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 版权信息 -->
      <div class="copyright">
        <p>{{ copyrightText }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Location, Message, Phone } from '@element-plus/icons-vue';

// 定义props
defineProps({
  companyName: {
    type: String,
    default: '清北智能科技'
  },
  companySlogan: {
    type: String,
    default: '智能 CAD 解决方案提供商'
  },
  copyrightText: {
    type: String,
    default: '© 2025 浙江清北智能科技有限公司. 保留所有权利.'
  },
  socialLinks: {
    type: Array,
    default: () => [
      { icon: 'Location', url: '#' },
      { icon: 'Message', url: '#' },
      { icon: 'Phone', url: '#' }
    ]
  }
});
</script>

<style lang="scss" scoped>
// 页脚
.main-footer {
  background-color: #111827; // 更深的背景色，接近图片中的颜色
  color: white;
  padding: 2.5rem 0 1rem;
  width: 100%;
  margin-top: 6rem; // 增加与页面内容的间距
  
  .footer-content {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  .footer-sections {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
  
  .footer-logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
    }
    
    .footer-logo-image {
      height: 40px;
      width: auto;
    }
    
    .company-text {
      display: flex;
      flex-direction: column;
      
      h2 {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0;
      }
      
      p {
        color: #9ca3af;
        font-size: 0.9rem;
        margin-top: 0.25rem;
      }
    }
  }
  
  .footer-nav {
    display: flex;
    gap: 1.5rem;
    
    .nav-item {
      a {
        color: #ffffff;
        text-decoration: none;
        font-size: 0.95rem;
        transition: color 0.2s;
        
        &:hover {
          color: #60a5fa;
        }
      }
    }
  }
  
  .contact-info {
    .contact-icons {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.05);
        transition: all 0.2s;
        cursor: pointer;
        
        .el-icon {
          font-size: 1.2rem;
          color: #60a5fa;
        }
        
        &:hover {
          background-color: rgba(96, 165, 250, 0.2);
        }
      }
    }
  }
  
  .copyright {
    border-top: 1px solid #374151;
    margin-top: 2rem;
    padding-top: 1.5rem;
    text-align: center;
    
    p {
      color: #9ca3af;
      font-size: 0.85rem;
    }
  }
}
</style> 