import { DocumentEditorContainer, Toolbar, Editor  } from '@syncfusion/ej2-documenteditor';
import { AIAssistView, PromptModel, ToolbarSettingsModel, AssistViewModel,PromptRequestEventArgs,AIAssistViewModel } from '@syncfusion/ej2-interactive-chat';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2/popups';
import { TitleBar } from './title-bar';

let isDocumentChanged: boolean = true;
DocumentEditorContainer.Inject(Toolbar);

let container: DocumentEditorContainer = new DocumentEditorContainer({ enableToolbar: true, height: '100%',width:'100%', serviceUrl: 'https://services.syncfusion.com/js/production/api/documenteditor/' });
container.created = () => {
    let sfdt: string = '{\"sfdt\":\"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\"}';
    container.documentEditor.open(sfdt);
}
container.appendTo('#DocumentEditor');
let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar')!, container.documentEditor, true);
if (container.documentEditor) {
    container.documentEditor.documentName = 'Getting Started';
}
titleBar.updateDocumentTitle();

//spinner

createSpinner({
    target: document.getElementById('container') as HTMLElement,
});

//ai assist

let isChecked: boolean = false;
let responseToolbarSettings = {
    itemClicked: async function (args: any) {
        switch (args.item.iconCss) { 
            case 'e-icons e-copy':
                await copyToClip(aiAssistView.prompts[args.dataIndex].response as string);
                break;
            case 'e-btn-icon e-de-ctnr-new':
                onInsertContent(aiAssistView.prompts[args.dataIndex].response as string);
                break;
        }
    },
    items: [
        { iconCss: 'e-icons e-copy' },
        { iconCss: 'e-btn-icon e-de-ctnr-new' },
    ]
};

async function copyToClip(content: string): Promise<void> {
    const blob = new Blob([content], { type: 'text/html' });
    const clipboardItem = new ClipboardItem({
        'text/html': blob,
    });

    await navigator.clipboard.write([clipboardItem]);
}

let assistViewToolbarSettings: ToolbarSettingsModel = {
    itemClicked: function (args: any) {
        switch (args.item.iconCss) {
            case 'e-icons e-close':
                onCloseAIPane();
                (titleBar as any).onValueChange(false);
                break;
        }
    },
    items: [
        { iconCss: 'e-icons e-close', align: 'Right' },
    ]
};

let aiAssistView = new AIAssistView({
    promptPlaceholder: "Ask a question about this document.",
    height: '100%',
    toolbarSettings: assistViewToolbarSettings,
    bannerTemplate: `<div class="ai-assist-banner">
                            <div class="e-icons e-ai-assist"></div>
                            <h2>Summarization & QnA</h2>
                        </div>`,
    promptRequest: promptRequestToAI,
    responseToolbarSettings: responseToolbarSettings,
    
});
aiAssistView.appendTo('#e-de-ai');

export function onValueChange(checked: boolean) {
    if (checked) {
        onOpenAIPane();
    } else {
        onCloseAIPane();
    }
}

function onOpenAIPane() {
    isChecked = true;
    container.showPropertiesPane = false;
    container.width = '70%';
    let element: HTMLElement = document.getElementById('e-de-ai')!;
    if (element) {
        element.style.display = 'block';
    }
    if (isDocumentChanged) {
        aiAssistView.executePrompt("Summarize the document");
    }
}
function onCloseAIPane() {
    isChecked = false;
    container.showPropertiesPane = true
    container.width = '100%';
    let element: HTMLElement = document.getElementById('e-de-ai')!;
    if (element) {
        element.style.display = 'none';
    }
}
container.documentChange = () => {
    isDocumentChanged = true;
    dispose();
    if (isChecked) {
        aiAssistView.executePrompt("Summarize the document");
    }
};
async function promptRequestToAI(args: PromptRequestEventArgs) {
    showSpinner(document.getElementById('container') as HTMLElement);
    if (args.prompt === 'Summarize the document' && isDocumentChanged) {
        isDocumentChanged = false;
        let documentText: string = '';
        await container.documentEditor.saveAsBlob('Txt')
            .then((exportedDocument: Blob) => exportedDocument.text())
            .then((text: string) => {
                documentText = text;
            });
        await uploadDocument(documentText);
        let response: string = await getDocumentSummary(documentText);
        aiAssistView.addPromptResponse(response);
        let suggestions: string = await getSuggestions();
        let suggestionsArray: string[] = suggestions.split('\n');
        aiAssistView.promptSuggestions = suggestionsArray;
    } else {
        if (args.prompt) {
            let ans: string = await getAnswer(args.prompt);
            aiAssistView.addPromptResponse(ans);
        }
    }
    hideSpinner(document.getElementById('container') as HTMLElement);
}

function dispose() {
    aiAssistView.prompts = [];
    aiAssistView.promptSuggestions = [];
}

//server part

async function uploadDocument(documentText: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        let http = new XMLHttpRequest();
        let url: string = 'http://localhost:62870/api/documenteditor/UpLoadDocument';

        http.open('POST', url, true);
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        let sfdt: any = {
            content: documentText,
        };

        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                if (http.status === 200 || http.status === 304) {
                    resolve();
                } else {
                    reject(`Error: ${http.status} - ${http.statusText}`);
                }
            }
        };

        http.send(JSON.stringify(sfdt));
    });
}

async function getDocumentSummary(documentText: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        let http = new XMLHttpRequest();
        let url: string = 'http://localhost:62870/api/documenteditor/GetDocumentSummary';

        http.open('GET', url, true);
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                if (http.status === 200 || http.status === 304) {
                    resolve(http.responseText);
                } else {
                    reject(`Error: ${http.status} - ${http.statusText}`);
                }
            }
        };
        let sfdt: any = {
            content: documentText,
        };
        http.send(JSON.stringify(sfdt));
    });
}

async function getSuggestions(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        let http = new XMLHttpRequest();
        let url: string = 'http://localhost:62870/api/documenteditor/GetSuggestions';

        http.open('GET', url, true);
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                if (http.status === 200 || http.status === 304) {
                    resolve(http.responseText);
                } else {
                    reject(`Error: ${http.status} - ${http.statusText}`);
                }
            }
        };
        http.send();
    });
}

async function getAnswer(question: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        let http = new XMLHttpRequest();
        let url: string = 'http://localhost:62870/api/documenteditor/GetDocumentSummary';

        http.open('GET', url, true);
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                if (http.status === 200 || http.status === 304) {
                    resolve(http.responseText);
                } else {
                    reject(`Error: ${http.status} - ${http.statusText}`);
                }
            }
        };
        let sfdt: any = {
            content: question,
        };
        http.send(JSON.stringify(sfdt));
    });
}

//convertion

function onInsertContent(response: string): void {
    let http = new XMLHttpRequest();
    let url: string = container.serviceUrl + 'SystemClipboard';
    http.open('POST', url, true);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200 || http.status === 304) {
          container.documentEditor.editor.paste(http.responseText);
          container.documentEditor.editor.onEnter();
        }
      }
    };
    let sfdt: any = {
        content: response,
        type: '.Html',
    };
    http.send(JSON.stringify(sfdt));
  }