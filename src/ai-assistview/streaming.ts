import { loadCultureFiles } from '../common/culture-loader';
import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { streamingSuggestions, streamingData } from './promptResponseData';
import { MarkdownConverter } from "@syncfusion/ej2-markdown-converter";

/**
 * streaming sample
 */

(window as any).default = (): void => {
    loadCultureFiles();

    let stopStreaming: boolean = false;
    let streamingAIAssistView: AIAssistView = new AIAssistView({
        promptSuggestions: streamingSuggestions,
        promptRequest: onPromptRequest,
        bannerTemplate: "#bannerContent",
        toolbarSettings: {
            items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
            itemClicked: toolbarItemClicked
        },
        stopRespondingClick: handleStopResponse
    });
    streamingAIAssistView.appendTo('#streamAssistView');

    function handleStopResponse(): void {
        stopStreaming = true;
    }
    function onPromptRequest(args: PromptRequestEventArgs) {
        let lastResponse: string = "";
        let streamingResponse: any = streamingData.find((data: any) => data.prompt === args.prompt);
        const defaultResponse = "For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.";
        const responseUpdateRate: number = 10; // Update scroll and streaming response every 10 characters
        async function streamResponse(response: string) {
            let i = 0;
            const responseLength: number = response.length;
            while (i < responseLength && !stopStreaming) {
                lastResponse += response[i];
                i++;
                if (i % responseUpdateRate === 0 || i === responseLength) {
                    const htmlResponse: string | Promise<string> = MarkdownConverter.toHtml(lastResponse);
                    streamingAIAssistView.addPromptResponse(htmlResponse, i === responseLength);
                    streamingAIAssistView.scrollToBottom();
                }
                await new Promise(resolve => setTimeout(resolve, 15)); // Delay before the next chunk
            }
            streamingAIAssistView.promptSuggestions = streamingResponse?.suggestions || streamingSuggestions;
        }
    
        if (streamingResponse) {
            stopStreaming = false;
            streamResponse(streamingResponse.response);
        } else {
            streamingAIAssistView.addPromptResponse(defaultResponse, true);
            streamingAIAssistView.promptSuggestions = streamingSuggestions;
        }
    }

    function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            streamingAIAssistView.prompts = [];
            streamingAIAssistView.promptSuggestions = streamingSuggestions;
        }
    }
};
