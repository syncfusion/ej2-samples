import { loadCultureFiles } from '../common/culture-loader';
import { Kanban, CardRenderedEventArgs } from '@syncfusion/ej2-kanban';
import { extend, addClass } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';
/**
 * Kanban Overview Sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    interface TemplateFunction extends Window {
        getTags?: Function;
        getString?: Function;
    }
    // To maintain the property changes, extend the object.
    let data: Object[] = <Object[]>extend([], (dataSource as any).cardData, null, true);
    let kanbanObj: Kanban = new Kanban({ //Initialize Kanban control
        dataSource: data,
        keyField: 'Status',
        enableTooltip: true,
        columns: [
            { headerText: 'To Do', keyField: 'Open', template: '#headerTemplate', allowToggle: true },
            { headerText: 'In Progress', keyField: 'InProgress', template: '#headerTemplate', allowToggle: true },
            { headerText: 'In Review', keyField: 'Review', template: '#headerTemplate', allowToggle: true },
            { headerText: 'Done', keyField: 'Close', template: '#headerTemplate', allowToggle: true }
        ],
        cardSettings: {
            headerField: 'Title',
            template: '#cardTemplate',
            selectionType: 'Multiple'
        },
        swimlaneSettings: {
            keyField: 'Assignee',
        },
        dialogSettings: {
            fields: [
                { text: 'ID', key: 'Title', type: 'TextBox' },
                { key: 'Status', type: 'DropDown' },
                { key: 'Assignee', type: 'DropDown' },
                { key: 'RankId', type: 'TextBox' },
                { key: 'Summary', type: 'TextArea' }
            ]
        },
        cardRendered: (args: CardRenderedEventArgs) => {
            let val: string = (<{[key: string]: Object}>(args.data)).Priority as string;
            addClass([args.element], val);
        }
    });
    kanbanObj.appendTo('#Kanban'); //Render initialized Kanban control

    (window as TemplateFunction).getTags = (data: string) => {
        let tagDiv: string = '';
        let tags: string[] = data.split(',');
        for (let tag of tags) {
            tagDiv += '<div class="e-card-tag-field e-tooltip-text">' + tag + '</div>';
        }
        return tagDiv;
    };

    (window as TemplateFunction).getString = (assignee: string) => {
        return assignee.match(/\b(\w)/g).join('').toUpperCase();
    };
};