import { loadCultureFiles } from '../common/culture-loader';
import {NumericTextBox} from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
/**
 * Min-Max Range NumericTextBox sample
 */

(window as any).default = (): void => {
    loadCultureFiles();

    // Render numeric textbox with specific range
    let numeric: NumericTextBox = new NumericTextBox({
        min: 10,
        max: 100,
        value: 15
    });
    numeric.appendTo('#numeric');

    // Render Button control in properties panel
    let buttonApply : Button = new Button();
    buttonApply.appendTo('#buttonApply');

    // After clicking apply button- 'min', 'max' and 'increment step' details will be received from properties panel
    // and set it to Numeric Textbox.
    document.getElementById('buttonApply').onclick = (): void => {

        let min: number = parseFloat((document.getElementById('min') as HTMLInputElement).value);
        let max: number = parseFloat((document.getElementById('max') as HTMLInputElement).value);
        let step: number = parseFloat((document.getElementById('step') as HTMLInputElement).value);
        numeric.min = min;
        numeric.max = max;
        numeric.step = isNaN(step) ? 1 : step;
    };
};
