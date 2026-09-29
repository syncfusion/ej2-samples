import { loadCultureFiles } from '../common/culture-loader';
import { AIAssistView, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { defaultPromptResponseData } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

(window as any).default = (): void => {
    loadCultureFiles();

    let abortController: AbortController;
    const chatgptContainer: HTMLElement | null = document.getElementById('chatgptContainer');
    let isFirstPrompt: boolean = true;

    const chatgptAIAssistView: AIAssistView = new AIAssistView({
        promptRequest: onPromptRequest,
        showHeader: false,
        promptPlaceholder: 'Ask anything',
        enableAttachments: true,
        attachmentSettings: {
            saveUrl: 'https://ej2services.syncfusion.com/js/development/api/FileUploader/Save',
            removeUrl: 'https://ej2services.syncfusion.com/js/development/api/FileUploader/Remove'
        },
        speechToTextSettings: {
            enable: true
        },
        bannerTemplate: '#bannerContent',
        stopRespondingClick: stopAIResponse,
        footerToolbarSettings: {
            toolbarPosition: 'Inline',
            items: [
                { iconCss: 'e-icons e-assist-attachment-icon', align: 'Left' },
                { iconCss: 'e-icons e-assist-speech-to-text', align: 'Right' }
            ]
        }
    });

    chatgptAIAssistView.appendTo('#chatgpt_aiassistview');

    if (chatgptContainer) {
        chatgptContainer.classList.add('middle-footer');
    }

    async function onPromptRequest(args: PromptRequestEventArgs): Promise<void> {
        if (isFirstPrompt && chatgptContainer) {
            chatgptContainer.classList.remove('middle-footer');
            chatgptContainer.classList.add('bottom-footer');
            isFirstPrompt = false;
        }
        abortController = new AbortController();
        const response: string = await getAIResponse(args, abortController);
        chatgptAIAssistView.addPromptResponse(response);
    }

    function stopAIResponse() {
        if (abortController) {
            abortController.abort();
        }
    }
};