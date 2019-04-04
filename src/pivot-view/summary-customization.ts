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
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            enableSorting: true,
            drilledMembers: [{ name: 'Country', items: ['France'] }],
            filterSettings: [{ name: 'Products', items: ['Gloves', 'Helmets', 'Shorts', 'Vests'], type: 'Include' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            data: Pivot_Data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            showGrandTotals: false
        },
        width: '100%',
        height: 400,
        gridSettings: { columnWidth: 140 }
    });
    pivotGridObj.appendTo('#PivotView');

    let radioButton: RadioButton = new RadioButton({ label: 'Row', name: 'total', value: 'Row', change: onChange });
    radioButton.appendTo('#radio1');

    radioButton = new RadioButton({ label: 'Column', name: 'total', value: 'Column', change: onChange });
    radioButton.appendTo('#radio2');

    radioButton = new RadioButton({ label: 'Both', name: 'total', value: 'Both', checked: true, change: onChange });
    radioButton.appendTo('#radio3');

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
            for (let i: number = 0; i < pivotGridObj.dataSource.columns.length; i++) {
                if ((pivotGridObj.dataSource.columns[i].caption || pivotGridObj.dataSource.columns[i].name) === (args.itemData as any).Name) {
                    pivotGridObj.dataSource.columns[i].showSubTotals = false;
                }
            }
            for (let i: number = 0; i < pivotGridObj.dataSource.rows.length; i++) {
                if ((pivotGridObj.dataSource.rows[i].caption || pivotGridObj.dataSource.rows[i].name) === (args.itemData as any).Name) {
                    pivotGridObj.dataSource.rows[i].showSubTotals = false;
                }
            }
        },
        removed: (args: RemoveEventArgs): void => {
            for (let i: number = 0; i < pivotGridObj.dataSource.columns.length; i++) {
                if ((pivotGridObj.dataSource.columns[i].caption || pivotGridObj.dataSource.columns[i].name) === (args.itemData as any).Name) {
                    pivotGridObj.dataSource.columns[i].showSubTotals = true;
                }
            }
            for (let i: number = 0; i < pivotGridObj.dataSource.rows.length; i++) {
                if ((pivotGridObj.dataSource.rows[i].caption || pivotGridObj.dataSource.rows[i].name) === (args.itemData as any).Name) {
                    pivotGridObj.dataSource.rows[i].showSubTotals = true;
                }
            }
        },
        open: (args: PopupEventArgs): void => {
            (args.popup.element.querySelector('.e-filter-parent') as HTMLElement).style.display = 'none';
        }
    });
    valuesddl.appendTo('#summary-values');

    function onChange(args: ChangeArgs): void {
        pivotGridObj.setProperties({ dataSource: { showGrandTotals: true } }, true);
        pivotGridObj.setProperties({ dataSource: { showRowGrandTotals: true } }, true);
        pivotGridObj.setProperties({ dataSource: { showColumnGrandTotals: true } }, true);
        if (args.value === 'Column') {
            pivotGridObj.dataSource.showColumnGrandTotals = false;
        } else if (args.value === 'Row') {
            pivotGridObj.dataSource.showRowGrandTotals = false;
        } else if (args.value === 'Both') {
            pivotGridObj.dataSource.showGrandTotals = false;
        }
    }
};
