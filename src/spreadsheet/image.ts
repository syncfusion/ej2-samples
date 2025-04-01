import { loadCultureFiles } from '../common/culture-loader';
import { Spreadsheet, SheetModel } from '@syncfusion/ej2-spreadsheet';
import * as dataSource from './image-data.json';

/**
 * Image sample with import and export support.
 */
// custom code start
/* tslint:disable:max-func-body-length */
// custom code end
(window as any).default = (): void => {
    loadCultureFiles();
    let sheet: SheetModel[] = [{
        name: 'Weekly Diet Planner',
        showGridLines: false,
        selectedRange: 'B4',
        rows: [
            {
                height: 20
            },
            {
                height: 150,
                cells: [
                    //To insert image in a cell
                    // custom code start
                    /* tslint:disable:max-line-length */
                    // custom code end
                    { index: 1, image: [{ src: (dataSource as any).base64Image,
                    height: 149, width: 907, top: 20, left: 20}] }
                ]
            }, {
                height: 20
            }, {
                height: 50,
                cells: [
                    { index: 1, value: 'Weekly Diet Planner' }
                ]
            },
            {
                height: 20
            },
            {
                height: 50,
                cells: [
                    { index: 2, value: 'BREAKFAST' },
                    { value: 'LUNCH' },
                    { value: 'DINNER' },
                    { value: 'SNACKS' }
                ]
            },
            {
                height: 50,
                cells: [
                    { index: 1, value: 'S' },
                    { value: 'Bacon, Eggs and Toast' }
                ]
            },
            {
                height: 50,
                cells: [
                    { index: 1, value: 'M' },
                    { value: 'Strawberry Waffles' }
                ]
            },
            {
                height: 50,
                cells: [
                    { index: 1, value: 'T' },
                    { value: 'Pancakes and Maple Syrup' }
                ]
            },
            {
                height: 50,
                cells: [
                    { index: 1, value: 'W' },
                    { value: 'Sausage and Egg Sandwich' }
                ]
            },
            {
                height: 50,
                cells: [
                    { index: 1, value: 'T' }
                ]
            },
            {
                height: 50,
                cells: [
                    { index: 1, value: 'F' }
                ]
            },
            {
                height: 50,
                cells: [
                    { index: 1, value: 'S' }
                ]
            }
        ],
        columns: [{ width: 20 }, { width: 100 }, { width: 208 }, { width: 200 }, { width: 200 }, { width: 200 }]
    }];

    //Initialize Spreadsheet component.
    let spreadsheet: Spreadsheet = new Spreadsheet({
        sheets: sheet,
        showRibbon: false,
        showFormulaBar: false,
        openUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/open',
        saveUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/save',
        //Application level customization
        created: (): void => {
            spreadsheet.merge('B2:F2');
            spreadsheet.merge('B4:F4');
            spreadsheet.cellFormat({ fontSize: '28pt', fontFamily: 'Arial', color: '#3a3838', verticalAlign: 'middle',
            textAlign: 'center' }, 'B4');
            spreadsheet.cellFormat({ fontSize: '16pt', fontFamily: 'Calibri', color: '#757171', verticalAlign: 'middle' }, 'B6:F6');
            spreadsheet.cellFormat({ fontSize: '14pt', fontFamily: 'Calibri', color: '#757171', verticalAlign: 'middle',
            textAlign: 'center' }, 'B7:B13');
            spreadsheet.cellFormat({ fontSize: '14pt', color: '#000000', verticalAlign: 'middle' }, 'C7:F13');
            spreadsheet.setBorder({ border: '1px solid #e0e0e0' }, 'B7:F13', 'Horizontal');
            }
    });
    //Render initialized Spreadsheet component.
    spreadsheet.appendTo('#spreadsheet');
};
// custom code start
/* tslint:enable:max-func-body-length */
// custom code end
