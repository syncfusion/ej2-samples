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
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        },
        files: preloadFiles,
        removing: onFileRemove,
        dropArea: dropElement
    });
    uploadObj.appendTo('#fileupload');

    function onFileRemove(args: RemovingEventArgs) : void {
        args.postRawFile = false;
    }
    document.getElementById('clearbtn').onclick = () => {
        uploadObj.clearAll();
    };
};