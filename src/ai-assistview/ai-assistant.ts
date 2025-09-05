import { loadCultureFiles } from '../common/culture-loader';

import { AIAssistView } from "@syncfusion/ej2-interactive-chat";
import { Sidebar, Toolbar } from '@syncfusion/ej2/navigations';
import { DropDownButton } from '@syncfusion/ej2/splitbuttons';
import { ListView } from '@syncfusion/ej2/lists';
import { assistantSuggestions, assistantResponses } from './promptResponseData';
import { Splitter } from '@syncfusion/ej2/layouts';
import { RichTextEditor } from '@syncfusion/ej2/richtexteditor';

(window as any).default = (): void => {
    loadCultureFiles();
    // Fetch your API_KEY
    let API_KEY: string = "Your API key";
    // Updat your AI model
    let model: string = "Your AI model";

    async function GetResult(prompt: string) {
        let responseObj = assistantResponses.find((resp: any) => resp.prompt === prompt);
        let result: string = responseObj ? responseObj.response : "I apologize, but I'm experiencing some difficulty processing your request at this moment, which might be due to the complexity of your query or a technical limitation on my end, so I would greatly appreciate it if you could rephrase your question or provide additional context that might help me better understand what you're looking for.";
        return result;
    }

    let selectedConvId: string = "";
    let isFirstPrompt: boolean = false;

    let aiAssistViewInst: AIAssistView = new AIAssistView({
        promptSuggestions: assistantSuggestions,
        promptRequest: (args) => {
            execute(args.prompt);
        },
        bannerTemplate: "#bannerContent",
        toolbarSettings: {
            items: [
                { type: 'Input', template: '<button id="ddMenu"></button>', align: 'Right' }
            ]
        },
        enableAttachments: true,
        attachmentSettings: {
            saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
            removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
        }
    });
    aiAssistViewInst.appendTo('#aiAssistView');

    let sideObj: Sidebar = new Sidebar({
        width: "260px",
        target: ".ai-assistant",
        position: 'Left',
        enableDock: true,
        dockSize: "75px",
        enableGestures: false
    });
    sideObj.appendTo("#assistantSidebar");

    new DropDownButton({
        content: 'Profile',
        items: [
            { text: 'Settings', iconCss: 'e-icons e-settings' },
            { separator: true },
            { text: 'Log out', iconCss: 'e-icons e-export' }
        ],
        iconCss: 'e-icons e-user',
        cssClass: 'sign-in-button',
    }, '#ddMenu');

    let toolbarObj: Toolbar = new Toolbar({
        overflowMode: 'Popup',
        items: [
            {
                prefixIcon: 'e-icons e-assistview-icon', tooltipText: 'Ai-Assistant',
            },
            {
                prefixIcon: 'e-icons e-menu', tooltipText: 'Toggle sidebar', align: 'Right',
                click: function () {
                    sideObj.toggle();
                }
            },
            {
                prefixIcon: 'e-icons e-rename', tooltipText: 'Start new chat', align: 'Right',
                click: function () {
                    loadNewAIAssist();
                },
                cssClass: 'new-chat-button'
            },
        ],
    });
    toolbarObj.appendTo('#assistantToolbar');  

    let listData = getLeftPaneData();
    let grpListObj: ListView = new ListView({
        dataSource: listData,
        fields: { groupBy: 'category', id: 'id', text: 'text' },
        template: '<div class="chat-item"><div class="chat-title">${text}</div></div>',
        select: function (args: any) {
            if (args.event) {
                selectedConvId = args.data.id;
                updateAIAssistViewData(args.data.id);
                updateBannerStyle();
            }
        }
    });
    grpListObj.appendTo('#assistant-listview-grp');

    InitializingApp();

    function getDate(): number {
        return Date.now();
    }

    function getDateFormat(date: number): string {
        const today = new Date(date);
        const yyyy = today.getFullYear();
        let mm: number | string = today.getMonth() + 1; // Months start at 0!
        let dd: number | string = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '/' + mm + '/' + yyyy;
    }

    function getCategory(today: string, key: number): string {
        const date = getDateFormat(key);
        if (date == today) {
            return "Today";
        } else {
            return "Previous days";
        }
    }

    function checkInitialLocalStorage(isClear?: boolean): void {
        const aiAssistView = localStorage.getItem('aiassist-view');
        if (!aiAssistView || isClear) {
            const data: Record<string, any> = {};
            localStorage.setItem('aiassist-view', JSON.stringify(data));
        }
    }

    function checkAndUpdateLocalStorage(prompt: string): void {
        const aiAssistView = localStorage.getItem('aiassist-view');
        const appData = JSON.parse(aiAssistView);
        const curConvDate = getDate();
        const prompts = [];
        const orgPrompts = aiAssistViewInst.prompts;
        for (let i = 0; i < orgPrompts.length; i++) {
            const tPrompt = {
                prompt: orgPrompts[i].prompt || "",
                response: orgPrompts[i].response || ""
            };
            prompts.push(tPrompt);
        }
        const pSuggestions: string[] = [];
        const orgPSuggestions = aiAssistViewInst.promptSuggestions;
        for (let j = 0; j < orgPSuggestions.length; j++) {
            pSuggestions.push(orgPSuggestions[j]);
        }
        if (selectedConvId) {
            const convData = appData[selectedConvId];
            if (convData.name === convData.name) {
                const dataSource = grpListObj.dataSource as any[];
                if (dataSource) {
                    for (let k = 0; k < dataSource.length; k++) {
                        const item = dataSource[k] as any;
                        if (item && item.id === selectedConvId) {
                            item.text = convData.name;
                            break;
                        }
                    }
                }
                grpListObj.dataBind();
            }
            convData.prompts = prompts;
            convData.promptSuggestions = pSuggestions;
            localStorage.setItem('aiassist-view', JSON.stringify(appData));
        } else {
            selectedConvId = curConvDate.toString();
            const convData = {
                name: prompt,
                prompts: prompts,
                promptSuggestions: pSuggestions
            };
            appData[curConvDate] = convData;
            localStorage.setItem('aiassist-view', JSON.stringify(appData));
            refreshConversationList();
            const itemToSelect: any = 0;
            grpListObj.selectItem(itemToSelect);
        }
    }

    function getLeftPaneData() {
        const today = getDateFormat(Date.now());
        const aiAssistView = localStorage.getItem('aiassist-view');
        const appData = JSON.parse(aiAssistView);
        const keys = Object.keys(appData);
        const items = [];
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const numericKey = parseInt(key);
            const convData = appData[key];
            const name = convData.name.split('\n')[0];

            items.push({
                text: name,
                id: numericKey,
                numericId: numericKey, // Extra field for sorting
                category: getCategory(today, numericKey),
                time: getDateFormat(numericKey)
            });
        }
        items.sort(function (a, b) {
            return b.numericId - a.numericId;
        });
        return items;
    }

    function updateBannerStyle(): void {
        const bannerElem = document.querySelector('.banner-content');
        if (aiAssistViewInst.prompts && aiAssistViewInst.prompts.length) {
            bannerElem.classList.remove('e-no-content');
        } else {
            bannerElem.classList.add('e-no-content');
        }
    }

    function updateConversationName(prompt: string) {
        if (isFirstPrompt && selectedConvId) {
            const aiAssistView = JSON.parse(localStorage.getItem('aiassist-view'));
            const convData = aiAssistView[selectedConvId];
            if (convData?.name === "New Conversation") {
                convData.name = prompt.slice(0, 40).trim();
                localStorage.setItem('aiassist-view', JSON.stringify(aiAssistView));
                const dataSource = grpListObj.dataSource as any[];
                const listItem = dataSource.find((item: any) => item.id === selectedConvId);
                if (listItem) {
                    listItem.text = convData.name;
                    grpListObj.dataBind();
                }
                refreshConversationList();
            }
            isFirstPrompt = false;
        }
    }

    function refreshConversationList(): void {
        const listData = getLeftPaneData();
        grpListObj.dataSource = listData;
        grpListObj.dataBind();
    }

    function updateAIAssistViewData(id: string | number): void {
        if (id) {
            const aiAssistView = localStorage.getItem('aiassist-view');
            const appData = JSON.parse(aiAssistView);
            const convData = appData[id.toString()];

            aiAssistViewInst.prompts = convData.prompts;
            aiAssistViewInst.promptSuggestions = convData.promptSuggestions;
        } else {
            aiAssistViewInst.prompts = [];
            aiAssistViewInst.promptSuggestions = assistantSuggestions;
        }
    }

    function loadNewAIAssist(): void {
        selectedConvId = "";
        isFirstPrompt = true;
        const dataSource = grpListObj.dataSource as any[];
        if (dataSource.length !== 0) {
            aiAssistViewInst.prompts = [];
            aiAssistViewInst.promptSuggestions = assistantSuggestions;
        }
        const curConvDate = getDate();
        const aiAssistView = localStorage.getItem('aiassist-view');
        const appData = JSON.parse(aiAssistView);
        const convData = {
            name: "New Conversation",
            prompts: [] as any[],
            promptSuggestions: assistantSuggestions
        };
        appData[curConvDate] = convData;
        localStorage.setItem('aiassist-view', JSON.stringify(appData));
        refreshConversationList();
        selectedConvId = curConvDate.toString();
        const itemToSelect = { id: curConvDate };
        grpListObj.selectItem(itemToSelect);
        updateBannerStyle();
    }

    function InitializingApp(): void {
        checkInitialLocalStorage();
        const resetButton = document.getElementById('resetButton');
        if (resetButton) {
            resetButton.addEventListener('click', function () {
                grpListObj.dataSource = [];
                grpListObj.dataBind();
                localStorage.setItem('aiassist-view', JSON.stringify({}));
                selectedConvId = "";
                aiAssistViewInst.prompts = [];
                aiAssistViewInst.promptSuggestions = assistantSuggestions;
                updateBannerStyle();
            });
        }
    }

    async function execute(prompt: string) {
        try {
            aiAssistViewInst.promptSuggestions = [];
            var finalResult: any[] = [];
            var result = "";
            setTimeout(async () => {
                let suggestionsObj = assistantResponses.find((resp: any) => resp.prompt === prompt);
                let suggestionResult = suggestionsObj ? suggestionsObj.suggestions || assistantSuggestions : assistantSuggestions;

                for (let i = 0; i < suggestionResult.length; i++) {
                    if (suggestionResult[i]) {
                        finalResult.push(suggestionResult[i].replace("- ", "").replace("* ", "").trim());
                    }
                }
            }, 1000);

            setTimeout(async () => {
                result = await GetResult(prompt);
                aiAssistViewInst.addPromptResponse(result);
                aiAssistViewInst.promptSuggestions = finalResult;
                updateBannerStyle();
                checkAndUpdateLocalStorage(prompt);
                updateConversationName(prompt);
            }, 1000);

        } catch (error) {
            result = error;
            aiAssistViewInst.addPromptResponse("I apologize, but I'm experiencing some difficulty processing your request at this moment, which might be due to the complexity of your query or a technical limitation on my end, so I would greatly appreciate it if you could rephrase your question or provide additional context that might help me better understand what you're looking for.");
            aiAssistViewInst.promptSuggestions = [];
            updateConversationName(prompt);
        }
        const dataSource = grpListObj.dataSource as any[];
        if (!dataSource || dataSource.length === 0) {
            loadNewAIAssist();
            return;
        }
    }
};