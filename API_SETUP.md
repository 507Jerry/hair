# GPT API 配置说明

## 🔑 获取 OpenAI API Key

1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 注册或登录您的账户
3. 进入 "API Keys" 页面
4. 点击 "Create new secret key"
5. 复制生成的 API Key

## ⚙️ 配置 API Key

### 方法一：直接修改代码（仅用于开发测试）

在 `lib/services/gpt_api_service.dart` 文件中：

```dart
// 将这行
static const String _apiKey = 'YOUR_OPENAI_API_KEY';

// 改为
static const String _apiKey = 'sk-your-actual-api-key-here';
```

### 方法二：使用环境变量（推荐用于生产环境）

1. 创建 `.env` 文件：
```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

2. 添加环境变量包：
```yaml
dependencies:
  flutter_dotenv: ^5.1.0
```

3. 在 `pubspec.yaml` 中添加：
```yaml
flutter:
  assets:
    - .env
```

4. 修改 `gpt_api_service.dart`：
```dart
import 'package:flutter_dotenv/flutter_dotenv.dart';

// 替换 API Key 获取方式
static String get _apiKey => dotenv.env['OPENAI_API_KEY'] ?? '';
```

## 🚀 功能说明

### 单图分析
- 分析头皮暴露面积
- 检测发缝宽度
- 识别新生绒毛
- 评估毛发密度
- 判断恢复阶段
- 生成个性化建议

### 双图对比
- 对比头皮暴露面积变化
- 分析发缝宽度变化
- 评估绒毛改善情况
- 生成趋势总结

### 周报生成
- 基于一周数据生成 AI 总结
- 提供鼓励性建议

## 💰 费用说明

- **GPT-4o-mini**: 每 1K tokens 约 $0.00015
- **GPT-4o**: 每 1K tokens 约 $0.005
- 单次图片分析约消耗 500-1000 tokens
- 建议使用 GPT-4o-mini 以降低成本

## 🔒 安全注意事项

⚠️ **重要提醒**：
- 不要在代码中硬编码 API Key
- 不要将 API Key 提交到版本控制系统
- 使用环境变量或安全的密钥管理服务
- 定期轮换 API Key

## 🛠️ 故障排除

### 常见错误

1. **401 Unauthorized**
   - 检查 API Key 是否正确
   - 确认账户有足够的余额

2. **429 Too Many Requests**
   - 降低请求频率
   - 检查 API 使用限制

3. **400 Bad Request**
   - 检查图片格式（支持 JPEG、PNG）
   - 确认图片大小（建议 < 20MB）

### 调试模式

在 `gpt_api_service.dart` 中启用详细日志：

```dart
print('API 请求详情: ${jsonEncode(requestBody)}');
print('API 响应: ${response.body}');
```

## 📱 测试

配置完成后，您可以：

1. 运行应用
2. 选择一张头发照片
3. 点击"开始分析"
4. 查看 AI 分析结果

如果 API 调用失败，应用会自动回退到模拟数据模式。 