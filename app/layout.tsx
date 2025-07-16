import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ApiStatusIndicator from '@/components/ApiStatusIndicator'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '头发恢复助手 - 温暖关怀你的恢复之旅',
  description: '专业的头发恢复分析工具，用AI技术帮助你了解恢复进度，提供个性化建议。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-warm-cream to-warm-gray">
          <ApiStatusIndicator />
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-warm-orange to-warm-yellow rounded-full flex items-center justify-center">
                    <span className="text-white text-xl"></span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-warm-orange to-warm-yellow bg-clip-text text-transparent">
                      头发恢复助手
                    </h1>
                    <p className="text-sm text-gray-600">让我们一起见证你的恢复之旅</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          
          <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100 mt-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="text-center text-gray-600">
                <p className="text-sm">
                  AI分析结果仅供参考，建议咨询专业医生
                </p>
                <p className="text-xs mt-2">
                  每一步都是进步！保持耐心，你的坚持会有回报
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 