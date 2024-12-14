import { loadCultureFiles } from '../common/culture-loader';
import { Spreadsheet, getFormatFromType } from '@syncfusion/ej2-spreadsheet';
import * as dataSource from './conditional-formatting-data.json';

/**
 * Conditional Formatting
 */
// custom code start
/* tslint:disable:max-func-body-length */
// custom code end
(window as any).default = (): void => {
    loadCultureFiles();
    let currencyFormat: string = '$#,##0.00';
    //Initialize Spreadsheet component.
    let spreadsheet: Spreadsheet = new Spreadsheet({
        sheets: [{
            rows: [{
                height: 30,
                cells: [{
                    index: 1,
                    value: 'Inventory List',
                }]
            }],
            ranges: [{
                dataSource: (dataSource as any).conditionalFormatting,
                startCell: 'A2'
                },
            ],
            name: 'Inventory List',
            conditionalFormats: [
                { type: 'GYRColorScale', range: 'C3:C18' },
                { type: 'LessThan', cFColor: 'RedFT', value: '8-8-2019', range: 'G3:G18' }
            ],
            columns: [{
                width: 100
            },
            {
                width: 158
            },
            {
                width: 72
            },
            {
                width: 113
            },
            {
                width: 113
            },
            {
                width: 77
            },
            {
                width: 97
            },
            {
                width: 73
            }]
        },  ],
        openUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/open',
        saveUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/save',
        created: () => {
            spreadsheet.merge('A1:H1');
            spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A2:H2');
            spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', fontSize: '13pt' }, 'A1:H1');
            spreadsheet.numberFormat(currencyFormat, 'D3:D18');
            spreadsheet.numberFormat(currencyFormat, 'E3:E18');
            spreadsheet.numberFormat(currencyFormat, 'F3:F18');
            spreadsheet.numberFormat('m/d/yyyy', 'G3:G18');
            spreadsheet.conditionalFormat({ type: 'BlueDataBar', range: 'D3:D18' });
            spreadsheet.conditionalFormat({ type: 'GreenDataBar', range: 'E3:E18' });
            spreadsheet.conditionalFormat({ type: 'ThreeStars', range: 'H3:H18' });
            spreadsheet.conditionalFormat({ type: 'Top10Items', value: '1',
             format: { style: { color: '#ffffff', backgroundColor: '#009999', fontWeight: 'bold'}}, range: 'F3:F18' });
            spreadsheet.conditionalFormat({ type: 'Bottom10Items', value: '1',
             format: { style: { color: '#ffffff', backgroundColor: '#c68d53', fontWeight: 'bold'}}, range: 'F3:F18' });
        }
    });
    //Render initialized Spreadsheet component
    spreadsheet.appendTo('#spreadsheet');
};
// custom code start
/* tslint:enable:max-func-body-length */
// custom code end
