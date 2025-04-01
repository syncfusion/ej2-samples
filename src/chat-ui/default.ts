import { loadCultureFiles } from '../common/culture-loader';

import { ChatUI, MessageModel } from '@syncfusion/ej2-interactive-chat';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { chatMessagedata, defaultChatSuggestions } from './messageData';

/**
 * Default sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let chatUser1 = new ChatUI({
        headerText: 'Albert',
        headerIconCss: 'chat_user1_avatar',
        messages: chatMessagedata,
        user: { id: 'user2', user: 'Reena', avatarUrl: './src/chat-ui/images/reena.png' },
        userTyping: (args: { isTyping: boolean, user: { user: string } }) => {
            handleUserTyping(args, chatUser2);
        },
        headerToolbar: {
            items: [
                {
                    type: 'Input',
                    template: '<button id="dduser1Menu" style="border: none; background: none !important;"></button>',
                    align: 'Right'
                }
            ]
        },
        messageSend: (args: { message: string }) => {
            chatUser2.suggestions = [];
            chatUser2.messages = chatUser2.messages.concat([args.message as MessageModel]);
        }
    });
    chatUser1.appendTo('#chatUser1');

    let chatUser2 = new ChatUI({
        headerText: 'Reena',
        headerIconCss: 'chat_user2_avatar',
        messages: chatMessagedata,
        suggestions: defaultChatSuggestions,
        user: { id: 'user1', user: 'Albert', avatarUrl: './src/chat-ui/images/andrew.png' },
        headerToolbar: {
            items: [
                {
                    type: 'Input',
                    template: '<button id="dduser2Menu" style="border: none; background: none !important;"></button>',
                    align: 'Right'
                }
            ]
        },
        messageSend: (args: { message: string }) => {
            chatUser2.suggestions = [];
            chatUser1.messages = chatUser1.messages.concat([args.message as MessageModel]);
        },
        userTyping: (args: { isTyping: boolean, user: { user: string } }) => {
            handleUserTyping(args, chatUser1);
        }
    });
    chatUser2.appendTo('#chatUser2');

    // Function to handle typing state of users
    function handleUserTyping(args: { isTyping: boolean, user: { user: string } }, otherChatUser: ChatUI): void {
        if (!args.isTyping) {
            otherChatUser.typingUsers = otherChatUser.typingUsers.filter(
                (userItem) => userItem.user !== args.user.user
            );
        } else {
            if (!otherChatUser.typingUsers.some((userItem) => userItem.user === args.user.user)) {
                otherChatUser.typingUsers = [...otherChatUser.typingUsers, args.user];
            }
        }
    }

    // Function to configure dropdown menu
    let dropdownConfig = (chatUser: ChatUI) => ({
        items: [
            { text: 'Mute', iconCss: 'e-icons e-eye-slash' },
            { separator: true },
            { text: 'Delete', iconCss: 'e-icons e-trash' }
        ],
        iconCss: 'e-icons e-more-horizontal-1',
        cssClass: 'e-caret-hide',
        select: (args: { item: { text: string } }) => {
            if (['Mute', 'Unmute'].indexOf(args.item.text) !== -1) {
                args.item.text = args.item.text === 'Mute' ? 'Unmute' : 'Mute';
            }

            if (args.item.text === 'Delete') {
                chatUser.messages = [];
            }
        }
    });

    new DropDownButton(dropdownConfig(chatUser1), '#dduser1Menu');
    new DropDownButton(dropdownConfig(chatUser2), '#dduser2Menu');
};
