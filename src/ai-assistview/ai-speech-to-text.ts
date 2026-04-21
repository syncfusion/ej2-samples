import { loadCultureFiles } from '../common/culture-loader';
import { AIAssistView, ToolbarItemClickedEventArgs, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { SpeechToText, TranscriptChangedEventArgs } from '@syncfusion/ej2-inputs';
import { marked } from 'marked';
import { getAzureOpenAIAssist, type AzureOpenAIRequest } from './ai-service';

(window as any).default = (): void => {
    loadCultureFiles();
// Initialize Gemini API (using OpenAI API in this case)
const azureOpenAIApiKey = 'Your_AzureOpenAIApiKey'; // replace your key
const azureOpenAIEndpoint = 'Your_AzureOpenAIEndpoint'; // replace your endpoint
const azureOpenAIApiVersion = 'Your_AzureOpenAIApiVersion'; // replace to match your resource
const azureDeploymentName = 'Your_AzureDeploymentName'; // your Azure OpenAI deployment name
let stopStreaming = false;

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
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    speechToTextSettings: {
        enable: true
    },
    bannerTemplate: "#bannerContent",
    promptRequest: onPromptRequest,
    stopRespondingClick: handleStopResponse
});
aiAssistView.appendTo('#aiAssistView');

function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
    if (args.item.iconCss === 'e-icons e-refresh') {
        aiAssistView.prompts = [];
        stopStreaming = true; // Ensure streaming is stopped on refresh
    }
}

async function streamAIResponse(fullResponse: string): Promise<string> {
    let streamedResponseText = '';
    if (fullResponse) {
        await new Promise(resolve => setTimeout(resolve, 300));
        let i = 0;
        while (i < fullResponse.length && !stopStreaming) {
            streamedResponseText += fullResponse[i];
            i++;
            aiAssistView.addPromptResponse(
                marked.parse(streamedResponseText),
                false
            );
            aiAssistView.scrollToBottom();
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    }
    return streamedResponseText;
}

async function onPromptRequest(args: PromptRequestEventArgs): Promise<void> {
        stopStreaming = false;
        if (!aiAssistView) return;
        try {
            const fullResponse = await getAzureOpenAIAssist({
                apiKey: azureOpenAIApiKey,
                endpoint: azureOpenAIEndpoint,
                deployment: azureDeploymentName,
                apiVersion: azureOpenAIApiVersion,
                prompt: args.prompt!
            } as AzureOpenAIRequest)
            const streamedText = await streamAIResponse(fullResponse);
            if (!stopStreaming) {
                aiAssistView.addPromptResponse(
                    marked.parse(streamedText),
                    true
                );
            }
        } catch (error) {
            const errorMessage = '⚠️ Something went wrong while connecting to the OpenAI service. Please check your API key.';
            aiAssistView.addPromptResponse(marked.parse(errorMessage), true);
        }
    }


function handleStopResponse() {
    stopStreaming = true;
}
};