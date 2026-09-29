import { loadCultureFiles } from '../common/culture-loader';

import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { defaultPromptResponseData, defaultSuggestions  } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

/**
 * Default sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let abortController: AbortController;
    let defaultAIAssistView: AIAssistView = new AIAssistView({
        promptSuggestions: defaultSuggestions,
        enableStreaming: true,
        promptRequest: onPromptRequest,
        stopRespondingClick: stopAIResponse,
        bannerTemplate: bannerContent,
        toolbarSettings: {
            items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ],
            itemClicked: toolbarItemClicked
        }
    });
    defaultAIAssistView.appendTo('#aiAssistView');

    async function onPromptRequest(args: PromptRequestEventArgs) {
        abortController = new AbortController();
        let foundPrompt = defaultPromptResponseData.find((promptObj: any) => promptObj.prompt === args.prompt);
        let response = await getAIResponse(args, abortController);
        defaultAIAssistView.addPromptResponse(response);
        defaultAIAssistView.promptSuggestions = foundPrompt?.suggestions || defaultSuggestions;
    }

    function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            defaultAIAssistView.prompts = [];
            defaultAIAssistView.promptSuggestions = defaultSuggestions;
            stopAIResponse();
        }
    }

    function bannerContent(): string {
        return `<div class="banner-content">
                    <div class="e-icons e-assistview-icon"></div>
                    <h3>AI Assistance</h3>
                    <i>To get started, provide input or choose a suggestion.</i>
                </div>`;
    }

    function stopAIResponse() {
        if (abortController) {
            abortController.abort();
        }
    }
};
