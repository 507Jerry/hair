'use client'

import React, { useState, useCallback } from 'react'
import ImageUpload from '@/components/ImageUpload'
import AnalysisProgress from '@/components/AnalysisProgress'
import AnalysisResults from '@/components/AnalysisResults'
import { AnalysisState, AnalysisData, AdviceData } from '@/types/analysis'
import { performFullAnalysis } from '@/lib/analysis-service'

export default function AnalyzePage() {
  const [state, setState] = useState<AnalysisState>({
    imageFile: null,
    imagePreview: null,
    isAnalyzing: false,
    analysisProgress: 0,
    analysisStep: '',
    analysisResults: null,
    adviceData: null,
    confidence: 0,
    error: null
  })

  const handleImageSelect = useCallback(async (file: File) => {
    // 创建图片预览
    const reader = new FileReader()
    reader.onload = (e) => {
      setState(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: e.target?.result as string,
        error: null
      }))
    }
    reader.readAsDataURL(file)
  }, [])

  const handleStartAnalysis = useCallback(async () => {
    if (!state.imageFile) return

    setState(prev => ({
      ...prev,
      isAnalyzing: true,
      analysisProgress: 0,
      analysisStep: '图片质量检测',
      error: null
    }))

    try {
      // 模拟分析进度
      const progressInterval = setInterval(() => {
        setState(prev => {
          const newProgress = Math.min(prev.analysisProgress + 10, 90)
          let newStep = prev.analysisStep
          
          if (newProgress >= 30 && prev.analysisStep === '图片质量检测') {
            newStep = 'AI特征分析'
          } else if (newProgress >= 70 && prev.analysisStep === 'AI特征分析') {
            newStep = '生成分析报告'
          }
          
          return {
            ...prev,
            analysisProgress: newProgress,
            analysisStep: newStep
          }
        })
      }, 500)

      // 执行完整分析
      const result = await performFullAnalysis(state.imageFile)
      
      clearInterval(progressInterval)
      
      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        analysisProgress: 100,
        analysisResults: result.analysisData,
        adviceData: result.adviceData,
        confidence: result.confidence
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        error: error instanceof Error ? error.message : '分析过程中出现错误'
      }))
    }
  }, [state.imageFile])

  const handleRetry = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
      isAnalyzing: false,
      analysisProgress: 0,
      analysisStep: ''
    }))
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          头发恢复分析
        </h1>
        <p className="text-gray-600">
          上传你的头发照片，AI将为你提供专业的分析报告
        </p>
      </div>

      {/* 错误提示 */}
      {state.error && (
        <div className="warm-card p-6 border-l-4 border-red-500">
          <div className="flex items-center">
            <span className="text-red-500 text-2xl mr-3">⚠️</span>
            <div>
              <h3 className="font-semibold text-red-700">分析失败</h3>
              <p className="text-red-600">{state.error}</p>
            </div>
          </div>
          <button
            onClick={handleRetry}
            className="mt-4 warm-button"
          >
            🔄 重试
          </button>
        </div>
      )}

      {/* 图片上传区域 */}
      {!state.isAnalyzing && !state.analysisResults && (
        <ImageUpload
          onImageSelect={handleImageSelect}
          imagePreview={state.imagePreview}
          isAnalyzing={state.isAnalyzing}
        />
      )}

      {/* 分析进度 */}
      {state.isAnalyzing && (
        <AnalysisProgress
          isAnalyzing={state.isAnalyzing}
          progress={state.analysisProgress}
          currentStep={state.analysisStep}
        />
      )}

      {/* 分析结果 */}
      {state.analysisResults && state.adviceData && (
        <AnalysisResults
          analysisData={state.analysisResults}
          adviceData={state.adviceData}
          confidence={state.confidence}
        />
      )}

      {/* 重新分析按钮 */}
      {state.analysisResults && (
        <div className="text-center">
          <button
            onClick={() => {
              setState({
                imageFile: null,
                imagePreview: null,
                isAnalyzing: false,
                analysisProgress: 0,
                analysisStep: '',
                analysisResults: null,
                adviceData: null,
                confidence: 0,
                error: null
              })
            }}
            className="warm-button-secondary"
          >
            🔄 重新分析
          </button>
        </div>
      )}

      {/* 开始分析按钮（当有图片但未开始分析时） */}
      {state.imagePreview && !state.isAnalyzing && !state.analysisResults && (
        <div className="text-center">
          <button
            onClick={handleStartAnalysis}
            className="warm-button text-lg px-8 py-4"
          >
            🚀 开始头发分析
          </button>
        </div>
      )}
    </div>
  )
} 