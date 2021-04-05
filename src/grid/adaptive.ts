import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Filter, Sort, Edit, Toolbar, Aggregate } from '@syncfusion/ej2-grids';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Browser } from '@syncfusion/ej2-base';
import { orderData } from './data-source';

Grid.Inject(Page, Filter, Sort, Edit, Toolbar, Aggregate);

/**
 * Adaptive Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            rowRenderingMode: 'Vertical',
            enableAdaptiveUI: true,
            allowPaging: true,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            pageSettings: { pageCount: 3 },
            height: '100%',
            load: () => {
                if (!Browser.isDevice) {
                    grid.adaptiveDlgTarget = document.getElementsByClassName('e-mobile-content')[0] as HTMLElement;
                }
            },
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true, mode: 'Dialog' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'],
            columns: [
                {
                    field: 'OrderID', headerText: 'Order ID', width: 180, isPrimaryKey: true,
                    validationRules: { required: true, number: true }
                },
                { field: 'Freight', width: 180, format: 'C2', editType: 'numericedit', validationRules: { required: true, number: true } },
                { field: 'CustomerName', headerText: 'Name', width: 180, validationRules: { required: true } },
                { field: 'ShipCity', headerText: 'Ship City', width: 180, validationRules: { required: true } }
            ],
            aggregates: [{
                columns: [{
                    type: 'Sum',
                    field: 'Freight',
                    format: 'C2',
                    footerTemplate: 'Sum: ${Sum}'
                }]
            }]
        });
    if (Browser.isDevice) {
        grid.appendTo('#adaptivedevice');
        (document.getElementsByClassName('e-mobile-layout')[0] as HTMLElement).style.display = 'none';
    } else {
        grid.appendTo('#adaptivebrowser');
    }

    // enable/disable vertical row direction
    let directionChange: CheckBox = new CheckBox({
        change: (e: any) => {
            if (e.checked) {
                grid.rowRenderingMode = 'Horizontal';
            } else {
                grid.rowRenderingMode = 'Vertical';
            }
        }
    });
    directionChange.appendTo('#fullscreen');
};
