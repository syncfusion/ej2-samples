import { loadCultureFiles } from '../common/culture-loader';

import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { defaultPromptResponseData, defaultSuggestions  } from './promptResponseData';


(window as any).default = (): void => {
    loadCultureFiles();
    let attachmentAIAssistView: AIAssistView = new AIAssistView({
        promptSuggestions: defaultSuggestions,
        promptRequest: onPromptRequest,
        bannerTemplate: "#bannerContent",
        toolbarSettings: {
            items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ],
            itemClicked: toolbarItemClicked
        },
        enableAttachments: true,
        attachmentSettings: {
            saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
            removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
        }
    });
    attachmentAIAssistView.appendTo('#aiAssistView');

    function onPromptRequest(args: PromptRequestEventArgs) {
        setTimeout(() => {
            let foundPrompt = defaultPromptResponseData.find((promptObj: any) => promptObj.prompt === args.prompt);
            let attachmentResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            
            attachmentAIAssistView.addPromptResponse(foundPrompt ? foundPrompt.response : attachmentResponse);
            attachmentAIAssistView.promptSuggestions = foundPrompt?.suggestions || defaultSuggestions;
            
        }, 2000);
    }

    function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            attachmentAIAssistView.prompts = [];
            attachmentAIAssistView.promptSuggestions = defaultSuggestions;
        }
    }
};
