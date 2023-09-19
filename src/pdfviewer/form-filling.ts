import { loadCultureFiles } from '../common/culture-loader';
import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner } from '@syncfusion/ej2-pdfviewer';
import { Switch } from '@syncfusion/ej2-buttons';

// tslint:disable-next-line:max-line-length
PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner);

/**
 * Form Filling PdfViewer sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let viewer: PdfViewer = new PdfViewer();
    viewer.documentPath = "https://cdn.syncfusion.com/content/pdf/form-filling-document.pdf"; 

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
    viewer.enableFormFieldsValidation = true;
    viewer.showNotificationDialog = false;
    viewer.validateFormFields = function(args) {
        var errorMessage = "Required Field(s): ";
        var forms = viewer.formFieldCollections;
        var flag = false;
        var radioGroupName = "";
        for (var i = 0; i < forms.length; i++) {
            var text = "";
            if (forms[i].isRequired == true)
            {
                if (forms[i].type.toString() == "Checkbox" && forms[i].isChecked == false) {
                    text = forms[i].name;
                }
                else if (forms[i].type == "RadioButton" && flag == false) {
                    radioGroupName = forms[i].name;
                    if(forms[i].isSelected == true)
                        flag = true;
                }
                else if (forms[i].type.toString() != "Checkbox" && forms[i].type != "RadioButton" &&  forms[i].value == ""){
                    text = forms[i].name;
                }
                if(text != "")
                {                    
                    if (errorMessage == "Required Field(s): ") {
                        errorMessage += text;
                    }
                    else {
                        errorMessage += ", " + text;
                    }
                }
            }
        }
        if(!flag && radioGroupName != "")
        {
            if(errorMessage == "Required Field(s): ")
                errorMessage += radioGroupName;
            else
                errorMessage += ", " + radioGroupName;
        }
        if (errorMessage != "Required Field(s): ") {
            viewer.showNotificationPopup(errorMessage);
        }
    }
};
