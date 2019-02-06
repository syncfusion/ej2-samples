
import { PivotView, GroupingBar, FieldList, IDataSet } from '@syncfusion/ej2-pivotview';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);


PivotView.Inject(GroupingBar, FieldList);

/**
 * PivotView RTL Sample.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
this.default = (): void => {
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            data: Pivot_Data,
            expandAll: false,
            enableSorting: true,
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
        },
        width: '100%',
        height: 300,
        allowCalculatedField: true,
        showGroupingBar: true,
        showFieldList: true,
        enableRtl: true,
        gridSettings: { columnWidth: 140 }
    });
    pivotGridObj.appendTo('#PivotView');
};
