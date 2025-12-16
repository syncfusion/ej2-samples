export interface AzureOpenAIRequest {
    apiKey: string;
    endpoint: string;
    deployment: string;
    prompt: string;
    apiVersion?: string;
}
export declare function getAzureOpenAIAssist(req: AzureOpenAIRequest): Promise<string>;
