import { loadCultureFiles } from '../common/culture-loader';

import { ChatUI, MessageSendEventArgs } from '@syncfusion/ej2-interactive-chat';
import { Splitter } from '@syncfusion/ej2-layouts';
import { ListView } from '@syncfusion/ej2-lists';
import { Button } from '@syncfusion/ej2-buttons';
import { integrationMessagedata, botMessagedata, lauraMessagedata, suyamaMessagedata, teamsMessagedate, walterMessagedata, integrationListTemplateData, botData, chatSuggestions } from './messageData';

/**
 * Chat-Integration sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let chatMessages: { [key: string]: any[] } = {
        user1: integrationMessagedata,
        admin: botMessagedata,
        user2: walterMessagedata,
        user3: lauraMessagedata,
        team: teamsMessagedate,
        user4: suyamaMessagedata
    }

    let chatUiInst = new ChatUI({
        headerText: 'Albert',
        headerIconCss: 'chat_user1_avatar',
        messages: chatMessages.user1,
        user: { id: 'user1', user: 'Albert', avatarUrl: './src/chat-ui/images/andrew.png' },
        headerToolbar: {
            items: [
                {
                    iconCss: 'sf-icon-phone-call',
                    align: 'Right',
                    tooltip: 'Audio call'
                }
            ]
        },
        messageSend: (args: MessageSendEventArgs) => {
            chatUiInst.suggestions = [];
            setTimeout(() => {
              if(args.message.author.id === 'admin') {
                let foundMessage = botData.find((message: { text: string; }) => message.text === args.message.text);
                let defaultResponse = 'Use any real-time data streaming service to provide chat updates.';
                let message = {
                    author: { id: 'bot', user: 'Bot', avatarUrl: './src/chat-ui/images/bot.png' },
                    text: foundMessage?.reply || defaultResponse,
                }
                chatUiInst.addMessage(message);
                chatUiInst.suggestions = foundMessage?.suggestions || []
              }
            }, 500);
        }
    });
    chatUiInst.appendTo('#integration-chat');

    new Splitter({
        paneSettings: [{ size: 'auto', resizable: false, cssClass:"chat-leftContent" }, { size: '80%', resizable: false, cssClass: "chat-rightContent" }],
    }, '#splitter');

    let template: string = '<div ${if(category!==null)} class="clearfix desc e-list-wrapper e-list-multi-line e-list-avatar" ${else}' +
        'class="clearfix e-list-wrapper e-list-multi-line e-list-avatar" ${/if}> ${if(imgSrc!=="")}' +
        '<img class="e-avatar" src="./src/chat-ui/images/${imgSrc}.png" alt="image" style="border-radius: 50%;"/> ' +
        '${/if} <span class="e-list-item-header">${title} </span>' +
        '${if(message!=="")} <div class="chat_message" style="font-size: 12px;">' +
        '${message} </div> ${/if} </div>';

    let templateObj = new ListView({
        dataSource: integrationListTemplateData,
        template: template,
        headerTitle: 'Chats',
        cssClass: 'e-list-template',
        showHeader: true,
        actionComplete: () => {
            templateObj.selectItem(integrationListTemplateData[0]);
        },
        select: (args: { index: number }) => {
            chatMessages[chatUiInst.user.id] = chatUiInst.messages;
            chatUiInst.suggestions = [];
            setupChatUser(args.index);
            if(args.index >=0 ) toggleListView();
        },
    });
    templateObj.appendTo('#listview_template');

    function setupChatUser(index: number): void {
        let userSettings = [
            { headerText: 'Albert', headerIconCss: 'chat_user1_avatar', user: { id: 'user1', user: 'Albert', avatarUrl: './src/chat-ui/images/andrew.png' }, messages: chatMessages.user1 },
            { headerText: 'Decor bot', headerIconCss: 'chat_bot_avatar', user: { id: 'admin', user: 'Admin', avatarUrl: './src/chat-ui/images/bot.png' }, messages: chatMessages.admin, suggestions: chatSuggestions },
            { headerText: 'Charlie', headerIconCss: 'chat_user2_avatar', user: { id: 'user2', user: 'Charlie', avatarUrl: './src/chat-ui/images/charlie.png' }, messages: chatMessages.user2 },
            { headerText: 'Laura Callahan', headerIconCss: 'chat_user3_avatar', user: { id: 'user3', user: 'Laura', avatarUrl: './src/chat-ui/images/laura.png' }, messages: chatMessages.user3 },
            { headerText: 'New Dev Team', headerIconCss: 'chat_team_avatar', user: { id: 'team', user: 'Admin', avatarUrl: './src/chat-ui/images/calendar.png' }, messages: chatMessages.team },
            { headerText: 'Reena', headerIconCss: 'chat_user4_avatar', user: { id: 'user4', user: 'Albert' }, messages: chatMessages.user4 },
        ];

        Object.assign(chatUiInst, userSettings[index]);
        chatUiInst.dataBind();
    }

    function createButton(iconCss: string, elementId: string): void {
        new Button({ iconCss, cssClass: 'e-flat', iconPosition: 'Top' }).appendTo(elementId);
    }

    createButton('e-icons e-stamp', '#activitybtn');
    createButton('e-icons e-comment-show', '#chatbtn');
    createButton('e-icons e-month', '#calendarbtn');
    createButton('e-icons e-people', '#teamsbtn');

    function toggleListView(): void {
        const listPopup = document.getElementById('toggle-chat-list') as HTMLElement;
        if (innerWidth < 1200) {
            listPopup.style.display = listPopup.style.display === 'none' || listPopup.style.display === '' ? 'block' : 'none';
        }
    }
    
    // Attach event listeners to buttons or other UI elements to trigger toggling
    const chatButton = document.getElementById('chatbtn') as HTMLElement;
    chatButton.addEventListener('click', toggleListView);
};