import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataSet, Toolbar, PDFExport, ExcelExport, FieldList } from '@syncfusion/ej2-pivotview';
import { Browser, enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import { ChangeEventArgs, Switch } from '@syncfusion/ej2-buttons';

enableRipple(false);

/* tslint:disable */

/**
 * PivotView Tabular Layout Sample.
 */
PivotView.Inject(FieldList, Toolbar, PDFExport, ExcelExport);
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Quarter' }],
            rows: [{ name: 'Product_Categories', caption: 'Product Categories' }, { name: 'Products' }, { name: 'Order_Source', caption: 'Order Source' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            drilledMembers: [{ name: 'Product_Categories', items: ['Accessories','Bikes'] }, { name: 'Products',delimiter:'##', items: ['Accessories##Helmets'] }],
            filterSettings: [{
                name: 'Products', type: 'Exclude', items: ['Cleaners', 'Fenders']
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
        showToolbar: true,
        toolbar: ['Export', 'FieldList'],
        allowExcelExport: true,
        allowPdfExport: true,
        gridSettings: {
            columnWidth: Browser.isDevice ? 100 : 120,
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
                repeatLabelSwitch.disabled = false;
            } else {
                pivotObj.gridSettings.layout = 'Compact';
                repeatLabelSwitch.disabled = true;
            }
        }
    });
    layoutSwitch.appendTo('#layout-switch');

    let repeatLabelSwitch: Switch = new Switch({
        cssClass: 'pivot-repeatlabel-switch',
        change: (args: ChangeEventArgs) => {
            if (pivotObj.gridSettings.repeatItemLabels) {
                pivotObj.setProperties({ gridSettings: { repeatItemLabels: false } });
                pivotObj.refreshData();
            } else {
                pivotObj.setProperties({ gridSettings: { repeatItemLabels: true } });
                pivotObj.refreshData(); 
            }
        }
    });
    repeatLabelSwitch.appendTo('#repeatlabel-switch');
};
