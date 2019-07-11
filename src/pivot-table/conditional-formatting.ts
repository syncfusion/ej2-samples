import { loadCultureFiles } from '../common/culture-loader';

import { PivotView, ConditionalFormatting, FieldList, IDataSet } from '@syncfusion/ej2-pivotview';
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);
PivotView.Inject(ConditionalFormatting, FieldList);
PivotView.Inject(FieldList);

/**
 * PivotView Sample with Conditional Formatting.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            dataSource: Pivot_Data,
            expandAll: false,
            enableSorting: true,
            drilledMembers: [{ name: 'Country', items: ['France', 'Germany'] }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' },
            { name: 'Sold', caption: 'Units Sold' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            conditionalFormatSettings: [
                {
                    measure: 'In_Stock',
                    value1: 5000,
                    conditions: 'LessThan',
                    style: {
                        backgroundColor: '#80cbc4',
                        color: 'black',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    }
                },
                {
                    value1: 3400,
                    value2: 40000,
                    measure: 'Sold',
                    conditions: 'Between',
                    style: {
                        backgroundColor: '#f48fb1',
                        color: 'black',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    }
                }
            ]
        },
        allowConditionalFormatting: true,
        showFieldList: true,
        width: '100%',
        height: 300,
        gridSettings: { columnWidth: 100 }
    });
    pivotObj.appendTo('#PivotView');

    let button: Button = new Button({ isPrimary: true });
    button.appendTo('#conditional-formatting-btn');

    let button1: Button = new Button({ isPrimary: true });
    button1.appendTo('#reset-format');

    button1.element.onclick = (): void => {
        if (pivotObj.dataSourceSettings.conditionalFormatSettings.length > 0) {
            pivotObj.setProperties({ dataSourceSettings: { conditionalFormatSettings: [] } }, true);
            pivotObj.renderPivotGrid();
        }
        pivotObj.conditionalFormattingModule.destroy();
        document.getElementById('reset-format').blur();
    };

    button.element.onclick = (): void => {
        if (pivotObj.conditionalFormattingModule) {
            pivotObj.conditionalFormattingModule.showConditionalFormattingDialog();
        }
    };

};
