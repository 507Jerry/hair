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
              text: `请分析这张头发照片，并严格按照以下JSON格式返回结果，不要添加任何其他文字或markdown格式：

{
  "density_score": 数值,
  "scalp_exposure_percent": 数值,
  "parting_width_px": 数值,
  "baby_hairs_visible": true或false,
  "stage": 0到3的整数,
  "hairline_stability": true或false,
  "left_right_symmetry": "正常"或"不对称"或"未知"
}

评分标准：
- density_score：头发密度评分（0-100分）
- scalp_exposure_percent：头皮暴露率（0-100%）
- parting_width_px：发缝宽度（像素）
- baby_hairs_visible：是否可见新生绒毛
- stage：恢复阶段（0=掉发期，1=新生期，2=增长期，3=稳定期）
- hairline_stability：发际线是否稳定
- left_right_symmetry：左右对称情况

请只返回JSON，不要有任何其他内容。`
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
    // 清理内容，移除可能的markdown格式
    let cleanedContent = content.trim();
    
    // 移除markdown代码块
    cleanedContent = cleanedContent.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // 移除可能的说明文字
    const jsonStart = cleanedContent.indexOf('{');
    const jsonEnd = cleanedContent.lastIndexOf('}') + 1;
    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      cleanedContent = cleanedContent.substring(jsonStart, jsonEnd);
    }
    
    console.log('清理后的内容:', cleanedContent);
    
    // 尝试解析JSON
    const jsonData = JSON.parse(cleanedContent);
    console.log('JSON解析成功:', jsonData);
    
    // 验证必要字段
    const requiredFields = ['density_score', 'scalp_exposure_percent', 'parting_width_px', 'baby_hairs_visible', 'stage'];
    for (const field of requiredFields) {
      if (!(field in jsonData)) {
        throw new Error(`缺少必要字段: ${field}`);
      }
    }
    
    return jsonData;
    
  } catch (parseError) {
    console.error('JSON解析失败:', parseError);
    console.error('原始内容:', content);
    throw new Error(`JSON解析失败: ${parseError}. 原始内容: ${content.substring(0, 200)}...`);
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
          content: `请根据以下分析结果，用温暖鼓励的语气输出建议。请严格按照以下JSON格式返回，不要添加任何其他文字：

{
  "summary": "一句话的状态总结",
  "advice": "一句话的恢复建议"
}

分析数据：
${JSON.stringify(analysisData, null, 2)}

请只返回JSON格式，不要有任何其他内容。`
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
    // 清理内容，移除可能的markdown格式
    let cleanedContent = content.trim();
    
    // 移除markdown代码块
    cleanedContent = cleanedContent.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // 移除可能的说明文字
    const jsonStart = cleanedContent.indexOf('{');
    const jsonEnd = cleanedContent.lastIndexOf('}') + 1;
    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      cleanedContent = cleanedContent.substring(jsonStart, jsonEnd);
    }
    
    console.log('Text API清理后的内容:', cleanedContent);
    
    // 尝试解析JSON
    const jsonData = JSON.parse(cleanedContent);
    console.log('Text API JSON解析成功:', jsonData);
    
    // 验证必要字段
    const requiredFields = ['summary', 'advice'];
    for (const field of requiredFields) {
      if (!(field in jsonData)) {
        throw new Error(`缺少必要字段: ${field}`);
      }
    }
    
    return jsonData;
    
  } catch (parseError) {
    console.error('Text API JSON解析失败:', parseError);
    console.error('原始内容:', content);
    throw new Error(`JSON解析失败: ${parseError}. 原始内容: ${content.substring(0, 200)}...`);
  }
} 