import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { DropDownList, MultiSelect, ChangeEventArgs, SelectEventArgs, RemoveEventArgs, PopupEventArgs, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { Button, CheckBox, ChangeEventArgs as CheckChange } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);
MultiSelect.Inject(CheckBoxSelection);

/**
 * PivotView Member Custom Sorting sample.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let fieldCollections: { [key: string]: { [key: string]: Object }[] } = {};
    let isInitial: boolean = true;
    let storeMembers: { [key: string]: string[] } = { 'Country': [], 'Year': [] };
    let isRowSelect: boolean = false;
    let isColumnSelect: boolean = false;
    let values: { [key: string]: Object }[] = [];
    let index: number;
    let options: { [key: string]: Object; }[] = [
        { value: 'allHeaders', text: 'All headers' },
        { value: 'rowHeaders', text: 'Row headers' },
        { value: 'columnHeader', text: 'Column headers' },
        { value: 'specificFields', text: 'Specific fields' },
        { value: 'specificHeaders', text: 'Specific headers' }
    ];
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            dataSource: Pivot_Data,
            expandAll: false,
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            rows: [{ name: 'Country', expandAll: true }, { name: 'Products' }],
            columns: [{ name: 'Year', dataType: 'string' }, { name: 'Order_Source', caption: 'Order Source' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
        },
        dataBound: (args: any) => {
            if (isInitial) {
                /** To fill the members for each fields into the object fieldCollections. */
                let fieldCnt: number = fields.length - 1;
                while (fieldCnt > -1) {
                    let members: string[] = Object.keys(pivotObj.engineModule.fieldList[fields[fieldCnt].Field as string].members);
                    let memberCnt: number = members.length;
                    let membersCollection: { Member: string; Checked: string; }[] = [];
                    for (let i: number = 0; i < memberCnt; i++) {
                        membersCollection.push({ Member: members[i], Checked: members[i] + '_' + false });
                    }
                    fieldCollections[fields[fieldCnt].Field as string] = membersCollection;
                    fieldCnt--;
                }
                values = fieldCollections[fields[0].Field as string];
                membersOrder.dataSource = values;
                membersOrder.dataBind();
                fieldsddl.dataBind();
                isInitial = false;
            }
        },
        width: '100%',
        height: 300,
        gridSettings: { columnWidth: 140 },
    });
    pivotObj.appendTo('#PivotView');

    let fields: { [key: string]: Object }[] = [
        { Field: 'Country', expandAll: false },
        { Field: 'Year', expandAll: false }
    ];

    let fieldsddl: MultiSelect = new MultiSelect({
        dataSource: fields,
        mode: 'CheckBox',
        showDropDownIcon: true,
        enabled: true,
        showClearButton: false,
        enableSelectionOrder: false,
        fields: { text: 'Field' },
        select: (args: SelectEventArgs): void => {
            membersOrder.value = [];
            if (storeMembers['Country'].length > 0 || storeMembers['Year'].length > 0) {
                storeMembers = { 'Country': [], 'Year': [] };
                isInitial = true;
            }
            if (args.itemData['Field'] === 'Country') {
                pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
                updateRowColumn(false, true, isColumnSelect);
                isRowSelect = true;
            }
            else if (args.itemData['Field'] === 'Year') {
                pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
                updateRowColumn(false, isRowSelect, true);
                isColumnSelect = true;
            }
        },
        removed: (args: RemoveEventArgs): void => {
            if (args.itemData['Field'] === 'Country') {
                updateRowColumn(false, false, isColumnSelect);
                isRowSelect = false;
            }
            else if (args.itemData['Field'] === 'Year') {
                updateRowColumn(false, isRowSelect, false);
                isColumnSelect = false;
            }
        },
        open: (args: PopupEventArgs): void => {
            (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
        }
    });
    fieldsddl.appendTo('#expand-fields');

    let optionsdll: DropDownList = new DropDownList({
        dataSource: options,
        fields: { value: 'value', text: 'text' },
        value: 'rowHeaders',
        width: '100%',
        change: (args: ChangeEventArgs) => {
            (document.querySelector('.field_cls') as HTMLElement).style.display = 'none';
            (document.querySelector('.field_cls_1') as HTMLElement).style.display = 'none';
            (document.querySelector('.members_cls') as HTMLElement).style.display = 'none';
            (document.querySelector('.apply_cls') as HTMLElement).style.display = 'none';
            if (args.value == 'allHeaders') {
                clear();
                pivotObj.setProperties({ dataSourceSettings: { expandAll: true, drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
                pivotObj.refreshData();
            } else if (args.value == 'rowHeaders') {
                clear();
                pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
                updateRowColumn(false, true, false);
            } else if (args.value == 'columnHeader') {
                clear();
                pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
                updateRowColumn(false, false, true);
            } else if (args.value == 'specificFields') {
                (document.querySelector('.field_cls') as HTMLElement).style.display = '';
            } else if (args.value == 'specificHeaders') {
                (document.querySelector('.field_cls_1') as HTMLElement).style.display = '';
                (document.querySelector('.members_cls') as HTMLElement).style.display = '';
                (document.querySelector('.apply_cls') as HTMLElement).style.display = '';
            }
        }
    });
    optionsdll.appendTo('#expandall');

    let field1: DropDownList = new DropDownList({
        dataSource: fields,
        fields: { text: 'Field' },
        value: 'Country',
        width: '100%',
        change: (args: ChangeEventArgs) => {
            membersOrder.dataSource = fieldCollections[args.itemData['Field']];
            membersOrder.value = getSelectedMembers(args.itemData['Field']);
            membersOrder.dataBind();
            field1.dataBind();
        }
    });
    field1.appendTo('#expand-fields-1');

    let membersOrder: MultiSelect = new MultiSelect({
        dataSource: values,
        mode: 'CheckBox',
        showDropDownIcon: true,
        showClearButton: false,
        enableSelectionOrder: false,
        fields: { text: 'Member' },
        select: (args: SelectEventArgs): void => {
            setMemberCheckedState((<any>field1).itemData.Field, args['item'].textContent, args['item'].textContent + '_' + true);
            applyBtn.disabled = false;
            storeMembers[(<any>field1).itemData.Field].push(args.itemData['Member']);
        },
        removed: (args: RemoveEventArgs): void => {
            setMemberCheckedState((<any>field1).itemData.Field, args['item'].textContent, args['item'].textContent + '_' + false);
            index = storeMembers[(<any>field1).itemData.Field].indexOf(args.itemData['Member']);
            if (storeMembers[(<any>field1).itemData.Field].indexOf(args.itemData['Member']) > -1) {
                storeMembers[(<any>field1).itemData.Field].splice(index, 1);
            }
        },
        open: (args: PopupEventArgs): void => {
            (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
        }
    });
    membersOrder.appendTo('#expand-members');

    let applyBtn: Button = new Button({
        isPrimary: true,
    });
    applyBtn.appendTo('#expand-apply');

    document.getElementById('expand-apply').onclick = () => {
        fieldsddl.value = [];
        isRowSelect = false;
        isColumnSelect = false;
        pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: storeMembers['Country'] }, { name: 'Year', items: storeMembers['Year'] }] } }, true);
        updateRowColumn(false, false, false);
    };

    /** To set the checked status of the members maintained in the object fieldCollections. */
    function setMemberCheckedState(field: string, member: string, checkedState: string) {
        let members: { [key: string]: Object; }[] = fieldCollections[field];
        let membersLength: number = members.length - 1;
        while (membersLength > -1) {
            if (members[membersLength].Member === member) {
                members[membersLength].Checked = checkedState;
                break;
            }
            membersLength--;
        }
    }

    /** To get the checked members/status here as string array. */
    function getSelectedMembers(field: string) {
        let membersCollection: string[] = [];
        let members: { [key: string]: Object; }[] = fieldCollections[field];
        let membersLength = members.length - 1;
        while (membersLength > -1) {
            if (members[membersLength].Checked === members[membersLength].Member + '_' + true) {
                membersCollection.push(members[membersLength].Member.toString());
            }
            membersLength--;
        }
        return membersCollection;
    }

    function updateRowColumn(isExpand: boolean, isRowExpand: boolean, isColumnExpand: boolean) {
        pivotObj.setProperties({
            dataSourceSettings: {
                expandAll: isExpand, rows: [
                    { name: 'Country', expandAll: fieldsddl.dataSource[0].expandAll = isRowExpand },
                    { name: 'Products' }
                ], columns: [
                    { name: 'Year', expandAll: fieldsddl.dataSource[1].expandAll = isColumnExpand },
                    { name: 'Order_Source' }
                ]
            }
        }, true);
        pivotObj.refreshData();
    }

    function clear() {
        fieldsddl.value = [];
        isRowSelect = false;
        isColumnSelect = false;
        membersOrder.value = [];
        if (storeMembers['Country'].length > 0 || storeMembers['Year'].length > 0) {
            storeMembers = { 'Country': [], 'Year': [] };
            isInitial = true;
        }
    }
}
