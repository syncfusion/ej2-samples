import { loadCultureFiles } from '../common/culture-loader';

import { AIAssistView, PromptRequestEventArgs } from "@syncfusion/ej2-interactive-chat";
import { Button, Switch, ChangeEventArgs } from "@syncfusion/ej2-buttons";
import { DropDownButton, MenuEventArgs } from "@syncfusion/ej2-splitbuttons";
import { defaultPromptResponseData } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

(window as any).default = (): void => {
    loadCultureFiles();

    let claudeContainer = document.getElementById('claudeContainer');
    let isFirstPrompt = true;

    let claudeAIAssistView = new AIAssistView({
        promptRequest: onPromptRequest,
        enableStreaming: true,
        showHeader: false,
        promptPlaceholder: 'How can i help you today?',
        enableAttachments: true,
        bannerTemplate: "#bannerContent",
        created: created,
        attachmentSettings: {
            saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
            removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
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
                    template: '<button id="custombtn">Opus 4.6</button>'
                }
            ]
        }
    });

    claudeAIAssistView.appendTo('#claude_aiassistview');

    if (claudeContainer) {
        claudeContainer.classList.add('middle-footer');
    }

    async function onPromptRequest(args: PromptRequestEventArgs) {
        if (isFirstPrompt && claudeContainer) {
            claudeContainer.classList.remove('middle-footer');
            claudeContainer.classList.add('bottom-footer');
            isFirstPrompt = false;
        }

        const abortController: AbortController = new AbortController();
        let foundPrompt = defaultPromptResponseData.find((p: any) => p.prompt === args.prompt);
        let response = foundPrompt ? foundPrompt.response : await getAIResponse(args, abortController);
        claudeAIAssistView.addPromptResponse(response);
    }

    function created() {
        let items = [
            {
                text: 'Opus 4.6',
                description: 'Most capable for ambitious work'
            },
            {
                text: 'Sonnet 4.6',
                description: 'Most efficient for everyday tasks'
            },
            {
                text: 'Haiku 4.5',
                description: 'Fastest for quick answers'
            },
            {
                text: 'Extended thinking',
                description: 'Think longer for complex tasks',
                id: 'extended-thinking'
            }
        ];

        let currentModel = 'Opus 4.6';
        let extendedThinkingEnabled = false;

        let btnObj = new DropDownButton({
            items: items,
            cssClass: 'e-flat claude_model',
            itemTemplate: function (data: any) {
                let contentHtml = `
                    <div class="model-content">
                        <div class="model-name">${data.text}</div>
                        <div class="model-description">${data.description}</div>
                    </div>`;

                if (data.id === 'extended-thinking') {
                    contentHtml += `
                        <div class="toggle-container">
                            <input
                                type="checkbox"
                                class="extended-thinking-toggle"
                                id="extended-thinking-switch"
                            />
                        </div>`;
                }

                return `<div class="model-item">${contentHtml}</div>`;
            },
            beforeItemRender: function (args: MenuEventArgs) {
                if (currentModel === args.item.text) {
                    args.element.classList.add('e-selected');
                }
            },
            open: onModelDropdownOpen,
            select: function (args: MenuEventArgs) {
                currentModel = args.item.text;
                btnObj.content = args.item.text;
            }
        });
        btnObj.appendTo('#custombtn');

        function onModelDropdownOpen() {
            let toggleInput = document.getElementById('extended-thinking-switch');
            if (toggleInput && !toggleInput.classList.contains('e-switch')) {
                new Switch({
                    checked: extendedThinkingEnabled,
                    change: function (args: ChangeEventArgs) {
                        extendedThinkingEnabled = args.checked;
                    }
                }).appendTo(toggleInput);

                let toggleContainer = (toggleInput as any).closest('.toggle-container');
                if (toggleContainer) {
                    toggleContainer.addEventListener('click', function (e: Event) {
                        e.stopPropagation();
                    });
                }
            }
        }
    }

    new Button({
        iconCss: 'e-icons e-code-view'
    }, '#codeBtn');

    new Button({
        iconCss: 'e-icons e-edit'
    }, '#writeBtn');

    new Button({
        iconCss: 'e-icons e-stamp'
    }, '#choiceBtn');

    new Button({
        iconCss: 'e-icons e-layers'
    }, '#learnBtn');

    new Button({
        iconCss: 'e-icons e-activities'
    }, '#lifeBtn');
};
