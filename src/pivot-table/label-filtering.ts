import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, Operators, IDataSet } from '@syncfusion/ej2-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { MaskedTextBox, MaskChangeEventArgs } from '@syncfusion/ej2-inputs';
import { FilterModel } from '@syncfusion/ej2-pivotview/src/pivotview/model/datasourcesettings-model';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);

/**
 * PivotView Filtering Sample.
 */

/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let fieldCollections: { [key: string]: FilterModel } = {};
    let operators: string[] = ['Equals', 'DoesNotEquals', 'BeginWith', 'DoesNotBeginWith', 'EndsWith',
        'DoesNotEndsWith', 'Contains', 'DoesNotContains', 'GreaterThan',
        'GreaterThanOrEqualTo', 'LessThan', 'LessThanOrEqualTo', 'Between', 'NotBetween'];
    let fields: string[] = ['Country', 'Products', 'Year'];
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            allowLabelFilter: true,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }],
            dataSource: Pivot_Data,
            expandAll: false
        },
        dataBound: (args: any): void => {
            fieldCollections = {};
            for (let field of pivotObj.dataSourceSettings.filterSettings) {
                fieldCollections[field.name] = field;
            }
        },
        width: '100%',
        height: 300,
        gridSettings: { columnWidth: 140 }
    });
    pivotObj.appendTo('#PivotView');

    let fieldsddl: DropDownList = new DropDownList({
        dataSource: fields,
        index: 0,
        width: '100%',
        change: (args: ChangeEventArgs) => {
            if (fieldCollections[args.value as string]) {
                operatorddl.value = fieldCollections[args.value as string].condition;
                valueInput1.value = fieldCollections[args.value as string].value1 as string;
                valueInput2.value = fieldCollections[args.value as string].value2 as string;
            } else {
                setFilters(args.value as string, 'DoesNotEquals', '', '');
                operatorddl.value = 'DoesNotEquals';
                valueInput1.value = '';
                valueInput2.value = '';
            }
            updateButtonState();
        }
    });
    fieldsddl.appendTo('#label-fields');
    let operatorddl: DropDownList = new DropDownList({
        dataSource: operators,
        value: 'DoesNotEquals',
        change: (args: ChangeEventArgs) => {
            if (args.value === 'Between' || args.value === 'NotBetween') {
                (document.querySelector('.input2cls') as HTMLElement).style.display = '';
            } else {
                (document.querySelector('.input2cls') as HTMLElement).style.display = 'none';
            }
            setFilters(fieldsddl.value as string, args.value as Operators, valueInput1.value, valueInput2.value);
            updateButtonState();
        }
    });
    operatorddl.appendTo('#label-conditions');
    let valueInput1: MaskedTextBox = new MaskedTextBox({
        value: '',
        placeholder: 'Example: "Germany"',
        change: (e: MaskChangeEventArgs) => {
            setFilters(fieldsddl.value as string, operatorddl.value as Operators, e.value, valueInput2.value);
            updateButtonState();
        },
        width: '100%'
    });
    valueInput1.appendTo('#label-value1');
    let valueInput2: MaskedTextBox = new MaskedTextBox({
        value: '',
        placeholder: 'Example: "States"',
        change: (e: MaskChangeEventArgs) => {
            setFilters(fieldsddl.value as string, operatorddl.value as Operators, valueInput1.value, e.value);
            updateButtonState();
        },
        width: '100%'
    });
    valueInput2.appendTo('#label-value2');
    let applyBtn: Button = new Button({
        isPrimary: true, disabled: true
    });
    applyBtn.appendTo('#label-apply');

    let clearBtn: Button = new Button();
    clearBtn.appendTo('#label-clear');

    function setFilters(fieldName: string, condition: Operators, operand1: string, operand2: string) {
        fieldCollections[fieldName] = {
            name: fieldName,
            type: 'Label',
            condition: condition,
            value1: operand1,
            value2: operand2
        };
    }

    function updateButtonState() {
        applyBtn.disabled = true;
        for (let field of fields) {
            if (fieldCollections[field] && (fieldCollections[field].value1 !== '' || fieldCollections[field].value2 !== '')) {
                applyBtn.disabled = false;
                break;
            };
        }
    }

    document.getElementById('label-apply').onclick = () => {
        let filterOptions: FilterModel[] = [];
        for (let field of fields) {
            if (fieldCollections[field] && fieldCollections[field].value1 !== '') {
                filterOptions.push(fieldCollections[field]);
            }
        }
        if (filterOptions.length === 0) {
            filterOptions = [{
                name: fieldsddl.value as string,
                type: 'Label',
                condition: operatorddl.value as Operators,
                value1: valueInput1.value.toString(),
                value2: valueInput2.value.toString()
            }];
        }
        pivotObj.dataSourceSettings.filterSettings = filterOptions;
    };

    document.getElementById('label-clear').onclick = () => {
        pivotObj.dataSourceSettings.filterSettings = [];
        valueInput1.value = '';
        valueInput2.value = '';
        fieldCollections = {};
        updateButtonState();
    }
};