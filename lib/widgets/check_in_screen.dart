import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:hair_recovery_ai/providers/app_state.dart';
import 'package:hair_recovery_ai/models/check_in_record.dart';

/**
 * 打卡屏幕组件
 */
class CheckInScreen extends StatefulWidget {
  const CheckInScreen({super.key});

  @override
  State<CheckInScreen> createState() => _CheckInScreenState();
}

class _CheckInScreenState extends State<CheckInScreen> {
  bool _tookSupplements = false;
  bool _washedHair = false;
  bool _tookPhoto = false;
  final TextEditingController _notesController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Consumer<AppState>(
      builder: (context, appState, child) {
        return Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 今日状态
              _buildTodayStatus(context, appState),
              
              const SizedBox(height: 20),
              
              // 打卡项目
              _buildCheckInItems(context),
              
              const SizedBox(height: 20),
              
              // 备注
              _buildNotesField(context),
              
              const SizedBox(height: 20),
              
              // 打卡按钮
              _buildCheckInButton(context, appState),
              
              const SizedBox(height: 20),
              
              // 连续打卡统计
              _buildConsecutiveDays(context, appState),
            ],
          ),
        );
      },
    );
  }

  /**
   * 构建今日状态
   */
  Widget _buildTodayStatus(BuildContext context, AppState appState) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '今日状态',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Icon(
                  appState.hasCheckedInToday ? Icons.check_circle : Icons.schedule,
                  color: appState.hasCheckedInToday ? Colors.green : Colors.orange,
                ),
                const SizedBox(width: 8),
                Text(
                  appState.hasCheckedInToday ? '今日已打卡' : '今日未打卡',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  /**
   * 构建打卡项目
   */
  Widget _buildCheckInItems(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '打卡项目',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 12),
            
            _buildCheckInItem(
              context,
              '服用补剂',
              _tookSupplements,
              Icons.medication,
              (value) => setState(() => _tookSupplements = value),
            ),
            
            const SizedBox(height: 8),
            
            _buildCheckInItem(
              context,
              '洗头',
              _washedHair,
              Icons.wash,
              (value) => setState(() => _washedHair = value),
            ),
            
            const SizedBox(height: 8),
            
            _buildCheckInItem(
              context,
              '拍照记录',
              _tookPhoto,
              Icons.camera_alt,
              (value) => setState(() => _tookPhoto = value),
            ),
          ],
        ),
      ),
    );
  }

  /**
   * 构建打卡项目项
   */
  Widget _buildCheckInItem(
    BuildContext context,
    String title,
    bool value,
    IconData icon,
    Function(bool) onChanged,
  ) {
    return Row(
      children: [
        Icon(icon, color: Colors.blue),
        const SizedBox(width: 12),
        Expanded(
          child: Text(
            title,
            style: Theme.of(context).textTheme.bodyLarge,
          ),
        ),
        Switch(
          value: value,
          onChanged: onChanged,
        ),
      ],
    );
  }

  /**
   * 构建备注字段
   */
  Widget _buildNotesField(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '备注',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 8),
            TextField(
              controller: _notesController,
              maxLines: 3,
              decoration: const InputDecoration(
                hintText: '记录今日感受或注意事项...',
                border: OutlineInputBorder(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  /**
   * 构建打卡按钮
   */
  Widget _buildCheckInButton(BuildContext context, AppState appState) {
    final hasCheckedIn = appState.hasCheckedInToday;
    
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: hasCheckedIn ? null : () => _performCheckIn(context, appState),
        child: Text(hasCheckedIn ? '今日已打卡' : '完成打卡'),
      ),
    );
  }

  /**
   * 执行打卡
   */
  void _performCheckIn(BuildContext context, AppState appState) {
    final record = CheckInRecord(
      date: DateTime.now(),
      tookSupplements: _tookSupplements,
      washedHair: _washedHair,
      tookPhoto: _tookPhoto,
      notes: _notesController.text.isNotEmpty ? _notesController.text : null,
    );
    
    appState.addCheckInRecord(record);
    
    // 重置表单
    setState(() {
      _tookSupplements = false;
      _washedHair = false;
      _tookPhoto = false;
      _notesController.clear();
    });
    
    // 显示成功提示
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('打卡成功！'),
        backgroundColor: Colors.green,
      ),
    );
  }

  /**
   * 构建连续打卡统计
   */
  Widget _buildConsecutiveDays(BuildContext context, AppState appState) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '打卡统计',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 12),
            
            Row(
              children: [
                const Icon(Icons.local_fire_department, color: Colors.orange),
                const SizedBox(width: 8),
                Text(
                  '连续打卡 ${appState.consecutiveCheckInDays} 天',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
              ],
            ),
            
            const SizedBox(height: 8),
            
            Row(
              children: [
                const Icon(Icons.calendar_today, color: Colors.blue),
                const SizedBox(width: 8),
                Text(
                  '总打卡 ${appState.checkInRecords.length} 次',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
} 