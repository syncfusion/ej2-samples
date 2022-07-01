import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataSet, GroupingBar, PivotActionCompleteEventArgs } from '@syncfusion/ej2-pivotview';
import { DropDownList, MultiSelect, ChangeEventArgs, SelectEventArgs, RemoveEventArgs, PopupEventArgs, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { Button, CheckBox, ChangeEventArgs as CheckChange } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import { SortModel } from '@syncfusion/ej2-pivotview/src/pivotview/model/datasourcesettings-model';
enableRipple(false);
MultiSelect.Inject(CheckBoxSelection);
PivotView.Inject(GroupingBar);

/**
 * PivotView Member Custom Sorting sample.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let fieldCollections: { [key: string]: { [key: string]: Object }[] } = {};
    let isInitial: boolean = true;
    let getMembers: { [key: string]: string[] } = { 'Country': [], 'Products': [], 'Year': [], 'Order_Source': [] };
    let memOrder: string[] = [];
    let index: number;
    let data: { [key: string]: Object; }[] = [];
    let isMemberAdded: boolean = true;
    let isMemberAdded_1: boolean = true;
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            dataSource: Pivot_Data,
            expandAll: false,
            enableSorting: true,
            drilledMembers: [{name: 'Country', items: ['Germany']}],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            sortSettings: [{ name: 'Country', order: 'Ascending', membersOrder: ['France', 'United States'] }, { name: 'Year', order: 'Descending', membersOrder: ['FY 2018', 'FY 2017'] },
            { name: 'Products', order: 'Descending', membersOrder: ['Gloves', 'Bottles and Cages'] }],
            columns: [{ name: 'Year', dataType: 'string' }, { name: 'Order_Source', caption: 'Order Source' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }]
        },
        width: '100%',
        height: 300,
        gridSettings: { columnWidth: 140 },
        groupingBarSettings: { showRemoveIcon: false, showFilterIcon: false, showSortIcon: true, showValueTypeIcon: false, allowDragAndDrop: false },
        showGroupingBar: true,
        dataBound: (args: any) => {
            if (isInitial) {
                /** To fill the members for each fields into the object fieldCollections. */
                let fieldCount: number = fields.length - 1;
                while (fieldCount > -1) {
                    let members: string[] = Object.keys(pivotObj.engineModule.fieldList[fields[fieldCount].Field as string].members);
                    let memberCnt: number = members.length;
                    let memberColl: { Member: string; Checked: string; }[] = [];
                    for (let i: number = 0; i < memberCnt; i++) {
                        memberColl.push({ Member: members[i], Checked: members[i] + '_' + false });
                    }
                    fieldCollections[fields[fieldCount].Field as string] = memberColl;
                    fieldCount--;
                }
                fieldCollections.Order_Source.reverse();
                data = (fieldCollections[fields[0].Field as string]) as { [key: string]: Object }[];
                membersOrder.dataSource = data;
                fieldCollections.Country[0].Checked = "France_true";
                fieldCollections.Country[3].Checked = "United States_true";
                getMembers.Country.push('France', 'United States');
                getMembers.Year.push('FY 2018', 'FY 2017');
                getMembers.Products.push('Gloves', 'Bottles and Cages');
                membersOrder.value = updateSelectedMembers("Country").reverse();
                membersOrder.dataBind();
                isInitial = false;
            }
        },
        actionComplete: (args: PivotActionCompleteEventArgs) => {
            let sortDetails: SortModel[] = pivotObj.dataSourceSettings.sortSettings;
            for (let i: number = 0; i < (pivotObj.dataSourceSettings.rows.length + pivotObj.dataSourceSettings.columns.length); i++) {
                if (sortDetails.length > 0) {
                    if (sortDetails[i] && sortDetails[i].name === 'Country') {
                        updateOrder(sortDetails, i, 'Country', 0);
                    }
                    else if (sortDetails[i] && sortDetails[i].name === 'Products') {
                        updateOrder(sortDetails, i, 'Products', 1);
                    }
                    else if (sortDetails[i] && sortDetails[i].name === 'Year') {
                        updateOrder(sortDetails, i, 'Year', 2);
                    }
                    else if (sortDetails[i] && sortDetails[i].name === 'Order_Source') {
                        updateOrder(sortDetails, i, 'Order_Source', 3);
                    }
                }
            }
        }
    });
    pivotObj.appendTo('#PivotView');

    let order: string[] = ['Ascending', 'Descending'];
    let fields: { [key: string]: Object }[] = [
        { Field: 'Country', Order: 'Country_asc', caption: 'Country' },
        { Field: 'Products', Order: 'Products_desc', caption: 'Products' },
        { Field: 'Year', Order: 'Year_desc', caption: 'Year' },
        { Field: 'Order_Source', Order: 'Order_Source_asc', caption: 'Order Source' }
    ];

    let checkBoxObj: CheckBox = new CheckBox({
        label: 'Enable Sorting', labelPosition: 'After', checked: true,
        change: (args: CheckChange) => {
            let ischecked: boolean = args.checked;
            fieldsObj.enabled = ischecked;
            orderInfo.enabled = ischecked;
            membersOrder.enabled = ischecked;
            applyBtn.disabled = !ischecked;
            pivotObj.dataSourceSettings.enableSorting = ischecked;
        }
    });
    checkBoxObj.appendTo('#sorting');

    let membersOrder: MultiSelect = new MultiSelect({
        dataSource: data,
        mode: 'CheckBox',
        showDropDownIcon: true,
        showClearButton: false,
        enableSelectionOrder: false,
        fields: { text: 'Member' },
        select: (args: SelectEventArgs): void => {
            applyBtn.disabled = false;
            maintainCheckedState((<any>fieldsObj).itemData.Field, args.item.textContent, args.item.textContent + '_' + true);
            getMembers[(<any>fieldsObj).itemData.Field].push(args.itemData['Member']);
        },
        removed: (args: RemoveEventArgs): void => {
            maintainCheckedState((<any>fieldsObj).itemData.Field, args.item.textContent, args.item.textContent + '_' + false);
            index = getMembers[(<any>fieldsObj).itemData.Field].indexOf(args.itemData['Member']);
            if (getMembers[(<any>fieldsObj).itemData.Field].indexOf(args.itemData['Member']) > -1) {
                getMembers[(<any>fieldsObj).itemData.Field].splice(index, 1);
            }
        },
        open: (args: PopupEventArgs): void => {
            (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
        }
    });
    membersOrder.appendTo('#sorting-members');

    let fieldsObj: DropDownList = new DropDownList({
        dataSource: fields,
        fields: { text: 'caption', value: 'Order' },
        index: 0,
        enabled: true,
        change: (args: ChangeEventArgs) => {
            if (fieldsObj.dataSource[fieldsObj.index].Order === fieldsObj.dataSource[fieldsObj.index].Field + '_asc') {
                orderInfo.index = 0;
            }
            else {
                orderInfo.index = 1;
            }
            if (memOrder.length > 0) {
                if (memOrder[fieldsObj.index] === 'Ascending') {
                    orderInfo.index = 0;
                }
                else if (memOrder[fieldsObj.index] === 'Descending') {
                    orderInfo.index = 1;
                }
            }
            if (args.itemData['Field'] === 'Year' && isMemberAdded) {
                fieldCollections.Year[3].Checked = "FY 2018_true";
                fieldCollections.Year[2].Checked = "FY 2017_true";
                membersOrder.value = updateSelectedMembers("Year").reverse();
                isMemberAdded = false;
            }
            else if (args.itemData['Field'] === 'Products' && isMemberAdded_1) {
                fieldCollections.Products[9].Checked = "Gloves_true";
                fieldCollections.Products[0].Checked = "Bottles and Cages_true";
                membersOrder.value = updateSelectedMembers("Products").reverse();
                isMemberAdded_1 = false;
            }
            membersOrder.dataSource = fieldCollections[args.itemData['Field']];
            membersOrder.value = updateSelectedMembers(args.itemData['Field']);
            membersOrder.dataBind();
            orderInfo.dataBind();
        }
    });
    fieldsObj.appendTo('#sorting-fields');

    let orderInfo: DropDownList = new DropDownList({
        dataSource: order,
        index: 0,
        enabled: true,
        change: (args: ChangeEventArgs) => {
            if (args.value === 'Ascending') {
                fieldsObj.dataSource[fieldsObj.index].Order = fieldsObj.dataSource[fieldsObj.index].Field + '_asc';
            }
            else {
                fieldsObj.dataSource[fieldsObj.index].Order = fieldsObj.dataSource[fieldsObj.index].Field + '_desc';
            }
            fieldsObj.refresh();
        }
    });
    orderInfo.appendTo('#sorting-order');

    let applyBtn: Button = new Button({
        isPrimary: true,
    });
    applyBtn.appendTo('#sorting-apply');

    document.getElementById('sorting-apply').onclick = () => {
        if (checkBoxObj.checked) {
            pivotObj.setProperties({
                dataSourceSettings: {
                    enableSorting: true, sortSettings: [
                        { name: 'Country', order: fieldsObj.dataSource[0].Order === 'Country_asc' ? 'Ascending' : 'Descending', membersOrder: getMembers['Country'] },
                        { name: 'Products', order: fieldsObj.dataSource[1].Order === 'Products_asc' ? 'Ascending' : 'Descending', membersOrder: getMembers['Products'] },
                        { name: 'Year', order: fieldsObj.dataSource[2].Order === 'Year_asc' ? 'Ascending' : 'Descending', membersOrder: getMembers['Year'] },
                        { name: 'Order_Source', order: fieldsObj.dataSource[3].Order === 'Order_Source_asc' ? 'Ascending' : 'Descending', membersOrder: getMembers['Order_Source'] }
                    ]
                }
            }, true);
        }
        else {
            pivotObj.setProperties({ dataSourceSettings: { enableSorting: false, sortSettings: [] } }, true);
        }
        pivotObj.refreshData();
    }

    /** To set the checked status of the members maintained in the object fieldCollections. */
    function maintainCheckedState(field: string, member: string, checkedState: string) {
        let members: { [key: string]: Object; }[] = fieldCollections[field];
        let count: number = members.length - 1;
        while (count > -1) {
            if (members[count].Member === member) {
                members[count].Checked = checkedState;
                break;
            }
            count--;
        }
    }

    /** To get the checked members/status here as string array. */
    function updateSelectedMembers(field: string) {
        let membersCollections: string[] = [];
        let members: { [key: string]: Object; }[] = fieldCollections[field];
        let count: number = members.length - 1;
        while (count > -1) {
            if (members[count].Checked === members[count].Member + '_' + true) {
                membersCollections.push(members[count].Member.toString());
            }
            count--;
        }
        return membersCollections;
    }

    function updateOrder(sortDetails: SortModel[] , i: number, fieldName: string, j: number) {
        if (sortDetails[i].order === 'Ascending') {
            if ((<any>fieldsObj).itemData.Field === fieldName) {
                orderInfo.index = 0;
            }
            memOrder[j] = 'Ascending';
        }
        else {
            if ((<any>fieldsObj).itemData.Field === fieldName) {
                orderInfo.index = 1;
            }
            memOrder[j] = 'Descending';
        }
    }
}
