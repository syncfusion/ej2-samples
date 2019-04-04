import { Uploader, RemovingEventArgs } from '@syncfusion/ej2-inputs';
import {  DropDownList, ChangeEventArgs  } from '@syncfusion/ej2-dropdowns';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Chunk upload sample
 */
(window as any).default = () => {

    let dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
    // initialize the uploader component
    let uploadObj: Uploader = new Uploader({
        autoUpload: false,
        maxFileSize: 104857600,
        asyncSettings: {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove',
            chunkSize: 500000
        },
        removing: onFileRemove,
        chunkFailure: onBeforeFailure,
        dropArea: dropElement,
        pausing: onPausing,
        resuming: onResuming
    });
    uploadObj.appendTo('#fileupload');
    let isInteraction: boolean = false;
    // to update flag variable for automatic pause and resume
    function onPausing(args: any): void {
        if (args.event !== null && !navigator.onLine) {
            isInteraction = true;
        } else {
            isInteraction = false;
        }
    }
    // to update flag variable for automatic pause and resume
    function onResuming(args: any): void {
        if (args.event !== null && !navigator.onLine) {
            isInteraction = true;
        } else {
            isInteraction = false;
        }
    }
    function onFileRemove(args: RemovingEventArgs): void {
        args.postRawFile = false;
    }
    // initialize dropdown component
    let listObj: DropDownList = new DropDownList({
        // set the index value to select an item based on index at initial rendering
        index: 0,
        // set the placeholder to DropDownList input element
        placeholder: 'Select chunk size',
        // set the height of the popup element
        popupHeight: '200px',
        // bind the change event
         change: (e: ChangeEventArgs) => {
            uploadObj.asyncSettings.chunkSize = parseInt(e.itemData.value, 10);
         }
    });
    listObj.appendTo('#chunk-sizes');
    // to prevent triggering chunk-upload failure event and to pause uploading on network failure
    function onBeforeFailure(args: any): void {
        args.cancel = !isInteraction;
        let  uploadObj: any = (document as any).getElementById('fileupload').ej2_instances[0];
        /* tslint:disable */
        // interval to check network availability on every 500 milliseconds
        let clearTimeInterval: any = setInterval(() => {
            if (navigator.onLine && !isNullOrUndefined(uploadObj.filesData[0]) && uploadObj.filesData[0].statusCode == 4) {
                uploadObj.resume(uploadObj.filesData);
                clearSetInterval();
            } else {
                if (!isInteraction && !isNullOrUndefined(uploadObj.filesData[0]) && uploadObj.filesData[0].statusCode == 3) {
                    uploadObj.pause(uploadObj.filesData);
                }
            }
        }, 500);
        // clear Interval after when network is available.
        function clearSetInterval(): void {
            clearInterval(clearTimeInterval);
        }
    }
};