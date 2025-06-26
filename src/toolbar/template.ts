import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Toolbar sample to demonstrate template functionalities.
 */
import { Toolbar, KeyDownEventArgs } from '@syncfusion/ej2-navigations';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import { TextBox } from '@syncfusion/ej2-inputs';

(window as any).default = (): void => {
    loadCultureFiles();
    //Initialize Toolbar component
    let zoomList: string[] = ['25%', '50%', '75%', '100%'];
    let toolbarObj: Toolbar = new Toolbar({
        overflowMode: 'Popup',
        cssClass: 'template',
        items: [
            {
                showTextOn: 'Overflow', prefixIcon: 'e-icons e-folder', tooltipText: 'Open file', text: 'Open', align: 'Left'
            },
            {
                type: 'Separator', align: 'Left'
            },
            {
                showTextOn: 'Overflow', prefixIcon: 'e-icons e-first-page', tooltipText: 'Show first page', text: 'First', align: 'Left', disabled: true
            },
            {
                showTextOn: 'Overflow', prefixIcon: 'e-icons e-chevron-left', tooltipText: 'Show Previous page', text: 'Previous', align: 'Left', disabled: true
            },
            {
                prefixIcon: 'e-icons e-chevron-right', tooltipText: 'Show next page', text: 'Next', showTextOn: 'Overflow', align: 'Left'
            },
            {
                prefixIcon: 'e-icons e-last-page', tooltipText: 'Show last page', text: 'Last', showTextOn: 'Overflow', align: 'Left'
            },
            {
                type: 'Input', align: 'Left', cssClass: 'page-count', template: new NumericTextBox({ format: '###.##', width: 50, value: 0, min: 0, max: 100, showSpinButton: false })
            },
            {
                type: 'Separator', align: 'Left'
            },
            {
                showTextOn: 'Overflow', prefixIcon: 'e-icons e-zoom-out', tooltipText: 'Zoom Out', text: 'Zoom Out', align: 'Left', tabIndex: 0
            },
            {
                showTextOn: 'Overflow', prefixIcon: 'e-icons e-zoom-in', tooltipText: 'Zoom In', text: 'Zoom In', align: 'Left'
            },
            {
                type: 'Input', tooltipText: 'Zoom', cssClass: 'percentage', align: 'Left', template: new ComboBox({ width: 85, value: '100%', dataSource: zoomList, popupWidth: 85, showClearButton: false, readonly: false })
            },
            {
                type: 'Separator', align: 'Left'
            },
            {
                showTextOn: 'Overflow', cssClass: 'selection-tool', align: 'Left', prefixIcon: 'e-icons e-mouse-pointer', text: 'Selection', tooltipText: 'Text selection tool', tabIndex: 0
            },
            {
                cssClass: 'pan-mode', showTextOn: 'Overflow', prefixIcon: 'e-icons e-pan', tooltipText: 'Pan Mode', text: 'Pan', align: 'Left'
            },
            {
                type: 'Separator', align: 'Left'
            },
            {
                showTextOn: 'Overflow', prefixIcon: 'e-icons e-undo', tooltipText: 'Undo', text: 'Undo', align: 'Left', disabled: true
            },
            {
                showTextOn: 'Overflow', prefixIcon: 'e-icons e-redo', tooltipText: 'Redo', text: 'Redo', align: 'Left', disabled: true
            },
            {
                type: 'Separator'
            },
            {
                prefixIcon: 'e-pv-comment-icon', showTextOn: 'Overflow', tooltipText: 'Add Comments', text: 'Add Comments', align: 'Left', tabIndex: 0
            },
            {
                type: 'Separator'
            },
            {
                text: 'Submit Form', align: 'Left', tabIndex: 0
            },
            {
                type: 'Input', tooltipText: 'Find Text', align: 'Right', overflow: 'Show', cssClass: 'find', template: new TextBox({ width: 125, placeholder: 'Find Text', created: OnCreateSearch })
            },
            {
                showTextOn: 'Overflow', prefixIcon: 'e-icons e-annotation-edit', tooltipText: 'Edit Annotations', text: 'Edit', align: 'Right'
            },
            {
                showTextOn: 'Overflow', prefixIcon: 'e-icons e-print', tooltipText: 'Print file', text: 'Print', align: 'Right'
            },
            {
                showTextOn: 'Overflow', prefixIcon: 'e-icons e-download', tooltipText: 'Download file', text: 'Download', align: 'Right'
            },
        ],
        keyDown: (args: KeyDownEventArgs) => {
            if (args.originalEvent.action === 'moveRight') {
                focusInputElement(args.nextItem, args);
            } else if (args.originalEvent.action === 'moveLeft') {
                focusInputElement(args.nextItem, args);
            }        
        },
        allowKeyboard: true
    });
    toolbarObj.appendTo('#toolbar_template');

    function OnCreateSearch(): any {
        this.addIcon('prepend', 'e-icons e-search');
    }

    function focusInputElement(item: HTMLElement | null, args: KeyDownEventArgs) {
        if (item && item.classList.contains('e-template')) {
            const inputElement = item.querySelector('input');
            if (inputElement) {
                inputElement.focus();
                args.cancel = true;
            }
        }
    }
};
