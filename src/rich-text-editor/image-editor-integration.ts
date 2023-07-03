import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Image Editor integration sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, NodeSelection } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);
import { Dialog } from '@syncfusion/ej2-popups';
import { ImageEditor } from '@syncfusion/ej2-image-editor';

(window as any).default = (): void => {
    loadCultureFiles();

    let selection = new NodeSelection();
    let header = 'Image Editor';
    let range: Range;
    let saveSelection: NodeSelection;
    let dataURL;
    let isLoaded = false;
    let imageELement: any;
    let imageEditorObj: ImageEditor;
    let dlgButtons = [
        {
          buttonModel: { content: 'Save', isPrimary: true },
          click: onInsert.bind(this),
        },
        { buttonModel: { content: 'Cancel' }, click: onCancel },
      ];
    let defaultRTE: RichTextEditor = new RichTextEditor({
        quickToolbarSettings: {
            image: [
              'Replace',
              'Align',
              'Caption',
              'Remove',
              '-',
              'InsertLink',
              'Display',
              'AltText',
              {
                tooltipText: 'Image Editor',
                template:
                  '<button class="e-tbar-btn e-btn" id="imageEditor"><span class="e-btn-icon e-icons e-rte-image-editor"></span></button>',
              },
            ],
          },
        
          toolbarClick: onToolbarClick,
          destroyed: destroyed
     });
    defaultRTE.appendTo('#defaultRTE');

    
      let dialogObj: Dialog = new Dialog({
        buttons: dlgButtons,
        open: OnOpen,
        header: header,
        visible: false,
        showCloseIcon: true,
        width: '800px',
        height: '550px',
        isModal: true,
      });
      dialogObj.appendTo('#defaultDialog');

    function destroyed() {
        dialogObj.destroy();
    }

    function onToolbarClick(args: any){
        if (args.item.tooltipText === 'Image Editor') {
            range = selection.getRange(document);
            saveSelection = selection.save(range, document);
            dialogObj.show();
          }
    }
    function onInsert() {
        if (defaultRTE.formatter.getUndoRedoStack().length === 0) {
          defaultRTE.formatter.saveData();
        }
        saveSelection.restore();
        let canvas: any = document.createElement('CANVAS');
        let ctx: any = canvas.getContext('2d');
        const imgData = imageEditorObj.getImageData();
        canvas.height = imgData.height;
        canvas.width = imgData.width;
        ctx.putImageData(imgData, 0, 0);
        isLoaded = true;
        defaultRTE.executeCommand('editImage', {
          url: canvas.toDataURL(),
          width: { width: canvas.width },
          height: { height: canvas.height },
          selection: saveSelection,
          cssClass: imageELement.getAttribute('class').replace('e-rte-image', ''),
        });
        defaultRTE.formatter.saveData();
        defaultRTE.formatter.enableUndo(defaultRTE);
        dialogObj.hide();
        isLoaded = false;
      }
      
      function onCancel() {
        imageEditorObj.destroy();
        imageEditorObj = null;
        dialogObj.hide();
      }
      function OnOpen() {
        if(imageEditorObj == null){
          imageEditorObj = new ImageEditor({
            height: '400px',
            toolbar: ['Undo', 'Redo', 'Crop', 'Annotate', 'ZoomIn', 'ZoomOut',
                      'Reset', 'Pan', 'Finetune', 'Filter', 'Pen', 'Line', 'Rectangle', 'Ellipse', 'Arrow',
                      'Path', 'Text', 'CustomSelection', 'CircleSelection', 'SquareSelection', 'RatioSelection',
                      'Default', 'Chrome', 'Cold', 'Warm', 'Grayscale', 'Sepia', 'Invert', 'Brightness', 'Contrast',
                      'Hue', 'Saturation', 'Exposure', 'Opacity', 'Blur' ]
          });
          imageEditorObj.appendTo('#imageeditor');
        }
        let selectNodes: any =
          defaultRTE.formatter.editorManager.nodeSelection.getNodeCollection(range);
        if (selectNodes.length == 1 && selectNodes[0].tagName == 'IMG') {
          imageELement = selectNodes[0];
          imageELement.crossOrigin = 'anonymous';
          let canvas: any = document.createElement('CANVAS');
          let ctx = canvas.getContext('2d');
          canvas.height = imageELement.offsetHeight;
          canvas.width = imageELement.offsetWidth;
          imageELement.onload = function () {
            ctx.drawImage(imageELement, 0, 0, canvas.width, canvas.height);
            dataURL = canvas.toDataURL();
            if (!isLoaded) {
              imageEditorObj.open(dataURL);
            }
          };
          if (imageELement.complete) {
            imageELement.onload();
          }
        }
      }
};
