# 头发恢复分析助手

一个温暖关怀风格的头发恢复分析 Web App，使用 AI 技术帮助用户了解恢复进度并提供个性化建议。

## 🌟 项目特色

- **温暖关怀设计**：采用温暖橙、柔和绿等色彩，营造温馨的用户体验
- **智能分析**：基于 GPT-4o Vision 的头发状态分析
- **专业建议**：AI 生成的个性化恢复建议
- **响应式设计**：移动端优先，完美适配各种设备
- **用户友好**：直观的拖拽上传、实时进度反馈

## 🚀 技术栈

- **框架**：Next.js 14 (App Router)
- **样式**：TailwindCSS + shadcn/ui
- **语言**：TypeScript
- **状态管理**：React Hooks
- **AI 服务**：GPT-4o Vision (模拟)

## 📁 项目结构

```
hair-recovery-app/
├── app/                    # Next.js App Router
│   ├── analyze/           # 分析页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── ui/               # shadcn/ui 组件
│   ├── ImageUpload.tsx   # 图片上传组件
│   ├── AnalysisProgress.tsx # 分析进度组件
│   └── AnalysisResults.tsx # 分析结果组件
├── lib/                  # 工具函数
│   ├── utils.ts          # 通用工具
│   ├── mock-data.ts      # Mock 数据
│   └── analysis-service.ts # 分析服务
├── types/                # TypeScript 类型定义
│   └── analysis.ts       # 分析相关类型
└── package.json          # 项目配置
```

## 🎨 设计理念

### 色彩系统
- **主色调**：温暖橙 (#FF6B35)
- **辅助色**：柔和绿 (#4ADE80)
- **强调色**：温暖黄 (#FBBF24)
- **背景色**：米白 (#FEF7F0)

### 交互设计
- **微动画**：悬停放大、点击涟漪效果
- **情感化反馈**：温暖鼓励的语言和表情符号
- **进度可视化**：实时分析进度和步骤提示

## 🔧 功能模块

### 1. 图片上传
- 支持 JPG/PNG 格式
- 拖拽上传功能
- 实时图片预览
- 智能拍摄指导

### 2. AI 分析
- **第一阶段**：GPT-4o Vision 图像分析
- **第二阶段**：GPT-4 文本建议生成
- 分析指标：
  - 头皮暴露率
  - 毛发密度评分
  - 发缝宽度
  - 新生绒毛检测
  - 恢复阶段判断

### 3. 结果展示
- 恢复阶段卡片
- 关键指标可视化
- 置信度评分
- 个性化建议
- 免责声明

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 配置 API（可选）
要使用真实的 GPT-4o Vision 分析功能，请配置 OpenAI API：

1. 获取 OpenAI API 密钥：https://platform.openai.com/api-keys
2. 创建 `.env.local` 文件：
   ```bash
   NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key-here
   ```
3. 重启开发服务器

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 启动生产服务器
```bash
npm start
```

## 📱 使用流程

1. **上传图片**：拖拽或点击上传头发照片
2. **智能分析**：AI 自动分析头发状态
3. **查看结果**：获取详细的恢复进度报告
4. **个性化建议**：根据分析结果获得专业建议

## 🎯 恢复阶段

- **阶段 0**：掉发期（暴露率高、无绒毛）
- **阶段 1**：新生绒毛期（绒毛开始出现）
- **阶段 2**：密度增长期（评分≥60，发缝收窄）
- **阶段 3**：稳定维护期（评分≥80，暴露率<18%）

## 🔮 未来规划

- [ ] 集成真实的 GPT-4o Vision API
- [ ] 添加历史记录功能
- [ ] 实现数据导出功能
- [ ] 增加更多分析维度
- [ ] 添加用户账户系统

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**每一步都是进步！保持耐心，你的坚持会有回报** 🌟 