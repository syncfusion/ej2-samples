import { loadCultureFiles } from '../common/culture-loader';
import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { streamingSuggestions, streamingData } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

/**
 * streaming sample
 */

(window as any).default = (): void => {
    loadCultureFiles();

    let abortController: AbortController;
    let streamingAIAssistView: AIAssistView = new AIAssistView({
        enableStreaming: true,
        promptSuggestions: streamingSuggestions,
        promptRequest: onPromptRequest,
        bannerTemplate: bannerContent,
        stopRespondingClick: stopAIResponse,
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
            stopAIResponse();
        }
    }

    async function onPromptRequest(args: PromptRequestEventArgs) {
        abortController = new AbortController();
        let streamingResponse = streamingData.find((data: any) => data.prompt === args.prompt);
        let response = await getAIResponse(args, abortController);
        streamingAIAssistView.addPromptResponse(response);
        streamingAIAssistView.promptSuggestions = streamingResponse ? streamingResponse.suggestions : streamingSuggestions;
    }

    function bannerContent(): string {
        return `<div class="banner-content">
                    <div class="e-icons e-assistview-icon"></div>
                    <h3>AI Assistance</h3>
                    <i>Update real-time responses with chunked streaming updates.</i>
                </div>`;
    }

    function stopAIResponse() {
        if (abortController) {
            abortController.abort();
        }
    }
};
