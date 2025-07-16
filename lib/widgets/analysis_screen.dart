import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:hair_recovery_ai/providers/app_state.dart';
import 'package:hair_recovery_ai/widgets/image_picker_widget.dart';
import 'package:hair_recovery_ai/widgets/analysis_result_widget.dart';
import 'package:hair_recovery_ai/services/analysis_service.dart';

/**
 * 分析屏幕组件
 * 
 * 支持单图分析和双图对比两种模式
 */
class AnalysisScreen extends StatelessWidget {
  const AnalysisScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppState>(
      builder: (context, appState, child) {
        return Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // 模式提示
              _buildModeIndicator(context, appState),
              
              const SizedBox(height: 20),
              
              // 图片选择区域
              ImagePickerWidget(
                maxImages: appState.analysisMode == AnalysisMode.single ? 1 : 2,
                selectedImages: appState.selectedImages,
                onImagesSelected: (images) {
                  for (String image in images) {
                    appState.addSelectedImage(image);
                  }
                },
                onImageRemoved: (index) {
                  appState.removeSelectedImage(index);
                },
              ),
              
              const SizedBox(height: 20),
              
              // 分析按钮
              if (appState.selectedImages.isNotEmpty)
                ElevatedButton(
                  onPressed: appState.isAnalyzing
                      ? null
                      : () => _startAnalysis(context, appState),
                  child: appState.isAnalyzing
                      ? const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            SizedBox(
                              width: 20,
                              height: 20,
                              child: CircularProgressIndicator(strokeWidth: 2),
                            ),
                            SizedBox(width: 8),
                            Text('分析中...'),
                          ],
                        )
                      : const Text('开始分析'),
                ),
              
              const SizedBox(height: 20),
              
              // 分析结果
              if (appState.currentAnalysisResult != null)
                AnalysisResultWidget(
                  result: appState.currentAnalysisResult!,
                ),
            ],
          ),
        );
      },
    );
  }

  /**
   * 构建模式指示器
   */
  Widget _buildModeIndicator(BuildContext context, AppState appState) {
    final isSingleMode = appState.analysisMode == AnalysisMode.single;
    
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: isSingleMode 
            ? Theme.of(context).colorScheme.primary.withOpacity(0.1)
            : Theme.of(context).colorScheme.secondary.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: isSingleMode 
              ? Theme.of(context).colorScheme.primary
              : Theme.of(context).colorScheme.secondary,
        ),
      ),
      child: Row(
        children: [
          Icon(
            isSingleMode ? Icons.photo_library : Icons.compare,
            color: isSingleMode 
                ? Theme.of(context).colorScheme.primary
                : Theme.of(context).colorScheme.secondary,
          ),
          const SizedBox(width: 8),
          Text(
            isSingleMode ? '单图分析模式' : '双图对比模式',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: isSingleMode 
                  ? Theme.of(context).colorScheme.primary
                  : Theme.of(context).colorScheme.secondary,
            ),
          ),
        ],
      ),
    );
  }

  /**
   * 开始分析
   */
  Future<void> _startAnalysis(BuildContext context, AppState appState) async {
    appState.startAnalysis();
    
    try {
      final result = await AnalysisService.analyzeImages(
        appState.selectedImages,
        appState.analysisMode,
      );
      
      appState.completeAnalysis(result);
      
      // 显示成功提示
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('分析完成！'),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (e) {
      // 显示错误提示
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('分析失败：$e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }
} 