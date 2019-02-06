
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { DropDownList, MultiSelect, ChangeEventArgs, SelectEventArgs, RemoveEventArgs, PopupEventArgs } from '@syncfusion/ej2-dropdowns';
import { CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { FilterModel } from '@syncfusion/ej2-pivotview/src/pivotview/model/dataSource-model';
enableRipple(false);
MultiSelect.Inject(CheckBoxSelection);

/**
 * PivotView Filtering Sample.
 */

/* tslint:disable */
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
this.default = (): void => {
    let fieldCollections: { [key: string]: { [key: string]: Object }[] } = {};
    let filterCollections: { [key: string]: FilterModel } = {};
    let isInitial: boolean = true;
    let type: string[] = ['Include', 'Exclude'];
    let values: { [key: string]: Object }[] = [];
    let fields: string[] = ['Country', 'Products', 'Year'];
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }],
            data: Pivot_Data,
            expandAll: false
        },
        dataBound: (args: any): void => {
            if (isInitial) {
                /** To fill the members for each fields into the object fieldCollections. */
                let fieldCnt: number = fields.length - 1;
                while (fieldCnt > -1) {
                    let members: string[] = Object.keys(pivotGridObj.engineModule.fieldList[fields[fieldCnt]].members);
                    let memberCnt: number = members.length - 1;
                    let memberColl: { [key: string]: Object }[] = [];
                    while (memberCnt > -1) {
                        memberColl.push({ Member: members[memberCnt], Checked: members[memberCnt] + '_' + false });
                        memberCnt--;
                    }
                    fieldCollections[fields[fieldCnt]] = memberColl;
                    fieldCnt--;
                }
                values = fieldCollections[fields[0]];
                isInitial = false;
            }
            for (let field of pivotGridObj.dataSource.filterSettings) {
                filterCollections[field.name] = field;
            }
        },
        width: '100%',
        height: 300,
        gridSettings: { columnWidth: 140 }
    });
    pivotGridObj.appendTo('#PivotView');

    let valuesddl: MultiSelect = new MultiSelect({
        dataSource: values,
        mode: 'CheckBox',
        showDropDownIcon: true,
        showClearButton: false,
        enableSelectionOrder: false,
        fields: { text: 'Member' },
        select: (args: SelectEventArgs): void => {
            applyBtn.disabled = false;
            setMemberCheckedState((<any>fieldsddl).itemData, args.item.textContent, args.item.textContent + '_' + true);
        },
        removed: (args: RemoveEventArgs): void => {
            setMemberCheckedState((<any>fieldsddl).itemData, args.item.textContent, args.item.textContent + '_' + false);
            setApplyBtnState();
        },
        open: (args: PopupEventArgs): void => {
            (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
        }
    });
    valuesddl.appendTo('#values');

    let fieldsddl: DropDownList = new DropDownList({
        dataSource: fields,
        index: 0,
        width: '98%',
        change: (args: ChangeEventArgs) => {
            valuesddl.dataSource = fieldCollections[args.value.toString()];
            valuesddl.value = getSelectedMembers(args.value.toString());
            if (filterCollections[args.value.toString()]) {
                typeddl.value = filterCollections[args.value.toString()].type;
            }
            valuesddl.dataBind();
            typeddl.dataBind();
        }
    });
    fieldsddl.appendTo('#fields');

    let typeddl: DropDownList = new DropDownList({
        dataSource: type,
        width: '98%',
        index: 1
    });
    typeddl.appendTo('#type');

    let applyBtn: Button = new Button({
        isPrimary: true, disabled: true
    });
    applyBtn.appendTo('#apply');

    document.getElementById('apply').onclick = () => {
        /** You can set your filter settings here. */
        pivotGridObj.dataSource.filterSettings = [
            { name: fields[0], items: getSelectedMembers(fields[0]), type: updateFilterType(fields[0]) },
            { name: fields[1], items: getSelectedMembers(fields[1]), type: updateFilterType(fields[1]) },
            { name: fields[2], items: getSelectedMembers(fields[2]), type: updateFilterType(fields[2]) }
        ];
    };

    function updateFilterType(fieldName: string) {
        if ((fieldsddl as any).itemData === fieldName) {
            return (typeddl as any).itemData;
        } else if (filterCollections[fieldName]) {
            return filterCollections[fieldName].type;
        } else {
            return 'Exclude'
        }
    }

    /** To get the checked members here as string array. */
    function getSelectedMembers(field: string) {
        let membersColl: string[] = [];
        let members: { [key: string]: Object }[] = fieldCollections[field];
        let memLength: number = members.length - 1;
        while (memLength > -1) {
            if (members[memLength]['Checked'] === members[memLength]['Member'] + '_' + true) {
                membersColl.push(members[memLength]['Member'].toString());
            }
            memLength--;
        }
        return membersColl;
    }

    /** To set the checked status of the members maintained in the object fieldCollections. */
    function setMemberCheckedState(field: string, member: string, checkedState: string) {
        let members: { [key: string]: Object }[] = fieldCollections[field];
        let memLength: number = members.length - 1;
        while (memLength > -1) {
            if (members[memLength]['Member'] === member) {
                members[memLength]['Checked'] = checkedState;
                break;
            }
            memLength--;
        }
    }

    /** To set disabled/enabled state in the Apply button. */
    function setApplyBtnState() {
        let fieldArray: string[] = ['Country', 'Products', 'Year'];
        let loopCount = fieldArray.length - 1;
        let isSelected: boolean = false;
        while (loopCount > -1) {
            if (getSelectedMembers(fieldArray[loopCount]).length > 0) {
                isSelected = true;
                break;
            }
            loopCount--;
        }
        applyBtn.disabled = !isSelected;
    }
};
