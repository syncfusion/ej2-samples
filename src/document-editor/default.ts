import { loadCultureFiles } from '../common/culture-loader';
import { DocumentEditorContainer, Ribbon, Toolbar } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import * as data from './data-default.json';
import { Switch } from '@syncfusion/ej2-buttons';


/**
 * Default document editor sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://services.syncfusion.com/js/production/api/documenteditor/';

    let container: DocumentEditorContainer = new DocumentEditorContainer({ serviceUrl: hostUrl, enableToolbar: true, toolbarMode: 'Ribbon', height: '590px' });
    DocumentEditorContainer.Inject(Toolbar, Ribbon);
    container.appendTo('#container');

    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Getting Started';
    titleBar.updateDocumentTitle();

    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };
    let switchObj: Switch = new Switch({ value: 'Toolbar Mode', checked: true, cssClass: 'buttonSwitch' });
    switchObj.appendTo('#toolbarSwitch');
    switchObj.change = function (args) {
        if (args.checked) {
            container.toolbarMode = 'Ribbon';
        }
        else {
            container.toolbarMode = 'Toolbar';
        }
        titleBar.showButtons(container.toolbarMode !== 'Ribbon');

    }
    titleBar.showButtons(false);
};
