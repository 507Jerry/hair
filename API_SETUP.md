# API 配置说明

## 🔑 配置 OpenAI API

要使用真实的 GPT-4o Vision 分析功能，请按以下步骤配置：

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

## 🔧 功能说明

### 真实 API 模式
- 配置 API 密钥后，应用将使用真实的 GPT-4o Vision API
- 图片分析结果基于 AI 的实际分析
- 建议生成更加个性化和准确

### Mock 数据模式
- 未配置 API 密钥时，应用使用预设的 Mock 数据
- 适合开发和测试阶段使用
- 分析结果固定，但可以体验完整流程

## ⚠️ 注意事项

1. **API 费用**：使用真实 API 会产生费用，请确保账户有足够余额
2. **密钥安全**：不要将 API 密钥提交到版本控制系统
3. **使用限制**：注意 OpenAI API 的使用限制和速率限制
4. **数据隐私**：图片会发送到 OpenAI 服务器进行分析

## 🚀 测试建议

1. 首先使用 Mock 数据测试完整流程
2. 配置 API 密钥后测试真实分析功能
3. 使用不同质量的图片测试分析准确性

## 📞 技术支持

如果遇到 API 调用问题，请检查：
- API 密钥是否正确配置
- 网络连接是否正常
- OpenAI 服务是否可用
- 账户余额是否充足 