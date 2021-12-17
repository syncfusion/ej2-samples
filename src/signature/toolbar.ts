import { loadCultureFiles } from '../common/culture-loader';
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { SplitButton, ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { Button } from '@syncfusion/ej2-buttons';
import { Signature, ColorPicker, ColorPickerEventArgs, PaletteTileEventArgs, SignatureFileType } from '@syncfusion/ej2-inputs';
import { addClass, createElement, getComponent } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Signature Toolbar sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let signature: Signature = new Signature({
        maxStrokeWidth: 2,
        change: function() {
            if (!this.isEmpty()) {
                var saveBtn: SplitButton = getComponent(document.getElementById("save-option"), 'split-btn');
                clearButton();
                saveBtn.disabled = false;
            }
            updateUndoRedo();
        }
    });
    signature.appendTo('#signature');
    let items: ItemModel[] = [
    {
        text: 'Png'
    },
    {
        text: 'Jpeg'
    },
    {
        text: 'Svg'
    }];
    let toolbarObj: Toolbar = new Toolbar({
        width: '100%',
        items: [
            { text: 'Undo', prefixIcon: 'e-icons e-undo', tooltipText: 'Undo (Ctrl + Z)' },
            { text: 'Redo', prefixIcon: 'e-icons e-redo', tooltipText: 'Redo (Ctrl + Y)' },
            { type: 'Separator' },
            { tooltipText: 'Save (Ctrl + S)', type: 'Button', template: '<button id="save-option"></button>' },
            { type: 'Separator' },
            { tooltipText: 'Stroke Color', type: 'Input', template: '<input id="stroke-color" type="color"/>' },
            { type: 'Separator' },
            { tooltipText: 'Background Color', type: 'Input', template: '<input id="bg-color" type="color"/>' },
            { type: 'Separator' },
            { tooltipText: 'Stroke Width', type: 'Input', template: '<input id="stroke-width" type="text"/>' },
            { type: 'Separator' },
            { text: 'Clear', prefixIcon: 'e-sign-icons e-clear', tooltipText: 'Clear' },
            { tooltipText: 'Disabled', type: 'Input', template: new CheckBox({ label: 'Disabled', checked: false, change: disabledChange}), align: 'Right' }
        ],
        created: () => {
            let ddl: DropDownList = new DropDownList({
                dataSource:  [1, 2, 3, 4, 5],
                width: '60',
                value: 2,
                change: function(args) {
                    signature.maxStrokeWidth = args.value;
                } 
            });
            ddl.appendTo('#stroke-width');
            new SplitButton({ iconCss: 'e-sign-icons e-save', content: 'Save', items: items, select: onSelect, disabled: true  }, '#save-option');
            let strokeColor: ColorPicker = new ColorPicker({
                modeSwitcher: false,
                columns: 4,
                presetColors: {
                    'custom': ['#000000', '#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                    '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
                },
                beforeTileRender: (args: PaletteTileEventArgs) => {
                    args.element.classList.add('e-circle-palette');
                    args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
                },
                showButtons: false, mode: 'Palette', cssClass: 'e-stroke-color', change: strokeColorChanged});
            strokeColor.appendTo('#stroke-color');
            let bgColor: ColorPicker = new ColorPicker({
                modeSwitcher: false,
                columns: 4,
                presetColors: {
                    'custom': ['#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                        '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
                },
                beforeTileRender: (args: PaletteTileEventArgs) => {
                    args.element.classList.add('e-circle-palette');
                    args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
                },
                showButtons: false, mode: 'Palette', cssClass: 'e-bg-color', noColor: true, change: bgColorChanged});
            bgColor.appendTo('#bg-color');
            addClass([strokeColor.element.nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
            addClass([bgColor.element.nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
            clearButton();
            let toolbarlItems: NodeListOf<Element> = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
            for (var i = 0; i < toolbarlItems.length; i++) {
                if (toolbarlItems[i].children[0].classList.contains('e-undo')) {
                    let undoButton: Button = getComponent(toolbarlItems[i] as HTMLElement, 'btn');
                    undoButton.disabled = true;
                }
                if (toolbarlItems[i].children[0].classList.contains('e-redo')) {
                    let redoButton: Button = getComponent(toolbarlItems[i] as HTMLElement, 'btn');
                    redoButton.disabled = true;
                }
            }
        },
        clicked: (args: ClickEventArgs) => {
            let saveBtn: SplitButton = getComponent(document.getElementById("save-option"), 'split-btn');
            if (signature.disabled && args.item.tooltipText != 'Disabled') {
                return;
            }
            switch (args.item.tooltipText) {
                case 'Undo (Ctrl + Z)':
                    if (signature.canUndo()) {
                        signature.undo();
                        updateUndoRedo();
                        updateSaveBtn();
                    }
                    break;
                case 'Redo (Ctrl + Y)':
                    if (signature.canRedo()) {
                        signature.redo();
                        updateUndoRedo();
                        updateSaveBtn();
                    }
                    break;
                case 'Clear':
                    signature.clear();
                    if (signature.isEmpty()) {
                        clearButton();
                        saveBtn.disabled = true;
                    }
                    break;
            }
        }
    });
    toolbarObj.appendTo('#toolbar');

    function disabledChange(args: ChangeEventArgs): void {
        signature.disabled = args.checked;
    }

    function updateSaveBtn() {
        let saveBtn: SplitButton = getComponent(document.getElementById("save-option"), 'split-btn');
        if (signature.isEmpty()) {
            saveBtn.disabled = true;
        }
    }

    function onSelect(args: MenuEventArgs): void {
        signature.save(args.item.text as SignatureFileType, 'Signature');
    }

    document.getElementById('save-option').onclick = function () {
        signature.save();
    };

    function strokeColorChanged(args: ColorPickerEventArgs): void {
        if (signature.disabled) {
            return;
        }
        let selElem: HTMLElement = this.element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;
        selElem.style.borderBottomColor = args.currentValue.rgba;
        signature.strokeColor = args.currentValue.rgba;
    }

    function bgColorChanged(args: ColorPickerEventArgs): void {
        if (signature.disabled) {
            return;
        }
        let selElem: HTMLElement = this.element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;
        signature.backgroundColor = args.currentValue.rgba;
        selElem.style.borderBottomColor = args.currentValue.rgba;
    }

    function clearButton() {
        let tlItems: NodeListOf<Element> = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < tlItems.length; i++) {
            if (tlItems[i].children[0].classList.contains('e-clear')) {
                let clrBtn: Button = getComponent(tlItems[i] as HTMLElement, 'btn');
                if (signature.isEmpty()) {
                    clrBtn.disabled = true;
                } else {
                    clrBtn.disabled = false;
                }
            }
        }
    }

    function updateUndoRedo() {
        let undoButton: Button; let redoButton: Button
        let tlItems: NodeListOf<Element> = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < tlItems.length; i++) {
            if (tlItems[i].children[0].classList.contains('e-undo')) {
                undoButton = getComponent(tlItems[i] as HTMLElement, 'btn'); 
            }
            if (tlItems[i].children[0].classList.contains('e-redo')) {
                redoButton = getComponent(tlItems[i] as HTMLElement, 'btn');
            }
        }
        if (signature.canUndo()) {
            undoButton.disabled = false;
        } else {
            undoButton.disabled = true;
        }
        if (signature.canRedo()) {
            redoButton.disabled = false;
        } else {
            redoButton.disabled = true;
        }
    }
};
