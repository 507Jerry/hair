'use client'

import React from 'react'
import { Progress } from '@/components/ui/progress'

interface AnalysisProgressProps {
  isAnalyzing: boolean
  progress: number
  currentStep: string
}

export default function AnalysisProgress({ isAnalyzing, progress, currentStep }: AnalysisProgressProps) {
  if (!isAnalyzing) return null

  const steps = [
    { name: "图片质量检测", icon: "🔍" },
    { name: "AI特征分析", icon: "🤖" },
    { name: "生成分析报告", icon: "📊" }
  ]

  const currentStepIndex = steps.findIndex(step => step.name === currentStep)

  return (
    <div className="warm-card p-8 animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-warm-blue to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-gentle">
          <span className="text-white text-2xl">🔄</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          AI 正在分析中...
        </h3>
        <p className="text-gray-600">
          马上就好啦！
        </p>
      </div>

      {/* 进度条 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">分析进度</span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* 步骤指示器 */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.name}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
              index <= currentStepIndex
                ? 'bg-warm-green/10 border border-warm-green/20'
                : 'bg-gray-50 border border-gray-100'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index < currentStepIndex
                  ? 'bg-warm-green text-white'
                  : index === currentStepIndex
                  ? 'bg-warm-orange text-white animate-pulse-gentle'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index < currentStepIndex ? '✓' : step.icon}
            </div>
            <div className="flex-1">
              <p className={`font-medium ${
                index <= currentStepIndex ? 'text-gray-800' : 'text-gray-500'
              }`}>
                {step.name}
              </p>
              {index === currentStepIndex && (
                <p className="text-sm text-warm-orange">
                  正在处理...
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 鼓励性文案 */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {progress < 30 && "正在检查图片质量..."}
          {progress >= 30 && progress < 70 && "AI正在分析头发特征..."}
          {progress >= 70 && "正在生成个性化建议..."}
        </p>
      </div>
    </div>
  )
} 