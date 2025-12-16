import { loadCultureFiles } from '../common/culture-loader';
import { AIAssistView, PromptRequestEventArgs } from "@syncfusion/ej2-interactive-chat";
import { Sidebar } from "@syncfusion/ej2-navigations";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { Button } from "@syncfusion/ej2-buttons";
import { ListView } from "@syncfusion/ej2-lists";
import { Toast } from "@syncfusion/ej2-notifications";
import { marked } from 'marked';
import { getGeminiAIAssit, getdeepSeekAIAssit, getAzureOpenAIAssist, type AzureOpenAIRequest } from './service';

(window as any).default = (): void => {
    loadCultureFiles();
    let geminiApiKey: string = '';
    let geminiModel: string = '';
    let deepseekApiKey: string = '';
    let azureApiKey: string = ''; // or put a dedicated Azure key here
    let azureEndpoint: string = ''; // REPLACE
    let azureDeployment: string = ''; // REPLACE with your exact deployment name
    let azureApiVersion: string = ''; // ensure supported by your resource

    let suggestions: string[] = [
        'What are the best tools for organizing tasks?',
        'How can I maintain work-life balance?',
    ];

    let selectedConvId: string = '';
    let listData: any[] = [];
    let stopStreaming: boolean = false;
    let isMobile: boolean = false;
    let aiAssistViewInst: AIAssistView;
    let sideObj: Sidebar;
    let toastObj: Toast;
    let models: any[] = [
        { id: 'gemini', name: 'Gemini 2.5 Flash' },
        { id: 'deepseek', name: 'DeepSeek-R1' },
        { id: 'openai', name: 'GPT-4o-mini(Azure)' }
    ];
    let selectedModel: string = 'openai';

    // Initializes the app state, loads conversations, sets up layout, and shows initial toast
    function InitializingApp() {
        checkInitialLocalStorage();
        listData = getLeftPaneData();
        conversationList.dataSource = listData;
        conversationList.refresh();
        setSidebarConfig();
        if (listData.length === 0) {
            loadNewAIAssist();
        } else {
            onItemSelect(listData[0]);
        }
    }

    // Make sure localStorage root object exists (optionally clear)
    function checkInitialLocalStorage(isClear: boolean = false): void {
        if (!localStorage.getItem('aiassist-model') || isClear) {
            localStorage.setItem('aiassist-model', JSON.stringify({}));
        }
    }

    function promptRequest(args: PromptRequestEventArgs) {
        if (!args.prompt || !args.prompt.trim()) {
            return;
        }
        if (!selectedConvId) {
            selectedConvId = createNewConversation();
        }
        updateBannerStyle();
        updateConversationName(args.prompt);
        if (selectedModel === 'gemini') {
            handleGeminiRequest(args);
        } 
        else if(selectedModel === 'deepseek') {
            handleDeepSeekRequest(args);
        }
        else {
            handleOpenAIRequest(args);
        }
    }

     // Toggles the sidebar on mobile when the close button is pressed
    function btnClick() {
        if (isMobile) {
            sideObj.toggle();
        }
    }

    // Toggles the sidebar from the button
    function toggleSidebar() {
        sideObj.toggle();
    }

    // Applies responsive configuration to the sidebar depending on viewport width
    function setSidebarConfig() {
        isMobile = window.innerWidth <= 680;
        if (isMobile) {
            sideObj.enableDock = false;
            sideObj.type = 'Over';
            sideObj.showBackdrop = true;
            sideObj.hide();
            const toggleButtonElement = document.getElementById('togglebtn') as HTMLElement;
            if (toggleButtonElement) toggleButtonElement.style.display = 'block';

            const closeButtonElement = document.getElementById('closebtn') as HTMLElement;
            if (closeButtonElement) closeButtonElement.style.display = 'block';
        } else {
            sideObj.enableDock = false;
            sideObj.type = 'Auto';
            sideObj.showBackdrop = false;
            sideObj.closeOnDocumentClick = false;
            sideObj.show();

            const toggleButtonElement = document.getElementById('togglebtn') as HTMLElement;
            if (toggleButtonElement) toggleButtonElement.style.display = 'none';

            const closeButtonElement = document.getElementById('closebtn') as HTMLElement;
            if (closeButtonElement) closeButtonElement.style.display = 'none';
        }
        sideObj.dataBind();
    }

     // Re-compute layout only when the mobile breakpoint boundary is crossed
    function onResize() {
        const newIsMobile = window.innerWidth <= 680;
        if (newIsMobile !== isMobile) {
            setSidebarConfig();
        }
    }

     // Loads a conversation by id into the AIAssistView and adjusts the layout
    function onItemSelect(item: any): void {
        selectedConvId = item.id;
        updateAIAssistViewData(item.id);
        updateBannerStyle();
        if (isMobile && sideObj.isOpen) {
            sideObj.toggle();
        }
    }

    // Removes a conversation from localStorage and updates the UI
    function deleteConversation(convId: string): void {
        const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
        delete appData[convId];
        localStorage.setItem('aiassist-model', JSON.stringify(appData));
        refreshConversationList();
        if (selectedConvId === convId) {
            if (listData.length > 0) {
                onItemSelect(listData[0]);
            } else {
                loadNewAIAssist();
            }
        }
    }

    // Determines the next conversation id by incrementing the max numeric id
    function getNextConvId(): string {
        const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
        const ids = Object.keys(appData).map(k => parseInt(k)).filter(id => !isNaN(id));
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        return (maxId + 1).toString();
    }

    // Persists the current conversation prompts from the AIAssistView back to localStorage
    function checkAndUpdateLocalStorage(): void {
        const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
        if (selectedConvId && appData[selectedConvId]) {
            appData[selectedConvId].prompts = aiAssistViewInst.prompts.map(p => ({
                prompt: p.prompt || '',
                response: p.response || '',
            }));
            localStorage.setItem('aiassist-model', JSON.stringify(appData));
        }
    }

    // Builds the left pane list from localStorage, sorted by id descending
    function getLeftPaneData() {
        const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
        return Object.keys(appData)
            .map(k => ({ id: k, num: parseInt(k) }))
            .filter(item => !isNaN(item.num))
            .sort((a, b) => b.num - a.num)
            .map(item => {
                const convData = appData[item.id];
                const name = convData?.name ? convData.name.split('\n')[0] : 'Untitled Conversation';
                return { text: name, id: item.id };
            });
    }

    function updateBannerStyle(): void {
        const bannerElem = document.querySelector('.banner-content') as HTMLElement;
        if (bannerElem) {
            bannerElem.style.display = (aiAssistViewInst.prompts || []).length > 0 ? 'none' : 'block';
        }
    }

    // If the current conversation is "New Conversation", set its name from the first prompt
    function updateConversationName(prompt: string) {
        if (selectedConvId) {
            const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
            const convData = appData[selectedConvId];
            if (convData && convData.name === 'New Conversation') {
                convData.name = prompt.slice(0, 40).trim() || 'Untitled Conversation';
                localStorage.setItem('aiassist-model', JSON.stringify(appData));
                refreshConversationList();
            }
        }
    }

    // Refreshes the left pane list and re-binds delete handlers
    function refreshConversationList(): void {
        listData = getLeftPaneData();
        conversationList.dataSource = listData;
        conversationList.refresh();
        refreshDeleteListeners();
    }

    // Loads prompts and suggestion data for a conversation into AIAssistView
    function updateAIAssistViewData(id: string | number): void {
        if (!aiAssistViewInst) return;
        aiAssistViewInst.prompts = [];
        aiAssistViewInst.promptSuggestions = suggestions;
        if (id) {
            const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
            const convData = appData[id.toString()];
            if (convData) {
                aiAssistViewInst.prompts = convData.prompts || [];
                aiAssistViewInst.promptSuggestions = convData.promptSuggestions || suggestions;
            }
        }
    }

    // Clears the current AIAssistView to start a brand-new conversation
    function loadNewAIAssist(): void {
        selectedConvId = '';
        if (aiAssistViewInst) {
            aiAssistViewInst.prompts = [];
            aiAssistViewInst.promptSuggestions = suggestions;
        }
        updateBannerStyle();
        if (isMobile && sideObj.isOpen) {
            sideObj.toggle();
        }
    }

    // Creates a new conversation entry in localStorage and returns its id
    function createNewConversation(): string {
        const newId = getNextConvId();
        const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
        appData[newId] = {
            name: 'New Conversation',
            prompts: [],
            promptSuggestions: [...suggestions],
        };
        localStorage.setItem('aiassist-model', JSON.stringify(appData));
        refreshConversationList();
        return newId;
    }

    function handleStopResponse() {
        stopStreaming = true;
    }

    async function streamAIResponse(fullResponse: string): Promise<string> {
        let streamedResponseText = '';
        if (fullResponse) {
            await new Promise(resolve => setTimeout(resolve, 300));
            let i = 0;
            while (i < fullResponse.length && !stopStreaming) {
                streamedResponseText += fullResponse[i];
                i++;
                aiAssistViewInst.addPromptResponse(
                    marked.parse(streamedResponseText),
                    false
                );
                aiAssistViewInst.scrollToBottom();
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }
        return streamedResponseText;
    }

    async function handleGeminiRequest(args: PromptRequestEventArgs): Promise<void> {
        stopStreaming = false;
        if (!aiAssistViewInst) return;
        try {
            const fullResponse = await getGeminiAIAssit(geminiApiKey, geminiModel, args.prompt!);
            const streamedText = await streamAIResponse(fullResponse);
            if (!stopStreaming) {
                aiAssistViewInst.addPromptResponse(
                    marked.parse(streamedText),
                    true
                );
                checkAndUpdateLocalStorage();
            }
        } catch (error) {
            setTimeout(() => {
                const errorMessage = '⚠️ Something went wrong while connecting to the Gemini service. Please check your API key.';
                aiAssistViewInst.addPromptResponse(marked.parse(errorMessage), true);
                checkAndUpdateLocalStorage();
            },1000);
        }
    }

    // Sends a prompt to DeepSeek, streams the response, and finalizes it if not stopped
    async function handleDeepSeekRequest(args: PromptRequestEventArgs): Promise<void> {
        stopStreaming = false;
        if (!aiAssistViewInst) return;
        try {
            const fullResponse = await getdeepSeekAIAssit(deepseekApiKey, args.prompt!);
            const streamedText = await streamAIResponse(fullResponse);
            if (!stopStreaming) {
                aiAssistViewInst.addPromptResponse(
                    marked.parse(streamedText),
                    true
                );
                checkAndUpdateLocalStorage();
            }
        } catch (error) {
            setTimeout(() => {
                const errorMessage = '⚠️ Something went wrong while connecting to the DeepSeek service. Please check your API key.';
                aiAssistViewInst.addPromptResponse(marked.parse(errorMessage), true);
                checkAndUpdateLocalStorage();
            },1000);
        }
    }

    async function handleOpenAIRequest(args: PromptRequestEventArgs): Promise<void> {
        stopStreaming = false;
        if (!aiAssistViewInst) return;
        try {
            const fullResponse = await getAzureOpenAIAssist({
                apiKey: azureApiKey,
                endpoint: azureEndpoint,
                deployment: azureDeployment,
                apiVersion: azureApiVersion,
                prompt: args.prompt!
            } as AzureOpenAIRequest)
            const streamedText = await streamAIResponse(fullResponse);
            if (!stopStreaming) {
                aiAssistViewInst.addPromptResponse(
                    marked.parse(streamedText),
                    true
                );
                checkAndUpdateLocalStorage();
            }
        } catch (error) {
            setTimeout(() => {
            const errorMessage = '⚠️ Something went wrong while connecting to the OpenAI service. Please check your API key.';
            aiAssistViewInst.addPromptResponse(errorMessage, true);
            checkAndUpdateLocalStorage();
            },1000);
        }
    }

    // Binds click handlers to per-item delete icons in the conversation list
    function refreshDeleteListeners(): void {
        const deletes = document.querySelectorAll('.delete-icon');
        deletes.forEach(del => {
            (del as HTMLElement).onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                const convId = (del as HTMLElement).dataset.id!;
                deleteConversation(convId);
            };
        });
    }

    // Instantiate the AIAssistView component and attach to DOM
    aiAssistViewInst = new AIAssistView({
        bannerTemplate: "#bannerTemplate",
        promptSuggestions: suggestions,
        promptRequest: promptRequest,
        showHeader: false,
        stopRespondingClick: handleStopResponse,
        width: 'auto',
        enableAttachments: true,
        attachmentSettings: {
            saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
            removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
        },
        footerToolbarSettings: {
            toolbarPosition: 'Bottom'
        }
    });
    aiAssistViewInst.appendTo('#aiAssistView');
    const toggleButtonElement = document.getElementById('togglebtn') as HTMLButtonElement;
    const togglebtn = new Button({
        iconCss: "e-icons e-menu"
    });
    togglebtn.appendTo(toggleButtonElement);
    toggleButtonElement.addEventListener('click', toggleSidebar);

    // Model selector dropdown: switches which backend is used for prompts
    const modelDropdown = new DropDownList({
        dataSource: models,
        popupHeight: "200px",
        width: "200px",
        fields: { text: 'name', value: 'id' },
        value: selectedModel,
        change: (args) => {
            selectedModel = args.value as string;
            const modelName = models.find(m => m.id === selectedModel)?.name || 'the selected model';
            toastObj.show({
                content: `<div class="toast-content"><span class="e-icons e-magic-wand"> </span> <span>You are using <b>${modelName}</b> with standard access</span></div>`
            });
        }
    });
    modelDropdown.appendTo('#ai-model-dropdown');

    sideObj = new Sidebar({
        width: "250px",
        target: ".ai-model",
        position: "Left",
        enableDock: false,
        dockSize: "50px",
        enableGestures: false,
        type: 'Auto',
        closeOnDocumentClick: false,
        showBackdrop: false
    });
    sideObj.appendTo('#assistantSidebar');

    const closeButtonElement = document.getElementById('closebtn') as HTMLButtonElement;
    const closebtn = new Button({
        iconCss: "e-icons e-close",
        cssClass: "e-flat"
    });
    closebtn.appendTo(closeButtonElement);
    closeButtonElement.addEventListener('click', btnClick);

    const newThreadButtonElement = document.getElementById('newthreadbtn') as HTMLButtonElement;
    const newthreadbtn = new Button({
        iconCss: "e-icons e-plus",
        cssClass: "new-thread-btn",
        content: "New Thread"
    });
    newthreadbtn.appendTo(newThreadButtonElement);
    newThreadButtonElement.addEventListener('click', loadNewAIAssist);

    // Left pane conversation list: item template includes a delete icon
    const conversationList = new ListView({
        dataSource: listData,
        fields: { text: 'text', id: 'id' },
        template:'<div class="e-text-content"><span class="e-list-text">${text}</span><span data-id=${id} class="e-icons e-trash delete-icon" title="Delete Conversation"></span></div>',
        select: (args) => onItemSelect(args.data)
    });
    conversationList.appendTo('#conversation-list');

    // Delegated delete handler to support both current and future list items
    const convContainer = document.getElementById('conversation-list')!;
    convContainer.addEventListener('click', (ev: Event) => {
        const target = ev.target as HTMLElement;
        const icon = target.closest('.delete-icon') as HTMLElement | null;
        if (!icon) return;

        ev.preventDefault();
        ev.stopPropagation();

        const convId = icon.dataset.id!;
        deleteConversation(convId);
    });

     // General-purpose toast instance
    toastObj = new Toast({
        position: { X: 'right', Y: 'Top' },
        target: ".e-view-content",
        timeOut: 1500,
        showCloseButton: true
    });
    toastObj.appendTo('#toast');

    // Initial page setup: load conversations, set layout, and wire up resize handling
    InitializingApp();
    listData = getLeftPaneData();
    if (listData.length === 0) {
        loadNewAIAssist();
    } else {
        onItemSelect(listData[0]);
    }
    setSidebarConfig();
    window.addEventListener('resize', onResize);
};