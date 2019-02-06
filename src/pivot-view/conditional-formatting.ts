
import { PivotView, ConditionalFormatting, FieldList, IDataSet } from '@syncfusion/ej2-pivotview';
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);
PivotView.Inject(ConditionalFormatting, FieldList);
PivotView.Inject(FieldList);

/**
 * PivotView Sample with Conditional Formatting.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
this.default = (): void => {
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            data: Pivot_Data,
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
                    measure: 'In Stock',
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
                    measure: 'Units Sold',
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
    pivotGridObj.appendTo('#PivotView');

    let button: Button = new Button({ isPrimary: true });
    button.appendTo('#conditional-formatting-btn');

    let button1: Button = new Button({ isPrimary: true });
    button1.appendTo('#reset-format');

    button1.element.onclick = (): void => {
        if (pivotGridObj.dataSource.conditionalFormatSettings.length > 0) {
            pivotGridObj.setProperties({ dataSource: { conditionalFormatSettings: [] } }, true);
            pivotGridObj.renderPivotGrid();
        }
        pivotGridObj.conditionalFormattingModule.destroy();
        document.getElementById('reset-format').blur();
    };

    button.element.onclick = (): void => {
        if (pivotGridObj.conditionalFormattingModule) {
            pivotGridObj.conditionalFormattingModule.showConditionalFormattingDialog();
        }
    };

};
