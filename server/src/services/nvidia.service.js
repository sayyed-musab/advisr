import { env } from '../config/env.js';

export const analyzeBusiness = async (formData) => {
  // Using NVIDIA NIM completion endpoint (or adapt if different)
  // We're using standard fetch here, adjust URL based on the exact model
  const prompt = `You are an expert business consultant. Analyze the following business profile and provide a JSON response with EXACTLY three keys: "diagnosis", "actionPlan", and "prioritySteps".
The values for these keys MUST be formatted as plain text strings.
CRITICAL FORMATTING RULES:
1. You may use markdown, but you MUST use proper newline characters (\\n) before any bullet points, lists, or paragraphs.
2. DO NOT output bullet points on a single line. Separate them with \\n.
3. If you use tables, format them using standard GitHub Flavored Markdown tables.
4. DO NOT use nested JSON objects or arrays for the values.
  
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
        model: 'nvidia/nemotron-3-nano-30b-a3b', 
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4096,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      throw new Error(`NVIDIA API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    try {
      // Clean up markdown block if present
      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/^```json/, '').replace(/```$/, '').trim();
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/^```/, '').replace(/```$/, '').trim();
      }
      
      // Extract from first { to last }
      const startIdx = cleanContent.indexOf('{');
      const endIdx = cleanContent.lastIndexOf('}');
      if (startIdx !== -1 && endIdx !== -1) {
        cleanContent = cleanContent.substring(startIdx, endIdx + 1);
      }

      const parsed = JSON.parse(cleanContent);
      return {
        diagnosis: typeof parsed.diagnosis === 'string' ? parsed.diagnosis : JSON.stringify(parsed.diagnosis, null, 2),
        actionPlan: typeof parsed.actionPlan === 'string' ? parsed.actionPlan : JSON.stringify(parsed.actionPlan, null, 2),
        prioritySteps: typeof parsed.prioritySteps === 'string' ? parsed.prioritySteps : JSON.stringify(parsed.prioritySteps, null, 2),
      };
    } catch (e) {
      console.error("Failed to parse JSON:", e, content);
      // Fallback if not perfectly formatted JSON
      return {
        diagnosis: content || "The AI model returned an empty response.",
        actionPlan: "Unable to extract action plan from the AI response.",
        prioritySteps: "Unable to extract priority steps from the AI response."
      };
    }
  } catch (error) {
    console.error('NVIDIA API Error:', error);
    throw new Error('Failed to analyze business data with AI.');
  }
};

export const answerFollowup = async (session, question) => {
  const prompt = `You are an expert business consultant. The user previously shared this about their business:
Type: ${session.businessType}, Problem: ${session.problemArea}, Details: ${session.detail}

They have a follow-up question: "${question}"
Please provide a helpful, concise answer.
Use standard markdown formatting (including proper \\n for line breaks, lists, and markdown tables if necessary).`;

  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.NVIDIA_API_KEY}`
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-nano-30b-a3b',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2048,
        temperature: 0.5
      })
    });

    if (!response.ok) {
      throw new Error(`NVIDIA API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "The AI model returned an empty response.";
  } catch (error) {
    console.error('NVIDIA API Error:', error);
    throw new Error('Failed to answer follow-up question.');
  }
};
