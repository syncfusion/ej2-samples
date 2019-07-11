import { loadCultureFiles } from '../common/culture-loader';

import { PivotView, PivotFieldList, IDataSet, CalculatedField, FieldList } from '@syncfusion/ej2-pivotview';
import { Browser, setStyleAttribute, enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);

PivotView.Inject(CalculatedField, FieldList);
/**
 * Pivot Field List default sample
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotObj: PivotView = new PivotView({
        enginePopulated: () => {
            if (!Browser.isDevice && fieldlistObj && pivotObj) {
                fieldlistObj.update(pivotObj);
            }
        },
        allowDeferLayoutUpdate: true,
        width: '99%',
        height: 620,
        gridSettings: { columnWidth: 140 }
    });
    pivotObj.appendTo('#PivotView');
    let fieldlistObj: PivotFieldList = new PivotFieldList({
        dataSourceSettings: {
            dataSource: Pivot_Data,
            expandAll: false,
            drilledMembers: [{ name: 'Country', items: ['France', 'Germany', 'United States'] }],
            filterSettings: [{ name: 'Products', items: ['Gloves', 'Helmets', 'Shorts', 'Vests'], type: 'Include' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            enableSorting: true
        },
        allowDeferLayoutUpdate: true,
        allowCalculatedField: true,
        renderMode: 'Fixed',
        load: (): void => {
            if (Browser.isDevice) {
                fieldlistObj.renderMode = 'Popup';
                fieldlistObj.target = '.control-section';
                setStyleAttribute(document.getElementById('PivotFieldList'), {
                    width: 0,
                    height: 0,
                    float: 'left',
                    'display': 'none'
                });
            }
        },
        dataBound: (): void => {
            if (Browser.isDevice) {
                pivotObj.element.style.width = '100%';
                pivotObj.allowCalculatedField = true;
                pivotObj.showFieldList = true;
            }
            pivotObj.tooltip.destroy();
            pivotObj.refresh();
        },
        enginePopulated: (): void => {
            if (fieldlistObj.isRequiredUpdate) {
                fieldlistObj.updateView(pivotObj);
            }
            pivotObj.notify('ui-update', pivotObj);
            if (!Browser.isDevice) {
                fieldlistObj.notify('tree-view-update', fieldlistObj);
            }
        }
    });
    fieldlistObj.appendTo('#PivotFieldList');
};
