'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { validateImageFile } from '@/lib/analysis-service'

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  imagePreview?: string | null
  isAnalyzing?: boolean
}

export default function ImageUpload({ onImageSelect, imagePreview, isAnalyzing }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileSelect = useCallback((file: File) => {
    setError(null)
    
    const validation = validateImageFile(file)
    if (!validation.isValid) {
      setError(validation.error || '文件格式不支持')
      return
    }

    onImageSelect(file)
  }, [onImageSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [handleFileSelect])

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [handleFileSelect])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  // 启动摄像头
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // 优先使用后置摄像头
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      })
      setCameraStream(stream)
      setShowCamera(true)
      setError(null)
    } catch (err) {
      setError('无法访问摄像头，请检查权限设置')
    }
  }, [])

  // 停止摄像头
  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop())
      setCameraStream(null)
    }
    setShowCamera(false)
  }, [cameraStream])

  // 拍照
  const takePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'captured-photo.jpg', { type: 'image/jpeg' })
            handleFileSelect(file)
            stopCamera()
          }
        }, 'image/jpeg', 0.9)
      }
    }
  }, [handleFileSelect, stopCamera])

  // 当视频元素准备好时播放
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream
    }
  }, [cameraStream])

  // 组件卸载时清理摄像头
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [cameraStream])

  if (imagePreview) {
    return (
      <div className="warm-card p-8 text-center animate-fade-in">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          📸 你的头发照片
        </h3>
        
        <div className="mb-6">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-warm-orange/20 shadow-lg">
            <img
              src={imagePreview}
              alt="头发照片预览"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={handleClick}
            disabled={isAnalyzing}
            className="warm-button-secondary"
          >
            🔄 重新上传
          </Button>
          
          <Button
            onClick={() => onImageSelect(new File([], 'current-image'))}
            disabled={isAnalyzing}
            className="warm-button"
          >
            🚀 开始分析
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    )
  }

  if (showCamera) {
    return (
      <div className="warm-card p-8 animate-fade-in">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          📷 直接拍照
        </h3>
        
        <div className="mb-6">
          <div className="relative w-full max-w-md mx-auto">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded-lg border-2 border-warm-orange/20"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={takePhoto}
            className="warm-button"
          >
            📸 拍照
          </Button>
          
          <Button
            variant="outline"
            onClick={stopCamera}
            className="warm-button-secondary"
          >
            ❌ 取消
          </Button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            请将摄像头对准头顶，保持头发自然状态
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="warm-card p-8 animate-fade-in">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        📸 智能拍摄指导
      </h3>
      
      <div
        className={`upload-area ${isDragOver ? 'dragover' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-warm-orange/20 to-warm-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📷</span>
          </div>
          <h4 className="text-lg font-medium text-gray-800 mb-2">
            上传你的头发照片
          </h4>
          <p className="text-gray-600 mb-6">
            支持 JPG/PNG 格式，最大 10MB
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="text-warm-orange">☀️</span>
            <span>光线要求：自然光或充足室内光</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-warm-orange">📐</span>
            <span>拍摄角度：头顶正上方</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-warm-orange">💇‍♀️</span>
            <span>头发状态：自然状态，不要过度梳理</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-warm-orange">📱</span>
            <span>图片质量：清晰，分辨率≥1024x1024</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleClick}
            className="warm-button"
          >
            📷 选择照片
          </Button>
          
          <Button
            onClick={startCamera}
            className="warm-button-secondary"
          >
            📱 直接拍照
          </Button>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            或直接拖拽图片到此处
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  )
} 