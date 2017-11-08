import { Grid, Resize, ExcelExport, PdfExport, Edit, Page, ContextMenu, Sort, Group } from '@syncfusion/ej2-grids';
import { orderData } from './datasource';

Grid.Inject(Resize, ExcelExport, PdfExport, Edit, Page, ContextMenu, Sort, Group);

/**
 * Context menu in grid sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderData.slice(0, 60),
            allowExcelExport: true,
            allowPdfExport: true,
            allowGrouping: true,
            allowSorting: true,
            groupSettings: { showGroupedColumn: true },
            editSettings: { allowAdding: true, allowDeleting: true, allowEditing: true },
            allowPaging: true,
            contextMenuItems: ['sortAscending', 'sortDescending', 'group', 'ungroup',
                'autoFit', 'autoFitAll', 'copy', 'edit', 'delete', 'save', 'cancel',
                'pdfExport', 'excelExport', 'csvExport', 'firstPage', 'prevPage',
                'lastPage', 'nextPage'],
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 200, maxWidth: 300, textAlign: 'right', isPrimaryKey: true },
                { field: 'CustomerName', headerText: 'Customer Name', width: 200 },
                { field: 'Freight', width: 150, format: 'C2', textAlign: 'right', editType: 'numericedit' },
                { field: 'ShipName', headerText: 'Ship Name', width: 300 },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 200 },
                { field: 'ShipCity', headerText: 'Ship City', width: 200 }
            ]
        });
    grid.appendTo('#Grid');
};
