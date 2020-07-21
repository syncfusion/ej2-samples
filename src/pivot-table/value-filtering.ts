import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, Operators, IDataSet } from '@syncfusion/ej2-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { NumericTextBox, ChangeEventArgs as NumericEventArgs } from '@syncfusion/ej2-inputs';
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
    let operators: string[] = ['Equals', 'DoesNotEquals', 'GreaterThan', 'GreaterThanOrEqualTo',
        'LessThan', 'LessThanOrEqualTo', 'Between', 'NotBetween'];
    let fields: string[] = ['Country', 'Products', 'Year'];
    let measures: { [key: string]: Object }[] = [
        { value: 'In_Stock', text: 'In Stock' },
        { value: 'Sold', text: 'Units Sold' },
        { value: 'Amount', text: 'Sold Amount' }];
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            allowValueFilter: true,
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
                measuresddl.value = fieldCollections[args.value as string].measure;
                operatorddl.value = fieldCollections[args.value as string].condition;
            } else {
                setFilters(args.value as string, 'In_Stock', 'DoesNotEquals', '', '');
                operatorddl.value = 'DoesNotEquals';
                measuresddl.value = 'In_Stock';
            }
        }
    });
    fieldsddl.appendTo('#value-fields');
    let measuresddl: DropDownList = new DropDownList({
        dataSource: measures,
        fields: { value: 'value', text: 'text' },
        value: 'In_Stock',
        width: '100%',
        change: (args: ChangeEventArgs) => {
            setFilters(fieldsddl.value as string, args.value as string, operatorddl.value as Operators, valueInput1.value.toString(), valueInput2.value.toString());
        }
    });
    measuresddl.appendTo('#value-measures');
    let operatorddl: DropDownList = new DropDownList({
        dataSource: operators,
        value: 'DoesNotEquals',
        change: (args: ChangeEventArgs) => {
            if (args.value === 'Between' || args.value === 'NotBetween') {
                (document.querySelector('.input2cls') as HTMLElement).style.display = '';
            } else {
                (document.querySelector('.input2cls') as HTMLElement).style.display = 'none';
            }
            setFilters(fieldsddl.value as string, measuresddl.value as string, args.value as Operators, valueInput1.value.toString(), valueInput2.value.toString());
        }
    });
    operatorddl.appendTo('#value-conditions');
    let valueInput1: NumericTextBox = new NumericTextBox({
        value: 0,
        placeholder: "Example: 9590",
        change: (e: NumericEventArgs) => {
            setFilters(fieldsddl.value as string, measuresddl.value as string, operatorddl.value as Operators, e.value.toString(), valueInput2.value.toString());
        },
        width: '100%'
    });
    valueInput1.appendTo('#value-value1');
    let valueInput2: NumericTextBox = new NumericTextBox({
        value: 0,
        placeholder: "Example: 17500",
        change: (e: NumericEventArgs) => {
            setFilters(fieldsddl.value as string, measuresddl.value as string, operatorddl.value as Operators, valueInput1.value.toString(), e.value.toString());
        },
        width: '100%'
    });
    valueInput2.appendTo('#value-value2');
    let applyBtn: Button = new Button({
        isPrimary: true
    });
    applyBtn.appendTo('#value-apply');

    let clearBtn: Button = new Button();
    clearBtn.appendTo('#value-clear');

    function setFilters(fieldName: string, measureName: string, condition: Operators, operand1: string, operand2: string) {
        fieldCollections[fieldName] = {
            name: fieldName,
            measure: measureName,
            type: 'Value',
            condition: condition,
            value1: operand1,
            value2: operand2
        };
    }

    document.getElementById('value-apply').onclick = () => {
        let filterOptions: FilterModel[] = [];
        filterOptions = [{
            name: fieldsddl.value as string,
            type: 'Value',
            measure: measuresddl.value as string,
            condition: operatorddl.value as Operators,
            value1: valueInput1.value === null ? '1' : valueInput1.value.toString(),
            value2: valueInput2.value === null ? '1' : valueInput2.value.toString()
        }];
        pivotObj.dataSourceSettings.filterSettings = filterOptions;
    };
    document.getElementById('value-clear').onclick = () => {
        pivotObj.dataSourceSettings.filterSettings = [];
        valueInput1.value = 0;
        valueInput2.value = 0;
    };
};