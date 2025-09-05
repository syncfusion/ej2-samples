import { loadCultureFiles } from '../common/culture-loader';

import { ChatUI, UserModel,MessageModel, MessageToolbarItemClickedEventArgs } from '@syncfusion/ej2-interactive-chat';
import { Switch } from '@syncfusion/ej2-buttons';
import { DropDownList, MultiSelect } from '@syncfusion/ej2-dropdowns';
import { communityMessagedata, communityMessageAdmin, communityMessageUser1, communityMessageUser2, communityMessageUser3, communityMessageUser4 } from './messageData';

/**
 * Api sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chatUiInst = new ChatUI({
        messages: communityMessagedata,
        mentionUsers: [ communityMessageAdmin, communityMessageUser1, communityMessageUser2, communityMessageUser3, communityMessageUser4 ],
        user: { user: 'Alice', id: 'admin' },
        headerIconCss: "chat_header_icon",
        headerText: 'Design Community',
        showTimeBreak: true,
        timeStampFormat: 'MM/dd hh:mm a',
        messageToolbarSettings: {
            items: [
                { type: 'Button', iconCss: 'e-icons e-chat-forward', tooltip: 'Forward' },
                { type: 'Button', iconCss: 'e-icons e-chat-copy', tooltip: 'Copy' },
                { type: 'Button', iconCss: 'e-icons e-chat-reply', tooltip: 'Reply' },
                { type: 'Button', iconCss: 'e-icons e-chat-pin', tooltip: 'Pin' },
                { type: 'Button', iconCss: 'e-icons e-chat-trash', tooltip: 'Delete' }
            ],
            itemClicked: (args: MessageToolbarItemClickedEventArgs) => {
                if (args.item.prefixIcon === 'e-icons e-chat-forward') {
                    const newMessageObj: MessageModel = {
                        id: 'chat-message-' + (chatUiInst.messages.length + 1).toString(),
                        isForwarded: true,
                        isPinned: args.message.isPinned,
                        author: args.message.author,
                        mentionUsers: args.message.mentionUsers,
                        text: args.message.text,
                        timeStamp: args.message.timeStamp,
                        timeStampFormat: args.message.timeStampFormat,
                        status: args.message.status,
                        replyTo: args.message.replyTo
                    };
                    chatUiInst.addMessage(newMessageObj);
                }
            }
        }
    });

    chatUiInst.appendTo('#chatui');

    let chatProperties: object[] = [
        { id: 'chatTimestamp', checked: true, property: 'showTimeStamp' },
        { id: 'chatTimebreak', checked: true, property: 'showTimeBreak' },
        { id: 'chatHeader', checked: true, property: 'showHeader' },
        { id: 'chatFooter', checked: true, property: 'showFooter' },
        { id: 'compactmode', checked: false, property: 'enableCompactMode' }
    ];

    const mentionUsers: any = {
        'Alice Brown': communityMessageAdmin,
        'Michale Suyama': communityMessageUser1,
        'Charlie': communityMessageUser2,
        'Janet': communityMessageUser3,
        'Jordan Peele': communityMessageUser4
    };

    chatProperties.forEach(toggle => {
        new Switch({
            checked: (toggle as any).checked,
            change: (args: { checked: boolean }) => {
                (chatUiInst as any)[(toggle as any).property] = args.checked;
            }
        }).appendTo(`#${(toggle as any).id}`);

    });

    new DropDownList({
        placeholder: 'Format',
        width: '180px',
        change: (args: { itemData: { value: string } }) => {
            chatUiInst.timeStampFormat = args.itemData.value;
        }
    }).appendTo('#chat_dateformats');

    new MultiSelect({
        placeholder: 'Typing users...',
        select: (args: { itemData: { value: string } }) => {
            let user: UserModel = {
                user: args.itemData.value,
                avatarBgColor: '#87cefa'
            }
            if (['Laura', 'Charlie'].indexOf(args.itemData.value) !== -1) {
                user.avatarBgColor = args.itemData.value === 'Charlie' ? '#e6cdde' : '#dec287';
                user.avatarUrl = `./src/chat-ui/images/${args.itemData.value.toLowerCase()}.png`;
            }
            chatUiInst.typingUsers = [...chatUiInst.typingUsers, user];
        },
        removed: (args: { itemData: { value: string } }) => {
            chatUiInst.typingUsers = chatUiInst.typingUsers.filter(user => user.user !== args.itemData.value);
        }
    }).appendTo('#chat_typingUsers');

    new MultiSelect({
        placeholder: 'Mention users...',
        value: ["Alice Brown", "Michale Suyama", "Charlie", "Janet", "Jordan Peele"],
        select: (args: { itemData: { value: string } }) => {
            const user = mentionUsers[args.itemData.value];
            chatUiInst.mentionUsers = [...chatUiInst.mentionUsers, user];
            chatUiInst.dataBind();
        },
        removed: (args: { itemData: { value: string } }) => {
            chatUiInst.mentionUsers = chatUiInst.mentionUsers.filter(user => user.user !== args.itemData.value);
            chatUiInst.dataBind();
        }
    }, '#chat_mentionUsers');
};
