
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Button, CheckBox, ChangeEventArgs as CheckChange } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);

/**
 * PivotView Member Sorting sample.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            dataSource: Pivot_Data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            enableSorting: true
        },
        width: '100%',
        height: 300,
        gridSettings: { columnWidth: 140 }
    });
    pivotObj.appendTo('#PivotView');

    let order: string[] = ['Ascending', 'Descending'];
    let fields: { [key: string]: Object }[] = [
        { Field: 'Country', Order: 'Country_asc' },
        { Field: 'Products', Order: 'Products_asc' },
        { Field: 'Year', Order: 'Year_asc' },
        { Field: 'Order Source', Order: 'Order Source_asc' }
    ];

    let checkBoxObj: CheckBox = new CheckBox({
        label: 'Enable Sorting', labelPosition: 'After', checked: true,
        change: (args: CheckChange) => {
            let ischecked: boolean = args.checked;
            fieldsddl.enabled = ischecked;
            orderddl.enabled = ischecked;
            applyBtn.disabled = !ischecked;
            pivotObj.dataSourceSettings.enableSorting = ischecked;
        }
    });
    checkBoxObj.appendTo('#sorting');

    let fieldsddl: DropDownList = new DropDownList({
        dataSource: fields,
        fields: { text: 'Field', value: 'Order' },
        index: 0,
        enabled: true,
        change: (args: ChangeEventArgs) => {
            if (fieldsddl.dataSource[fieldsddl.index].Order === fieldsddl.dataSource[fieldsddl.index].Field + '_asc') {
                orderddl.index = 0;
            } else {
                orderddl.index = 1;
            }
        }
    });
    fieldsddl.appendTo('#sort-fields');

    let orderddl: DropDownList = new DropDownList({
        dataSource: order,
        index: 0,
        enabled: true,
        change: (args: ChangeEventArgs) => {
            if (args.value === 'Ascending') {
                fieldsddl.dataSource[fieldsddl.index].Order = fieldsddl.dataSource[fieldsddl.index].Field + '_asc';
            } else {
                fieldsddl.dataSource[fieldsddl.index].Order = fieldsddl.dataSource[fieldsddl.index].Field + '_desc';
            }
            fieldsddl.refresh();
        }
    });
    orderddl.appendTo('#order');

    let applyBtn: Button = new Button({
        cssClass: 'e-flat', isPrimary: true,
    });
    applyBtn.appendTo('#sort-apply');

    document.getElementById('sort-apply').onclick = () => {
        if (checkBoxObj.checked) {
            pivotObj.dataSourceSettings.enableSorting = true;
            pivotObj.dataSourceSettings.sortSettings = [
                { name: 'Country', order: fieldsddl.dataSource[0].Order === 'Country_asc' ? 'Ascending' : 'Descending' },
                { name: 'Products', order: fieldsddl.dataSource[1].Order === 'Products_asc' ? 'Ascending' : 'Descending' },
                { name: 'Year', order: fieldsddl.dataSource[2].Order === 'Year_asc' ? 'Ascending' : 'Descending' },
                { name: 'Order_Source', order: fieldsddl.dataSource[3].Order === 'Order Source_asc' ? 'Ascending' : 'Descending' }
            ];
        } else {
            pivotObj.dataSourceSettings.enableSorting = false;
            pivotObj.dataSourceSettings.sortSettings = [];
        }
    };
};
