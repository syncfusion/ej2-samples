
import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer } from '@syncfusion/ej2-pdfviewer';
import { Fab } from '@syncfusion/ej2-buttons';
import { AIAssistView, PromptModel, ToolbarSettingsModel, AssistViewModel,PromptRequestEventArgs,AIAssistViewModel } from '@syncfusion/ej2-interactive-chat';
import { Browser } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
    PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer);

    let pdfviewer: PdfViewer = new PdfViewer();
    pdfviewer.serviceUrl = 'SERVICE-URL';
    pdfviewer.documentPath = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
    pdfviewer.documentLoad = documentLoad;
    pdfviewer.zoomMode = "FitToPage";
    pdfviewer.documentUnload = documentUnLoad;
    pdfviewer.appendTo('#PdfViewer');
    let button: Fab = new Fab({ iconCss: 'e-icons e-aiassist-chat' });
    const fabButton = document.getElementById("e-pv-fab-btn");
    const leftContainer = document.getElementById("e-pv-left-container");
    const rightContainer = document.getElementById("e-pv-right-container");
    button.appendTo('#e-pv-fab-btn');
    if (button.element) {
        button.element.onclick = showAI;
    }

    let initialResponse:boolean = false;
    /* Function for the document load event*/
    function documentLoad(args:any) {
        if (fabButton) {
            fabButton.style.display = 'block';
        }
    }

    /* Function for the document unload event*/
    function documentUnLoad(args:any) {
        if(rightContainer){
            rightContainer.style.display = "none";
        }
        if(!Browser.isDevice) {    
            if(leftContainer){
                leftContainer.style.width = "100%";
            }
            pdfviewer.updateViewerContainer();
        }
        if (fabButton) {
            fabButton.style.display = 'block';
        }
        aiAssistViewInst.prompts = [];
        aiAssistViewInst.promptSuggestions = [];
        initialResponse = false;
    }

    /* Function for the show the interchat*/
    function showAI(){
        if (fabButton) {
            fabButton.style.display = 'none';
        }
        if(!Browser.isDevice) {
            if(leftContainer){
                leftContainer.style.width = "70%";
            }        
            pdfviewer.updateViewerContainer();  
        }
        if(rightContainer){
            rightContainer.style.display = "block";
        }
        if(!initialResponse) {
            aiAssistViewInst.executePrompt("Summarize the document");
        }
    }

    let bannerViewTemplate: string = `<div class="ai-assist-banner"><div class="e-icons e-aiassist-chat"></div><h2>AI Assistance</h2><div class="ai-assist-banner-subtitle">Your everyday AI companion</div></div>`;

    /* Interactive chat toolbar settings */
    let assistViewToolbarSettings: ToolbarSettingsModel = {
        itemClicked: function (args: any) {
            if (args.item.iconCss == 'e-icons e-close') {
                if (fabButton) {
                    fabButton.style.display = 'block';
                }
                if(!Browser.isDevice) {
                    if(leftContainer){
                        leftContainer.style.width = "100%";
                    }
                }
                if(rightContainer){
                    rightContainer.style.display = "none";
                }
                if(!Browser.isDevice) {
                    pdfviewer.updateViewerContainer();
                }
            }
            if (args.item.iconCss == 'e-icons e-refresh') {
                let lastPropmt:any = aiAssistViewInst.prompts[aiAssistViewInst.prompts.length - 1].prompt;
                let editedPrompts:any = aiAssistViewInst.prompts;
                editedPrompts.pop();
                aiAssistViewInst.prompts = editedPrompts;
                aiAssistViewInst.onPropertyChanged(aiAssistViewInst); 
                aiAssistViewInst.executePrompt(lastPropmt);
            }
        },
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }, { iconCss: 'e-icons e-close', align: 'Right' }]
    };
    let assistViews: AssistViewModel[] = [{ iconCss: "e-icons e-aiassist-chat" }];

    /*Initialize the interactive chat componenet*/
    let aiAssistViewInst: AIAssistView = new AIAssistView({
        promptPlaceholder: "Type your prompt for assistance...",
        promptSuggestionsHeader: "Suggested Prompts",
        responseIconCss: "e-icons e-aiassist-chat",
        views: assistViews,
        toolbarSettings: assistViewToolbarSettings,
        width: '100%',
        height: '100vh',
        bannerTemplate: bannerViewTemplate,
        promptRequest: promptRequestToAI
    });
    aiAssistViewInst.appendTo('#e-pv-defaultAIAssistView');

    /*Function trigger when the prompt request is made*/
    function promptRequestToAI(args:PromptRequestEventArgs) {
        if(!initialResponse) {
            initialResponse = true;
            callAIAssist();
        }
        else {
            var post:any = args.prompt;
            let url:any = "http://localhost:62869/api/pdfviewer/GetAnswer";
            let xhr:XMLHttpRequest = new XMLHttpRequest();
            xhr.open('Post', url, true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let response = xhr.responseText;
                    try {
                        let summarizeResponse = GetResponse(response);
                        let responseSuggestions = GetSuggestion(response);
                        const _promptSuggestions: string[] = responseSuggestions;                
                        let references = extractReferences(summarizeResponse);
                        let modifiedResponse = summarizeResponse;
                        const referenceToLink: { [key: string]: string } = {};
                        references.forEach((ref, index) => {
                            let pageNumber = ref.replace(/[\[\]]/g, '');
                            let linkTag = `<a href='#' id="page-${pageNumber}" onclick="handlePageLinkClick(${parseInt(pageNumber, 10)})">${pageNumber}</a>`;
                            referenceToLink[ref] = linkTag;
                        });
                        Object.keys(referenceToLink).forEach(ref => {
                            let regex = new RegExp(ref, 'g');
                            modifiedResponse = modifiedResponse.replace(regex, referenceToLink[ref]);
                        });
                        aiAssistViewInst.addPromptResponse(modifiedResponse);
                        aiAssistViewInst.promptSuggestions = _promptSuggestions;
                        aiAssistViewInst.onPropertyChanged(aiAssistViewInst);
                    } catch (e) {
                        console.error('Failed to parse response as JSON:', e);
                    }
                } else {
                    console.error('Request failed with status:', xhr.status, xhr.statusText);
                }
            };       
            xhr.onerror = function() {
                console.error('Network error');
            };
            xhr.send(JSON.stringify({ question: post }));
        }
    }

    function GetResponse(text:any): string {
        let jsonResponse = JSON.parse(text);
        let suggestions = jsonResponse.split('\nsuggestions');
        suggestions = suggestions.filter((suggestion: string) => suggestion.trim() !== '');
        let summarizeResponse = suggestions[suggestions.length - 2].trim();/*Get the response */
        return summarizeResponse;
    }

    function GetSuggestion(text:any): string[] {
        let jsonResponse = JSON.parse(text);
        let suggestions = jsonResponse.split('\nsuggestions');
        suggestions = suggestions.filter((suggestion: string) => suggestion.trim() !== '');
        suggestions.shift();
        let responseSuggestions = suggestions[0].split('\n');/*Get the suggestions */
        responseSuggestions = responseSuggestions.filter((suggestion: string) => suggestion.trim() !== '');
        responseSuggestions = responseSuggestions.map((line: string) => line.replace(/^\d+\.\s*/, ''));
        return responseSuggestions;
    }

    /*Fucntion to separate the page number */
    function extractReferences(text: string): string[] {
        const referenceRegex = /\[(.*?)\]/g;
        const matches: string[] = [];
        let match: RegExpExecArray | null;
        while ((match = referenceRegex.exec(text)) !== null) {
            const numbers = match[1].split(',').map(num => num.trim());
            matches.push(...numbers);
        }
        return matches;
    }

    /*Function fro navigate the page of the viewer*/
    (window as any).handlePageLinkClick = function (pageNumber: number) {
        pdfviewer.navigation.goToPage(pageNumber);
    };

    /*Initial prompt request method*/
    function callAIAssist() {        
        let data:any = pdfviewer.getRootElement();
        var hashId:any = data.ej2_instances[0].viewerBase.hashId;
        var dictionary:any = {
            "hashId": hashId,
        };
        var post:any = JSON.stringify(dictionary);
        let url:any = "http://localhost:62869/api/pdfviewer/SummarizePDF";
        let xhr:XMLHttpRequest = new XMLHttpRequest();
        xhr.open('Post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                let response = xhr.responseText;
                try {
                    let summarizeResponse = GetResponse(response);
                    let responseSuggestions = GetSuggestion(response);
                    const _promptSuggestions: string[] = responseSuggestions;
                    aiAssistViewInst.promptSuggestions = _promptSuggestions;
                    aiAssistViewInst.addPromptResponse(summarizeResponse);
                    aiAssistViewInst.onPropertyChanged(aiAssistViewInst);
                } catch (e) {
                    console.error('Failed to parse response as JSON:', e);
                }
            } else {
                console.error('Request failed with status:', xhr.status, xhr.statusText);
            }
        };   
        xhr.onerror = function() {
            console.error('Network error');
        };
        xhr.send(post);
    }
}