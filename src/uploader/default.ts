import { loadCultureFiles } from '../common/culture-loader';

import { Uploader, RemovingEventArgs } from '@syncfusion/ej2-inputs';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

/**
 * Uploader default functionalities sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
    // Initialize the uploader component
    let uploadObj: Uploader = new Uploader({
        asyncSettings: {
            saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
        },
        removing: onFileRemove,
        dropArea: dropElement
    });
    uploadObj.appendTo('#fileupload');

    function onFileRemove(args: RemovingEventArgs) : void {
        args.postRawFile = false;
    }
    // initialize check box component
    let checkBoxObj: CheckBox = new CheckBox({
        checked: true,
        label: 'Auto Upload',
        change: (args: ChangeEventArgs) => {
            uploadObj.autoUpload = args.checked;
            uploadObj.clearAll();
        }
    });
    checkBoxObj.appendTo('#checkAutoUpload');

    let checkBoxObj1: CheckBox = new CheckBox({
        checked: false,
        label: 'Sequential Upload',
        change: (args: ChangeEventArgs) => {
            uploadObj.sequentialUpload = args.checked;
            uploadObj.clearAll();
        }
    });
    checkBoxObj1.appendTo('#sequentialUpload');
};