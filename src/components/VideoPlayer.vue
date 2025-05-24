<template>
  <div class="video-player-container">
    <div class="video-wrapper">
      <video
        ref="videoRef"
        class="video-element"
        :src="videoSrc"
        @timeupdate="updateProgress"
        @loadedmetadata="videoLoaded"
        preload="metadata"
        @ended="videoEnded"
      ></video>
      
      <!-- 视频控件 -->
      <div class="video-controls">
        <div class="progress-container" @click="seek">
          <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
        </div>
        
        <div class="controls-main">
          <button class="control-button" @click="togglePlay">
            <span v-if="!isPlaying" class="play-icon">▶</span>
            <span v-else class="pause-icon">⏸</span>
          </button>
          
          <div class="time-display">
            {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
          </div>
          
          <div class="volume-container">
            <button class="control-button" @click="toggleMute">
              <span v-if="isMuted" class="mute-icon">🔇</span>
              <span v-else class="volume-icon">🔊</span>
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              v-model="volume" 
              class="volume-slider" 
              @input="updateVolume"
            />
          </div>
          
          <div class="speed-control">
            <select v-model="playbackRate" @change="changePlaybackRate" class="speed-select">
              <option value="0.5">0.5x</option>
              <option value="1.0" selected>1.0x</option>
              <option value="1.5">1.5x</option>
              <option value="2.0">2.0x</option>
            </select>
          </div>
          
          <button class="control-button" @click="toggleFullscreen">
            <span class="fullscreen-icon">⛶</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

// 定义props
const props = defineProps({
  videoSrc: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  autoplay: {
    type: Boolean,
    default: false
  }
});

// 定义事件
const emit = defineEmits(['ended']);

// 视频元素引用
const videoRef = ref(null);

// 视频状态
const isPlaying = ref(false);
const isMuted = ref(false);
const duration = ref(0);
const currentTime = ref(0);
const progress = ref(0);
const volume = ref(1.0);
const playbackRate = ref('1.0');

// 播放/暂停切换
const togglePlay = () => {
  const video = videoRef.value;
  if (!video) return;
  
  if (isPlaying.value) {
    video.pause();
    isPlaying.value = false;
  } else {
    video.play();
    isPlaying.value = true;
  }
};

// 静音切换
const toggleMute = () => {
  const video = videoRef.value;
  if (!video) return;
  
  video.muted = !video.muted;
  isMuted.value = video.muted;
};

// 更新音量
const updateVolume = () => {
  const video = videoRef.value;
  if (!video) return;
  
  video.volume = volume.value;
  if (video.volume === 0) {
    isMuted.value = true;
  } else {
    isMuted.value = false;
  }
};

// 更新进度条
const updateProgress = () => {
  const video = videoRef.value;
  if (!video) return;
  
  currentTime.value = video.currentTime;
  progress.value = (video.currentTime / video.duration) * 100;
};

// 视频加载完成
const videoLoaded = () => {
  const video = videoRef.value;
  if (!video) return;
  
  duration.value = video.duration;
  
  if (props.autoplay) {
    togglePlay();
  }
};

// 视频结束事件
const videoEnded = () => {
  isPlaying.value = false;
  emit('ended');
};

// 跳转到指定位置
const seek = (event) => {
  const video = videoRef.value;
  if (!video) return;
  
  const progressContainer = event.currentTarget;
  const clickPosition = event.offsetX / progressContainer.offsetWidth;
  video.currentTime = clickPosition * video.duration;
};

// 切换全屏
const toggleFullscreen = () => {
  const videoContainer = videoRef.value?.closest('.video-wrapper');
  if (!videoContainer) return;
  
  try {
    if (!document.fullscreenElement) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
    }
  } catch (err) {
    console.error(`无法切换全屏模式: ${err.message}`);
  }
};

// 修改播放速度
const changePlaybackRate = () => {
  const video = videoRef.value;
  if (!video) return;
  
  video.playbackRate = parseFloat(playbackRate.value);
};

// 格式化时间显示
const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds)) return '00:00';
  
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// 监听videoSrc变化，重置播放器
watch(() => props.videoSrc, () => {
  const video = videoRef.value;
  if (!video) return;
  
  // 重置状态
  isPlaying.value = false;
  currentTime.value = 0;
  progress.value = 0;
  
  // 加载新视频后可以自动播放
  video.load();
  if (props.autoplay) {
    video.play().then(() => {
      isPlaying.value = true;
    }).catch(error => {
      console.error('自动播放失败:', error);
    });
  }
});

