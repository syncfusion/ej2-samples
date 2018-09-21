
import { Uploader, RemovingEventArgs } from '@syncfusion/ej2-inputs';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

/**
 * Uploader default functionalities sample
 */
this.default = () => {

    let dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
    // Initialize the uploader component
    let uploadObj: Uploader = new Uploader({
        asyncSettings: {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
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
};