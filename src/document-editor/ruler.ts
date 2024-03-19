import { loadCultureFiles } from '../common/culture-loader';
import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-documenteditor';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { TitleBar } from './title-bar';
import * as data from './data-default.json';


/**
 * Default document editor sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://services.syncfusion.com/js/production/api/documenteditor/';

    let container: DocumentEditorContainer = new DocumentEditorContainer({ serviceUrl:hostUrl, enableToolbar: true, height: '590px', documentEditorSettings: { showRuler: true } });
    DocumentEditorContainer.Inject(Toolbar);
    container.appendTo('#container');

    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Getting Started';
    titleBar.updateDocumentTitle();

    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };
    let checkbox: CheckBox = new CheckBox({ label: 'Show ruler', checked: true, change: (args) => { 
        container.documentEditorSettings.showRuler = args.checked;
      }});

    // Render initialized CheckBox.
    checkbox.appendTo('#checkbox');
};
