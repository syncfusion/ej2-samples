import { loadCultureFiles } from '../common/culture-loader';
import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer } from '@syncfusion/ej2-pdfviewer';
// tslint:disable-next-line:max-line-length
import { Switch } from '@syncfusion/ej2-buttons';
import { Grid, Page, CommandColumn } from '@syncfusion/ej2-grids';
import { data } from './document-list-data';
import { Dialog } from '@syncfusion/ej2-popups';
Grid.Inject(Page,CommandColumn);

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer);

(window as any).default = (): void => {
    loadCultureFiles();
    let dialogObj: Dialog;
    let viewer: PdfViewer = new PdfViewer();
    renderdialog();
    renderPDFViewer();
    var mode:any;
    function documentLoaded(){
        if (mode === 'View') {
            viewer.enablePageOrganizer = false;
        }
        else {
            viewer.enablePageOrganizer = true;
        }
    }
    let commandClick: any = function(args:any){
      mode = args.target.title;
      var documentPath = args.rowData.Document;
      dialogObj.header = args.rowData.FileName;
      if(mode === 'View'){
          viewer.enableStickyNotesAnnotation=false;
          viewer.enableAnnotationToolbar = false;
          viewer.isFormDesignerToolbarVisible = false;
          viewer.toolbarSettings = { showTooltip : true, toolbarItems: ['OpenOption', 'PageNavigationTool', 'MagnificationTool', 'PanTool','SearchOption', 'PrintOption']};
          viewer.annotationSettings = {  
              isLock:true, author: 'Guest',      
          };
          viewer.textFieldSettings = {        
              isReadOnly: true,
          };
          viewer.radioButtonFieldSettings = {
              isReadOnly: true,
          };
          viewer.DropdownFieldSettings = {        
              isReadOnly: true,        
          };
          viewer.checkBoxFieldSettings = {         
              isReadOnly: true,         
          };
          viewer.signatureFieldSettings = {
              isReadOnly: true,
          };
          viewer.initialFieldSettings = {
            isReadOnly: true,
          };
          viewer.listBoxFieldSettings = {
            isReadOnly: true,
          };
          viewer.passwordFieldSettings = {
            isReadOnly: true,
          };
          viewer.contextMenuOption = 'None';
      } else {
          viewer.enableStickyNotesAnnotation = true;
          viewer.enableAnnotationToolbar = true;
          viewer.toolbarSettings = { showTooltip : true, toolbarItems: ['OpenOption', 'UndoRedoTool', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'SelectionTool', 'CommentTool', 'SubmitForm', 'SearchOption', 'AnnotationEditTool', 'FormDesignerEditTool', 'PrintOption', 'DownloadOption']};
          viewer.annotationSettings = {  
              isLock:false, author: 'Guest',      
          };
          viewer.textFieldSettings = {        
              isReadOnly: false,
          };
          viewer.radioButtonFieldSettings = {
              isReadOnly: false,
          };
          viewer.DropdownFieldSettings = {        
              isReadOnly: false,        
          };
          viewer.checkBoxFieldSettings = {         
              isReadOnly: false,         
          };
          viewer.signatureFieldSettings = {
              isReadOnly: false,
          };
          viewer.initialFieldSettings = {
            isReadOnly: false,
          };
          viewer.listBoxFieldSettings = {
            isReadOnly: false,
          };
          viewer.passwordFieldSettings = {
            isReadOnly: false,
          };
          viewer.contextMenuOption = 'RightClick';
      }
      dialogObj.show();
      viewer.dataBind();
      viewer.load(documentPath ,null);
    };
    let grid: Grid = new Grid({
        dataSource: data,
        commandClick:commandClick,
        destroyed:destroyed,
        columns: [
          { template: '#fileNameTemplate', headerText: 'File Name' },
          { headerText: 'Author', field: 'Author'},
          { textAlign: 'Center', headerText: 'Actions', commands: [{ buttonOption: { cssClass: 'e-icons e-eye e-flat' }, title: 'View'}, { buttonOption: { cssClass: 'e-icons e-edit e-flat' } , title: 'Edit'}] },
        ]
    });
    grid.appendTo('#Grid');

    function renderdialog(): void {
      dialogObj = new Dialog({
        header: '',
        animationSettings: { effect: 'None' },
        showCloseIcon: true,
        width: '90%',
        height: '90%',
        minHeight: '90%',
        visible: false,
        isModal: true,
        enableResize: true,
        position: { X: 'center', Y: 'center' }
      });
      dialogObj.appendTo('#defaultDialog');
    }

    function destroyed(): void{
      viewer.destroy();
      dialogObj.destroy();
    }

    function renderPDFViewer(): void {
      viewer.documentPath = "";
      viewer.resourceUrl = 'https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib';
      viewer.documentLoad = documentLoaded;
      var switchObj = new Switch({ value: 'Standalone Rendering', checked: true });
      switchObj.appendTo('#checked');
      
      switchObj.change = function (args) {
          if (args.checked) {
              viewer.serviceUrl = '';
          }
          else {
              viewer.serviceUrl = 'https://services.syncfusion.com/js/production/api/pdfviewer';
          }
      }
      viewer.height ="775px";
      viewer.appendTo('#pdfViewer');
    }
};
