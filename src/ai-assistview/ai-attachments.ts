import { loadCultureFiles } from '../common/culture-loader';

import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { defaultPromptResponseData, defaultSuggestions  } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

(window as any).default = (): void => {
    loadCultureFiles();
    let abortController: AbortController;
    let attachmentAIAssistView: AIAssistView = new AIAssistView({
        promptSuggestions: defaultSuggestions,
        enableStreaming: true,
        promptRequest: onPromptRequest,
        stopRespondingClick: stopAIResponse,
        bannerTemplate: bannerContent,
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
        abortController = new AbortController();
        let foundPrompt = defaultPromptResponseData.find((promptObj: any) => promptObj.prompt === args.prompt);
        let response = await getAIResponse(args, abortController);
        attachmentAIAssistView.addPromptResponse(response);
        attachmentAIAssistView.promptSuggestions = foundPrompt?.suggestions || defaultSuggestions;
    }

    function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            attachmentAIAssistView.prompts = [];
            attachmentAIAssistView.promptSuggestions = defaultSuggestions;
            stopAIResponse();
        }
    }

    function bannerContent(): string {
        return `<div class="banner-content">
                    <div class="e-icons e-assistview-icon"></div>
                    <h3>AI Assistance</h3>
                    <i>Type your message or attach files to get started.</i>
                </div>`;
    }
    function stopAIResponse() {
        if (abortController) {
            abortController.abort();
        }
    }
};
