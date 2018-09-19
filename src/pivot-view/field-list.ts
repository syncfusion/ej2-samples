
import { PivotView, PivotFieldList } from '@syncfusion/ej2-pivotview';
import { Pivot_Data } from './data-source';
import { Browser, prepend, setStyleAttribute, enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * Pivot Field List default sample
 */

this.default = (): void => {
    let pivotGridObj: PivotView = new PivotView({
        enginePopulated: () => {
            if (fieldlistObj) {
                fieldlistObj.update(pivotGridObj);
            }
        },
        width: '99%',
        height: 530,
        gridSettings: { columnWidth: 140 }
    });
    pivotGridObj.appendTo('#PivotView');
    let fieldlistObj: PivotFieldList = new PivotFieldList({
        dataSource: {
            data: Pivot_Data,
            expandAll: false,
            allowLabelFilter: true,
            allowValueFilter: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            enableSorting: true
        },
        allowCalculatedField: true,
        renderMode: 'Fixed',
        load: (): void => {
            if (Browser.isDevice) {
                fieldlistObj.renderMode = 'Popup';
                fieldlistObj.target = '.control-section';
                document.getElementById('PivotFieldList').removeAttribute('style');
                setStyleAttribute(document.getElementById('PivotFieldList'), {
                    'height': 0,
                    'float': 'left'
                });
            }
        },
        dataBound: (): void => {
            pivotGridObj.toolTip.destroy();
            pivotGridObj.refresh();
            if (Browser.isDevice) {
                prepend([document.getElementById('PivotFieldList')], document.getElementById('PivotView'));
            }
        },
        enginePopulated: (): void => {
            fieldlistObj.updateView(pivotGridObj);
        }
    });
    fieldlistObj.appendTo('#PivotFieldList');
};
