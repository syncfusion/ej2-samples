import { loadCultureFiles } from '../common/culture-loader';
import { InlineAIAssist,InlinePromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { getUserID, AI_SERVICE_URL } from '../common/ai-service';

(window as any).default = (): void => {
    loadCultureFiles();

    let selectedCommandText: string = '';
    let isPopupOpen: boolean = false;
    let isAccepted: boolean = false;
    let originalContentHTML: string = '';
    let savedRange: Range | null = null;
    let spokenTextBuffer: string = '';
    let selectedSpan: HTMLSpanElement | null = null;
    let originalSpanHTML: string = '';
    let abortController: AbortController | undefined;

    const commandSettings: any = {
        commands: [
            {
                id: 'improveContent',
                label: 'Improve Content',
                iconCss: 'e-icons e-edit',
                tooltip: 'Improve the selected content',
                prompt: 'Improve the selected content.'
            },
            {
                id: 'shorten',
                label: 'Shorten',
                iconCss: 'e-icons e-shorten',
                tooltip: 'Shorten the selected text',
                prompt: 'Shorten the selected text.'
            },
            {
                id: 'elaborate',
                label: "Elaborate",
                iconCss: 'e-icons e-elaborate',
                tooltip: 'Expand on the following content with more detail and explanation',
                prompt: 'Expand on the following content with more detail and explanation.',
            },
            {
                id: 'summarize',
                label: 'Summarize',
                iconCss: 'e-icons e-description',
                tooltip: 'Summarize the selected text',
                prompt: 'Summarize the selected text.'
            }
        ],
        popupWidth: '240px',
        popupHeight: 'auto',
    };

    const responseSettings: any = {
        itemSelect: (args: any): void => {
            if (args.command.label === 'Accept') {
                isAccepted = true;
                if (selectedSpan && selectedSpan.parentNode) {
                    const parent: Node = selectedSpan.parentNode;
                    const tempDiv: HTMLDivElement = document.createElement('div');
                    tempDiv.innerHTML = selectedSpan.innerHTML;
                    const fragment: DocumentFragment = document.createDocumentFragment();
                    while (tempDiv.firstChild) {
                        fragment.appendChild(tempDiv.firstChild);
                    }
                    parent.replaceChild(fragment, selectedSpan);
                    selectedSpan = null;
                    originalSpanHTML = '';
                } else if (savedRange) {
                    restoreSelection();
                    if (savedRange) {
                        savedRange.deleteContents();
                        const response: string = (inlinePrompt.prompts[inlinePrompt.prompts.length - 1] as any).response;

                        const tempDiv: HTMLDivElement = document.createElement('div');
                        tempDiv.innerHTML = response;
                        const fragment: DocumentFragment = document.createDocumentFragment();
                        while (tempDiv.firstChild) {
                            fragment.appendChild(tempDiv.firstChild);
                        }

                        savedRange.insertNode(fragment);
                        savedRange = null;
                    }
                }
                inlinePrompt.hidePopup();
                isPopupOpen = false;
            } else if (args.command.label === 'Discard') {
                isAccepted = false;
                if (selectedSpan && selectedSpan.parentNode) {
                    const parent: Node = selectedSpan.parentNode;
                    const tempDiv: HTMLDivElement = document.createElement('div');
                    tempDiv.innerHTML = originalSpanHTML || '';
                    const fragment: DocumentFragment = document.createDocumentFragment();
                    while (tempDiv.firstChild) {
                        fragment.appendChild(tempDiv.firstChild);
                    }
                    parent.replaceChild(fragment, selectedSpan);
                    selectedSpan = null;
                    originalSpanHTML = '';
                } else {
                    savedRange = null;
                    spokenTextBuffer = '';
                }
                inlinePrompt.hidePopup();
                isPopupOpen = false;
            }
        }
    };

    const inlinePrompt: InlineAIAssist = new InlineAIAssist({
        commandSettings,
        responseSettings,
        target: '.meeting-header',
        relateTo: '#targetContent',
        popupWidth: '480px',
        popupHeight: 'auto',
        responseMode: 'Inline',
        placeholder: 'Type prompt for meeting assistance...',
        speechToTextSettings: {
            enable: true
        },

        close: (): void => {
            if (!isAccepted && originalContentHTML) {
                const targetContent: HTMLElement | null = document.getElementById('targetContent');
                if (targetContent) {
                    targetContent.innerHTML = originalContentHTML;
                }
            }
            selectedSpan = null;
            originalSpanHTML = '';
            savedRange = null;
            originalContentHTML = '';
            isAccepted = false;
            isPopupOpen = false;
            window.getSelection()?.removeAllRanges();
        },
        promptRequest: (args: InlinePromptRequestEventArgs): void => {
            const selectedText: string = getSelectedText();
            let contextPrompt: string = args.prompt || '';
            if (selectedText && selectedText.length > 0) {
                contextPrompt += ' ' + selectedText;
            }
            if (!contextPrompt.trim()) {
                inlinePrompt.addResponse(
                    "I'm here to assist with your meeting notes. Try selecting text and choosing a command."
                );
                return;
            }
            if (selectedSpan) {
                inlinePrompt.dataBind();
                getUserID().then((userID: string) => {
                    try {
                        abortController = new AbortController();
                        fetch(AI_SERVICE_URL + '/api/stream', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: userID
                            },
                            body: JSON.stringify({
                                message: contextPrompt
                            }),
                            signal: abortController.signal
                        })
                            .then((response: Response) => {
                                if (!response.ok) {
                                    return response.json().then((errorData: any) => {
                                            throw new Error(errorData.error || ('HTTP Error ' + response.status));
                                        });
                                }
                                const reader = response.body?.getReader();
                                const decoder: TextDecoder = new TextDecoder();
                                let fullText: string = '';
                                if (!reader) {
                                    return Promise.resolve();
                                }
                                const processStream = (): Promise<void> => {
                                    return reader.read().then((result): Promise<void> | void => {
                                        const value = result.value;
                                        const done = result.done;

                                        if (done) {
                                            if (selectedSpan && selectedSpan.parentNode && fullText) {
                                                inlinePrompt.addResponse(fullText,true);
                                            }
                                            return Promise.resolve();
                                        }
                                        if (!selectedSpan || !selectedSpan.parentNode) {
                                            return Promise.resolve();
                                        }
                                        const chunk: string = decoder.decode(value, {stream: true});
                                        fullText += chunk;
                                        const tempDiv = document.createElement('div');
                                        tempDiv.textContent = fullText;
                                        const plainText: string = tempDiv.textContent || fullText;
                                        if (selectedSpan) {
                                            selectedSpan.textContent = plainText;
                                        }
                                        if ((inlinePrompt as any).popupObj) {
                                            (inlinePrompt as any).popupObj.refreshPosition();
                                        }
                                        return processStream();
                                    });
                                };
                                return processStream();
                            })
                            .catch((error: Error) => {
                                if (error.name === 'AbortError') {
                                    return;
                                }
                                setTimeout(() => {
                                    const fallbackResponse = 'We could not reach the AI service; please try again later.';
                                    if (selectedSpan) {
                                        selectedSpan.innerHTML = fallbackResponse;
                                    }
                                    inlinePrompt.addResponse(fallbackResponse);
                                    selectedCommandText = '';
                                }, 1000);
                            });
                    } catch {
                    }
                });
            } else {
                getUserID().then((userID: string) => {
                    try {
                        abortController = new AbortController();
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
                                        { role: 'user', content: contextPrompt }
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
                            .then((result: any): void => {
                                if (result?.response) {
                                    const aiResponse: string = result.response.replace('END_INSERTION','');

                                    inlinePrompt.addResponse(aiResponse,true);
                                }
                            })
                            .catch((error: Error) => {
                                if (error.name === 'AbortError') {
                                    return;
                                }
                                setTimeout(() => {
                                    inlinePrompt.addResponse('We could not reach the AI service; please try again later.');

                                    selectedCommandText = '';
                                }, 1000);
                            });
                    } catch {
                    }
                });
            }
            selectedCommandText = '';
        }
    });

    inlinePrompt.appendTo('#inlinePrompt');
    const targetContent: HTMLElement | null = document.getElementById('targetContent');
    if (targetContent) {
        targetContent.addEventListener('mouseup', () => {
            if (saveSelection()) {
                const selection: Selection | null = window.getSelection();
                const range: Range | null = selection && selection.rangeCount ? selection.getRangeAt(0) : null;
                if (range && !range.collapsed) {
                    originalContentHTML = targetContent.innerHTML;
                    const wrapper: HTMLSpanElement = document.createElement('span');
                    wrapper.className = 'e-inlineaiassist-selected-text';
                    const selectedContent: DocumentFragment = range.extractContents();
                    wrapper.appendChild(selectedContent);
                    range.insertNode(wrapper);
                    selectedSpan = wrapper;
                    originalSpanHTML = wrapper.innerHTML;
                    savedRange = document.createRange();
                    savedRange.selectNodeContents(selectedSpan);
                    inlinePrompt.relateTo = selectedSpan;
                } else if (savedRange) {
                    inlinePrompt.relateTo = savedRange.startContainer.parentElement || '#targetContent';
                }
                inlinePrompt.dataBind();
                inlinePrompt.showPopup();
                isPopupOpen = true;
            }
        })
        targetContent.addEventListener('keyup', () => {
            if (saveSelection() && isPopupOpen && savedRange) {
                inlinePrompt.relateTo = savedRange.startContainer.parentElement || '#targetContent';
                inlinePrompt.dataBind();
            }
        });
    }

    function saveSelection(): boolean {
        const selection: Selection | null = window.getSelection();
        if (
            selection && selection.rangeCount > 0 && !selection.isCollapsed
        ) {
            savedRange = selection.getRangeAt(0).cloneRange();
            return true;
        }
        return false;
    }

    function restoreSelection(): boolean {
        if (!savedRange) {
            return false;
        }
        const selection: Selection | null = window.getSelection();

        if (selection) {
            selection.removeAllRanges();
            selection.addRange(savedRange);
        }
        return true;
    }

    function getSelectedText(): string {
        return savedRange ? savedRange.toString() : '';
    }
};