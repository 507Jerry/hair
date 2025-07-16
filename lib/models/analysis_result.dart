import 'package:hair_recovery_ai/models/recovery_stage.dart';

/**
 * 单图分析结果模型
 */
class AnalysisResult {
  final double scalpExposurePercentage; // 头皮暴露面积百分比
  final double hairlineWidth; // 发缝宽度（像素）
  final bool hasVellusHair; // 是否有绒毛
  final int densityScore; // 毛发密度评分（0-100）
  final String aiAdvice; // AI 建议
  final RecoveryStage stage; // 恢复阶段
  final DateTime analysisDate; // 分析日期

  AnalysisResult({
    required this.scalpExposurePercentage,
    required this.hairlineWidth,
    required this.hasVellusHair,
    required this.densityScore,
    required this.aiAdvice,
    required this.stage,
    required this.analysisDate,
  });

  /**
   * 从 JSON 创建实例
   */
  factory AnalysisResult.fromJson(Map<String, dynamic> json) {
    return AnalysisResult(
      scalpExposurePercentage: json['scalpExposurePercentage']?.toDouble() ?? 0.0,
      hairlineWidth: json['hairlineWidth']?.toDouble() ?? 0.0,
      hasVellusHair: json['hasVellusHair'] ?? false,
      densityScore: json['densityScore'] ?? 0,
      aiAdvice: json['aiAdvice'] ?? '',
      stage: RecoveryStage.values[json['stage'] ?? 0],
      analysisDate: DateTime.parse(json['analysisDate']),
    );
  }

  /**
   * 转换为 JSON
   */
  Map<String, dynamic> toJson() {
    return {
      'scalpExposurePercentage': scalpExposurePercentage,
      'hairlineWidth': hairlineWidth,
      'hasVellusHair': hasVellusHair,
      'densityScore': densityScore,
      'aiAdvice': aiAdvice,
      'stage': stage.index,
      'analysisDate': analysisDate.toIso8601String(),
    };
  }

  /**
   * 获取密度等级描述
   */
  String get densityLevel {
    if (densityScore >= 80) return '优秀';
    if (densityScore >= 60) return '良好';
    if (densityScore >= 40) return '一般';
    if (densityScore >= 20) return '较差';
    return '很差';
  }

  /**
   * 获取状态颜色
   */
  String get statusColor {
    if (densityScore >= 60) return 'success';
    if (densityScore >= 40) return 'warning';
    return 'error';
  }
}

/**
 * 双图对比结果模型
 */
class ComparisonResult {
  final AnalysisResult beforeResult; // 之前的结果
  final AnalysisResult afterResult; // 之后的结果
  final double scalpExposureChange; // 头皮暴露面积变化
  final double hairlineWidthChange; // 发缝宽度变化
  final bool vellusHairImprovement; // 绒毛改善情况
  final String trendSummary; // 趋势总结
  final RecoveryStage currentStage; // 当前阶段

  ComparisonResult({
    required this.beforeResult,
    required this.afterResult,
    required this.scalpExposureChange,
    required this.hairlineWidthChange,
    required this.vellusHairImprovement,
    required this.trendSummary,
    required this.currentStage,
  });

  /**
   * 获取改善程度
   */
  String get improvementLevel {
    if (scalpExposureChange < -5) return '显著改善';
    if (scalpExposureChange < -2) return '明显改善';
    if (scalpExposureChange < 0) return '轻微改善';
    if (scalpExposureChange < 2) return '基本稳定';
    return '需要关注';
  }

  /**
   * 获取趋势图标
   */
  String get trendIcon {
    if (scalpExposureChange < -5) return '📈';
    if (scalpExposureChange < -2) return '📊';
    if (scalpExposureChange < 0) return '📉';
    if (scalpExposureChange < 2) return '➡️';
    return '⚠️';
  }
} 