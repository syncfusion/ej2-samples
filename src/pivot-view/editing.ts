import { loadCultureFiles } from '../common/culture-loader';

import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);

/**
 * PivotView Sample with Edit Options.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Quarter' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Product_Categories', caption: 'Product Categories' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            data: Pivot_Data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: []
        },
        width: '100%',
        height: 300,
        showTooltip: false,
        gridSettings: { columnWidth: 140 },
        editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' }
    });
    pivotGridObj.appendTo('#PivotView');

    let radioButton: RadioButton = new RadioButton({
        label: 'Inline Editing',
        name: 'EditOperation',
        checked: true,
        change: onRadioChange
    });
    radioButton.appendTo('#inline');
    radioButton = new RadioButton({
        label: 'Batch Editing',
        name: 'EditOperation',
        checked: false,
        change: onRadioChange
    });
    radioButton.appendTo('#batch');
    radioButton = new RadioButton({
        label: 'Dialog Editing',
        name: 'EditOperation',
        checked: false,
        change: onRadioChange
    });
    radioButton.appendTo('#dialog');
    radioButton = new RadioButton({
        label: 'Command Columns',
        name: 'EditOperation',
        checked: false,
        change: onRadioChange
    });
    radioButton.appendTo('#cc');


    function onRadioChange(args: any): void {
        let id: string = (args.event.target as HTMLElement).id;
        if (id === 'inline') {
            pivotGridObj.editSettings.allowEditOnDblClick = true;
            pivotGridObj.editSettings.allowCommandColumns = false;
            pivotGridObj.editSettings.mode = 'Normal';
        } else if (id === 'batch') {
            pivotGridObj.editSettings.allowEditOnDblClick = true;
            pivotGridObj.editSettings.allowCommandColumns = false;
            pivotGridObj.editSettings.mode = 'Batch';
        } else if (id === 'dialog') {
            pivotGridObj.editSettings.allowEditOnDblClick = true;
            pivotGridObj.editSettings.allowCommandColumns = false;
            pivotGridObj.editSettings.mode = 'Dialog';
        } else {
            pivotGridObj.editSettings.allowCommandColumns = true;
        }
    }
};
