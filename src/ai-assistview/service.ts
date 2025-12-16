export interface AzureOpenAIRequest {
  apiKey: string;       
  endpoint: string;     
  deployment: string;   
  prompt: string;       
  apiVersion?: string;  
}

export async function getAzureOpenAIAssist(req: AzureOpenAIRequest): Promise<string> {
  const {
    apiKey, endpoint, deployment, prompt, apiVersion = '2024-07-01-preview'
  } = req;

  const url =
    endpoint.replace(/\/$/, '') +
    `/openai/deployments/${encodeURIComponent(deployment)}/chat/completions` +
    `?api-version=${encodeURIComponent(apiVersion)}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 200
    })
  });

  const data = await res.json().catch(() => ({} as any));
  if (!res.ok) {
    const apiMsg = (data as any)?.error?.message || `HTTP ${res.status} ${res.statusText}`;
    throw new Error(apiMsg);
  }
  return (data as any)?.choices?.[0]?.message?.content?.trim() || 'No response received.';
}

/**
* Gemini REST (no SDK). Pass model name, e.g. 'gemini-1.5-flash' or 'gemini-2.5-flash'
*/
export async function getGeminiAIAssit(apiKey: string, model: string, prompt: string): Promise<string> {
  try {
    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}` +
      `:generateContent?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    throw error;
  }
}

export async function getdeepSeekAIAssit(apiKey: string, prompt: string): Promise<string> {
  try {
      const url = 'https://api.deepseek.com/chat/completions';
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              model: 'deepseek-reasoner',
              messages: [{ role: 'user', content: prompt }]
          })
      });
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      return data.choices[0].message.content;
  } catch (error) {
      throw error;
  }
}