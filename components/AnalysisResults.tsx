'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnalysisData, AdviceData } from '@/types/analysis'
import { stageInfo } from '@/lib/mock-data'

interface AnalysisResultsProps {
  analysisData: AnalysisData
  adviceData: AdviceData
  confidence: number
}

export default function AnalysisResults({ analysisData, adviceData, confidence }: AnalysisResultsProps) {
  const currentStage = stageInfo[analysisData.stage]

  const getMetricStatus = (value: number, thresholds: { good: number; medium: number }) => {
    if (value >= thresholds.good) return 'good'
    if (value >= thresholds.medium) return 'medium'
    return 'poor'
  }

  const getDensityStatus = () => getMetricStatus(analysisData.density_score, { good: 80, medium: 60 })
  const getExposureStatus = () => getMetricStatus(100 - analysisData.scalp_exposure_percent, { good: 82, medium: 70 })

  const getStatusColor = (status: 'good' | 'medium' | 'poor') => {
    switch (status) {
      case 'good': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'poor': return 'text-red-600'
    }
  }

  const getStatusText = (status: 'good' | 'medium' | 'poor') => {
    switch (status) {
      case 'good': return '良好'
      case 'medium': return '中等'
      case 'poor': return '需要改善'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 恢复阶段卡片 */}
      <Card className="warm-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            🎯 当前恢复阶段
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className={`stage-indicator stage-${analysisData.stage} text-2xl mb-4`}>
              {currentStage.emoji}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {currentStage.name}
            </h3>
            <p className="text-gray-600 mb-4">
              阶段 {analysisData.stage} / 4
            </p>
            <p className="text-sm text-gray-500">
              {currentStage.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 关键指标卡片组 */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          📊 恢复指标
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {/* 密度评分 */}
          <Card className="metric-card">
            <CardContent className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <h4 className="font-semibold text-gray-800 mb-1">密度评分</h4>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {analysisData.density_score}/100
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">
                    {i < Math.floor(analysisData.density_score / 20) ? '⭐' : '☆'}
                  </span>
                ))}
              </div>
              <p className={`text-sm font-medium ${getStatusColor(getDensityStatus())}`}>
                {getStatusText(getDensityStatus())}
              </p>
            </CardContent>
          </Card>

          {/* 头皮暴露率 */}
          <Card className="metric-card">
            <CardContent className="text-center">
              <div className="text-3xl mb-2">👁️</div>
              <h4 className="font-semibold text-gray-800 mb-1">头皮暴露率</h4>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {analysisData.scalp_exposure_percent}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-warm-orange to-warm-yellow h-2 rounded-full"
                  style={{ width: `${analysisData.scalp_exposure_percent}%` }}
                ></div>
              </div>
              <p className={`text-sm font-medium ${getStatusColor(getExposureStatus())}`}>
                {getStatusText(getExposureStatus())}
              </p>
            </CardContent>
          </Card>

          {/* 发缝宽度 */}
          <Card className="metric-card">
            <CardContent className="text-center">
              <div className="text-3xl mb-2">📏</div>
              <h4 className="font-semibold text-gray-800 mb-1">发缝宽度</h4>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {analysisData.parting_width_px}px
              </div>
              <div className="flex justify-center mb-2">
                <div className="w-16 h-1 bg-gradient-to-r from-warm-orange to-warm-yellow rounded-full"></div>
              </div>
              <p className="text-sm text-gray-600">
                {analysisData.parting_width_px < 10 ? '收窄中' : '需要关注'}
              </p>
            </CardContent>
          </Card>

          {/* 新生绒毛 */}
          <Card className="metric-card">
            <CardContent className="text-center">
              <div className="text-3xl mb-2">🌱</div>
              <h4 className="font-semibold text-gray-800 mb-1">新生绒毛</h4>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {analysisData.baby_hairs_visible ? '✅' : '❌'}
              </div>
              <div className="text-3xl mb-2">
                {analysisData.baby_hairs_visible ? '🌱' : '🌿'}
              </div>
              <p className={`text-sm font-medium ${analysisData.baby_hairs_visible ? 'text-green-600' : 'text-gray-600'}`}>
                {analysisData.baby_hairs_visible ? '可见' : '不可见'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 进阶信息卡片（可选字段） */}
      {(analysisData.hairline_stability !== undefined || analysisData.left_right_symmetry) && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            🔍 进阶分析
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {analysisData.hairline_stability !== undefined && (
              <Card className="metric-card">
                <CardContent className="text-center">
                  <div className="text-3xl mb-2">📏</div>
                  <h4 className="font-semibold text-gray-800 mb-1">发际线稳定性</h4>
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    {analysisData.hairline_stability ? '✅' : '❌'}
                  </div>
                  <p className={`text-sm font-medium ${analysisData.hairline_stability ? 'text-green-600' : 'text-red-600'}`}>
                    {analysisData.hairline_stability ? '稳定' : '需要关注'}
                  </p>
                </CardContent>
              </Card>
            )}
            
            {analysisData.left_right_symmetry && (
              <Card className="metric-card">
                <CardContent className="text-center">
                  <div className="text-3xl mb-2">⚖️</div>
                  <h4 className="font-semibold text-gray-800 mb-1">左右对称性</h4>
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    {analysisData.left_right_symmetry}
                  </div>
                  <p className="text-sm text-gray-600">
                    {analysisData.left_right_symmetry === '正常' ? '对称良好' : '需要观察'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* 分析总结卡片 */}
      <Card className="warm-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
            <span className="mr-2">💡</span>
            AI 分析总结
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 置信度 */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">分析置信度</span>
            <span className={`confidence-badge ${
              confidence >= 80 ? 'confidence-high' :
              confidence >= 60 ? 'confidence-medium' : 'confidence-low'
            }`}>
              {confidence}%
            </span>
          </div>

          {/* 状态总结 */}
          <div className="p-4 bg-gradient-to-r from-warm-orange/10 to-warm-yellow/10 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">📝</span>
              状态总结
            </h4>
            <p className="text-gray-700">{adviceData.summary}</p>
          </div>

          {/* 恢复建议 */}
          <div className="p-4 bg-gradient-to-r from-warm-green/10 to-green-100 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">💪</span>
              恢复建议
            </h4>
            <p className="text-gray-700">{adviceData.advice}</p>
          </div>

          {/* 免责声明 */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              ⚠️ AI分析结果仅供参考，建议咨询专业医生
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 