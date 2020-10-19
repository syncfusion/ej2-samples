import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox, TextBox } from '@syncfusion/ej2-inputs';
import { Kanban, DialogEventArgs } from '@syncfusion/ej2-kanban';
import { extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';
/**
 * Kanban Dialog Editing Sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // To maintain the property changes, extend the object.
    let data: Object[] = <Object[]>extend([], (dataSource as any).kanbanData, null, true);
    let kanbanObj: Kanban = new Kanban({ //Initialize Kanban control
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
            headerField: 'Id'
        },
        dialogSettings: {
            template: '#dialogTemplate'
        },
        dialogOpen: onDialogOpen
    });
    kanbanObj.appendTo('#Kanban');      //Render initialized Kanban control
    let statusData: string[] = ['Open', 'InProgress', 'Testing', 'Close'];
    let assigneeData: string[] = ['Nancy Davloio', 'Andrew Fuller', 'Janet Leverling',
        'Steven walker', 'Robert King', 'Margaret hamilt', 'Michael Suyama'];
    let priorityData: string[] = ['Low', 'Normal', 'Critical', 'Release Breaker', 'High'];
    function onDialogOpen(args: DialogEventArgs): void {
        if (args.requestType !== 'Delete') {
            let curData: { [key: string]: Object } = args.data as { [key: string]: Object };
            let filledTextBox: TextBox = new TextBox({});
            filledTextBox.appendTo(args.element.querySelector('#Id') as HTMLInputElement);
            let numericObj: NumericTextBox = new NumericTextBox({
                value: curData.Estimate as number, placeholder: 'Estimate'
            });
            numericObj.appendTo(args.element.querySelector('#Estimate') as HTMLInputElement);
            let statusDropObj: DropDownList = new DropDownList({
                value: curData.Status as string, popupHeight: '300px',
                dataSource: statusData, fields: { text: 'Status', value: 'Status' }, placeholder: 'Status'
            });
            statusDropObj.appendTo(args.element.querySelector('#Status') as HTMLInputElement);
            let assigneeDropObj: DropDownList = new DropDownList({
                value: curData.Assignee as string, popupHeight: '300px',
                dataSource: assigneeData, fields: { text: 'Assignee', value: 'Assignee' }, placeholder: 'Assignee'
            });
            assigneeDropObj.appendTo(args.element.querySelector('#Assignee') as HTMLInputElement);
            let priorityObj: DropDownList = new DropDownList({
                value: curData.Priority as string, popupHeight: '300px',
                dataSource: priorityData, fields: { text: 'Priority', value: 'Priority' }, placeholder: 'Priority'
            });
            priorityObj.appendTo(args.element.querySelector('#Priority') as HTMLInputElement);
            let textareaObj: TextBox = new TextBox({
                placeholder: 'Summary',
                multiline: true
            });
            textareaObj.appendTo(args.element.querySelector('#Summary') as HTMLInputElement);
        }
    }
    let count: number = 31;
    document.getElementById('addNew').onclick = (e: Event): void => {
        let curData: Object = {
            Id: 'Task ' + count, Status: 'Open', Priority: 'Normal', Assignee: 'Andrew Fuller', Estimate: 0, Tags: '', Summary: ''
        };
        kanbanObj.openDialog('Add', curData);
        count++;
    };
};