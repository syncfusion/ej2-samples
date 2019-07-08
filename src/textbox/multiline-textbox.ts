import { loadCultureFiles } from '../common/culture-loader';
import { TextBox } from  '@syncfusion/ej2-inputs';
import { DropDownList, ChangeEventArgs} from '@syncfusion/ej2-dropdowns';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { NumericTextBox} from '@syncfusion/ej2-inputs';

/**
 *   Multiline TextBox sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let textareaObj: TextBox = new TextBox({
        placeholder: 'Enter your address',
        floatLabelType: 'Auto'
    });
    textareaObj.appendTo('#default');
    // initialize check box component
    let enabledCheckBox: CheckBox = new CheckBox({
        checked: false,
        cssClass: 'multiline',
        change: (args: any) => {
            textareaObj.enabled = !args.checked;
        }
    });
    enabledCheckBox.appendTo('#enabled');
    let readonlyCheckBox: CheckBox = new CheckBox({
        checked: false,
        cssClass: 'multiline',
        change: (args: any) => {
            textareaObj.readonly = args.checked;
        }
    });
    readonlyCheckBox.appendTo('#readonly');
    //initialize numeric textbox 
    let numeric: NumericTextBox = new NumericTextBox({
        format: '##',
        min: 1,
        max: 20,
        value: 2,
        change: (args: any) => {
            textareaObj.addAttributes({rows: args.value});
        }
    });
    numeric.appendTo('#rows');
    // initialize dropdown component
    let floatLabel: DropDownList = new DropDownList({
        // set the height of the popup element
        popupHeight: '200px',
        // bind the change event
            change: (args: ChangeEventArgs) => {
            switch (args.value) {
                case 'Auto':
                    textareaObj.floatLabelType = 'Auto';
                    break;
                case 'Always':
                    textareaObj.floatLabelType = 'Always';
                    break;
                case 'Never':
                    textareaObj.floatLabelType = 'Never';
                    break;
            }
        }
    });
    floatLabel.appendTo('#select');
};