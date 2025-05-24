/**
 * 视频服务器配置
 * 根据不同环境提供不同的视频服务器URL
 * 使用Docker部署方式，同一个Nginx服务器同时提供网站和视频
 */

// 开发环境使用本地服务器
const DEV_VIDEO_SERVER = window.location.origin;

// 生产环境也使用当前域名，因为网站和视频由同一个服务提供
const PROD_VIDEO_SERVER = window.location.origin;

// 根据当前环境导出正确的服务器地址
const VIDEO_SERVER = import.meta.env.PROD ? PROD_VIDEO_SERVER : DEV_VIDEO_SERVER;

// 视频路径配置
export const VIDEO_PATHS = {
  productIntro: `${VIDEO_SERVER}/videos/products.mp4`,
  // 可以添加更多视频
};

export default VIDEO_SERVER; 