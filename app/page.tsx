import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* 欢迎区域 */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="w-24 h-24 bg-gradient-to-br from-warm-orange to-warm-yellow rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-3xl">🌟</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          欢迎来到你的
          <span className="bg-gradient-to-r from-warm-orange to-warm-yellow bg-clip-text text-transparent">
            头发恢复之旅
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          用AI技术帮助你了解恢复进度，提供个性化建议。
          每一步都是进步，让我们一起见证你的恢复过程！
        </p>
      </div>

      {/* 功能介绍 */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="warm-card p-6 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="w-16 h-16 bg-gradient-to-br from-warm-blue to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">📸</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">智能拍摄</h3>
          <p className="text-gray-600">
            直接拍照或上传头发照片，AI智能分析你的恢复状态
          </p>
        </div>

        <div className="warm-card p-6 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="w-16 h-16 bg-gradient-to-br from-warm-green to-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">📊</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">专业分析</h3>
          <p className="text-gray-600">
            多维度评估恢复进度，提供科学的分析报告
          </p>
        </div>

        <div className="warm-card p-6 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="w-16 h-16 bg-gradient-to-br from-warm-yellow to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">💡</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">个性化建议</h3>
          <p className="text-gray-600">
            根据分析结果，提供温暖贴心的恢复建议
          </p>
        </div>
      </div>

      {/* 开始分析按钮 */}
      <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <Link 
          href="/analyze" 
          className="warm-button inline-flex items-center space-x-2 text-lg px-8 py-4"
        >
          <span>🚀</span>
          <span>开始头发分析</span>
        </Link>
        <p className="text-gray-500 mt-4 text-sm">
          简单三步，了解你的恢复进度
        </p>
      </div>

      {/* 恢复阶段说明 */}
      <div className="mt-16 warm-card p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          恢复阶段说明
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-red-50">
            <div className="stage-indicator stage-0 mb-2">0</div>
            <h4 className="font-semibold text-gray-800">掉发期</h4>
            <p className="text-sm text-gray-600">暴露明显，无绒毛</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-orange-50">
            <div className="stage-indicator stage-1 mb-2">1</div>
            <h4 className="font-semibold text-gray-800">新生绒毛期</h4>
            <p className="text-sm text-gray-600">开始恢复</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-yellow-50">
            <div className="stage-indicator stage-2 mb-2">2</div>
            <h4 className="font-semibold text-gray-800">增长期</h4>
            <p className="text-sm text-gray-600">发缝收窄</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-green-50">
            <div className="stage-indicator stage-3 mb-2">3</div>
            <h4 className="font-semibold text-gray-800">稳定维护期</h4>
            <p className="text-sm text-gray-600">基本恢复</p>
          </div>
        </div>
      </div>
    </div>
  )
} 