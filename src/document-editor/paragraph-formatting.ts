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
    document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'document-editor/paragraph-formatting/index.html#fabric');
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
        let defaultDocument: object = { "sections": [{ "blocks": [{ "characterFormat": { "fontColor": "#4472C4FF" }, "paragraphFormat": { "afterSpacing": 36.0, "styleName": "Normal" }, "inlines": [{ "text": "List of text alignment options", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Left-aligned", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 18.0, "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ", "characterFormat": { "fontFamily": "Calibri" } }, { "text": "consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "beforeSpacing": 18.0, "textAlignment": "Center", "styleName": "Normal" }, "inlines": [{ "text": "Centered", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 18.0, "textAlignment": "Center", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "beforeSpacing": 18.0, "textAlignment": "Right", "styleName": "Normal" }, "inlines": [{ "text": "Right-", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": "aligned", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 18.0, "textAlignment": "Right", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a", "characterFormat": { "fontFamily": "Calibri" } }, { "text": "liquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "beforeSpacing": 18.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Justified", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 18.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", "characterFormat": { "fontFamily": "Calibri" } }, { "text": ".", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple", "styleName": "Normal" }, "inlines": [{ "text": " ", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontColor": "#4472C4FF" }, "paragraphFormat": { "afterSpacing": 36.0, "styleName": "Normal" }, "inlines": [{ "text": "List of indentation options", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "leftIndent": 36.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Left indent is 48 pixels", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "leftIndent": 36.0, "afterSpacing": 18.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo", "characterFormat": { "fontFamily": "Calibri" } }, { "text": " consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "rightIndent": 36.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Right", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " indent is 48 pixels", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "rightIndent": 36.0, "afterSpacing": 18.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "firstLineIndent": 36.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "First line ", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": "indent is 48 pixels", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "firstLineIndent": 36.0, "afterSpacing": 18.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "leftIndent": 36.0, "firstLineIndent": -36.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Hanging", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " indent is 48 pixels", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "leftIndent": 36.0, "firstLineIndent": -36.0, "afterSpacing": 18.0, "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple", "styleName": "Normal" }, "inlines": [{ "text": " ", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontColor": "#4472C4FF" }, "paragraphFormat": { "afterSpacing": 36.0, "styleName": "Normal" }, "inlines": [{ "text": "List of line spacing options", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "lineSpacing": 2.0, "lineSpacingType": "Multiple", "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Double line spacing", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 18.0, "lineSpacing": 2.0, "lineSpacingType": "Multiple", "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ali", "characterFormat": { "fontFamily": "Calibri" } }, { "name": "_GoBack", "bookmarkType": 0 }, { "name": "_GoBack", "bookmarkType": 1 }, { "text": "quip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "lineSpacing": 18.0, "lineSpacingType": "AtLeast", "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Line spacing", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " is", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " at least", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " ", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": "24", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " pixels", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 18.0, "lineSpacing": 18.0, "lineSpacingType": "AtLeast", "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "lineSpacing": 15.0, "lineSpacingType": "Exactly", "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Line spacing", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " is ", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": "exactly 20", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }, { "text": " pixels", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 18.0, "lineSpacing": 15.0, "lineSpacingType": "Exactly", "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "leftIndent": 36.0, "afterSpacing": 18.0, "lineSpacing": 15.0, "lineSpacingType": "Exactly", "textAlignment": "Justify", "styleName": "Normal" }, "inlines": [{ "text": " " }] }, { "characterFormat": { "fontColor": "#4472C4FF" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "List of paragraph", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }, { "text": " ", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }, { "text": "spacing options", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva", "fontColor": "#4472C4FF" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 12.0, "styleName": "Normal" }, "inlines": [{ "text": "Spacing before the paragraph is 24 pixels and after the paragraph is 16 pixels", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "beforeSpacing": 18.0, "afterSpacing": 12.0, "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }, { "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "No spacing before and after the paragraph", "characterFormat": { "bold": true, "fontSize": 14.0, "fontFamily": "Calibri" } }] }, { "characterFormat": { "fontFamily": "Calibri" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "characterFormat": { "fontFamily": "Calibri" } }] }], "headersFooters": {}, "sectionFormat": { "headerDistance": 36.0, "footerDistance": 36.0, "pageWidth": 612.0, "pageHeight": 792.0, "leftMargin": 72.0, "rightMargin": 72.0, "topMargin": 72.0, "bottomMargin": 72.0, "differentFirstPage": false, "differentOddAndEvenPages": false } }], "characterFormat": { "fontSize": 11.0, "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple" }, "background": { "color": "#FFFFFFFF" }, "styles": [{ "type": "Paragraph", "name": "Normal", "next": "Normal", "characterFormat": { "fontSize": 12.0, "fontFamily": "Times New Roman" }, "paragraphFormat": { "afterSpacing": 0.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Character", "name": "Default Paragraph Font" }, { "type": "Paragraph", "name": "Notes", "basedOn": "Normal", "next": "Normal", "characterFormat": { "bold": true }, "paragraphFormat": { "afterSpacing": 6.0 } }] };
        // tslint:enable
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let popupOverlay: HTMLElement = document.getElementById('popup-overlay');
        waitingPopUp.style.display = 'block';
        documenteditor.open(JSON.stringify(defaultDocument));
        documenteditor.documentName = 'Paragraph Formatting';
        waitingPopUp.style.display = 'none';
        popupOverlay.style.display = 'none';
        documenteditor.focusIn();
        fontProperties.updateStyles();
    }
    function onWindowResize(): void {
        updateContainerSize();
    }
};
