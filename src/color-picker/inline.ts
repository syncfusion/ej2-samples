import { loadCultureFiles } from '../common/culture-loader';
import { ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Inline Mode ColorPicker sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let colorPicker: ColorPicker = new ColorPicker(
        {
            value: '#008000',
            mode: 'Palette',
            modeSwitcher: false,
            inline: true,
            showButtons: false,
            change: change
        },
        '#inline-color-palette');

    colorPicker = new ColorPicker(
        {
            value: '#008000',
            mode: 'Picker',
            modeSwitcher: false,
            showButtons: false,
            inline: true,
            change: change
        },
        '#inline-color-picker');

    if (Browser.isDevice) {
        document.getElementById('colorpicker-control').classList.add('e-mobile-control');
    }

    /**
     * Triggers while changing colors
     */
    function change(args: ColorPickerEventArgs): void {
        document.getElementById('preview').style.backgroundColor = args.currentValue.rgba;
    }
};
