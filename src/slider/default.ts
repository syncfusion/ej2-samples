import { loadCultureFiles } from '../common/culture-loader';
import { Slider } from '@syncfusion/ej2-inputs';

/**
 * Default sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // Initialize Slider component
    let defaultObj: Slider = new Slider({
        // Set the value for slider
        value: 30
    });
    defaultObj.appendTo('#default');

    // Initialize Slider component
    let minRangeObj: Slider = new Slider({
        // Set the value for slider
        value: 30,
        // Set the type to render MinRange slider
        type: 'MinRange'
    });
    minRangeObj.appendTo('#minrange');

    // Initialize Slider component
    let rangeObj: Slider = new Slider({
        // Set the initial range values for slider
        value: [30, 70],
        // Set the type to render range slider
        type: 'Range'
    });
    rangeObj.appendTo('#range');

};