import { loadCultureFiles } from '../common/culture-loader';
import { Kanban } from '@syncfusion/ej2-kanban';
import { extend } from '@syncfusion/ej2-base';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import * as dataSource from './datasource.json';
/**
 * Kanban Tooltip template
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
            headerField: 'Id',
        },
        enableTooltip: true,
        tooltipTemplate: '#tooltipTemp'
    });
    kanbanObj.appendTo('#Kanban'); //Render initialized Kanban control
    new CheckBox({ label: 'Enable Tooltip', checked: true, change: onChange }, '#enableTooltip');
    new CheckBox({ label: 'Enable Tooltip Template', checked: true, change: onChange }, '#enableTooltipTemplate');
    function onChange(args: ChangeEventArgs): void {
        let value: string = this.element.id;
        switch (value) {
            case 'enableTooltip':
                kanbanObj.enableTooltip = args.checked;
                break;
            case 'enableTooltipTemplate':
                kanbanObj.tooltipTemplate = null;
                if (args.checked) {
                    kanbanObj.tooltipTemplate = '#tooltipTemp';
                }
                break;
            default:
                break;
        }
    }
};