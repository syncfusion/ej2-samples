import { loadCultureFiles } from '../common/culture-loader';
import { TextArea } from  '@syncfusion/ej2-inputs';
import { DropDownList, ChangeEventArgs} from '@syncfusion/ej2-dropdowns';

/**
 *   Floating label TextArea sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let textareaObj: TextArea = new TextArea({
        placeholder: 'Enter your comments',
        floatLabelType: 'Auto'
    });
    textareaObj.appendTo('#floatlabel');
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