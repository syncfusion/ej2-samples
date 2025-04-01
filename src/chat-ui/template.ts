import { loadCultureFiles } from '../common/culture-loader';

import { ChatUI } from '@syncfusion/ej2-interactive-chat';
import { templateMessagedata } from './messageData';

/**
 * Template sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let templateChatUI = new ChatUI({
        headerText: 'Order Assistant',
        headerIconCss: 'chat-bot',
        showTimeBreak: true,
        showFooter: false,
        user: { id: 'admin', user: 'Admin', avatarUrl: './src/chat-ui/images/bot.png' },
        emptyChatTemplate: '#emptyChatTemplate',
        messageTemplate: (context: any) => messageTemplate(context),
        timeBreakTemplate: (context: any) => timeBreakTemplate(context),
        messageSend: () => {
            setTimeout(() => {
                let defaultResponse = "Unfortunately, I don't have information on that. Use any real-time data streaming service to provide chat updates.";
                let message = {
                    author: { id: 'bot', user: 'Bot', avatarUrl: './src/chat-ui/images/bot.png' },
                    text: defaultResponse
                }
                templateChatUI.addMessage(message);
            }, 500);
        },
    });

    templateChatUI.appendTo('#chatTemplate');

    function messageTemplate(context: any): string {
        let isAdmin = context.message.author.id === 'admin';
        let userImage = !isAdmin ? `<img class="message-user" src="${context.message.author.avatarUrl}" alt="${context.message.author.user}">` : '';
        let suggestions = context.message.suggestions && context.message.suggestions.length > 0 && !isAdmin ?
            `<div class="message-suggestions">${context.message.suggestions.map((suggestion: any) => `<button class="suggestion-button e-btn e-primary e-outline">${suggestion}</button>`).join('')}</div>` : '';
        return `<div class="message-wrapper">
                <div class="message-template">
                    ${userImage}
                    <div class="message-items e-card">
                        <div class="message-text">${context.message.text}</div>
                    </div>
                </div>
                <div class="suggestion-container">
                    ${suggestions}
                </div>
            </div>`;
    }

    function timeBreakTemplate(context: any): string {
        let dateText = context.messageDate;
        if (context.messageDate.toDateString() === new Date().toDateString()) {
            dateText = 'Today';
        }
        return `<div class="timebreak-template">${dateText}</div>`;
    }


    function bindClickAction(): void {
        templateChatUI.element.querySelectorAll('.suggestion-button').forEach(suggestion => {
            suggestion.addEventListener('click', () => handleSuggestionClick(suggestion as HTMLElement));
        });
    }

    function handleSuggestionClick(suggestion: HTMLElement): void {
        let message = templateMessagedata.find((message: { text: string; }) => message.text === suggestion.innerText);
        if (message) {
            templateChatUI.addMessage(message.text);
            setTimeout(() => {
                let messageModel = {
                    author: { id: 'bot', user: 'Bot', avatarUrl: './src/chat-ui/images/bot.png' },
                    text: message.reply,
                    suggestions: message.suggestions
                }
                templateChatUI.addMessage(messageModel);
                bindClickAction();
                if (message.suggestions.length === 0) { templateChatUI.showFooter = true; }
            }, 500);
            suggestion.parentElement.innerHTML = '';
        }
    }

    // Initial bot message with suggestions
    setTimeout(() => {
        let message = {
            author: { id: 'bot', user: 'Bot', avatarUrl: './src/chat-ui/images/bot.png' },
            text: templateMessagedata[0].text,
            suggestions: templateMessagedata[0].suggestions
        }
        templateChatUI.addMessage(message);
        bindClickAction();
    }, 1500);
};