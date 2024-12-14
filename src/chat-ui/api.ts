import { loadCultureFiles } from '../common/culture-loader';
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';
import { Switch } from '@syncfusion/ej2-buttons';
import { DropDownList, MultiSelect } from '@syncfusion/ej2-dropdowns';
import { communityMessagedata } from './messageData';

/**
 * Api sample
 */
(window as any).default = function() {
    let chatUiInst = new ChatUI({
        messages: communityMessagedata,
        user: { user: 'Alice', id: 'admin' },
        headerIconCss: "chat_header_icon",
        headerText: 'Design Community',
        showTimeBreak: true,
        timeStampFormat: 'MM/dd hh:mm a'
    });

    chatUiInst.appendTo('#chatui');

    let chatProperties: object[] = [
        { id: 'chatTimestamp', checked: true, property: 'showTimeStamp' },
        { id: 'chatTimebreak', checked: true, property: 'showTimeBreak' },
        { id: 'chatHeader', checked: true, property: 'showHeader' },
        { id: 'chatFooter', checked: true, property: 'showFooter' }
    ];

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
                avatarBgColor: '#bacbe4'
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
}
