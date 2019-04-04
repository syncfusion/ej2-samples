import { loadCultureFiles } from '../common/culture-loader';
import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
ThumbnailView, Print, TextSelection, TextSearch, Annotation} from '@syncfusion/ej2-pdfviewer';
// tslint:disable-next-line:max-line-length
PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation);
import { L10n } from '@syncfusion/ej2-base';


//PDF Viewer Arabic Sample Locale
L10n.load({
    'ar-AE': {
        'PdfViewer' : {
            'PdfViewer': 'قوات الدفاع الشعبي المشاهد',
            'Cancel' : 'إلغاء',
            'Download file' : 'تحميل الملف',
            'Download': 'تحميل',
            'Enter Password' : 'هذا المستند محمي بكلمة مرور. يرجى إدخال كلمة مرور.',
            'File Corrupted' : 'ملف تالف',
            'File Corrupted Content' : 'الملف تالف ولا يمكن فتحه.',
            'Fit Page' : 'لائق بدنيا الصفحة',
            'Fit Width' : 'لائق بدنيا عرض',
            'Automatic' : 'تلقائي',
            'Go To First Page' : 'عرض الصفحة الأولى',
            'Invalid Password' : 'كلمة سر خاطئة. حاول مرة اخرى.',
            'Next Page' : 'عرض الصفحة التالية',
            'OK': 'حسنا',
            'Open' : 'فتح الملف',
            'Page Number' : 'رقم الصفحة الحالية',
            'Previous Page' : 'عرض الصفحة السابقة',
            'Go To Last Page' : 'عرض الصفحة الأخيرة',
            'Zoom' : 'تكبير',
            'Zoom In' : 'تكبير في',
            'Zoom Out' : 'تكبير خارج',
            'Page Thumbnails': 'مصغرات الصفحة',
            'Bookmarks': 'المرجعية',
            'Print' : 'اطبع الملف',
            'Password Protected' : 'كلمة المرور مطلوبة',
            'Copy': 'نسخ',
            'Text Selection': 'أداة اختيار النص',
            'Panning': 'وضع عموم',
            'Text Search': 'بحث عن نص',
            'Find in document': 'ابحث في المستند',
            'Match case': 'حالة مباراة',
            'Apply': 'تطبيق',
            'GoToPage': 'انتقل إلى صفحة',
            'No matches': 'انتهى العارض من البحث في المستند. لم يتم العثور على مزيد من التطابقات',
            'No Text Found': 'لم يتم العثور على نص',
            'Undo' : 'فك',
            'Redo' : 'فعل ثانية',
            'Annotation': 'إضافة أو تعديل التعليقات التوضيحية',
            'Highlight': 'تسليط الضوء على النص',
            'Underline': 'تسطير النص',
            'Strikethrough': 'نص يتوسطه خط',
            'Delete': 'حذف التعليق التوضيحي',
            'Opacity': 'غموض',
            'Color edit': 'غير اللون',
            'Opacity edit': 'تغيير التعتيم',
            'Highlight context': 'تسليط الضوء',
            'Underline context': 'أكد',
            'Strikethrough context': 'يتوسطه',
            // tslint:disable-next-line:max-line-length
            'Server error': 'خدمة الانترنت لا يستمع. يعتمد قوات الدفاع الشعبي المشاهد على خدمة الويب لجميع ميزاته. يرجى بدء خدمة الويب للمتابعة.',
            'Open text': 'افتح',
            'First text': 'الصفحة الأولى',
            'Previous text': 'الصفحة السابقة',
            'Next text': 'الصفحة التالية',
            'Last text': 'آخر صفحة',
            'Zoom in text': 'تكبير',
            'Zoom out text': 'تصغير',
            'Selection text': 'اختيار',
            'Pan text': 'مقلاة',
            'Print text': 'طباعة',
            'Search text': 'بحث',
            'Annotation Edit text': 'تحرير التعليق التوضيحي'
        }
    }
});
/**
 * Default PdfViewer sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let viewer: PdfViewer = new PdfViewer({ enableRtl: true, locale: 'ar-AE' });
    viewer.serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
    viewer.appendTo('#pdfViewer');
    viewer.load('RTLText.pdf', null);
};