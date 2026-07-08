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
        type: 'Code32',
        value: '01234567',
        width: '200px', height: '150px',
        mode: 'SVG',
        invalid: invalidInput,
    });
    barcode.appendTo('#barcode_code32');
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
            displayText.value = barcode.value = (document.getElementById('barcodeValue_code32') as HTMLInputElement).value;
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
        let positionValue: TextBox = ((document.getElementById('textPosition_code32') as any).ej2_instances[0]) as TextBox;
        barcode.displayText.position = (positionValue.value) as TextPosition;
    }
    function updateAlignt(value: string): void {
        let positionValue: TextBox = ((document.getElementById('textAlignment_code32') as any).ej2_instances[0]) as TextBox;
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
    textPosition.appendTo('#textPosition_code32');

    //DropDownList used to apply for fontFamily of the Annotation
    let textAlign: DropDownList = new DropDownList({
        dataSource: alignment,
        value: 'Center',
        fields: { value: 'type', text: 'text' }, popupWidth: 150,
        width: '100%', placeholder: 'select position', index: 0,
        change: (args: ChangeEventArgs) => {
            updateAlignt(args.value.toString());
        }
    });
    textAlign.appendTo('#textAlignment_code32');

    let barcodeValue: TextBox = new TextBox({
        value: '01234567',
        change: (args: ChangedEventArgs) => {
            barcode.value = args.value.toString();
            displayText.value = args.value.toString();
        }
    });
    barcodeValue.appendTo('#barcodeValue_code32');

    let input = document.getElementById("barcodeValue_code32");
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
    bgColor.appendTo('#bgColor_code32');

    let displayText: TextBox = new TextBox({
        value: '01234567',
        change: (args: ChangedEventArgs) => {
            barcode.displayText.text = args.value.toString();
        }
    });
    displayText.appendTo('#displayText_code32');



    let foreColor: ColorPicker = new ColorPicker({
        value: '#000000',
        change: (args: ColorPickerEventArgs) => {
            barcode.foreColor = args.currentValue.hex;
        }
    });
    foreColor.appendTo('#foreColor_code32');



    let barcodeWidth: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 200, step: 2, min: 150, max: 250,
        change: (args: NumericChangeEventArgs) => {
            barcode.width = args.value.toString();
        }
    });
    barcodeWidth.appendTo('#width_code32');

    let barcodeHeight: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 150, step: 2, min: 100, max: 200,
        change: (args: NumericChangeEventArgs) => {
            barcode.height = args.value.toString();
        }
    });
    barcodeHeight.appendTo('#height_code32');

    let marginLeft: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 10, step: 1,
        min: -10, max: 30,
        change: (args: NumericChangeEventArgs) => {
            barcode.margin.left = args.value;
        }
    });
    marginLeft.appendTo('#marginLeft_code32');

    let marginRight: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        min: -10, max: 30,
        value: 10, step: 1,
        change: (args: NumericChangeEventArgs) => {
            barcode.margin.right = args.value;
        }
    });
    marginRight.appendTo('#MarginRight_code32');

    let marginTop: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 10, step: 1,
        min: -10, max: 30,
        change: (args: NumericChangeEventArgs) => {
            barcode.margin.top = args.value;
        }
    });
    marginTop.appendTo('#marginTop_code32');



    let marginBottom: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 10, step: 1,
        min: -10, max: 30,
        change: (args: NumericChangeEventArgs) => {
            barcode.margin.bottom = args.value;
        }
    });
    marginBottom.appendTo('#MarginBottom_code32');



    let textVisibility: CheckBox = new CheckBox({
        checked: true,
        change: (args: CheckBoxChangeEventArgs) => {
            barcode.displayText.visibility = args.checked;
        }
    });
    textVisibility.appendTo('#textVisibility_code32');


    let svgMode: CheckBox = new CheckBox({
        checked: true,
        change: (args: any) => {
            barcode.mode = args.checked ? 'SVG' : 'Canvas';
        }
    });
    svgMode.appendTo('#svgMode_code32');



    let textmarginLeft: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 40, step: 1, min: 40, max: 60,
        change: (args: NumericChangeEventArgs) => {
            barcode.displayText.margin.left = args.value;
        }
    });
    textmarginLeft.appendTo('#TextmarginLeft_code32');

    let textMarginRight: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 40, step: 1, min: 40, max: 60,
        change: (args: NumericChangeEventArgs) => {
            barcode.displayText.margin.right = args.value;
        }
    });
    textMarginRight.appendTo('#TextMarginRight_code32');

    let textmarginTop: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 0, step: 1, min: -10, max: 20,
        change: (args: NumericChangeEventArgs) => {
            barcode.displayText.margin.top = args.value;
        }
    });
    textmarginTop.appendTo('#TextmarginTop_code32');



    let textMarginBottom: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 0, step: 1, min: -10, max: 20,
        change: (args: NumericChangeEventArgs) => {
            barcode.displayText.margin.bottom = args.value;
        }
    });
    textMarginBottom.appendTo('#TextMarginBottom_code32');
    const downloadButton = new Button({});
    downloadButton.appendTo('#downloadBtn2_code32');
    document.getElementById('downloadBtn2_code32').onclick = function () {
        barcode.exportImage("Barcode", 'PNG');
    };
};

