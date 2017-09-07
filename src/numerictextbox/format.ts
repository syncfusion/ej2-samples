import {NumericTextBox} from '@syncfusion/ej2-inputs';
/**
 * Custom format NumericTextBox sample
 */

this.default = (): void => {

    let numeric: NumericTextBox = new NumericTextBox({
        placeholder: 'Enter the distance',
        format: '###.### km',
        value: 250,
        min: 0,
        floatLabelType: 'Auto'
    });
    numeric.appendTo('#numeric');

    let percent: NumericTextBox = new NumericTextBox({
        format: '### \'%\'',
        placeholder: 'Enter the tax',
        min: 0,
        value: 25,
        max: 100,
        floatLabelType: 'Auto'
    });
    percent.appendTo('#percent');

    let currency: NumericTextBox = new NumericTextBox({
        format: '$ ###.##',
        placeholder: 'Enter the amount',
        min: 0,
        value: 1025,
        floatLabelType: 'Auto'
    });
    currency.appendTo('#currency');
};
