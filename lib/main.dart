import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:hair_recovery_ai/providers/app_state.dart';
import 'package:hair_recovery_ai/screens/home_screen.dart';
import 'package:hair_recovery_ai/utils/theme.dart';

/**
 * Hair Recovery AI 应用主入口
 * 
 * 提供全局状态管理和主题配置
 */
void main() {
  runApp(const HairRecoveryApp());
}

class HairRecoveryApp extends StatelessWidget {
  const HairRecoveryApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppState()),
      ],
      child: MaterialApp(
        title: 'Hair Recovery AI',
        theme: AppTheme.lightTheme,
        home: const HomeScreen(),
        debugShowCheckedModeBanner: false,
      ),
    );
  }
} 