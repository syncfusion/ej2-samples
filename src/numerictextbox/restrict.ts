import {NumericTextBox} from '@syncfusion/ej2-inputs';
/**
 * Restrict NumericTextBox sample
 */

this.default = (): void => {

    let numeric: NumericTextBox = new NumericTextBox({
        format: 'n3',
        decimals: 3,
        validateDecimalOnType: true,
        value: 10,
        placeholder: 'Numeric TextBox'
    });
    numeric.appendTo('#numeric');

    let percent: NumericTextBox = new NumericTextBox({
        format: 'p3',
        decimals: 3,
        validateDecimalOnType: true,
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
        placeholder: 'Percentage TextBox'
    });
    percent.appendTo('#percent');

    let currency: NumericTextBox = new NumericTextBox({
        format: 'c3',
        decimals: 3,
        validateDecimalOnType: true,
        value: 100,
        placeholder: 'Currency TextBox'
    });
    currency.appendTo('#currency');
};
