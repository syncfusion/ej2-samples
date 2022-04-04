import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, GroupingBar, IDataSet } from '@syncfusion/ej2-pivotview';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);

PivotView.Inject(GroupingBar);

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
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            dataSource: Pivot_Data,
            expandAll: false,
            values: [{ name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: []
        },
        width: '100%',
        height: 450,
        showGroupingBar: true,
        showValuesButton: true,
        groupingBarSettings: { showFieldsPanel: true },
        gridSettings: { columnWidth: 140 }
    });
    pivotObj.appendTo('#PivotView');

    let filter: CheckBox = new CheckBox({
        label: 'Show Filter Icon',
        checked: true,
        change: onFilter
    });
    filter.appendTo('#filter');
    let sort: CheckBox = new CheckBox({
        label: 'Show Sort Icon',
        checked: true,
        change: onSort
    });
    sort.appendTo('#sort');
    let remove: CheckBox = new CheckBox({
        label: 'Show Remove Icon',
        checked: true,
        change: onRemove
    });
    remove.appendTo('#remove');
    let summary: CheckBox = new CheckBox({
        label: 'Show Value Type Icon',
        checked: true,
        change: onValueType
    });
    summary.appendTo('#summary');

    /* tslint:disable */

    function onSort(args: any) {
        pivotObj.groupingBarSettings.showSortIcon = args.checked;
    }

    function onFilter(args: any) {
        pivotObj.groupingBarSettings.showFilterIcon = args.checked;
    }

    function onRemove(args: any) {
        pivotObj.groupingBarSettings.showRemoveIcon = args.checked;
    }

    function onValueType(args: any) {
        pivotObj.groupingBarSettings.showValueTypeIcon = args.checked;
    }
};
