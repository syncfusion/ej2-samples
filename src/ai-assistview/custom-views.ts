import { loadCultureFiles } from '../common/culture-loader';

import { AIAssistView } from "@syncfusion/ej2-interactive-chat";
import { Button } from "@syncfusion/ej2-buttons";
import { TextArea } from "@syncfusion/ej2-inputs";
import { defaultPromptResponseData, defaultSuggestions  } from './promptResponseData';

/**
 * Custom views sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let viewsAIAssistView: AIAssistView = new AIAssistView({
        views: [
            {
                type: 'Assist',
                name: "Prompt",
                viewTemplate: promptViewContent
            },
            {
                type: 'Custom',
                name: 'Response',
                iconCss: 'e-icons e-comment-show',
                viewTemplate: responseViewContent
            },
            {
                type: 'Custom',
                name: 'Custom',
                viewTemplate: '<div class="view-container"><h5>Custom view content</h5></div>'
            }
        ],
        created: onCreate
    });
    viewsAIAssistView.appendTo('#aiAssistView');

    function promptViewContent() {
        let suggestionsElem = '';
        defaultSuggestions.forEach((suggestion: any) => {
            suggestionsElem += `<li class="suggestion-item e-card">${suggestion}</li>`;
        });
        return `<div class="view-container">
                <textarea id="promptTextarea"></textarea>
                <button id="generateBtn"></button>
                <ul class="suggestions">${suggestionsElem}</ul>
                </div>`;
    }

    function responseViewContent() {
        return `<div class="view-container response-view">
                <div class="responseItemContent default-response e-card">
                <span class="e-icons e-circle-info"></span>
                No prompt provided. Please enter a prompt and click 'Generate Prompt' to see the response.</div>
                </div>`;
    }

    function updateResponseView(prompt: string) {
        let responseView = viewsAIAssistView.element.querySelector('.view-container') as Element;
        let separatorElem = '<hr style="height: 1px;margin: 0;">';
        let responseItemElem = `<div class="responseItemContent e-card">
                                    <div class="response-header"><b>Prompt:</b> ${prompt}</div>${separatorElem}
                                    <div class="content">
                                        <div class="e-skeleton e-skeleton-text e-shimmer-wave" style="width: 100%; height: 20px;"></div>
                                        <div class="e-skeleton e-skeleton-text e-shimmer-wave" style="width: 80%; height: 20px;"></div>
                                        <div class="e-skeleton e-skeleton-text e-shimmer-wave" style="width: 100%; height: 20px;"></div>
                                    </div>
                                    ${separatorElem}
                                    <div class="options">
                                        <button id="copyBtn" class="e-btn e-normal e-skeleton e-shimmer-wave">Copy</button>
                                    </div>
                                </div>`;
        let defaultResponse = responseView.querySelector('.default-response');
        if (defaultResponse) {
            defaultResponse.remove();
        }
        responseView.innerHTML = responseItemElem + responseView.innerHTML;
        setTimeout( () => {
            let foundPrompt = defaultPromptResponseData.find((promptObj: any) => promptObj.prompt === prompt);
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            
            let response = foundPrompt ? foundPrompt.response : defaultResponse;
            (responseView as any).children[0].querySelector('.content').innerHTML = response;
            let copyBtn = responseView.children[0].querySelector('#copyBtn') as HTMLElement;
            copyBtn.classList.remove('e-skeleton', 'e-shimmer-wave');
            copyBtn.addEventListener('click', function(e) {
                let textToCopy = (e.target as any).parentElement.parentElement.querySelector('.content').textContent;
                navigator.clipboard.writeText(textToCopy).then(function() {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy';
                    }, 1000);
                });                
            });
            
        }, 2000);
    }

    function onCreate() {
        let textareaObj: TextArea = new TextArea({
            placeholder: "Enter your prompt...",
            rows: 5,
            resizeMode: 'None',
            input: function(e) {
                generateBtn.disabled = !e.value;
            }
        });
        textareaObj.appendTo('#promptTextarea');

        let generateBtn: Button = new Button({ cssClass: 'e-primary generate-btn', content:'Generate Prompt', disabled: true });
        generateBtn.appendTo('#generateBtn');
        generateBtn.element.addEventListener('click', () => {
            let promptValue = textareaObj.value;
            if (promptValue) {
                textareaObj.value = '';
                generateBtn.disabled = true;
                viewsAIAssistView.activeView = 1;
                viewsAIAssistView.dataBind();   
                updateResponseView(promptValue);
            }
        });

        (viewsAIAssistView as any).element.querySelector('.view-container .suggestions').addEventListener('click', (e: any) => {
            if ((e.target as any).classList.contains('suggestion-item')) {
                textareaObj.value = (e.target as any).textContent;
                generateBtn.disabled = false;
            }
        });
    }
};
