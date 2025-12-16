import { loadCultureFiles } from '../common/culture-loader';

import { ChatUI } from '@syncfusion/ej2-interactive-chat';

/**
 * Template sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let chatUser: ChatUI = new ChatUI({
        headerText: 'Paul Wilson (You)',
        headerIconCss: "chat_user_avatar",
        user: { id: 'user1', user: 'Paul Wilson', avatarUrl: './src/chat-ui/images/paul_wilson.png' },
        emptyChatTemplate: `<div class="emptychat-content">
            <div class="chat-text-content">
                <h5><span class="e-icons e-multiple-comment"></span></h5>
                <div class="emptyChatText" >No conversations yet.</div>
            </div>
            <div class="emptyChatMessage" >Type to begin or attach images, videos or files.</div>
            </div>`,
        enableAttachments: true,
        attachmentSettings: {
            saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
            removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
        },
         headerToolbar: {
            items: [ { iconCss: 'e-icons e-refresh', align: 'Right', tooltip: 'Clear Chat' } ],
            itemClicked: toolbarItemClicked
        }
    });
    chatUser.appendTo('#chatAttachment');

    function toolbarItemClicked() {
        chatUser.messages = [];
    }

};