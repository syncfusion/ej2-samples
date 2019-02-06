
import { PivotView, FieldList, DrillThrough, IDataSet } from '@syncfusion/ej2-pivotview';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

PivotView.Inject(FieldList, DrillThrough);

/**
 * PivotView Drill Through sample.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
this.default = () => {
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            data: Pivot_Data,
            rows: [{ name: 'Country' }, { name: 'Products' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            expandAll: false,
            enableSorting: true
        },
        width: '100%',
        allowDrillThrough: true,
        height: 300,
        showFieldList: true,
        showTooltip: false,
        gridSettings: { columnWidth: 140 }
    });
    pivotGridObj.appendTo('#PivotView');
};
