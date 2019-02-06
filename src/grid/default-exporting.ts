import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Toolbar, ExcelExport, PdfExport, Group, Aggregate } from '@syncfusion/ej2-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { orderDetails } from './data-source';

Grid.Inject(Page, Toolbar, ExcelExport, PdfExport, Group, Aggregate);
/**
 * Excel,PDF, CSV export sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let refresh: Boolean;
    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            allowExcelExport: true,
            allowPdfExport: true,
            allowPaging: true,
            allowGrouping: true,
            toolbar: ['ExcelExport', 'PdfExport', 'CsvExport'],
            groupSettings: { showDropArea: false, columns: ['ShipCountry'] },
            pageSettings: { pageCount: 5 },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right' },
                { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right' },
                { field: 'ShipCountry', visible: false, headerText: 'Ship Country', width: 150 },
                { field: 'ShipCity', visible: false, headerText: 'Ship City', width: 150 }
            ],
            aggregates: [{
                columns: [{
                    type: 'Sum',
                    field: 'Freight',
                    format: 'C2',
                    groupFooterTemplate: 'Total freight: ${Sum}'
                }]
            }],
            load: () => {
                refresh = (<any>grid).refreshing;
            },
            dataBound: () => {
                if (refresh) {
                    grid.groupColumn('ShipCountry');
                    refresh = false;
                }
            }
        });
    grid.appendTo('#Grid');
    grid.toolbarClick = (args: ClickEventArgs) => {
        if (args.item.id === 'Grid_pdfexport') {
            grid.pdfExport();
        }
        if (args.item.id === 'Grid_excelexport') {
            grid.excelExport();
        }
        if (args.item.id === 'Grid_csvexport') {
            grid.csvExport();
        }
    };
};
