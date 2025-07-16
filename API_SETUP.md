# API 配置说明（Web端 & Flutter端）

---

## 🟧 Web端（Next.js）API配置

### 1. 获取 OpenAI API 密钥
1. 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. 登录您的账户
3. 点击 "Create new secret key"
4. 复制生成的 API 密钥

### 2. 配置环境变量
在项目根目录创建 `.env.local` 文件：
```bash
# .env.local
NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key-here
```
请将 `your-openai-api-key-here` 替换为您的实际 API 密钥。

### 3. 重启开发服务器
```bash
npm run dev
```

### 4. 功能说明
- 配置 API 密钥后，应用将使用真实的 GPT-4o Vision API
- 未配置密钥时，应用使用 mock 数据，适合开发和测试

### 5. 注意事项
1. **API 费用**：使用真实 API 会产生费用，请确保账户有余额
2. **密钥安全**：不要将 API 密钥提交到版本控制系统
3. **使用限制**：注意 OpenAI API 的使用限制和速率限制
4. **数据隐私**：图片会发送到 OpenAI 服务器进行分析

---

## 🟩 Flutter端 API配置

### 1. 获取 OpenAI API Key
1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 注册或登录您的账户
3. 进入 "API Keys" 页面
4. 点击 "Create new secret key"
5. 复制生成的 API Key

### 2. 配置 API Key
- 方法一：直接修改代码（仅用于开发测试）
  在 `lib/services/gpt_api_service.dart` 文件中：
  ```dart
  static const String _apiKey = 'YOUR_OPENAI_API_KEY';
  // 修改为
  static const String _apiKey = 'sk-your-actual-api-key-here';
  ```
- 方法二：使用环境变量（推荐用于生产环境）
  1. 创建 `.env` 文件：
     ```
     OPENAI_API_KEY=sk-your-actual-api-key-here
     ```
  2. 添加依赖：
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
     static String get _apiKey => dotenv.env['OPENAI_API_KEY'] ?? '';
     ```

### 3. 功能说明
- 支持单图分析、双图对比、周报生成等
- 费用说明：详见 OpenAI 官网

### 4. 常见问题排查
- 401：检查 API Key 是否正确、账户余额
- 429：降低请求频率，检查 API 限制
- 400：检查图片格式（支持 JPEG、PNG），建议 < 20MB

---

## 技术支持
如遇到 API 调用问题，请检查：
- API 密钥是否正确配置
- 网络连接是否正常
- OpenAI 服务是否可用
- 账户余额是否充足
