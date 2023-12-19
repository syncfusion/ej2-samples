import { loadCultureFiles } from '../common/culture-loader';
import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner } from '@syncfusion/ej2-pdfviewer';
// tslint:disable-next-line:max-line-length
import { Switch } from '@syncfusion/ej2-buttons';
PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner);

/**
 * Default PdfViewer sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let viewer: PdfViewer = new PdfViewer();
    viewer.documentPath = "https://cdn.syncfusion.com/content/pdf/restricted-formfield.pdf";
    viewer.resourceUrl ="https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib";
    viewer.toolbarSettings={ showTooltip : true, toolbarItems:['OpenOption', 'PageNavigationTool', 'MagnificationTool', 'PanTool','SearchOption', 'PrintOption']};
       
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
    };
    
    viewer.appendTo('#pdfViewer');
    viewer.enableStickyNotesAnnotation=false;
   
    viewer.annotationSettings = {  
        isLock:true,  
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
    viewer.signatureFieldSettings={
        isReadOnly:true,
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
};
