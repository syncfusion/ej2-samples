import { loadCultureFiles } from '../common/culture-loader';
/**
 * Default Barcode sample
 */

import { BarcodeGenerator, ValidateEvent } from '@syncfusion/ej2-barcode-generator';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { TextPosition, Alignment } from '@syncfusion/ej2-barcode-generator/src/barcode/enum/enum';
import { TextBox, NumericTextBox, ChangedEventArgs, FormValidatorModel, FormValidator } from '@syncfusion/ej2-inputs';
import { ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import { ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';

let barcode: BarcodeGenerator;
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();

    barcode = new BarcodeGenerator({
        width: '200px',
        height: '150px',
        mode: 'SVG',
        type: 'Ean8',
        value: '11223344',
        invalid: invalidInput,
    });
    barcode.appendTo('#barcode_ean8');


    let canShowError: boolean = false;

    let customFn: (args: { [key: string]: string }) => boolean = (args: { [key: string]: string }) => {
        if (canShowError) {
            return false;
        }
        return true;
    };

    let options: FormValidatorModel = {
        rules: {
            'password': { minLength: [customFn, 'Invalid input'] }
        },
        keyup(): void {
            if (canShowError) {
                canShowError = false;
            }
        },
        focusout(args: any): void {
            displayText.value = barcode.value = (document.getElementById('barcodeValue_ean8') as HTMLInputElement).value;
            barcode.dataBind();
        },

    };
    let formObject: FormValidator = new FormValidator('#form-element', options);

    function invalidInput(args: ValidateEvent): void {
        let error: HTMLElement = document.getElementById('errorblog');

        canShowError = true;
        formObject.validate();
    }


    //FontType Collection
    let position: { [key: string]: Object }[] = [
        { type: 'Bottom', text: 'Bottom' },
        { type: 'Top', text: 'Top' },
    ];

    //FontType Collection
    let alignment: { [key: string]: Object }[] = [
        { type: 'Left', text: 'Left' },
        { type: 'Right', text: 'Right' },
        { type: 'Center', text: 'Center' },
    ];

    function updatePosition(value: string): void {
        let positionValue: TextBox = ((document.getElementById('textPosition_ean8') as any).ej2_instances[0]) as TextBox;
        barcode.displayText.position = (positionValue.value) as TextPosition;
    }
    function updateAlignt(value: string): void {
        let positionValue: TextBox = ((document.getElementById('textAlignment_ean8') as any).ej2_instances[0]) as TextBox;
        barcode.displayText.alignment = (positionValue.value) as Alignment;
    }



    //DropDownList used to apply for fontFamily of the Annotation
    let textPosition: DropDownList = new DropDownList({
        dataSource: position,
        fields: { value: 'type', text: 'text' }, popupWidth: 150,
        width: '100%', placeholder: 'select position', index: 0,
        change: (args: ChangeEventArgs) => {
            updatePosition(args.value.toString());
        }
    });
    textPosition.appendTo('#textPosition_ean8');

    //DropDownList used to apply for fontFamily of the Annotation
    let textAlign: DropDownList = new DropDownList({
        dataSource: alignment,
        fields: { value: 'type', text: 'text' }, popupWidth: 150,
        value: 'Center',
        width: '100%', placeholder: 'select position', index: 0,
        change: (args: ChangeEventArgs) => {
            updateAlignt(args.value.toString());
        }
    });
    textAlign.appendTo('#textAlignment_ean8');

    let barcodeValue: TextBox = new TextBox({
        value: '11223344',
    });
    barcodeValue.appendTo('#barcodeValue_ean8');

    let input = document.getElementById("barcodeValue_ean8");
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    });
    
    let bgColor: ColorPicker = new ColorPicker({
        value: '#ffffff',
        change: (args: ColorPickerEventArgs) => {
            barcode.backgroundColor = args.currentValue.hex;
        }

    });
    bgColor.appendTo('#bgColor_ean8');

    let displayText: TextBox = new TextBox({
        value: '11223344',
        change: (args: ChangedEventArgs) => {
            if (args.isInteracted) {
                barcode.displayText.text = args.value.toString();
            }
        }
    });
    displayText.appendTo('#displayText_ean8');



    let foreColor: ColorPicker = new ColorPicker({
        value: '#000000',
        change: (args: ColorPickerEventArgs) => {
            barcode.foreColor = args.currentValue.hex;
        }
    });
    foreColor.appendTo('#foreColor_ean8');



    let barcodeWidth: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 200, step: 2, min: 150, max: 250,
        change: (args: NumericChangeEventArgs) => {
            barcode.width = args.value.toString();
        }
    });
    barcodeWidth.appendTo('#width_ean8');

    let barcodeHeight: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 150, step: 2, min: 100, max: 200,
        change: (args: NumericChangeEventArgs) => {
            barcode.height = args.value.toString();
        }
    });
    barcodeHeight.appendTo('#height_ean8');

    let marginLeft: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 10, step: 1,
        min: -10, max: 30,
        change: (args: NumericChangeEventArgs) => {
            barcode.margin.left = args.value;
        }
    });
    marginLeft.appendTo('#marginLeft_ean8');

    let marginRight: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        min: -10, max: 30,
        value: 10, step: 1,
        change: (args: NumericChangeEventArgs) => {
            barcode.margin.right = args.value;
        }
    });
    marginRight.appendTo('#MarginRight_ean8');

    let marginTop: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 10, step: 1,
        min: -10, max: 30,
        change: (args: NumericChangeEventArgs) => {
            barcode.margin.top = args.value;
        }
    });
    marginTop.appendTo('#marginTop_ean8');



    let marginBottom: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 10, step: 1,
        min: -10, max: 30,
        change: (args: NumericChangeEventArgs) => {
            barcode.margin.bottom = args.value;
        }
    });
    marginBottom.appendTo('#MarginBottom_ean8');



    let textVisibility: CheckBox = new CheckBox({
        checked: true,
        change: (args: CheckBoxChangeEventArgs) => {
            barcode.displayText.visibility = args.checked;
        }
    });
    textVisibility.appendTo('#textVisibility_ean8');


    let svgMode: CheckBox = new CheckBox({
        checked: true,
        change: (args: any) => {
            barcode.mode = args.checked ? 'SVG' : 'Canvas';
        }
    });
    svgMode.appendTo('#svgMode_ean8');



    let textmarginLeft: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 40, step: 1, min: 40, max: 60,
        change: (args: NumericChangeEventArgs) => {
            barcode.displayText.margin.left = args.value;
        }
    });
    textmarginLeft.appendTo('#TextmarginLeft_ean8');

    let textMarginRight: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 40, step: 1, min: 40, max: 60,
        change: (args: NumericChangeEventArgs) => {
            barcode.displayText.margin.right = args.value;
        }
    });
    textMarginRight.appendTo('#TextMarginRight_ean8');

    let textmarginTop: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 0, step: 1, min: -10, max: 20,
        change: (args: NumericChangeEventArgs) => {
            barcode.displayText.margin.top = args.value;
        }
    });
    textmarginTop.appendTo('#TextmarginTop_ean8');



    let textMarginBottom: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 0, step: 1, min: -10, max: 20,
        change: (args: NumericChangeEventArgs) => {
            barcode.displayText.margin.bottom = args.value;
        }
    });
    textMarginBottom.appendTo('#TextMarginBottom_ean8');
    const downloadButton = new Button({});
    downloadButton.appendTo('#downloadBtn12_ean8');
    document.getElementById('downloadBtn12_ean8').onclick = function () {
        barcode.exportImage("Barcode", 'PNG');
    };
};
