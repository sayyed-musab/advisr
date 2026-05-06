// Helper to attempt repairing truncated JSON by closing open structures
const repairTruncatedJson = (str) => {
  let s = str.trim();
  // Count open braces and quotes to try to close them
  let openBraces = 0;
  let inString = false;
  let escape = false;
  for (const ch of s) {
    if (escape) { escape = false; continue; }
    if (ch === '\\' && inString) { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === '{') openBraces++;
    if (ch === '}') openBraces--;
  }
  // If we're still inside a string, close it
  if (inString) s += '"';
  // Close any open values and braces
  while (openBraces > 0) {
    s += '}';
    openBraces--;
  }
  return s;
};

export const analyzeBusiness = async (formData) => {
  const systemPrompt = `You are an expert Business Consultant specializing in Small and Medium Enterprises (SMEs) and local shop owners in India.
Your advice is highly practical and tailored to the Indian market. Always use Indian Rupees (₹) for financial estimates, reference local marketing channels (WhatsApp Business, UPI, Justdial, Instagram, local SEO), and give culturally-aware, immediately actionable examples.`;

  const userPrompt = `Analyze the following business profile and respond with ONLY a valid JSON object containing EXACTLY three keys: "diagnosis", "actionPlan", and "prioritySteps".

CRITICAL RULES:
- All values MUST be plain text strings (no nested objects or arrays).
- Use markdown within the strings for formatting (bold, bullet points, tables).
- Use \\n to separate bullet points and paragraphs within strings.
- Tables must use GitHub Flavored Markdown format.
- Return ONLY the JSON object — no extra text, no code fences, no preamble.

Business Profile:
- Business Type: ${formData.businessType}
- City: ${formData.city}
- Monthly Revenue: ${formData.revenue}
- Business Age: ${formData.businessAge}
- Core Problem: ${formData.problemArea}
- Team Size: ${formData.teamSize}
- Urgency: ${formData.urgency}
- Additional Details: ${formData.detail}`;

  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-nano-30b-a3b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 8192,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`NVIDIA API Error: ${response.statusText} — ${errText}`);
    }

    const data = await response.json();

    const content = data.choices?.[0]?.message?.content;
    const finishReason = data.choices?.[0]?.finish_reason;

    if (!content) {
      return {
        diagnosis: "The AI model returned an empty response. Please try again.",
        actionPlan: "Unable to generate an action plan.",
        prioritySteps: "Unable to generate priority steps."
      };
    }

    // Clean up markdown code fences if the model wrapped in them
    let cleanContent = content.trim();
    cleanContent = cleanContent.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    cleanContent = cleanContent.replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

    // Extract from first { to last }
    const startIdx = cleanContent.indexOf('{');
    const endIdx = cleanContent.lastIndexOf('}');
    if (startIdx !== -1 && endIdx !== -1) {
      cleanContent = cleanContent.substring(startIdx, endIdx + 1);
    } else if (startIdx !== -1) {
      // Truncated — try to repair
      cleanContent = repairTruncatedJson(cleanContent.substring(startIdx));
      console.warn('Response was truncated (finish_reason:', finishReason, '). Attempted JSON repair.');
    }

    try {
      const parsed = JSON.parse(cleanContent);
      return {
        diagnosis: typeof parsed.diagnosis === 'string' ? parsed.diagnosis : JSON.stringify(parsed.diagnosis, null, 2),
        actionPlan: typeof parsed.actionPlan === 'string' ? parsed.actionPlan : JSON.stringify(parsed.actionPlan, null, 2),
        prioritySteps: typeof parsed.prioritySteps === 'string' ? parsed.prioritySteps : JSON.stringify(parsed.prioritySteps, null, 2),
      };
    } catch (e) {
      // Second attempt: try repairing even if we thought we had balanced braces
      try {
        const repaired = repairTruncatedJson(cleanContent);
        const parsed = JSON.parse(repaired);
        return {
          diagnosis: typeof parsed.diagnosis === 'string' ? parsed.diagnosis : JSON.stringify(parsed.diagnosis, null, 2),
          actionPlan: typeof parsed.actionPlan === 'string' ? parsed.actionPlan : JSON.stringify(parsed.actionPlan, null, 2),
          prioritySteps: typeof parsed.prioritySteps === 'string' ? parsed.prioritySteps : JSON.stringify(parsed.prioritySteps, null, 2),
        };
      } catch (e2) {
        console.error("Failed to parse JSON (even after repair):", e2.message);
        console.error("Raw content was:", content);
        return {
          diagnosis: content || "The AI model returned an empty response.",
          actionPlan: "Unable to extract action plan from the AI response.",
          prioritySteps: "Unable to extract priority steps from the AI response."
        };
      }
    }
  } catch (error) {
    console.error('NVIDIA API Error:', error);
    throw new Error('Failed to analyze business data with AI.');
  }
};

export const answerFollowup = async (session, question) => {
  const prompt = `You are an expert Business Consultant specializing in Small Indian Businesses and local shop owners. The user previously shared this about their Indian business:
Type: ${session.businessType}, Problem: ${session.problemArea}, Details: ${session.detail}

They have a follow-up question: "${question}"
Please provide a helpful, concise answer.
Ensure your advice is highly relevant to the Indian market. Use Indian Rupees (₹) for money, reference local apps/strategies (like UPI, WhatsApp Business, Swiggy/Zomato if food, local vendors), and give culturally relevant examples.
Use standard markdown formatting (including proper \\n for line breaks, lists, and markdown tables if necessary).`;

  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-nano-30b-a3b',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4096,
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
