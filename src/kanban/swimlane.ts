import { loadCultureFiles } from '../common/culture-loader';
import { Kanban, SortDirection } from '@syncfusion/ej2-kanban';
import { extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs, CheckBox } from '@syncfusion/ej2-buttons';
import { DropDownList, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-dropdowns';
import * as dataSource from './datasource.json';
/**
 * Swimlane Sample
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
            { headerText: 'Done', keyField: 'Close' }
        ],
        cardSettings: {
            contentField: 'Summary',
            headerField: 'Id',
        },
        swimlaneSettings: {
            keyField: 'Assignee'
        },
        height: '500px'
    });
    kanbanObj.appendTo('#Kanban'); //Render initialized Kanban control
    new CheckBox({ checked: false, change: onChange }, '#acrossDragAndDrop');
    new CheckBox({ checked: false, change: onChange }, '#emptyRow');
    new CheckBox({ checked: true, change: onChange }, '#itemCount');
    new CheckBox({ change: onChange }, '#frozenRows');
    //Initialize DropDownList control
    let sortOrder: DropDownList = new DropDownList({
        width: '100%',
        change: changeSortOrder
    });
    //Render initialized DropDownList control
    sortOrder.appendTo('#sort');
    function onChange(args: ChangeEventArgs): void {
        let value: string = this.element.id;
        switch (value) {
            case 'acrossDragAndDrop':
                kanbanObj.swimlaneSettings.allowDragAndDrop = args.checked;
                break;
            case 'emptyRow':
                kanbanObj.swimlaneSettings.showEmptyRow = args.checked;
                break;
            case 'itemCount':
                kanbanObj.swimlaneSettings.showItemCount = args.checked;
                break;
            case 'frozenRows':
                kanbanObj.swimlaneSettings.enableFrozenRows = args.checked;
                break;
            default:
                break;
        }
    }
    function changeSortOrder(args: DropDownChangeArgs): void {
        let sortDirection: SortDirection = args.itemData.value as SortDirection;
        kanbanObj.swimlaneSettings.sortDirection = sortDirection;
    }
};