import { loadCultureFiles } from '../common/culture-loader';
import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { DropDownList, ChangeEventArgs } from "@syncfusion/ej2-dropdowns";
import { defaultSuggestions } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

type LoadingType = 'dot' | 'spinner' | 'text' | 'textIndicator';

(window as any).default = (): void => {
    loadCultureFiles();

    let abortController: AbortController;
    let selectedLoadingType: LoadingType = 'dot';
    const loadingTypeTemplates: Record<LoadingType, string> = {
        dot: '<div class="assistview-dot-loading"><span></span><span></span><span></span></div>',
        spinner: '<div class="assistview-spinner-loading"><div class="spinner"></div></div>',
        text: '<div class="assistview-status-loading">' +
                '<span class="status-1">🧠 Understanding request...</span>' +
                '<span class="status-2">✍️ Drafting response...</span>' +
                '<span class="status-3">🚀 Almost ready...</span>' +
              '</div>',
        textIndicator: '<div class="assistview-text-indicator">' +
                            '<span>Generating</span>' +
                            '<div class="assistview-dots"><span></span><span></span><span></span></div>' +
                       '</div>'
    };
    let currentAnimationTemplate: string = loadingTypeTemplates[selectedLoadingType];

    function bannerContent(): string {
        return `<div class="banner-content">
                    <div class="e-icons e-assistview-icon">
                    </div><h3>AI Assistance</h3>
                    <i>Explore different loading indicator types displayed while AI-generated responses are being processed.</i>
                </div>`;
    }
    const loadingAIAssistView: AIAssistView = new AIAssistView({
        bannerTemplate: bannerContent,
        toolbarSettings: {
            items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
            itemClicked: toolbarItemClicked
        },
        enableStreaming: true,
        promptSuggestions: defaultSuggestions,
        responseAnimationTemplate: currentAnimationTemplate,
        stopRespondingClick: stopAIResponse,
        promptRequest: onPromptRequest
    });
    loadingAIAssistView.appendTo('#aiAssistView');
    const loadingTypeDropdown: DropDownList = new DropDownList({
        width: '220px',
        popupHeight: '200px',
        change: (args: ChangeEventArgs) => {
            selectedLoadingType = args.value as LoadingType;
            currentAnimationTemplate = loadingTypeTemplates[selectedLoadingType] || loadingTypeTemplates.dot;
            loadingAIAssistView.responseAnimationTemplate = currentAnimationTemplate;
            loadingAIAssistView.dataBind();
        }
    });
    loadingTypeDropdown.appendTo('#loadingType');
    async function onPromptRequest(args: PromptRequestEventArgs): Promise<void> {
        abortController = new AbortController();
        const aiResponse: any = await getAIResponse(args, abortController);
        loadingAIAssistView.addPromptResponse(aiResponse);
        loadingAIAssistView.promptSuggestions = defaultSuggestions;
    }
    function toolbarItemClicked(args: ToolbarItemClickedEventArgs): void {
        if (args.item.iconCss === 'e-icons e-refresh') {
            loadingAIAssistView.prompts = [];
            loadingAIAssistView.promptSuggestions = defaultSuggestions;
            stopAIResponse();
        }
    }
    function stopAIResponse() {
        if (abortController) {
            abortController.abort();
        }
    }
};
