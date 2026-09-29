import { loadCultureFiles } from '../common/culture-loader';
import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { mentionSuggestions, agentPrompts, commandPrompts } from './mentionData';
import { getAIResponse } from '../common/ai-service';

(window as any).default = (): void => {
    loadCultureFiles();

    let abortController: AbortController;

    let agents: any = [
        { id: 'TechSupport', name: 'TechSupport', description: 'Help troubleshoot VPN connectivity issues.', placeholder: 'Ask about VPN, network, or device issues', iconCss: 'e-icons e-comment-status' },
        { id: 'HRAssistant', name: 'HRAssistant', description: 'What is the parental leave policy?', placeholder: 'Ask about leave, benefits, and HR policies', iconCss: 'e-icons e-people' },
        { id: 'KnowledgeBase', name: 'KnowledgeBase', description: 'Find details about the employee onboarding process.', iconCss: 'e-icons e-objects' }
    ];
    let commands: any = [
        { id: 'table', name: '/table', description: 'Answer as a markdown table', placeholder: 'Format the response as a table', iconCss: 'e-icons e-table' },
        { id: 'rewrite', name: '/rewrite', description: 'Rewrite content for clarity and professionalism.', placeholder: 'Improve clarity and professional tone', iconCss: 'e-icons e-rename' },
        { id: 'checklist', name: '/checklist', description: 'Convert a process into a step-by-step checklist.', iconCss: 'e-icons e-list-unordered' }
    ];
    let mentions: any = [
        {
            mentionChar: '@',
            dataSource: agents,
            fields: { text: 'name', value: 'id', iconCss: 'iconCss' },
            filterType: 'StartsWith',
            highlight: true
        },
        {
            mentionChar: '/',
            dataSource: commands,
            showMentionChar: false,
            fields: { text: 'name', value: 'id' },
            itemTemplate: '<div class="listItems"><span class="commandIcon ${iconCss}"></span><span class="commandName">${name}</span><span class="commandDesc">${description}</span></div>',
            displayTemplate: '<span class="e-aiassist-mention-item-chip">${name}</span>'
        }
    ];

    let mentionAIAssistView: AIAssistView = new AIAssistView({
        promptPlaceholder: "Type a prompt and use '/' for commands or '@' for agents...",
        bannerTemplate: '#bannerContent',
        promptSuggestions: mentionSuggestions,
        enableStreaming: true,
        mentions: mentions,
        promptRequest: onPromptRequest,
        toolbarSettings: {
            items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ],
            itemClicked: toolbarItemClicked
        },
        stopRespondingClick: stopAIResponse
    });
    mentionAIAssistView.appendTo('#aiAssistView');

    function buildSystemPrompt(mentions: any): string {
        let prompts: string[] = [];
        mentions.forEach((mention: any) => {
            const name = mention.itemData.id;
            if (agentPrompts[name]) {
                prompts.push(agentPrompts[name]);
            }
            if (commandPrompts[name]) {
                prompts.push(commandPrompts[name]);
            }
        });
        const selectedCount = (args_mentions_count => args_mentions_count || 0)(mentions && mentions.length);
        if (selectedCount > 1) {
            prompts.unshift(
                'Composition: ' + selectedCount + ' mentions are active. ' +
                'Produce a single response that respects every selected agent scope and applies every selected command in order. ' +
                'Commands format the agents\' content; never let one agent override another. '
            );
        }
        return prompts.join('\n\n');
    }

    async function onPromptRequest(args: PromptRequestEventArgs): Promise<void> {
        abortController = new AbortController();
        try {
            let aiArgs: any = {
                prompt: args.prompt,
                systemPrompt: buildSystemPrompt((args as any).mentions || [])
            };
            let reply: any = await getAIResponse(aiArgs, abortController);
            let response: any = aiArgs.systemPrompt && reply?.response ? reply.response : reply;
            mentionAIAssistView.addPromptResponse(response);
        } catch (error) {
            mentionAIAssistView.addPromptResponse("We could not reach the AI service; please try again later.");
        }
        mentionAIAssistView.promptSuggestions = mentionSuggestions;
    }

    function toolbarItemClicked(args: ToolbarItemClickedEventArgs): void {
        if (args.item.iconCss === 'e-icons e-refresh') {
            mentionAIAssistView.prompts = [];
            mentionAIAssistView.promptSuggestions = mentionSuggestions;
            stopAIResponse();
        }
    }

    function stopAIResponse(): void {
        if (abortController) {
            abortController.abort();
        }
    }
};
