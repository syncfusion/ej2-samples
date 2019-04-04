import { loadCultureFiles } from '../common/culture-loader';

import { PivotView, HyperCellClickEventArgs, IAxisSet, Condition, IDataSet } from '@syncfusion/ej2-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { MaskedTextBox, NumericTextBox } from '@syncfusion/ej2-inputs';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);

/**
 * PivotView Hyperlink Sample.
 */

/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let operators: string[] = ['Equals', 'NotEquals', 'GreaterThan', 'GreaterThanOrEqualTo',
        'LessThan', 'LessThanOrEqualTo', 'Between', 'NotBetween'];
    let measures: { [key: string]: Object }[] = [
        { value: 'In Stock', text: 'In Stock' },
        { value: 'Units Sold', text: 'Units Sold' },
        { value: 'Sold Amount', text: 'Sold Amount' }
    ];
    let options: { [key: string]: Object }[] = [
        { value: 'allcells', text: 'All cells' },
        { value: 'rowheader', text: 'Row headers' },
        { value: 'columnheader', text: 'Column headers' },
        { value: 'valuecells', text: 'Value cells' },
        { value: 'summarycells', text: 'Summary cells' },
        { value: 'conditional', text: 'Condition based option' },
        { value: 'headertext', text: 'Header based option' }
    ];
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            drilledMembers: [{ name: 'Country', items: ['France', 'Germany'] }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            columns: [{ name: 'Year' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            data: Pivot_Data,
            expandAll: true
        },
        hyperlinkSettings: {
            showValueCellHyperlink: true,
            cssClass: 'e-custom-class'
        },
        hyperlinkCellClick: (args: HyperCellClickEventArgs) => {
            let cell: string = '';
            if (args.currentCell.className.indexOf('e-stot') > -1 || args.currentCell.className.indexOf('e-gtot') > -1 || args.currentCell.className.indexOf('e-summary') > -1) {
                cell += 'Summary ';
            }
            if (args.currentCell.querySelector('.e-headercelldiv') && !(args.data as IAxisSet).indexObject) {
                cell += 'Value Header ';
            } else if (args.currentCell.className.indexOf('e-rowsheader') > -1) {
                cell += 'Row Header ';
            }
            else if (args.currentCell.className.indexOf('e-columnsheader') > -1) {
                cell += 'Column Header ';
            }
            else if (args.currentCell.className.indexOf('e-valuescontent') > -1) {
                cell += 'Value ';
            }
            if (args.currentCell.querySelector('a') &&
                (args.currentCell.querySelector('a').innerText === 'France' || args.currentCell.querySelector('a').innerText === 'Germany')) {
                let country: string = args.currentCell.querySelector('a').innerText;
                args.currentCell.querySelector('a').setAttribute('data-url', (country === 'France' ?
                    'https://en.wikipedia.org/wiki/France' : 'https://en.wikipedia.org/wiki/Germany'));
                args.cancel = false;
            } else {
                appendElement('<b>' + cell + '</b>' + ' cell click event called<hr>');
            }
        },
        width: '100%',
        height: 600,
        showTooltip: false,
        gridSettings: { columnWidth: 140 }
    });
    pivotGridObj.appendTo('#PivotView');

    let optionsdll: DropDownList = new DropDownList({
        dataSource: options,
        fields: { value: 'value', text: 'text' },
        value: 'valuecells',
        width: '100%',
        change: (args: ChangeEventArgs) => {
            (document.querySelector('.text1cls') as HTMLElement).style.display = 'none';
            (document.querySelector('.text2cls') as HTMLElement).style.display = 'none';
            (document.querySelector('.measurecls') as HTMLElement).style.display = 'none';
            (document.querySelector('.conditioncls') as HTMLElement).style.display = 'none';
            (document.querySelector('.input1cls') as HTMLElement).style.display = 'none';
            (document.querySelector('.input2cls') as HTMLElement).style.display = 'none';
            (document.querySelector('.textinputcls') as HTMLElement).style.display = 'none';
            (document.querySelector('.updatecls') as HTMLElement).style.display = 'none';
            if (args.value == 'allcells') {
                pivotGridObj.hyperlinkSettings = {
                    showHyperlink: true,
                    showRowHeaderHyperlink: false,
                    showColumnHeaderHyperlink: false,
                    showValueCellHyperlink: false,
                    showSummaryCellHyperlink: false,
                    headerText: undefined,
                    conditionalSettings: []
                };
            } else if (args.value == 'rowheader') {
                pivotGridObj.hyperlinkSettings = {
                    showHyperlink: false,
                    showRowHeaderHyperlink: true,
                    showColumnHeaderHyperlink: false,
                    showValueCellHyperlink: false,
                    showSummaryCellHyperlink: false,
                    headerText: undefined,
                    conditionalSettings: []
                };
            } else if (args.value == 'columnheader') {
                pivotGridObj.hyperlinkSettings = {
                    showHyperlink: false,
                    showRowHeaderHyperlink: false,
                    showColumnHeaderHyperlink: true,
                    showValueCellHyperlink: false,
                    showSummaryCellHyperlink: false,
                    headerText: undefined,
                    conditionalSettings: []
                };
            } else if (args.value == 'valuecells') {
                pivotGridObj.hyperlinkSettings = {
                    showHyperlink: false,
                    showRowHeaderHyperlink: false,
                    showColumnHeaderHyperlink: false,
                    showValueCellHyperlink: true,
                    showSummaryCellHyperlink: false,
                    headerText: undefined,
                    conditionalSettings: []
                };
            } else if (args.value == 'summarycells') {
                pivotGridObj.hyperlinkSettings = {
                    showHyperlink: false,
                    showRowHeaderHyperlink: false,
                    showColumnHeaderHyperlink: false,
                    showValueCellHyperlink: false,
                    showSummaryCellHyperlink: true,
                    headerText: undefined,
                    conditionalSettings: []
                };
            } else if (args.value == 'conditional') {
                (document.querySelector('.text1cls') as HTMLElement).style.display = '';
                (document.querySelector('.measurecls') as HTMLElement).style.display = '';
                (document.querySelector('.conditioncls') as HTMLElement).style.display = '';
                (document.querySelector('.input1cls') as HTMLElement).style.display = '';
                if (operatorddl.value === 'Between' || operatorddl.value === 'NotBetween') {
                    (document.querySelector('.input2cls') as HTMLElement).style.display = '';
                }
                (document.querySelector('.updatecls') as HTMLElement).style.display = '';
            } else if (args.value == 'headertext') {
                (document.querySelector('.text2cls') as HTMLElement).style.display = '';
                (document.querySelector('.textinputcls') as HTMLElement).style.display = '';
                (document.querySelector('.updatecls') as HTMLElement).style.display = '';
            }
        }
    });
    optionsdll.appendTo('#hyperlinks');
    let measuresddl: DropDownList = new DropDownList({
        dataSource: measures,
        fields: { value: 'value', text: 'text' },
        value: 'In Stock',
        width: '100%'
    });
    measuresddl.appendTo('#hyperlink-measures');
    let operatorddl: DropDownList = new DropDownList({
        value: 'NotEquals',
        dataSource: operators,
        change: (args: ChangeEventArgs) => {
            if (args.value === 'Between' || args.value === 'NotBetween') {
                (document.querySelector('.input2cls') as HTMLElement).style.display = '';
            }
            else {
                (document.querySelector('.input2cls') as HTMLElement).style.display = 'none';
            }
        }
    });
    operatorddl.appendTo('#hyperlink-conditions');
    let valueInput1: NumericTextBox = new NumericTextBox({
        width: '100%',
        value: 0,
        placeholder: "Example: 400"
    });
    valueInput1.appendTo('#hyperlink-value1');
    let valueInput2: NumericTextBox = new NumericTextBox({
        width: '100%',
        value: 0,
        placeholder: "Example: 4000"
    });
    valueInput2.appendTo('#hyperlink-value2');
    let textInput: MaskedTextBox = new MaskedTextBox({
        value: '',
        placeholder: 'Example: "FY 2015.In Stock"',
        width: '100%'
    });
    textInput.appendTo('#hyperlink-text');
    let applyBtn: Button = new Button({
        isPrimary: true
    });
    applyBtn.appendTo('#hyperlink-apply');

    document.getElementById('hyperlink-apply').onclick = () => {
        if (optionsdll.value === 'conditional') {
            pivotGridObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: [
                    {
                        measure: measuresddl.value as string,
                        conditions: operatorddl.value as Condition,
                        value1: valueInput1.value,
                        value2: valueInput2.value
                    }
                ]
            };
        } else if (optionsdll.value === 'headertext') {
            pivotGridObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: textInput.value,
                conditionalSettings: []
            };
        }
    };

    let clearBtn: Button = new Button();
    clearBtn.appendTo('#hyperlink-clear');

    document.getElementById('hyperlink-clear').onclick = () => {
        document.getElementById('hyperlink-EventLog').innerHTML = '';
    };

    function appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('hyperlink-EventLog');
        log.insertBefore(span, log.firstChild);
    }
};