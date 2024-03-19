import { loadCultureFiles } from '../common/culture-loader';
import {
    PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
    ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer
} from '@syncfusion/ej2-pdfviewer';
// tslint:disable-next-line:max-line-length
import { Switch } from '@syncfusion/ej2-buttons';
import { ContextMenu, MenuItemModel } from '@syncfusion/ej2-navigations';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer);

/**
 * Context Menu PDF Viewer sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let viewer: PdfViewer = new PdfViewer();
    viewer.documentPath = "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf";
    viewer.resourceUrl = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib";
    var menuItems: MenuItemModel[] = [
        {
            text: 'Search In Google',
            id: 'search_in_google',
            iconCss: 'e-icons e-de-ctnr-find'
        },
        {
            text: 'Lock Annotation',
            iconCss: 'e-icons e-lock',
            id: 'lock_annotation'
        },
        {
            text: 'Unlock Annotation',
            iconCss: 'e-icons e-unlock',
            id: 'unlock_annotation'
        },
        {
            text: 'Lock Form Fields',
            iconCss: 'e-icons e-lock',
            id: 'read_only_true'
        },
        {
            text: 'Unlock Form Fields',
            iconCss: 'e-icons e-unlock',
            id: 'read_only_false'
        },
    ];

    var switchObj = new Switch({ value: 'Standalone Rendering', checked: true });
    switchObj.appendTo('#checked');

    switchObj.change = function (args: any) {
        if (args.checked) {
            viewer.serviceUrl = '';
        } else {
            viewer.serviceUrl = 'https://services.syncfusion.com/js/production/api/pdfviewer';
        }
        viewer.dataBind();
        viewer.load(viewer.documentPath, null);
    }
    viewer.appendTo('#pdfViewer');

    viewer.documentLoad = function (args: any) {
        viewer.addCustomMenu(menuItems, false, false);
    }

    viewer.customContextMenuSelect = function (args: any) {
        switch (args.id) {
            case 'search_in_google':
                for (var i = 0; i < viewer.textSelectionModule.selectionRangeArray.length; i++) {
                    var content = viewer.textSelectionModule.selectionRangeArray[i].textContent;
                    if ((viewer.textSelectionModule.isTextSelection) && (/\S/.test(content))) {
                        window.open('http://google.com/search?q=' + content);
                    }
                }
                break;
            case 'lock_annotation':
                lockAnnotations(args);
                break;
            case 'unlock_annotation':
                unlockAnnotations(args);
                break;
            case 'read_only_true':
                setReadOnlyTrue(args);
                break;
            case 'read_only_false':
                setReadOnlyFalse(args);
                break;
            case 'formfield properties':
                break;
            default:
                break;
        }
    };

    viewer.customContextMenuBeforeOpen = function (args: any) {
        for (var i = 0; i < args.ids.length; i++) {
            var search = document.getElementById(args.ids[i]);
            if (search) {
                search.style.display = 'none';
                if (args.ids[i] === 'search_in_google' && (viewer.textSelectionModule) && viewer.textSelectionModule.isTextSelection) {
                    search.style.display = 'block';
                } else if (args.ids[i] === "lock_annotation" || args.ids[i] === "unlock_annotation") {
                    var isLockOption = args.ids[i] === "lock_annotation";
                    for (var j = 0; j < viewer.selectedItems.annotations.length; j++) {
                        var selectedAnnotation: any = viewer.selectedItems.annotations[j];
                        if (selectedAnnotation && selectedAnnotation.annotationSettings) {
                            var shouldDisplay = (isLockOption && !selectedAnnotation.annotationSettings.isLock) ||
                                (!isLockOption && selectedAnnotation.annotationSettings.isLock);
                            search.style.display = shouldDisplay ? 'block' : 'none';
                        }
                    }
                } else if ((args.ids[i] === "read_only_true" || args.ids[i] === "read_only_false") && viewer.selectedItems.formFields.length !== 0) {
                    var isReadOnlyOption = args.ids[i] === "read_only_true";
                    for (var k = 0; k < viewer.selectedItems.formFields.length; k++) {
                        var selectedFormFields = viewer.selectedItems.formFields[k];
                        if (selectedFormFields) {
                            var selectedFormField = viewer.selectedItems.formFields[k].isReadonly;
                            var displayMenu = (isReadOnlyOption && !selectedFormField) || (!isReadOnlyOption && selectedFormField);
                            search.style.display = displayMenu ? 'block' : 'none';
                        }
                    }
                } else if (args.ids[i] === 'formfield properties' && viewer.selectedItems.formFields.length !== 0) {
                    search.style.display = 'block';
                }
            }
        }
    };

    function lockAnnotations(args: any) {
        for (var i = 0; i < viewer.annotationCollection.length; i++) {
            if (viewer.annotationCollection[i].uniqueKey === viewer.selectedItems.annotations[0].id) {
                viewer.annotationCollection[i].annotationSettings.isLock = true;
                viewer.annotationCollection[i].isCommentLock = true;
                viewer.annotation.editAnnotation(viewer.annotationCollection[i]);
            }
            args.cancel = false;
        }
    }

    function unlockAnnotations(args: any) {
        for (var i = 0; i < viewer.annotationCollection.length; i++) {
            if (viewer.annotationCollection[i].uniqueKey === viewer.selectedItems.annotations[0].id) {
                viewer.annotationCollection[i].annotationSettings.isLock = false;
                viewer.annotationCollection[i].isCommentLock = false;
                viewer.annotation.editAnnotation(viewer.annotationCollection[i]);
            }
            args.cancel = false;
        }
    }
    
    function setReadOnlyTrue(args: any) {
        var selectedFormFields = viewer.selectedItems.formFields;
        for (var i = 0; i < selectedFormFields.length; i++) {
            var selectedFormField = selectedFormFields[i];
            if (selectedFormField) {
                viewer.formDesignerModule.updateFormField(selectedFormField, {
                    isReadOnly: true,
                } as any);
            }
            args.cancel = false;
        }
    }

    function setReadOnlyFalse(args: any) {
        var selectedFormFields = viewer.selectedItems.formFields;
        for (var i = 0; i < selectedFormFields.length; i++) {
            var selectedFormField = selectedFormFields[i];
            if (selectedFormField) {
                viewer.formDesignerModule.updateFormField(selectedFormField, {
                    isReadOnly: false,
                } as any);
            }
            args.cancel = false;
        }
    }

    let defaultCheckBoxObj: CheckBox = new CheckBox({
        change: contextmenuHelper,
        cssClass: 'multiline',
    });
    defaultCheckBoxObj.appendTo('#hide-default-context-menu');

    let positionCheckBoxObj: CheckBox = new CheckBox({
        change: contextmenuHelper,
        cssClass: 'multiline',
    });
    positionCheckBoxObj.appendTo('#show-custom-menu-bottom');

    function contextmenuHelper(args: ChangeEventArgs): void {
        viewer.addCustomMenu(menuItems, defaultCheckBoxObj.checked, positionCheckBoxObj.checked);
    }
};