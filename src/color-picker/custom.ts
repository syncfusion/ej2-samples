import { loadCultureFiles } from '../common/culture-loader';
import { ColorPicker, ColorPickerEventArgs, PaletteTileEventArgs } from '@syncfusion/ej2-inputs';
import { Browser, createElement, addClass, select } from '@syncfusion/ej2-base';

/**
 * ColorPicker Custom sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let colorPicker: ColorPicker = new ColorPicker(
        {
            mode: 'Palette',
            modeSwitcher: false,
            inline: true,
            showButtons: false,
            columns: 4,
            presetColors: {
                'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                    '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
            },
            beforeTileRender: (args: PaletteTileEventArgs) => {
                args.element.classList.add('e-circle-palette');
                args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
            },
            change: change
        },
        '#circle-palette');

    colorPicker = new ColorPicker(
        {
            mode: 'Palette',
            modeSwitcher: false,
            inline: true,
            showButtons: false,
            columns: 8,
            presetColors: {
                'custom1': ['#b80000', '#db3e00', '#fccb00', '#008b02', '#006b76', '#1273de', '#004dcf',
                    '#5300eb', '#eb9694', '#fad0c3', '#fef3bd', '#c1e1c5', '#bedadc', '#c4def6', '#bed3f3',
                    '#d4c4fb']
            },
            beforeTileRender: (args: PaletteTileEventArgs) => {
                args.element.classList.add('e-square-palette');
            },
            change: change
        },
        '#square-palette');

    colorPicker = new ColorPicker(
        {
            mode: 'Palette',
            modeSwitcher: false,
            inline: true,
            showButtons: false,
            columns: 5,
            presetColors: {
                'custom1': ['#ff6900', '#fcb900', '#7bdcb5', '#00d084', '#8ed1fc', '#0693e3', '#abb8c3', '#eb144c',
                    '#f78da7', '#9900ef']
            },
            beforeTileRender: (args: PaletteTileEventArgs) => {
                args.element.classList.add('e-rounded-palette');
            },
            change: (args: ColorPickerEventArgs): void => {
                (select('.e-selected') as HTMLElement).style.boxShadow = args.currentValue.hex + ' 0 0 4px';
                document.getElementById('e-shirt-preview').style.backgroundColor = args.currentValue.hex;
            }
        },
        '#rounded-palette');

    colorPicker = new ColorPicker(
        {
            mode: 'Palette',
            modeSwitcher: false,
            inline: true,
            showButtons: false,
            columns: 4,
            presetColors: {
                'custom1': ['#ef9a9a', '#e57373', '#ef5350', '#f44336', '#f48fb1', '#f06292',
                    '#ec407a', '#e91e63', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#b39ddb',
                    '#9575cd', '#7e57c2', '#673AB7'],
                'custom2': ['#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#90CAF9', '#64B5F6',
                    '#42A5F5', '#2196F3', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4',
                    '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4'],
                'custom3': ['#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#A5D6A7', '#81C784',
                    '#66BB6A', '#4CAF50', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#E6EE9C',
                    '#DCE775', '#D4E157', '#CDDC39'],
                'custom4': ['#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FFE082', '#FFD54F',
                    '#FFCA28', '#FFC107', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FFAB91',
                    '#FF8A65', '#FF7043', '#FF5722']
            },
            beforeTileRender: (args: PaletteTileEventArgs) => {
                addClass([args.element], ['e-icons', 'e-scroll-palette']);
            },
            change: change
        },
        '#scroll-palette');
// custom code start 
    if (Browser.isDevice) {
        document.getElementById('colorpicker-control').classList.add('e-mobile-control');
    }
// custom code end
    /**
     * Triggers while changing colors.
     */
    function change(args: ColorPickerEventArgs): void {
        document.getElementById('e-shirt-preview').style.backgroundColor = args.currentValue.hex;
    }
};
