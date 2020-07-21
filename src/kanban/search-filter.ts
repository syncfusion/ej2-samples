import { loadCultureFiles } from '../common/culture-loader';
import { extend } from '@syncfusion/ej2-base';
import { TextBox } from '@syncfusion/ej2-inputs';
import { Query } from '@syncfusion/ej2-data';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Kanban } from '@syncfusion/ej2-kanban';
import * as dataSource from './datasource.json';
/**
 * Kanban search and filter cards sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).kanbanData, null, true);
    let kanbanObj: Kanban = new Kanban({
        dataSource: data,
        keyField: 'Status',
        columns: [
            { headerText: 'To Do', keyField: 'Open' },
            { headerText: 'In Progress', keyField: 'InProgress' },
            { headerText: 'Testing', keyField: 'Testing' },
            { headerText: 'Done', keyField: 'Close' }
        ],
        cardSettings: {
            contentField: 'Summary',
            headerField: 'Id',
        },
        swimlaneSettings: {
            keyField: 'Assignee'
        }
    });
    kanbanObj.appendTo('#Kanban');

    let priorityObj: DropDownList = new DropDownList({
        dataSource: ['None', 'High', 'Normal', 'Low'],
        index: 0,
        placeholder: 'Select a priority',
        change: change
    });
    priorityObj.appendTo('#priority_filter');

    let statusObj: DropDownList = new DropDownList({
        dataSource: [
            { id: 'None', status: 'None' },
            { id: 'To Do', status: 'Open' },
            { id: 'In Progress', status: 'InProgress' },
            { id: 'Testing', status: 'Testing' },
            { id: 'Done', status: 'Close' }
        ],
        fields: { text: 'id', value: 'status' },
        index: 0,
        placeholder: 'Select a status',
        change: change
    });
    statusObj.appendTo('#status_filter');
    let textObj: TextBox = new TextBox({
        placeholder: 'Enter search text',
        showClearButton: true
    });
    textObj.appendTo('#search_text');
    document.getElementById('reset_filter').onclick = () => {
        textObj.value = '';
        reset();
    };

    document.getElementById('search_text').onfocus = (e: Event) => {
        if ((e.target as HTMLInputElement).value === '') {
            reset();
        }
    };
    let emptyValue: boolean = true;
    document.getElementById('search_text').onkeyup = (e: KeyboardEvent) => {
        if (e.code === 'Tab' || e.code === 'Escape' || e.code === 'ShiftLeft' || (e.code === 'Backspace' && emptyValue)) {
            return;
        }
        let searchValue: string = (<HTMLInputElement>e.target).value;
        searchValue.length === 0 ? emptyValue = true : emptyValue = false;
        let searchQuery: Query = new Query();
        if (searchValue !== '') {
            searchQuery = new Query().search(searchValue, ['Id', 'Summary'], 'contains', true);
        }
        kanbanObj.query = searchQuery;
    };

    function change(args: ChangeEventArgs): void {
        let filterQuery: Query = new Query();
        if (args.value !== 'None') {
            if (args.element.id === 'priority_filter') {
                filterQuery = new Query().where('Priority', 'equal', args.value);
            } else {
                filterQuery = new Query().where('Status', 'equal', args.value);
            }
        }
        if (args.element.id === 'priority_filter') {
            statusObj.setProperties({ value: 'None' }, false);
        } else {
            priorityObj.setProperties({ value: 'None' }, false);
        }
        (kanbanObj as any).query = filterQuery;
    }
    function reset(): void {
        priorityObj.setProperties({ value: 'None' }, false);
        statusObj.setProperties({ value: 'None' }, false);
        kanbanObj.query = new Query();
    }
};
