import { loadCultureFiles } from '../common/culture-loader';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
import { Grid, Toolbar, ExcelExport, PdfExport, Page, Sort } from '@syncfusion/ej2-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { productData } from './data-source';

Grid.Inject(Toolbar, ExcelExport, PdfExport, Page, Sort);
/**
 * Advanced Grid Exporting to Excel, PDF sample
 */

/* tslint:disable-next-line:no-any */
function getExcelExportProperties(): any {
    return {
        header: {
            headerRows: 7,
            rows: [
                {
                    index: 1,
                    cells: [
                        /* tslint:disable-next-line:max-line-length */
                        { index: 1, colSpan: 5, value: 'INVOICE', style: { fontColor: '#C25050', fontSize: 25, hAlign: 'Center', bold: true } }
                    ]
                },
                {
                    index: 3,
                    cells: [
                        { index: 1, colSpan: 2, value: 'Adventure Traders', style: { fontColor: '#C67878', fontSize: 15, bold: true } },
                        { index: 4, value: 'INVOICE NUMBER', style: { fontColor: '#C67878', bold: true } },
                        { index: 5, value: 'DATE', style: { fontColor: '#C67878', bold: true }, width: 150 }
                    ]
                },
                {
                    index: 4,
                    cells: [
                        { index: 1, colSpan: 2, value: '2501 Aerial Center Parkway' },
                        { index: 4, value: 2034 },
                        { index: 5, value: date, width: 150 }
                    ]
                },
                {
                    index: 5,
                    cells: [
                        { index: 1, colSpan: 2, value: 'Tel +1 888.936.8638 Fax +1 919.573.0306' },
                        { index: 4, value: 'CUSOTMER ID', style: { fontColor: '#C67878', bold: true } },
                        { index: 5, value: 'TERMS', width: 150, style: { fontColor: '#C67878', bold: true } }
                    ]
                },
                {
                    index: 6,
                    cells: [
                        { index: 4, value: 564 },
                        { index: 5, value: 'Net 30 days', width: 150 }
                    ]
                }
            ]
        },

        footer: {
            footerRows: 5,
            rows: [
                /* tslint:disable-next-line:max-line-length */
                { cells: [{ colSpan: 6, value: 'Thank you for your business!', style: { fontColor: '#C67878', hAlign: 'Center', bold: true } }] },
                { cells: [{ colSpan: 6, value: '!Visit Again!', style: { fontColor: '#C67878', hAlign: 'Center', bold: true } }] }
            ]
        },
        fileName: 'exceldocument.xlsx'
    };
}
/* tslint:disable-next-line:no-any */
function getPdfExportProperties(): any {
    return {
        header: {
            fromTop: 0,
            height: 120,
            contents: [
                {
                    type: 'Text',
                    value: 'INVOICE',
                    position: { x: 280, y: 0 },
                    style: { textBrushColor: '#C25050', fontSize: 25 },
                },
                {
                    type: 'Text',
                    value: 'INVOICE NUMBER',
                    position: { x: 500, y: 30 },
                    style: { textBrushColor: '#C67878', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'Date',
                    position: { x: 600, y: 30 },
                    style: { textBrushColor: '#C67878', fontSize: 10 },
                }, {
                    type: 'Text',
                    value: '223344',
                    position: { x: 500, y: 50 },
                    style: { textBrushColor: '#000000', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: date,
                    position: { x: 600, y: 50 },
                    style: { textBrushColor: '#000000', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'CUSTOMER ID',
                    position: { x: 500, y: 70 },
                    style: { textBrushColor: '#C67878', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'TERMS',
                    position: { x: 600, y: 70 },
                    style: { textBrushColor: '#C67878', fontSize: 10 },
                }, {
                    type: 'Text',
                    value: '223',
                    position: { x: 500, y: 90 },
                    style: { textBrushColor: '#000000', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'Net 30 days',
                    position: { x: 600, y: 90 },
                    style: { textBrushColor: '#000000', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'Adventure Traders',
                    position: { x: 20, y: 30 },
                    style: { textBrushColor: '#C67878', fontSize: 20 }
                },
                {
                    type: 'Text',
                    value: '2501 Aerial Center Parkway',
                    position: { x: 20, y: 65 },
                    style: { textBrushColor: '#000000', fontSize: 11 }
                },
                {
                    type: 'Text',
                    value: 'Tel +1 888.936.8638 Fax +1 919.573.0306',
                    position: { x: 20, y: 80 },
                    style: { textBrushColor: '#000000', fontSize: 11 }
                },
            ]
        },
        footer: {
            fromBottom: 160,
            height: 100,
            contents: [
                {
                    type: 'Text',
                    value: 'Thank you for your business !',
                    position: { x: 250, y: 20 },
                    style: { textBrushColor: '#C67878', fontSize: 14 }
                },
                {
                    type: 'Text',
                    value: '! Visit Again !',
                    position: { x: 300, y: 45 },
                    style: { textBrushColor: '#C67878', fontSize: 14 }
                }
            ]
        },
        fileName: 'pdfdocument.pdf'
    };
}
let date : string = '';
date += ((new Date()).getMonth().toString()) + '/' + ((new Date()).getDate().toString());
date += '/' + ((new Date()).getFullYear().toString());
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid({
        dataSource: productData,
        allowExcelExport: true,
        allowPdfExport: true,
        allowPaging: true,
        pageSettings: { pageCount: 2, pageSize: 10 },
        allowSorting: true,
        toolbar: ['ExcelExport', 'PdfExport'],
        columns: [
            { field: 'ProductID', headerText: 'Product ID', textAlign: 'Right', width: 120 },
            { field: 'ProductName', headerText: 'Product Name', width: 200 },
            { field: 'QuantityPerUnit', headerText: 'Quantity Per Unit', width: 145 },
            { field: 'UnitsInStock', headerText: 'Units In Stock', textAlign: 'Right', width: 140 },
            { field: 'UnitPrice', headerText: 'Unit Price', textAlign: 'Right', width: 140, format: 'C2' },
        ]
    });
    grid.appendTo('#Grid');
    grid.toolbarClick = (args: ClickEventArgs) => {
        if (args.item.id === 'Grid_excelexport') {
            grid.excelExport(getExcelExportProperties());
        }
        if (args.item.id === 'Grid_pdfexport') {
            grid.pdfExport(getPdfExportProperties());
        }
    };
};