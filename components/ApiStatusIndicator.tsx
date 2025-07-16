'use client'

import React from 'react'
import { checkApiConfig } from '@/lib/api-config'

export default function ApiStatusIndicator() {
  const isApiConfigured = checkApiConfig()

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        isApiConfigured 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      }`}>
        {isApiConfigured ? '🤖 真实AI分析' : '🎭 Mock数据'}
      </div>
    </div>
  )
} 