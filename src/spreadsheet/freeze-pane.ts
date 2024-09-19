import { loadCultureFiles } from '../common/culture-loader';
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';
import * as dataSource from './freeze-pane-data.json';

/**
 * Freeze pane sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let spreadsheet: Spreadsheet = new Spreadsheet({
        sheets: [
            {
                name: 'Gross Salary',
                ranges: [{ dataSource: (dataSource as any).defaultData, startCell: 'A2' }],
                rows: [
                    {
                        cells: [
                            {
                                index: 1, value: 'Period', style: {
                                    fontSize: '12pt', fontWeight: 'bold',
                                    textAlign: 'center', verticalAlign: 'middle'
                                }
                            },
                            {
                                index: 3, value: 'Total Gross Salary', style: {
                                    fontSize: '12pt', fontWeight: 'bold',
                                    textAlign: 'center', verticalAlign: 'middle'
                                }
                            },
                        ]
                    },
                    {
                        index: 26,
                        cells: [
                            {
                                index: 13, value: 'Total Amount', style: {
                                    fontSize: '12pt', fontWeight: 'bold',
                                    textAlign: 'center', verticalAlign: 'middle'
                                }
                            },
                            {
                                formula: '=SUM(O4:O26)', style: {
                                    fontSize: '12pt', fontWeight: 'bold', textAlign: 'center',
                                    verticalAlign: 'middle'
                                }
                            },
                            {
                                formula: '=SUM(P4:P26)', style: {
                                    fontSize: '12pt', fontWeight: 'bold', textAlign: 'center',
                                    verticalAlign: 'middle'
                                }
                            },
                        ]
                    }
                ],
                columns: [
                    { width: 80 }, { width: 80 }, { width: 100 }, { width: 100 },
                    { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 },
                    { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 },
                    { width: 80 }, { width: 100 }, { width: 100 }, { width: 100 }
                ],
                selectedRange: 'C1',
                // Specifies the number of frozen rows
                frozenRows: 2,
                // Specifies the number of frozen columns
                frozenColumns: 2
            }],
        openUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/open',
        saveUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/save',
        created: (): void => {
            spreadsheet.merge('A1:B1');
            spreadsheet.merge('C1:P1');
            spreadsheet.cellFormat({ backgroundColor: '#4e4ee6', color: '#FFFFF4', fontSize: '12pt', fontWeight: 'bold'}, 'A1:P2');
            spreadsheet.cellFormat({textAlign: 'center', verticalAlign: 'middle'}, 'A1:P2');
            spreadsheet.cellFormat({ backgroundColor: '#4e4ee6', color: '#FFFFF4' }, 'A3:B26');
            spreadsheet.numberFormat('$#,##0.00', 'C2:P26');
            spreadsheet.numberFormat('$#,##0.00', 'O27:P27');
            spreadsheet.wrap('C2:P2');
        }
    });

    spreadsheet.appendTo('#spreadsheet');
};
