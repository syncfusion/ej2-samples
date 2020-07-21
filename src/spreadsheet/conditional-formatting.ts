import { loadCultureFiles } from '../common/culture-loader';
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';
import * as dataSource from './conditional-formatting-data.json';

/**
 * Conditional Formatting
 */
// custom code start
/* tslint:disable:max-func-body-length */
// custom code end
(window as any).default = (): void => {
    loadCultureFiles();

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
                { type: 'LessThan', cFColor: 'RedFT', value: '8/30/2019', range: 'F3:F18' }
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
                width: 97
            },
            {
                width: 73
            }]
        },  ],
        openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open',
        saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save',
        created: () => {
            spreadsheet.merge('A1:G1');
            spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A2:G2');
            spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', fontSize: '13pt' }, 'A1:G1');
            spreadsheet.conditionalFormat({ type: 'BlueDataBar', range: 'D3:D18' });
            spreadsheet.conditionalFormat({ type: 'OrangeDataBar', range: 'E3:E18' });
            spreadsheet.conditionalFormat({ type: 'ThreeStars', range: 'G3:G18' });
        }
    });
    //Render initialized Spreadsheet component
    spreadsheet.appendTo('#spreadsheet');
};
// custom code start
/* tslint:enable:max-func-body-length */
// custom code end
