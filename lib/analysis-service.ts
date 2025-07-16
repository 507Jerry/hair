import { AnalysisData, AdviceData, QualityCheckResult } from '@/types/analysis';
import { mockAnalysisData, mockAdviceData, mockQualityCheck } from './mock-data';
import { callVisionAPI, callTextAPI, fileToBase64, checkApiConfig } from './api-config';

/**
 * 图片质量检测服务
 */
export async function checkImageQuality(imageFile: File): Promise<QualityCheckResult> {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 实际项目中这里会调用真实的图片质量检测API
  // 目前使用Mock数据
  return mockQualityCheck();
}

/**
 * 图片分析服务
 */
export async function analyzeImage(imageFile: File): Promise<AnalysisData> {
  try {
    // 检查API配置
    if (checkApiConfig()) {
      // 使用真实的GPT-4o Vision API
      const imageBase64 = await fileToBase64(imageFile);
      const result = await callVisionAPI(imageBase64);
      
      // 验证返回的数据格式
      if (result && typeof result.density_score === 'number' &&
          typeof result.scalp_exposure_percent === 'number' &&
          typeof result.parting_width_px === 'number' &&
          typeof result.baby_hairs_visible === 'boolean' &&
          typeof result.stage === 'number') {
        return result as AnalysisData;
      } else {
        console.warn('API返回数据格式不正确，使用Mock数据');
        return mockAnalysisData;
      }
    } else {
      // 使用Mock数据
      console.log('未配置API密钥，使用Mock数据');
      await new Promise(resolve => setTimeout(resolve, 3000)); // 模拟延迟
      return mockAnalysisData;
    }
  } catch (error) {
    console.error('API调用失败，使用Mock数据:', error);
    // 如果API调用失败，回退到Mock数据
    await new Promise(resolve => setTimeout(resolve, 3000));
    return mockAnalysisData;
  }
}

/**
 * 生成建议服务
 */
export async function generateAdvice(analysisData: AnalysisData): Promise<AdviceData> {
  try {
    // 检查API配置
    if (checkApiConfig()) {
      // 使用真实的GPT-4文本API
      const result = await callTextAPI(analysisData);
      
      // 验证返回的数据格式
      if (result && typeof result.summary === 'string' && typeof result.advice === 'string') {
        return result as AdviceData;
      } else {
        console.warn('API返回数据格式不正确，使用Mock数据');
        return mockAdviceData;
      }
    } else {
      // 使用Mock数据
      console.log('未配置API密钥，使用Mock数据');
      await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟延迟
      return mockAdviceData;
    }
  } catch (error) {
    console.error('API调用失败，使用Mock数据:', error);
    // 如果API调用失败，回退到Mock数据
    await new Promise(resolve => setTimeout(resolve, 2000));
    return mockAdviceData;
  }
}

/**
 * 完整的分析流程
 */
export async function performFullAnalysis(imageFile: File): Promise<{
  analysisData: AnalysisData;
  adviceData: AdviceData;
  confidence: number;
}> {
  try {
    // 1. 图片质量检测
    const qualityCheck = await checkImageQuality(imageFile);
    
    // 2. 图片分析
    const analysisData = await analyzeImage(imageFile);
    
    // 3. 生成建议
    const adviceData = await generateAdvice(analysisData);
    
    // 4. 计算置信度
    const confidence = qualityCheck.overallQuality === 'high' ? 85 : 
                     qualityCheck.overallQuality === 'medium' ? 70 : 55;
    
    return {
      analysisData,
      adviceData,
      confidence
    };
  } catch (error) {
    throw new Error('分析过程中出现错误，请重试');
  }
}

/**
 * 验证文件格式
 */
export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: '请上传 JPG 或 PNG 格式的图片'
    };
  }
  
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: '图片大小不能超过 10MB'
    };
  }
  
  return { isValid: true };
} 