import { loadCultureFiles } from '../common/culture-loader';
import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import { DropDownButton, DropDownButtonModel } from '@syncfusion/ej2/splitbuttons';
import { ListView, SelectEventArgs as ListSelectEventArgs } from '@syncfusion/ej2-lists';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import * as data from './data-default.json';

/**
 * Default document editor sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://services.syncfusion.com/js/production/api/documenteditor/';

    let toolItem: any =
{
    tooltipText: 'Export',
    template: '<button title="Export" class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-dropdown-btn e-caret-hide" type="button" id="dropdownbtn"><span class="e-btn-icon e-icons e-export e-icon-left"></span><span class="e-tbar-btn-text">' + "Export" + '</span><span class="e-btn-icon e-icons e-icon-right e-caret"></span></button><div id="listview"></div>',
    id: "dropdownbtn",
    text: "Export",
};

let ddbOption: DropDownButtonModel = {
    target: '#listview',
    cssClass: 'e-caret-hide'
};

let drpDownBtn: DropDownButton = new DropDownButton(ddbOption);


// Initialize datsource for ListView component.
let dataSource: { [key: string]: Object }[] = [
    { class: 'data', text: 'Syncfusion® Document Text (*.sfdt)', id: 'sfdt', category: 'Client side exporting' },
    { class: 'data', text: 'Word Document (*.docx)', id: 'docx', category: 'Client side exporting' },
    { class: 'data', text: 'Word Template (*.dotx)', id: 'dotx', category: 'Client side exporting' },
    { class: 'data', text: 'Plain Text (*.txt)', id: 'text', category: 'Client side exporting' },    
    { class: 'data', text: 'PDF (*.pdf)', id: 'pdf', category: 'Server side exporting' },
    { class: 'data', text: 'HyperText Markup Language (*.html)', id: 'html', category: 'Server side exporting' },
    { class: 'data', text: 'Rich Text Format (*.rtf)', id: 'rtf', category: 'Server side exporting' },
    { class: 'data', text: 'Markdown (*.md)', id: 'md', category: 'Server side exporting' },
    { class: 'data', text: 'OpenDocument Text (*.odt)', id: 'odt', category: 'Server side exporting' }
];

// Initialize ListView component
let listviewInstance: ListView = new ListView({
    dataSource: dataSource,
    // Map the appropriate columns to fields property
    fields: { text: 'text', groupBy: 'category' },
    select: change
});

function change(args: ListSelectEventArgs) {
    let value: string = (args.data as any).id;
    switch (value) {
        case 'docx':
            container.documentEditor.save("Sample", 'Docx');
            break;
        case 'sfdt':
            container.documentEditor.save("Sample", 'Sfdt');
            break;
        case 'text':
            container.documentEditor.save("Sample", 'Txt');
            break;
        case 'dotx':
            container.documentEditor.save("Sample", 'Dotx');
            break;
        case 'pdf':
            formatSave('Pdf');
            break;
        case 'html':
            formatSave('Html');
            break;
        case 'odt':
            formatSave('Odt');
            break;
        case 'md':
            formatSave('Md');
            break;
        case 'rtf':
            formatSave('Rtf');
            break;
        case 'wordml':
            formatSave('Xml');
            break;
    }
    args.item.classList.remove('e-active');
}




let container: DocumentEditorContainer = new DocumentEditorContainer({
    height: "590px",
    documentEditorSettings: { showRuler: true },
    toolbarItems: [
        'New',
        'Open',
        toolItem,
        'Separator',
        'Undo',
        'Redo',
        'Separator',
        'Separator',
        'Image',
        'Table',
        'Hyperlink',
        'Bookmark',
        'TableOfContents',
        'Separator',
        'Header',
        'Footer',
        'PageSetup',
        'PageNumber',
        'Break',
        'Separator',
        'Find',
        'Separator',
        'Comments',
        'TrackChanges',
        'Separator',
        'LocalClipboard',
        'Separator',
        'FormFields',
        'UpdateFields',
       
      ], created: created
});

function created() {
    // Render initialized DropDownButton.
    drpDownBtn.appendTo('#dropdownbtn');
    listviewInstance.appendTo("#listview");
}
function formatSave(type: string) {
    createSpinner({
        target: document.getElementById('container')
    });
    showSpinner(document.getElementById('container'));
    let format: string = type;
    let url = container.documentEditor.serviceUrl + 'Export';
    let http = new XMLHttpRequest();
    http.open('POST', url);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.responseType = 'blob'; // Set the responseType to 'blob' to handle binary data

    // Prepare data to send
    let sfdt = {
        Content: container.documentEditor.serialize(),
        Filename: container.documentEditor.documentName,
        Format: '.' + format
    };

    // Set up event listener for the response
    http.onload = function () {
        if (http.status === 200) {
            // Handle the response blob here
            let responseData = http.response;

            // Create a Blob URL for the response data
            let blobUrl = URL.createObjectURL(responseData);

            // Create a link element and trigger the download
            let downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = container.documentEditor.documentName + '.' + (format).toLowerCase();
            document.body.appendChild(downloadLink);
            hideSpinner(document.getElementById('container'));
            downloadLink.click();

            // Cleanup: Remove the link and revoke the Blob URL
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(blobUrl);
        } else {
            // Handle errors
            console.error('Request failed with status:', http.status);
            hideSpinner(document.getElementById('container'));
        }
    };

    // Send the request with JSON.stringify(sfdt) as the request body
    http.send(JSON.stringify(sfdt));
}
container.serviceUrl = hostUrl;
DocumentEditorContainer.Inject(Toolbar);
container.appendTo('#container');


let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Getting Started';
    titleBar.updateDocumentTitle();
};
