import { loadCultureFiles } from '../common/culture-loader';

import { RichTextEditor, NodeSelection, HtmlEditor, Toolbar, Image, Link, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
import { InlineAIAssist, InlinePromptRequestEventArgs, ToolbarItemClickEventArgs } from '@syncfusion/ej2-interactive-chat';
import { getUserID, AI_SERVICE_URL } from '../common/ai-service';
import { MarkdownConverter } from "@syncfusion/ej2-markdown-converter";

// Inject required modules for RichTextEditor
RichTextEditor.Inject(HtmlEditor, Toolbar, Image, Link, QuickToolbar);

(window as any).default = (): void => {
    loadCultureFiles();

    const rteSelection: NodeSelection = new NodeSelection();
    let saveSelection: any;
    let range: any;
    let selectedText: string = '';
    let selectedSpan: HTMLElement | null = null;
    let abortController: AbortController | undefined;

    const commandSettings: any = {
        popupWidth: '250px',
        commands: [
            {
                label: 'Improve Content',
                prompt: 'Improve the clarity, coherence, and overall quality of the following content:',
                iconCss: 'e-icons e-magic-wand'
            },
            {
                label: 'Shorten',
                prompt: 'Shorten the following content without losing its core message:',
                iconCss: 'e-icons e-shorten'
            },
            {
                label: 'Elaborate',
                prompt: 'Expand on the following content with more detail and explanation:',
                iconCss: 'e-icons e-elaborate'
            },
            {
                label: 'Simplify',
                prompt: 'Simplify the language and make the following content easier to understand:',
                iconCss: 'e-icons e-text-wrap'
            },
            {
                label: 'Summarize',
                prompt: 'Summarize the following content in a concise and clear way:',
                iconCss: 'e-icons e-collapse-2'
            },
            {
                label: 'Check Grammar & Spelling',
                prompt: 'Check the following content for grammar and spelling mistakes, and correct them:',
                iconCss: 'e-icons e-grammar-check'
            }
        ]
    };

    const rteEditor: RichTextEditor = new RichTextEditor({
        quickToolbarSettings: {
            text: [{ prefixIcon: 'e-icons e-ai-chat', tooltipText: 'AI Assistant' } as any, 'Bold', 'Italic', 'Underline', 'StrikeThrough', 'Fontcolor', 'BackgroundColor', '|', 'Unorderedlist', 'Orderedlist']
        },
        toolbarClick: (args: any): void => {
            if (args.item.prefixIcon === 'e-icons e-ai-chat') {
                range = rteSelection.getRange(document);
                var relateToEl = range.endContainer.parentElement;
                selectedText = rteEditor.getSelection();

                if (selectedText && selectedText.length > 0) {
                    const wrapper: HTMLSpanElement = document.createElement('span');
                    wrapper.className = 'e-inlineaiassist-selected-text';
                    const selectedContent: DocumentFragment = range.extractContents();
                    wrapper.appendChild(selectedContent);
                    range.insertNode(wrapper);
                    selectedSpan = wrapper;
                    inlineAssist.relateTo = relateToEl ? range.endContainer : wrapper;
                    inlineAssist.dataBind();
                    inlineAssist.showPopup();
                }
            }
        }
    });
    rteEditor.appendTo('#rte-editor');

    const inlineAssist: InlineAIAssist = new InlineAIAssist({
        commandSettings: commandSettings,
        responseMode: 'Inline',
        promptRequest: onRtePromptRequest,
        close: function() {
            if (abortController) {
                abortController.abort();
            }
            if (selectedSpan) {
                rteEditor.formatter.saveData();
                rteEditor.executeCommand('undo');
                rteEditor.clearUndoRedo();
                window.getSelection().removeAllRanges();
                selectedSpan = null;
            }
        },
        inlineToolbarSettings: {
            itemClick: (args: ToolbarItemClickEventArgs): void => {
                if (args.item.iconCss === 'e-icons e-inline-stop') {
                    if (abortController) {
                        abortController.abort();
                    }
                }
            }
        },
        responseSettings: {
            itemSelect: (args: any): void => {
                if (args.command.label === 'Accept') {

                    if (selectedSpan && selectedSpan.parentNode) {
                        const parent: Node = selectedSpan.parentNode;
                        var textContent = selectedSpan.textContent || selectedSpan.innerText;
                        var textNode = document.createTextNode(textContent);
                        parent.replaceChild(textNode, selectedSpan);
                        selectedSpan = null;

                        (rteEditor.formatter as any).saveData();
                        (rteEditor.formatter as any).enableUndo(rteEditor);
                    }

                    inlineAssist.hidePopup();
                } else if (args.command.label === 'Discard') {
                    rteEditor.formatter.saveData();
                    selectedSpan = null;
                    rteEditor.executeCommand('undo');
                    rteEditor.clearUndoRedo();
                    window.getSelection().removeAllRanges();
                    inlineAssist.hidePopup();
                }
            }
        }
    });

    inlineAssist.appendTo('#inline-ai-assist');

    /**
     * Handles the AI prompt request for Rich Text Editor
     * Sends the user's selected text to the AI service and streams the response
     */
    function onRtePromptRequest(args: InlinePromptRequestEventArgs): void {
        if ((rteEditor.formatter as any).getUndoRedoStack().length === 0) {
            (rteEditor.formatter as any).saveData();
        }

        let contextPrompt: string = args.prompt;
        if (selectedText && selectedText.length > 0) {
            contextPrompt = contextPrompt + ' ' + selectedText;
        }

        if (selectedSpan) {
            inlineAssist.dataBind();
            getUserID().then((userID: string) => {
                try {
                    abortController = new AbortController();

                    fetch(AI_SERVICE_URL + '/api/stream', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': userID
                        },
                        body: JSON.stringify({ message: contextPrompt }),
                        signal: abortController.signal
                    })
                        .then((response: Response) => {
                            if (!response.ok) {
                                return response.json().then((errorData: any) => {
                                    throw new Error(errorData.error || ('HTTP Error ' + response.status));
                                });
                            }

                            const reader: ReadableStreamDefaultReader<Uint8Array> = response.body!.getReader();
                            const decoder: TextDecoder = new TextDecoder();
                            let fullText: string = '';

                            function processStream(): Promise<void> {
                                return reader.read().then((result: any) => {
                                    const value: Uint8Array | undefined = result.value;
                                    const done: boolean = result.done;

                                    if (done) {
                                        if (selectedSpan && selectedSpan.parentNode) {
                                            inlineAssist.addResponse(fullText, true);
                                            const newRange: Range = document.createRange();
                                            newRange.selectNodeContents(selectedSpan);
                                            rteEditor.selectRange(newRange);
                                            range = rteSelection.getRange(document);
                                        }
                                        return Promise.resolve();
                                    }

                                    if (!selectedSpan || !selectedSpan.parentNode) {
                                        return Promise.resolve();
                                    }

                                    const chunk: string = decoder.decode(value, { stream: true });
                                    fullText += chunk;
                                    inlineAssist.addResponse(fullText, false);
                                    var tempDiv = document.createElement('div');
                                    tempDiv.innerHTML = (MarkdownConverter as any).toHtml(fullText);
                                    var plainText = tempDiv.textContent || tempDiv.innerText || fullText;
                                    if (selectedSpan) {
                                        selectedSpan.innerHTML = plainText;
                                    }
                                    if ((inlineAssist as any).popupObj) {
                                        (inlineAssist as any).popupObj.refreshPosition();
                                    }
                                    return processStream();
                                });
                            }

                            return processStream();
                        })
                        .catch((error: Error) => {
                            if (error.name === 'AbortError') {
                                return;
                            }

                            setTimeout(() => {
                                if (selectedSpan && selectedSpan.parentNode) {
                                    const fallbackResponse: string = 'We could not reach the AI service; please try again later.';
                                    selectedSpan.innerHTML = fallbackResponse;
                                    inlineAssist.addResponse(fallbackResponse);
                                    const newRange: Range = document.createRange();
                                    newRange.selectNodeContents(selectedSpan);
                                    rteEditor.selectRange(newRange);
                                    range = rteSelection.getRange(document);
                                }
                            }, 1000);
                        });
                } catch (error) {}
            });
        }
    }
};
