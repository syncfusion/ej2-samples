import {NumericTextBox} from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
/**
 * Min-Max Range NumericTextBox sample
 */

this.default = (): void => {

    let numeric: NumericTextBox = new NumericTextBox({
        min: 10,
        max: 100,
        value: 15,
        placeholder: 'Numeric TextBox'
    });
    numeric.appendTo('#numeric');

    /** Property Panel Controls Rendering */
    let buttonApply : Button = new Button();
    buttonApply.appendTo('#buttonApply');

    document.getElementById('buttonApply').onclick = (): void => {
        let min : number = parseFloat((document.getElementById('min') as HTMLInputElement).value);
        let max : number = parseFloat((document.getElementById('max') as HTMLInputElement).value);
        let step : number = parseFloat((document.getElementById('step') as HTMLInputElement).value);

        numeric.min = min;
        numeric.max = max;
        numeric.step = step;
    };
};
