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
    document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'document-editor/links-and-bookmarks/index.html#fabric');
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
        let defaultDocument: object = { "sections": [{ "blocks": [{ "characterFormat": { "fontColor": "#4472C4FF" }, "paragraphFormat": { "afterSpacing": 36.0, "styleName": "Normal" }, "inlines": [{ "name": "top", "bookmarkType": 0 }, { "text": "Hyperlinks and bookmarks", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }, { "name": "top", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Heading 1" }, "inlines": [{ "text": "Heading 1" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit " }, { "text": "amet" }, { "text": ", " }, { "text": "consectetur" }, { "text": " " }, { "text": "adipiscing" }, { "text": " " }, { "text": "elit" }, { "text": ", " }, { "text": "sed" }, { "text": " do " }, { "text": "eiusmod" }, { "text": " " }, { "text": "tempor" }, { "text": " " }, { "text": "incididunt" }, { "text": " " }, { "text": "ut" }, { "text": " " }, { "text": "labore" }, { "text": " et dolore magna " }, { "text": "aliqua" }, { "text": ". Ut " }, { "text": "enim" }, { "text": " ad minim " }, { "text": "veniam" }, { "text": ", " }, { "text": "quis" }, { "text": " " }, { "text": "nostrud" }, { "text": " exercitation " }, { "text": "ullamco" }, { "text": " " }, { "text": "laboris" }, { "text": " nisi " }, { "text": "ut" }, { "text": " " }, { "text": "aliquip" }, { "text": " ex " }, { "text": "ea" }, { "text": " " }, { "text": "commodo" }, { "text": " " }, { "text": "consequat" }, { "text": "." }] }, { "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 18.0, "styleName": "Normal" }, "inlines": [{ "text": "For more information, kindly visit" }, { "text": " " }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \"https://www.syncfusion.com/\" " }, { "fieldType": 2 }, { "text": "our website", "characterFormat": { "styleName": "Hyperlink" } }, { "fieldType": 1 }, { "text": " [Link to external URL]." }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Heading 2" }, "inlines": [{ "text": "Heading 2" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit " }, { "text": "amet" }, { "text": ", " }, { "text": "consectetur" }, { "text": " " }, { "text": "adipiscing" }, { "text": " " }, { "text": "elit" }, { "text": ", " }, { "text": "sed" }, { "text": " do " }, { "text": "eiusmod" }, { "text": " " }, { "text": "tempor" }, { "text": " " }, { "text": "incididunt" }, { "text": " " }, { "text": "ut" }, { "text": " " }, { "text": "labore" }, { "text": " et dolore magna " }, { "text": "aliqua" }, { "text": ". Ut " }, { "text": "enim" }, { "text": " ad minim " }, { "text": "veniam" }, { "text": ", " }, { "text": "quis" }, { "text": " " }, { "text": "nostrud" }, { "text": " exercitation " }, { "text": "ullamco" }, { "text": " " }, { "text": "laboris" }, { "text": " nisi " }, { "text": "ut" }, { "text": " " }, { "text": "aliquip" }, { "text": " ex " }, { "text": "ea" }, { "text": " " }, { "text": "commodo" }, { "text": " " }, { "text": "consequat" }, { "text": "." }] }, { "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 18.0, "styleName": "Normal" }, "inlines": [{ "text": "You can reach us through " }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \"mailto:info@syncfusion.com\" " }, { "fieldType": 2 }, { "text": "our mail", "characterFormat": { "styleName": "Hyperlink" } }, { "fieldType": 1 }, { "text": " [Link to mail]." }] }, { "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 18.0, "styleName": "Normal" }, "inlines": [{ "name": "_GoBack", "bookmarkType": 0 }, { "name": "_GoBack", "bookmarkType": 1 }] }, { "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 18.0, "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 18.0, "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 18.0, "styleName": "Normal" }, "inlines": [{ "text": "To the top, click " }, { "hasFieldEnd": true, "fieldType": 0 }, { "text": "HYPERLINK \\l \"top\"" }, { "fieldType": 2 }, { "text": "here", "characterFormat": { "styleName": "Hyperlink" } }, { "fieldType": 1 }, { "text": " [Link to bookmark]." }] }], "headersFooters": {}, "sectionFormat": { "headerDistance": 36.0, "footerDistance": 36.0, "pageWidth": 612.0, "pageHeight": 792.0, "leftMargin": 72.0, "rightMargin": 72.0, "topMargin": 72.0, "bottomMargin": 72.0, "differentFirstPage": false, "differentOddAndEvenPages": false } }], "characterFormat": { "fontSize": 11.0, "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple" }, "background": { "color": "#FFFFFFFF" }, "styles": [{ "type": "Paragraph", "name": "Normal", "next": "Normal", "paragraphFormat": { "afterSpacing": 0.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Paragraph", "name": "Heading 1", "basedOn": "Normal", "next": "Normal", "link": "Heading 1 Char", "characterFormat": { "fontSize": 16.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 12.0, "outlineLevel": "Level1" } }, { "type": "Paragraph", "name": "Heading 2", "basedOn": "Normal", "next": "Normal", "link": "Heading 2 Char", "characterFormat": { "fontSize": 13.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "outlineLevel": "Level2" } }, { "type": "Character", "name": "Default Paragraph Font" }, { "type": "Paragraph", "name": "Notes", "basedOn": "Normal", "next": "Normal", "characterFormat": { "bold": true }, "paragraphFormat": { "afterSpacing": 6.0 } }, { "type": "Character", "name": "Hyperlink", "basedOn": "Default Paragraph Font", "characterFormat": { "underline": "Single", "fontColor": "#0563C1FF" } }, { "type": "Character", "name": "Unresolved Mention", "basedOn": "Default Paragraph Font", "characterFormat": { "fontColor": "#808080FF" } }, { "type": "Character", "name": "Heading 1 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 16.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Character", "name": "Heading 2 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 13.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Character", "name": "FollowedHyperlink", "basedOn": "Default Paragraph Font", "characterFormat": { "underline": "Single", "fontColor": "#954F72FF" } }] };
        // tslint:enable
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let popupOverlay: HTMLElement = document.getElementById('popup-overlay');
        waitingPopUp.style.display = 'block';
        documenteditor.open(JSON.stringify(defaultDocument));
        documenteditor.documentName = 'Hyperlinks and Bookmarks';
        waitingPopUp.style.display = 'none';
        popupOverlay.style.display = 'none';
        documenteditor.focusIn();
        fontProperties.updateStyles();
    }
    function onWindowResize(): void {
        updateContainerSize();
    }
};
