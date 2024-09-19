import { loadCultureFiles } from '../common/culture-loader';
import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer, PdfViewerModel, FormFieldAddArgs } from '@syncfusion/ej2-pdfviewer';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Sidebar } from '@syncfusion/ej2-navigations';
import { Button, ClickEventArgs } from '@syncfusion/ej2-buttons';
import { Toolbar as EJToolbar, ItemModel } from '@syncfusion/ej2-navigations';
import { Draggable, Browser } from '@syncfusion/ej2-base';

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer);

/**
 * Default PdfViewer sample
 */
(window as any).default = (): void => {
  loadCultureFiles();

  let currentUser: string = 'andrew@mycompany.com';
  let zoomFactor: number;
  let currentUserColorId: string = 'ff0000';
  let currentFieldType: any;
  let userColor: string = '#eff7ef';
  let isDropped: boolean = false;
  let defaultFieldWidth: number = 200;
  let defaultFieldHeight: number = 24;
  let checkBoxFieldSize: number = 20;
  let radioFieldSize: number = 20;
  let SignatureFieldSize: number = 66;
  let ListFieldSize: number = 66;
  var defaultZoomFactor = false;
  let isMobile: boolean = Browser.isDevice;
  let viewer: PdfViewer = new PdfViewer({
    documentPath: 'https://cdn.syncfusion.com/content/PDFViewer/Fill+and+Sign.pdf',
    resourceUrl: 'https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib',
    serviceUrl: 'https://services.syncfusion.com/js/production/api/pdfviewer',
    documentLoad: documentLoaded,
    pageClick: pageClick
  });

  viewer.enableFormFieldsValidation = true;
  viewer.showNotificationDialog = false;
  viewer.enableToolbar = false;
  viewer.enableNavigationToolbar = false;
  viewer.enableAnnotationToolbar =false;
  viewer.downloadFileName = 'eSign_designMode.pdf';
  viewer.appendTo('#pdfViewer');

  let toolbarItems: ItemModel[] = [
    {
      type: 'Input',
      align: 'Left',
      template: "<div id='e-pv-e-sign-user-field-mob' style='width: 200px;'><div class='e-pv-e-sign-user-dropdown' style='width: 200px;'> <input id='userMenuMob' width='200px'></input></div></div>",
    },
    {
      prefixIcon: 'e-icons e-download',
      text: 'Download',
      align: 'Right',
      tooltipText: 'Save',
      id: 'e-pv-e-sign-download',
      click: downloadClicked.bind(this),
    },
  ];

  let toolbarObj: EJToolbar = new EJToolbar({
    cssClass: 'template',
    items: toolbarItems,
  });
  toolbarObj.appendTo('#e-pv-e-sign-toolbar_template');

  interface UserDetails {
    Name: string;
    Eimg: string;
    Mail: string;
    fieldIds: any[];
  }

  let userDetails: any = [
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

  function getBorderColor(email: string): string {
    return email === 'andrew@mycompany.com' ? 'red' : 'green';
  }

  let listObj: DropDownList = new DropDownList({
    dataSource: userDetails,
    fields: { text: 'Mail', value: 'Eimg' },
    index: 0,
    width: '187px',
    popupWidth: '190px',
    itemTemplate: function (data: UserDetails) {
      return `
            <div style="display:flex;">
                <img class="empImage" style="border: 1px solid ${getBorderColor(data.Mail)};border-radius:50%;margin-top:2px" src="src/pdfviewer/images/employees/${data.Eimg}.png" height="32px" width="32px" alt="employee" />
                <div>
                    <div class="ename" style="font-size:12px;height:16px;">${data.Name}</div>
                    <div class="mail" style="font-size:10px;">${data.Mail}</div>
                </div>
            </div>`;
    },
    valueTemplate: function (data: UserDetails) {
      return `
            <div style="display:flex;margin: 2px;">
                <img class="value" style="border: 1px solid ${getBorderColor(data.Mail)}; border-radius:50%;" src="src/pdfviewer/images/employees/${data.Eimg}.png" height="32px" width="32px" alt="employee" />
                <div>
                    <div class="name" style="font-size:12px;margin-left: 12px;">${data.Name}</div>
                    <div class="mail" style="font-size:10px;margin-left: 12px;">${data.Mail}</div>
                </div>
            </div>`;
    }
  });
  listObj.appendTo('#userMenu');

  let listObjMob: DropDownList = new DropDownList({
    dataSource: userDetails,
    fields: { text: 'Mail', value: 'Eimg' },
    index: 0,
    width: '187px',
    popupWidth: '190px',
    itemTemplate: function (data: UserDetails) {
      return `
          <div style="display:flex;">
              <img class="empImage" style="border: 1px solid ${getBorderColor(data.Mail)};border-radius:50%;margin-top:2px" src="//npmci.syncfusion.com/development/demos/src/pdfviewer/images/employees/${data.Eimg}.png" height="32px" width="32px" alt="employee" />
              <div>
                  <div class="ename" style="font-size:12px;height:16px;">${data.Name}</div>
                  <div class="mail" style="font-size:10px;">${data.Mail}</div>
              </div>
          </div>`;
    },
    valueTemplate: function (data: UserDetails) {
      return `
          <div style="display:flex;margin: 2px;">
              <img class="value" style="border: 1px solid ${getBorderColor(data.Mail)}; border-radius:50%;" src="//npmci.syncfusion.com/development/demos/src/pdfviewer/images/employees/${data.Eimg}.png" height="32px" width="32px" alt="employee" />
              <div>
                  <div class="name" style="font-size:12px;margin-left: 12px;">${data.Name}</div>
                  <div class="mail" style="font-size:10px;margin-left: 12px;">${data.Mail}</div>
              </div>
          </div>`;
    }
  });
  listObjMob.appendTo('#userMenuMob');

  let toolbarMobObj: EJToolbar = new EJToolbar({
    overflowMode: 'Scrollable',
    cssClass: 'template',
    items: [
      { id: 'signature', prefixIcon: 'e-icons e-signature', click: signature.bind(this) },
      { id: 'initial', prefixIcon: 'e-icons e-font-name', click: initial.bind(this) },
      { id: 'textBox', prefixIcon: 'e-icons e-text-form', click: textBox.bind(this) },
      { id: 'password', prefixIcon: 'e-icons e-password', click: password.bind(this) },
      { id: 'checkBox', prefixIcon: 'e-icons e-check-box', click: checkBox.bind(this) },
      { id: 'radioButton', prefixIcon: 'e-icons e-radio-button', click: radioBtn.bind(this) },
      { id: 'dropDown', prefixIcon: 'e-icons e-drop-down', click: dropDown.bind(this) },
      { id: 'listBox', prefixIcon: 'e-icons e-list-unordered', click: listBox.bind(this) }
    ],
  });
  toolbarMobObj.appendTo('#e-pv-e-sign-toolbar_template-mob');

  let sideObj: Sidebar = new Sidebar({
    width: "200px",
    enableGestures: false
  });
  sideObj.appendTo("#e-pv-e-sign-defaultSidebar_user");

  const layout = document.getElementById('e-pv-e-sign-layout');
  const sidebar = document.getElementById('e-pv-e-sign-defaultSidebar_user');
  const dropdown = document.getElementById('e-pv-e-sign-user-field-mob');
  const viewerDiv = document.getElementById('e-pv-e-sign-pdfViewer-div');
  const downloadElement = document.getElementById("e-pv-e-sign-download");
  const toolbarElementMob = document.getElementById("e-pv-e-sign-toolbar_template-mob");
  if (isMobile) {
    layout.style.display = 'block';
    dropdown.style.display = 'block';
    toolbarElementMob.style.display = 'block';
    sidebar.style.display = 'none';
    viewerDiv.style.width = '100%';
    downloadElement.style.border = 'none';
    downloadElement.style.width = '40px';
    downloadElement.removeChild(downloadElement.lastChild);
  } else {
    layout.style.display = 'flex';
    dropdown.style.display = 'none';
    toolbarElementMob.style.display = 'none';
    sidebar.style.display = 'block';
    viewerDiv.style.width = 'calc(100% - 200px)';
    downloadElement.style.width = '115px';
    downloadElement.style.width = '1px solid #C4C7C5';
  }


  let textboxBtn: Button = new Button({ cssClass: 'e-outline' });
  textboxBtn.appendTo('#textBoxBtn');

  let passwordBtn: Button = new Button({ cssClass: 'e-outline' });
  passwordBtn.appendTo('#passwordBtn');

  let checkboxBtn: Button = new Button({ cssClass: 'e-outline' });
  checkboxBtn.appendTo('#checkBoxBtn');

  let radioButton: Button = new Button({ cssClass: 'e-outline' });
  radioButton.appendTo('#radioBtn');

  let dropDownBtn: Button = new Button({ cssClass: 'e-outline' });
  dropDownBtn.appendTo('#dropDownBtn');

  let listBoxBtn: Button = new Button({ cssClass: 'e-outline' });
  listBoxBtn.appendTo('#listBoxBtn');

  let signatureBtn: Button = new Button({ cssClass: 'e-outline' });
  signatureBtn.appendTo('#Signature');

  let initialBtn: Button = new Button({ cssClass: 'e-outline' });
  initialBtn.appendTo('#initialBtn');

  listObj.change = function (args: any) {
    currentUser = args.itemData.Mail;
  };

  listObjMob.change = function (args: any) {
    currentUser = args.itemData.Mail;
  };
  function signature(args: ClickEventArgs) {
    viewer.formDesignerModule.setFormFieldMode('SignatureField');
  }
  function initial(args: ClickEventArgs) {
    viewer.formDesignerModule.setFormFieldMode('InitialField');
  }
  function textBox(args: ClickEventArgs) {
    viewer.formDesignerModule.setFormFieldMode('Textbox');
  }

  function password(args: ClickEventArgs) {
    viewer.formDesignerModule.setFormFieldMode('Password');
  }

  function checkBox(args: ClickEventArgs) {
    viewer.formDesignerModule.setFormFieldMode('CheckBox');
  }

  function radioBtn(args: ClickEventArgs) {
    viewer.formDesignerModule.setFormFieldMode('RadioButton');
  }

  function dropDown(args: ClickEventArgs) {
    viewer.formDesignerModule.setFormFieldMode('DropDown');
  }

  function listBox(args: ClickEventArgs) {
    viewer.formDesignerModule.setFormFieldMode('ListBox');
  }

  function documentLoaded(): void {
    viewer.magnification.fitToPage();
    defaultZoomFactor = true;
    viewer.designerMode = true;
    initializeDraggable(textboxBtn.element, 'Textbox');
    initializeDraggable(signatureBtn.element, 'SignatureField');
    initializeDraggable(passwordBtn.element, 'Password');
    initializeDraggable(checkboxBtn.element, 'CheckBox');
    initializeDraggable(radioButton.element, 'RadioButton');
    initializeDraggable(dropDownBtn.element, 'DropDown');
    initializeDraggable(listBoxBtn.element, 'ListBox');
    initializeDraggable(initialBtn.element, 'InitialField');
    defaultZoomFactor = false;
  }
  document.getElementById("textBoxBtn").onclick = function (e: any) {
    console.log(e);
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents)
      viewer.formDesignerModule.setFormFieldMode('Textbox');

  };
  document.getElementById("passwordBtn").onclick = function (e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents)
      viewer.formDesignerModule.setFormFieldMode('Password');
  };

  document.getElementById("checkBoxBtn").onclick = function (e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents)
      viewer.formDesignerModule.setFormFieldMode('CheckBox');
  };

  document.getElementById("radioBtn").onclick = function (e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents)
      viewer.formDesignerModule.setFormFieldMode('RadioButton');
  };

  document.getElementById("dropDownBtn").onclick = function (e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents)
      viewer.formDesignerModule.setFormFieldMode('DropDown');
  };

  document.getElementById("listBoxBtn").onclick = function (e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents)
      viewer.formDesignerModule.setFormFieldMode('ListBox');
  };

  document.getElementById("Signature").onclick = function (e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents)
      viewer.formDesignerModule.setFormFieldMode('SignatureField');
  };

  document.getElementById("initialBtn").onclick = function (e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents)
      viewer.formDesignerModule.setFormFieldMode('InitialField');
  };

  function initializeDraggable(element: HTMLElement, fieldType: string): void {
    let cloneElement: HTMLElement;
    new Draggable(element, {
      helper: (e: any): HTMLElement => {
        if (e.sender.type == "mousemove") {
          cloneElement = document.createElement('div');
          zoomFactor = viewer.viewerBase.getZoomFactor();
          cloneElement.style.width = (defaultFieldWidth * zoomFactor) + 'px';
          cloneElement.style.height = (defaultFieldHeight * zoomFactor) + 'px';
          cloneElement.style.borderRadius = '0';

          switch (fieldType) {
            case 'SignatureField':
            case 'InitialField':
              cloneElement.style.height = (SignatureFieldSize * zoomFactor) + 'px';
              break;
            case 'CheckBox':
              cloneElement.style.height = (checkBoxFieldSize * zoomFactor) + 'px';
              cloneElement.style.width = (checkBoxFieldSize * zoomFactor) + 'px';
              break;
            case 'RadioButton':
              cloneElement.style.height = (radioFieldSize * zoomFactor) + 'px';
              cloneElement.style.width = (radioFieldSize * zoomFactor) + 'px';
              cloneElement.style.borderRadius = '50%';
              break;
            case 'ListBox':
              cloneElement.style.height = (ListFieldSize * zoomFactor) + 'px';
              break;
          }

          cloneElement.style.backgroundColor = currentUser === 'andrew@mycompany.com' ? '#ffefef' : '#eff7ef';
          cloneElement.style.zIndex = '10001';
          cloneElement.style.position = 'absolute';
          cloneElement.style.pointerEvents = 'none';
          document.body.appendChild(cloneElement);
          return cloneElement;
        }
        else {
          return null;
        }
      },
      drag: (e: any): void => {
        e.event.preventDefault();
      },
      dragStart: (e: any): void => {
        currentFieldType = fieldType;
        isDropped = true;
        getCursorAtPosition(fieldType);
      },
      dragStop: (e: any): void => {
        if (e.helper && e.helper.parentNode) {
          e.helper.parentNode.removeChild(e.helper);
        }
        isDropped = false;
      },
      clone: true,
      cursorAt: getCursorAtPosition(fieldType),
      enableTailMode: true,
    } as any);
  }

  function getCursorAtPosition(fieldType: string): { left: number, top: number } {
    if (defaultZoomFactor) {
      zoomFactor = 1;
    } else {
      zoomFactor = viewer.viewerBase.getZoomFactor();
    }

    let left: number, top: number;
    let scaledWidth = defaultFieldWidth * zoomFactor;
    let scaledHeight = defaultFieldHeight * zoomFactor;

    switch (fieldType) {
      case 'CheckBox':
      case 'RadioButton':
        scaledWidth = checkBoxFieldSize * zoomFactor;
        scaledHeight = checkBoxFieldSize * zoomFactor;
        left = 0;
        top = (checkBoxFieldSize / 2) * zoomFactor - (scaledHeight / 2);
        break;
      case 'ListBox':
        scaledHeight = ListFieldSize * zoomFactor;
        left = 90;
        top = (ListFieldSize / 2) * zoomFactor - (scaledHeight / 2);
        break;
      case 'SignatureField':
      case 'InitialField':
        scaledHeight = SignatureFieldSize * zoomFactor;
        left = 90;
        top = (SignatureFieldSize / 2) * zoomFactor - (scaledHeight / 2);
        break;
      default:
        scaledHeight = defaultFieldHeight * zoomFactor;
        left = 90;
        top = (defaultFieldHeight / 2) * zoomFactor - (scaledHeight / 2);
        break;
    }

    left = left / zoomFactor - (scaledWidth / 2);
    return { left: left, top: top };
  }

  function pageClick(args: { x: number, y: number }): void {
    if (isDropped) {
      isDropped = false;
      let width = defaultFieldWidth;
      let height = defaultFieldHeight;

      switch (currentFieldType) {
        case 'Textbox':
          height = defaultFieldHeight;
          break;
        case 'SignatureField':
        case 'InitialField':
          height = SignatureFieldSize;
          break;
        case 'Password':
          break;
        case 'CheckBox':
        case 'RadioButton':
          width = checkBoxFieldSize;
          height = checkBoxFieldSize;
          break;
        case 'ListBox':
          height = ListFieldSize;
          break;
      }

      viewer.formDesignerModule.addFormField(currentFieldType, { bounds: { X: args.x, Y: args.y, Width: width, Height: height } } as any);
    }
  }
  function downloadClicked(args: any): void {
    viewer.download();
  }

  viewer.formFieldAdd = function (args: FormFieldAddArgs) {
    userColor = currentUser === 'andrew@mycompany.com' ? '#ffefef' : '#eff7ef';
    let author = currentUser === 'andrew@mycompany.com' ? 'andrew' : 'anne';
    viewer.formDesigner.updateFormField(args.field.id, { customData: { author }, backgroundColor: userColor } as any);

    let currentUserDetails = userDetails.find((userDetail: { Mail: string; }) => userDetail.Mail === currentUser);
    if (currentUserDetails) {
      let currentFormField = viewer.formFieldCollections.find(formField => formField.id === args.field.id);
      if (currentFormField) {
        currentUserDetails.fieldIds.push(currentFormField);
      }
    }
    let signIcons = document.querySelectorAll('[id*="signIcon"]');
    signIcons.forEach(element => {
      if (viewer.zoomPercentage < 65) {
        (element as any).style.fontSize = '5px'
      } else if (viewer.zoomPercentage <= 85 && viewer.zoomPercentage > 65) {
        (element as any).style.fontSize = "7px";
      }
    });
  };
};