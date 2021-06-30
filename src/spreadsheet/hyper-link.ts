import { loadCultureFiles } from '../common/culture-loader';
import { CellStyleModel, SheetModel, Spreadsheet } from '@syncfusion/ej2-spreadsheet';
import * as dataSource from './hyper-link-data.json';
/**
 * Conditional Formatting
 */
// custom code start
/* tslint:disable:max-func-body-length */
// custom code end
(window as any).default = (): void => {
    loadCultureFiles();

    //Initialize Spreadsheet component.
    let sheet: SheetModel[] = [
        {
            ranges: [{
                dataSource: (dataSource as any).hyperlinkCart,
                startCell: 'B3'
                },
            ],
            name: 'Cart',
            rows: [
                {
                    cells: [{ value: 'Shopping Cart', style: {
                            fontSize: '20pt', fontWeight: 'bold',
                            textAlign: 'center', backgroundColor: '#279377', verticalAlign: 'middle', color: '#ffffff'
                        }
                    }]
                },
                {
                    index: 2,
                    cells: [{ value: 'Product Id' }]
                },
                {
                    cells: [{ value: 'AG940Z', hyperlink: 'Stock!A2:D2' }]
                },
                {
                    cells: [{ value: 'BJ120K', hyperlink: 'Stock!A3:D3' }]
                },
                {
                    cells: [{ value: 'BC120M', hyperlink: 'Stock!A4:D4' }]
                },
                {
                    cells: [{ value: 'BS121L', hyperlink: 'Stock!A5:D5' }]
                },
                {
                    cells: [{ value: 'BU121K', hyperlink: 'Stock!A6:D6' }]
                },
                {
                    cells: [{ value: 'BD121M', hyperlink: 'Stock!A7:D7' }]
                },
                {
                    cells: [{ value: 'AT992X', hyperlink: 'Stock!A8:D8' }]
                },
                {
                    cells: [{ value: 'AP992Z', hyperlink: 'Stock!A9:D9' }]
                },
                {
                    cells: [{ value: 'AW920X', hyperlink: 'Stock!A10:D10' }]
                },
                {
                    cells: [{
                        index: 4, value: 'Total Amount', style: { border: '1px solid #A6A6A6', fontWeight: 'bold',
                            textAlign: 'center', verticalAlign: 'middle' }
                    },
                    {
                        index: 5, formula: '=Sum(F4:F12)', format: '$#,##0.00', style: {
                            border: '1px solid #A6A6A6',
                            textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold'
                        }
                    }]
                }
            ],
            columns: [
                { width: 88, }, { width: 120 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 110 }
            ]
        },
        {
            ranges: [{ dataSource: (dataSource as any).hyperlinkStock }],
            name: 'Stock',
            rows: [
                {
                    cells: [
                    { index: 4, value: 'Place Order' }]
                },
                {
                    cells: [
                    { index: 4, value: 'Amazon', hyperlink: 'https://www.amazon.com/' }]
                },
                {
                    cells: [
                    { index: 4, value: 'EBay', hyperlink: 'https://www.ebay.com/' }]
                },
                {
                    cells: [
                    { index: 4, value: 'Amazon', hyperlink: 'https://www.amazon.com/' }]
                },
                {
                    cells: [
                    { index: 4, value: 'Amazon', hyperlink: 'https://www.amazon.com/' }]
                },
                {
                    cells: [
                    { index: 4, value: 'EBay', hyperlink: 'https://www.ebay.com/' }]
                },
                {
                    cells: [
                    { index: 4, value: 'EBay', hyperlink: 'https://www.ebay.com/' }]
                },
                {
                    cells: [
                    { index: 4, value: 'Amazon', hyperlink: 'https://www.amazon.com/' }]
                },
                {
                    cells: [
                    { index: 4, value: 'EBay', hyperlink: 'https://www.ebay.com/' }]
                },
                {
                    cells: [
                    { index: 4, value: 'Amazon', hyperlink: 'https://www.amazon.com/' }]
                }
            ],
            columns: [
                { width: 88, }, { width: 88 }, { width: 88 }, { width: 88 }, { width: 88 }
            ]
        }
    ];

    let styles: CellStyleModel = { fontWeight: 'bold', textAlign: 'center', backgroundColor: '#279377', color: '#ffffff' };
    //Initialize the SpreadSheet control
    let spreadsheet: Spreadsheet = new Spreadsheet({
        sheets: sheet,
        created: () => {
            spreadsheet.merge('Cart!A1:F2');
            spreadsheet.numberFormat('$#,##0.00', 'Cart!E4:F12');
            spreadsheet.setBorder({ border: '1px solid #A6A6A6' }, 'Cart!A1:F12');
            spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'A1:F12');
            spreadsheet.cellFormat(styles, 'Cart!A3:F3');
            spreadsheet.cellFormat(styles, 'Stock!A1:E1');
            spreadsheet.wrap('Stock!B1:D1');
            spreadsheet.setBorder({ border: '1px solid #A6A6A6' }, 'Stock!A1:E10');
            spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'Stock!A1:E11');
        }
    });

    spreadsheet.appendTo('#spreadsheet');
};
// custom code start
/* tslint:enable:max-func-body-length */
// custom code end
