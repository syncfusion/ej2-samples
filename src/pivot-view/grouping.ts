import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, GroupingBar, IDataSet, ColumnRenderEventArgs, DateGroup } from '@syncfusion/ej2-pivotview';
import { enableRipple, extend } from '@syncfusion/ej2-base';
import { MultiSelect, SelectEventArgs, RemoveEventArgs, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { GroupSettingsModel } from '@syncfusion/ej2-pivotview/src/pivotview/model/dataSource-model';
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
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
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
        load: (): void => {
            getGroupData();
        },
        width: '100%',
        height: 300,
        showGroupingBar: true,
        gridSettings: {
            columnWidth: 140,
            columnRender: (args: ColumnRenderEventArgs): void => {
                if (args.dataSource.rows.length > 3 && args.columns[0].width <= 250) {
                    args.columns[0].width = 285;
                }
            }
        }
    });
    pivotGridObj.appendTo('#PivotView');

    let dateGroup: MultiSelect = new MultiSelect({
        dataSource: groupData,
        mode: 'CheckBox',
        showDropDownIcon: true,
        enableSelectionOrder: false,
        popupWidth: 'auto',
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
        width: '100%',
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
        pivotGridObj.dataSource.groupSettings = groupSettings;
    };


    function getGroupData(): void {
        let date: Date;
        let products: string[] = ['', 'Bottles and Cages', 'Cleaners', 'Fenders', 'Mountain Bikes', 'Road Bikes', 'Touring Bikes', 'Gloves', 'Jerseys', 'Shorts', 'Vests'];
        let amount: number[] = [0, 2, 3, 8, 60, 75, 65, 3, 5, 4, 2]
        for (let ln: number = 0, lt: number = data.length; ln < lt; ln++) {
            date = new Date(data[ln].Date.toString());
            data[ln].Date = date.toString();
            data[ln].Products = products[data[ln].Product_ID - 1000];
            data[ln].Sold = data[ln].Sold * (date.getFullYear() === 2015 ? 3 : date.getFullYear() === 2016 ? 4 : date.getFullYear() === 2017 ? 2 : 5);
            data[ln].Amount = ((date.getFullYear() === 2018 ? 2 : 0) + data[ln].Sold) * amount[data[ln].Product_ID - 1000];
        }
        pivotGridObj.dataSource.data = extend([], data, null, true) as IDataSet[];
    }
    /* tslint:enable */
};