// 给文档添加一个全屏样式类，当视频全屏时应用
onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.addEventListener('mozfullscreenchange', handleFullscreenChange);
  document.addEventListener('MSFullscreenChange', handleFullscreenChange);
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
  document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
  
  const video = videoRef.value;
  if (video && !video.paused) {
    video.pause();
  }
});

// 处理全屏状态变化
const handleFullscreenChange = () => {
  const isFullscreen = !!document.fullscreenElement || 
                      !!document.webkitFullscreenElement || 
                      !!document.mozFullScreenElement ||
                      !!document.msFullscreenElement;
                      
  // 如果全屏，确保视频填满整个屏幕
  if (isFullscreen) {
    const videoElement = videoRef.value;
    if (videoElement) {
      videoElement.style.objectFit = 'fill';
      videoElement.style.width = '100vw';
      videoElement.style.height = '100vh';
      videoElement.style.position = 'fixed';
      videoElement.style.top = '0';
      videoElement.style.left = '0';
      videoElement.style.right = '0'; 
      videoElement.style.bottom = '0';
      videoElement.style.zIndex = '9999';
    }
    
    // 针对视频容器也设置样式
    const videoContainer = videoElement?.closest('.video-wrapper');
    if (videoContainer) {
      videoContainer.style.position = 'fixed';
      videoContainer.style.top = '0';
      videoContainer.style.left = '0';
      videoContainer.style.right = '0';
      videoContainer.style.bottom = '0';
      videoContainer.style.width = '100vw';
      videoContainer.style.height = '100vh';
      videoContainer.style.backgroundColor = '#000';
    }
  } else {
    // 退出全屏时恢复原始样式
    const videoElement = videoRef.value;
    if (videoElement) {
      videoElement.style.objectFit = '';
      videoElement.style.width = '';
      videoElement.style.height = '';
      videoElement.style.position = '';
      videoElement.style.top = '';
      videoElement.style.left = '';
      videoElement.style.right = '';
      videoElement.style.bottom = '';
      videoElement.style.zIndex = '';
    }
    
    // 恢复视频容器的样式
    const videoContainer = videoElement?.closest('.video-wrapper');
    if (videoContainer) {
      videoContainer.style.position = '';
      videoContainer.style.top = '';
      videoContainer.style.left = '';
      videoContainer.style.right = '';
      videoContainer.style.bottom = '';
      videoContainer.style.width = '';
      videoContainer.style.height = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.video-player-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  .video-title {
    padding: 1rem;
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    background-color: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
  }
}

.video-wrapper {
  position: relative;
  background-color: #000;
  width: 100%;
  
  &:hover .video-controls {
    opacity: 1;
  }
  
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
    margin: 0 !important;
    padding: 0 !important;
    background-color: #000 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    
    .video-element {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      max-height: none !important;
      object-fit: fill !important;
      margin: 0 !important;
      padding: 0 !important;
      z-index: 1 !important; 
    }
    
    .video-controls {
      z-index: 10 !important;
      bottom: 0 !important;
      width: 100% !important;
    }
  }
}

.video-element {
  width: 100%;
  display: block;
  max-height: 70vh;
  background-color: black;
}

@media screen {
  :fullscreen .video-element,
  :-webkit-full-screen .video-element, 
  :-moz-full-screen .video-element,
  :-ms-fullscreen .video-element {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    object-fit: fill !important;
  }
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 1rem;
  transition: opacity 0.3s;
  opacity: 0;
}

.progress-container {
  width: 100%;
  height: 5px;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 3px;
  
  .progress-bar {
    height: 100%;
    background-color: #3b82f6;
    border-radius: 3px;
  }
}

.controls-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}

.control-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.time-display {
  font-size: 0.875rem;
  font-family: monospace;
  margin: 0 1rem;
}

.volume-container {
  display: flex;
  align-items: center;
  
  .volume-slider {
    width: 80px;
    height: 5px;
    -webkit-appearance: none;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: white;
      cursor: pointer;
    }
  }
}

.speed-control {
  .speed-select {
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    cursor: pointer;
    
    &:focus {
      outline: none;
    }
  }
}
</style> 