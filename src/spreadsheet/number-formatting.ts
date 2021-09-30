import { loadCultureFiles } from '../common/culture-loader';
import { Spreadsheet, SheetModel, getFormatFromType } from '@syncfusion/ej2-spreadsheet';
import * as dataSource from './number-formatting-data.json';

/**
 * Number Format.
 */
// custom code start
/* tslint:disable:max-func-body-length */
// custom code end
(window as any).default = (): void => {
    loadCultureFiles();
    let sheet: SheetModel[] = [{
        name: 'Restaurant Invoice',
        rows: [
            {
                cells: [
                    { value: 'Customer Name' },
                    { value: 'Cristi Espinos' },
                    { index: 3, value: 'Waiter Name' },
                    { value: 'Raye Whines' },
                ], height: 30
            }, {
                cells: [
                    { value: 'Table No.' },
                    { value: '8' },
                    { index: 3, value: 'Date' },
                    { value: '5/7/2019' },
                ], height: 30
            }, {
                index: 14, cells: [
                    { index: 1, value: 'Subtotal:' },
                    { index: 4, formula: '=SUBTOTAL(9,E4:E14)', format: '$#,##0.00' }
                ],
            },
            {
                cells: [
                    { index: 1, value: 'Discount (8%):' },
                    { index: 4, formula: '=PRODUCT(8,E15)/100', format: '$#,##0.00' }
                ],
            },
            {
                cells: [
                    { index: 1, value: 'Total Amount:', style: { fontWeight: 'bold' } },
                    {
                        index: 4, formula: '=SUM(E15-E16)',
                        format: getFormatFromType('Accounting'), style: { fontWeight: 'bold' }
                    },
                ],
            }
        ],
        columns: [{ width: 120 }, { width: 180 }, { width: 100 }, { width: 120 }, { width: 120 }],
        selectedRange: 'E17',
        ranges: [{
            dataSource: (dataSource as any).numberFormatData,
            startCell: 'A3'
        }]
    }];

    //Initialize Spreadsheet component.
    let spreadsheet: Spreadsheet = new Spreadsheet({
        sheets: sheet,
        showRibbon: false,
        showFormulaBar: false,
        created: (): void => {
            spreadsheet.cellFormat({ fontWeight: 'bold' }, 'A1:E2');
            spreadsheet.cellFormat({ textAlign: 'center', fontWeight: 'bold' }, 'A3:E3');
            spreadsheet.cellFormat({ textAlign: 'center' }, 'A4:A14');
            spreadsheet.cellFormat({ textAlign: 'center' }, 'C4:C14');
            spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, 'A4:E15');
            spreadsheet.cellFormat({ backgroundColor: '#1E88E5', color: '#F5F5F5' }, 'A1:E2');
            spreadsheet.cellFormat({ backgroundColor: '#BBDEFB' }, 'A3:E3');
            spreadsheet.cellFormat({ backgroundColor: '#B3E5FC' }, 'A15:E17');
            spreadsheet.numberFormat('$#,##0.00', 'D4:E14');
            spreadsheet.numberFormat('$#,##0.00', 'E15:E17');
            spreadsheet.numberFormat('[Red][<=350]$#,##0.00;[Blue][>350]$#,##0.00', 'E4:E14');
        }
    });
    //Render initialized Spreadsheet component.
    spreadsheet.appendTo('#spreadsheet');
};
// custom code start
/* tslint:enable:max-func-body-length */
// custom code end
