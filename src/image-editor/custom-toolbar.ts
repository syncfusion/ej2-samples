import { loadCultureFiles } from '../common/culture-loader';
import { Fab } from '@syncfusion/ej2-buttons';
import { ImageEditor, ImageFilterOption, ShapeChangeEventArgs, ShapeSettings, ShapeType } from '@syncfusion/ej2-image-editor'
import { Browser, EventHandler, getComponent, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ColorPicker, ColorPickerEventArgs, ColorPickerMode, Dimension } from '@syncfusion/ej2-inputs';
import { ItemModel, MenuEventArgs, OpenCloseMenuEventArgs, Toolbar, ClickEventArgs as ToolbarClickEventArgs } from '@syncfusion/ej2-navigations';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { ItemModel as DropDownButtonItemModel } from '@syncfusion/ej2-splitbuttons';
import { extend } from '@syncfusion/ej2/base';


/**
 * Default image editor sample
 */
// tslint:disable-next-line
(window as any).default = (): void => {
    loadCultureFiles();
    const image: HTMLImageElement = document.getElementById('previewImgContainer') as HTMLImageElement;
    if (Browser.isDevice && image) {
        image.src = 'src/image-editor/images/flower.png';
    }
    let currentToolbar: string = 'main';
    let activeObjIndex: string;
    let tempShapeSettings: ShapeSettings;
    let isShapeCustomizing: boolean = false;
    let isTextEditing: boolean = false;
    let isShapeSelected: boolean = false;
    let filter: ImageFilterOption = ImageFilterOption.Default;
    let imageData: ImageData;
    const presetColors: { [key: string]: string[]; } = {
        'custom': ['#ffffff', '#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
        '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
    };

    EventHandler.add(document, 'keydown', keyDownEventHandler, this);
    EventHandler.add(document.getElementById('image-editor-container'), 'dblclick', doubleClickEvent, this);

    let button: Fab = new Fab({
        iconCss: 'e-icons e-edit',
        position: 'BottomRight',
        target: '.image-preview-container',
        isPrimary: true,
        content: 'Edit Image'
    });
    button.appendTo('#edit');
    button.element.setAttribute('title', 'Edit');

    let imageEditorObj: ImageEditor;
    imageEditorObj = new ImageEditor({
        theme: 'Material',
        toolbar: [],
        showQuickAccessToolbar: false,
        shapeChanging: (args: ShapeChangeEventArgs) => {
            if (args.action === 'select') {
                isShapeSelected = isShapeSelected ? false : true;
                updateToolbar(args, true);
            } else if (args.action === 'insert') {
                activeObjIndex = args.currentShapeSettings.id;
                tempShapeSettings = args.currentShapeSettings;
            }
        },
        shapeChange: (args: ShapeChangeEventArgs) => {
            if (args.action === 'apply' && !isShapeCustomizing) {
                isTextEditing = false;
                setTimeout(function() {
                    refreshToolbar('main');
                }, 1);
            }
        },
        click: () => {
            if (currentToolbar === 'filter') {
                refreshToolbar('main');
            }
        },
        fileOpened: () => {
            imageData = imageEditorObj.getImageData();
        },
        zoomSettings: {minZoomFactor: 0.1, maxZoomFactor: 50}
    });
    imageEditorObj.appendTo('#imageEditor');

    let toolbarObj: Toolbar = new Toolbar({
        items: [
            {
                id: 'cancel', prefixIcon: 'e-icons e-close', tooltipText: 'Cancel', align: 'Center' },
            {
                id: 'undo', prefixIcon: 'e-icons e-undo', tooltipText: 'Undo', align: 'Center', disabled: true },
            {
                id: 'redo', prefixIcon: 'e-icons e-redo', tooltipText: 'Redo', align: 'Center', disabled: true },
            {
                id: 'ok', prefixIcon: 'e-icons e-save', tooltipText: 'Save', align: 'Center' },
        ],
        clicked: toolbarClicked.bind(this),
        created: () => {
            const toolbarArea: HTMLElement = document.getElementById('top-toolbar');
            toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        }
    });
    toolbarObj.appendTo('#top-toolbar');

    toolbarObj = new Toolbar({
        items: [
            {
                id: 'cropAndTransform', prefixIcon: 'e-icons e-crop', tooltipText: 'Crop and Transform', align: 'Center' },
            {
                id: 'back', prefixIcon: 'e-icons e-arrow-left', tooltipText: 'Back', align: 'Center', visible: false },
            {
                id: 'rotateLeft', prefixIcon: 'e-icons e-transform-left', tooltipText: 'Rotate Left', align: 'Center', visible: false },
            {
                id: 'rotateRight', prefixIcon: 'e-icons e-transform-right', tooltipText: 'Rotate Right', align: 'Center', visible: false },
            {
                id: 'addText', prefixIcon: 'e-icons e-text-annotation', tooltipText: 'Text', align: 'Center' },
            {
                id: 'fontColor', cssClass: 'top-icon e-text-fontColor', tooltipText: 'Font Color', align: 'Center', visible: false,
                type: 'Input', template: '<button id="' + 'imageEditor_fontColorBtn"></button>' },
            {
                id: 'shapes', prefixIcon: 'e-icons e-shapes', tooltipText: 'Annotations', align: 'Center',
                template: '<button id="' + 'imageEditor_annotationButton"></button>' },
            {
                id: 'fillColor', prefixIcon: 'e-icons e-copy', cssClass: 'top-icon e-fill', tooltipText: 'Fill Color', align: 'Center', visible: false,
                type: 'Input', template: '<button id="' + 'imageEditor_fillColorBtn"></button>' },
            {
                id: 'strokeColor', prefixIcon: 'e-icons e-copy', cssClass: 'top-icon e-stroke', tooltipText: 'Stroke Color', align: 'Center', visible: false,
                type: 'Input', template: '<button id="' + 'imageEditor_borderColorBtn"></button>' },
            {
                id: 'penStrokeColor', prefixIcon: 'e-icons e-copy', cssClass: 'top-icon e-pen-stroke-color',
                tooltipText: 'Stroke Color', align: 'Center', visible: false,
                type: 'Input', template: '<button id="' + 'imageEditor_penColorBtn"></button>' },
            {
                id: 'remove', prefixIcon: 'e-icons e-trash', tooltipText: 'Remove', align: 'Center', visible: false, disabled: false },
            {
                id: 'editText', prefixIcon: 'e-icons e-annotation-edit', cssClass: 'top-icon e-annotation-edit',
                tooltipText: 'Edit Text', align: 'Center', visible: false, disabled: false },
            {
                id: 'addPen', prefixIcon: 'e-icons e-free-pen', tooltipText: 'Pen', align: 'Center' },
            {
                id: 'filters', prefixIcon: 'e-icons e-filters', tooltipText: 'Filters', align: 'Center' }
        ],
        created: () => {
            renderAnnotationBtn(); createFontColor();
            createShapeColor(); createPenColor();
            const toolbarArea: HTMLElement = document.getElementById('bottom-toolbar');
            toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        },
        clicked: toolbarClicked.bind(this)
    });
    toolbarObj.appendTo('#bottom-toolbar');

    document.getElementById('edit').onclick = function() {
        document.getElementById('imagePreviewContainer').style.display = 'none';
        document.getElementById('image-editor-container').style.display = 'block';
        imageEditorObj.open((document.getElementById('previewImgContainer') as HTMLImageElement).src);
        let toolbarArea: HTMLElement = document.getElementById('top-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        toolbarArea = document.getElementById('bottom-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        refreshToolbar('main');
    };


    function toolbarClicked(args: ToolbarClickEventArgs): void {
        const item: string = args.item.id.toLowerCase();
        const dimension: Dimension = imageEditorObj.getImageDimension();
        let imageData: ImageData; let canvas: HTMLCanvasElement;
        switch (item) {
        case 'back':
            apply();
            refreshToolbar('main');
            break;
        case 'cancel':
            isTextEditing = false;
            if (currentToolbar === 'main') {
                document.getElementById('image-editor-container').style.display = 'none';
                (document.getElementById('imagePreviewContainer') as HTMLElement).style.display = 'block';
                imageEditorObj.reset();
            } else {
                if ((isShapeCustomizing || isShapeSelected) && tempShapeSettings && tempShapeSettings.id) {
                    imageEditorObj.updateShape(tempShapeSettings);
                }
                imageEditorObj.clearSelection(true);
                refreshToolbar('main');
            }
            break;
        case 'undo':
            if (currentToolbar === 'pen') {
                imageEditorObj.freeHandDraw(false);
            }
            isTextEditing = false;
            imageEditorObj.undo();
            refreshToolbar('main');
            break;
        case 'redo':
            if (currentToolbar === 'pen') {
                imageEditorObj.freeHandDraw(false);
            }
            isTextEditing = false;
            imageEditorObj.redo();
            refreshToolbar('main');
            break;
        case 'ok':
            isTextEditing = false;
            if (currentToolbar === 'main') {
                imageData = imageEditorObj.getImageData();
                canvas = document.createElement('canvas');
                canvas.width = imageData.width; canvas.height = imageData.height;
                canvas.getContext('2d').putImageData(imageData, 0, 0);
                (document.getElementById('previewImgContainer') as HTMLImageElement).src = canvas.toDataURL();
                imageEditorObj.open(imageData);
                document.getElementById('image-editor-container').style.display = 'none';
                (document.getElementById('imagePreviewContainer') as HTMLElement).style.display = 'block';
            } else {
                apply();
                refreshToolbar('main');
            }
            break;
        case 'cropandtransform':
            imageEditorObj.select('custom');
            refreshToolbar('crop');
            break;
        case 'rotateleft':
            imageEditorObj.rotate(-90);
            break;
        case 'rotateright':
            imageEditorObj.rotate(90);
            break;
        case 'addtext':
            imageEditorObj.drawText(dimension.x + (dimension.width / 2) - 65, dimension.y + (dimension.height / 2) - 15, 'Add Text',
                                    'Arial', 30, false, false, '#fff', true);
            isShapeSelected = true;
            refreshToolbar('text');
            break;
        case 'remove':
            if (isNullOrUndefined(activeObjIndex) && tempShapeSettings && tempShapeSettings.id) {
                activeObjIndex = tempShapeSettings.id;
            }
            if (isTextEditing) {
                tempShapeSettings = imageEditorObj.getShapeSetting(activeObjIndex);
                activeObjIndex = tempShapeSettings.id;
            }
            imageEditorObj.deleteShape(activeObjIndex);
            refreshToolbar('main');
            break;
        case 'edittext':
            isTextEditing = true;
            imageEditorObj.enableTextEditing();
            refreshToolbar('edittext');
            break;
        case 'addpen':
            imageEditorObj.freeHandDraw(true);
            refreshToolbar('pen');
            break;
        case 'filters':
            refreshToolbar('filter');
            break;
        }
    }

    function refreshToolbar(type: string, isEvent?: boolean): void {
        const toolbar: Toolbar = getComponent('bottom-toolbar', 'toolbar') as Toolbar;
        let items: string[] = []; let filterToolbar: Toolbar; let itemModel: ItemModel[];
        const dimension: Dimension = imageEditorObj.getImageDimension();
        document.getElementById('filter-toolbar').style.display = 'none'; currentToolbar = type;
        switch (type) {
        case 'main':
            items = ['cropAndTransform', 'addText', 'shapes', 'addPen', 'filters'];
            break;
        case 'crop':
            items = ['rotateLeft', 'rotateRight'];
            break;
        case 'text':
        case 'edittext':
            items = ['back', 'fontColor', 'remove', 'editText'];
            break;
        case 'rectangle':
            items = ['back', 'fillColor', 'strokeColor', 'remove'];
            if (!isEvent) {
                imageEditorObj.drawRectangle(dimension.x + (dimension.width / 2) - 100, dimension.y + (dimension.height / 2) - 50,
                                            200, 100, 2, '#fff', null, null, true);
                isShapeSelected = true;
            }
            break;
        case 'ellipse':
            items = ['back', 'fillColor', 'strokeColor', 'remove'];
            if (!isEvent) {
                imageEditorObj.drawEllipse(dimension.x + (dimension.width / 2) - 100, dimension.y + (dimension.height / 2) - 50,
                                        100, 50, 2, '#fff', null, null, true);
                isShapeSelected = true;
            }
            break;
        case 'line':
            items = ['back', 'strokeColor', 'remove'];
            if (!isEvent) {
                imageEditorObj.drawLine(dimension.x + (dimension.width / 2) - 200, dimension.y + (dimension.height / 2) - 100,
                                        dimension.x + (dimension.width / 2) + 200, dimension.y + (dimension.height / 2) + 100, 2, '#fff', true);
                isShapeSelected = true;
            }
            break;
        case 'pen':
        case 'freehanddraw':
            items = ['back', 'penStrokeColor', 'remove'];
            break;
        case 'filter':
            document.getElementById('filter-toolbar').style.display = 'block';
            itemModel = [
                {
                    id: 'default', tooltipText: 'Default', align: 'Center',
                    template: '<div class="filter-wrapper" style="box-sizing: content-box;"><canvas id=' + 'imageEditor_defaultCanvas' + '></canvas><div style="text-align:center;"><span>' + 'Default' + '</span></div></div>' },
                {
                    id: 'chrome', tooltipText: 'Chrome', align: 'Center',
                    template: '<div class="filter-wrapper" style="box-sizing: content-box;"><canvas id=' + 'imageEditor_chromeCanvas' + '></canvas><div style="text-align:center;"><span>' + 'Chrome' + '</span></div></div>' },
                {
                    id: 'cold', tooltipText: 'Cold', align: 'Center',
                    template: '<div class="filter-wrapper" style="box-sizing: content-box;"><canvas id=' + 'imageEditor_coldCanvas' + '></canvas><div style="text-align:center;"><span>' + 'Cold' + '</span></div></div>' },
                {
                    id: 'warm', tooltipText: 'Warm', align: 'Center',
                    template: '<div class="filter-wrapper" style="box-sizing: content-box;"><canvas id=' + 'imageEditor_warmCanvas' + '></canvas><div style="text-align:center;"><span>' + 'Warm' + '</span></div></div>' },
                {
                    id: 'grayscale', tooltipText: 'Grayscale', align: 'Center',
                    template: '<div class="filter-wrapper" style="box-sizing: content-box;"><canvas id=' + 'imageEditor_grayscaleCanvas' + '></canvas><div style="text-align:center;"><span>' + 'Grayscale' + '</span></div></div>' },
                {
                    id: 'sepia', tooltipText: 'Sepia', align: 'Center',
                    template: '<div class="filter-wrapper" style="box-sizing: content-box;"><canvas id=' + 'imageEditor_sepiaCanvas' + '></canvas><div style="text-align:center;"><span>' + 'Sepia' + '</span></div></div>' },
                {
                    id: 'invert', tooltipText: 'Invert', align: 'Center',
                    template: '<div class="filter-wrapper" style="box-sizing: content-box;"><canvas id=' + 'imageEditor_invertCanvas' + '></canvas><div style="text-align:center;"><span>' + 'Invert' + '</span></div></div>' }
            ];
            if (document.querySelector('#' + 'filter-toolbar').classList.contains('e-control')) {
                createCanvasFilter();
            } else {
                filterToolbar = new Toolbar({
                    width: '100%',
                    items: itemModel,
                    clicked: (args: ToolbarClickEventArgs) => {
                        filterImage(args.item.id as ImageFilterOption);
                    },
                    created: () => {
                        createCanvasFilter();
                        filterToolbar.refreshOverflow();
                    }
                });
                filterToolbar.appendTo('#filter-toolbar');
            }
            items = ['default', 'chrome', 'cold', 'warm', 'grayscale', 'sepia', 'invert'];
            break;
        }
        for (let i: number = 0; i < toolbar.items.length; i++) {
            if (items.indexOf(toolbar.items[i as number].id) !== -1) {
                toolbar.items[i as number].visible = true;
                if (toolbar.items[i as number].id.toLowerCase() === 'edittext') {
                    if (type === 'edittext') {
                        toolbar.items[i as number].disabled = true;
                        setTimeout(function() {
                            (document.querySelector('.e-textarea') as HTMLInputElement).focus();
                        }, 1);
                    } else {
                        toolbar.items[i].disabled = false;
                    }
                }
            } else {
                toolbar.items[i as number].visible = false;
            }
            if (toolbar.items[i as number].id === 'remove') {
                if (type === 'pen') {
                    toolbar.items[i as number].disabled = true;
                } else {
                    toolbar.items[i as number].disabled = false;
                }
            }
        }
        const enableUndo: boolean = imageEditorObj.canUndo();
        const enableRedo: boolean = imageEditorObj.canRedo();
        const topToolbar: Toolbar = getComponent('top-toolbar', 'toolbar') as Toolbar;
        for (let i: number = 0; i < topToolbar.items.length; i++) {
            if (topToolbar.items[i as number].id === 'undo') {
                topToolbar.items[i as number].disabled = !enableUndo;
            } else if (topToolbar.items[i as number].id === 'redo') {
                topToolbar.items[i as number].disabled = !enableRedo;
            } else if (topToolbar.items[i as number].id === 'ok') {
                if (currentToolbar === 'main') {
                    topToolbar.items[i as number].visible = true;
                    topToolbar.items[i as number].tooltipText = 'Save';
                    topToolbar.items[i as number].prefixIcon = 'e-icons e-save';
                } else if (currentToolbar === 'crop' || currentToolbar === 'filter') {
                    topToolbar.items[i as number].visible = true;
                    topToolbar.items[i as number].tooltipText = 'Apply';
                    topToolbar.items[i as number].prefixIcon = 'e-icons e-check-tick';
                } else {
                    topToolbar.items[i as number].visible = false;
                }
            
            } else if (topToolbar.items[i as number].id === 'cancel') {
                if (currentToolbar === 'main' || currentToolbar === 'crop') {
                    topToolbar.items[i as number].visible = true;
                } else {
                    topToolbar.items[i as number].visible = false;
                }
            }
        }
        setTimeout(() => {
            let toolbarArea: HTMLElement = document.getElementById('bottom-toolbar');
            toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
            toolbarArea = document.getElementById('top-toolbar');
            toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        }, 1);
    }

    function updateToolbar(args: ShapeChangeEventArgs, isEvent?: boolean): void {
        const type: string = args.currentShapeSettings.type.toLowerCase();
        refreshToolbar(type, isEvent);
        if (isEvent) {
            tempShapeSettings = args.currentShapeSettings;
            activeObjIndex = tempShapeSettings.id;
        }
        setTimeout(() => {
            const selFillElem: HTMLElement = document.querySelector('.e-fill.e-template .e-dropdownbtn-preview') as HTMLElement;
            const selStrokeElem: HTMLElement = document.querySelector('.e-stroke.e-template .e-dropdownbtn-preview') as HTMLElement;
            const selTextStrokeElem: HTMLElement = document.querySelector('#imageEditor_fontColorBtn .e-dropdownbtn-preview') as HTMLElement;
            const selPenStrokeElem: HTMLElement = document.querySelector('.e-pen-stroke-color.e-template .e-dropdownbtn-preview') as HTMLElement;
            if (selFillElem && (type === 'rectangle' || type === 'ellipse')) {
                if (args.currentShapeSettings.fillColor === '') {
                    selFillElem.classList.add('e-nocolor-item');
                } else {
                    selFillElem.classList.remove('e-nocolor-item');
                    selFillElem.style.background = args.currentShapeSettings.fillColor;
                }
                if (document.querySelector('#' + 'imageEditor_shapeFill')) {
                    (getComponent('imageEditor_shapeFill', 'colorpicker') as ColorPicker).value = args.currentShapeSettings.fillColor;
                }
            }
            if (selStrokeElem && (type === 'rectangle' || type === 'ellipse' || type === 'line')) {
                selStrokeElem.style.background = args.currentShapeSettings.strokeColor;
                if (document.querySelector('#' + 'imageEditor_shapeStroke')) {
                    (getComponent('imageEditor_shapeStroke', 'colorpicker') as ColorPicker).value = args.currentShapeSettings.strokeColor;
                }
            }
            if (selTextStrokeElem && type === 'text') {
                selTextStrokeElem.style.background = args.currentShapeSettings.color;
                if (document.querySelector('#' + 'imageEditor_textFont')) {
                    (getComponent('imageEditor_textFont', 'colorpicker') as ColorPicker).value = args.currentShapeSettings.color;
                }
            }
            if (selPenStrokeElem && type === 'freehanddraw') {
                selPenStrokeElem.style.background = args.currentShapeSettings.strokeColor;
                if (document.querySelector('#' + 'imageEditor_penStroke')) {
                    (getComponent('imageEditor_penStroke', 'colorpicker') as ColorPicker).value = args.currentShapeSettings.strokeColor;
                }
            }
        }, 10);
    }

    function toPascalCase(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    function filterImage(type: ImageFilterOption): void {
        imageEditorObj.applyImageFilter(type);
        filter = type;
    }

    function renderDropDownButton(id: string, items: DropDownButtonItemModel[], iconCss: string, cssClass: string,
                                popup: boolean): void {
        iconCss = iconCss === '' ? '' : 'e-icons ' + iconCss;
        const drpDownBtn: DropDownButton = new DropDownButton({ items: items, iconCss: iconCss, cssClass: cssClass,
            createPopupOnClick: popup,
            open: (args: OpenCloseMenuEventArgs) => {
                if (Browser.isDevice) {
                    args.element.parentElement.style.top = drpDownBtn.element.getBoundingClientRect().top - args.element.parentElement.offsetHeight + 'px';
                }
            },
            select: (args: MenuEventArgs) => {
                refreshToolbar(args.item.id);
            }
        });
        drpDownBtn.appendTo('#' + id);
    }

    function renderColorPicker(type: string, id: string, value: string, cssClass: string,
                            noColor: boolean, mode: ColorPickerMode, inline: boolean, showButtons: boolean,
                            target: string, iconCss: string, ddbCssClass: string, ddbId: string, dropdownPreview: string, colors: {[key: string]: string[];}): void {
        const colorpicker: ColorPicker = new ColorPicker({
            modeSwitcher: false, noColor: noColor, value: value, inline: inline,
            showButtons: showButtons, mode: mode, cssClass: cssClass,
            presetColors: colors,
            columns: 4,
            change: (args: ColorPickerEventArgs): void => {
                isShapeCustomizing = true;
                if (type === 'pen-color') {
                    if (tempShapeSettings && tempShapeSettings.id && tempShapeSettings.id.split('_')[0] === 'pen') {
                        const shapeSetting: ShapeSettings = {id: tempShapeSettings.id, type: ShapeType.FreehandDraw,
                            startX: tempShapeSettings.startX, startY: tempShapeSettings.startY,
                            strokeColor: args.currentValue.hex, strokeWidth: tempShapeSettings.strokeWidth,
                            opacity: tempShapeSettings.opacity, points: tempShapeSettings.points };
                        imageEditorObj.updateShape(shapeSetting, true);
                        tempShapeSettings.strokeColor = args.currentValue.hex;
                        isShapeSelected = true;
                    } else {
                        const shapeSetting: ShapeSettings = {id: null, type: ShapeType.FreehandDraw, startX: null, startY: null,
                            strokeColor: args.currentValue.hex};
                        imageEditorObj.updateShape(shapeSetting);
                    }
                } else {
                    const shapeSetting: ShapeSettings = imageEditorObj.getShapeSetting(activeObjIndex);
                    if (type === 'font-color') {
                        shapeSetting.color = args.value;
                    } else if (type === 'shape-fill') {
                        shapeSetting.fillColor = args.value;
                    } else if (type === 'shape-stroke') {
                        shapeSetting.strokeColor = args.value;
                    }
                    tempShapeSettings = shapeSetting;
                    imageEditorObj.updateShape(shapeSetting, true);
                    isShapeSelected = true;
                    if (isTextEditing) {
                        imageEditorObj.enableTextEditing();
                    }
                }
                isShapeCustomizing = false;
                if (type === 'shape-fill') {
                    if (args.currentValue.rgba === '') {
                        (dropdownBtn.element.children[0] as HTMLElement).classList.add('e-nocolor-item');
                    } else {
                        (dropdownBtn.element.children[0] as HTMLElement).classList.remove('e-nocolor-item');
                        (dropdownBtn.element.children[0] as HTMLElement).style.backgroundColor = args.currentValue.rgba;
                    }
                } else {
                    (dropdownBtn.element.children[0] as HTMLElement).style.backgroundColor = args.currentValue.rgba;
                }
                dropdownBtn.toggle();
            },
            beforeClose: (): void => {
                dropdownBtn.toggle();
            }
        }, '#' + id);
        const dropdownBtn: DropDownButton = new DropDownButton({
            open: (args: OpenCloseMenuEventArgs) => {
                const parenElem: HTMLElement = args.element.parentElement;
                if (Browser.isDevice) {
                    parenElem.style.top = dropdownBtn.element.getBoundingClientRect().top -
                    parenElem.offsetHeight + 'px';
                    parenElem.style.left = args.element.parentElement.offsetLeft + 'px';
                }
            },
            target: target,
            iconCss: iconCss,
            cssClass: ddbCssClass
        }, '#' + ddbId);
        colorpicker.inline = true;
        colorpicker.value = colorpicker.getValue(colorpicker.value, 'rgba');
        if (type === 'shape-fill') {
            (document.querySelector(dropdownPreview) as HTMLElement).classList.add('e-nocolor-item');
        } else {
            (document.querySelector(dropdownPreview) as HTMLElement).style.background = colorpicker.value;
        }
    }

    function renderAnnotationBtn(): void {
        const items: DropDownButtonItemModel[] = [
            { text: 'Rectangle', id: 'rectangle', iconCss: 'e-icons e-rectangle' },
            { text: 'Ellipse', id: 'ellipse', iconCss: 'e-icons e-circle' },
            { text: 'Line', id: 'line', iconCss: 'e-icons e-line' }
        ];
        renderDropDownButton('imageEditor' + '_annotationButton', items, 'e-shapes', 'e-image-popup', false);
    }

    function createFontColor(): void {
        document.querySelector('.e-template.e-text-fontColor').appendChild(imageEditorObj.createElement('input', {
            id: 'imageEditor_textFont'
        }));
        renderColorPicker('font-color', 'imageEditor_textFont', tempShapeSettings && tempShapeSettings.color != null ? tempShapeSettings.color : '#fff', 'e-text-font-color', false, 'Palette', true, false, '.e-text-font-color',
                        'e-dropdownbtn-preview', 'e-ie-ddb-popup', 'imageEditor_fontColorBtn', '.e-text-fontColor.e-template .e-dropdownbtn-preview', presetColors);
    }

    function createShapeColor(): void {
        const parent: ImageEditor = imageEditorObj; const id: string = 'imageEditor';
        document.querySelector('.e-template.e-fill').appendChild(parent.createElement('input', {
            id: id + '_shapeFill'
        }));
        const colors: {[key: string]: string[]} = extend({}, presetColors, {}, true) as {[key: string]: string[]};
        colors['custom'][0] = '';
        document.querySelector('.e-template.e-stroke').appendChild(parent.createElement('input', {
            id: id + '_shapeStroke'
        }));
        renderColorPicker('shape-fill', 'imageEditor_shapeFill', '', 'e-shape-fill-color', true, 'Palette', true, false, '.e-shape-fill-color',
                        'e-dropdownbtn-preview', 'e-ie-ddb-popup', 'imageEditor_fillColorBtn', '.e-fill.e-template .e-dropdownbtn-preview', colors);
        renderColorPicker('shape-stroke', 'imageEditor_shapeStroke', '#fff', 'e-shape-stroke-color', false, 'Palette', true, false, '.e-shape-stroke-color',
                        'e-dropdownbtn-preview', 'e-ie-ddb-popup', 'imageEditor_borderColorBtn', '.e-stroke.e-template .e-dropdownbtn-preview', presetColors);
    }

    function createPenColor(): void {
        const parent: ImageEditor = imageEditorObj; const id: string = 'imageEditor';
        document.querySelector('.e-template.e-pen-stroke-color').appendChild(parent.createElement('input', {
            id: id + '_pen_stroke'
        }));
        renderColorPicker('pen-color', 'imageEditor_pen_stroke', '#fff', 'e-pen-color', false, 'Palette', true, false, '.e-pen-color',
                        'e-dropdownbtn-preview', 'e-ie-ddb-popup', 'imageEditor_penColorBtn', '.e-pen-stroke-color.e-template .e-dropdownbtn-preview', presetColors);
    }

    function createCanvasFilter(): void {
        const inMemoryCanvas: HTMLCanvasElement = document.createElement('canvas');
        const inMemoryContext: CanvasRenderingContext2D = inMemoryCanvas.getContext('2d');
        inMemoryCanvas.width = imageData.width; inMemoryCanvas.height = imageData.height;
        inMemoryContext.putImageData(imageData, 0, 0);
        updateFilterCanvas('_defaultCanvas', 'default', inMemoryCanvas);
        updateFilterCanvas('_chromeCanvas', 'chrome', inMemoryCanvas);
        updateFilterCanvas('_coldCanvas', 'cold', inMemoryCanvas);
        updateFilterCanvas('_warmCanvas', 'warm', inMemoryCanvas);
        updateFilterCanvas('_grayscaleCanvas', 'grayscale', inMemoryCanvas);
        updateFilterCanvas('_sepiaCanvas', 'sepia', inMemoryCanvas);
        updateFilterCanvas('_invertCanvas', 'invert', inMemoryCanvas);
    }

    function updateFilterCanvas(selector: string, type: string, inMemoryCanvas: HTMLCanvasElement): void {
        const filter: HTMLCanvasElement = document.querySelector('#imageEditor' + selector);
        if (filter) {
            let ctx: CanvasRenderingContext2D = filter.getContext('2d');
            ctx = filter.getContext('2d');
            filter.style.width = '100px'; filter.style.height = '100px';
            ctx.filter = imageEditorObj.getImageFilter(toPascalCase(type) as ImageFilterOption) as string;
            ctx.drawImage(inMemoryCanvas, 0, 0, 300, 150);
        }
    }

    function keyDownEventHandler(e: KeyboardEvent): void {
        if (e.ctrlKey && (e.key === '+' || e.key === '-')) {
            e.preventDefault();
        }
        switch (e.key) {
        case (e.ctrlKey && 's'):
            imageEditorObj.export();
            break;
        case (e.ctrlKey && 'z'):
            isTextEditing = false;
            refreshToolbar('main');
            break;
        case (e.ctrlKey && 'y'):
            isTextEditing = false;
            refreshToolbar('main');
            break;
        case 'Delete':
            if (isNullOrUndefined(activeObjIndex) && tempShapeSettings && tempShapeSettings.id) {
                activeObjIndex = tempShapeSettings.id;
            }
            if (activeObjIndex) {imageEditorObj.deleteShape(activeObjIndex); }
            refreshToolbar('main');
            break;
        case 'Escape':
            if (currentToolbar === 'crop') {
                imageEditorObj.clearSelection(true);
                refreshToolbar('main');
            }
            break;
        case 'Enter':
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (!(e.target as any).closest('.e-textarea')) {
                apply();
                refreshToolbar('main');
            }
            break;
        }
    }

    function doubleClickEvent(e: MouseEvent & TouchEvent): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (e.type === 'dblclick' && (e.target as any).closest('.e-textarea')) {
            isTextEditing = true;
        }
    }

    function apply(): void {
        if (currentToolbar === 'crop') {
            imageEditorObj.crop();
        } else if (currentToolbar === 'pen') {
            if (activeObjIndex && activeObjIndex.split('_')[0] === 'pen') {
                tempShapeSettings = imageEditorObj.getShapeSetting(activeObjIndex);
            } else {
                const shapeSettings: ShapeSettings[] = imageEditorObj.getShapeSettings();
                if (shapeSettings.length > 0) {
                    tempShapeSettings = shapeSettings[shapeSettings.length - 1].id.split('_')[0] === 'pen' ? shapeSettings[shapeSettings.length - 1] : null;
                    if (tempShapeSettings) {
                        imageEditorObj.selectShape(tempShapeSettings.id);
                    } else {
                        imageEditorObj.freeHandDraw(false);
                    }
                } else {
                    imageEditorObj.freeHandDraw(false);
                    return;
                }
            }
            if (tempShapeSettings) {
                imageEditorObj.updateShape(tempShapeSettings);
            }
        } else if (currentToolbar === 'freehanddraw' && tempShapeSettings) {
            imageEditorObj.updateShape(tempShapeSettings);
        } else if (currentToolbar !== 'filter' && activeObjIndex) {
            tempShapeSettings = imageEditorObj.getShapeSetting(activeObjIndex);
            imageEditorObj.updateShape(tempShapeSettings);
        }
        tempShapeSettings = null; activeObjIndex = null;
    }
};