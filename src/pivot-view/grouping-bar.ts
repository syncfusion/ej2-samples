
import { PivotView, GroupingBar, FieldList } from '@syncfusion/ej2-pivotview';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Pivot_Data } from './data-source';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

PivotView.Inject(GroupingBar, FieldList);

/**
 * PivotView Grouping bar Sample
 */

this.default = (): void => {
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            data: Pivot_Data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
        },
        width: '100%',
        height: 300,
        showGroupingBar: true,
        showFieldList: true,
        gridSettings: { columnWidth: 140 }
    });
    pivotGridObj.appendTo('#PivotView');

    let filter: CheckBox = new CheckBox({
        label: 'Show Filter Icon',
        checked: true,
        change: onChange
    });
    filter.appendTo('#filter');
    let sort: CheckBox = new CheckBox({
        label: 'Show Sort Icon',
        checked: true,
        change: onChange
    });
    sort.appendTo('#sort');
    let remove: CheckBox = new CheckBox({
        label: 'Show Remove Icon',
        checked: true,
        change: onChange
    });
    remove.appendTo('#remove');

    /* tslint:disable */
    function onChange(args: any) {
        if ((args.event.target as HTMLElement).id === 'filter') {
            pivotGridObj.groupingBarSettings.showFilterIcon = args.checked;
        } else if (args.event.target.id === 'sort') {
            pivotGridObj.groupingBarSettings.showSortIcon = args.checked;
        } else {
            pivotGridObj.groupingBarSettings.showRemoveIcon = args.checked;
        }
    }
};
