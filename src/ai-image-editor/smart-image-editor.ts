

import { enableRipple } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2/buttons';
import { ImageEditor } from '@syncfusion/ej2-image-editor';
import { Sidebar, Toolbar, NodeSelectEventArgs, TreeView, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { ColorPicker, ColorPickerEventArgs, PaletteTileEventArgs, TextBox } from '@syncfusion/ej2/inputs';
import { hideSpinner, showSpinner } from '@syncfusion/ej2/popups';
import {Draggable} from  '@syncfusion/ej2-base';
import { createElement } from '@syncfusion/ej2/base';

enableRipple(true);

(window as any).default = (): void => {

    let colorPickerVal: string = '';
    const wrapperDiv = document.getElementById('wrapper-container') as HTMLElement;
    let dragElement: HTMLElement = document.getElementsByClassName('magic-eraser')[0] as HTMLElement;
    if (dragElement) {
        new Draggable(dragElement,{ clone: false });
    }
    dragElement = document.getElementsByClassName('bg-changer')[0] as HTMLElement;
    if (dragElement) {
        new Draggable(dragElement,{ clone: false });
    }
    const closeBtn = new Button({ iconCss: 'e-icons e-close', cssClass: 'e-small e-round', isPrimary: true });
    closeBtn.appendTo('#remove-btn');
    const eraseBtn = new Button({ cssClass: 'e-primary' });
    eraseBtn.appendTo('#eraseBtn');
    const changeBGBtn = new Button({ cssClass: 'e-primary' });
    changeBGBtn.appendTo('#bgChangeBtn');
    const bgCloseBtn = new Button({ iconCss: 'e-icons e-close', cssClass: 'e-small e-round', isPrimary: true });
    bgCloseBtn.appendTo('#bg-change-remove-btn');
    new ColorPicker({
        change: change
    }, '#color-picker');

    const colorPicker: ColorPicker = new ColorPicker({
        mode: 'Palette',
        modeSwitcher: false,
        inline: true,
        showButtons: false,
        columns: 6,
        presetColors: {
            'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
        },
        beforeTileRender: (args: PaletteTileEventArgs) => {
            args.element.classList.add('e-circle-palette');
            args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
        },
        change: change
    }, '#circle-palette');

    function change(args: ColorPickerEventArgs): void {
    colorPickerVal = args.currentValue.hex;
    imageEditorObj.open('', false, {backgroundColor: colorPickerVal} );
    }

    const outlineTextBox: TextBox = new TextBox({
    placeholder: 'Example: Waterfalls, Mountains, etc..',
    cssClass: 'e-outline'
    });

    outlineTextBox.appendTo('#outlined');
    const imageEditorObj: ImageEditor = new ImageEditor({
    fileOpened: (): void => {
        setTimeout(() => {
        imageEditorObj.update();
        }, 200);
    },
    created: (): void => {
        imageEditorObj.open('images/image-ai.png');
    }
    });

    imageEditorObj.appendTo('#imageeditor');
    const folderEle: string = '<div class= "e-folder"><div class= "e-folder-name">AI Image Editor</div></div>'; 
    const treeData: { [key: string]: Object }[] = [
        { id: "1", name: "Magic Eraser", imageUrl: "images/object-remover.gif" },
        { id: "2", name: "Change Background", imageUrl: "images/change-bg.png" },
        { id: "2", name: "Remove Background", imageUrl: "images/remove-bg.png" }
    ]
    const toolbarObj: Toolbar = new Toolbar({
        cssClass: "defaultToolbar",
        height: "50px",
        clicked: ToolbarCliked,
        items: [
            { prefixIcon: "e-tbar-menu-icon tb-icons", tooltipText: "Menu" },
            { template: folderEle, cssClass: "e-folder" }
        ]
    });
    toolbarObj.appendTo("#defaultToolbar");
    const sideObj: Sidebar = new Sidebar({
        width: "200px",
        target: ".maincontent",        
        position: 'Left',
        type: 'Push',
    });
    sideObj.appendTo("#defaultSidebar");
    const treeObj: TreeView = new TreeView({
    nodeSelected: OnSelect,
    fields: { dataSource: treeData, id: "id", text: "name", selected: "selected", parentID: "pid", hasChildren: "hasChild", expanded: "expanded" }
    });
    treeObj.appendTo("#defaultTree");
    function ToolbarCliked(args: ClickEventArgs): void {
        if(args.item.tooltipText == "Menu") {
        sideObj.toggle();
        setTimeout(() => {
            imageEditorObj.update();
        }, 500);
        }
    }

    // Assume you already have an ImageData object named imageData
    function imageDataToBase64(imageData: ImageData): string {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    ctx!.putImageData(imageData, 0, 0);
    const base64String = canvas.toDataURL();
    return base64String;
    }


    function OnSelect(args: NodeSelectEventArgs): void {
        if (args.nodeData.text == "Magic Eraser")
        {
        (document.getElementsByClassName('bg-changer')[0] as HTMLElement).style.display = 'none';
        (document.getElementsByClassName('magic-eraser')[0] as HTMLElement).style.display = 'block';
        imageEditorObj.update();
        imageEditorObj.element.setAttribute('data-value', 'mask-drawing');
        (imageEditorObj as any).freehandDraw(true);
        treeObj.selectedNodes = [];
        }
        else if (args.nodeData.text == "Change Background")
        {
        (document.getElementsByClassName('magic-eraser')[0] as HTMLElement).style.display = 'none';
        (document.getElementsByClassName('bg-changer')[0] as HTMLElement).style.display = 'block';
        treeObj.selectedNodes = [];
        showSpinner(imageEditorObj.element);
        wrapperDiv.style.opacity = '0.5';
        let imageData = (imageEditorObj as any).getImageData(false);
        let url = imageDataToBase64(imageData);
        const file = base64ToFile(url, 'image.png');
        removeBG(file);
        }
        else if (args.nodeData.text == "Remove Background")
        {
        showSpinner(imageEditorObj.element);
        wrapperDiv.style.opacity = '0.5';
        let imageData = (imageEditorObj as any).getImageData(false);
        let url = imageDataToBase64(imageData);
        const file = base64ToFile(url, 'image.png');
        removeBG(file);
        }
    }

    if (closeBtn.element) {
        closeBtn.element.onclick = (): void => {
            (imageEditorObj as any).element.setAttribute('data-value', '');
            (document.getElementsByClassName('magic-eraser')[0] as HTMLElement).style.display = 'none';
            hideSpinner(imageEditorObj.element);
            wrapperDiv.style.opacity = '1';
            imageEditorObj.discard();
        }
    }

    if (bgCloseBtn.element) {
            bgCloseBtn.element.onclick = (): void => {
            bgRemoveBtnClick();
        }
    }

    function bgRemoveBtnClick() {
    (document.getElementsByClassName('bg-changer')[0] as HTMLElement).style.display = 'none';
    colorPicker.refresh(); colorPickerVal = '#ffffff'; outlineTextBox.value = '';
    const val = (colorPicker.element.parentElement as HTMLElement).querySelector('.e-selected');
    if (val) {
        val.classList.remove('e-selected');
    }
    hideSpinner(imageEditorObj.element);
    wrapperDiv.style.opacity = '1';
    }

    if (eraseBtn.element) {
        eraseBtn.element.onclick = (): void => {
        wrapperDiv.style.opacity = '0.5';
        let maskData = (imageEditorObj as any).getImageData(false);
        let maskUrl = imageDataToBase64(maskData);
        (imageEditorObj as any).element.setAttribute('data-value', '');
        (imageEditorObj as any).freehandDraw(false);
        let imageData = (imageEditorObj as any).getImageData(false);
        let url = imageDataToBase64(imageData);
        showSpinner(imageEditorObj.element);
        const file = base64ToFile(url, 'image.png');
        const maskFile = base64ToFile(maskUrl, 'mask.png');
        let aiOutput = (window as any).StabilityAiModelMagicEraser(file, maskFile);
        aiOutput.then((result: any) => {
            imageEditorObj.open(result, false);
            setTimeout(() => {
            hideSpinner(imageEditorObj.element);
            wrapperDiv.style.opacity = '1';
            treeObj.selectedNodes = [];
            }, 100);
            (document.getElementsByClassName('magic-eraser')[0] as HTMLElement).style.display = 'none';
        });
        }
    }

    if (changeBGBtn.element) {
        changeBGBtn.element.onclick = (): void => {
        showSpinner(imageEditorObj.element);
        wrapperDiv.style.opacity = '0.5';
        if (outlineTextBox.value && outlineTextBox.value !== '') {
            let imageData = (imageEditorObj as any).getImageData(false);
            let url = imageDataToBase64(imageData);
            const file = base64ToFile(url, 'image.png');
            let prompt = outlineTextBox.value;
            let searchPrompt = 'Background of the image';
            let aiOutput = (window as any).StabilityAiModel(file, prompt, searchPrompt);
            aiOutput.then((result: any) => {
            imageEditorObj.open(result, false);
            setTimeout(() => {
                bgRemoveBtnClick();
            }, 100);
            (document.getElementsByClassName('bg-changer')[0] as HTMLElement).style.display = 'none';
            });
        } else {
            bgRemoveBtnClick();
        }
        }
    }

    function base64ToFile(base64String: string, fileName: string) {
    const byteString = atob(base64String.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([intArray], { type: 'image/png' });
    const file = new File([blob], fileName, { type: 'image/png' });
    return file;
    }

    function removeBG(file: File) {
    let aiOutput = (window as any).StabilityAiModelBGRemover(file);
    aiOutput.then((result: any) => {
        imageEditorObj.open(result, false);
        setTimeout(() => {
        hideSpinner(imageEditorObj.element);
        wrapperDiv.style.opacity = '1';
        treeObj.selectedNodes = [];
        }, 100);
    });
    }
}