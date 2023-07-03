import { loadCultureFiles } from '../common/culture-loader';
import { CardRenderedEventArgs, Kanban } from '@syncfusion/ej2-kanban';
import { generateKanbanDataVirtualScrollData } from './data';
import { addClass } from '@syncfusion/ej2/base';

(window as any).default = (): void => {
    loadCultureFiles();
    interface TemplateFunction extends Window {
        getString?: Function;
    }
    let kanbanObj: Kanban = new Kanban({ 
        enableVirtualization: true, // To enable virtual scrolling feature.
        dataSource: generateKanbanDataVirtualScrollData(),
        keyField: 'Status',
        enableTooltip: true,
        columns: [
            { headerText: 'To Do', keyField: 'Open' },
            { headerText: 'In Progress', keyField: 'InProgress' },
            { headerText: 'Code Review', keyField: 'Review'},
            { headerText: 'Done', keyField: 'Close' }
        ],
        cardSettings: {
            headerField: 'Id',
            template: '#cardTemplate',
            selectionType: 'Multiple'
        },
        dialogSettings : {
            fields: [
                {key: 'Id', text: 'ID', type: 'TextBox'},
                {key: 'Status', text: 'Status', type: 'DropDown'},
                {key: 'StoryPoints', text: 'Story Points', type: 'Numeric' },
                {key: 'Summary', text: 'Summary', type: 'TextArea'}
            ]
        },
        cardRendered: (args: CardRenderedEventArgs) => {
            let val: string = ((<{[key: string]: Object}>(args.data)).Priority as string).toLowerCase();
            addClass([args.element], val);
        }
    });
    kanbanObj.appendTo('#KanbanVirtualScrolling');
    // Function to get the first two character from the assignee field
    (window as TemplateFunction).getString = (assignee: string) => {
        return assignee.match(/\b(\w)/g).join('').toUpperCase();
    };
};
