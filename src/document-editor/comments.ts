import { loadCultureFiles } from '../common/culture-loader';
import { DocumentEditorContainer, Toolbar, CommentDeleteEventArgs } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import * as data from './data-comments.json';
import { DialogUtility } from '@syncfusion/ej2-popups';


/**
 * Default document editor sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://services.syncfusion.com/js/production/api/documenteditor/';
    let container: DocumentEditorContainer = new DocumentEditorContainer({ serviceUrl:hostUrl,
        enableToolbar: true, showPropertiesPane: false,
        height: '590px',
        userColor: '#b70f34', commentDelete: commentDelete
    });
    DocumentEditorContainer.Inject(Toolbar);
    container.appendTo('#container');
    container.documentEditor.currentUser = 'Nancy Davolio';
    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Comments';
    container.documentEditor.showComments = true;
    titleBar.updateDocumentTitle();
    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };

    function commentDelete(args: CommentDeleteEventArgs): void {
        if (args.author !== container.documentEditor.currentUser) {
            args.cancel = true;
            DialogUtility.alert({
                title: 'Information',
                content: 'Delete restriction enabled. Only the author of the comment can delete it.',
                showCloseIcon: true,
                closeOnEscape: true,
            });
        }
    }
};

