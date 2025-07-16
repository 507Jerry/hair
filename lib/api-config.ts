/**
 * API配置文件
 * 请在这里配置您的OpenAI API密钥
 */

export const API_CONFIG = {
  // 请替换为您的OpenAI API密钥
  OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'your-api-key-here',
  OPENAI_API_URL: 'https://api.openai.com/v1',
  
  // GPT-4o Vision 模型
  VISION_MODEL: 'gpt-4o',
  
  // GPT-4 文本模型
  TEXT_MODEL: 'gpt-4o-mini',
}

/**
 * 检查API配置
 */
export function checkApiConfig(): boolean {
  return API_CONFIG.OPENAI_API_KEY !== 'your-api-key-here' && 
         API_CONFIG.OPENAI_API_KEY !== '';
}

/**
 * 将文件转换为Base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      // 移除 data:image/jpeg;base64, 前缀
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = error => reject(error);
  });
}

/**
 * 调用GPT-4o Vision API
 */
export async function callVisionAPI(imageBase64: string): Promise<any> {
  if (!checkApiConfig()) {
    throw new Error('请配置OpenAI API密钥');
  }

  console.log('开始调用Vision API...');

  const response = await fetch(`${API_CONFIG.OPENAI_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: API_CONFIG.VISION_MODEL,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `你是一位专业的毛发健康分析师，请根据这张头发照片提取以下结构化数据：

分析要求：
1. 请在光线充足的环境下分析
2. 保持客观专业的分析态度
3. 基于可见特征进行评估

请提取以下数据：
- density_score：头发密度评分（0-100分），数值越高说明头发越浓密
- scalp_exposure_percent：头皮暴露率（百分比），反映稀疏程度，暴露越多头发越稀疏
- parting_width_px：发缝宽度（像素），越宽说明顶部越稀
- baby_hairs_visible：是否可见新生绒毛（true/false），有则说明处于恢复状态
- stage：恢复阶段判断（0-3）
  - 0 = 掉发期（暴露明显，无绒毛）
  - 1 = 新生绒毛期（开始恢复）
  - 2 = 增长期（发缝收窄）
  - 3 = 稳定维护期（基本恢复）

可选字段（如果图片包含相关信息）：
- hairline_stability：发际线是否稳定（true/false）
- left_right_symmetry：左右头发对称情况（"正常"/"不对称"/"未知"）

请返回JSON格式：
{
  "density_score": 63,
  "scalp_exposure_percent": 22.5,
  "parting_width_px": 9.7,
  "baby_hairs_visible": true,
  "stage": 1,
  "hairline_stability": true,
  "left_right_symmetry": "正常"
}`
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0.1
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API响应错误:', response.status, response.statusText, errorText);
    throw new Error(`API调用失败: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('API原始响应:', data);
  
  const content = data.choices[0]?.message?.content;
  
  if (!content) {
    console.error('API返回内容为空');
    throw new Error('API返回内容为空');
  }

  console.log('API返回的原始内容:', content);

  try {
    // 尝试多种方式解析JSON
    let jsonData = null;
    
    // 方法1: 直接尝试解析整个内容
    try {
      jsonData = JSON.parse(content);
      console.log('直接解析成功:', jsonData);
      return jsonData;
    } catch (e) {
      console.log('直接解析失败，尝试提取JSON...');
    }
    
    // 方法2: 尝试提取JSON部分
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        jsonData = JSON.parse(jsonMatch[0]);
        console.log('提取JSON解析成功:', jsonData);
        return jsonData;
      } catch (e) {
        console.error('提取的JSON解析失败:', jsonMatch[0], e);
      }
    }
    
    // 方法3: 尝试清理内容后解析
    const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    try {
      jsonData = JSON.parse(cleanedContent);
      console.log('清理后解析成功:', jsonData);
      return jsonData;
    } catch (e) {
      console.error('清理后解析失败:', cleanedContent, e);
    }
    
    // 如果所有方法都失败，抛出详细错误
    throw new Error(`无法解析API返回的JSON。原始内容: ${content.substring(0, 200)}...`);
    
  } catch (parseError) {
    console.error('JSON解析失败:', parseError);
    throw new Error(`JSON解析失败: ${parseError}`);
  }
}

/**
 * 调用GPT-4文本API生成建议
 */
export async function callTextAPI(analysisData: any): Promise<any> {
  if (!checkApiConfig()) {
    throw new Error('请配置OpenAI API密钥');
  }

  console.log('开始调用Text API...');

  const response = await fetch(`${API_CONFIG.OPENAI_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: API_CONFIG.TEXT_MODEL,
      messages: [
        {
          role: 'user',
          content: `你是一位温暖的毛发恢复顾问，请根据以下分析结果，用温暖鼓励的语气输出：

数据：
${JSON.stringify(analysisData, null, 2)}

请输出：
1. 一句话的状态总结（温暖鼓励的语气）
2. 一句话的恢复建议（具体可操作）

输出格式：
{
  "summary": "你正处于新生绒毛期，恢复初见成效！",
  "advice": "建议继续保持营养补充和规律作息，坚持记录变化"
}`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Text API响应错误:', response.status, response.statusText, errorText);
    throw new Error(`API调用失败: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Text API原始响应:', data);
  
  const content = data.choices[0]?.message?.content;
  
  if (!content) {
    console.error('Text API返回内容为空');
    throw new Error('API返回内容为空');
  }

  console.log('Text API返回的原始内容:', content);

  try {
    // 尝试多种方式解析JSON
    let jsonData = null;
    
    // 方法1: 直接尝试解析整个内容
    try {
      jsonData = JSON.parse(content);
      console.log('Text API直接解析成功:', jsonData);
      return jsonData;
    } catch (e) {
      console.log('Text API直接解析失败，尝试提取JSON...');
    }
    
    // 方法2: 尝试提取JSON部分
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        jsonData = JSON.parse(jsonMatch[0]);
        console.log('Text API提取JSON解析成功:', jsonData);
        return jsonData;
      } catch (e) {
        console.error('Text API提取的JSON解析失败:', jsonMatch[0], e);
      }
    }
    
    // 方法3: 尝试清理内容后解析
    const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    try {
      jsonData = JSON.parse(cleanedContent);
      console.log('Text API清理后解析成功:', jsonData);
      return jsonData;
    } catch (e) {
      console.error('Text API清理后解析失败:', cleanedContent, e);
    }
    
    // 如果所有方法都失败，抛出详细错误
    throw new Error(`无法解析Text API返回的JSON。原始内容: ${content.substring(0, 200)}...`);
    
  } catch (parseError) {
    console.error('Text API JSON解析失败:', parseError);
    throw new Error(`JSON解析失败: ${parseError}`);
  }
} 