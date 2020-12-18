import { loadCultureFiles } from '../common/culture-loader';
import { Kanban } from '@syncfusion/ej2-kanban';
import { extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';
/**
 * Kanban Default Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    interface TemplateFunction extends Window {
        getTags?: Function;
        getString?: Function;
    }
    // To maintain the property changes, extend the object.
    let data: Object[] = <Object[]>extend([], (dataSource as any).kanbanPizzaData, null, true);
    let kanbanObj: Kanban = new Kanban({ //Initialize Kanban control
        dataSource: data,
        keyField: 'Category',
        columns: [
            { headerText: 'Order', keyField: 'Order', allowDrop: false,
                    transitionColumns: ['Ready to Serve', 'Ready to Deliver'], allowToggle: true },
            { headerText: 'Ready to Serve', keyField: 'Ready to Serve', transitionColumns: ['Served'], allowToggle: true },
            { headerText: 'Home Delivery', keyField: 'Ready to Deliver', transitionColumns: ['Delivered'], allowToggle: true },
            { headerText: 'Delivered', keyField: 'Delivered, Served', allowDrag: false, allowToggle: true }
        ],
        cardSettings: {
            headerField: 'Id',
            template: '#cardTemplate'
        }
    });
    kanbanObj.appendTo('#Kanban'); //Render initialized Kanban control

    (window as TemplateFunction).getTags = (data: string) => {
        let tagDiv: string = '';
        let tags: string[] = data.split(',');
        for (let tag of tags) {
            tagDiv += '<div class="e-card-tag-field">' + tag + '</div>';
        }
        return tagDiv;
    };
};