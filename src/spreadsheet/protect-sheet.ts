import { loadCultureFiles } from '../common/culture-loader';
import { Spreadsheet, CellRenderEventArgs, getFormatFromType } from '@syncfusion/ej2-spreadsheet';
import * as dataSource from './protect-sheet-data.json';

/**
 * Cell template
 */
// custom code start
/* tslint:disable:max-func-body-length */
// custom code end
(window as any).default = (): void => {
    loadCultureFiles();

    //Initialize Spreadsheet component
    let spreadsheet: Spreadsheet = new Spreadsheet({
        // To protect the workbook
        password: 'spreadsheet',
        sheets: [{
            isProtected: true,
            name: 'EMI Calculator',
            rows: [{
                cells: [{
                    index: 1,
                    value: 'Home Loan Calculator',
                    style: {
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }
                }]
            }, {
                cells: [{
                    index: 1,
                    value: 'Loan Amount:'
                }, {
                    value: '100000',
                    format: getFormatFromType('Currency')
                }]
            }, {
                cells: [{
                    index: 1,
                    value: 'Interest Rate:'
                }, {
                    value: '0.08',
                    format: getFormatFromType('Percentage')
                }]
            }, {
                cells: [{
                    index: 1,
                    value: 'Periods (terms in year):'
                }, {
                    value: '1'
                }]
            }, {
                cells: [{
                    index: 1,
                    value: 'Start Date:'
                }, {
                    value: '03-03-2020'
                }]
            }, {
                cells: [{
                    index: 1,
                    value: 'Loan EMI:'
                }, {
                    value: '8698.84',
                    format: getFormatFromType('Currency')
                }]
            }, {
                cells: [{
                    index: 1,
                    value: 'Number of Payments:'
                }, {
                    value: '12'
                }]
            }, {
                cells: [{
                    index: 1,
                    value: 'Total Repayment Amount:'
                }, {
                    value: '104386.11',
                    format: getFormatFromType('Currency')
                }]
            }, {
                cells: [{
                    index: 1,
                    value: 'Total Interest Amount:'
                }, {
                    value: '4386.11',
                    format: getFormatFromType('Currency')
                }]
            }],
            columns: [{
                index: 1,
                width: 190
            }, {
                width: 100
            }]
        }, {
            isProtected: true,
            name: 'EMI Schedule',
            ranges: [{
                dataSource: (dataSource as any).protectSheet,
                showFieldAsHeader: true
            }],
            columns: [{
                index: 1,
                width: 110
            }, {
                width: 85
            }, {
                width: 85
            }, {
                width: 80
            }, {
                width: 90
            }]
        }],
        openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open',
        saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save',
        created: () => {
            //Applied style and number formatting to a range
            spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'EMI Schedule!A1:F1');
            spreadsheet.numberFormat(getFormatFromType('Currency'), 'EMI Schedule!C2:F13');
        },
        beforeCellRender: (args: CellRenderEventArgs) => {
            //Merged cells using custom code
            if (spreadsheet.activeSheetIndex === 0 && args.address === 'B1') {
                (args.element as HTMLTableCellElement).colSpan = 2;
            }
        }
    });
    //Render initialized Spreadsheet component
    spreadsheet.appendTo('#spreadsheet');
};
// custom code start
/* tslint:enable:max-func-body-length */
// custom code end
