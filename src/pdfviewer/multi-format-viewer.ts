import { isNullOrUndefined, createElement } from '@syncfusion/ej2-base';
import { loadCultureFiles } from '../common/culture-loader';
import { Uploader } from '@syncfusion/ej2-inputs';
import { Button, Switch } from '@syncfusion/ej2-buttons';
import {
    ProgressBar,
    ILoadedEventArgs,
    ProgressTheme,
  } from '@syncfusion/ej2-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer } from '@syncfusion/ej2-pdfviewer';
PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer);

(window as any).default = (): void => {
  loadCultureFiles();
  let button: Button = new Button();
  button.appendTo('#browse');
  //let progressValue: number = 0;
  let uploadProgressValue: number = 0;
  let pdfViewerProgressValue: number = 0;
  let extensions: any = ['doc','docx','rtf','docm','dotm','dotx','dot','xls','xlsx','pptx','pptm','potx','potm','jpeg','png','bmp','pdf','jpg'];
  let viewer: PdfViewer = new PdfViewer({
    documentLoad: documentLoaded,
    ajaxRequestSuccess: ajaxRequestSuccess,
  });
  viewer.resourceUrl ="https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib";
  viewer.toolbarSettings = {
      showTooltip: true,
      toolbarItems: [
          'UndoRedoTool',
          'PageNavigationTool',
          'MagnificationTool',
          'PanTool',
          'SelectionTool',
          'CommentTool',
          'SubmitForm',
          'SearchOption',
          'AnnotationEditTool',
          'FormDesignerEditTool',
          'PrintOption',
          'DownloadOption'
      ]
  };
  viewer.zoomMode = 'FitToPage';
  viewer.appendTo('#pdfViewer');

  let progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.progressBar.theme = <ProgressTheme>(
      (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1))
        .replace(/-dark/i, 'Dark')
        .replace(/contrast/i, 'Contrast')
    );
    if (selectedTheme === 'fabric') {
      args.progressBar.secondaryProgressColor = '#b0d0e9';
    } else if (selectedTheme === 'material-dark') {
      args.progressBar.secondaryProgressColor = '#b8b8b8';
    } else if (selectedTheme === 'material') {
      args.progressBar.secondaryProgressColor = '#f087ab';
    } else if (selectedTheme === 'bootstrap5-dark') {
      args.progressBar.secondaryProgressColor = '#2b5288';
    } else if (selectedTheme === 'bootstrap5') {
      args.progressBar.secondaryProgressColor = '#98c5f5';
    } else if (selectedTheme === 'bootstrap') {
      args.progressBar.secondaryProgressColor = '#acc6dc';
    } else if (selectedTheme === 'bootstrap4') {
      args.progressBar.secondaryProgressColor = '#98c5f5';
    } else if (selectedTheme === 'bootstrap-dark') {
      args.progressBar.secondaryProgressColor = '#b8b8b8';
    } else if (selectedTheme === 'highcontrast') {
      args.progressBar.secondaryProgressColor = '#aca379';
    } else if (selectedTheme === 'fluent-dark') {
      args.progressBar.secondaryProgressColor = '#2b5288';
    } else if (selectedTheme === 'fluent') {
      args.progressBar.secondaryProgressColor = '#98c5f5';
    } else if (selectedTheme === 'tailwind-dark') {
      args.progressBar.secondaryProgressColor = '#386e7f';
    } else if (selectedTheme === 'tailwind') {
      args.progressBar.secondaryProgressColor = '#b1afe9';
    }
  };

  let uploadProgress: ProgressBar = new ProgressBar({
    type: 'Linear',
    height: '60',
    width: '250',
    animation: {
      enable: false,
      duration: 0,
      delay: 0,
    },
    load: progressLoad,
  });
  uploadProgress.appendTo('#progressbar');

  const dropElement: HTMLElement | null = document.getElementById('dropArea');
  const uploadObj: Uploader = new Uploader({
    dropArea: document.getElementById('dropArea') as HTMLElement,
    selected: onSelect,
    multiple: false,
    allowedExtensions: '.doc, .docx, .rtf, .docm, .dotm, .dotx, .dot, .xls, .xlsx, .pptx, .pptm, .potx, .potm .jpeg, .png, .bmp, .pdf, .jpg',
  });
  uploadObj.appendTo('#fileupload');

  let parentElement: HTMLElement | undefined;
  document.getElementById('browse')!.onclick = function () {
      (document.getElementsByClassName('e-file-select-wrap')[0] as HTMLElement).querySelector('button')!.click();
      return false;
  };

  var switchObj = new Switch({ value: 'Standalone Rendering', checked: true });
  switchObj.appendTo('#checked');
  switchObj.change = function (args) {
      if (args.checked) {
          viewer.serviceUrl = '';
      }
      else {
          viewer.serviceUrl = 'https://services.syncfusion.com/js/production/api/pdfviewer';
      }
      viewer.dataBind();
      viewer.load(viewer.documentPath, null);
  }

  function onSelect(args: any): void {
    uploadProgress.value = 0;
    uploadProgress.refresh();
    let progressBarContainer: any = document.getElementById("progressbarContainer") as HTMLElement;
    let progressBar: any = document.getElementById("linearProgressBar") as HTMLElement;
    let progressMessage: any = document.getElementById("uploadedMessage") as HTMLElement;
    let fileSupportMessage = document.getElementById("fileSupportMessage")as HTMLElement;
    let fileDetails = document.getElementById("file-details")as HTMLElement;
    let fileSizeValidation = document.getElementById("fileSizeValidation")as HTMLElement;
    progressBarContainer.style.display = "block";
    progressBar.style.display = "flex";
    progressMessage.style.display = "none";
    fileSupportMessage.style.display = "none";
    fileSizeValidation.style.display = "none";
    if (!dropElement!.querySelector('li')) {
        uploadObj.filesData = [];
    }
    if (isNullOrUndefined(dropElement!.querySelector('.e-upload-files'))) {
        parentElement = createElement('ul', { className: 'e-upload-files' }) as HTMLElement;
        (document.getElementsByClassName('e-upload')[0] as HTMLElement).appendChild(parentElement);
    }
    const validFiles: any[] = args.filesData;
    if (validFiles.length === 0) {
      progressBarContainer.style.display = "block";
      progressBar.style.display = "none";
      if(document.getElementById('pdfviewer-container').style.display === "block"){
        progressMessage.style.display = "block";
        fileDetails.style.display = "block";
      }
      args.cancel = true;
      return;
    }
    if(!extensions.includes(validFiles[0].type)){
      fileSupportMessage.style.display = "block";
      progressBar.style.display = "none";
      fileDetails.style.display = "none";
      args.cancel = true;
      return;
    }
    if(validFiles[0].type != "pdf" && validFiles[0].size>4000000){
      fileSizeValidation.style.display = "block";
      progressBar.style.display = "none";
      fileDetails.style.display = "none";
      args.cancel = true;
      return;
    }
    fileDetails.style.display = "block";
    document.getElementById("fileName").innerHTML = args.filesData[0].name;
    viewer.downloadFileName = args.filesData[0].name;
    viewer.exportAnnotationFileName = args.filesData[0].name;
    let size = document.getElementById("fileSize") as HTMLElement;
    if((args.filesData[0].size.toString()).length <= 6){
      size.innerHTML = ((args.filesData[0].size/1024).toFixed(1)).toString()+" KB";
    } else {
      let kbsize = args.filesData[0].size/1024;
      size.innerHTML = ((kbsize/1024).toFixed(1)).toString()+" MB";
    }
    formSelectedData(validFiles[0], uploadObj);
    uploadObj.filesData = uploadObj.filesData.concat(validFiles);
    args.cancel = true;
  }

  function formSelectedData(file: any, proxy: Uploader): void {
    const liEle: HTMLElement = createElement('li', {
        className: 'e-upload-file-list',
        attrs: {
            'data-file-name': file.name
        },
    }) as HTMLElement;

    readURL(liEle, file);
    proxy.fileList.push(liEle);
  }

  function readURL(li: HTMLElement, args: any): void {
    const file: File = args.rawFile as File;
    const reader: FileReader = new FileReader();
    const type: string | undefined = args.type;
    reader.addEventListener('load', function () {
      const post: string = JSON.stringify({
        'data': reader.result,
        'type': type
      });
      const url: string = "https://services.syncfusion.com/js/production/api/pdfviewer/LoadFile";
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open('Post', url, true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progressValue = Math.round((event.loaded / event.total) * 100);
          uploadProgressValue = progressValue;
          const totalProgress = calculateTotalProgress();
          updateProgressBar(totalProgress);
          document.getElementById("progress-status").innerHTML = totalProgress.toString()+"%";
        }
      });
      xhr.onload = function (args: Event) {
          viewer.documentPath = (this as XMLHttpRequest).responseText;
          pdfViewerProgressValue = 60;
          const totalProgress = calculateTotalProgress();
          updateProgressBar(totalProgress);
          document.getElementById("progress-status").innerHTML = totalProgress.toString()+"%";
          (document.getElementById('pdfviewer-container') as HTMLElement).style.display = "block";
      };
      xhr.send(post);
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
  }

  function documentLoaded(): any{
    let progressValue = document.getElementById("progress-status");
    pdfViewerProgressValue = 100;
    const totalProgress = calculateTotalProgress();
    updateProgressBar(totalProgress);
    progressValue.innerHTML = totalProgress.toString()+"%";
    setTimeout(()=>{
      document.getElementById("linearProgressBar").style.display = "none";
      document.getElementById("uploadedMessage").style.display = "block"
      uploadProgressValue = 0;
      pdfViewerProgressValue = 0;
      progressValue.innerHTML = "0%";
    },1000);
  }

  function calculateTotalProgress(){
    const totalProgress = (uploadProgressValue + pdfViewerProgressValue)/2;
    return totalProgress;
  }

  function updateProgressBar(progress: any) {
    uploadProgress.value = progress;
    uploadProgress.dataBind();
  }

  function ajaxRequestSuccess(args: any){
    let progressValue = document.getElementById("progress-status");
    if (args.action === "Load") {
      pdfViewerProgressValue = 70;
      const totalProgress = calculateTotalProgress();
      updateProgressBar(totalProgress);
      progressValue.innerHTML = totalProgress.toString()+"%";
    }
    if (args.action === "RenderPdfPages") {
      if(pdfViewerProgressValue < 90){
        pdfViewerProgressValue = pdfViewerProgressValue + 10;
        const totalProgress = calculateTotalProgress();
        updateProgressBar(totalProgress);
        progressValue.innerHTML = totalProgress.toString()+"%";
      }
    }
  }
};