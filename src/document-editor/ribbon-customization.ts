import { DocumentEditor, Selection, Editor, TableOfContentsDialog, Search, Ribbon } from '@syncfusion/ej2-documenteditor';
import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-documenteditor';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ChangeEventArgs, CheckBox } from '@syncfusion/ej2-buttons';
import { TitleBar } from './title-bar';
import * as data from './data-default.json';

import { loadCultureFiles } from '../common/culture-loader';
import { RibbonGroupModel, RibbonItemModel, RibbonItemSize, RibbonItemType, RibbonTabModel } from '@syncfusion/ej2/ribbon';

DocumentEditorContainer.Inject(Ribbon);

/**
 * Document Editor Ribbon Customization
 */
let container: DocumentEditorContainer;
/**
 * Default document editor sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    container = new DocumentEditorContainer({
        enableToolbar: true,
        toolbarMode: 'Ribbon',
        ribbonLayout: 'Classic',
        height: '590px',
        serviceUrl: 'https://services.syncfusion.com/js/production/api/documenteditor/'
    });
    container.appendTo('#container');

    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Getting Started';
    titleBar.updateDocumentTitle();
    titleBar.showButtons(false);
    // Event binding for Home tab visibility toggle
    let showHomeTabCheckBox: CheckBox = new CheckBox({
        checked: true,
        change: (args: ChangeEventArgs) => {
            // Update checked state
            container.ribbon.showTab('Home', args.checked);

        }
    });
    showHomeTabCheckBox.appendTo('#showHomeTab');

    // Event binding for Clipboard group visibility toggle
    let showClipboardCheckBox: CheckBox = new CheckBox({
        checked: true,
        change: (args: ChangeEventArgs) => {
            // Update checked state
            container.ribbon.showGroup({ tabId: 'Home', index: 1 }, args.checked)
        }
    });
    showClipboardCheckBox.appendTo('#showClipboard');

    // Event binding for Clipboard group visibility toggle
    let showItemCheckBox: CheckBox = new CheckBox({
        checked: true,
        change: (args: ChangeEventArgs) => {
            // Update checked state
            container.ribbon.showItems({ tabId: 'Home', groupIndex: 2, itemIndexes: [5, 6] }, args.checked);
        }
    });
    showItemCheckBox.appendTo('#showItem');
    let enableItemCheckBox: CheckBox = new CheckBox({
        checked: true,
        change: (args: ChangeEventArgs) => {
            // Update checked state
            container.ribbon.enableItems({ tabId: 'Home', groupIndex: 2, itemIndexes: [7] }, args.checked);
        }
    });
    enableItemCheckBox.appendTo('#enableItem');
};