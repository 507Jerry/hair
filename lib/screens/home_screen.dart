import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:hair_recovery_ai/providers/app_state.dart';
import 'package:hair_recovery_ai/widgets/analysis_screen.dart';
// import 'package:hair_recovery_ai/widgets/check_in_screen.dart'; // 暂时不用打卡
// import 'package:hair_recovery_ai/widgets/weekly_report_screen.dart'; // 暂时不用周报
// import 'package:hair_recovery_ai/widgets/cases_screen.dart'; // 暂时不用案例

/**
 * 应用主屏幕
 * 
 * 专注于头发分析功能
 */
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Hair Recovery AI'),
        backgroundColor: Theme.of(context).colorScheme.surface,
        elevation: 0,
        actions: [
          // 模式切换按钮
          Consumer<AppState>(
            builder: (context, appState, child) {
              return PopupMenuButton<AnalysisMode>(
                icon: const Icon(Icons.swap_horiz),
                onSelected: (mode) {
                  appState.switchAnalysisMode(mode);
                },
                itemBuilder: (context) => [
                  const PopupMenuItem(
                    value: AnalysisMode.single,
                    child: Row(
                      children: [
                        Icon(Icons.photo_library),
                        SizedBox(width: 8),
                        Text('单图分析'),
                      ],
                    ),
                  ),
                  const PopupMenuItem(
                    value: AnalysisMode.compare,
                    child: Row(
                      children: [
                        Icon(Icons.compare),
                        SizedBox(width: 8),
                        Text('双图对比'),
                      ],
                    ),
                  ),
                ],
              );
            },
          ),
        ],
      ),
      body: const AnalysisScreen(),
    );
  }
} 