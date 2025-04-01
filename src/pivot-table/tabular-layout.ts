import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataSet, GroupingBar, FieldList } from '@syncfusion/ej2-pivotview';
import { Browser, enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import { ChangeEventArgs, Switch } from '@syncfusion/ej2-buttons';
enableRipple(false);

/* tslint:disable */

/**
 * PivotView Tabular Layout Sample.
 */
PivotView.Inject(GroupingBar, FieldList);
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            drilledMembers: [{ name: 'Country', items: ['France'] }],
            filterSettings: [{
                name: 'Products', type: 'Include', items: ['Bottles and Cages', 'Cleaners', 'Fenders', 'Gloves', 'Helmets',
                    'Hydration Packs', 'Jerseys', 'Mountain Bikes']
            }],
            dataSource: Pivot_Data,
            expandAll: false,
            values: [{ name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: []
        },
        width: '100%',
        height: 450,
        showFieldList: true,
        showGroupingBar: true,
        gridSettings: {
            columnWidth: Browser.isDevice ? 100 : 140,
            layout: 'Tabular'
        }
    });
    pivotObj.appendTo('#PivotView1');

    let layoutSwitch: Switch = new Switch({
        checked: true,
        cssClass: 'pivot-layout-switch',
        change: (args: ChangeEventArgs) => {
            if (pivotObj.gridSettings.layout === 'Compact') {
                pivotObj.gridSettings.layout = 'Tabular';
            } else {
                pivotObj.gridSettings.layout = 'Compact';
            }
        }
    });
    layoutSwitch.appendTo('#layout-switch');
};
