import { ColorPicker, Input, ColorPickerMode, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * ColorPicker API sample
 */
this.default = (): void => {
    //Initialize the ColorPicker component
    let colorPicker: ColorPicker = new ColorPicker({ value: '#0db1e7ba', change: onChange }, '#color-picker');

    // Create input element to changing color value
    let element: HTMLInputElement = <HTMLInputElement>document.getElementById('hex-input');
    Input.createInput({
        element: element
    });

    // Triggers while changing colors.
    function onChange(args: ColorPickerEventArgs): void {
        element.value = args.currentValue.hex;
    }

    let ddlObj: DropDownList = new DropDownList(
        {
            value: 'Picker',
            popupHeight: '200px',
            change: () => {
                colorPicker.mode = ddlObj.value as ColorPickerMode;
            }
        },
        '#ddl');

    let disabled: CheckBox = new CheckBox(
        {
            checked: false,
            change: (args: ChangeEventArgs) => {
                colorPicker.disabled = args.checked;
            }
        },
        '#disabled');

    let showBtn: CheckBox = new CheckBox(
        {
            checked: true,
            change: (args: ChangeEventArgs) => {
                colorPicker.showButtons = args.checked;
            }
        },
        '#show-btn');

    let modeSwitch: CheckBox = new CheckBox(
        {
            checked: true,
            change: (args: ChangeEventArgs) => {
                colorPicker.modeSwitcher = args.checked;
            }
        },
        '#mode-switch');

    element.onchange = () => {
        colorPicker.value = element.value;
    };
};
