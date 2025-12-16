export interface AzureOpenAIRequest {
    apiKey: string;
    endpoint: string;
    deployment: string;
    prompt: string;
    apiVersion?: string;
}
export declare function getAzureOpenAIAssist(req: AzureOpenAIRequest): Promise<string>;
export declare function getGeminiAIAssit(apiKey: string, model: string, prompt: string): Promise<string>;
export declare function getdeepSeekAIAssit(apiKey: string, prompt: string): Promise<string>;
