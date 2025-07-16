import { AnalysisData, AdviceData, StageInfo } from '@/types/analysis';

/**
 * Mock分析数据
 */
export const mockAnalysisData: AnalysisData = {
  density_score: 63,
  scalp_exposure_percent: 22.5,
  parting_width_px: 9.7,
  baby_hairs_visible: true,
  stage: 1,
  // 可选字段
  hairline_stability: true,
  left_right_symmetry: "正常"
};

/**
 * Mock建议数据
 */
export const mockAdviceData: AdviceData = {
  summary: "你正处于新生绒毛期，恢复初见成效！",
  advice: "建议继续保持营养补充和规律作息，坚持记录变化"
};

/**
 * 恢复阶段信息
 */
export const stageInfo: Record<number, StageInfo> = {
  0: {
    stage: 0,
    name: "掉发期",
    description: "暴露明显，无绒毛",
    color: "red",
    emoji: "🟥"
  },
  1: {
    stage: 1,
    name: "新生绒毛期",
    description: "开始恢复",
    color: "orange",
    emoji: "🟧"
  },
  2: {
    stage: 2,
    name: "增长期",
    description: "发缝收窄",
    color: "yellow",
    emoji: "🟨"
  },
  3: {
    stage: 3,
    name: "稳定维护期",
    description: "基本恢复",
    color: "green",
    emoji: "🟩"
  }
};

/**
 * 模拟图片质量检测
 */
export const mockQualityCheck = () => {
  return {
    isClear: true,
    hasGoodLighting: true,
    hasHairRegion: true,
    overallQuality: 'high' as const,
    suggestions: []
  };
};

/**
 * 模拟分析进度
 */
export const mockAnalysisSteps = [
  "图片质量检测",
  "AI特征分析",
  "生成分析报告"
];

/**
 * 获取置信度评分
 */
export const getConfidenceScore = (quality: 'high' | 'medium' | 'low'): number => {
  switch (quality) {
    case 'high':
      return 85;
    case 'medium':
      return 70;
    case 'low':
      return 55;
    default:
      return 70;
  }
}; 