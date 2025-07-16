import { AnalysisData, AdviceData, StageInfo } from '@/types/analysis';

/**
 * 根据图片生成Mock分析数据
 */
export function generateMockAnalysisData(imageFile?: File): AnalysisData {
  if (!imageFile) {
    return getDefaultMockData();
  }

  // 根据文件名、大小等生成不同的数据
  const fileName = imageFile.name.toLowerCase();
  const fileSize = imageFile.size;
  const timestamp = Date.now();
  
  // 使用文件名和大小作为种子生成不同的数据
  const seed = fileName.length + fileSize + timestamp;
  const random = (min: number, max: number) => {
    return min + (seed % (max - min + 1));
  };

  // 根据文件名判断可能的阶段
  let stage = 1;
  if (fileName.includes('before') || fileName.includes('before')) {
    stage = 0;
  } else if (fileName.includes('after') || fileName.includes('after')) {
    stage = 2;
  } else if (fileName.includes('recovery') || fileName.includes('recovery')) {
    stage = 3;
  } else {
    stage = random(0, 3);
  }

  // 根据阶段生成相应的数据
  const stageData = {
    0: { density: random(20, 40), exposure: random(35, 60), parting: random(15, 25), babyHairs: false },
    1: { density: random(45, 65), exposure: random(20, 35), parting: random(8, 15), babyHairs: true },
    2: { density: random(65, 85), exposure: random(10, 25), parting: random(5, 12), babyHairs: true },
    3: { density: random(80, 95), exposure: random(5, 18), parting: random(3, 8), babyHairs: true }
  };

  const data = stageData[stage as keyof typeof stageData];

  return {
    density_score: data.density,
    scalp_exposure_percent: data.exposure,
    parting_width_px: data.parting,
    baby_hairs_visible: data.babyHairs,
    stage: stage,
    hairline_stability: stage >= 2,
    left_right_symmetry: stage >= 2 ? "正常" : "不对称"
  };
}

/**
 * 默认Mock数据
 */
function getDefaultMockData(): AnalysisData {
  return {
    density_score: 63,
    scalp_exposure_percent: 22.5,
    parting_width_px: 9.7,
    baby_hairs_visible: true,
    stage: 1,
    hairline_stability: true,
    left_right_symmetry: "正常"
  };
}

/**
 * 根据分析数据生成Mock建议
 */
export function generateMockAdviceData(analysisData: AnalysisData): AdviceData {
  const { stage, density_score, scalp_exposure_percent } = analysisData;
  
  const stageAdvice = {
    0: {
      summary: "检测到掉发期特征，建议及时就医咨询",
      advice: "请保持规律作息，减少压力，考虑专业治疗"
    },
    1: {
      summary: "发现新生绒毛，恢复初见成效！",
      advice: "继续保持营养补充，坚持记录变化，耐心等待"
    },
    2: {
      summary: "恢复进展良好，密度明显改善",
      advice: "继续坚持当前方案，定期拍照记录进展"
    },
    3: {
      summary: "恢复效果显著，已进入稳定期",
      advice: "继续保持良好习惯，定期检查维护"
    }
  };

  return stageAdvice[stage as keyof typeof stageAdvice] || stageAdvice[1];
}

// 保持向后兼容
export const mockAnalysisData = getDefaultMockData();
export const mockAdviceData = generateMockAdviceData(mockAnalysisData);

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