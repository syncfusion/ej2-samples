import { loadCultureFiles } from '../common/culture-loader';
import { ChatUI, MessageModel, UserModel } from '@syncfusion/ej2-interactive-chat';
import {
    RichTextEditor, HtmlEditor, Toolbar, QuickToolbar, FormatPainter, Link,
    Image, Table, Audio, Video, PasteCleanup , EmojiPicker
} from '@syncfusion/ej2-richtexteditor';

RichTextEditor.Inject(HtmlEditor, Toolbar, QuickToolbar, FormatPainter, Table, Link, Image, Audio, Video, PasteCleanup, EmojiPicker);

(window as any).default = (): void => {
    loadCultureFiles();
    const currentUserModel: UserModel = {
        id: 'user1',
        user: 'Albert',
    };

    const michaleUserModel: UserModel = {
        id: 'user2',
        user: 'Michale Suyama',
        avatarUrl: '//ej2.syncfusion.com/demos/src/chat-ui/images/andrew.png'
    };

    const chatMessages: MessageModel[] = [
        { author: currentUserModel, text: 'Hi Michale, are we on track for the deadline?' },
        { author: michaleUserModel, text: 'Yes, the design phase is complete.' },
        { author: currentUserModel, text: 'I will review it and send feedback by today.' },
        { author: michaleUserModel, text: 'Okay.' }
    ];

    let chatRTE: RichTextEditor;

    const footerTemplate = (): string => {
        return `
        <div class="custom-footer">
            <div id="editor"></div>
            <button id="sendMessage" class="e-btn e-primary e-icons e-send e-send-1 e-icon-btn e-small" style="float: right;margin: 4px;"></button>
            <button id="cancelMessage" class="e-btn e-secondary e-icons e-trash e-delete-3 e-icon-btn e-small" style="float: right; margin: 4px;"></button>
        </div>`;
    };

    const chatUI: ChatUI = new ChatUI({
        headerText: 'Michale Suyama',
        headerIconCss: "chat_user2_avatar",
        messages: chatMessages,
        user: currentUserModel,
        showTimeBreak: true,
        loadOnDemand: true,
        messageToolbarSettings: {
            items: [
                { type: 'Button', iconCss: 'e-icons e-chat-copy', tooltip: 'Copy' },
                { type: 'Button', iconCss: 'e-icons e-chat-trash', tooltip: 'Delete' }
            ]
        },
        footerTemplate: footerTemplate,
        created: () => {
            chatRTE = new RichTextEditor({
                toolbarSettings: {
                    position: "Bottom",
                    items: [
                        'Bold', 'Italic', 'Underline', 'InlineCode', '|',
                        'FontColor', 'BackgroundColor', '|',
                        'Alignments', 'Blockquote', '|',
                        'OrderedList', 'UnorderedList', '|',
                        'CreateLink', 'Image', 'CreateTable', 'EmojiPicker'
                    ]
                },
                placeholder: 'Type something...',
                created: () => chatRTE.focusIn()
            });

            chatRTE.appendTo('#editor');
        }
    });

    chatUI.appendTo('#chatContainer');

    document.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target && target.id === 'sendMessage') {
            if (chatRTE?.value && chatRTE.value.length > 0) {
                const value: string = chatRTE.value;
                chatRTE.value = '';
                chatRTE.dataBind();
                chatUI.addMessage({
                    author: currentUserModel,
                    text: value
                });
                chatRTE.clearUndoRedo();
                chatRTE.focusIn();
            }
        } else if (target && target.id === 'cancelMessage') {
            chatRTE.value = '';
            chatRTE.dataBind();
            chatRTE.clearUndoRedo();
            chatRTE.focusIn();
        }
    });
};
