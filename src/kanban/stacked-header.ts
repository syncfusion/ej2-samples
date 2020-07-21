import { loadCultureFiles } from '../common/culture-loader';
import { Kanban } from '@syncfusion/ej2-kanban';
import { extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';
/**
 * Kanban Stacked Header Sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // To maintain the property changes, extend the object.
    let data: Object[] = <Object[]>extend([], (dataSource as any).kanbanData, null, true);
    let kanbanObj: Kanban = new Kanban({ //Initialize Kanban control
        dataSource: data,
        keyField: 'Status',
        columns: [
            { headerText: 'Open', keyField: 'Open' },
            { headerText: 'In Progress', keyField: 'InProgress' },
            { headerText: 'In Review', keyField: 'Review' },
            { headerText: 'Completed', keyField: 'Close' }
        ],
        cardSettings: {
            contentField: 'Summary',
            headerField: 'Id',
        },
        stackedHeaders: [
            { text: 'To Do', keyFields: 'Open' },
            { text: 'Development Phase', keyFields: 'InProgress, Review' },
            { text: 'Done', keyFields: 'Close' }
        ],
    });
    kanbanObj.appendTo('#Kanban'); //Render initialized Kanban control
};