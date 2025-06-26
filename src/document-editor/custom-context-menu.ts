import { loadCultureFiles } from '../common/culture-loader';
import { DocumentEditorContainer, Ribbon, Toolbar } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
import * as data from './data-default.json';


/**
 * Default document editor sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://services.syncfusion.com/js/production/api/documenteditor/';

    let container: DocumentEditorContainer = new DocumentEditorContainer({ serviceUrl: hostUrl, toolbarMode: 'Ribbon', enableToolbar: true, height: '590px', documentEditorSettings: { showRuler: true } });
    DocumentEditorContainer.Inject(Toolbar, Ribbon);
    container.appendTo('#container');

    // creating custom options
    let menuItems: MenuItemModel[] = [
        {
            text: 'Search In Google',
            id: 'search_in_google',
            iconCss: 'e-icons e-de-ctnr-find'
        }];
    // adding custom options
    container.documentEditor.contextMenu.addCustomMenu(menuItems, false);
    // custom options select event
    container.documentEditor.customContextMenuSelect = (args: any): void => {
        let item: any = args.id;
        handleCustomMenuId(item);
    };
    //  custom options hide/show functionality  
    container.documentEditor.customContextMenuBeforeOpen = (args: any): void => {
        let search: any = document.getElementById(args.ids[0]);
        search.style.display = 'none';
        let searchContent: string = container.documentEditor.selection.text;
        if ((!container.documentEditor.selection.isEmpty) && (/\S/.test(searchContent))) {
            search.style.display = 'block';
        }
    };
    // custom options functionality
    function handleCustomMenuId(item: string): void {
        let id: string = container.documentEditor.element.id;
        switch (item) {
            case id + 'search_in_google':
                let searchContent: string = container.documentEditor.selection.text;
                if (!container.documentEditor.selection.isEmpty && /\S/.test(searchContent)) {
                    window.open('http://google.com/search?q=' + searchContent);
                }
                break;
        }
    }

    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Custom Context Menu';
    titleBar.updateDocumentTitle();

    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };
    titleBar.initializeRibbonSwitch(container);
    titleBar.showButtons(false);
};
