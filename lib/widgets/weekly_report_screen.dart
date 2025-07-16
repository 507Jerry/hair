import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:hair_recovery_ai/providers/app_state.dart';

/**
 * 周报屏幕组件
 */
class WeeklyReportScreen extends StatelessWidget {
  const WeeklyReportScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppState>(
      builder: (context, appState, child) {
        return Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '恢复周报',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
              const SizedBox(height: 20),
              
              // 本周概览
              _buildWeeklyOverview(context, appState),
              
              const SizedBox(height: 20),
              
              // 趋势图表
              _buildTrendChart(context, appState),
              
              const SizedBox(height: 20),
              
              // AI 总结
              _buildAISummary(context, appState),
              
              const SizedBox(height: 20),
              
              // 下载按钮
              _buildDownloadButton(context),
            ],
          ),
        );
      },
    );
  }

  /**
   * 构建本周概览
   */
  Widget _buildWeeklyOverview(BuildContext context, AppState appState) {
    final records = appState.checkInRecords;
    final thisWeekRecords = records.where((record) {
      final now = DateTime.now();
      final weekStart = now.subtract(Duration(days: now.weekday - 1));
      final weekEnd = weekStart.add(const Duration(days: 6));
      return record.date.isAfter(weekStart) && record.date.isBefore(weekEnd);
    }).toList();
    
    final averageCompletionRate = thisWeekRecords.isEmpty 
        ? 0.0 
        : thisWeekRecords.map((r) => r.completionRate).reduce((a, b) => a + b) / thisWeekRecords.length;
    
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '本周概览',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 12),
            
            Row(
              children: [
                Expanded(
                  child: _buildStatItem(
                    context,
                    '本周打卡',
                    '${thisWeekRecords.length} 次',
                    Icons.calendar_today,
                    Colors.blue,
                  ),
                ),
                Expanded(
                  child: _buildStatItem(
                    context,
                    '完成率',
                    '${(averageCompletionRate * 100).toStringAsFixed(1)}%',
                    Icons.check_circle,
                    Colors.green,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  /**
   * 构建统计项
   */
  Widget _buildStatItem(
    BuildContext context,
    String label,
    String value,
    IconData icon,
    Color color,
  ) {
    return Column(
      children: [
        Icon(icon, color: color, size: 32),
        const SizedBox(height: 8),
        Text(
          value,
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
            color: color,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          label,
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }

  /**
   * 构建趋势图表
   */
  Widget _buildTrendChart(BuildContext context, AppState appState) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '恢复趋势',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 12),
            
            Container(
              height: 200,
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.show_chart, size: 48, color: Colors.grey),
                    SizedBox(height: 8),
                    Text(
                      '趋势图表',
                      style: TextStyle(color: Colors.grey),
                    ),
                    Text(
                      '(需要集成 fl_chart)',
                      style: TextStyle(color: Colors.grey, fontSize: 12),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  /**
   * 构建 AI 总结
   */
  Widget _buildAISummary(BuildContext context, AppState appState) {
    final records = appState.checkInRecords;
    final thisWeekRecords = records.where((record) {
      final now = DateTime.now();
      final weekStart = now.subtract(Duration(days: now.weekday - 1));
      final weekEnd = weekStart.add(const Duration(days: 6));
      return record.date.isAfter(weekStart) && record.date.isBefore(weekEnd);
    }).toList();
    
    String summary = '';
    if (thisWeekRecords.isEmpty) {
      summary = '本周暂无打卡记录，建议开始每日打卡以跟踪恢复进度。';
    } else {
      final completionRate = thisWeekRecords.map((r) => r.completionRate).reduce((a, b) => a + b) / thisWeekRecords.length;
      
      if (completionRate >= 0.8) {
        summary = '本周打卡完成率很高，继续保持！恢复进展良好。';
      } else if (completionRate >= 0.6) {
        summary = '本周打卡完成率良好，建议提高补剂和拍照的完成度。';
      } else {
        summary = '本周打卡完成率偏低，建议加强日常护理和记录。';
      }
    }
    
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(Icons.psychology, color: Colors.blue),
                const SizedBox(width: 8),
                Text(
                  'AI 周报总结',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              summary,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }

  /**
   * 构建下载按钮
   */
  Widget _buildDownloadButton(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton.icon(
        onPressed: () {
          // TODO: 实现周报下载功能
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('周报下载功能开发中...'),
              backgroundColor: Colors.orange,
            ),
          );
        },
        icon: const Icon(Icons.download),
        label: const Text('下载周报'),
      ),
    );
  }
} 