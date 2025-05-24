<template>
  <!-- 顶部导航栏 -->
  <header class="main-header">
    <div class="header-content">
      <div class="logo-container">
        <router-link to="/" class="logo-link" @click="goToHome">
          <img src="@/assets/logo_characters_without_bg.png" alt="清北智能" class="logo-image" />
        </router-link>
      </div>
      <nav class="main-nav">
        <router-link to="/" class="nav-link">
          <el-icon class="nav-icon"><HomeFilled /></el-icon>
          首页
        </router-link>
        <div class="dropdown" ref="dropdownRef">
          <button @click="toggleDropdown" class="dropdown-button">
            <el-icon class="nav-icon"><Document /></el-icon>
            静态内容
            <el-icon class="dropdown-icon" :class="{ 'rotate-icon': isDropdownOpen }"><ArrowDown /></el-icon>
          </button>
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <div class="dropdown-content">
              <a 
                v-for="(item, index) in dropdownItems" 
                :key="index" 
                href="#" 
                class="dropdown-item"
                @click.prevent="selectItem(item)"
              >
                {{ item.name }}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ArrowDown, HomeFilled, Document } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 定义props
defineProps({
  title: {
    type: String,
    default: 'Tsingpe'
  },
  dropdownItems: {
    type: Array,
    default: () => []
  }
});

// 定义事件
const emit = defineEmits(['select-item']);

// 下拉菜单状态
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

// 切换下拉菜单
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// 跳转到首页
const goToHome = () => {
  router.push('/');
};

// 选择项目
const selectItem = (item) => {
  emit('select-item', item);
  
  // 根据类型跳转到不同页面
  if (item.type === 'video') {
    // 跳转到About页面，并传递视频ID作为查询参数
    router.push({ path: '/about', query: { videoId: item.id } });
  } else if (item.type === 'manual') {
    // 跳转到用户使用指南页面
    router.push({ path: '/manual' });
  }
  
  isDropdownOpen.value = false;
};

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="scss" scoped>
// 顶部导航栏
.main-header {
  width: 100%;
  background-image: linear-gradient(to right, #4942E4, #3b82f6); /* 更精确地匹配图片中的蓝紫色渐变 */
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  .header-content {
    width: 100%;
    padding: 0.6rem 1.5rem; /* 微调顶部padding */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
  }
  
  .logo-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: opacity 0.2s;
    color: white;
    
    &:hover {
      opacity: 0.9;
    }
  }
  
  .logo-image {
    height: 36px; /* 调整logo图片高度 */
    width: auto;
    object-fit: contain;
    margin-right: 10px;
  }
  
  .site-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
  }
  
  .main-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  .nav-link {
    color: white;
    white-space: nowrap;
    transition: all 0.2s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 6px 10px;
    border-radius: 0.375rem;
    text-decoration: none;
    
    &:hover, &.router-link-active {
      color: #ffffff; // 纯白色以增加对比度
      background-color: rgba(255, 255, 255, 0.15);
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
    }
  }
  
  .nav-icon {
    font-size: 1.1em;
    margin-right: 2px;
  }
  
  .dropdown {
    position: relative;
    
    .dropdown-button {
      display: flex;
      align-items: center;
      color: white;
      white-space: nowrap;
      transition: all 0.2s ease;
      cursor: pointer;
      border-radius: 0.375rem;
      background: transparent;
      border: none;
      gap: 5px;
      padding: 6px 10px;
      
      &:hover {
        color: #ffffff; // 纯白色以增加对比度
        background-color: rgba(255, 255, 255, 0.15);
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
      }
    }
    
    .dropdown-icon {
      margin-left: 2px;
      transition: transform 0.2s;
      
      &.rotate-icon {
        transform: rotate(180deg);
      }
    }
    
    .dropdown-menu {
      position: absolute;
      right: 0;
      margin-top: 0.5rem;
      width: 16rem;
      background-color: white;
      border-radius: 0.375rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 10;
    }
    
    .dropdown-content {
      padding: 0.5rem 0;
    }
    
    .dropdown-item {
      display: block;
      padding: 0.5rem 1rem;
      color: #1f2937; // text-gray-800
      transition: background-color 0.2s;
      cursor: pointer;
      
      &:hover {
        background-color: #e0f2fe; // hover:bg-blue-100
      }
    }
  }
}
</style> 