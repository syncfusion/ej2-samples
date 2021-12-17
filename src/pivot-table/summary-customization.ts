import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataSet, FieldList } from '@syncfusion/ej2-pivotview';
import { enableRipple } from '@syncfusion/ej2-base';
import { RadioButton, ChangeArgs } from '@syncfusion/ej2-buttons';
import { MultiSelect, SelectEventArgs, RemoveEventArgs, PopupEventArgs, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
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

    let fields: { [key: string]: Object; }[] = [
        { Name: 'Country' },
        { Name: 'Year' }
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
        },
        open: (args: PopupEventArgs): void => {
            (args.popup.element.querySelector('.e-filter-parent') as HTMLElement).style.display = 'none';
        }
    });
    valuesddl.appendTo('#summary-values');

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
    }
};
