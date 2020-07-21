import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, FieldList, IDataSet } from '@syncfusion/ej2-pivotview';
import { CheckBox, ChangeEventArgs as checkEventArgs } from '@syncfusion/ej2-buttons';
import { DropDownList, ChangeEventArgs as dropEventArgs } from '@syncfusion/ej2-dropdowns';
import { GridLine } from '@syncfusion/ej2-grids';
import { enableRipple } from '@syncfusion/ej2-base';
import * as pData from './pivot-data/defaultData.json';
enableRipple(false);
PivotView.Inject(FieldList);

/**
 * PivotView sample with Grid Configurations.
 */
/* tslint:disable */
let defaultData: IDataSet[] = (pData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Quarter' }],
            valueSortSettings: { headerDelimiter: ' - ' },
            values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
            dataSource: defaultData,
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
    pivotObj.appendTo('#PivotView');

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
            pivotObj.gridSettings.gridLines = <GridLine>e.value;
        },
    });
    gridlines.appendTo('#gridlines');

    function onChange(args: checkEventArgs): void {
        if ((args.event.target as HTMLElement).id === 'reorder') {
            pivotObj.gridSettings.allowReordering = args.checked;
        } else if ((args.event.target as HTMLElement).id === 'resize') {
            pivotObj.gridSettings.allowResizing = args.checked;
        } else {
            pivotObj.gridSettings.allowTextWrap = args.checked;
        }
    }
};
