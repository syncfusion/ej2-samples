import { DocumentEditor } from '@syncfusion/ej2-documenteditor';
export declare class DocumentLoader {
    private hostUrl;
    private documentEditor;
    constructor(documentEditor: DocumentEditor);
    loadDefault(defaultDocument: Object): void;
    loadFile(path: any): void;
    destroy(): void;
}
