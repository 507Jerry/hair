/**
 * 应用常量定义
 */

import { StageInfo } from '@/types/analysis'

/**
 * 恢复阶段信息
 */
export const stageInfo: Record<number, StageInfo> = {
  0: {
    stage: 0,
    name: '掉发期',
    emoji: '😰',
    description: '头发开始脱落，需要及时干预',
    color: 'text-red-600'
  },
  1: {
    stage: 1,
    name: '新生期',
    emoji: '🌱',
    description: '开始出现新生绒毛，恢复初见成效',
    color: 'text-yellow-600'
  },
  2: {
    stage: 2,
    name: '增长期',
    emoji: '🌿',
    description: '头发密度明显改善，持续增长中',
    color: 'text-green-600'
  },
  3: {
    stage: 3,
    name: '稳定期',
    emoji: '🌳',
    description: '恢复效果显著，进入稳定维护阶段',
    color: 'text-blue-600'
  }
} 