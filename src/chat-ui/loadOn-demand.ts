import { loadCultureFiles } from '../common/culture-loader';

import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

(window as any).default = (): void => {
    loadCultureFiles();

    let currentUserModel: UserModel = {
        id: "user1",
        user: "Albert"
    }
    
    let michaleUserModel: UserModel = {
        id: "user2",
        user: "Michale Suyama",
        avatarUrl: './src/chat-ui/images/andrew.png'
    }
    
    let chatMessages = [];
    let baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - 3);
    let dayIncrement = 24 * 60 * 60 * 1000;
    let authorNames = ["Albert", "Michale"];

    for (let i = 1; i <= 200; i++) {
        if (i % 50 === 1 && i !== 1) {
            // Increment the day only every 50 messages except the very first one
            baseDate = new Date(baseDate.getTime() + dayIncrement);
        }
        let authorIndex = i % 2;

        chatMessages.push({
            text: 'Message ' + i + ' from ' + authorNames[authorIndex],
            author: authorIndex === 0 ? currentUserModel : michaleUserModel,
            timeStamp: new Date((baseDate.getTime() - ((200 * 60 * 1000)) + ((60 * 1000) * i)))
        });
    }
    
    // Initialize the Chat UI control
    let chatUI: ChatUI = new ChatUI({
        headerText: 'Michale Suyama',
        headerIconCss: "chat_user2_avatar",
        messages: chatMessages,
        user: currentUserModel,
        showTimeBreak: true,
        loadOnDemand: true
    });
    
    // Render the initialized Chat UI
    chatUI.appendTo('#loadOnDemand');
};