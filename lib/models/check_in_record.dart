import 'package:hair_recovery_ai/models/recovery_stage.dart';

/**
 * 打卡记录模型
 */
class CheckInRecord {
  final DateTime date; // 打卡日期
  final bool tookSupplements; // 是否服用补剂
  final bool washedHair; // 是否洗头
  final bool tookPhoto; // 是否拍照
  final String? notes; // 备注

  CheckInRecord({
    required this.date,
    required this.tookSupplements,
    required this.washedHair,
    required this.tookPhoto,
    this.notes,
  });

  /**
   * 从 JSON 创建实例
   */
  factory CheckInRecord.fromJson(Map<String, dynamic> json) {
    return CheckInRecord(
      date: DateTime.parse(json['date']),
      tookSupplements: json['tookSupplements'] ?? false,
      washedHair: json['washedHair'] ?? false,
      tookPhoto: json['tookPhoto'] ?? false,
      notes: json['notes'],
    );
  }

  /**
   * 转换为 JSON
   */
  Map<String, dynamic> toJson() {
    return {
      'date': date.toIso8601String(),
      'tookSupplements': tookSupplements,
      'washedHair': washedHair,
      'tookPhoto': tookPhoto,
      'notes': notes,
    };
  }

  /**
   * 获取完成项目数量
   */
  int get completedItems {
    int count = 0;
    if (tookSupplements) count++;
    if (washedHair) count++;
    if (tookPhoto) count++;
    return count;
  }

  /**
   * 获取完成率
   */
  double get completionRate {
    return completedItems / 3.0;
  }

  /**
   * 获取完成状态描述
   */
  String get completionStatus {
    if (completionRate >= 1.0) return '全部完成';
    if (completionRate >= 0.67) return '大部分完成';
    if (completionRate >= 0.33) return '部分完成';
    return '完成较少';
  }
}

/**
 * 周报数据模型
 */
class WeeklyReport {
  final DateTime weekStart; // 周开始日期
  final DateTime weekEnd; // 周结束日期
  final double averageScalpExposure; // 平均头皮暴露面积
  final int photoUploadCount; // 拍照上传次数
  final RecoveryStage? stageChange; // 阶段变化
  final String aiSummary; // AI 总结
  final List<CheckInRecord> checkInRecords; // 本周打卡记录

  WeeklyReport({
    required this.weekStart,
    required this.weekEnd,
    required this.averageScalpExposure,
    required this.photoUploadCount,
    this.stageChange,
    required this.aiSummary,
    required this.checkInRecords,
  });

  /**
   * 获取平均打卡完成率
   */
  double get averageCheckInRate {
    if (checkInRecords.isEmpty) return 0.0;
    
    double totalRate = 0.0;
    for (var record in checkInRecords) {
      totalRate += record.completionRate;
    }
    return totalRate / checkInRecords.length;
  }

  /**
   * 获取趋势描述
   */
  String get trendDescription {
    if (averageScalpExposure < 20) return '恢复效果显著';
    if (averageScalpExposure < 25) return '恢复进展良好';
    if (averageScalpExposure < 30) return '恢复稳定进行';
    return '需要更多关注';
  }
} 