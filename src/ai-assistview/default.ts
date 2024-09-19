import { loadCultureFiles } from '../common/culture-loader';

import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { defaultPromptResponseData, defaultSuggestions  } from './promptResponseData';

/**
 * Default sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let defaultAIAssistView: AIAssistView = new AIAssistView({
        promptSuggestions: defaultSuggestions,
        promptRequest: onPromptRequest,
        bannerTemplate: "#bannerContent",
        toolbarSettings: {
            items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ],
            itemClicked: toolbarItemClicked
        }
    });
    defaultAIAssistView.appendTo('#aiAssistView');

    function onPromptRequest(args: PromptRequestEventArgs) {
        setTimeout(() => {
            let foundPrompt = defaultPromptResponseData.find((promptObj: any) => promptObj.prompt === args.prompt);
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            
            defaultAIAssistView.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
            defaultAIAssistView.promptSuggestions = foundPrompt?.suggestions || defaultSuggestions;
            
        }, 2000);
    }

    function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            defaultAIAssistView.prompts = [];
            defaultAIAssistView.promptSuggestions = defaultSuggestions;
        }
    }
};
