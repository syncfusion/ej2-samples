import { loadCultureFiles } from '../common/culture-loader';

import { AIAssistView, PromptRequestEventArgs } from "@syncfusion/ej2-interactive-chat";
import { Button } from "@syncfusion/ej2-buttons";
import { DropDownButton, MenuEventArgs } from "@syncfusion/ej2-splitbuttons";
import { defaultPromptResponseData } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';


(window as any).default = (): void => {
    loadCultureFiles();

    let geminiContainer = document.getElementById('geminiContainer');
    let isFirstPrompt = true;

    let geminiAIAssistView = new AIAssistView({
        promptRequest: onPromptRequest,
        promptChanged: toggleButtons,
        showHeader: false,
        promptPlaceholder: 'Ask Gemini',
        enableAttachments: true,
        speechToTextSettings: {
            enable: true
        },
        bannerTemplate: "#bannerContent",
        created: created,
        attachmentSettings: {
            saveUrl: 'https://ej2services.syncfusion.com/js/development/api/FileUploader/Save',
            removeUrl: 'https://ej2services.syncfusion.com/js/development/api/FileUploader/Remove'
        },
        footerToolbarSettings: {
            toolbarPosition: 'Bottom',
            items: [
                {
                    iconCss: 'e-icons e-assist-attachment-icon',
                    align: 'Left'
                },
                {
                    align: 'Right',
                    template: '<button id="custombtn">Fast</button>'
                },
                {
                    iconCss: 'e-icons e-assist-speech-to-text',
                    align: 'Right'
                }
            ]
        }
    });

    geminiAIAssistView.appendTo('#gemini_aiassistview');

    if (geminiContainer) {
        geminiContainer.classList.add('middle-footer');
    }

    async function onPromptRequest(args: PromptRequestEventArgs) {
        if (isFirstPrompt && geminiContainer) {
            geminiContainer.classList.remove('middle-footer');
            geminiContainer.classList.add('bottom-footer');
            isFirstPrompt = false;
        }

        const abortController: AbortController = new AbortController();
        let foundPrompt = defaultPromptResponseData.find((p: any) => p.prompt === args.prompt);
        let response = foundPrompt ? foundPrompt.response : await getAIResponse(args, abortController);
        geminiAIAssistView.addPromptResponse(response);
        toggleButtons();
    }

    function toggleButtons() {
        let sendBtn = (geminiAIAssistView.element.querySelector('.e-assist-send') as any).parentElement;
        let audioBtn = geminiAIAssistView.element.querySelector('.e-assistview-speech-to-text');

        let hasPrompt =
            geminiAIAssistView.prompt &&
            geminiAIAssistView.prompt.replace(/<br\s*\/?>/gi, '').replace(/&nbsp;/gi, '').replace(/\s+/g, '').trim();

        if (hasPrompt) {
            if (sendBtn) (sendBtn as any).style.display = 'block';
            if (audioBtn) (audioBtn as any).style.display = 'none';
        } else {
            if (sendBtn) (sendBtn as any).style.display = 'none';
            if (audioBtn) (audioBtn as any).style.display = 'block';
        }
    }

    function created() {
        let items = [
            {
                text: 'Fast',
                description: 'Answers quickly'
            },
            {
                text: 'Thinking',
                description: 'Solve complex problems'
            },
            {
                text: 'Pro',
                description: 'Advanced maths and code with 3.1 Pro'
            }
        ];

        let currentModel = 'Fast';

        let btnObj = new DropDownButton({
            items: items,
            cssClass: 'e-flat gemini_model',
            itemTemplate: function (data: any) {
                let contentHtml = `
                    <div class="model-content">
                        <div class="model-name">${data.text}</div>
                        <div class="model-description">${data.description}</div>
                    </div>`;
                return `<div class="model-item">${contentHtml}</div>`;
            },
            beforeItemRender: function (args: MenuEventArgs) {
                if (currentModel === args.item.text) {
                    args.element.classList.add('e-selected');
                }
            },
            select: function (args: MenuEventArgs) {
                currentModel = args.item.text;
                btnObj.content = args.item.text;
            }
        });
        btnObj.appendTo('#custombtn');
        toggleButtons();
    }

    new Button({
        iconCss: 'e-icons e-image'
    }, '#imgBtn');

    new Button({
        iconCss: 'e-icons e-callout'
    }, '#iplBtn');

    new Button({
        iconCss: 'e-icons e-play'
    }, '#musicBtn');

    new Button({
    }, '#writeBtn');
};
