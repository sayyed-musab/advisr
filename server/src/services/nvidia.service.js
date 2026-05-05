import { env } from '../config/env.js';

export const analyzeBusiness = async (formData) => {
  // Using NVIDIA NIM completion endpoint (or adapt if different)
  // We're using standard fetch here, adjust URL based on the exact model
  const prompt = `You are a business consultant. Please analyze the following business profile and provide a JSON response with "diagnosis", "actionPlan", and "prioritySteps".
  
Profile:
Business Type: ${formData.businessType}
City: ${formData.city}
Revenue: ${formData.revenue}
Age: ${formData.businessAge}
Problem: ${formData.problemArea}
Team Size: ${formData.teamSize}
Urgency: ${formData.urgency}
Details: ${formData.detail}

Return ONLY valid JSON.
`;

  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.NVIDIA_API_KEY}`
      },
      body: JSON.stringify({
        model: 'meta/llama3-70b-instruct', // Or whatever model is required
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1024,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      throw new Error(`NVIDIA API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Attempt to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback if not perfectly formatted JSON
    return {
      diagnosis: content,
      actionPlan: "Extracted from content.",
      prioritySteps: "Extracted from content."
    };
  } catch (error) {
    console.error('NVIDIA API Error:', error);
    throw new Error('Failed to analyze business data with AI.');
  }
};

export const answerFollowup = async (session, question) => {
  const prompt = `You are a business consultant. The user previously shared this about their business:
Type: ${session.businessType}, Problem: ${session.problemArea}, Details: ${session.detail}

They have a follow-up question: "${question}"
Please provide a helpful, concise answer.`;

  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.NVIDIA_API_KEY}`
      },
      body: JSON.stringify({
        model: 'meta/llama3-70b-instruct',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 512,
        temperature: 0.5
      })
    });

    if (!response.ok) {
      throw new Error(`NVIDIA API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('NVIDIA API Error:', error);
    throw new Error('Failed to answer follow-up question.');
  }
};
