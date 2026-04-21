import { loadCultureFiles } from '../common/culture-loader';

import { InlineAIAssist, InlinePromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { Button } from '@syncfusion/ej2-buttons';
import { getUserID, AI_SERVICE_URL } from '../common/ai-service';

(window as any).default = (): void => {
    loadCultureFiles();

    let selectedCommandText: string = '';
    let currentHoveredParagraph: HTMLElement | null = null;
    let isGlobalRequest: boolean = false;
    let isPopupOpen: boolean = false;
    let abortController: AbortController | undefined;

    const initialEmailContent: string = "<p>\nDear Team,\n</p>\n<p>\nI hope this email finds you well. I wanted to provide you with an update on our current project status. We successfully completed Phase 1 last week, and I'm pleased to share that all deliverables were met according to schedule. The client presentation went well and they expressed satisfaction with our progress.\n</p>\n<p>\nAs we move forward into Phase 2, I would appreciate it if everyone could submit their progress reports by Friday. Additionally, we should schedule a team meeting next week to discuss the upcoming timeline and address any questions or concerns you may have.\n</p>\n<p>\nThank you for your continued dedication and hard work on this project.\n</p>\n<p>\nBest regards,<br>\nProject Management Team\n</p>";

    const commandSettings: any = {
        commands: [
            {
                id: 'summarize',
                label: 'Summarize',
                tooltip: 'Create a brief summary',
                prompt: 'Summarize the main points',
                iconCss: 'e-icons e-collapse-2'
            },
            {
                id: 'fix-grammar',
                label: 'Fix Grammar',
                tooltip: 'Correct grammar and spelling',
                prompt: 'Fix grammar, spelling, and punctuation errors',
                iconCss: 'e-icons e-grammar-check'
            },
            {
                id: 'make-professional',
                label: 'Make Professional',
                tooltip: 'Transform to formal business tone',
                prompt: 'Rewrite this in a professional, formal business tone',
                iconCss: 'e-icons e-annotation-edit'
            },
            {
                id: 'make-friendly',
                label: 'Make Friendly',
                tooltip: 'Make the tone more casual and friendly',
                prompt: 'Rewrite this in a friendly, casual tone',
                iconCss: 'e-icons e-ai-chat'
            }
        ],
        itemSelect: (args: any): void => {
            selectedCommandText = args.command.label || '';
        }
    };

    const inlineAssist: InlineAIAssist = new InlineAIAssist({
        commandSettings: commandSettings,
        relateTo: '#emailContent',
        promptRequest: (args: InlinePromptRequestEventArgs): void => {
            getUserID().then((userID: string) => {
                try {
                    abortController = new AbortController();
                    let contentToProcess: string = '';

                    if (isGlobalRequest) {
                        const emailContentElem: HTMLElement | null = document.getElementById('emailContent');
                        contentToProcess = emailContentElem ? emailContentElem.innerText : '';
                    } else if (currentHoveredParagraph) {
                        contentToProcess = currentHoveredParagraph.innerText;
                    }

                    fetch(AI_SERVICE_URL + '/api/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            visitorId: userID,
                            messages: {
                                messages: [
                                    { role: 'system', content: 'You are a helpful assistant.' },
                                    { role: 'user', content: args.prompt + (contentToProcess) }
                                ]
                            }
                        }),
                        signal: abortController.signal
                    })
                        .then((response: Response) => {
                            if (!response.ok) {
                                return response.json().then((errorData: any) => {
                                    throw new Error(errorData.error || ('HTTP Error ' + response.status));
                                });
                            }
                            return response.json();
                        })
                        .then((result: any) => {
                            if (result && result.response) {
                                const aiResponse: string = result.response.replace('END_INSERTION', '');
                                inlineAssist.addResponse(aiResponse);
                            }
                        })
                        .catch((error: Error) => {
                            if (error.name === 'AbortError') {
                                return;
                            }
                            setTimeout(() => {
                                const fallbackResponse: string = 'We could not reach the AI service; please try again later.';
                                inlineAssist.addResponse(fallbackResponse);
                                selectedCommandText = '';
                            }, 1000);
                        });
                } catch (error) {}
            });
        },
        responseSettings: {
            itemSelect: (args: any): void => {
                if (args.command.label === 'Accept') {
                    if (isGlobalRequest) {
                        const emailContent: HTMLElement | null = document.getElementById('emailContent');
                        if (emailContent) {
                            emailContent.innerHTML = (inlineAssist.prompts[inlineAssist.prompts.length - 1] as any).response;
                            Array.from(emailContent.children).forEach((child: Element) => attachHoverEvent(child as HTMLElement));
                        }
                    } else {
                        if (currentHoveredParagraph) {
                            currentHoveredParagraph.innerHTML = (inlineAssist.prompts[inlineAssist.prompts.length - 1] as any).response;
                        }
                    }
                    inlineAssist.hidePopup();
                } else if (args.command.label === 'Discard') {
                    inlineAssist.hidePopup();
                }
            }
        },
        open: (): void => {
            isPopupOpen = true;
        },
        close: (): void => {
            isPopupOpen = false;
            selectedCommandText = '';
            isGlobalRequest = false;
        }
    });

    inlineAssist.appendTo('#inlineAssist');

    // Create AI Assistant button
    let button: Button = new Button({
        iconCss: 'e-icons e-ai-chat',
        isPrimary: true
    });
    button.appendTo('#aiAssistantBtn');

    // Create Sparkle button
    button = new Button({
        iconCss: 'e-icons e-ai-chat',
        isPrimary: true
    });
    button.appendTo('#sparkleBtn');

    const sparkleButton: HTMLElement | null = document.querySelector('#sparkleBtn');
    const emailContent: HTMLElement | null = document.getElementById('emailContent');

    // Helper function to attach hover events to all direct children
    const attachHoverEvent = (child: Element): void => {
        (child as HTMLElement).addEventListener('mouseenter', () => {
            if (!isPopupOpen && (child as HTMLElement).parentElement?.classList.contains('email-body')) {
                currentHoveredParagraph = child as HTMLElement;
                const emailRect: DOMRect = (child as HTMLElement).parentElement!.parentElement!.getBoundingClientRect();
                const rect: DOMRect = (child as HTMLElement).getBoundingClientRect();
                const buttonHeight: number = 30;
                const topPosition: number = (rect.top - emailRect.top) + (rect.height / 2) - (buttonHeight / 2);

                if (sparkleButton) {
                    sparkleButton.style.position = 'absolute';
                    sparkleButton.style.left = '20px';
                    sparkleButton.style.top = topPosition + 'px';
                    sparkleButton.style.display = 'block';
                }
            }
        });
    };

    if (sparkleButton) {
        sparkleButton.addEventListener('mouseenter', () => {
            sparkleButton.style.display = 'block';
        });

        sparkleButton.addEventListener('mouseleave', () => {
            sparkleButton.style.display = 'none';
        });

        sparkleButton.addEventListener('click', () => {
            if (currentHoveredParagraph) {
                isGlobalRequest = false;
                inlineAssist.relateTo = currentHoveredParagraph;
                inlineAssist.dataBind();
                inlineAssist.showPopup();
            }
        });
    }

    const aiAssistantBtn: HTMLElement | null = document.getElementById('aiAssistantBtn');
    if (aiAssistantBtn) {
        aiAssistantBtn.addEventListener('click', () => {
            isGlobalRequest = true;
            inlineAssist.relateTo = aiAssistantBtn;
            inlineAssist.dataBind();
            inlineAssist.showPopup();
        });
    }

    const sendEmailBtn: HTMLElement | null = document.getElementById('sendEmailBtn');
    if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', () => {
            const emailContentElem: HTMLElement | null = document.getElementById('emailContent');
            if (emailContentElem) {
                emailContentElem.innerHTML = initialEmailContent;
                Array.from(emailContentElem.children).forEach((child: Element) => attachHoverEvent(child as HTMLElement));
                if (sparkleButton) {
                    sparkleButton.style.display = 'none';
                }
            }
        });
    }

    if (emailContent) {
        Array.from(emailContent.children).forEach((child: Element) => attachHoverEvent(child as HTMLElement));

        emailContent.addEventListener('input', () => {
            if (sparkleButton) {
                sparkleButton.style.display = 'none';
            }
        });

        emailContent.addEventListener('mouseleave', (e: MouseEvent) => {
            if (sparkleButton && e.relatedTarget !== sparkleButton && !sparkleButton.matches(':hover')) {
                sparkleButton.style.display = 'none';
            }
        });

        new MutationObserver((mutations: MutationRecord[]) => {
            mutations.forEach((mutation: MutationRecord) => {
                mutation.addedNodes.forEach((node: Node) => {
                    if (node.nodeType === 1 && node.parentElement === emailContent) {
                        attachHoverEvent(node as HTMLElement);
                    }
                });
            });
        }).observe(emailContent, { childList: true });
    }

    if (sparkleButton) {
        sparkleButton.addEventListener('mouseenter', () => {
            sparkleButton.style.display = 'block';
        });

        sparkleButton.addEventListener('mouseleave', () => {
            sparkleButton.style.display = 'none';
        });
    }
};
