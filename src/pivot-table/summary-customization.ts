import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataSet, FieldList } from '@syncfusion/ej2-pivotview';
import { enableRipple } from '@syncfusion/ej2-base';
import { RadioButton, ChangeArgs } from '@syncfusion/ej2-buttons';
import { DropDownList, ChangeEventArgs, MultiSelect, SelectEventArgs, RemoveEventArgs, PopupEventArgs, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import * as pivotData from './pivot-data/Pivot_Data.json';
MultiSelect.Inject(CheckBoxSelection);
enableRipple(false);

PivotView.Inject(FieldList);

/**
 * PivotView Grouping bar Sample
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            enableSorting: true,
            drilledMembers: [{ name: 'Country', items: ['France', 'Germany'] }],
            filterSettings: [{ name: 'Products', items: ['Gloves', 'Helmets', 'Shorts', 'Vests'], type: 'Include' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            dataSource: Pivot_Data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            showGrandTotals: true,
            grandTotalsPosition: 'Bottom',
        },
        width: '100%',
        height: 500,
        gridSettings: { columnWidth: 140 }
    });
    pivotObj.appendTo('#PivotView');

    let radioButton: RadioButton = new RadioButton({ label: 'Row', name: 'total', value: 'Row', change: onChange });
    radioButton.appendTo('#radio1');

    radioButton = new RadioButton({ label: 'Column', name: 'total', value: 'Column', change: onChange });
    radioButton.appendTo('#radio2');

    radioButton = new RadioButton({ label: 'Both', name: 'total', value: 'Both', change: onChange });
    radioButton.appendTo('#radio3');

    radioButton = new RadioButton({ label: 'None', name: 'total', value: 'None', checked: true, change: onChange });
    radioButton.appendTo('#radio4');

    let radioButton1: RadioButton = new RadioButton({ label: 'Top', name: 'position', value: 'Top', change: onChange1 });
    radioButton1.appendTo('#radio5');

    radioButton1 = new RadioButton({ label: 'Bottom', name: 'position', value: 'Bottom', checked: true, change: onChange1 });
    radioButton1.appendTo('#radio6');

    let radioButton2: RadioButton = new RadioButton({ label: 'Row', name: 'total1', value: 'Row', change: onChange2 });
    radioButton2.appendTo('#radio10');

    radioButton2 = new RadioButton({ label: 'Column', name: 'total1', value: 'Column', change: onChange2 });
    radioButton2.appendTo('#radio11');

    radioButton2 = new RadioButton({ label: 'Both', name: 'total1', value: 'Both', change: onChange2 });
    radioButton2.appendTo('#radio12');

    radioButton2 = new RadioButton({ label: 'None', name: 'total1', value: 'None', checked: true, change: onChange2 });
    radioButton2.appendTo('#radio13');

    let radioButton3: RadioButton = new RadioButton({ label: 'Top', name: 'position1', value: 'Top', change: onChange3 });
    radioButton3.appendTo('#radio7');

    radioButton3 = new RadioButton({ label: 'Bottom', name: 'position1', value: 'Bottom', change: onChange3 });
    radioButton3.appendTo('#radio8');

    radioButton3 = new RadioButton({ label: 'Auto', name: 'position1', value: 'Auto', checked: true, change: onChange3 });
    radioButton3.appendTo('#radio9');

    let fields: { [key: string]: Object; }[] = [
        { Name: 'Country' },
        { Name: 'Year' }
    ];

    let options: { [key: string]: Object; }[] = [
        { value: 'grandTotals', text: 'Grand Totals' },
        { value: 'subTotals', text: 'Sub-totals' }
    ];

    let valuesddl: MultiSelect = new MultiSelect({
        dataSource: fields,
        mode: 'CheckBox',
        showDropDownIcon: true,
        showClearButton: false,
        enableSelectionOrder: false,
        fields: { text: 'Name' },
        placeholder: 'Select fields to hide its sub-totals',
        select: (args: SelectEventArgs): void => {
            for (let i: number = 0; i < pivotObj.dataSourceSettings.columns.length; i++) {
                if ((pivotObj.dataSourceSettings.columns[i].caption || pivotObj.dataSourceSettings.columns[i].name) === (args.itemData as any).Name) {
                    pivotObj.dataSourceSettings.columns[i].showSubTotals = false;
                }
            }
            for (let i: number = 0; i < pivotObj.dataSourceSettings.rows.length; i++) {
                if ((pivotObj.dataSourceSettings.rows[i].caption || pivotObj.dataSourceSettings.rows[i].name) === (args.itemData as any).Name) {
                    pivotObj.dataSourceSettings.rows[i].showSubTotals = false;
                }
            }
            pivotObj.refreshData();
        },
        removed: (args: RemoveEventArgs): void => {
            for (let i: number = 0; i < pivotObj.dataSourceSettings.columns.length; i++) {
                if ((pivotObj.dataSourceSettings.columns[i].caption || pivotObj.dataSourceSettings.columns[i].name) === (args.itemData as any).Name) {
                    pivotObj.dataSourceSettings.columns[i].showSubTotals = true;
                }
            }
            for (let i: number = 0; i < pivotObj.dataSourceSettings.rows.length; i++) {
                if ((pivotObj.dataSourceSettings.rows[i].caption || pivotObj.dataSourceSettings.rows[i].name) === (args.itemData as any).Name) {
                    pivotObj.dataSourceSettings.rows[i].showSubTotals = true;
                }
            }
            pivotObj.refreshData();
        },
        open: (args: PopupEventArgs): void => {
            (args.popup.element.querySelector('.e-filter-parent') as HTMLElement).style.display = 'none';
        }
    });
    valuesddl.appendTo('#summary-values');

    let optionsdll: DropDownList = new DropDownList({
        dataSource: options,
        fields: { value: 'value', text: 'text' },
        value: 'grandTotals',
        width: '100%',
        change: (args: ChangeEventArgs) => {
            (document.getElementById('grandsum') as HTMLElement).style.display = 'none';
            (document.getElementById('subsum') as HTMLElement).style.display = 'none';
            if (args.value == 'grandTotals') {
                (document.getElementById('grandsum') as HTMLElement).style.display = '';
            } else if (args.value == 'subTotals') {
                (document.getElementById('subsum') as HTMLElement).style.display = '';
            }
        }
    });
    optionsdll.appendTo('#options');

    function onChange(args: ChangeArgs): void {
        if (args.value === 'None') {
            pivotObj.setProperties({ dataSourceSettings: { showGrandTotals: false } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showRowGrandTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showColumnGrandTotals: true } }, true);
            pivotObj.dataSourceSettings.showGrandTotals = true;
        }
        else {
            pivotObj.setProperties({ dataSourceSettings: { showGrandTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showRowGrandTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showColumnGrandTotals: true } }, true);
            if (args.value === 'Column') {
                pivotObj.dataSourceSettings.showColumnGrandTotals = false;
            } else if (args.value === 'Row') {
                pivotObj.dataSourceSettings.showRowGrandTotals = false;
            } else if (args.value === 'Both') {
                pivotObj.dataSourceSettings.showGrandTotals = false;
            }
        }
        pivotObj.refreshData();
    }

    function onChange1(args: ChangeArgs): void {
        if (args.value === 'Top') {
            pivotObj.setProperties({ dataSourceSettings: { grandTotalsPosition: 'Bottom' } }, true);
            pivotObj.dataSourceSettings.grandTotalsPosition = 'Top';
        }
        else if(args.value === 'Bottom') {
            pivotObj.setProperties({ dataSourceSettings: { grandTotalsPosition: 'Top' } }, true);
            pivotObj.dataSourceSettings.grandTotalsPosition = 'Bottom';
        }
        pivotObj.refreshData();
    }

    function onChange2(args: ChangeArgs): void {
        if (args.value === 'None') {
            pivotObj.setProperties({ dataSourceSettings: { showSubTotals: false } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showRowSubTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showColumnSubTotals: true } }, true);
            pivotObj.dataSourceSettings.showSubTotals = true;
        }
        else {
            pivotObj.setProperties({ dataSourceSettings: { showSubTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showRowSubTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showColumnSubTotals: true } }, true);
            if (args.value === 'Column') {
                pivotObj.dataSourceSettings.showColumnSubTotals = false;
            } else if (args.value === 'Row') {
                pivotObj.dataSourceSettings.showRowSubTotals = false;
            } else if (args.value === 'Both') {
                pivotObj.dataSourceSettings.showSubTotals = false;
            }
        }
        pivotObj.refreshData();
    }

    function onChange3(args: ChangeArgs): void {
        if (args.value === 'Top') {
            pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Top' } }, true);
        }
        else if(args.value === 'Bottom') {
            pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Bottom' } }, true);
        }
        else if(args.value === 'Auto') {
            pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Auto' } }, true);
        }
        pivotObj.refreshData();
    }
};
