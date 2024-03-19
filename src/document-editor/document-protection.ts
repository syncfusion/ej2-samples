import { loadCultureFiles } from '../common/culture-loader';
import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-documenteditor';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { TitleBar } from './title-bar';
import * as data from './data-document-protection.json';
import { ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';


/**
 * Default document editor sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://services.syncfusion.com/js/production/api/documenteditor/';

    let container: DocumentEditorContainer = new DocumentEditorContainer({ serviceUrl:hostUrl,enableToolbar: true, height: '590px', documentEditorSettings:{ showRuler: true} });
    DocumentEditorContainer.Inject(Toolbar);
    container.appendTo('#container');
    container.showPropertiesPane = false;
    container.documentEditor.currentUser = 'engineer@mycompany.com';
    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Document Protection';
    titleBar.updateDocumentTitle();

    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };

    // defined the array of data
    let userList: string[] = ['engineer@mycompany.com'];

    let dropDownListObject: DropDownList = new DropDownList({
        dataSource: userList,
        change: (e: ChangeEventArgs) => {
            container.documentEditor.currentUser = e.value as string;
        }
    });
    dropDownListObject.appendTo('#ddlelement');
    dropDownListObject.value = 'engineer@mycompany.com';
    dropDownListObject.addItem('manager@mycompany.com');
    let colorPicker: ColorPicker = new ColorPicker({
        value: container.documentEditor.userColor,
        change: (e: ColorPickerEventArgs) => {
            container.documentEditor.userColor = e.currentValue.hex;
        }
    });
    colorPicker.appendTo('#color-picker');

};
