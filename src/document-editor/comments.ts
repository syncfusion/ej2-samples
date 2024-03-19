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
    let mentionData: any = [
        { "Name": "Selma Rose", "Eimg": "3", "EmailId": "selma@mycompany.com" },
        { "Name": "Russo Kay", "Eimg": "8", "EmailId": "russo@mycompany.com" },
        { "Name": "Camden Kate", "Eimg": "9", "EmailId": "camden@mycompany.com" },
        { "Name": "Mary Kate", "Eimg": "4", "EmailId": "marry@mycompany.com" },
        { "Name": "Ursula Ann", "Eimg": "2", "EmailId": "ursula@mycompany.com" },
        { "Name": "Margaret", "Eimg": "5", "EmailId": "margaret@mycompany.com" },
        { "Name": "Laura Grace", "Eimg": "6", "EmailId": "laura@mycompany.com" },
        { "Name": "Robert", "Eimg": "8", "EmailId": "robert@mycompany.com" },
        { "Name": "Albert", "Eimg": "9", "EmailId": "albert@mycompany.com" },
        { "Name": "Michale", "Eimg": "10", "EmailId": "michale@mycompany.com" },
        { "Name": "Andrew James", "Eimg": "7", "EmailId": "james@mycompany.com" },
        { "Name": "Rosalie", "Eimg": "4", "EmailId": "rosalie@mycompany.com" },
        { "Name": "Stella Ruth", "Eimg": "2", "EmailId": "stella@mycompany.com" },
        { "Name": "Richard Rose", "Eimg": "10", "EmailId": "richard@mycompany.com" },
        { "Name": "Gabrielle", "Eimg": "3", "EmailId": "gabrielle@mycompany.com" },
        { "Name": "Thomas", "Eimg": "7", "EmailId": "thomas@mycompany.com" },
        { "Name": "Charles Danny", "Eimg": "8", "EmailId": "charles@mycompany.com" },
        { "Name": "Daniel", "Eimg": "10", "EmailId": "daniel@mycompany.com" },
        { "Name": "Matthew", "Eimg": "7", "EmailId": "matthew@mycompany.com" },
        { "Name": "Donald Krish", "Eimg": "9", "EmailId": "donald@mycompany.com" },
        { "Name": "Yohana", "Eimg": "1", "EmailId": "yohana@mycompany.com" },
        { "Name": "Kevin Paul", "Eimg": "10", "EmailId": "kevin@mycompany.com" },
        { "Name": "Andrew Fuller", "Eimg": "3", "EmailId": "andrew@mycompany.com"}
    ];
    let container: DocumentEditorContainer = new DocumentEditorContainer({ serviceUrl:hostUrl,
        enableToolbar: true, showPropertiesPane: false,
        height: '590px', documentEditorSettings: { showRuler: true, mentionSettings: { dataSource: mentionData, fields: { text: 'Name' }} },
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

