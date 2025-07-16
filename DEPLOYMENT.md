# 部署指南

## 🚀 GitHub 部署

### 1. 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角的 "+" 号，选择 "New repository"
3. 仓库名称：`hair-recovery-app`
4. 描述：`AI-powered hair recovery analysis app with GPT-4o Vision`
5. 选择 "Public"
6. **不要**勾选 "Add a README file"
7. 点击 "Create repository"

### 2. 连接本地仓库

在GitHub仓库创建后，运行以下命令（替换 `YOUR_USERNAME` 为您的GitHub用户名）：

```bash
git remote add origin https://github.com/YOUR_USERNAME/hair-recovery-app.git
git push -u origin main
```

## 🌐 Vercel 部署

### 1. 连接 Vercel

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账户登录
3. 点击 "New Project"
4. 选择 `hair-recovery-app` 仓库
5. 点击 "Import"

### 2. 配置环境变量

在 Vercel 项目设置中：

1. 进入 "Settings" → "Environment Variables"
2. 添加环境变量：
   - **Name**: `NEXT_PUBLIC_OPENAI_API_KEY`
   - **Value**: 您的 OpenAI API 密钥
   - **Environment**: Production, Preview, Development
3. 点击 "Save"

### 3. 部署设置

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. 部署

1. 点击 "Deploy"
2. 等待部署完成
3. 访问生成的域名

## 🔧 环境变量配置

### 本地开发
创建 `.env.local` 文件：
```bash
NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key-here
```

### Vercel 生产环境
在 Vercel 仪表板中设置环境变量：
- `NEXT_PUBLIC_OPENAI_API_KEY`: 您的 OpenAI API 密钥

## 📝 注意事项

1. **API 密钥安全**：确保 API 密钥只在需要时暴露
2. **费用控制**：监控 OpenAI API 使用量
3. **性能优化**：Vercel 会自动优化 Next.js 应用
4. **域名**：Vercel 会提供免费域名，也可以绑定自定义域名

## 🚀 部署后检查

1. ✅ 应用正常加载
2. ✅ 图片上传功能正常
3. ✅ AI 分析功能正常
4. ✅ 响应式设计正常
5. ✅ API 状态指示器显示正确

## 📞 故障排除

### 常见问题

1. **构建失败**
   - 检查 TypeScript 错误
   - 确保所有依赖已安装

2. **API 调用失败**
   - 验证环境变量是否正确设置
   - 检查 API 密钥是否有效

3. **图片上传问题**
   - 检查文件大小限制
   - 验证文件格式支持

## 🔗 有用的链接

- [GitHub](https://github.com)
- [Vercel](https://vercel.com)
- [OpenAI Platform](https://platform.openai.com)
- [Next.js Documentation](https://nextjs.org/docs) 