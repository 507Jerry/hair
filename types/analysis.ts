/**
 * 头发分析数据结构
 */
export interface AnalysisData {
  density_score: number; // 头发密度评分（0-100）
  scalp_exposure_percent: number; // 头皮暴露率（百分比）
  parting_width_px: number; // 发缝宽度（像素）
  baby_hairs_visible: boolean; // 是否可见新生绒毛
  stage: number; // 当前恢复阶段（0-3）
  
  // 可选字段（进阶功能）
  hairline_stability?: boolean; // 发际线是否稳定
  left_right_symmetry?: string; // 左右头发对称情况
}

/**
 * 建议数据结构
 */
export interface AdviceData {
  summary: string; // 状态总结
  advice: string; // 恢复建议
}

/**
 * 分析状态
 */
export interface AnalysisState {
  imageFile: File | null;
  imagePreview: string | null;
  isAnalyzing: boolean;
  analysisProgress: number;
  analysisStep: string;
  analysisResults: AnalysisData | null;
  adviceData: AdviceData | null;
  confidence: number;
  error: string | null;
}

/**
 * 图片质量检测结果
 */
export interface QualityCheckResult {
  isClear: boolean;
  hasGoodLighting: boolean;
  hasHairRegion: boolean;
  overallQuality: 'high' | 'medium' | 'low';
  suggestions: string[];
}

/**
 * 恢复阶段信息
 */
export interface StageInfo {
  stage: number;
  name: string;
  description: string;
  color: string;
  emoji: string;
}

/**
 * 指标卡片数据
 */
export interface MetricCardData {
  title: string;
  value: string | number;
  unit?: string;
  status: 'good' | 'medium' | 'poor';
  icon: string;
  description: string;
} 