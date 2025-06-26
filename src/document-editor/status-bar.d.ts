import { DocumentEditor, ViewChangeEventArgs } from '@syncfusion/ej2-documenteditor';
export declare class StatusBar {
    private documentEditor;
    private statusBarDiv;
    private pageCount;
    private zoom;
    private pageNumberLabel;
    private editablePageNumber;
    startPage: number;
    get editorPageCount(): number;
    constructor(parentElement: HTMLElement, docEditor: DocumentEditor);
    private initializeStatusBar;
    private onZoom;
    updateZoomContent: () => void;
    private setZoomValue;
    updatePageCount: () => void;
    updatePageNumber: () => void;
    updatePageNumberOnViewChange: (args: ViewChangeEventArgs) => void;
    private wireEvents;
    private updateDocumentEditorPageNumber;
}
