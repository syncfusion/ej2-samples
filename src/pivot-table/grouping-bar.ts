import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, GroupingBar, FieldList, IDataSet } from '@syncfusion/ej2-pivotview';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);

PivotView.Inject(GroupingBar, FieldList);

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
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
        },
        width: '100%',
        height: 450,
        showGroupingBar: true,
        showFieldList: true,
        gridSettings: { columnWidth: 140 }
    });
    pivotObj.appendTo('#PivotView');

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
    let summary: CheckBox = new CheckBox({
        label: 'Show Value Type Icon',
        checked: true,
        change: onChange
    });
    summary.appendTo('#summary');

    /* tslint:disable */
    function onChange(args: any) {
        if ((args.event.target as HTMLElement).id === 'filter') {
            pivotObj.groupingBarSettings.showFilterIcon = args.checked;
        } else if (args.event.target.id === 'sort') {
            pivotObj.groupingBarSettings.showSortIcon = args.checked;
        } else if (args.event.target.id === 'remove') {
            pivotObj.groupingBarSettings.showRemoveIcon = args.checked;
        } else {
            pivotObj.groupingBarSettings.showValueTypeIcon = args.checked;
        }
    }
};
