import { loadCultureFiles } from '../common/culture-loader';
import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner } from '@syncfusion/ej2-pdfviewer';
// tslint:disable-next-line:max-line-length
PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner);

(window as any).default = (): void => {
    loadCultureFiles();
    let viewer: PdfViewer = new PdfViewer();
    viewer.serviceUrl = 'https://services.syncfusion.com/js/production/api/pdfviewer';
    viewer.appendTo('#pdfViewer');
    viewer.load('HandwrittenSignature.pdf', null);
    // tslint:disable-next-line
    viewer.documentLoad = function(): any {
    viewer.annotationModule.setAnnotationMode('HandWrittenSignature');
    };
};