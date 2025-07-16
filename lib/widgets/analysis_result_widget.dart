import 'package:flutter/material.dart';
import 'package:hair_recovery_ai/models/analysis_result.dart';
import 'package:hair_recovery_ai/models/recovery_stage.dart';

/**
 * 分析结果展示组件
 * 
 * 使用卡片式布局展示分析结果
 */
class AnalysisResultWidget extends StatelessWidget {
  final AnalysisResult result;

  const AnalysisResultWidget({
    super.key,
    required this.result,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '分析结果',
          style: Theme.of(context).textTheme.headlineMedium,
        ),
        const SizedBox(height: 16),
        
        // 恢复阶段卡片
        _buildStageCard(context),
        
        const SizedBox(height: 12),
        
        // 关键指标卡片
        _buildMetricsCard(context),
        
        const SizedBox(height: 12),
        
        // AI 建议卡片
        _buildAdviceCard(context),
      ],
    );
  }

  /**
   * 构建恢复阶段卡片
   */
  Widget _buildStageCard(BuildContext context) {
    final stageIcon = RecoveryStageHelper.getStageIcon(result.stage);
    final stageDescription = RecoveryStageHelper.getStageDescription(result.stage);
    final stageAdvice = RecoveryStageHelper.getStageAdvice(result.stage);
    
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text(
                  stageIcon,
                  style: const TextStyle(fontSize: 24),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    stageDescription,
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              stageAdvice,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }

  /**
   * 构建关键指标卡片
   */
  Widget _buildMetricsCard(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '关键指标',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 12),
            
            _buildMetricRow(
              context,
              '头皮暴露面积',
              '${result.scalpExposurePercentage.toStringAsFixed(1)}%',
              _getExposureColor(result.scalpExposurePercentage),
            ),
            
            const SizedBox(height: 8),
            
            _buildMetricRow(
              context,
              '发缝宽度',
              '${result.hairlineWidth.toStringAsFixed(1)}px',
              Colors.blue,
            ),
            
            const SizedBox(height: 8),
            
            _buildMetricRow(
              context,
              '绒毛检测',
              result.hasVellusHair ? '✅ 检测到' : '❌ 未检测到',
              result.hasVellusHair ? Colors.green : Colors.grey,
            ),
            
            const SizedBox(height: 8),
            
            _buildMetricRow(
              context,
              '毛发密度',
              '${result.densityScore}/100 (${result.densityLevel})',
              _getDensityColor(result.densityScore),
            ),
          ],
        ),
      ),
    );
  }

  /**
   * 构建 AI 建议卡片
   */
  Widget _buildAdviceCard(BuildContext context) {
    return Card(
      color: Colors.blue.shade50,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(Icons.psychology, color: Colors.blue, size: 24),
                const SizedBox(width: 8),
                Text(
                  'AI 恢复建议',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: Colors.blue.shade700,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.blue.shade200),
              ),
              child: Text(
                result.aiAdvice,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  height: 1.5,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  /**
   * 构建指标行
   */
  Widget _buildMetricRow(
    BuildContext context,
    String label,
    String value,
    Color color,
  ) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        Text(
          value,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
            color: color,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }

  /**
   * 获取暴露面积颜色
   */
  Color _getExposureColor(double percentage) {
    if (percentage < 18) return Colors.green;
    if (percentage < 25) return Colors.orange;
    return Colors.red;
  }

  /**
   * 获取密度颜色
   */
  Color _getDensityColor(int score) {
    if (score >= 80) return Colors.green;
    if (score >= 60) return Colors.orange;
    return Colors.red;
  }
} 