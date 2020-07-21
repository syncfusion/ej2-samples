import { loadCultureFiles } from '../common/culture-loader';
import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import * as data from './data-table-formatting.json';

/**
 * Default document editor sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';

    let container: DocumentEditorContainer = new DocumentEditorContainer({ enableToolbar: true, height: '590px' });
    DocumentEditorContainer.Inject(Toolbar);
    container.serviceUrl = hostUrl + 'api/documenteditor/';
    container.appendTo('#container');

    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Table Formatting';
    titleBar.updateDocumentTitle();

    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };

};