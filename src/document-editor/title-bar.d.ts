import { DocumentEditor, DocumentEditorContainer } from '@syncfusion/ej2-documenteditor';
import { Dialog } from '@syncfusion/ej2-popups';
export declare class TitleBar {
    private tileBarDiv;
    private documentTitle;
    private documentTitleContentEditor;
    private export;
    private print;
    private close;
    private open;
    private documentEditor;
    private isRtl;
    private dialogComponent;
    constructor(element: HTMLElement, docEditor: DocumentEditor, isShareNeeded: Boolean, isRtl?: boolean, dialogComponent?: Dialog);
    private initializeTitleBar;
    private setTooltipForPopup;
    private wireEvents;
    private updateDocumentEditorTitle;
    updateDocumentTitle: () => void;
    private addButton;
    private onPrint;
    private onClose;
    private onExportClick;
    private save;
    initializeRibbonSwitch(container: DocumentEditorContainer): void;
    showButtons(show: boolean): void;
}
