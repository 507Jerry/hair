import 'package:flutter/material.dart';
import 'package:hair_recovery_ai/models/analysis_result.dart';
import 'package:hair_recovery_ai/models/check_in_record.dart';
import 'package:hair_recovery_ai/models/recovery_stage.dart';

/**
 * 应用全局状态管理
 * 
 * 管理应用的核心状态，包括分析模式、结果、打卡记录等
 */
class AppState extends ChangeNotifier {
  // 分析模式：单图分析 vs 双图对比
  AnalysisMode _analysisMode = AnalysisMode.single;
  
  // 选中的图片
  List<String> _selectedImages = [];
  
  // 分析结果
  AnalysisResult? _currentAnalysisResult;
  
  // 打卡记录
  List<CheckInRecord> _checkInRecords = [];
  
  // 恢复阶段
  RecoveryStage _currentStage = RecoveryStage.stage0;
  
  // 是否正在分析
  bool _isAnalyzing = false;

  // Getters
  AnalysisMode get analysisMode => _analysisMode;
  List<String> get selectedImages => _selectedImages;
  AnalysisResult? get currentAnalysisResult => _currentAnalysisResult;
  List<CheckInRecord> get checkInRecords => _checkInRecords;
  RecoveryStage get currentStage => _currentStage;
  bool get isAnalyzing => _isAnalyzing;

  /**
   * 切换分析模式
   */
  void switchAnalysisMode(AnalysisMode mode) {
    _analysisMode = mode;
    _selectedImages.clear();
    _currentAnalysisResult = null;
    notifyListeners();
  }

  /**
   * 添加选中的图片
   */
  void addSelectedImage(String imagePath) {
    if (_selectedImages.length < 2) {
      _selectedImages.add(imagePath);
      notifyListeners();
    }
  }

  /**
   * 移除选中的图片
   */
  void removeSelectedImage(int index) {
    if (index >= 0 && index < _selectedImages.length) {
      _selectedImages.removeAt(index);
      notifyListeners();
    }
  }

  /**
   * 清空选中的图片
   */
  void clearSelectedImages() {
    _selectedImages.clear();
    notifyListeners();
  }

  /**
   * 开始分析
   */
  void startAnalysis() {
    _isAnalyzing = true;
    notifyListeners();
  }

  /**
   * 完成分析
   */
  void completeAnalysis(AnalysisResult result) {
    _currentAnalysisResult = result;
    _isAnalyzing = false;
    _currentStage = result.stage;
    notifyListeners();
  }

  /**
   * 添加打卡记录
   */
  void addCheckInRecord(CheckInRecord record) {
    _checkInRecords.add(record);
    notifyListeners();
  }

  /**
   * 获取连续打卡天数
   */
  int get consecutiveCheckInDays {
    if (_checkInRecords.isEmpty) return 0;
    
    int consecutiveDays = 0;
    DateTime currentDate = DateTime.now();
    
    for (int i = _checkInRecords.length - 1; i >= 0; i--) {
      DateTime recordDate = _checkInRecords[i].date;
      if (currentDate.difference(recordDate).inDays <= consecutiveDays) {
        consecutiveDays++;
      } else {
        break;
      }
    }
    
    return consecutiveDays;
  }

  /**
   * 获取今日是否已打卡
   */
  bool get hasCheckedInToday {
    DateTime today = DateTime.now();
    return _checkInRecords.any((record) => 
      record.date.year == today.year &&
      record.date.month == today.month &&
      record.date.day == today.day
    );
  }
}

/**
 * 分析模式枚举
 */
enum AnalysisMode {
  single, // 单图分析
  compare, // 双图对比
} 