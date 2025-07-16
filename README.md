# 头发恢复分析助手 / Hair Recovery AI

---

## 🟧 Web端说明（Next.js App）

一个温暖关怀风格的头发恢复分析 Web App，使用 AI 技术帮助用户了解恢复进度并提供个性化建议。

### 🌟 项目特色
- 温暖关怀设计：采用温暖橙、柔和绿等色彩，营造温馨的用户体验
- 智能分析：基于 GPT-4o Vision 的头发状态分析
- 专业建议：AI 生成的个性化恢复建议
- 响应式设计：移动端优先，完美适配各种设备
- 用户友好：直观的拖拽上传、实时进度反馈

### 🚀 技术栈
- 框架：Next.js 14 (App Router)
- 样式：TailwindCSS + shadcn/ui
- 语言：TypeScript
- 状态管理：React Hooks
- AI 服务：GPT-4o Vision（模拟/真实）

### 📁 目录结构
```
hair/
├── app/                    # Next.js App Router
│   ├── analyze/            # 分析页面
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 根布局
│   └── page.tsx            # 首页
├── components/             # React 组件
│   ├── ui/                 # shadcn/ui 组件
│   ├── ImageUpload.tsx     # 图片上传组件
│   ├── AnalysisProgress.tsx# 分析进度组件
│   └── AnalysisResults.tsx # 分析结果组件
├── lib/                    # 工具函数
│   ├── utils.ts            # 通用工具
│   ├── mock-data.ts        # Mock 数据
│   └── analysis-service.ts # 分析服务
├── types/                  # TypeScript 类型定义
│   └── analysis.ts         # 分析相关类型
└── package.json            # 项目配置
```

### 🎨 设计理念
- 主色调：温暖橙 (#FF6B35)
- 辅助色：柔和绿 (#4ADE80)
- 强调色：温暖黄 (#FBBF24)
- 背景色：米白 (#FEF7F0)

### 🛠️ 快速开始
```bash
npm install
npm run dev
```

### 🔑 配置 API（可选）
1. 获取 OpenAI API 密钥：https://platform.openai.com/api-keys
2. 创建 `.env.local` 文件：
   ```bash
   NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key-here
   ```
3. 重启开发服务器

### 📱 使用流程
1. 上传图片：拖拽或点击上传头发照片
2. 智能分析：AI 自动分析头发状态
3. 查看结果：获取详细的恢复进度报告
4. 个性化建议：根据分析结果获得专业建议

### 📝 恢复阶段
- 阶段 0：掉发期（暴露率高、无绒毛）
- 阶段 1：新生绒毛期（绒毛出现）
- 阶段 2：密度增长期（评分≥60，发缝收窄）
- 阶段 3：稳定维护期（评分≥80，暴露率<18%）

---

## 🟩 Flutter端说明（移动App）

一款基于 Flutter 3.x 的头发恢复分析 AI 应用，帮助用户跟踪和分析头发恢复进度。

### 🎯 项目概述
- 智能分析：单图分析和双图对比两种模式
- 数据追踪：头皮暴露面积、发缝宽度、毛发密度等关键指标
- 阶段判断：4个恢复阶段的智能判断和建议
- 每日打卡：补剂服用、洗头、拍照记录
- 趋势分析：周报生成和恢复趋势图表
- 案例参考：他人恢复案例展示和方案复制

### 🛠️ 快速开始
```bash
git clone <repository-url>
cd hair_recovery_ai
flutter pub get
flutter run
```

### 📁 目录结构
```
lib/
├── main.dart                 # 应用入口
├── providers/
│   └── app_state.dart        # 全局状态管理
├── models/
│   ├── analysis_result.dart  # 分析结果模型
│   ├── check_in_record.dart  # 打卡记录模型
│   └── recovery_stage.dart   # 恢复阶段模型
├── screens/
│   └── home_screen.dart      # 主屏幕
├── widgets/
│   ├── analysis_screen.dart      # 分析屏幕
│   ├── check_in_screen.dart     # 打卡屏幕
│   ├── weekly_report_screen.dart # 周报屏幕
│   ├── cases_screen.dart        # 案例屏幕
│   ├── image_picker_widget.dart # 图片选择组件
│   └── analysis_result_widget.dart # 分析结果组件
├── services/
│   └── analysis_service.dart    # 分析服务
└── utils/
    └── theme.dart              # 主题配置
```

### 📦 依赖
- Flutter 3.x
- Provider
- image_picker
- shared_preferences + sqflite
- fl_chart

### 🔑 API 配置
详见 API_SETUP.md

---

## 📄 许可证
MIT License
