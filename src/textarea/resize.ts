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
    textareaObj.appendTo('#resize');
    // initialize dropdown component
    let resize: DropDownList = new DropDownList({
        // set the height of the popup element
        popupHeight: '200px',
        // bind the change event
            change: (args: ChangeEventArgs) => {
            switch (args.value) {
                case 'Both':
                    textareaObj.resizeMode = 'Both';
                    break;
                case 'Vertical':
                    textareaObj.resizeMode = 'Vertical';
                    break;
                case 'Horizontal':
                    textareaObj.resizeMode = 'Horizontal';
                    break;
                case 'None':
                    textareaObj.resizeMode = 'None';
                    break;
            }
        }
    });
    resize.appendTo('#select');
};