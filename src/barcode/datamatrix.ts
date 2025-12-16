import { loadCultureFiles } from '../common/culture-loader';
/**
 * Default Barcode sample
 */

import { DataMatrixGenerator, ValidateEvent } from '@syncfusion/ej2-barcode-generator';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { TextPosition, Alignment, DataMatrixEncoding } from '@syncfusion/ej2-barcode-generator/src/barcode/enum/enum';
import { TextBox, NumericTextBox, FormValidatorModel, FormValidator } from '@syncfusion/ej2-inputs';
import { ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import { ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';

let barcode: DataMatrixGenerator;
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();

    barcode = new DataMatrixGenerator({
        mode: 'SVG',
        value: 'Syncfusion',
        invalid: invalidInput,
        displayText: { visibility: false },
        height: 150, width: 200,
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
    let matrixSize: { [key: string]: Object }[] = [
        { value: '0', text: 'Auto' },
        { value: '6', text: 'Size10x10' },
        { value: '12', text: 'Size12x12' },
        { value: '20', text: 'Size14x14' },
        { value: '23', text: 'Size16x16' },
        { value: '24', text: 'Size18x18' },
        { value: '24', text: 'Size20x20' },
        { value: '24', text: 'Size22x22' },
        { value: '24', text: 'Size24x24' },
        { value: '24', text: 'Size26x26' },
        { value: '24', text: 'Size32x32' },
        { value: '24', text: 'Size36x36' },
        { value: '24', text: 'Size40x40' },
        { value: '24', text: 'Size44x44' },
        { value: '24', text: 'Size48x48' },
        { value: '24', text: 'Size52x52' },
        { value: '24', text: 'Size64x64' },

        { value: '24', text: 'Size72x72' },
        { value: '24', text: 'Size80x80' },
        { value: '24', text: 'Size88x88' },
        { value: '24', text: 'Size96x96' },
        { value: '24', text: 'Size104x104' },
        { value: '24', text: 'Size120x120' },
        { value: '24', text: 'Size132x132' },
        { value: '24', text: 'Size144x144' },
        { value: '24', text: 'Size8x18' },
        { value: '24', text: 'Size8x32' },
        { value: '24', text: 'Size12x26' },
        { value: '24', text: 'Size12x36' },
        { value: '24', text: 'Size16x36' },
        { value: '24', text: 'Size16x48' },
    ];

    //FontType Collection
    let pdfDataMatrixEncodingValue: { [key: string]: Object }[] = [
        { value: 'Auto', text: 'Auto' },
        { value: 'ASCII', text: 'ASCII' },
        { value: 'ASCIINumeric', text: 'ASCIINumeric' },
        { value: 'Base256', text: 'Base256' },
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
        value: 'Center',
        width: '100%', placeholder: 'select position', index: 0,
        change: (args: ChangeEventArgs) => {
            updateAlignt(args.value.toString());
        }
    });
    textAlign.appendTo('#textAlignment');

    let barcodeValue: TextBox = new TextBox({
        value: 'Syncfusion',
    });
    barcodeValue.appendTo('#barcodeValue');

    let input = document.getElementById("barcodeValue");
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

    let size: DropDownList = new DropDownList({
        dataSource: matrixSize,
        value: 'Auto',
        change: (args: ChangeEventArgs) => {
            barcode.size = (Number(args.itemData.value));
        }
    });
    size.appendTo('#MatrixSize');

    let encoding: DropDownList = new DropDownList({
        dataSource: pdfDataMatrixEncodingValue,
        value: 'Auto',
        change: (args: ChangeEventArgs) => {
            barcode.encoding = ((args.itemData.value.toString()) as DataMatrixEncoding);
        }
    });
    encoding.appendTo('#PdfDataMatrixEncoding');

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
        checked: false,
        change: (args: CheckBoxChangeEventArgs) => {
            barcode.displayText.visibility = args.checked;
        }
    });
    textVisibility.appendTo('#textVisibility');


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
    const downloadButton = new Button({});
    downloadButton.appendTo('#downloadBtn10');
    document.getElementById('downloadBtn10').onclick = function () {
        barcode.exportImage("DataMatrix", 'PNG');
    };
};
