import { loadCultureFiles } from '../common/culture-loader';
/**
 * Sample of NumericTextBox, MaskedTextBox,ColorPicker and Slider which is intregrated with InPlaceEditor
 */

import { InPlaceEditor, ColorPicker, Slider } from '@syncfusion/ej2-inplace-editor';
import { DropDownList, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-dropdowns';

InPlaceEditor.Inject(ColorPicker, Slider);

(window as any).default = (): void => {
    loadCultureFiles();
    let numericObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'Numeric',
        value: '$100.00',
        model: {
            format: 'c2',
            value: 100,
            placeholder: 'Currency format'
        }
    });
    numericObj.appendTo('#numericTextBoxEle');

    let maskedObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'Mask',
        value: '012-345-6789',
        model: {
            mask: '000-000-0000'
        }
    });
    maskedObj.appendTo('#maskedTextBoxEle');

    let colorPickerObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'Color',
        value: '#008000ff',
    });
    colorPickerObj.appendTo('#colorPickerEle');

    let sliderObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'Slider',
        value: '200',
        popupSettings: {
            model: { width: 200 }
        },
        model: {
            width: 150,
            min: 100,
            max: 1000,
            value: 200,
            cssClass: 'e-slide-custom',
            step: 100,
            ticks: { placement: 'Before', largeStep: 200, smallStep: 100, showSmallTicks: true  },
        }
    });
    sliderObj.appendTo('#sliderEle');
    let editorMode: DropDownList = new DropDownList({
        width: '90%',
        change: changeEditorMode
    });
    // render initialized DropDownList component
    editorMode.appendTo('#editorMode_input');

    function changeEditorMode(e: DropDownChangeArgs): void {
        if (e.itemData.value === 'popup') {
            numericObj.mode = 'Popup';
            maskedObj.mode = 'Popup';
            colorPickerObj.mode = 'Popup';
            sliderObj.mode = 'Popup';
        } else {
            numericObj.mode = 'Inline';
            maskedObj.mode = 'Inline';
            colorPickerObj.mode = 'Inline';
            sliderObj.mode = 'Inline';
        }
        numericObj.dataBind();
        maskedObj.dataBind();
        colorPickerObj.dataBind();
        sliderObj.dataBind();
    }
};
