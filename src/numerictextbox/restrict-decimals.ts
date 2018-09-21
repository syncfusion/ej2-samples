import {NumericTextBox} from '@syncfusion/ej2-inputs';
/**
 * Restrict NumericTextBox sample
 */

this.default = (): void => {

    // Render the Numeric Textbox with decimal places as 3
    let numeric: NumericTextBox = new NumericTextBox({
        format: 'n3',
        decimals: 3,
        validateDecimalOnType: true,
        value: 10
    });
    numeric.appendTo('#numeric');

    // Render the Percentage Textbox with decimal places as 3
    let percent: NumericTextBox = new NumericTextBox({
        format: 'p3',
        decimals: 3,
        validateDecimalOnType: true,
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01
    });
    percent.appendTo('#percent');

    // Render the Currency Textbox with decimal places as 3
    let currency: NumericTextBox = new NumericTextBox({
        format: 'c3',
        decimals: 3,
        validateDecimalOnType: true,
        value: 100
    });
    currency.appendTo('#currency');
};
