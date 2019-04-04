import { loadCultureFiles } from '../common/culture-loader';
import { Grid, DetailRow, Toolbar, PdfExport, ExcelExport } from '@syncfusion/ej2-grids';
import { employeeData, customerData, hierarchyOrderdata } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

Grid.Inject(DetailRow, Toolbar, PdfExport, ExcelExport);
/**
 * Hierarchy export Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let grid: Grid = new Grid({
        dataSource: employeeData,
        toolbar: [ 'PdfExport', 'ExcelExport'],
        allowPdfExport: true,
        allowExcelExport : true,
        toolbarClick: (args: ClickEventArgs) => {
            if (args.item.id === 'Grid_excelexport') {
                grid.excelExport({hierarchyExportMode: 'All'});
            }
            if (args.item.id === 'Grid_pdfexport') {
                grid.pdfExport({hierarchyExportMode: 'All'});
            }
        },
        columns: [
            { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 125 },
            { field: 'FirstName', headerText: 'Name', width: 125 },
            { field: 'Title', headerText: 'Title', width: 180 },
            { field: 'City', headerText: 'City', width: 110 }
        ],
        childGrid: {
            dataSource: hierarchyOrderdata,
            queryString: 'EmployeeID',
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
                { field: 'ShipCity', headerText: 'Ship City', width: 120 },
                { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2'},
                { field: 'ShipName', headerText: 'Ship Name', width: 150 }
            ],
            childGrid: {
                dataSource: customerData,
                queryString: 'CustomerID',
                columns: [
                    { field: 'CustomerID', headerText: 'Customer ID', textAlign: 'Right', width: 75 },
                    { field: 'Phone', headerText: 'Phone', width: 100 },
                    { field: 'Address', headerText: 'Address', width: 120 },
                    { field: 'Country', headerText: 'Country', width: 100 }
                ]
            }
        }
    });
    grid.appendTo('#Grid');
};
