import { loadCultureFiles } from '../common/culture-loader';
import { extend } from '@syncfusion/ej2-base';
import { Kanban } from '@syncfusion/ej2-kanban';
import * as dataSource from './datasource.json';
/**
 * Kanban Card template Sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // To maintain the property changes, extend the object.
    let data: Object[] = <Object[]>extend([], (dataSource as any).kanbanPizzaData, null, true);
    let kanbanObj: Kanban = new Kanban({ //Initialize Kanban control
        dataSource: data,
        keyField: 'Category',
        columns: [
            { headerText: 'Menu', keyField: 'Menu' },
            { headerText: 'Order', keyField: 'Order' },
            { headerText: 'Ready to Serve', keyField: 'Ready to Serve' },
            { headerText: 'Delivered', keyField: 'Delivered,Served' }
        ],
        cardSettings: {
            headerField: 'Id',
            template: '#cardTemplate'
        },
        dialogSettings: {
            fields: [
                { text: 'ID', key: 'Id', type: 'TextBox' },
                { key: 'Category', type: 'DropDown' },
                { key: 'Title', type: 'TextBox' },
                { key: 'Size', type: 'TextBox' },
                { key: 'Description', type: 'TextArea' }
            ]
        }
    });
    kanbanObj.appendTo('#Kanban'); //Render initialized Kanban control
};