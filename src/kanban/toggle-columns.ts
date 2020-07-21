import { loadCultureFiles } from '../common/culture-loader';
import { Kanban } from '@syncfusion/ej2-kanban';
import { extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';
/**
 * Kanban Toggle Columns Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // To maintain the property changes, extend the object.
    let data: Object[] = <Object[]>extend([], (dataSource as any).kanbanData, null, true);
    let kanbanObj: Kanban = new Kanban({ //Initialize Kanban control
        dataSource: data,
        keyField: 'Status',
        columns: [
            { headerText: 'To Do', keyField: 'Open', allowToggle: true },
            { headerText: 'In Progress', keyField: 'InProgress', allowToggle: true },
            { headerText: 'Testing', keyField: 'Testing', allowToggle: true, isExpanded: false },
            { headerText: 'Done', keyField: 'Close', allowToggle: true }
        ],
        cardSettings: {
            contentField: 'Summary',
            headerField: 'Id',
        }
    });
    kanbanObj.appendTo('#Kanban'); //Render initialized Kanban control
};