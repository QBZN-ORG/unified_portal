<template>
  <div class="about-container">
    <app-header 
      title="Tsingpe" 
      :dropdown-items="menuItems"
      @select-item="handleMenuSelect"
    />
    
    <main class="about-content">
      <div class="main-container">
        <h2 class="content-title">
          <span class="title-text">产品介绍视频</span>
        </h2>
        
        <div v-if="selectedVideo" class="video-section">
          <div class="video-wrapper">
            <video-player 
              :video-src="selectedVideo.url" 
              :title="selectedVideo.name"
              :autoplay="true"
              @ended="onVideoEnded"
            />
          </div>
          <div class="video-description">
            <h3>{{ selectedVideo.name }}</h3>
            <p>{{ selectedVideo.description }}</p>
          </div>
        </div>
        <div v-else class="no-video-message">
          <h3>请从右侧导航栏选择一个视频</h3>
          <p>或者点击上方的"首页"返回主页面。</p>
        </div>
      </div>
      
      <!-- 右侧浮动导航栏 -->
      <div class="sidebar">
        <div class="sidebar-header">
          <h3>视频导航</h3>
        </div>
        <div class="video-list">
          <div 
            v-for="item in videoFiles" 
            :key="item.id" 
            class="video-item"
            :class="{ 'active': selectedVideo && selectedVideo.id === item.id }"
            @click="selectVideo(item)"
          >
            <div class="video-thumb">
              <img :src="getVideoThumbnail(item.id)" :alt="item.name" />
            </div>
            <div class="video-info">
              <h4>{{ item.name }}</h4>
              <span>{{ getVideoDuration(item.id) }}</span>
            </div>
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
// 导入组件
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import VideoPlayer from '../components/VideoPlayer.vue';

// 导入图片
import thumbnail1 from '../assets/images/video_thumbnail_1.jpg';

// 导入视频配置
import { VIDEO_PATHS } from '../config/videoConfig';

const router = useRouter();
const route = useRoute();

// 视频文件列表
const videoFiles = ref([
{ 
    id: 1, 
    name: '清北智能产品介绍', 
    url: VIDEO_PATHS.productIntro, // 使用配置中的视频路径
    description: '这段视频展示了我们的产品特点及应用场景，包括CAD识别技术以及机械CAD服务，展示了我们如何为您提供智能化的CAD解决方案。'
  }
]);

// 固定的菜单项列表
const menuItems = ref([
  { 
    id: 1, 
    name: '产品介绍视频',
    type: 'video'
  }
]);

// 社交媒体链接
const socialLinks = ref([
  { icon: 'Location', url: '#' },
  { icon: 'Message', url: '#' },
  { icon: 'Phone', url: '#' }
]);

// 当前选中的视频
const selectedVideo = ref(null);

// 选择视频
const selectVideo = (video) => {
  selectedVideo.value = videoFiles.value.find(v => v.id === video.id);
};

// 处理菜单选择
const handleMenuSelect = (item) => {
  if (item.type === 'video') {
    router.push({ path: '/about', query: { videoId: item.id } });
  } else if (item.type === 'manual') {
    router.push({ path: '/manual' });
  }
};

// 视频播放完毕的处理函数
const onVideoEnded = () => {
  console.log('视频播放结束');
  // 可以在这里添加视频结束后的逻辑
};

// 获取视频缩略图
const getVideoThumbnail = (id) => {
  // 使用导入的图片资源
  const thumbnails = {
    1: thumbnail1
  };
  return thumbnails[id] || 'https://via.placeholder.com/120x80.png';
};

// 获取视频时长
const getVideoDuration = (id) => {
  // 这里可以根据视频ID返回对应的时长
  const durations = {
    1: '10:00',
    2: '15:30',
    3: '20:15',
    4: '12:45'
  };
  return durations[id] || '00:00';
};

// 监听导航栏首页按钮点击，跳转到Home页面
const goToHome = () => {
  router.push('/');
};

// 页面加载时读取URL参数
onMounted(() => {
  // 检查URL中是否有videoId参数
  const videoId = route.query.videoId;
  if (videoId) {
    // 将字符串转换为数字
    const id = parseInt(videoId);
    const video = videoFiles.value.find(v => v.id === id);
    if (video) {
      selectedVideo.value = video;
    }
  } else {
    // 如果没有videoId参数，默认选择第一个视频
    if (videoFiles.value.length > 0) {
      selectedVideo.value = videoFiles.value[0];
    }
  }
});
</script>

