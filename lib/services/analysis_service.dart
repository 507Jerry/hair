import 'dart:math';
import 'package:hair_recovery_ai/models/analysis_result.dart';
import 'package:hair_recovery_ai/models/recovery_stage.dart';
import 'package:hair_recovery_ai/providers/app_state.dart';
import 'package:hair_recovery_ai/services/gpt_api_service.dart';

/**
 * 分析服务
 * 
 * 提供图片分析功能，目前使用模拟数据
 */
class AnalysisService {
  static final Random _random = Random();

  /**
   * 分析图片
   */
  static Future<AnalysisResult> analyzeImages(
    List<String> imagePaths,
    AnalysisMode mode,
  ) async {
    if (imagePaths.isEmpty) {
      throw Exception('没有选择图片');
    }
    
    // 检查是否配置了 GPT API
    if (GptApiService.isApiKeyConfigured()) {
      // 使用 GPT API 进行分析
      return await GptApiService.analyzeHairImage(imagePaths.first);
    } else {
      // 使用模拟数据
      await Future.delayed(const Duration(seconds: 2));
      
      // 生成模拟分析结果
      final scalpExposurePercentage = 20.0 + _random.nextDouble() * 15.0;
      final hairlineWidth = 50.0 + _random.nextDouble() * 30.0;
      final hasVellusHair = _random.nextBool();
      final densityScore = 30 + _random.nextInt(50);
      
      // 根据指标确定阶段
      final stage = RecoveryStageHelper.determineStage(
        scalpExposurePercentage: scalpExposurePercentage,
        densityScore: densityScore,
        hasVellusHair: hasVellusHair,
      );
      
      // 生成 AI 建议
      final aiAdvice = _generateAIAdvice(
        scalpExposurePercentage,
        hairlineWidth,
        hasVellusHair,
        densityScore,
        stage,
      );
      
      return AnalysisResult(
        scalpExposurePercentage: scalpExposurePercentage,
        hairlineWidth: hairlineWidth,
        hasVellusHair: hasVellusHair,
        densityScore: densityScore,
        aiAdvice: aiAdvice,
        stage: stage,
        analysisDate: DateTime.now(),
      );
    }
  }

  /**
   * 生成 AI 建议
   */
  static String _generateAIAdvice(
    double scalpExposurePercentage,
    double hairlineWidth,
    bool hasVellusHair,
    int densityScore,
    RecoveryStage stage,
  ) {
    final List<String> advice = [];
    
    if (scalpExposurePercentage > 30) {
      advice.add('头皮暴露面积较高，建议及时就医检查。');
    } else if (scalpExposurePercentage > 25) {
      advice.add('头皮暴露面积偏高，建议增加营养补充。');
    } else {
      advice.add('头皮暴露面积良好，继续保持。');
    }
    
    if (hasVellusHair) {
      advice.add('检测到新生绒毛，这是恢复的好兆头。');
    } else {
      advice.add('建议增加蛋白质和维生素摄入。');
    }
    
    if (densityScore < 40) {
      advice.add('毛发密度偏低，建议使用生发产品。');
    } else if (densityScore < 60) {
      advice.add('毛发密度一般，建议继续坚持护理。');
    } else {
      advice.add('毛发密度良好，恢复进展顺利。');
    }
    
    return advice.join(' ');
  }
} 