import { loadCultureFiles } from '../common/culture-loader';
/**
 * Default Barcode sample
 */

import { QRCodeGenerator, ValidateEvent } from '@syncfusion/ej2-barcode-generator';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { TextPosition, Alignment } from '@syncfusion/ej2-barcode-generator/src/barcode/enum/enum';
import { TextBox, NumericTextBox, FormValidatorModel, FormValidator } from '@syncfusion/ej2-inputs';
import { ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';

let barcode: QRCodeGenerator;
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();

    barcode = new QRCodeGenerator({
        width: '200px',
        height: '150px',
        displayText: { visibility: true },
        logo: {
            imageSource: 'https://www.syncfusion.com/web-stories/wp-content/uploads/sites/2/2022/02/cropped-Syncfusion-logo.png'
        },
        invalid: invalidInput,
        mode: 'SVG',
        value: 'Syncfusion',
    });
    barcode.appendTo('#barcode');
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
            barcode.value = (document.getElementById('barcodeValue') as HTMLInputElement).value;
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


    //FontType Collection
    let errorCorrectionLevel: { [key: string]: Object }[] = [
        { value: '7', text: 'Low' },
        { value: '15', text: 'Medium' },
        { value: '25', text: 'Quartile' },
        { value: '30', text: 'High' },
    ];

    function updatePosition(value: string): void {
        let positionValue: TextBox = ((document.getElementById('textPosition') as any).ej2_instances[0]) as TextBox;
        barcode.displayText.position = (positionValue.value) as TextPosition;
    }
    function updateAlignt(value: string): void {
        let positionValue: TextBox = ((document.getElementById('textAlignment') as any).ej2_instances[0]) as TextBox;
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
    textPosition.appendTo('#textPosition');

    //DropDownList used to apply for fontFamily of the Annotation
    let textAlign: DropDownList = new DropDownList({
        dataSource: alignment,
        fields: { value: 'type', text: 'text' }, popupWidth: 150,
        width: '100%', placeholder: 'select position', index: 0,
        value: 'Center',
        change: (args: ChangeEventArgs) => {
            updateAlignt(args.value.toString());
        }
    });
    textAlign.appendTo('#textAlignment');

    let barcodeValue: TextBox = new TextBox({
        value: 'Syncfusion',
    });
    barcodeValue.appendTo('#barcodeValue');


    let bgColor: ColorPicker = new ColorPicker({
        value: '#ffffff',
        change: (args: ColorPickerEventArgs) => {
            barcode.backgroundColor = args.currentValue.hex;
        }
    });
    bgColor.appendTo('#bgColor');





    let foreColor: ColorPicker = new ColorPicker({
        value: '#000000',
        change: (args: ColorPickerEventArgs) => {
            barcode.foreColor = args.currentValue.hex;
        }
    });
    foreColor.appendTo('#foreColor');



    let barcodeWidth: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 200, step: 2, min: 150, max: 250,
        change: (args: NumericChangeEventArgs) => {
            barcode.width = args.value.toString();
        }
    });
    barcodeWidth.appendTo('#width');

    let barcodeHeight: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 150, step: 2, min: 100, max: 200,
        change: (args: NumericChangeEventArgs) => {
            barcode.height = args.value.toString();
        }
    });
    barcodeHeight.appendTo('#height');

    let marginLeft: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 10, step: 1,
        min: -10, max: 30,
        change: (args: NumericChangeEventArgs) => {
            barcode.margin.left = args.value;
        }
    });
    marginLeft.appendTo('#marginLeft');

    let marginRight: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        min: -10, max: 30,
        value: 10, step: 1,
        change: (args: NumericChangeEventArgs) => {
            barcode.margin.right = args.value;
        }
    });
    marginRight.appendTo('#MarginRight');

    let version: NumericTextBox = new NumericTextBox({
        format: '###.##',
        min: 1, max: 40,
        value: 1, step: 1,
        change: (args: NumericChangeEventArgs) => {
            barcode.version = (Number(args.value));
        }
    });
    version.appendTo('#Version');

    let errorCorrection: DropDownList = new DropDownList({
        dataSource: errorCorrectionLevel,
        value: 'Medium',
        change: (args: ChangeEventArgs) => {
            barcode.errorCorrectionLevel = (Number(args.itemData.value));
        }
    });
    errorCorrection.appendTo('#errorCorrection');

    let marginTop: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 10, step: 1,
        min: -10, max: 30,
        change: (args: NumericChangeEventArgs) => {
            barcode.margin.top = args.value;
        }
    });
    marginTop.appendTo('#marginTop');



    let marginBottom: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 10, step: 1,
        min: -10, max: 30,
        change: (args: NumericChangeEventArgs) => {
            barcode.margin.bottom = args.value;
        }
    });
    marginBottom.appendTo('#MarginBottom');



    let textVisibility: CheckBox = new CheckBox({
        checked: true,
        change: (args: CheckBoxChangeEventArgs) => {
            barcode.displayText.visibility = args.checked;
        }
    });
    textVisibility.appendTo('#textVisibility');

    let logo: CheckBox = new CheckBox({
        checked: true,
        change: (args: CheckBoxChangeEventArgs) => {
            if (barcode.logo) {
                barcode.logo.imageSource = args.checked ? 'https://www.syncfusion.com/web-stories/wp-content/uploads/sites/2/2022/02/cropped-Syncfusion-logo.png' : '';
            }
        }
    });
    logo.appendTo('#logo');


    let svgMode: CheckBox = new CheckBox({
        checked: true,
        change: (args: any) => {
            barcode.mode = args.checked ? 'SVG' : 'Canvas';
        }
    });
    svgMode.appendTo('#svgMode');



    let textmarginLeft: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 40, step: 1, min: 40, max: 60,
        change: (args: NumericChangeEventArgs) => {
            barcode.displayText.margin.left = args.value;
        }
    });
    textmarginLeft.appendTo('#TextmarginLeft');

    let textMarginRight: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 40, step: 1, min: 40, max: 60,
        change: (args: NumericChangeEventArgs) => {
            barcode.displayText.margin.right = args.value;
        }
    });
    textMarginRight.appendTo('#TextMarginRight');

    let textmarginTop: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 0, step: 1, min: -10, max: 20,
        change: (args: NumericChangeEventArgs) => {
            barcode.displayText.margin.top = args.value;
        }
    });
    textmarginTop.appendTo('#TextmarginTop');



    let textMarginBottom: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 0, step: 1, min: -10, max: 20,
        change: (args: NumericChangeEventArgs) => {
            barcode.displayText.margin.bottom = args.value;
        }
    });
    textMarginBottom.appendTo('#TextMarginBottom');

};