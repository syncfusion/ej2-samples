import { Grid, Toolbar, ExcelExport, PdfExport } from '@syncfusion/ej2-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { orderData, productData } from './datasource';

Grid.Inject(Toolbar, ExcelExport, PdfExport);
/**
 * Multiple Grid Exporting to Excel, PDF sample
 */
this.default = (): void => {
    let firstGrid: Grid = new Grid({
        dataSource: orderData.splice(0, 5),
        allowExcelExport: true,
        allowPdfExport: true,
        toolbar: ['excelexport', 'pdfexport'],
        columns: [
            { field: 'OrderID', headerText: 'Order ID', textAlign: 'right', width: 120, type: 'number' },
            { field: 'OrderDate', headerText: 'Order Date', textAlign: 'right', width: 140, format: 'yMd' },
            { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
            { field: 'Freight', headerText: 'Freight', textAlign: 'right', width: 120, format: 'C' },
        ],
    });

    let secondGrid: Grid = new Grid({
        dataSource: productData.splice(0, 5),
        allowExcelExport: true,
        allowPdfExport: true,
        columns: [
            { field: 'ProductID', headerText: 'Product ID', textAlign: 'right', width: 120 },
            { field: 'ProductName', headerText: 'Product Name', width: 145 },
            { field: 'UnitPrice', headerText: 'Unit Price', textAlign: 'right', width: 140, format: 'C2' },
        ],
    });
    firstGrid.appendTo('#FirstGrid');
    secondGrid.appendTo('#SecondGrid');
    firstGrid.toolbarClick = (args: ClickEventArgs) => {
        if (args.item.id === 'FirstGrid_excelexport') {
            let firstGridExcelExport: Promise<any> = firstGrid.excelExport({}, true);
            firstGridExcelExport.then((bookData: any) => {
                secondGrid.excelExport({}, false, bookData);
            });
        }
        if (args.item.id === 'FirstGrid_pdfexport') {
            let firstGridPdfExport: Promise<Object> = firstGrid.pdfExport({}, true);
            firstGridPdfExport.then((pdfData: Object) => {
                secondGrid.pdfExport({}, false, pdfData);
            });
        }
    };
};