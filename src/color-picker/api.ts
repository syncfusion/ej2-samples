import { loadCultureFiles } from '../common/culture-loader';
import { ColorPicker, Input, ColorPickerMode, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * ColorPicker API sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
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

    new CheckBox(
        {
            checked: false,
            change: (args: ChangeEventArgs) => {
                colorPicker.disabled = args.checked;
            }
        },
        '#disabled');

    new CheckBox(
        {
            checked: true,
            change: (args: ChangeEventArgs) => {
                colorPicker.showButtons = args.checked;
            }
        },
        '#show-btn');

    new CheckBox(
        {
            checked: true,
            change: (args: ChangeEventArgs) => {
                colorPicker.modeSwitcher = args.checked;
            }
        },
        '#mode-switch');

    element.oninput = () => {
        const val: string = element.value;
        // Sets to color picker default color value if user types the invalid hex code.
        colorPicker.value = val && val.length > 2 ? (val[0] !== '#' ? `#${val}` : val) : '#008000';
    };
};
