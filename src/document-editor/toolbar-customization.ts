import { loadCultureFiles } from '../common/culture-loader';
import { CheckBox, Button } from '@syncfusion/ej2-buttons';
import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import * as data from './data-toolbar-customization.json';


/**
 * Default document editor sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    let container: DocumentEditorContainer = new DocumentEditorContainer({
        enableToolbar: true, height: '590px'});
    DocumentEditorContainer.Inject(Toolbar);
    MultiSelect.Inject(CheckBoxSelection);
    container.serviceUrl = hostUrl + 'api/documenteditor/';
    container.appendTo('#container');
    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Toolbar Customization';
    titleBar.updateDocumentTitle();
    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };
    let toolbarItems: string[] = ['New', 'Open', 'Undo',
        'Redo',
        'Comments',
        'Image',
        'Table',
        'Hyperlink',
        'Bookmark',
        'TableOfContents',
        'Header',
        'Footer',
        'PageSetup',
        'PageNumber',
        'Break',
        'Find',
        'LocalClipboard',
        'RestrictEditing'];
    let checkList: MultiSelect = new MultiSelect({
        dataSource: toolbarItems,
        mode: 'CheckBox', placeholder: 'Select Toolbar Items', showSelectAll: true,
        showDropDownIcon: true, popupHeight: '350px',
        filterBarPlaceholder: 'Search toolbar items',
        enableSelectionOrder: true
    });
    checkList.appendTo('#checked');
    let customize: Button = new Button();
    customize.appendTo('#custom');
    document.getElementById('custom').addEventListener('click', onChange);

    // function to handle the CheckBox change event
    function onChange(): void {
        let items: any = checkList.value;
        container.toolbarItems = items;
    }
};