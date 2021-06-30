import { loadCultureFiles } from '../common/culture-loader';
import { SheetModel, Spreadsheet } from '@syncfusion/ej2-spreadsheet';
import * as dataSource from './data-validation-data.json';

/**
 * Data Validation sample
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
                dataSource: (dataSource as any).grossPay,
                startCell: 'A3'
                },
            ],
            name: 'Gross Pay',
            rows: [{
                        cells: [{ value: 'Gross Pay Calculation',
                        style: { fontSize: '20pt', fontWeight : 'bold', textAlign: 'center', backgroundColor: '#B3FFB3',
                        verticalAlign: 'middle'} }]
                    },
                    {
                        index: 13,
                        cells: [{
                            index: 7, value: 'Total Gross',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold'} },
                        {
                            index: 8, formula: '=Sum(I4:I13)', format: '$#,##0.00',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold'}
                        }]
                    }
            ],
            columns: [
                { width: 88,  }, { width: 120 }, { width: 106 }, { width: 98 }, { width: 110 },
                { width: 110 }, { width: 110 }, { width: 98}, { width: 130}
            ]
        }  ];

    //Initialize the SpreadSheet control
    let spreadsheet: Spreadsheet = new Spreadsheet({
        sheets: sheet,
        created: () => {
            spreadsheet.merge('A1:I2');
            spreadsheet.setBorder({ border: '1px solid #A6A6A6' }, 'A1:I13');
            spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle'}, 'A3:I13');
            spreadsheet.cellFormat({ backgroundColor: '#B3FFB3', fontWeight : 'bold'}, 'A3:I3');
            spreadsheet.numberFormat('$#,##0.00', 'H4:I13');
            spreadsheet.wrap('H3:I3');
            //Add Data validation to range.
            spreadsheet.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '9', ignoreBlank: false }, 'G4:G13');
            spreadsheet.addDataValidation({ type: 'TextLength', operator: 'GreaterThan', value1: '3', ignoreBlank: false }, 'B4:B13');
            spreadsheet.addDataValidation({ type: 'Time', operator: 'GreaterThan', value1: '8:00:00 AM', ignoreBlank: false  }, 'E4:E13');
            spreadsheet.addDataValidation({ type: 'Time', operator: 'LessThan', value1: '6:00:00 PM', ignoreBlank: false  }, 'F4:F13');
            spreadsheet.addDataValidation({ type: 'List', value1: 'Mon, Tue, Wed, Thu, Fri', ignoreBlank: false  }, 'D4:D13');
            //Highlight Invalid Data.
            spreadsheet.addInvalidHighlight('G4:G13');
        }
    });

    spreadsheet.appendTo('#spreadsheet');
};
// custom code start
/* tslint:enable:max-func-body-length */
// custom code end
