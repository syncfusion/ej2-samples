import {NumericTextBox} from '@syncfusion/ej2-inputs';
/**
 * Custom format NumericTextBox sample
 */

this.default = (): void => {

    // Render the Numeric Textbox
    let numeric: NumericTextBox = new NumericTextBox({
        format: '###.### km',
        value: 250,
        min: 0
    });
    numeric.appendTo('#numeric');

    // Render the Percentage Textbox
    let percent: NumericTextBox = new NumericTextBox({
        format: '### \'%\'',
        min: 0,
        value: 25,
        max: 100
    });
    percent.appendTo('#percent');

    // Render the Currency Textbox
    let currency: NumericTextBox = new NumericTextBox({
        format: '$ ###.##',
        min: 0,
        value: 1025
    });
    currency.appendTo('#currency');
};
