import { loadCultureFiles } from '../common/culture-loader';
import { TextArea } from  '@syncfusion/ej2-inputs';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { NumericTextBox, TextBox, ChangedEventArgs } from '@syncfusion/ej2-inputs';

/**
 *   TextArea Api sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let textareaObj: TextArea = new TextArea({
        placeholder: 'Enter your comments',
        floatLabelType: 'Auto'
    });
    textareaObj.appendTo('#api');
    // initialize check box component
    let enabledCheckBox: CheckBox = new CheckBox({
        checked: true,
        cssClass: 'api',
        change: (args: any) => {
            textareaObj.enabled = args.checked;
        }
    });
    enabledCheckBox.appendTo('#enabled');
    let readonlyCheckBox: CheckBox = new CheckBox({
        checked: false,
        cssClass: 'api',
        change: (args: any) => {
            textareaObj.readonly = args.checked;
        }
    });
    readonlyCheckBox.appendTo('#readonly');
    let showClearIcon: CheckBox = new CheckBox({
        checked: false,
        cssClass: 'api',
        change: (args: any) => {
            textareaObj.showClearButton = args.checked;
        }
    });
    showClearIcon.appendTo('#clearicon');
    //initialize numeric textbox
    let rows: NumericTextBox = new NumericTextBox({
        format: '##',
        min: 1,
        max: 10,
        value: 2,
        change: (args: any) => {
            textareaObj.rows = args.value;
        }
    });
    rows.appendTo('#rows');
    let cols: NumericTextBox = new NumericTextBox({
        format: '##',
        min: 5,
        max: 40,
        value: 20,
        change: (args: any) => {
            textareaObj.cols = args.value;
        }
    });
    cols.appendTo('#cols');
    let maxLength: NumericTextBox = new NumericTextBox({
        format: '##',
        value: -1,
        change: (args: any) => {
            textareaObj.maxLength = args.value;
        }
    });
    maxLength.appendTo('#maxlength');
    // initialize textbox component
    let value: TextBox = new TextBox({
        value: '',
        placeholder: 'Enter a value',
        change: (args: ChangedEventArgs) => {
            textareaObj.value = args.value;
        }
    });
    value.appendTo('#value');
};