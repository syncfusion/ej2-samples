import { loadCultureFiles } from '../common/culture-loader';
import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer, PdfViewerModel, FormFieldAddArgs } from '@syncfusion/ej2-pdfviewer';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ClickEventArgs, Sidebar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { Toolbar as EJToolbar, ItemModel } from '@syncfusion/ej2-navigations';
import { Dialog } from '@syncfusion/ej2-popups';

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer);

(window as any).default = (): void => {
    loadCultureFiles();
    interface UserDetails {
        Name: string;
        Eimg: string;
        Mail: string;
        fieldIds: any[];
    }
    // Render the PDF viewer control
    let userDetails: UserDetails[] | any = [        
        {
            Name: 'Andrew Fuller',
            Eimg: 'profile1',
            Mail: 'andrew@mycompany.com',
            fieldIds: [],
        },
        {
            Name: 'Anne Dodsworth',
            Eimg: 'profile2',
            Mail: 'anne@mycompany.com',
            fieldIds: [],
        },
    ];
    
    let currentUser = 'andrew@mycompany.com';
    let isStatus = false;
    let isPreventChange = false;
    let finishedBackground = '#daeaf7';
    let anneBackground = '#eff7ef';
    let andrewBackground = '#ffefef';
    let viewer = new PdfViewer({
        documentPath: "https://cdn.syncfusion.com/content/pdf/eSign_filling.pdf",
        resourceUrl: 'https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib',
        documentLoad: documentLoaded,
    });
    viewer.enableToolbar = false;
    viewer.enableNavigationToolbar = false;
    viewer.enableAnnotationToolbar =false;
    viewer.designerMode = true;
    viewer.downloadFileName = 'eSign_filling.pdf';

    viewer.appendTo('#pdfViewer');

    let toolbarObj = new EJToolbar({
        overflowMode: 'Popup',
        cssClass: 'template',
        items: [
            {
                type: 'Input',
                align: 'Left',
                template:
                    "<div id='user-field' style='width: 200px;'><div class='user-dropdown' style='width: 200px;'> <input id='userMenu' width='200px'></input></div></div>",
            },
            {
                type: 'Input', 
                align: 'Right', 
                template: "<div> <button id='finish-btn'>Finish Signing</button></div>",
            },
        ],
    });
    toolbarObj.appendTo('#toolbar_user_viewer');

    let listObj = new DropDownList({
        dataSource: userDetails,
        fields: { text: 'Mail', value: 'Eimg'},
        index: 0,
        width: '200px',
        popupWidth: '215px',
        itemTemplate: (data: UserDetails) => `
            <div style="display:flex;">
                <img class="empImage" style="border: 1px solid ${getBorderColor(data.Mail)};height:32px width:32px" src="src/pdfviewer/images/employees/${data.Eimg}.png" alt="employee" />
                <div>
                    <div class="ename" style="font-size:14px;height:18px;">${data.Name}</div>
                    <div class="mail" style="font-size:12px;">${data.Mail}</div>
                </div>
            </div>`,
        valueTemplate: (data: UserDetails) => `
            <div style="display:flex;">
                <img class="value" style="border: 1px solid ${getBorderColor(data.Mail)}; margin: 0px 0px 5px 10px; border-radius:50%;" src="src/pdfviewer/images/employees/${data.Eimg}.png" height="32px" width="32px" alt="employee" />
                <div>
                    <div class="name" style="font-size:12px;margin-left: 12px;">${data.Name}</div>
                    <div class="mail" style="font-size:10px;margin-left: 12px;">${data.Mail}</div>
                </div>
            </div>`,
    });
    listObj.appendTo("#userMenu");

    
    function getBorderColor(email: string): string {
        return email === 'andrew@mycompany.com' ? 'red' : 'green';
    }

    listObj.select = function (args: ChangeEventArgs) {
        currentUser = (args.itemData as UserDetails).Mail;
        updateUserFormField();
        if (isPreventChange) {
            args.cancel = true;
        }
    };

    let finishBtnObj = new Button({ cssClass: 'e-outline' });
    finishBtnObj.appendTo('#finish-btn');
    finishBtnObj.disabled = true;

    finishBtnObj.element.onclick = function (): void {
        for (var formField of viewer.formFieldCollections) {
            viewer?.formDesignerModule.updateFormField(formField, { backgroundColor: finishedBackground } as any);
        }
        const url: string = "https://ej2services.syncfusion.com/js/development/api/pdfviewer/FlattenDownload";
        viewer.saveAsBlob().then((blob: Blob) => {
            return convertBlobToBase64(blob);
        }).then((base64String: string) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            const requestData = JSON.stringify({ base64String: base64String });
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const responseBase64 = xhr.responseText.split('base64,')[1];
                    if (responseBase64) {
                        const blob = createBlobFromBase64(responseBase64, 'application/pdf');
                        const blobUrl = URL.createObjectURL(blob);
                        downloadDocument(blobUrl);
                        viewer.load(xhr.responseText, null);
                        finishBtnObj.disabled = true;
                        listObj.enabled = false;
                    } else {
                        console.error('Invalid base64 response.');
                    }
                } else {
                    console.error('Download failed:', xhr.statusText);
                }
            };
            xhr.onerror = () => {
                console.error('An error occurred during the download:', xhr.statusText);
            };
            xhr.send(requestData);
        }).catch((error: Error) => {
            console.error('Error saving Blob:', error);
        });
    };

    function convertBlobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject(new Error('Failed to convert Blob to Base64'));
                }
            };
            reader.onerror = (error) => reject(error);
        });
    }

    function createBlobFromBase64(base64String: string, contentType: string): Blob {
        const sliceSize = 512;
        const byteCharacters = atob(base64String);
        const byteArrays: Uint8Array[] = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    }

    function downloadDocument(blobUrl: string): void {
        const anchorElement = document.createElement('a');
        anchorElement.href = blobUrl;
        anchorElement.target = '_parent';
        const downloadFileName = viewer.fileName || 'default.pdf';
        anchorElement.download = downloadFileName.endsWith('.pdf')
            ? downloadFileName
            : `${downloadFileName.split('.pdf')[0]}.pdf`;
        document.body.appendChild(anchorElement);
        anchorElement.click();
        document.body.removeChild(anchorElement);
        URL.revokeObjectURL(blobUrl);
    }

    let dialogObj = new Dialog({
        width: '350px',
        minHeight: '50px',
        isModal: true,
        visible: isStatus,
        buttons: [{ click: dlgButtonClick, buttonModel: { content: 'OK', isPrimary: true } }],
    });
    dialogObj.appendTo('#dialog');

    viewer.formFieldPropertiesChange = function (args: any) {
        var errorMessage = "Required Field(s): ";
        var forms: any = viewer.formFieldCollections;
        var flag = false;
        var isAllFieldFilled = true;
        var radioGroupName = "";
        for (var i = 0; i < forms.length; i++) {
            var text = "";
            {
                if (forms[i].type.toString() == "Checkbox" && forms[i].isChecked == false) {
                    text = forms[i].name;
                    isAllFieldFilled = false;
                }
                else if (forms[i].type == "RadioButton" && flag == false) {
                    radioGroupName = forms[i].name;
                    if (forms[i].isSelected == true)
                        flag = true;
                }
                else if (forms[i].type.toString() != "Checkbox" && forms[i].type != "RadioButton" && (forms[i].value === "" || ((typeof args.newValue === 'string') && args.newValue === ""))) {
                    text = forms[i].name;
                    isAllFieldFilled = false;
                }
                else if (forms[i].type.toString() == "DropdownList" && forms[i].value.length == 0) {
                    text = forms[i].name;
                    isAllFieldFilled = false;
                }
                if (text != "") {
                    if (errorMessage == "Required Field(s): ") {
                        errorMessage += text;
                    }
                    else {
                        errorMessage += ", " + text;
                    }
                }
            }
        }
        if (!flag && radioGroupName != "") {
            if (errorMessage == "Required Field(s): ")
                errorMessage += radioGroupName;
            else
                errorMessage += ", " + radioGroupName;
            isAllFieldFilled = false;
        }
        if (isAllFieldFilled) {
            finishBtnObj.disabled = false;
        } else {
            finishBtnObj.disabled = true;
        }
    };

    function dlgButtonClick() {
        isStatus = false;
        dialogObj.hide();
    }

    function updateUserFormField() {
        let otherFormFieldDetails = viewer.formFieldCollections.filter((formField : any) => {
            return formField.customData['author'] === "anne";
          });
        let currentFormFieldDetails = viewer.formFieldCollections.filter((formField: any) => formField.customData.author === "andrew");
        if (currentUser === 'andrew@mycompany.com') {
            otherFormFieldDetails.forEach((field: any) => {
                if (field.value !== '') {
                    let mainFieldUpdateData: any = {
                        backgroundColor: finishedBackground,
                        isReadOnly: true
                    };
                    viewer.formDesigner.updateFormField(field.id, mainFieldUpdateData);

                    currentFormFieldDetails.forEach((currentField: any) => {
                        let currentFieldUpdateData: any = {
                            backgroundColor: andrewBackground,
                            isReadOnly: true
                        };

                        viewer.formDesigner.updateFormField(currentField.id, currentFieldUpdateData);
                    });
                }
                else {
                    currentFormFieldDetails.forEach(function(currentField) {
                        let  currentFieldUpdateData: any = {
                            backgroundColor: andrewBackground,
                        };

                        viewer.formDesigner.updateFormField(currentField, currentFieldUpdateData);
                    });
                }
                let otherUserField = document.getElementById(field.id + '_content_html_element');
                if (otherUserField) {
                    let currentFormField: any = viewer.formFieldCollections.find((formField: any) => formField.id === field.id);
                    if (currentFormField.type !== 'DropDown' && otherUserField) {
                        if (!currentFormField.value) {
                            viewer.formDesignerModule.updateFormField(currentFormField, { visibility: 'hidden' }as any);
                        }
                    } else {
                        if (currentFormField.value.length !== 0 && otherUserField) {
                            viewer.formDesignerModule.updateFormField(currentFormField, { visibility: 'hidden' }as any);
                        }
                    }
                }
            });
        } else {
            validation(currentFormFieldDetails);
            if (!isStatus) {
                currentFormFieldDetails.forEach((field: any) => {
                    let currentFieldUpdateData: any = {
                        backgroundColor: finishedBackground,
                        isReadOnly: true
                    };
                    viewer.formDesigner.updateFormField(field.id, currentFieldUpdateData);

                    otherFormFieldDetails.forEach((otherField: any) => {
                        let otherFieldUpdateData: any = {
                            backgroundColor: anneBackground,
                            isReadOnly: false
                        };

                        viewer.formDesigner.updateFormField(otherField.id, otherFieldUpdateData );
                    });
                });
                otherFormFieldDetails.forEach((field: any) => {
                    viewer.formDesignerModule.updateFormField(field, { visibility: 'visible' } as any);
                });
            }
        }
    }

    function validation(forms: any) {
        var errorMessage = "Required Field(s): ";
        var flag = false;
        var isAllFieldFilled = true;
        var radioGroupName = "";

        for (let i = 0; i < forms.length; i++) {
            let text = "";
      
            if (forms[i].isRequired) {
              switch (forms[i].type.toString()) {
                case "Checkbox":
                  if (!forms[i].isChecked) {
                    text = forms[i].name;
                  }
                  break;
      
                case "RadioButton":
                  if (!flag) {
                    radioGroupName = forms[i].name;
                    if (forms[i].isSelected) {
                      flag = true;
                    }
                  }
                  break;
      
                case "DropdownList":
                  if (forms[i].value.length === 0) {
                    text = forms[i].name;
                  }
                  break;
      
                default:
                  if (!forms[i].value || (typeof forms[i].newValue === 'string' && forms[i].newValue === "")) {
                    text = forms[i].name;
                  }
                  break;
              }
      
              if (text) {
                errorMessage = errorMessage === "Required Field(s): " ? errorMessage + text : errorMessage + ", " + text;
              }
            }
          }
        if (!flag && radioGroupName != "") {
            if (errorMessage == "Required Field(s): ")
                errorMessage += radioGroupName;
            else
                errorMessage += ", " + radioGroupName;
            isAllFieldFilled = false;
        }
        if (errorMessage != "Required Field(s): ") {
            isStatus = true;
            dialogObj.content = errorMessage;
            dialogObj.show();
            isPreventChange = true;
        }
        else {
            isStatus = false;
            isPreventChange = false;
        }
    }

    function documentLoaded(): void {
        viewer.magnification.fitToPage();
        viewer.designerMode = false;
        updateUserFormField();
    }
};