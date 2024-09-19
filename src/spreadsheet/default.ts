import { loadCultureFiles } from '../common/culture-loader';
import { Spreadsheet, getFormatFromType } from '@syncfusion/ej2-spreadsheet';
import * as dataSource from './default-data.json';

/**
 * Default Spreadsheet sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    //Initialize Spreadsheet component
    const spreadsheet: Spreadsheet = new Spreadsheet({
        sheets: [
            {
                name: 'Car Sales Report',
                ranges: [{ dataSource: (dataSource as any).defaultData }],
                rows: [
                    {
                        index: 30,
                        cells: [
                            { index: 4, value: 'Total Amount:', style: { fontWeight: 'bold', textAlign: 'right' } },
                            { formula: '=SUM(F2:F30)', style: { fontWeight: 'bold' } },
                        ]
                    }],
                columns: [
                    { width: 180 }, { width: 130 }, { width: 130 }, { width: 180 },
                    { width: 130 }, { width: 120 }
                ]
            }],
        openUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/open',
        saveUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/save',
        created: (): void => {
            // Apply the format to the specified range in the active sheet.
            spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'A1:F1');
            // Apply format to the specified range in the active sheet.
            // The 'getFormatFromType' method will return the format code with a culture-based currency symbol.
            // For 'en-US' (English) culture, the format code will be '$#,##0.00'.
            // For 'de' (German) culture, the format code will be '#,##0.00 "€"'.
            spreadsheet.numberFormat(getFormatFromType('Currency'), 'F2:F31');
            spreadsheet.numberFormat('m/d/yyyy', 'E2:E30');
        }
    });

    //Render initialized Spreadsheet component
    spreadsheet.appendTo('#spreadsheet');
};
