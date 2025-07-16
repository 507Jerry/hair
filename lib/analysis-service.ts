import { AnalysisData, AdviceData, QualityCheckResult } from '@/types/analysis';
import { callVisionAPI, callTextAPI, fileToBase64, checkApiConfig } from './api-config';

/**
 * 图片质量检测服务（如需可扩展为真实API）
 */
export async function checkImageQuality(imageFile: File): Promise<QualityCheckResult> {
  // 这里可接入真实图片质量检测API，目前直接返回高质量
  return {
    isClear: true,
    hasGoodLighting: true,
    hasHairRegion: true,
    overallQuality: 'high',
    suggestions: []
  };
}

/**
 * 图片分析服务（仅调用真实API）
 */
export async function analyzeImage(imageFile: File): Promise<AnalysisData> {
  if (!checkApiConfig()) {
    throw new Error('未配置OpenAI API密钥，无法进行分析');
  }
  const imageBase64 = await fileToBase64(imageFile);
  const result = await callVisionAPI(imageBase64);
  if (
    result &&
    typeof result.density_score === 'number' &&
    typeof result.scalp_exposure_percent === 'number' &&
    typeof result.parting_width_px === 'number' &&
    typeof result.baby_hairs_visible === 'boolean' &&
    typeof result.stage === 'number'
  ) {
    return result as AnalysisData;
  } else {
    throw new Error('API返回数据格式不正确');
  }
}

/**
 * 生成建议服务（仅调用真实API）
 */
export async function generateAdvice(analysisData: AnalysisData): Promise<AdviceData> {
  if (!checkApiConfig()) {
    throw new Error('未配置OpenAI API密钥，无法生成建议');
  }
  const result = await callTextAPI(analysisData);
  if (result && typeof result.summary === 'string' && typeof result.advice === 'string') {
    return result as AdviceData;
  } else {
    throw new Error('API返回数据格式不正确');
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