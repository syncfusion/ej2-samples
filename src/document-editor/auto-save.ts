import { loadCultureFiles } from '../common/culture-loader';
import { Button } from '@syncfusion/ej2-buttons';
import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import * as data from './data-default.json';


/**
 * Default document editor sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://services.syncfusion.com/js/production/api/documenteditor/';
    let contentChanged: boolean = false;
    let container: DocumentEditorContainer = new DocumentEditorContainer({  serviceUrl:hostUrl,enableToolbar: true, height: '590px', documentEditorSettings: { showRuler: true } });
    DocumentEditorContainer.Inject(Toolbar);
    container.appendTo('#container');

    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Auto Save';
    titleBar.updateDocumentTitle();

    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };

    container.contentChange = (): void => {
        contentChanged = true;
    };

    setInterval(() => {
        if (contentChanged) {
            //You can save the document as below
            container.documentEditor.saveAsBlob('Docx').then((blob: Blob) => {
                let exportedDocumment: Blob = blob;
                //Now, save the document where ever you want.
                /* tslint:disable */
                let span: HTMLElement = document.createElement('span');
                let date: Date = new Date();
                let time: string = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                span.innerHTML = 'Auto saved at <b>' + time + '</b><hr>';
                let log: HTMLElement = document.getElementById('AutosaveLog');
                log.insertBefore(span, log.firstChild);
            });
            contentChanged = false;
        }
    }, 15000);
    /* tslint:enable */
    let clear: Button = new Button();
    clear.appendTo('#clear');

    document.getElementById('clear').onclick = () => {
        document.getElementById('AutosaveLog').innerHTML = '';
    };

};
