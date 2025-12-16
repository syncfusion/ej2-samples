import { loadCultureFiles } from '../common/culture-loader';
import { AIAssistView, ToolbarItemClickedEventArgs, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { marked } from 'marked';
import { getAzureOpenAIAssist, type AzureOpenAIRequest } from './ai-service';

(window as any).default = (): void => {
    loadCultureFiles();
const azureOpenAIApiKey = 'Your_AzureOpenAIApiKey'; // replace your key
const azureOpenAIEndpoint = 'Your_AzureOpenAIEndpoint'; // replace your endpoint
const azureOpenAIApiVersion = 'Your_AzureOpenAIApiVersion'; // replace to match your resource
const azureDeploymentName = 'Your_AzureDeploymentName'; // your Azure OpenAI deployment name
let stopStreaming = false;
let currentUtterance:any;
let promptsData = [
    {
        prompt: "What is AI?",
        response: `<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>`
    }
];
// Initialize AI AssistView
let aiAssistView = new AIAssistView({
    toolbarSettings: {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: toolbarItemClicked,
    },
     responseToolbarSettings: {
        items: [
            { type: 'Button', iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' },
            { type: 'Button', iconCss: 'e-icons e-audio', tooltip: 'Read Aloud' },
            { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
            { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' },
        ],
        itemClicked: onResponseToolbarItemClicked
    },
    prompts: promptsData,
    promptRequest: onPromptRequest,
    stopRespondingClick: handleStopResponse
});

function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
    if (args.item.iconCss === 'e-icons e-refresh') {
        aiAssistView.prompts = [];
        stopStreaming = true; // Ensure streaming is stopped on refresh
    }
}

function onResponseToolbarItemClicked(args: ToolbarItemClickedEventArgs) {
    const responseHtml = aiAssistView.prompts[args.dataIndex].response;
    if (responseHtml) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = responseHtml;
        const text = (tempDiv.textContent || tempDiv.innerText || '').trim();
        if (args.item.iconCss === 'e-icons e-audio' || args.item.iconCss === 'e-icons e-assist-stop') {
            if (currentUtterance) {
                speechSynthesis.cancel();
                currentUtterance = null;
                aiAssistView.responseToolbarSettings.items[1].iconCss = 'e-icons e-audio';
                aiAssistView.responseToolbarSettings.items[1].tooltip = 'Read Aloud';
            } else {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.onend = () => {
                    currentUtterance = null;
                    aiAssistView.responseToolbarSettings.items[1].iconCss = 'e-icons e-audio';
                    aiAssistView.responseToolbarSettings.items[1].tooltip = 'Read Aloud';
                };
                speechSynthesis.speak(utterance);
                currentUtterance = utterance;
                aiAssistView.responseToolbarSettings.items[1].iconCss = 'e-icons e-assist-stop';
                aiAssistView.responseToolbarSettings.items[1].tooltip = 'Stop';
            }
        }
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
 // Render AI AssistView
 aiAssistView.appendTo('#aiAssistView');
};