import 'package:flutter/material.dart';

/**
 * 案例屏幕组件
 * 
 * 展示他人恢复案例
 */
class CasesScreen extends StatelessWidget {
  const CasesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '恢复案例',
            style: Theme.of(context).textTheme.headlineMedium,
          ),
          const SizedBox(height: 20),
          
          // 案例列表
          Expanded(
            child: ListView.builder(
              itemCount: _mockCases.length,
              itemBuilder: (context, index) {
                return _buildCaseCard(context, _mockCases[index]);
              },
            ),
          ),
        ],
      ),
    );
  }

  /**
   * 构建案例卡片
   */
  Widget _buildCaseCard(BuildContext context, Map<String, dynamic> caseData) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 用户信息
            Row(
              children: [
                CircleAvatar(
                  backgroundColor: Colors.blue.shade100,
                  child: Text(
                    caseData['userInitial'],
                    style: const TextStyle(
                      color: Colors.blue,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        caseData['userName'],
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      Text(
                        '恢复 ${caseData['recoveryDays']} 天',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Colors.grey,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            
            const SizedBox(height: 16),
            
            // 前后对比
            Row(
              children: [
                Expanded(
                  child: Column(
                    children: [
                      Container(
                        height: 120,
                        decoration: BoxDecoration(
                          color: Colors.grey.shade200,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.image, size: 32, color: Colors.grey),
                              Text('第0天', style: TextStyle(color: Colors.grey)),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '第0天',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 12),
                const Icon(Icons.arrow_forward, color: Colors.grey),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    children: [
                      Container(
                        height: 120,
                        decoration: BoxDecoration(
                          color: Colors.grey.shade200,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.image, size: 32, color: Colors.grey),
                              Text('当前', style: TextStyle(color: Colors.grey)),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '当前',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                ),
              ],
            ),
            
            const SizedBox(height: 16),
            
            // 恢复效果
            Row(
              children: [
                Expanded(
                  child: _buildEffectItem(
                    context,
                    '头皮暴露',
                    '${caseData['beforeExposure']}%',
                    '${caseData['afterExposure']}%',
                    Colors.blue,
                  ),
                ),
                Expanded(
                  child: _buildEffectItem(
                    context,
                    '毛发密度',
                    '${caseData['beforeDensity']}/100',
                    '${caseData['afterDensity']}/100',
                    Colors.green,
                  ),
                ),
              ],
            ),
            
            const SizedBox(height: 16),
            
            // 采用方案
            Text(
              '采用方案',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 8),
            Text(
              caseData['treatment'],
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            
            const SizedBox(height: 16),
            
            // 一键复制按钮
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('方案已复制到打卡计划'),
                      backgroundColor: Colors.green,
                    ),
                  );
                },
                icon: const Icon(Icons.copy),
                label: const Text('一键复制该方案'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  /**
   * 构建效果项
   */
  Widget _buildEffectItem(
    BuildContext context,
    String label,
    String beforeValue,
    String afterValue,
    Color color,
  ) {
    return Column(
      children: [
        Text(
          label,
          style: Theme.of(context).textTheme.bodySmall,
        ),
        const SizedBox(height: 4),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              beforeValue,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Colors.grey,
              ),
            ),
            const SizedBox(width: 4),
            Icon(Icons.arrow_forward, size: 16, color: color),
            const SizedBox(width: 4),
            Text(
              afterValue,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: color,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ],
    );
  }

  /**
   * 模拟案例数据
   */
  static final List<Map<String, dynamic>> _mockCases = [
    {
      'userInitial': '张',
      'userName': '张先生',
      'recoveryDays': 90,
      'beforeExposure': 35.2,
      'afterExposure': 18.5,
      'beforeDensity': 45,
      'afterDensity': 78,
      'treatment': '每日服用生物素 + 维生素D，每周3次头皮按摩，使用米诺地尔溶液。',
    },
    {
      'userInitial': '李',
      'userName': '李女士',
      'recoveryDays': 120,
      'beforeExposure': 28.7,
      'afterExposure': 15.3,
      'beforeDensity': 52,
      'afterDensity': 85,
      'treatment': '调整作息时间，增加蛋白质摄入，使用激光生发帽，定期拍照记录。',
    },
    {
      'userInitial': '王',
      'userName': '王先生',
      'recoveryDays': 60,
      'beforeExposure': 42.1,
      'afterExposure': 25.8,
      'beforeDensity': 38,
      'afterDensity': 65,
      'treatment': '减少压力，增加运动，服用锌和铁补充剂，使用温和洗发水。',
    },
  ];
} 