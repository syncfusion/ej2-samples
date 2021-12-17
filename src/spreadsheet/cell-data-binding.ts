import { loadCultureFiles } from '../common/culture-loader';
import { Spreadsheet, getFormatFromType } from '@syncfusion/ej2-spreadsheet';

/**
 * Cell Data Binding sample
 */
// custom code start
/* tslint:disable:max-func-body-length */
// custom code end
(window as any).default = (): void => {
    loadCultureFiles();
    //Initialize Spreadsheet component
    let currencyFormat: string = getFormatFromType('Currency');
    let spreadsheet: Spreadsheet = new Spreadsheet({
        showRibbon: false,
        showFormulaBar: false,
        sheets: [
            {
                name: 'Monthly Budget',
                selectedRange: 'D13',
                rows: [
                    {
                        cells: [
                            { value: 'Category', style: { fontWeight: 'bold', textAlign: 'center' } },
                            { value: 'Planned cost', style: { fontWeight: 'bold', textAlign: 'center' } },
                            { value: 'Actual cost', style: { fontWeight: 'bold', textAlign: 'center' } },
                            { value: 'Difference', style: { fontWeight: 'bold', textAlign: 'center' } }
                        ]
                    },
                    {
                        cells: [
                            { value: 'Food' },
                            { value: '$7000' },
                            { value: '$8120' },
                            { formula: '=B2-C2', format: '$#,##0.00' }
                        ]
                    },
                    {
                        cells: [
                            { value: 'Loan' },
                            { value: '$1500' },
                            { value: '$1500' },
                            { formula: '=B3-C3', format: getFormatFromType('Currency') }
                        ]
                    },
                    {
                        cells: [
                            { value: 'Medical' },
                            { value: '$300' },
                            { value: '$0' },
                            { formula: '=B4-C4', format: currencyFormat }
                        ]
                    },
                    {
                        cells: [
                            { value: 'Clothing' },
                            { value: '$400' },
                            { value: '$140' },
                            { formula: '=B5-C5', format: currencyFormat }
                        ]
                    },
                    {
                        cells: [
                            { value: 'Education' },
                            { value: '$900' },
                            { value: '$750' },
                            { formula: '=B6-C6', format: currencyFormat }
                        ]
                    },
                    {
                        cells: [
                            { value: 'Insurance' },
                            { value: '$30' },
                            { value: '$30' },
                            { formula: '=B7-C7', format: currencyFormat }
                        ]
                    },
                    {
                        cells: [
                            { value: 'Utilities' },
                            { value: '$130' },
                            { value: '$160' },
                            { formula: '=B8-C8', format: currencyFormat }
                        ]
                    },
                    {
                        cells: [
                            { value: 'Enterainment' },
                            { value: '$500' },
                            { value: '$730' },
                            { formula: '=B9-C9', format: currencyFormat }
                        ]
                    },
                    {
                        cells: [
                            { value: 'Maintainance' },
                            { value: '$50' },
                            { value: '$70' },
                            { formula: '=B10-C10', format: currencyFormat }
                        ]
                    },
                    {
                        cells: [
                            { value: 'Transportation' },
                            { value: '$250' },
                            { value: '$400' },
                            { formula: '=B11-C11', format: currencyFormat }
                        ]
                    },
                    {
                        cells: [
                            { value: 'Gifts/Donations' },
                            { value: '$0' },
                            { value: '$100' },
                            { formula: '=B12-C12', format: currencyFormat }
                        ]
                    },
                    {
                        cells: [
                            { index: 2, value: 'Total Difference:', style: { fontWeight: 'bold', textAlign: 'right' } },
                            { formula: '=D2+D12', format: currencyFormat, style: { fontWeight: 'bold' } }
                        ]
                    }
                ],
                columns: [
                    { width: 110 }, { width: 115 }, { width: 110 }, { width: 100 }
                ]
            }
        ]
    });

    //Render initialized Spreadsheet component
    spreadsheet.appendTo('#spreadsheet');
};
