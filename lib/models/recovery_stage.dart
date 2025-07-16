/**
 * 头发恢复阶段枚举
 * 
 * 定义用户头发恢复的不同阶段
 */
enum RecoveryStage {
  stage0, // 持续掉发期
  stage1, // 新生绒毛期
  stage2, // 密度增长期
  stage3, // 稳定维护期
}

/**
 * 恢复阶段工具类
 */
class RecoveryStageHelper {
  /**
   * 获取阶段描述
   */
  static String getStageDescription(RecoveryStage stage) {
    switch (stage) {
      case RecoveryStage.stage0:
        return '持续掉发期';
      case RecoveryStage.stage1:
        return '新生绒毛期';
      case RecoveryStage.stage2:
        return '密度增长期';
      case RecoveryStage.stage3:
        return '稳定维护期';
    }
  }

  /**
   * 获取阶段图标
   */
  static String getStageIcon(RecoveryStage stage) {
    switch (stage) {
      case RecoveryStage.stage0:
        return '🔴';
      case RecoveryStage.stage1:
        return '🟡';
      case RecoveryStage.stage2:
        return '🟢';
      case RecoveryStage.stage3:
        return '🟦';
    }
  }

  /**
   * 获取阶段建议
   */
  static String getStageAdvice(RecoveryStage stage) {
    switch (stage) {
      case RecoveryStage.stage0:
        return '建议及时就医，调整生活习惯，避免压力过大';
      case RecoveryStage.stage1:
        return '绒毛出现是好兆头，继续保持健康作息，补充营养';
      case RecoveryStage.stage2:
        return '密度正在增长，坚持当前方案，定期拍照记录';
      case RecoveryStage.stage3:
        return '已达到稳定状态，继续保持，定期检查维护';
    }
  }

  /**
   * 根据头皮暴露面积和密度判断阶段
   */
  static RecoveryStage determineStage({
    required double scalpExposurePercentage,
    required int densityScore,
    required bool hasVellusHair,
  }) {
    if (scalpExposurePercentage > 30) {
      return RecoveryStage.stage0;
    } else if (hasVellusHair && scalpExposurePercentage < 30) {
      return RecoveryStage.stage1;
    } else if (densityScore >= 60 && densityScore <= 80) {
      return RecoveryStage.stage2;
    } else if (densityScore > 80 && scalpExposurePercentage < 18) {
      return RecoveryStage.stage3;
    } else {
      return RecoveryStage.stage1; // 默认阶段
    }
  }
} 