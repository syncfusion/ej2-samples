import { loadCultureFiles } from '../common/culture-loader';
// tslint:disable-next-line:max-line-length
import { DocumentEditorContainer, Toolbar} from '@syncfusion/ej2-documenteditor';
import { Grid, Page, CommandColumn } from '@syncfusion/ej2-grids';
import { Dialog } from '@syncfusion/ej2-popups';
import { TitleBar } from './title-bar';
import { gridData } from './grid-datasoruce';
import * as Default from './data-default.json';
import * as CharacterFormatting from './data-character-formatting.json';
import * as ParagraphFormatting from './data-paragraph-formatting.json';
import * as Styles from './data-styles.json';
import * as WebLayout from './data-web-layout.json';
Grid.Inject(Page,CommandColumn);

(window as any).default = (): void => {
    loadCultureFiles();

    let dialogObj: Dialog= new Dialog({
        width: '90%',
        height: '90%',
        visible: false,
        enableResize: true,
        isModal: true,
        zIndex: 1500,
        position: { X: 'center', Y: 'center' }
      });
    dialogObj.appendTo('#defaultDialog');

    let hostUrl: string = 'https://services.syncfusion.com/js/production/api/documenteditor/';
    let container: DocumentEditorContainer = new DocumentEditorContainer({ height:"90%", serviceUrl:hostUrl, enableToolbar: true , zIndex: 3000 , documentEditorSettings:{ showRuler: true}});
    DocumentEditorContainer.Inject(Toolbar);
    container.appendTo('#container'); 
    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true, false, dialogObj);
    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };

    let commandClick: any = function(args:any){
        let mode = args.target.title;
        let currentDocument = args.rowData.FileName;
        container.documentEditor.documentName = currentDocument.replace(".docx", "");
        titleBar.updateDocumentTitle();
        switch (currentDocument) {
            case "Getting Started.docx":
                container.documentEditor.open(JSON.stringify((<any>Default))); break;
            case "Character Formatting.docx":
                container.documentEditor.open(JSON.stringify((<any>CharacterFormatting))); break;
            case "Paragraph Formatting.docx":
                container.documentEditor.open(JSON.stringify((<any>ParagraphFormatting))); break;
            case "Styles.docx":
                container.documentEditor.open(JSON.stringify((<any>Styles))); break;
            case "Web layout.docx":
                container.documentEditor.open(JSON.stringify((<any>WebLayout))); break;
        }
        if(mode === 'View'){
            container.documentEditor.enableContextMenu = false;
            container.documentEditor.isReadOnly = true;
            container.showPropertiesPane = false;
            document.getElementById('documenteditor-share').style.display ='none';
            container.toolbarItems = ['Open', 'Separator', 'Find'];
        } else {
            container.documentEditor.enableContextMenu = true;
            container.documentEditor.isReadOnly = false;
            container.showPropertiesPane = true;
            document.getElementById('documenteditor-share').style.display ='block';
            container.toolbarItems = ['New', 'Open', 'Separator', 'Undo', 'Redo', 'Separator', 'Image', 'Table', 'Hyperlink', 'Bookmark', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'InsertFootnote', 'InsertEndnote', 'Separator', 'Find', 'Separator', 'Comments', 'TrackChanges', 'Separator', 'LocalClipboard', 'RestrictEditing', 'Separator', 'FormFields', 'UpdateFields'];
        }
        dialogObj.show();
    }
    let grid: Grid = new Grid({
        dataSource: gridData,
        commandClick:commandClick,
        destroyed: destroyed,
        columns: [
            { template: '#fileNameTemplate', headerText: 'File Name' },
            { headerText: 'Author', field: 'Author'},
            { textAlign: 'Center', headerText: 'Actions', commands: [{ buttonOption: { cssClass: 'e-icons e-eye e-flat' }, title: 'View'}, { buttonOption: { cssClass: 'e-icons e-edit e-flat' } , title: 'Edit'}] },
        ]
    });
    grid.appendTo('#Grid');

    function destroyed(){
        container.destroy();
        dialogObj.destroy();
    }
    
};
