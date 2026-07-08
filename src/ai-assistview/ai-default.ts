import { loadCultureFiles } from '../common/culture-loader';

import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { defaultPromptResponseData, defaultSuggestions  } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

/**
 * Default sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let defaultAIAssistView: AIAssistView = new AIAssistView({
        promptSuggestions: defaultSuggestions,
        enableStreaming: true,
        promptRequest: onPromptRequest,
        bannerTemplate: "#bannerContent",
        toolbarSettings: {
            items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ],
            itemClicked: toolbarItemClicked
        }
    });
    defaultAIAssistView.appendTo('#aiAssistView');

    async function onPromptRequest(args: PromptRequestEventArgs) {
        const abortController: AbortController = new AbortController();
        let foundPrompt = defaultPromptResponseData.find((promptObj: any) => promptObj.prompt === args.prompt);
        let response = foundPrompt ? foundPrompt.response : await getAIResponse(args, abortController);
        defaultAIAssistView.addPromptResponse(response);
        defaultAIAssistView.promptSuggestions = foundPrompt?.suggestions || defaultSuggestions;
    }

    function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            defaultAIAssistView.prompts = [];
            defaultAIAssistView.promptSuggestions = defaultSuggestions;
        }
    }
};
