import { loadCultureFiles } from '../common/culture-loader';
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';
import * as dataSource from './sorting-and-filtering-data.json';

/**
 * Sorting and Filtering
 */
// custom code start
/* tslint:disable:max-func-body-length */
// custom code end
(window as any).default = (): void => {
    loadCultureFiles();

    //Initialize Spreadsheet component.
    let spreadsheet: Spreadsheet = new Spreadsheet({
        sheets: [{
            ranges: [{
                dataSource: (dataSource as any).sortingAndFiltering,
                showFieldAsHeader: true
            }],
            columns: [{
                width: 110
            },
            {
                width: 142
            },
            {
                width: 80
            },
            {
                width: 137
            },
            {
                width: 122
            },
            {
                width: 92
            },
            {
                width: 124
            }]
        }],
        openUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/open',
        saveUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/save',
        created: () => {
            spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:G1');
            // Sorted B(Employee Name field) column in ascending order
            spreadsheet.sort({ sortDescriptors: { field: 'B' } }, 'A2:G51').then(() => {
                // Filtered D(Department  field) column with value 'Services'
                spreadsheet.applyFilter([{ field: 'D', operator: 'equal', value: 'Services' }], 'A1:G51');
            });
        }
    });
    //Render initialized Spreadsheet component
    spreadsheet.appendTo('#spreadsheet');
};
// custom code start
/* tslint:enable:max-func-body-length */
// custom code end
