/**
 * Sample allows user to apply their own mask and prompt character for MaskedTextBox.
 * User can edit the MaskedTextBox with the applied mask, prompt character and get corresponding raw and masked values.
 */
import { MaskedTextBox, Input, MaskChangeEventArgs } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

this.default = (): void => {
    // Create input element to customize mask value
    let element: HTMLInputElement = <HTMLInputElement>document.getElementById('input1');
    Input.createInput({
        element: element
    });
    // Element to set prompt character
    let ele1: HTMLInputElement = <HTMLInputElement>document.getElementById('input1');
    // Elements to display masked and unmasked value
    let ele3: HTMLElement = <HTMLElement>document.getElementById('val1');
    let ele4: HTMLElement = <HTMLElement>document.getElementById('val2');
    // Render dropdown to set prompt character for Masked Textbox
    let ddlObj: DropDownList = new DropDownList({
        popupHeight: '200px',
        change: () => {
            mask.setProperties({ promptChar: ddlObj.value });
            ele3.innerHTML = mask.value;
            ele4.innerHTML = mask.getMaskedValue();
        }
    });
    ddlObj.appendTo('#ddl');
    // Render the Masked Textbox
    let mask: MaskedTextBox = new MaskedTextBox({
        mask: '(999)-999-9999',
        change: (args: MaskChangeEventArgs) => {
            ele3.innerHTML = args.value;
            ele4.innerHTML = args.maskedValue;
        },
        floatLabelType: 'Never'
    });
    ele1.value = '(999)-999-9999';
    mask.appendTo('#mask1');
    ele4.innerHTML = mask.getMaskedValue();
    // Mask will be updated for MaskedTextBox, whenever mask format from properties panel has been changed
    ele1.oninput = () => {
        let start: number = ele1.selectionStart;
        let end: number = ele1.selectionEnd;
        mask.setProperties({ mask: ele1.value });
        ele1.setSelectionRange(start, end);
        ele3.innerHTML = mask.value;
        ele4.innerHTML = mask.getMaskedValue();
    };
};
