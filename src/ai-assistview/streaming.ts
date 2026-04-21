import { loadCultureFiles } from '../common/culture-loader';
import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { streamingSuggestions, streamingData } from './promptResponseData';
import { MarkdownConverter } from "@syncfusion/ej2-markdown-converter";

/**
 * streaming sample
 */

(window as any).default = (): void => {
    loadCultureFiles();

    let streamingAIAssistView: AIAssistView = new AIAssistView({
        enableStreaming: true,
        promptSuggestions: streamingSuggestions,
        promptRequest: onPromptRequest,
        bannerTemplate: "#bannerContent",
        toolbarSettings: {
            items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
            itemClicked: toolbarItemClicked
        },
    });
    streamingAIAssistView.appendTo('#streamAssistView');

    function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
        if (args.item?.iconCss === 'e-icons e-refresh') {
            streamingAIAssistView.prompts = [];
            streamingAIAssistView.promptSuggestions = streamingSuggestions;
        }
    }

    function onPromptRequest(args: PromptRequestEventArgs) {
        let streamingResponse = streamingData.find((data: any) => data.prompt === args.prompt);
        let defaultResponse = "For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.";
        if (streamingResponse) {
            streamingAIAssistView.addPromptResponse(streamingResponse.response, true);
            streamingAIAssistView.promptSuggestions = streamingResponse?.suggestions || streamingSuggestions;
        } else {
            streamingAIAssistView.addPromptResponse(defaultResponse, true);
            streamingAIAssistView.promptSuggestions = streamingSuggestions;
        }
    }
};
