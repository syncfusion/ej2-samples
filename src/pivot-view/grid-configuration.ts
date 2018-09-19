
import { PivotView, FieldList } from '@syncfusion/ej2-pivotview';
import { defaultData } from './data-source';
import { CheckBox, ChangeEventArgs as checkEventArgs } from '@syncfusion/ej2-buttons';
import { DropDownList, ChangeEventArgs as dropEventArgs } from '@syncfusion/ej2-dropdowns';
import { GridLine } from '@syncfusion/ej2-grids';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);
PivotView.Inject(FieldList);

/**
 * PivotView sample with Grid Configurations.
 */

this.default = (): void => {
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Quarter' }],
            valueSortSettings: { headerDelimiter: ' - ' },
            values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
            data: defaultData,
            expandAll: false,
            filters: []
        },
        width: '100%',
        height: 300,
        showFieldList: true,
        gridSettings: {
            allowReordering: true,
            allowResizing: true,
            columnWidth: 140
        }
    });
    pivotGridObj.appendTo('#PivotView');

    let reorder: CheckBox = new CheckBox({ label: 'Allow Reordering', checked: true, change: onChange });
    reorder.appendTo('#reorder');

    let resize: CheckBox = new CheckBox({ label: 'Allow Resizing', checked: true, change: onChange });
    resize.appendTo('#resize');

    let autowrap: CheckBox = new CheckBox({ label: 'Allow Text Wrap', checked: false, change: onChange });
    autowrap.appendTo('#autowrap');

    let lines: { [key: string]: Object }[] = [
        { id: 'Default', type: 'Default' },
        { id: 'Both', type: 'Both' },
        { id: 'None', type: 'None' },
        { id: 'Horizontal', type: 'Horizontal' },
        { id: 'Vertical', type: 'Vertical' }
    ];

    let gridlines: DropDownList = new DropDownList({
        placeholder: 'GridLines',
        floatLabelType: 'Auto',
        dataSource: lines,
        fields: { text: 'type', value: 'id' },
        value: 'Both',
        change: (e: dropEventArgs) => {
            pivotGridObj.gridSettings.gridLines = <GridLine>e.value;
        },
    });
    gridlines.appendTo('#gridlines');

    function onChange(args: checkEventArgs): void {
        if ((args.event.target as HTMLElement).id === 'reorder') {
            pivotGridObj.gridSettings.allowReordering = args.checked;
        } else if ((args.event.target as HTMLElement).id === 'resize') {
            pivotGridObj.gridSettings.allowResizing = args.checked;
        } else {
            pivotGridObj.gridSettings.allowTextWrap = args.checked;
        }
    }
};
