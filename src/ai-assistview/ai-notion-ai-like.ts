import { loadCultureFiles } from '../common/culture-loader';
import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs, AssistViewModel } from "@syncfusion/ej2-interactive-chat";
import { Fab, Switch, ChangeEventArgs } from "@syncfusion/ej2-buttons";
import { Dialog } from "@syncfusion/ej2-popups";
import { DropDownButton, MenuEventArgs } from "@syncfusion/ej2-splitbuttons";
import { Sidebar } from "@syncfusion/ej2-navigations";
import { Toast } from "@syncfusion/ej2-notifications";
import { notionSuggestions, iconMapByIndex, modelIcons } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';


(window as any).default = (): void => {
    loadCultureFiles();

    let sessionChats: any[] = [];
    let activeSessionId: string | null = null;
    let isFirstSessionAdded: boolean = false;
    let webIconCheckedState: boolean = true;
    let editIconCheckedState: boolean = true;
    let sideObj: Sidebar;
    let dialogInst: Dialog;
    let screenddbtnObj: DropDownButton;
    let historyddbtnObj: DropDownButton;
    let btnObj: DropDownButton;
    let toastObj: Toast;
    let settingsBtnObj: DropDownButton;
    let currentMode = 'Sidebar';

    let assistViews: AssistViewModel[] = [
        {
            type: 'Assist',
            name: "New AI chat"
        }
    ];

    let defaultAIAssistView = new AIAssistView({
        views: assistViews,
        promptSuggestions: notionSuggestions,
        promptSuggestionItemTemplate: suggestionItemContent,
        promptRequest: onPromptRequest,
        bannerTemplate: function () {
            return `<div class="banner-content">
            <div class="e-icons e-assistview-icon"></div>
            <h3>How can I help you today ?</h3>
        </div>`;
        },
        created: created,
        toolbarSettings: {
            items: [
                {
                    iconCss: 'e-icons e-export',
                    align: 'Right',
                    tooltip: 'Share Chat'
                },
                {
                    align: 'Right',
                    tooltip: 'Chat History',
                    template: '<button id="history-icon"></button>'
                },
                {
                    iconCss: 'e-icons e-edit-notes',
                    align: 'Right',
                    tooltip: 'Start New chat'
                },
                {
                    align: 'Right',
                    tooltip: 'Switch Chat Mode',
                    template: '<button id="screen-resizer"></button>'
                },
                {
                    iconCss: 'e-icons e-horizontal-line',
                    align: 'Right',
                    tooltip: 'Hide Chat'
                }
            ],
            itemClicked: toolbarItemClicked
        },
        footerToolbarSettings: {
            toolbarPosition: 'Bottom',
            items: [
                {
                    iconCss: 'e-icons e-assist-attachment-icon',
                    align: 'Left',
                    tooltip: 'Attach File'
                },
                {
                    align: 'Left',
                    tooltip: 'Settings',
                    template: '<button id="settings-icon"></button>'
                },
                {
                    iconCss: 'e-icons e-edit',
                    align: 'Left',
                    tooltip: 'Edit access',
                    visible: false
                },
                {
                    iconCss: 'e-icons e-time-zone',
                    align: 'Left',
                    tooltip: 'Web access',
                    visible: false
                },
                {
                    align: 'Right',
                    text: 'Auto',
                    template: '<button id="custombtn">Auto</button>'
                },
                {
                    iconCss: 'e-icons e-assist-speech-to-text',
                    align: 'Right'
                },
                {
                    iconCss: 'e-icons e-assist-send',
                    align: 'Right'
                }
            ],
            itemClick: footerToolbarItemClicked
        },
        responseToolbarSettings: {
            items: [
                {
                    iconCss: 'e-icons e-assist-copy'
                },
                {
                    iconCss: 'e-icons e-assist-like'
                },
                {
                    iconCss: 'e-icons e-assist-dislike'
                },
                {
                    iconCss: 'e-icons e-assist-audio'
                }
            ]
        },
        enableAttachments: true,
        enableStreaming: true,
        attachmentSettings: {
            saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
            removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
        },
        speechToTextSettings: {
            enable: true
        }
    });
    defaultAIAssistView.appendTo('#aiAssistView');

    dialogInst = new Dialog({
        target: '.notes-page',
        position: { X: 'right', Y: 0 },
        animationSettings: { effect: 'FadeZoom' },
        width: '500px',
        visible: false,
        cssClass: 'custom-dialog'
    });
    dialogInst.appendTo('#dialogElem');

    let fabInst = new Fab({
        iconCss: 'e-icons e-magic-wand',
        target: '.notes-page'
    });
    fabInst.appendTo('#fabElem');
    fabInst.element.style.display = 'none';

    fabInst.element.onclick = () => {
        toggleBackgroundState(true);
        moveAssistview(currentMode);
        fabInst.element.style.display = 'none';
    };

    async function onPromptRequest(args: PromptRequestEventArgs) {
        defaultAIAssistView.promptSuggestions = [];
        const abortController: AbortController = new AbortController();
        let content = 'Based on the following notes content:\n\n' + (document.querySelector('.notes-content') as HTMLElement)?.innerText + '\n\n---\n\nUser prompt: ' + args.prompt;
        let modifiedArgs = {
            prompt: content,
            attachedFiles: args.attachedFiles || []
        };
        defaultAIAssistView.addPromptResponse(await getAIResponse(modifiedArgs, abortController));
        if (!isFirstSessionAdded && !activeSessionId) {
            createNewSession(true);
            isFirstSessionAdded = true;
        }
        defaultAIAssistView.promptSuggestions = [];
    }

    function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
        if (args.item.iconCss === 'e-icons e-edit-notes') {
            createNewSession();
            defaultAIAssistView.promptSuggestions = notionSuggestions;
        } else if (args.item.iconCss === 'e-icons e-horizontal-line') {
            (document.querySelector('#dialogElem') as any).appendChild(document.getElementById('assistviewWrapper'));
            sideObj.hide();
            dialogInst.hide();
            toggleBackgroundState(true);
            fabInst.element.style.display = '';
        } else if (args.item.iconCss === 'e-icons e-export') {
            toastObj.show();
        }
    }

    function footerToolbarItemClicked(args: ToolbarItemClickedEventArgs) {
        if (args.item.iconCss === 'e-icons e-edit' || args.item.iconCss === 'e-icons e-time-zone') {
            settingsBtnObj.toggle();
        }
    }

    function moveAssistview(mode: string) {
        currentMode = mode;
        let wrapper = document.getElementById('assistviewWrapper');
        let fs = document.getElementById('fullscreenContainer');
        if (dialogInst.visible) {
            dialogInst.hide();
        }
        sideObj.hide();
        (fs as any).style.display = 'none';

        switch (mode) {
            case 'Sidebar':
                sideObj.show();
                toggleBackgroundState(true);
                sideObj.element.appendChild(wrapper);
                toggleIconClass('e-horizontal-line', 'e-chevron-right-double');
                break;

            case 'Floating':
                dialogInst.show();
                (document.querySelector('#dialogElem') as any).appendChild(wrapper);
                toggleBackgroundState(true);
                toggleIconClass('e-chevron-right-double', 'e-horizontal-line');
                break;

            case 'Full screen':
                (fs as any).style.display = 'block';
                (fs as any).appendChild(wrapper);
                toggleBackgroundState(false);
                toggleIconClass('e-chevron-right-double', 'e-horizontal-line');
                break;
        }
    }

    function toggleIconClass(selectorIconClass: string, replaceIconClass: string) {
        let icon = (defaultAIAssistView as any).toolbarHeader?.querySelector(`.${selectorIconClass}`);
        if (icon) {
            icon.className = `e-icons ${replaceIconClass}`;
        }
    }

    function created() {
        let items = [
            {
                text: 'Auto',
                iconCss: 'e-icons e-assistview-icon'
            },
            {
                text: 'Sonnet 4.6',
                iconCss: 'model-icon model-sonet'
            },
            {
                text: 'Opus 4.6',
                iconCss: 'model-icon model-opus'
            },
            {
                text: 'Gemini 3.1 Pro',
                iconCss: 'model-icon model-gemini',
            },
            {
                text: 'GPT 5.2',
                iconCss: 'model-icon model-gpt',
            },
        ];

        let currentModel = 'Auto';
        btnObj = new DropDownButton({
            items: items,
            cssClass: 'e-caret-hide e-flat',
            iconCss: 'e-icons e-assistview-icon',
            beforeItemRender: function (args: MenuEventArgs) {
                if (currentModel === args.item.text) {
                    args.element.classList.add('e-selected');
                }
            },
            select: function (args: MenuEventArgs) {
                currentModel = args.item.text;
                btnObj.content = args.item.text;
                updateModelIcon(args.item.text);
            }
        });
        btnObj.appendTo('#custombtn');

        let settingsItems = [
            {
                text: 'Can make changes',
                iconCss: 'e-icons e-edit',
                id: 'edit'
            },
            {
                text: 'Web access',
                iconCss: 'e-icons e-time-zone',
                id: 'web-access'
            },
            {
                text: 'Help Center',
                iconCss: 'e-icons e-reading-view',
                id: 'help-center'
            }
        ];

        settingsBtnObj = new DropDownButton({
            items: settingsItems,
            iconCss: 'e-icons e-settings',
            cssClass: 'e-caret-hide e-flat',
            popupWidth: '230px',
            itemTemplate: function (data: any) {
                if (data.text !== 'Help Center') {
                    return `
                    <div class="settings-item">
                    <span class="e-menu-icon ${data.iconCss}"></span>
                    <span class="custom-class">${data.text}</span>
                    <input
                        type="checkbox"
                        class="settings-switch"
                        id="settings-switch-${data.id}"
                    />
                    </div>`;
                }
                return `
                <div class="settings-item">
                    <span class="e-menu-icon ${data.iconCss}"></span>
                    <span class="custom-class">${data.text}</span>
                </div>`;
            },
            open: onSettingsDropdownCreated
        });
        settingsBtnObj.appendTo('#settings-icon');

        let screenTypes = [
            {
                text: 'Sidebar'
            },
            {
                text: 'Floating'
            },
            {
                separator: true
            },
            {
                text: 'Full screen'
            }
        ];

        screenddbtnObj = new DropDownButton({
            items: screenTypes,
            iconCss: 'e-icons e-resize',
            cssClass: 'e-caret-hide e-flat',
            beforeItemRender: function (args: MenuEventArgs) {
                if (currentMode === args.item.text) {
                    args.element.classList.add('e-selected');
                }
            },
            select: function (args: MenuEventArgs) {
                if (currentMode === args.item.text) return;
                moveAssistview(args.item.text);
            }
        });
        screenddbtnObj.appendTo('#screen-resizer');

        historyddbtnObj = new DropDownButton({
            items: [
                {
                    text: 'No Chat Histroy'
                }
            ],
            iconCss: 'e-icons e-history',
            cssClass: 'e-caret-hide e-flat',
            beforeItemRender: function (args: MenuEventArgs) {
                if (activeSessionId === args.item.id) {
                    args.element.classList.add('e-selected');
                }
            },
            select: function (args: MenuEventArgs) {
                if (args.item.id) {
                    loadSession(args.item.id);
                }
            }
        });
        historyddbtnObj.appendTo('#history-icon');

        sideObj = new Sidebar({
            target: '.notes-page',
            width: '400px',
            position: 'Right',
            animate: false
        });
        sideObj.appendTo('#notionSidebar');

        let wrapper = document.getElementById('assistviewWrapper');
        sideObj.element.appendChild(wrapper);
        toggleIconClass('e-horizontal-line', 'e-chevron-right-double');

        toastObj = new Toast({
            content: 'Share chat option is clicked !',
            target: document.body,
            position: { X: 'Right', Y: 'Top' },
            showCloseButton: true
        });
        toastObj.appendTo('#toastTarget');
    }

    function onSettingsDropdownCreated() {
        settingsBtnObj.items.forEach((item: any) => {
            let isChecked = false;
            if (item.text === 'Help Center') {
                return;
            } else if (item.id === 'edit') {
                isChecked = editIconCheckedState;
            } else if (item.id === 'web-access') {
                isChecked = webIconCheckedState;
            }
            let switchElem = document.getElementById(`settings-switch-${item.id}`);
            if (!switchElem) return;
            new Switch({
                checked: isChecked,
                change: function (args: ChangeEventArgs) {
                    toggleSwitch(args, item.text);
                }
            }).appendTo(switchElem);
        });
    }

    function toggleBackgroundState(show: boolean) {
        let notionContainer = document.querySelector('.notes-app-container');
        if (notionContainer) {
            hiddenClass(notionContainer, show);
        }
    }

    function hiddenClass(element: Element, show: boolean) {
        show ? element.classList.remove('e-hidden') : element.classList.add('e-hidden');
    }

    function toggleSwitch(args: any, text: string) {
        let visibilty = !args.checked;
        if (text === 'Can make changes') {
            editIconCheckedState = !visibilty;
            let editIcon = ((defaultAIAssistView as any).footerToolbarEle as any).element.querySelector('.e-edit').closest('.e-toolbar-item');
            if (editIcon) {
                hiddenClass(editIcon, visibilty);
            }
        } else if (text === 'Web access') {
            webIconCheckedState = !visibilty;
            let webIcon = ((defaultAIAssistView as any).footerToolbarEle as any).element.querySelector('.e-time-zone').closest('.e-toolbar-item');
            if (webIcon) {
                hiddenClass(webIcon, visibilty);
            }
        }
    }

    function suggestionItemContent(ctx: any) {
        let iconClass = iconMapByIndex[ctx.index] || '';
        return `
        <div class="suggestion-item active">
                <span class="${iconClass} suggestion-icon"></span>
                <span class="assist-suggestion-content">
                ${ctx.promptSuggestion}
                </span>
            </div>
        `;
    }

    function updateModelIcon(modelName: string) {
        btnObj.iconCss = `model-icon ${modelIcons[modelName]}`;
        btnObj.dataBind();
    }

    function persistActiveSession() {
        if (!activeSessionId) return;

        let session = sessionChats.find((s: any) => s.id === activeSessionId);
        if (!session) return;

        session.prompts = defaultAIAssistView.prompts;
    }

    function createNewSession(isAuto = false) {
        let prompts = defaultAIAssistView.prompts;

        if (!prompts || prompts.length === 0) {
            activeSessionId = null;
            defaultAIAssistView.prompts = [];
            defaultAIAssistView.dataBind();
            return;
        }

        if (activeSessionId) {
            persistActiveSession();
        } else {
            let session = {
                id: String(Date.now()),
                title: prompts[0] ? prompts[0].prompt : 'New Chat',
                prompts: prompts
            };

            sessionChats.push(session);
            activeSessionId = session.id;
            updateHistoryDropdown();
        }

        if (!isAuto) {
            activeSessionId = null;
            defaultAIAssistView.prompts = [];
            defaultAIAssistView.dataBind();
        }
    }

    function updateHistoryDropdown() {
        let items = sessionChats.map((session: any) => ({
            text:
                session.title.length > 30
                    ? session.title.substring(0, 30) + '...'
                    : session.title,
            id: session.id
        }));

        historyddbtnObj.items = items.length ? items : [{ text: 'No Chat History' }];

        historyddbtnObj.dataBind();
    }

    function ensureCurrentChatIsSaved() {
        let prompts = defaultAIAssistView.prompts;
        if (!prompts || prompts.length === 0) {
            return;
        }
        if (activeSessionId) {
            persistActiveSession();
            return;
        }
        let session = {
            id: String(Date.now()),
            title: prompts[0] ? prompts[0].prompt : 'New Chat',
            prompts: prompts
        };
        sessionChats.push(session);
        updateHistoryDropdown();
    }

    function loadSession(sessionId: any) {
        if (sessionId === activeSessionId) return;
        ensureCurrentChatIsSaved();
        let session = sessionChats.find((s: any) => s.id === sessionId);
        if (!session) return;
        activeSessionId = sessionId;
        defaultAIAssistView.prompts = session.prompts;
        defaultAIAssistView.promptSuggestions = [];
        defaultAIAssistView.dataBind();
    }
};
