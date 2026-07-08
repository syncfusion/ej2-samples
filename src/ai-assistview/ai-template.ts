import { loadCultureFiles } from '../common/culture-loader';

import { AIAssistView, PromptRequestEventArgs } from "@syncfusion/ej2-interactive-chat";
import { DropDownButton } from "@syncfusion/ej2-splitbuttons";
import { Carousel } from "@syncfusion/ej2-navigations";
import { defaultPromptResponseData, defaultSuggestions  } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

/**
 * Template sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let templateAIAssistView: AIAssistView = new AIAssistView({
        bannerTemplate: '#bannerContent',
        enableStreaming: true,
        promptItemTemplate: promptItemContent,
        responseItemTemplate: responseItemContent,
        promptSuggestionItemTemplate: suggestionItemContent,
        promptSuggestionsHeader: 'Hello! Ask Questions, to better understand how your prompt interacts with AI AssistView!',
        promptSuggestions: defaultSuggestions,
        toolbarSettings: {
            items: [
                { type: 'Input', template: '<button id="ddMenu"></button>', align: 'Right' }
            ]
        },
        promptRequest: onPromptRequest
    });
    templateAIAssistView.appendTo('#aiAssistView');

    async function onPromptRequest(args: PromptRequestEventArgs) {
        const abortController: AbortController = new AbortController();
        let foundPrompt = defaultPromptResponseData.find((promptObj: any) => promptObj.prompt === args.prompt);
        var response = foundPrompt ? foundPrompt.response : await getAIResponse(args, abortController);
        templateAIAssistView.addPromptResponse(response);
        templateAIAssistView.promptSuggestions = foundPrompt?.suggestions || defaultSuggestions;
    }

    function promptItemContent(ctx: any) {
        let prompt = ctx.prompt.replace('<span class="e-icons e-circle-info"></span>', '');
        return `<div class="promptItemContent">
                    <div class="prompt-header">You
                        <span class="e-icons e-user"></span>
                    </div>
                    <div class="content">${prompt}</div>
                </div>`;
    }

    function responseItemContent(ctx: any) {
        return `<div class="responseItemContent">
                    <div class="response-header">
                        <span class="e-icons e-assistview-icon"></span>
                        AI Assist
                    </div>
                    <div class="content">${ctx.response}</div>
                </div>`;
    }

    function suggestionItemContent(ctx: any) {
        return `<div class='suggestion-item active'>
                    <span class="e-icons e-circle-info"></span>
                    <div class="content">${ctx.promptSuggestion}</div>
                </div>`;
    }

    let carouselObj: Carousel = new Carousel({
        width: '100%',
        height: '60%',
        showIndicators: false,
        partialVisible: true,
        buttonsVisibility: 'Visible',
        dataSource: [
            { imagePath: 'src/ai-assistview/images/moscow.jpg', suggestion: 'How do I prioritize tasks effectively?'  },
            { imagePath: 'src/ai-assistview/images/bridge.jpg', suggestion: 'How do I set daily goals in my work day?'  },
            { imagePath: 'src/ai-assistview/images/london.jpg', suggestion: 'Steps to publish a e-book with marketing strategy'  },
            { imagePath: 'src/ai-assistview/images/tokyo.jpg', suggestion: 'What tools or apps can help me prioritize tasks?'  }
        ],
        itemTemplate: '#carouselTemplate'
    });
    carouselObj.appendTo('#bannerCarousel');

    carouselObj.element.addEventListener('click', function (e) {
        handleAction(e);
    });

    carouselObj.element.addEventListener('touchstart', function (e) {
        handleAction(e);
    });

    function handleAction(e: any) {
        let target = e.target;
        let prompt = '';
        if ((target as any).tagName === 'IMG') {
            prompt = (e.target as any).nextElementSibling.textContent as string;
        } else if ((target as any).className === 'e-card-header') {
            prompt = (e.target as any).textContent;
        }
        if (prompt)
            templateAIAssistView.executePrompt(prompt);
    };

    new DropDownButton({
        items: [
            { text: 'Settings', iconCss: 'e-icons e-settings' },
            { separator: true },
            { text: 'Log out' }
        ],
        iconCss: 'e-icons e-user',
        cssClass: 'e-caret-hide',
    }, '#ddMenu');
};