<style lang="scss" scoped>
.about-container {
  min-height: 100vh;
  width: 100%;
  background-color: #f9fafb; // bg-gray-50
  display: flex;
  flex-direction: column;
}

.about-content {
  flex: 1;
  padding: 2rem 1.5rem 2rem 1rem;
  max-width: 1380px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  gap: 8rem;
  position: relative;
}

.main-container {
  flex: 1.5;
  min-width: 0;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 1.5rem 1.5rem 2rem;
}

.content-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0.5rem 0 1.5rem;
  display: flex;
  align-items: center;
  position: relative;
  
  .title-text {
    padding-left: 1rem;
    border-left: 4px solid #3b82f6;
  }

}

.video-section {
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  overflow: hidden;
  padding: 0;
  width: 100%;
}

.video-wrapper {
  width: 100%;
  margin: 0 0 1.5rem 0;
  background-color: #000;
  border-radius: 4px;
  overflow: hidden;
}

:deep(.video-player-container) {
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: #000;
  
  video {
    width: 100%;
    max-height: 75vh;
    object-fit: contain;
    display: block;
    border-radius: 0;
    
    &:fullscreen,
    &:-webkit-full-screen,
    &:-moz-full-screen,
    &:-ms-fullscreen {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      max-height: 100vh !important;
      max-width: 100vw !important;
      object-fit: fill !important;
      margin: 0 !important;
      padding: 0 !important;
      z-index: 9999 !important;
    }
  }
}

/* 添加全屏相关样式 */
:deep(:fullscreen),
:deep(:-webkit-full-screen),
:deep(:-moz-full-screen),
:deep(:-ms-fullscreen) {
  background-color: black !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100vw !important;
  max-height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}

:deep(.video-player-container:fullscreen),
:deep(.video-player-container:-webkit-full-screen),
:deep(.video-player-container:-moz-full-screen),
:deep(.video-player-container:-ms-fullscreen) {
  position: fixed !important;
  inset: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  background-color: black !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0 !important;
  padding: 0 !important;
  max-width: 100vw !important;
  max-height: 100vh !important;
  z-index: 9999 !important;
}

/* 为document.documentElement添加全屏样式 */
:deep(html:fullscreen),
:deep(html:-webkit-full-screen),
:deep(html:-moz-full-screen),
:deep(html:-ms-fullscreen) {
  width: 100vw !important;
  height: 100vh !important;
  background-color: black !important;
  
  body {
    width: 100vw !important;
    height: 100vh !important;
    background-color: black !important;
  }
}

.video-description {
  padding: 1.5rem 0;
  
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1rem;
    color: #4b5563;
    line-height: 1.75;
  }
}

.no-video-message {
  text-align: center;
  padding: 6rem 0;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1.125rem;
    color: #6b7280;
  }
}

// 侧边栏样式
.sidebar {
  width: 300px;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  max-height: fit-content;
  align-self: flex-start;
  
  .sidebar-header {
    background-color: #3b82f6;
    color: white;
    padding: 1rem;
    
    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
    }
  }
  
  .video-list {
    padding: 0.5rem;
  }
  
  .video-item {
    display: flex;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-bottom: 0.5rem;
    
    &:hover {
      background-color: #e0f2fe;
    }
    
    &.active {
      background-color: #dbeafe;
      border-left: 3px solid #3b82f6;
    }
    
    .video-thumb {
      width: 100px; // 减小缩略图尺寸
      height: 70px;
      border-radius: 0.25rem;
      overflow: hidden;
      margin-right: 0.5rem;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .video-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      h4 {
        font-size: 0.875rem; // 减小字体尺寸
        font-weight: 600;
        color: #1f2937;
        margin: 0 0 0.25rem 0;
      }
      
      span {
        font-size: 0.75rem;
        color: #6b7280;
      }
    }
  }
}

// 媒体查询，适应不同屏幕大小
@media (max-width: 1024px) {
  .about-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    margin-top: 1.5rem;
    max-height: none;
  }
}
</style>
