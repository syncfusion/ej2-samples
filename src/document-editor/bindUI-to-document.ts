import { loadCultureFiles } from '../common/culture-loader';
import { DocumentEditorContainer, Toolbar, ContentControlInfo } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import * as data from './data-bindui-to-document.json';
import { TextBox } from  '@syncfusion/ej2-inputs';
import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

/**
 * Default document editor sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let target = document.getElementById("target");
    let placeHolderPrefix = 'placeHolder_';
    let bindToDocumentBtn: Button = new Button();
    bindToDocumentBtn.appendTo('#BindToDocument');
    let bindToFormBtn: Button = new Button();
    bindToFormBtn.appendTo('#BindToForm');
    let hostUrl: string = 'https://services.syncfusion.com/js/production/api/documenteditor/';
    let container: DocumentEditorContainer = new DocumentEditorContainer({ serviceUrl:hostUrl,enableToolbar: true, height: '590px' });
    DocumentEditorContainer.Inject(Toolbar);
    container.toolbarItems = ['New', 'Open', 'Separator', 'Undo',
            'Redo',
            'Separator',
            'ContentControl',
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
            'UpdateFields'
        ];
        

    container.appendTo('#container');
    container.showPropertiesPane = false;
    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Bind Content Control Data';
    titleBar.updateDocumentTitle();
    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        bindDataToFormUI();
        container.documentEditor.focusIn();
    };

    let firstNameTextBox: TextBox = new TextBox({
        placeholder: 'Name',
        cssClass: 'e-outline',
        floatLabelType: 'Auto'
    });
    firstNameTextBox.appendTo('#FirstName');

    let birthdate: TextBox = new TextBox({
        placeholder: "Date [DD/MM/YYYY]",
        cssClass: 'e-outline',
        floatLabelType: 'Auto'
    });
    birthdate.appendTo('#BirthDate');

    let addressTextBox: TextBox = new TextBox({
        placeholder: 'Address',
        cssClass: 'e-outline',
        floatLabelType: 'Auto'
    });
    addressTextBox.appendTo('#Address');

    let phoneTextBox: TextBox = new TextBox({
        placeholder: 'Phone',
        cssClass: 'e-outline',
        floatLabelType: 'Auto'
    });
    phoneTextBox.appendTo('#Phone');

    let emailTextBox: TextBox = new TextBox({
        placeholder: 'Email',
        cssClass: 'e-outline',
        floatLabelType: 'Auto'
    });
    emailTextBox.appendTo('#Email');
    bindDataToFormUI();

    function bindDataToFormUI(){
        let contentControlInfos: ContentControlInfo[] = container.documentEditor.exportContentControlData();
        if(contentControlInfos.length > 0) {
            for (let i = 0; i < contentControlInfos.length; i++) {
                if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('Name') > -1) {
                    firstNameTextBox.value = contentControlInfos[i].value;
                } 
                if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('DOB') > -1) {
                    birthdate.value = contentControlInfos[i].value;
                }
                if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('Address') > -1) {
                    addressTextBox.value = contentControlInfos[i].value;
                }
                if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('Phone') > -1) {
                    phoneTextBox.value = contentControlInfos[i].value;
                }
                if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('Email') > -1) {
                    emailTextBox.value = contentControlInfos[i].value;
                }
            }
        }
    }
    document.getElementById("BindToForm").addEventListener('click', function () {
        bindDataToFormUI();
    });

    document.getElementById("BindToDocument").addEventListener('click', function () {
        let bookmarkobj: any = {};
        const data: ContentControlInfo[] = [];
        bookmarkobj['Name'] = firstNameTextBox.value;
        bookmarkobj['DOB'] = birthdate.value;
        bookmarkobj['Address'] = addressTextBox.value;
        bookmarkobj['Phone'] = phoneTextBox.value;
        bookmarkobj['Email'] = emailTextBox.value;
        if (!isNullOrUndefined(bookmarkobj['Name'])) {
            const contentControlData: ContentControlInfo = { title: placeHolderPrefix + 'Name', tag: '', value: bookmarkobj['Name'], canDelete: false, canEdit: false, type: 'RichText' };
            data.push(contentControlData);
        }
        if (!isNullOrUndefined(bookmarkobj['DOB'])) {
            const contentControlData: ContentControlInfo = { title: placeHolderPrefix + 'DOB', tag: '', value: bookmarkobj['DOB'], canDelete: false, canEdit: false, type: 'Date' };
            data.push(contentControlData);
        }
        if (!isNullOrUndefined(bookmarkobj['Address'])) {
            const contentControlData: ContentControlInfo = { title: placeHolderPrefix + 'Address', tag: '', value: bookmarkobj['Address'], canDelete: false, canEdit: false, type: 'RichText' };
            data.push(contentControlData);
        }
        if (!isNullOrUndefined(bookmarkobj['Phone'])) {
            const contentControlData: ContentControlInfo = { title: placeHolderPrefix + 'Phone', tag: '', value: bookmarkobj['Phone'], canDelete: false, canEdit: false, type: 'RichText' };
            data.push(contentControlData);
        }
        if (!isNullOrUndefined(bookmarkobj['Email'])) {
            const contentControlData: ContentControlInfo = { title: placeHolderPrefix + 'Email', tag: '', value: bookmarkobj['Email'], canDelete: false, canEdit: false, type: 'RichText' };
            data.push(contentControlData);
        }
        container.documentEditor.importContentControlData(data);
    });
};
