import { loadCultureFiles } from '../common/culture-loader';
import { DocumentEditorContainer, Ribbon, Toolbar } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import * as data from './data-track-changes.json';


/**
 * Default document editor sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://services.syncfusion.com/js/production/api/documenteditor/';

    let container: DocumentEditorContainer = new DocumentEditorContainer({
        serviceUrl:hostUrl, toolbarMode: 'Ribbon', enableToolbar: true, height: '590px', showPropertiesPane: false,
        enableTrackChanges: true, userColor: '#b70f34',  documentEditorSettings:{ showRuler: true}
    });
    DocumentEditorContainer.Inject(Toolbar,Ribbon);
    container.appendTo('#container');
    container.documentEditor.currentUser = 'Nancy Davolio';
    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Track Changes';
    titleBar.updateDocumentTitle();

    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };
    titleBar.initializeRibbonSwitch(container);
    titleBar.showButtons(false);
};