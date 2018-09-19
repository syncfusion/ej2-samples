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
    document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'document-editor/character-formatting/index.html#fabric');
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
        let defaultDocument: object = { "sections": [{ "blocks": [{ "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "List of text formatting options", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva" } }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Bold", "characterFormat": { "bold": true } }] }, { "characterFormat": { "bold": true }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "characterFormat": { "fontColor": "#00B0F0FF" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "C", "characterFormat": { "fontColor": "#CC99FFFF" } }, { "text": "o", "characterFormat": { "fontColor": "#333333FF" } }, { "text": "l", "characterFormat": { "fontColor": "#FF6600FF" } }, { "text": "o", "characterFormat": { "fontColor": "#3366FFFF" } }, { "text": "r", "characterFormat": { "fontColor": "#FF9900FF" } }, { "text": "e", "characterFormat": { "fontColor": "#FF6600FF" } }, { "text": "d", "characterFormat": { "fontColor": "#808080FF" } }] }, { "characterFormat": { "fontColor": "#00B0F0FF" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "characterFormat": { "bold": true }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Double", "characterFormat": { "strikethrough": "DoubleStrike" } }, { "text": " ", "characterFormat": { "strikethrough": "DoubleStrike" } }, { "text": "Strike", "characterFormat": { "strikethrough": "DoubleStrike" } }] }, { "characterFormat": { "strikethrough": "DoubleStrike" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "characterFormat": { "fontColor": "#ED7D31FF" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Highlighted", "characterFormat": { "highlightColor": "Turquoise", "fontColor": "#ED7D31FF" } }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Italicized", "characterFormat": { "italic": true } }] }, { "characterFormat": { "italic": true }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Strikeout ", "characterFormat": { "strikethrough": "SingleStrike" } }] }, { "characterFormat": { "strikethrough": "SingleStrike" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "characterFormat": { "strikethrough": "SingleStrike" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Some" }, { "text": "Sub", "characterFormat": { "baselineAlignment": "Subscript" } }, { "text": "s", "characterFormat": { "baselineAlignment": "Subscript" } }, { "text": "cript", "characterFormat": { "baselineAlignment": "Subscript" } }, { "text": " ", "characterFormat": { "baselineAlignment": "Subscript" } }] }, { "characterFormat": { "baselineAlignment": "Subscript" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "characterFormat": { "baselineAlignment": "Subscript" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Some" }, { "text": "Super", "characterFormat": { "baselineAlignment": "Superscript" } }, { "text": "s", "characterFormat": { "baselineAlignment": "Superscript" } }, { "text": "cript", "characterFormat": { "baselineAlignment": "Superscript" } }, { "text": " ", "characterFormat": { "baselineAlignment": "Superscript" } }] }, { "characterFormat": { "baselineAlignment": "Superscript" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "characterFormat": { "underline": "Single" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Underline", "characterFormat": { "underline": "Single" } }, { "text": "d", "characterFormat": { "underline": "Single" } }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": " " }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "text": "Text with different fonts and sizes", "characterFormat": { "fontSize": 18.0, "fontFamily": "Monotype Corsiva" } }] }, { "characterFormat": { "underline": "Double", "fontSize": 11.0, "fontFamily": "Book Antiqua", "fontColor": "#7028E8FF" }, "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog [Book Antiqua", "characterFormat": { "fontSize": 11.0, "fontFamily": "Book Antiqua", "fontColor": "#7028E8FF" } }, { "text": "]", "characterFormat": { "fontSize": 11.0, "fontFamily": "Book Antiqua", "fontColor": "#7028E8FF" } }] }, { "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog ", "characterFormat": { "fontFamily": "Bitstream Vera Sans", "fontColor": "#F1C084FF" } }, { "text": "[Bitstream Vera Sans]", "characterFormat": { "fontFamily": "Bitstream Vera Sans", "fontColor": "#F1C084FF" } }] }, { "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog ", "characterFormat": { "fontSize": 13.0, "fontFamily": "Comic Sans MS", "fontColor": "#BD5DCDFF" } }, { "text": "[Comic Sans MS]", "characterFormat": { "fontSize": 13.0, "fontFamily": "Comic Sans MS", "fontColor": "#BD5DCDFF" } }] }, { "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog ", "characterFormat": { "fontSize": 14.0, "fontFamily": "Microsoft Sans Serif", "fontColor": "#4D72EEFF" } }, { "text": "[Microsoft Sans Serif]", "characterFormat": { "fontSize": 14.0, "fontFamily": "Microsoft Sans Serif", "fontColor": "#4D72EEFF" } }] }, { "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog", "characterFormat": { "fontSize": 15.0, "fontFamily": "Batang", "fontColor": "#335388FF" } }, { "text": " [", "characterFormat": { "fontSize": 15.0, "fontFamily": "Batang", "fontColor": "#335388FF" } }, { "text": "Batang", "characterFormat": { "fontSize": 15.0, "fontFamily": "Batang", "fontColor": "#335388FF" } }, { "text": "]", "characterFormat": { "fontSize": 15.0, "fontFamily": "Batang", "fontColor": "#335388FF" } }] }, { "characterFormat": { "fontSize": 16.0, "fontFamily": "Arial", "fontColor": "#31B463FF" }, "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog ", "characterFormat": { "fontSize": 16.0, "fontFamily": "Arial", "fontColor": "#31B463FF" } }, { "text": "[Arial]", "characterFormat": { "fontSize": 16.0, "fontFamily": "Arial", "fontColor": "#31B463FF" } }] }, { "characterFormat": { "fontSize": 16.0 }, "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog [Book Antiqua]", "characterFormat": { "fontSize": 16.0, "fontFamily": "Book Antiqua", "fontColor": "#7028E8FF" } }] }, { "characterFormat": { "fontSize": 15.0 }, "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog [Bitstream Vera Sans]", "characterFormat": { "fontSize": 15.0, "fontFamily": "Bitstream Vera Sans", "fontColor": "#F1C084FF" } }] }, { "characterFormat": { "fontSize": 14.0 }, "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog [Comic Sans MS]", "characterFormat": { "fontSize": 14.0, "fontFamily": "Comic Sans MS", "fontColor": "#BD5DCDFF" } }, { "name": "_GoBack", "bookmarkType": 0 }, { "name": "_GoBack", "bookmarkType": 1 }] }, { "characterFormat": { "fontSize": 13.0 }, "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog [Microsoft Sans Serif]", "characterFormat": { "fontSize": 13.0, "fontFamily": "Microsoft Sans Serif", "fontColor": "#4D72EEFF" } }] }, { "characterFormat": { "fontSize": 11.0 }, "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog", "characterFormat": { "fontFamily": "Batang", "fontColor": "#335388FF" } }, { "text": " [", "characterFormat": { "fontFamily": "Batang", "fontColor": "#335388FF" } }, { "text": "Batang", "characterFormat": { "fontFamily": "Batang", "fontColor": "#335388FF" } }, { "text": "]", "characterFormat": { "fontFamily": "Batang", "fontColor": "#335388FF" } }] }, { "characterFormat": { "fontSize": 10.0 }, "paragraphFormat": { "beforeSpacing": 6.0, "afterSpacing": 6.0, "styleName": "Normal" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog [Arial]", "characterFormat": { "fontSize": 11.0, "fontFamily": "Arial", "fontColor": "#31B463FF" } }] }], "headersFooters": {}, "sectionFormat": { "headerDistance": 36.0, "footerDistance": 36.0, "pageWidth": 612.0, "pageHeight": 792.0, "leftMargin": 72.0, "rightMargin": 72.0, "topMargin": 72.0, "bottomMargin": 72.0, "differentFirstPage": false, "differentOddAndEvenPages": false } }], "characterFormat": { "fontFamily": "Times New Roman" }, "background": { "color": "#FFFFFFFF" }, "styles": [{ "type": "Paragraph", "name": "Normal", "next": "Normal", "characterFormat": { "fontSize": 12.0 } }, { "type": "Character", "name": "Default Paragraph Font" }] };
        // tslint:enable
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let popupOverlay: HTMLElement = document.getElementById('popup-overlay');
        waitingPopUp.style.display = 'block';
        documenteditor.open(JSON.stringify(defaultDocument));
        documenteditor.documentName = 'Character Formatting';
        waitingPopUp.style.display = 'none';
        popupOverlay.style.display = 'none';
        documenteditor.focusIn();
        fontProperties.updateStyles();
    }
    function onWindowResize(): void {
        updateContainerSize();
    }
};
