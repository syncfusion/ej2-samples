import { loadCultureFiles } from '../common/culture-loader';

import { PivotView, FieldList, DrillThrough, IDataSet } from '@syncfusion/ej2-pivotview';
import { enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);

PivotView.Inject(FieldList, DrillThrough);

/**
 * PivotView Drill Through sample.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            dataSource: Pivot_Data,
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
    pivotObj.appendTo('#PivotView');
};
