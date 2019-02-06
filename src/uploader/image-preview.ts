import { loadCultureFiles } from '../common/culture-loader';
import { Uploader, FileInfo, SelectedEventArgs, RemovingEventArgs } from '@syncfusion/ej2-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { detach, Browser, createElement, isNullOrUndefined, EventHandler } from '@syncfusion/ej2-base';
/**
 * Uploader Image Preview sample
 */
// tslint:disable-next-line
(window as any).default = (): void => {
    loadCultureFiles();
    let dropElement: HTMLElement = document.getElementById('dropArea');
    let filesName: string[] = [];
    let uploadObj: Uploader = new Uploader({
        asyncSettings: { saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove' },
        dropArea: dropElement, selected: onSelect, progress: onFileUpload, success: onUploadSuccess, removing: onFileRemove,
        failure: onUploadFailed, allowedExtensions: '.png, .jpg, .jpeg', template: 'template'
    });
    uploadObj.appendTo('#fileupload');
    let parentElement: HTMLElement; let progressbarContainer : HTMLElement;
    if (Browser.isDevice) { document.getElementById('drop').style.padding = '0px 10%'; }
    document.getElementById('browse').onclick = () => {
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click(); return false;
    };
    document.getElementById('clearbtn').onclick = () => {
        if (!isNullOrUndefined(dropElement.querySelector('ul'))) {
            detach(dropElement.querySelector('ul'));
            (<any>uploadObj).filesData = [];
            (<any>uploadObj).fileList = [];
            filesName = [];
        }
    };
    document.getElementById('uploadbtn').onclick = () => {
        if (dropElement.querySelector('ul') && uploadObj.getFilesData().length > 0) { uploadObj.upload(uploadObj.getFilesData()); }
    };
    function onSelect(args: SelectedEventArgs): void {
        if (!dropElement.querySelector('li')) { this.filesData = []; }
        if (isNullOrUndefined(document.getElementById('dropArea').querySelector('.e-upload-files'))) {
            parentElement = createElement('ul', { className: 'e-upload-files' });
            document.getElementsByClassName('e-upload')[0].appendChild(parentElement);
        }
        let validFiles: FileInfo[] = validateFiles(args, this.filesData);
        if (validFiles.length === 0) {
            args.cancel = true;
            return;
        }
        for (let i : number = 0; i < validFiles.length; i++) {
            formSelectedData(validFiles[i], this);
        }
        this.filesData = this.filesData.concat(validFiles);
        args.cancel = true;
    }

    function onFileRemove(args: RemovingEventArgs) : void {
        args.postRawFile = false;
    }

    function validateFiles(args: any, viewedFiles: FileInfo[]): FileInfo[] {
        let modifiedFiles: FileInfo[] = [];
        let validFiles: FileInfo[] = [];
        let isModified: boolean = false;
        if (args.event.type === 'drop') {
            isModified = true;
            let allImages: string[] = ['png', 'jpg', 'jpeg'];
            let files: FileInfo[] = args.filesData;
            for (let file of files) {
                if (allImages.indexOf(file.type) !== -1) {
                    modifiedFiles.push(file);
                }
            }
        }
        let files: FileInfo[] = modifiedFiles.length > 0 || isModified ? modifiedFiles : args.filesData;
        if (filesName.length > 0) {
            for (let file of files) {
                if (filesName.indexOf(file.name) === -1) {
                    filesName.push(file.name);
                    validFiles.push(file);
                }
            }
        } else {
            for (let file of files) {
                filesName.push(file.name);
                validFiles.push(file);
            }
        }
        return validFiles;
    }

    function formSelectedData (file : FileInfo, proxy: any): void {
        let liEle : HTMLElement = createElement('li',  {className: 'e-upload-file-list', attrs: {'data-file-name': file.name}});
        let imageTag: HTMLImageElement = <HTMLImageElement>createElement('IMG',  {className: 'upload-image', attrs: {'alt': 'Image'}});
        let wrapper: HTMLElement = createElement('span', {className: 'wrapper'});
        wrapper.appendChild(imageTag); liEle.appendChild(wrapper);
        liEle.appendChild(createElement('div', {className: 'name file-name', innerHTML: file.name, attrs: {'title': file.name}}));
        liEle.appendChild(createElement('div', {className: 'file-size', innerHTML: proxy.bytesToSize(file.size) }));
        let clearbtn: HTMLElement; let uploadbtn: HTMLElement;
        clearbtn = createElement('span', {id: 'removeIcon', className: 'e-icons e-file-remove-btn', attrs: {'title': 'Remove'}});
        EventHandler.add(clearbtn, 'click', removeFiles, proxy); liEle.setAttribute('title', 'Ready to Upload');
        uploadbtn = createElement('span', {className: 'e-upload-icon e-icons e-file-remove-btn', attrs: {'title': 'Upload'}});
        uploadbtn.setAttribute('id', 'iconUpload'); EventHandler.add(uploadbtn, 'click', uploadFile, proxy);
        progressbarContainer = createElement('progress', {className: 'progressbar', id: 'progressBar', attrs: {value: '0', max: '100'}});
        liEle.appendChild(clearbtn); liEle.appendChild(uploadbtn); liEle.appendChild(progressbarContainer);
        readURL(liEle, file); document.querySelector('.e-upload-files').appendChild(liEle); proxy.fileList.push(liEle);
    }
    function uploadFile(args: any): void {
        uploadObj.upload([this.filesData[this.fileList.indexOf(args.currentTarget.parentElement)]]);
    }
    function removeFiles(args: any): void {
        let removeFile: FileInfo = this.filesData[this.fileList.indexOf(args.currentTarget.parentElement)];
        if (removeFile.statusCode === '2' || removeFile.statusCode === '1') {
            this.remove([removeFile]);
            filesName.splice(filesName.indexOf(removeFile.name), 1);
            uploadObj.element.value = '';
        }
    }
    function onFileUpload(args : any) : void {
        let li : Element = document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
        let iconEle: HTMLElement = li.querySelector('#iconUpload') as HTMLElement;
        iconEle.style.cursor = 'not-allowed'; iconEle.classList.add('e-uploaded');
        EventHandler.remove(li.querySelector('#iconUpload'), 'click', uploadFile);
        let progressValue : number = Math.round((args.e.loaded / args.e.total) * 100);
        if (!isNaN(progressValue) && li.querySelector('.progressbar')) {
            li.getElementsByTagName('progress')[0].value = progressValue;
        }
    }
    function onUploadSuccess(args : any) : void {
        let spinnerElement: HTMLElement = document.getElementById('dropArea');
        let li : any = document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
        if (li && !isNullOrUndefined(li.querySelector('.progressbar'))) {
            (li.querySelector('.progressbar') as HTMLElement).style.visibility = 'hidden';
        }
        if (args.operation === 'upload') {
            EventHandler.remove(li.querySelector('#iconUpload'), 'click', uploadFile);
            (li.querySelector('.file-name') as HTMLElement).style.color = 'green';
            (li.querySelector('.e-icons') as HTMLElement).onclick = () => { generateSpinner(this.uploadWrapper); };
            li.setAttribute('title', args.e.currentTarget.statusText);
        } else {
           if (!isNullOrUndefined(spinnerElement)) { hideSpinner(spinnerElement); detach(spinnerElement.querySelector('.e-spinner-pane')); }
        }
    }
    function generateSpinner(targetElement: HTMLElement): void {
        createSpinner({ target: targetElement, width: '25px' }); showSpinner(targetElement);
    }
    function onUploadFailed(args : any) : void {
        let li : Element = document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
        (li.querySelector('.file-name') as HTMLElement).style.color = 'red'; li.setAttribute('title', args.e.currentTarget.statusText);
        if (args.operation === 'upload') {
            EventHandler.remove(li.querySelector('#iconUpload'), 'click', uploadFile);
            (li.querySelector('.progressbar') as HTMLElement).style.visibility = 'hidden';
        }
    }
    function readURL(li: HTMLElement, args: any): void {
        let preview: any = li.querySelector('.upload-image');
        let file: File = args.rawFile; let reader: FileReader = new FileReader();
        reader.addEventListener('load', () => { preview.src = reader.result; }, false);
        if (file) { reader.readAsDataURL(file); }
    }
};