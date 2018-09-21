import { DocumentEditor, RequestNavigateEventArgs, ViewChangeEventArgs } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import { ToolBar } from './tool-bar';
import { StatusBar } from './status-bar';
import { TextProperties } from './text-properties-pane';
import { TableProperties } from './table-properties-pane';
import { ImageProperties } from './image-properties-pane';
import { DocumentLoader } from './document-loader';
import { HeaderFooterProperties } from './header-footer-pane';
import { TocProperties } from './table-of-contents-pane';
import { PropertiesPane } from './properties-pane';
import { TemplateLoader } from './template-loader';
/**
 * Default document editor sample
 */
//tslint:disable: max-func-body-length
this.default = (): void => {
    //open new tab
    // tslint:disable-next-line:max-line-length
    document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'document-editor/bullets-and-numbering/index.html#fabric');
    let containerPanel: HTMLElement = document.getElementById('documenteditor_container_body');
    updateContainerSize();
    let documenteditor: DocumentEditor = new DocumentEditor({ isReadOnly: false });
    documenteditor.acceptTab = true;
    documenteditor.enableAllModules();
    documenteditor.pageOutline = '#E0E0E0';
    documenteditor.appendTo('#container');
    documenteditor.selectionChange = () => {
        setTimeout(() => { onSelectionChange(); }, 20);
    };
    documenteditor.documentChange = (): void => {
        toolbar.updateUndoRedoBtn();
        toolbar.isContentChange = false;
        applyPageCountAndDocumentTitle();
        fontProperties.updateStyles();
    };
    documenteditor.contentChange = (): void => {
        toolbar.isContentChange = true;
        if (!toolbar.isReadOnly) {
            toolbar.updateUndoRedoBtn();
        }
        //Set page count
        statusBar.updatePageCount();
    };
    window.addEventListener('resize', (): void => { onWindowResize(); });
    //Initializes property pane.
    let tocProperties: TocProperties = new TocProperties(documenteditor);
    let headerFooter: HeaderFooterProperties = new HeaderFooterProperties(documenteditor);
    let fontProperties: TextProperties = new TextProperties(documenteditor, 'textProperty');
    let imageProperties: ImageProperties = new ImageProperties(documenteditor);
    let tableProperties: TableProperties = new TableProperties(documenteditor, imageProperties, fontProperties);
    // tslint:disable-next-line:max-line-length
    let propertiesPane: PropertiesPane = new PropertiesPane(documenteditor, fontProperties, tableProperties, headerFooter, imageProperties, tocProperties);
    //Initializes document editor toolbar and events.
    // tslint:disable-next-line:max-line-length
    let toolbar: ToolBar = new ToolBar(documenteditor, document.getElementById('documenteditor_toolbar'), propertiesPane);
    toolbar.documentLoader = new DocumentLoader(documenteditor);
    toolbar.templateLoader = new TemplateLoader();
    if (!toolbar.isReadOnly) {
        toolbar.updateUndoRedoBtn();
    }
    document.getElementById('documenteditor_titlebar').style.display = '';
    document.getElementById('documenteditor_statusbar').style.display = '';
    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), documenteditor, true);
    let statusBar: StatusBar = new StatusBar(document.getElementById('documenteditor_statusbar'), documenteditor);
    updateContainerSize();
    documenteditor.resize();
    onLoadDefault();
    applyPageCountAndDocumentTitle();
    showPropertiesPaneOnInitial();
    documenteditor.requestNavigate = (args: RequestNavigateEventArgs) => {
        if (args.linkType !== 'Bookmark') {
            let link: string = args.navigationLink;
            if (args.localReference.length > 0) {
                link += '#' + args.localReference;
            }
            window.open(link);
            args.isHandled = true;
        }
    };
    documenteditor.zoomFactorChange = (): void => {
        statusBar.updateZoomContent();
    };
    documenteditor.viewChange = (e: ViewChangeEventArgs): void => {
        statusBar.updatePageNumberOnViewChange(e);
    };
    function onValueChange(args: any): void {
        documenteditor.zoomFactor = parseInt(args.value as any, 10) / 100;
    }
    function applyPageCountAndDocumentTitle(): void {
        //Sets Document name.
        titleBar.updateDocumentTitle();
        statusBar.updatePageCount();
    }
    function updateContainerSize(): void {
        let titleBarDiv: HTMLElement = document.getElementById('documenteditor_titlebar');
        let statusBarDiv: HTMLElement = document.getElementById('documenteditor_statusbar');
        let toolBarDiv: HTMLElement = document.getElementById('documenteditor_toolbar');
        if (containerPanel && titleBarDiv && statusBarDiv && toolBarDiv) {
            containerPanel.style.height = (window.innerHeight - (titleBarDiv.offsetHeight
                + toolBarDiv.offsetHeight + statusBarDiv.offsetHeight)) + 'px';
        }
    }
    function showPropertiesPaneOnInitial(): void {
        toolbar.showPropertiesPaneOnSelection();
    }
    function onSelectionChange(): void {
        if (documenteditor.selection) {
            statusBar.startPage = documenteditor.selection.startPage;
            statusBar.updatePageNumber();
            toolbar.showPropertiesPaneOnSelection();
        }
    }

    function onLoadDefault(): void {
        // tslint:disable
        let defaultDocument: object = { "sections": [{ "blocks": [{ "characterFormat": { "fontColor": "#4472C4FF" }, "paragraphFormat": { "afterSpacing": 36.0, "styleName": "Normal" }, "inlines": [{ "text": "Types of Animals", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }] }, { "characterFormat": { "bold": true }, "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 0, "listId": 0 } }, "inlines": [{ "text": "Mammals", "characterFormat": { "bold": true } }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "body covered by hair or fur" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "warm-blooded" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "have a backbone" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "produce milk" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "Examples" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 2, "listId": 0 } }, "inlines": [{ "text": "Tiger" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 2, "listId": 0 } }, "inlines": [{ "text": "Bat" }] }, { "characterFormat": { "bold": true }, "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 0, "listId": 0 } }, "inlines": [{ "text": "Reptiles", "characterFormat": { "bold": true } }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "body covered by scales" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "cold-blooded" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "have a backbone" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "most lay " }, { "text": "hard-shelled" }, { "text": " eggs on land" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "Examples" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 2, "listId": 0 } }, "inlines": [{ "text": "Snake" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 2, "listId": 0 } }, "inlines": [{ "text": "Lizard" }] }, { "characterFormat": { "bold": true }, "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 0, "listId": 0 } }, "inlines": [{ "text": "Birds", "characterFormat": { "bold": true } }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "body covered by feathers" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "warm-blooded" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "have a backbone" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "lay eggs" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "Examples" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 2, "listId": 0 } }, "inlines": [{ "text": "Pigeon" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 2, "listId": 0 } }, "inlines": [{ "text": "Hen" }] }, { "characterFormat": { "bold": true }, "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 0, "listId": 0 } }, "inlines": [{ "text": "Insects", "characterFormat": { "bold": true } }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "most are small air-breathing animals" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "6 legs" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "2 antennae" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "3 body sections (head, thorax, abdomen)" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "Examples" }, { "name": "_GoBack", "bookmarkType": 0 }, { "name": "_GoBack", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 2, "listId": 0 } }, "inlines": [{ "text": "Butterfly" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 2, "listId": 0 } }, "inlines": [{ "text": "Spider" }] }, { "characterFormat": { "bold": true }, "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 0, "listId": 0 } }, "inlines": [{ "text": "Aquatic Animals", "characterFormat": { "bold": true } }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "most have gills" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "found in lakes, rivers, and oceans" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 1, "listId": 0 } }, "inlines": [{ "text": "Examples" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 2, "listId": 0 } }, "inlines": [{ "text": "Blue Shark" }] }, { "paragraphFormat": { "styleName": "List Paragraph", "listFormat": { "listLevelNumber": 2, "listId": 0 } }, "inlines": [{ "text": "Fish" }] }], "headersFooters": {}, "sectionFormat": { "headerDistance": 36.0, "footerDistance": 36.0, "pageWidth": 612.0, "pageHeight": 792.0, "leftMargin": 72.0, "rightMargin": 72.0, "topMargin": 72.0, "bottomMargin": 72.0, "differentFirstPage": false, "differentOddAndEvenPages": false } }], "characterFormat": { "fontSize": 11.0, "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple" }, "lists": [{ "listId": 0, "abstractListId": 0 }], "abstractLists": [{ "abstractListId": 0, "levels": [{ "startAt": 1, "restartLevel": 0, "listLevelPattern": "Arabic", "followCharacter": "Tab", "numberFormat": "%1.", "characterFormat": { "bold": true, "italic": false }, "paragraphFormat": { "leftIndent": 18.0, "firstLineIndent": -18.0 } }, { "startAt": 1, "restartLevel": 1, "listLevelPattern": "Arabic", "followCharacter": "Tab", "numberFormat": "%1.%2.", "characterFormat": { "bold": false, "italic": true }, "paragraphFormat": { "leftIndent": 39.599998474121094, "firstLineIndent": -21.600000381469727 } }, { "listLevelPattern": "Bullet", "followCharacter": "Tab", "numberFormat": "", "characterFormat": { "fontFamily": "Symbol" }, "paragraphFormat": { "leftIndent": 61.200000762939453, "firstLineIndent": -25.200000762939453 } }, { "startAt": 1, "restartLevel": 3, "listLevelPattern": "Arabic", "followCharacter": "Tab", "numberFormat": "%1.%2.%3.%4.", "paragraphFormat": { "leftIndent": 86.4000015258789, "firstLineIndent": -32.400001525878906 } }, { "startAt": 1, "restartLevel": 4, "listLevelPattern": "Arabic", "followCharacter": "Tab", "numberFormat": "%1.%2.%3.%4.%5.", "paragraphFormat": { "leftIndent": 111.59999847412109, "firstLineIndent": -39.599998474121094 } }, { "startAt": 1, "restartLevel": 5, "listLevelPattern": "Arabic", "followCharacter": "Tab", "numberFormat": "%1.%2.%3.%4.%5.%6.", "paragraphFormat": { "leftIndent": 136.80000305175781, "firstLineIndent": -46.799999237060547 } }, { "startAt": 1, "restartLevel": 6, "listLevelPattern": "Arabic", "followCharacter": "Tab", "numberFormat": "%1.%2.%3.%4.%5.%6.%7.", "paragraphFormat": { "leftIndent": 162.0, "firstLineIndent": -54.0 } }, { "startAt": 1, "restartLevel": 7, "listLevelPattern": "Arabic", "followCharacter": "Tab", "numberFormat": "%1.%2.%3.%4.%5.%6.%7.%8.", "paragraphFormat": { "leftIndent": 187.19999694824219, "firstLineIndent": -61.200000762939453 } }, { "startAt": 1, "restartLevel": 8, "listLevelPattern": "Arabic", "followCharacter": "Tab", "numberFormat": "%1.%2.%3.%4.%5.%6.%7.%8.%9.", "paragraphFormat": { "leftIndent": 216.0, "firstLineIndent": -72.0 } }] }], "background": { "color": "#FFFFFFFF" }, "styles": [{ "type": "Paragraph", "name": "Normal", "next": "Normal" }, { "type": "Character", "name": "Default Paragraph Font" }, { "type": "Paragraph", "name": "Notes", "basedOn": "Normal", "next": "Normal", "characterFormat": { "bold": true }, "paragraphFormat": { "afterSpacing": 6.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Paragraph", "name": "List Paragraph", "basedOn": "Normal", "next": "List Paragraph", "paragraphFormat": { "leftIndent": 36.0 } }] };
        // tslint:enable
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let popupOverlay: HTMLElement = document.getElementById('popup-overlay');
        waitingPopUp.style.display = 'block';
        documenteditor.open(JSON.stringify(defaultDocument));
        documenteditor.documentName = 'Bullets and Numbering';
        waitingPopUp.style.display = 'none';
        popupOverlay.style.display = 'none';
        documenteditor.focusIn();
        fontProperties.updateStyles();
    }
    function onWindowResize(): void {
        updateContainerSize();
    }
};
