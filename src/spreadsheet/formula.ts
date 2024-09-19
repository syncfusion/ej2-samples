import { loadCultureFiles } from '../common/culture-loader';
import { Spreadsheet, SheetModel, CellStyleModel } from '@syncfusion/ej2-spreadsheet';
import * as dataSource from './formula-data.json';

/**
 * Formula sample
 */
// custom code start
/* tslint:disable:max-func-body-length */
// custom code end
(window as any).default = (): void => {
    loadCultureFiles();
    let style: CellStyleModel = { fontWeight: 'bold', backgroundColor: '#279377', color: '#fff', textAlign: 'center',
        verticalAlign: 'middle', fontSize: '14px' };
    let sheets: SheetModel[] = [{
        name: 'Stock Details',
        rows: [{
            height: 40
        },
        {
            index: 11,
            cells: [
                { index: 3, value: 'Average profit:' },
                { index: 5, formula: '=AVERAGE(Profit)', format: '0.00' },
            ],
            height: 25
        },
        {
            index: 12,
            cells: [
                { index: 3, value: 'Maximum stock value:' },
                { index: 5, formula: '=MAX(High)', format: '0.00' }
            ],
            height: 25
        },
        {
            index: 13,
            cells: [
                { index: 3, value: 'Minimum stock value:' },
                { index: 5, formula: '=MIN(E2:E11)' },
            ],
            height: 25
        }, {
            index: 14,
            cells: [
                { index: 3, value: 'Nonprofitable days:' },
                { index: 5, formula: '=COUNTIF(F2:F11,"<=0")' },
            ],
            height: 25
        }],
        columns: [{ width: 100 }, { width: 130 }, { width: 140 }, { width: 140 }, { width: 130 }, { width: 130 }],
        selectedRange: 'F15',
        ranges: [{ dataSource: (dataSource as any).formulaData }]
    }];

    //Initialize Spreadsheet component
    let spreadsheet: Spreadsheet = new Spreadsheet({
        sheets: sheets,
        showRibbon: false,
        //Initializing defined names and its range
        definedNames: [{
            name: 'Profit', refersTo: '=F2:F11'
        },
        {
            name: 'High', refersTo: '=D2:D11'
        }],
        created: (): void => {
            //Style and number formatting
            spreadsheet.cellFormat(style, 'A1:F1');
            spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#EEEEEE' }, 'A12:F15');
            spreadsheet.numberFormat('0.00', 'F2:F11');
            spreadsheet.numberFormat('m/d/yyyy', 'A2:A11');
        }
    });

    //Render initialized Spreadsheet component
    spreadsheet.appendTo('#spreadsheet');
};
// custom code start
/* tslint:enable:max-func-body-length */
// custom code end
