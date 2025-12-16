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