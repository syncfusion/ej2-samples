import { loadCultureFiles } from '../common/culture-loader';
import { AIAssistView, ToolbarItemClickedEventArgs, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { getAIResponse } from '../common/ai-service';

(window as any).default = (): void => {
    loadCultureFiles();

let abortController: AbortController;
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
            { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' },
            { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
            { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' },
        ],
    },
    prompts: promptsData,
    stopRespondingClick: stopAIResponse,
    enableStreaming: true,
    promptRequest: onPromptRequest
});

function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
    if (args.item.iconCss === 'e-icons e-refresh') {
        aiAssistView.prompts = [];
        stopAIResponse();
    }
}

async function onPromptRequest(args: PromptRequestEventArgs): Promise<void> {
        if (!aiAssistView) return;
        abortController = new AbortController();
        aiAssistView.addPromptResponse(await getAIResponse(args, abortController));
    }

function stopAIResponse() {
    if (abortController) {
        abortController.abort();
    }
}

 // Render AI AssistView
 aiAssistView.appendTo('#aiAssistView');
};