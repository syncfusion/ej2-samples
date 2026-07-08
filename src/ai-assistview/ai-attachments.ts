import { loadCultureFiles } from '../common/culture-loader';

import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { defaultPromptResponseData, defaultSuggestions  } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

(window as any).default = (): void => {
    loadCultureFiles();
    let attachmentAIAssistView: AIAssistView = new AIAssistView({
        promptSuggestions: defaultSuggestions,
        enableStreaming: true,
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

    async function onPromptRequest(args: PromptRequestEventArgs) {
        const abortController: AbortController = new AbortController();
        let foundPrompt = defaultPromptResponseData.find((promptObj: any) => promptObj.prompt === args.prompt);
        let response = foundPrompt ? foundPrompt.response : await getAIResponse(args, abortController);
        attachmentAIAssistView.addPromptResponse(response);
        attachmentAIAssistView.promptSuggestions = foundPrompt?.suggestions || defaultSuggestions;
    }

    function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            attachmentAIAssistView.prompts = [];
            attachmentAIAssistView.promptSuggestions = defaultSuggestions;
        }
    }
};
