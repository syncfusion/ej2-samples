import { Grid, Resize, ExcelExport, PdfExport, Edit, Page, ContextMenu, Sort } from '@syncfusion/ej2-grids';
import { orderDetails } from './datasource';

Grid.Inject(Resize, ExcelExport, PdfExport, Edit, Page, ContextMenu, Sort);

/**
 * Context menu in grid sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            allowExcelExport: true,
            allowPdfExport: true,
            allowSorting: true,
            editSettings: { allowAdding: true, allowDeleting: true, allowEditing: true },
            allowPaging: true,
            contextMenuItems: ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
                'Copy', 'Edit', 'Delete', 'Save', 'Cancel',
                'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
                'LastPage', 'NextPage'],
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right', isPrimaryKey: true },
                { field: 'CustomerName', headerText: 'Customer Name' },
                { field: 'Freight', format: 'C2', textAlign: 'Right', editType: 'numericedit' },
                { field: 'ShipName', headerText: 'Ship Name', width: 200 },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150, editType: 'dropdownedit' },
                { field: 'ShipCity', headerText: 'Ship City', width: 150 }
            ]
        });
    grid.appendTo('#Grid');
};
