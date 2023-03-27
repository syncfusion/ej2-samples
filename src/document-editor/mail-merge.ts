import { loadCultureFiles } from '../common/culture-loader';
import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import { ListView, SelectEventArgs } from '@syncfusion/ej2-lists';
import { ClickEventArgs } from '@syncfusion/ej2-navigations/src/toolbar/toolbar';
import * as data from './data-mail-merge.json';
import { Dialog, DialogUtility } from '@syncfusion/ej2-popups';
/**
 * Default document editor sample
 */
// tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://services.syncfusion.com/js/production/api/documenteditor/';
    let container: DocumentEditorContainer = new DocumentEditorContainer({ serviceUrl:hostUrl,enableToolbar: true, height: '590px',
     toolbarItems: [
            'New', 'Open', 'Separator', 'Undo',
            'Redo',
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
            'RestrictEditing',
            'Separator',
            'FormFields',
            'UpdateFields',
            'Separator',
            {
                prefixIcon: 'sf-icon-InsertMergeField',
                tooltipText: 'Insert Field',
                text: onWrapText('Insert Field'),
                id: 'InsertField'
            },
            {
                prefixIcon: 'sf-icon-FinishMerge',
                tooltipText: 'Merge Document',
                text: onWrapText('Merge Document'),
                id: 'MergeDocument'
            },
        ]
    });
    DocumentEditorContainer.Inject(Toolbar);
    container.appendTo('#container');
    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Mail Merge';
    titleBar.updateDocumentTitle();
    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };
    function onWrapText(text: string): string {
        let content: string = '';
        let index: number = text.lastIndexOf(' ');
        content = text.slice(0, index);
        text.slice(index);
        content += '<div class="e-de-text-wrap">' + text.slice(index) + '</div>';
        return content;
    }
    container.toolbarClick = (args: ClickEventArgs): void => {
        switch (args.item.id) {
            case 'MergeDocument':
                mergeDocument();
                break;
            case 'InsertField':
                showInsertFielddialog();
                break;
        }
    };
    let waitingPopUp: HTMLElement;
    let inActiveDiv: HTMLElement;
    let listData: { [key: string]: Object }[] = [
        {
            text: 'ProductName',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'ShipName',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'CustomerID',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'Quantity',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'UnitPrice',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'Discount',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'ShipAddress',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'ShipCity',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'ShipCountry',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'OrderId',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        },
        {
            text: 'OrderDate',
            category: 'Drag or click the field to insert.',
            htmlAttributes: { draggable: true }
        }
    ];
    let listDivElement: HTMLElement = document.getElementById('listview');
    let listView: ListView = new ListView({
        dataSource: listData,
        fields: { tooltip: 'category' },
        select: onselect
    });
    listView.appendTo(listDivElement);
    document.getElementById('listview').addEventListener('dragstart', (event: any): void => {
        event.dataTransfer.setData('Text', event.target.innerText);
        event.target.classList.add('de-drag-target');
    });
    function onselect(args: SelectEventArgs): void {
        let fieldName: any = args.text;
        listView.selectItem(undefined);
        insertField(fieldName);
    }
    function insertField(fieldName: any): void {
        let fileName: any = fieldName.replace(/\n/g, '').replace(/\r/g, '').replace(/\r\n/g, '');
        let fieldCode: any = 'MERGEFIELD  ' + fileName + '  \\* MERGEFORMAT ';
        container.documentEditor.editor.insertField(fieldCode, '«' + fieldName + '»');
        container.documentEditor.focusIn();
    }

    // Prevent default drag over for document editor element
    document.getElementById('container').addEventListener('dragover', (event: any): void => {
        event.preventDefault();
    });

    // Drop Event for document editor element
    document.getElementById('container').addEventListener('drop', (e: any) => {
        let text: string = e.dataTransfer.getData('Text');
        container.documentEditor.selection.select({ x: e.offsetX, y: e.offsetY, extend: false });
        insertField(text);
    });

    document.addEventListener('dragend', (event: any) => {
        if (event.target.classList.contains('de-drag-target')) {
            event.target.classList.remove('de-drag-target');
        }
    });
    function showInsertFielddialog(): void {
        let instance: any = this;
        if (document.getElementById('insert_merge_field') === null || document.getElementById('insert_merge_field') === undefined) {
            let fieldcontainer: any = document.createElement('div');
            fieldcontainer.id = 'insert_merge_field';
            document.body.appendChild(fieldcontainer);
            insertFieldDialogObj.appendTo('#insert_merge_field');
            fieldcontainer.parentElement.style.position = 'fixed';
            fieldcontainer.style.width = 'auto';
            fieldcontainer.style.height = 'auto';
        }
        insertFieldDialogObj.close = (): void => { container.documentEditor.focusIn(); };
        insertFieldDialogObj.beforeOpen = (): void => { container.documentEditor.focusIn(); };
        insertFieldDialogObj.show();
        let fieldNameTextBox: any = document.getElementById('field_text');
        fieldNameTextBox.value = '';
    }
    function closeFieldDialog(): void {
        insertFieldDialogObj.hide();
        container.documentEditor.focusIn();
    }
    let insertFieldDialogObj: Dialog = new Dialog({
        header: 'Merge Field',
        content:
            '<div class="dialogContent">'
            // tslint:disable-next-line:max-line-length
            + '<label class="e-insert-field-label">Name:</label></br><input type="text" id="field_text" class="e-input" placeholder="Type a field to insert eg. FirstName">'
            + '</div>',
        showCloseIcon: true,
        isModal: true,
        width: 'auto',
        height: 'auto',
        close: closeFieldDialog,
        buttons: [
            {
                'click': (): void => {
                    let fieldNameTextBox: any = document.getElementById('field_text');
                    let fieldName: any = fieldNameTextBox.value;
                    if (fieldName !== '') {
                        container.documentEditor.editor.insertField('MERGEFIELD ' + fieldName + ' \\* MERGEFORMAT');
                    }
                    insertFieldDialogObj.hide();
                    container.documentEditor.focusIn();
                },
                buttonModel: {
                    content: 'Ok',
                    cssClass: 'e-flat',
                    isPrimary: true,
                },
            },
            {
                'click': (): void => {
                    insertFieldDialogObj.hide();
                    container.documentEditor.focusIn();
                },
                buttonModel: {
                    content: 'Cancel',
                    cssClass: 'e-flat',
                },
            },
        ],
    });

    function mergeDocument(): void {
        container.documentEditor.saveAsBlob('Docx').then((blob: Blob) => {
            let exportedDocumment: Blob = blob;
            let fileReader: any = new FileReader();
            fileReader.onload = (): void => {
                let base64String: any = fileReader.result;
                let responseData: any = {
                    fileName: container.documentEditor.documentName + '.docx',
                    documentData: base64String
                };
                waitingPopUp = document.getElementById('waiting-popup');
                inActiveDiv = document.getElementById('popup-overlay');
                showHideWaitingIndicator(true);
                let baseUrl: string = 'https://services.syncfusion.com/js/production/api/documenteditor/MailMerge';
                let httpRequest: XMLHttpRequest = new XMLHttpRequest();
                httpRequest.open('POST', baseUrl, true);
                httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                httpRequest.onreadystatechange = () => {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200 || httpRequest.status === 304) {
                            container.documentEditor.open(httpRequest.responseText);
                        } else {
                            // Failed to merge document
                            DialogUtility.alert({
                                title: 'Information',
                                content: 'failure to merge document',
                                showCloseIcon: true,
                                closeOnEscape: true,
                            });
                        }
                        showHideWaitingIndicator(false);
                    }
                };
                httpRequest.send(JSON.stringify((<any>responseData)));
            };
            fileReader.readAsDataURL(blob);
        });
    }
    function showHideWaitingIndicator(show: boolean): void {
        inActiveDiv.style.display = show ? 'block' : 'none';
        waitingPopUp.style.display = show ? 'block' : 'none';
    }
};

