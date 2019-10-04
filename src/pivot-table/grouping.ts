import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, GroupingBar, IDataSet, ColumnRenderEventArgs, DateGroup } from '@syncfusion/ej2-pivotview';
import { enableRipple, extend } from '@syncfusion/ej2-base';
import { MultiSelect, SelectEventArgs, RemoveEventArgs, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { GroupSettingsModel } from '@syncfusion/ej2-pivotview/src/pivotview/model/datasourcesettings-model';
import { Button } from '@syncfusion/ej2-buttons';
import * as gData from './pivot-data/gData.json';
enableRipple(false);
MultiSelect.Inject(CheckBoxSelection);
PivotView.Inject(GroupingBar);

/**
 * PivotView Grouping Sample
 */
/* tslint:disable */
let data: any = (gData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let selectedGroups: string[] = ['Years', 'Months', 'Days'];
    let groupData: string[] = ['Years', 'Quarters', 'Months', 'Days'];
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            dataSource: extend([], data, null, true) as IDataSet[],
            expandAll: false,
            enableSorting: true,
            formatSettings: [{ name: 'Amount', format: 'C0' }, { name: 'Sold', format: 'N0' },
            { name: 'Date', type: 'date', format: 'dd/MM/yyyy-hh:mm a' }],
            rows: [{ name: 'Date', caption: 'Date' }],
            columns: [{ name: 'Product_ID', caption: 'Product ID' },
            { name: 'Products', caption: 'Products' }],
            values: [{ name: 'Sold', caption: 'Unit Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [],
            groupSettings: [{ name: 'Date', type: 'Date', groupInterval: ['Years', 'Months', 'Days'] },
            { name: 'Product_ID', type: 'Number', rangeInterval: 4 }]
        },
        width: '100%',
        height: 450,
        showGroupingBar: true,
        gridSettings: {
            columnWidth: 140,
            columnRender: (args: ColumnRenderEventArgs): void => {
                if (args.dataSourceSettings.rows.length > 3 && args.columns[0].width <= 250) {
                    args.columns[0].width = 285;
                }
            }
        }
    });
    pivotObj.appendTo('#PivotView');

    let dateGroup: MultiSelect = new MultiSelect({
        dataSource: groupData,
        mode: 'CheckBox',
        showDropDownIcon: true,
        enableSelectionOrder: false,
        popupWidth: '150',
        width: '150',
        value: ['Years', 'Months', 'Days'],
        placeholder: 'Select group',
        filterBarPlaceholder: 'Search group',
        select: (args: SelectEventArgs): void => {
            applyGroupSettings(args);
        },
        removed: (args: RemoveEventArgs): void => {
            applyGroupSettings(args);
        }
    });
    dateGroup.appendTo('#dategroup');

    let numberGroup: NumericTextBox = new NumericTextBox({
        width: '150',
        format: '###',
        min: 1,
        max: 10,
        value: 4,
        placeholder: "Example: 4"
    });
    numberGroup.appendTo('#numbergroup');

    let applyBtn: Button = new Button({
        isPrimary: true
    });
    applyBtn.appendTo('#group-apply');

    function applyGroupSettings(args: any) {
        if (args.name === 'select') {
            if (selectedGroups.indexOf(args.itemData) === -1) {
                selectedGroups.push(args.itemData);
            }
        } else {
            if (selectedGroups.indexOf(args.itemData) > -1) {
                var index = selectedGroups.indexOf(args.itemData);
                selectedGroups.splice(index, 1);
            }
        }
    }

    document.getElementById('group-apply').onclick = () => {
        let groupSettings: GroupSettingsModel[] = [];
        if (selectedGroups.length > 0) {
            groupSettings.push({ name: 'Date', type: 'Date', groupInterval: selectedGroups as DateGroup[] });
        }
        if (numberGroup.value > 1) {
            groupSettings.push({ name: 'Product_ID', type: 'Number', rangeInterval: numberGroup.value });
        }
        pivotObj.dataSourceSettings.groupSettings = groupSettings;
    };
    /* tslint:enable */
};
