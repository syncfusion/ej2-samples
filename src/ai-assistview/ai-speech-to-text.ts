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
    promptToolbarSettings: {
        itemClicked: (args: ToolbarItemClickedEventArgs) => {
            if (args.item!.iconCss === "e-icons e-assist-edit") {
                const assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
                assistviewFooter.innerHTML = aiAssistView.prompts[args.dataIndex].prompt;
                toggleButtons();
            }
        }
    },
    footerTemplate: "#footerContent",
    bannerTemplate: "#bannerContent",
    promptRequest: onPromptRequest,
    stopRespondingClick: handleStopResponse
});
aiAssistView.appendTo('#aiAssistView');

// Initialize Speech-to-Text component
let speechToTextObj: SpeechToText = new SpeechToText({
    transcriptChanged: onTranscriptChange,
    onStop: onListeningStop,
    created: onCreated,
    cssClass: 'e-flat',
});
speechToTextObj.appendTo('#speechToText');

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

// Handles actions when speech listening stops
function onListeningStop() {
    toggleButtons();
}

function onTranscriptChange(args: TranscriptChangedEventArgs): void {
    (document.querySelector('#assistview-footer') as HTMLElement).innerText = args.transcript;
}

// Handles actions after component creation
function onCreated(): void {
    let assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
    let sendButton = document.querySelector('#assistview-sendButton') as HTMLElement;

    sendButton.addEventListener('click', sendIconClicked);
    assistviewFooter.addEventListener('input', toggleButtons);

    assistviewFooter.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            sendIconClicked();
            e.preventDefault(); // Prevent the default behavior of the Enter key
        }
    });
    toggleButtons();
}

// Toggles the visibility of the send and speech-to-text buttons
function toggleButtons(): void {
    let assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
    let sendButton = document.querySelector('#assistview-sendButton') as HTMLElement;
    let speechButton = document.querySelector('#speechToText') as HTMLElement;

    let hasText = assistviewFooter.innerText.trim() !== '';
    sendButton.classList.toggle('visible', hasText);
    speechButton.classList.toggle('visible', !hasText);

    if (!hasText && (assistviewFooter.innerHTML === '<br>' || !assistviewFooter.innerHTML.trim())) {
        assistviewFooter.innerHTML = '';
    }
}

// Handles send button click event
function sendIconClicked(): void {
    var assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
    aiAssistView.executePrompt(assistviewFooter.innerText);
    assistviewFooter.innerText = '';
}

function handleStopResponse() {
    stopStreaming = true;
}
};