// 测试API配置
require('dotenv').config({ path: '.env.local' });

console.log('=== API 配置测试 ===');
console.log('API Key 是否存在:', !!process.env.NEXT_PUBLIC_OPENAI_API_KEY);
console.log('API Key 前缀:', process.env.NEXT_PUBLIC_OPENAI_API_KEY?.substring(0, 10) + '...');

// 模拟API配置检查
const API_CONFIG = {
  OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'your-api-key-here',
};

function checkApiConfig() {
  return API_CONFIG.OPENAI_API_KEY !== 'your-api-key-here' && 
         API_CONFIG.OPENAI_API_KEY !== '';
}

console.log('API 配置检查结果:', checkApiConfig());
console.log('=== 测试完成 ==='); 