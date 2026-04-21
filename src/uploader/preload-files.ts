import { loadCultureFiles } from '../common/culture-loader';

import { Uploader, RemovingEventArgs } from '@syncfusion/ej2-inputs';

/**
 * Uploader preload functionalities sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
    // Define the set of file details in FilesInfo[] type.
    let preloadFiles: any = [
        {name: 'Nature', size: 500000, type: '.png'},
        {name: 'TypeScript Succinctly', size: 12000, type: '.pdf'},
        {name: 'ASP.NET Webhooks', size: 500000, type: '.docx'},
    ];
    //Initialize the control by preload files
    let uploadObj: Uploader = new Uploader({
        asyncSettings: {
            saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
            removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
        },
        files: preloadFiles,
        removing: onFileRemove,
        dropArea: dropElement,
        failure: onFailure
    });
    uploadObj.appendTo('#fileupload');
    function onFailure(args: any): void {
        if (args.response && args.response.statusText !== '') {
            args.statusText = args.response.statusText;
        }
    }
    function onFileRemove(args: RemovingEventArgs) : void {
        args.postRawFile = false;
    }
    document.getElementById('clearbtn').onclick = () => {
        uploadObj.clearAll();
    };
};