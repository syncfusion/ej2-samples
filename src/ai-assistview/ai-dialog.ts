import { loadCultureFiles } from '../common/culture-loader';

import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { Fab } from "@syncfusion/ej2-buttons";
import { Dialog } from "@syncfusion/ej2-popups";
import { Splitter } from "@syncfusion/ej2-layouts";
import { defaultPromptResponseData, defaultSuggestions  } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

/**
 * Dialog sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let splitterObj: Splitter = new Splitter({
        height: '600px',
        paneSettings: [
            { size: '22%', resizable: false },
            { size: '78%', resizable: false }
        ]
    });
    splitterObj.appendTo('#splitter');

    let dialogInst: Dialog = new Dialog({
        content: document.getElementById('#aiAssistView') as HTMLElement,
        target: '.dialog-aiassistview',
        width: '440px',
        height: '100%',
        visible: false,
        cssClass: 'custom-dialog'
    }); 
    dialogInst.appendTo('#dialogElem');

    let dialogAIAssistView: AIAssistView = new AIAssistView({
        promptSuggestions: defaultSuggestions,
        enableStreaming: true,
        promptRequest: onPromptRequest,
        bannerTemplate: "#bannerContent",
        toolbarSettings: {
            items: [ { iconCss: 'e-icons e-close', align: 'Right' } ],
            itemClicked: toolbarItemClicked
        },
        responseToolbarSettings: {
            itemClicked: toolbarItemClicked
        },
        cssClass: 'custom-aiassistview'
    });
    dialogAIAssistView.appendTo('#aiAssistView');

    async function onPromptRequest(args: PromptRequestEventArgs) {
        const abortController: AbortController = new AbortController();
        let foundPrompt = defaultPromptResponseData.find((promptObj: any) => promptObj.prompt === args.prompt);
        let response = foundPrompt ? foundPrompt.response : await getAIResponse(args, abortController);
        dialogAIAssistView.addPromptResponse(response);
        dialogAIAssistView.promptSuggestions = foundPrompt?.suggestions || defaultSuggestions;
    }

    function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
        if ((args as any).item.iconCss === 'e-icons e-close') {
            dialogOpenClose();
        }
        if ((args as any).item.iconCss === 'e-icons e-assist-copy') {
            let targetElem = document.querySelector('.right-content .content');
            let response = dialogAIAssistView.prompts[(args as any).dataIndex].response;
            if (targetElem) {
                targetElem.innerHTML += response + '<br />';
                dialogOpenClose();
            }
        }
    }

    let fabInst: Fab = new Fab({
        iconCss: 'e-icons e-assistview-icon',
        content: 'AI Assist',
        target: '.dialog-aiassistview'
    });
    fabInst.appendTo('#fabElem');
    fabInst.element.onclick = () => {
        dialogOpenClose();
    };

    function dialogOpenClose() {
        dialogInst.visible = !dialogInst.visible;
    }
};
