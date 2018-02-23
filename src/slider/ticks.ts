import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Slider, Placement } from '@syncfusion/ej2-inputs';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

/**
 * Ticks sample
 */

this.default = () => {
    // Initialize Slider Component
    let defaultObj: Slider = new Slider({
        // Set slider minimum and maximum values
        min: 0.1, max: 0.9,
        // Set the value for slider
        value: 0.3,
        // Set the step value
        step: 0.05,
        // Initialize ticks with placement, largestep, smallstep
        ticks: { placement:  'Before', largeStep:  0.20, smallStep:  0.05, showSmallTicks: true  }
    });
    defaultObj.appendTo('#default');

    // Initialize Slider Component
    let rangeObj: Slider = new Slider({
        // Set slider minimum and maximum values
        min: 10, max: 90,
        // Set the intial range values for slider
        value: [30, 70],
        // Set the step value
        step: 5,
        // Set the type to render range slider
        type: 'Range',
        // Initialize ticks with placement, largestep, smallstep
        ticks: { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true }
    });
    rangeObj.appendTo('#range');

    // Initialize DropDownList Component
    let listObj: DropDownList = new DropDownList({
        // Set the initial index of the list
        index: 0,
        // set the height of the dropdown list component
        popupHeight: '200px',
        // Handling the dropdown list change event to change slider ticks position
        change: () => {
            defaultObj.ticks = { placement: listObj.value as Placement };
            defaultObj.dataBind();
            rangeObj.ticks = { placement: listObj.value as Placement };
            rangeObj.dataBind();
        }
    });
    listObj.appendTo('#drop');

    // Initialize CheckBox Component
    let checkBoxObj: CheckBox = new CheckBox({
        checked: false,
        // Bind change event
        change: onChange
    });
    checkBoxObj.appendTo('#disabled');

    // Handler used to enable or disable sliders
    function onChange(args: ChangeEventArgs): void {
        defaultObj.enabled = !args.checked;
        rangeObj.enabled = !args.checked;
    }
};