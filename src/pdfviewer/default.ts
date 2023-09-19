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
    viewer.documentPath = "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf";
       
    var switchObj = new Switch({ value: 'Standalone Rendering', checked: true });
    switchObj.appendTo('#checked');
    
    switchObj.change = function (args) {
        if (args.checked) {
            viewer.serviceUrl = '';
        }
        else {
            viewer.serviceUrl = 'https://ej2services.syncfusion.com/js/development/api/pdfviewer';
        }
        viewer.dataBind();
        viewer.load(viewer.documentPath, null);
    }
    
    viewer.appendTo('#pdfViewer');
};
