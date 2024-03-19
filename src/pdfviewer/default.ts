import { loadCultureFiles } from '../common/culture-loader';
import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer } from '@syncfusion/ej2-pdfviewer';
// tslint:disable-next-line:max-line-length
import { Switch } from '@syncfusion/ej2-buttons';
PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer);

/**
 * Default PdfViewer sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let viewer: PdfViewer = new PdfViewer();
    viewer.documentPath = "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf";
    viewer.resourceUrl ="https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib";
       
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
    
    viewer.appendTo('#pdfViewer');
};
