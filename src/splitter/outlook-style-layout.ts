import { loadCultureFiles } from '../common/culture-loader';
import { Splitter } from '@syncfusion/ej2-layouts';
import { TreeView } from '@syncfusion/ej2-navigations';
import { ListView } from '@syncfusion/ej2-lists';
import { TextBox } from  '@syncfusion/ej2-inputs';
import { RichTextEditor, Link, Image, HtmlEditor, Toolbar, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
import { Button } from '@syncfusion/ej2-buttons';
RichTextEditor.Inject(Link, Image, HtmlEditor, Toolbar, QuickToolbar);
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
/**
 *  Sample for outlook style using splitter
 */
(window as any).default = (): void => {
    let rteObj: RichTextEditor;
    loadCultureFiles();
    let splitObj1: Splitter = new Splitter({
        height: '493px',
        paneSettings: [
            { size: '28%', min: '27%' },
            { size: '33%', min: '23%' },
            { size: '37%', min: '30%' }
        ],
        resizing: onSplitterResize,
        width: '100%'
    });
    splitObj1.appendTo('#splitter1');
    let inputobj1: TextBox = new TextBox({
    });
    inputobj1.appendTo('#firstname');
    let inputobj2: TextBox = new TextBox({
    });
    inputobj2.appendTo('#lastname');
    let inputobj3: TextBox = new TextBox({
    });
    inputobj3.appendTo('#subject');
    // Data source for TreeView component
    let mailBox: { [key: string]: Object }[] = [
        { id: 1, name: 'Favorites', hasChild: true},
        { id: 2, pid: 1, name: 'Sales Reports', count: '4' },
        { id: 3, pid: 1, name: 'Sent Items'},
        { id: 4, pid: 1, name: 'Marketing Reports ', count: '6'},
        { id: 5, name: 'Andrew Fuller', hasChild: true, expanded: true },
        { id: 6, pid: 5, name: 'Inbox',  selected: true , count: '20'},
        { id: 7, pid: 5,  name: 'Drafts', count: '5'},
        { id: 15, pid: 5, name: 'Archive'},
        { id: 8, pid: 5,  name: 'Deleted Items'},
        { id: 9, pid: 5, name: 'Sent Items'},
        { id: 10, pid: 5, name: 'Sales Reports' , count: '4'},
        { id: 11, pid: 5, name: 'Marketing Reports', count: '6' },
        { id: 12, pid: 5, name: 'Outbox'},
        { id: 13, pid: 5, name: 'Junk Email'},
        { id: 14, pid: 5, name: 'RSS Feed'},
        { id: 15, pid: 5, name: 'Trash' }
    ];
    // Render the TreeView using template option
    let treeObj: TreeView = new TreeView({
        fields: { dataSource: mailBox, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
        nodeTemplate: '#treeTemplate',
    });
    treeObj.appendTo('#tree');
    // tslint:disable:max-line-length
    //Define an array of JSON data
    let dataSource: any = [
        { Name: 'Selma Tally', content: '<div><div class="status">Apology marketing email</div><div id="list-message">Hello Ananya Singleton</div>', id: '1', order: 0 },
        { Name: 'Illa Russo', content: '<div><div class="status">Annual conference</div><div id="list-message">Hi jeani Moresa</div></div>', id: '4', order: 0 },
        { Name: 'Camden Macmellon', content: '<div><div class="status">Reference request- Camden hester</div><div id="list-message">Hello Kerry Best,</div></div>', order: 0 },
        { Name: 'Garth Owen', content: '<div><div class="status">Application for job Title</div><div id="list-message">Hello Illa Russo</div></div>', id: '2', order: 0 },
        { Name: 'Ursula Patterson', content: '<div><div class="status">Programmaer Position Applicant</div><div id="list-message">Hello Kerry best,</div></div>', id: '2', order: 0 }
    ];

    // Initialize ListView component
    let listObj: ListView = new ListView({
        //Set defined data to dataSource property
        dataSource: dataSource,
        cssClass: 'e-list-template',
        //Map the appropriate columns to fields property
        fields: { text: 'Name', groupBy: 'order' },
        //Set customized group-header template
        groupTemplate: '<div class="e-list-wrapper"><span class="e-list-item-content"></span></div>',
        //Set customized list template
        template: '<div class="settings e-list-wrapper e-list-multi-line e-list-avatar">' +
        '<span class="e-list-item-header">${Name}</span>' +
        '<span class="e-list-content">${content}</span>' +
        '</div>'
    });

    //Render initialized ListView component
    listObj.appendTo('#groupedList');

    let button1: Button = new Button({ isPrimary: true });
    button1.appendTo('#rteSubmit');

    let button2: Button = new Button();
    button2.appendTo('#rteCancel');

    let defaultRTE: RichTextEditor = new RichTextEditor({ height: '262px', created: onRteCreated});
    defaultRTE.appendTo('#defaultRTE');

    function onRteCreated(): void {
        rteObj = this;
    }

    function onSplitterResize(): void {
        rteObj.refreshUI();
    }
};
