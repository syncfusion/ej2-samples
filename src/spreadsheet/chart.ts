import { loadCultureFiles } from '../common/culture-loader';
import { Spreadsheet, getFormatFromType } from '@syncfusion/ej2-spreadsheet';
import * as dataSource from './chart-data.json';

/**
 * Chart
 */
// custom code start
/* tslint:disable:max-func-body-length */
// custom code end
(window as any).default = (): void => {
    loadCultureFiles();

    //Initialize Spreadsheet component.
    let spreadsheet: Spreadsheet = new Spreadsheet({
        sheets: [
            {
                name: 'GDP',
                ranges: [{ dataSource:  (dataSource as any).GDPData , startCell: 'A3' }],
                rows: [
                    {
                        height: 30,
                        cells: [
                            {
                                value: 'Gross Domestic Product (in trillions)',
                                style: {
                                    backgroundColor: '#e56590', color: '#fff',
                                    fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle'
                                }
                            }
                        ]
                    },
                    {
                        cells: [
                            { index: 6, chart: [{ type: 'Column', range: 'A3:E10' }] }
                        ]
                    }
                ],
                columns: [
                    { width: 80 }, { width: 75 }, { width: 75 }, { width: 75 }, { width: 75 }
                ]
            }
        ],
        openUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/open',
        saveUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/save',
        created: () => {
             // Formatting cells dynamically using cellFormat method
             spreadsheet.cellFormat({ backgroundColor: '#e56590', color: '#fff', fontWeight: 'bold', textAlign: 'center' }, 'A3:E3');
             // Applying currency format to the specified range.
             spreadsheet.numberFormat(getFormatFromType('Currency'), 'B4:E10');
             // Merging the cells from A1 to E1
             spreadsheet.merge('A1:E1');
        }
    });
    //Render initialized Spreadsheet component
    spreadsheet.appendTo('#spreadsheet');
};
// custom code start
/* tslint:enable:max-func-body-length */
// custom code end
