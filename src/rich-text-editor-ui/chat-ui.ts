import { loadCultureFiles } from '../common/culture-loader';
import { ChatUI, MessageModel, UserModel } from '@syncfusion/ej2-interactive-chat';
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

(window as any).default = (): void => {
    loadCultureFiles();
    const currentUserModel: UserModel = {id: 'user1', user: 'Albert'};
    const michaleUserModel: UserModel = { id: 'user2', user: 'Michale Suyama', avatarUrl: './src/rich-text-editor-ui/images/2.png' };
    const chatMessages: MessageModel[] = [
        { id: 'chat-message-1', author: currentUserModel, text: 'Hi Michale, are we on track for the deadline?' },
        { id: 'chat-message-2', author: michaleUserModel, text: 'Yes, the design phase is complete.' },
        { id: 'chat-message-3', author: currentUserModel, text: 'I will review it and send feedback by today.' },
        { id: 'chat-message-4', author: michaleUserModel, text: 'Okay.' }
    ];

    let chatUI: ChatUI;
    let chatRTE: RichTextEditorUI;
    let messageCount: number = chatMessages.length;
    let selectedReplyMessage: MessageModel | null = null;

    const footerTemplate = (): string => `
        <div class="custom-footer">
            <div id="editor"></div>
        </div>
    `;

    function onCreate(): void {
        const sendBtn: HTMLElement =
            chatRTE.element.querySelector('#editor_toolbar_send_tbar') as HTMLElement;
        if (!sendBtn) {
            return;
        }

        sendBtn.classList.remove('e-tbar-btn'); 
        sendBtn.classList.add('e-primary');

        sendBtn.onclick = (): void => {
            const html: string = chatRTE.getHtml();
            const plainText: string =
                html.replace(/<[^>]*>/g, '').trim();
            if (!plainText) {
                return;
            }
            const message: any = { id: `chat-message-${++messageCount}`, author: currentUserModel, text: html };
            if (selectedReplyMessage) {
                message.replyTo = {
                    user: selectedReplyMessage.author,
                    text: selectedReplyMessage.text,
                    messageID: selectedReplyMessage.id
                };
            }
            chatUI.addMessage(message);
            const replyPreview: HTMLElement | null =
            chatUI.element.querySelector('.e-footer .e-reply-wrapper');
            if (replyPreview) {
                replyPreview.remove();
            }
            selectedReplyMessage = null;
            chatRTE.value = '';
            chatRTE.dataBind();
            chatRTE.focusIn();
        };
    }
    chatUI = new ChatUI({
        headerText: 'Michale Suyama',
        headerIconCss: 'chat_user2_avatar',
        messages: chatMessages,
        user: currentUserModel,
        showTimeBreak: true,
        loadOnDemand: true,
        footerTemplate,
        messageToolbarSettings: {
            itemClicked: (args: any): void => {
                const item: any =
                    args.item.properties || args.item;
                if (item.tooltipText === 'Reply') {
                    selectedReplyMessage =
                        (args.message.properties || args.message) as MessageModel;
                }
            }
        },
        created: (): void => {
            chatRTE = new RichTextEditorUI({
                placeholder: 'Type a message...',
                valueFormat: 'html',
                slashCommandSettings: {
                    enable: true
                },
                toolbarSettings: {
                    position: 'Bottom',
                    items: [ 'Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'BulletFormatList', 'NumberFormatList', '|', 'Formats', 'FontColor', 'FontSize', 'BackgroundColor', '|', 'Quote', 'Link', 'CodeBlock', 'Image', '|',
                        {
                            align:'Right',
                            id: 'send_tbar',
                            tooltipText: 'Send Message',
                            actionId: 'sendMessage',
                            prefixIcon: 'e-icons e-send' 
                        }
                    ]
                },
                created: onCreate
            });
            chatRTE.appendTo('#editor');
        }
    });

    chatUI.appendTo('#chatContainer');
};