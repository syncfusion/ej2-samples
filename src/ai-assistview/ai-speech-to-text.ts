import { loadCultureFiles } from '../common/culture-loader';
import { AIAssistView, ToolbarItemClickedEventArgs, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { getAIResponse } from '../common/ai-service';

(window as any).default = (): void => {
    loadCultureFiles();

// Initialize AI AssistView
let aiAssistView = new AIAssistView({
    toolbarSettings: {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: toolbarItemClicked,
    },
    footerToolbarSettings: {
        toolbarPosition: 'Bottom',
        items: [
            { iconCss: 'e-icons e-assist-send', align: 'Right' },
            { iconCss: 'e-icons e-assist-attachment-icon', align: 'Left', tooltip: 'Attach File' },
            { iconCss: 'e-icons e-assist-speech-to-text', align: 'Left'}
        ]
    },
    enableAttachments: true,
    enableStreaming: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    speechToTextSettings: {
        enable: true
    },
    bannerTemplate: "#bannerContent",
    promptRequest: onPromptRequest
});
aiAssistView.appendTo('#aiAssistView');

function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
    if (args.item.iconCss === 'e-icons e-refresh') {
        aiAssistView.prompts = [];
    }
}

async function onPromptRequest(args: PromptRequestEventArgs): Promise<void> {
    if (!aiAssistView) return;
    const abortController: AbortController = new AbortController();
    var response = await getAIResponse(args, abortController);
    aiAssistView.addPromptResponse(response);
}
};