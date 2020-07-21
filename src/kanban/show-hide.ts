import { loadCultureFiles } from '../common/culture-loader';
import { Kanban } from '@syncfusion/ej2-kanban';
import { extend } from '@syncfusion/ej2-base';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import * as dataSource from './datasource.json';
/**
 * Kanban Show Hide Sample
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
            { headerText: 'In Review', keyField: 'Review' },
            { headerText: 'Done', keyField: 'Close' }
        ],
        cardSettings: {
            contentField: 'Summary',
            headerField: 'Id',
        }
    });
    kanbanObj.appendTo('#Kanban'); //Render initialized Kanban control
    new CheckBox({ label: 'To Do', checked: true, change: onChange }, '#Open');
    new CheckBox({ label: 'In Progress', checked: true, change: onChange }, '#InProgress');
    new CheckBox({ label: 'In Review', checked: true, change: onChange }, '#Review');
    new CheckBox({ label: 'Done', checked: true, change: onChange }, '#Close');
    function onChange(args: ChangeEventArgs): void {
        if (args.checked) {
            kanbanObj.showColumn(this.element.id);
        } else {
            kanbanObj.hideColumn(this.element.id);
        }
    }
};