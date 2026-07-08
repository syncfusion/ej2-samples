import { loadCultureFiles } from '../common/culture-loader';
import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { streamingSuggestions, streamingData } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

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

    async function onPromptRequest(args: PromptRequestEventArgs) {
        const abortController: AbortController = new AbortController();
        let streamingResponse = streamingData.find((data: any) => data.prompt === args.prompt);
        let response = streamingResponse ? streamingResponse.response : await getAIResponse(args, abortController);
        streamingAIAssistView.addPromptResponse(response);
        streamingAIAssistView.promptSuggestions = streamingResponse ? streamingResponse.suggestions : streamingSuggestions;
    }
};
