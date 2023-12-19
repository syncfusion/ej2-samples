import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Filter, Sort, Edit, Resize, Toolbar, Aggregate, ColumnChooser, ExcelExport, PdfExport, ColumnMenu, Group } from '@syncfusion/ej2-grids';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Browser } from '@syncfusion/ej2-base';
import { orderData } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

Grid.Inject(Page, Filter, Sort, Edit, Resize, Toolbar, Aggregate, ColumnChooser, ExcelExport, PdfExport, ColumnMenu, Group);

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
            showColumnChooser: true,
            showColumnMenu: true,
            allowPaging: true,
            allowSorting: true,
            allowGrouping: false,
            groupSettings: { showGroupedColumn: true },
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            pageSettings: { pageCount: 3, pageSizes: true },
            allowExcelExport: true,
            allowPdfExport: true,
            height: '100%',
            load: () => {
                if (!Browser.isDevice) {
                    grid.adaptiveDlgTarget = document.getElementsByClassName('e-mobile-content')[0] as HTMLElement;
                }
                if (grid.pageSettings.pageSizes) {
                    document.querySelector('.e-adaptive-demo').classList.add('e-pager-pagesizes');
                }
                else{
                    document.querySelector('.e-adaptive-demo').classList.remove('e-pager-pagesizes');
                }
            },
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true, mode: 'Dialog' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search', 'ColumnChooser', 'ExcelExport', 'PdfExport'],
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
    grid.toolbarClick = (args: ClickEventArgs) => {
        if (args.item.id === grid.element.id + '_pdfexport') {
            grid.pdfExport();
        } else if (args.item.id === grid.element.id + '_excelexport') {
            grid.excelExport();
        }
    };

    // enable/disable vertical row direction
    let directionChange: CheckBox = new CheckBox({
        change: (e: any) => {
            grid.rowRenderingMode = e.checked ? 'Horizontal' : 'Vertical';
            grid.allowGrouping = e.checked;
        }
    });
    directionChange.appendTo('#fullscreen');
};
