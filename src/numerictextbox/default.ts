import {NumericTextBox} from '@syncfusion/ej2-inputs';
/**
 * Default NumericTextBox sample
 */

this.default = (): void => {
    // Render the Numeric Textbox
    let numeric: NumericTextBox = new NumericTextBox({
        value: 10
    });
    numeric.appendTo('#numeric');

    // Render the Percentage Textbox
    let percent: NumericTextBox = new NumericTextBox({
        format: 'p2',
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01
    });
    percent.appendTo('#percent');

    // Render the Currency Textbox
    let currency: NumericTextBox = new NumericTextBox({
        format: 'c2',
        value: 100
    });
    currency.appendTo('#currency');
};
