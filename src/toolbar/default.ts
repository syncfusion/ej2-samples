import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Toolbar sample to demonstrate default functionalities.
 */
import { Toolbar, ItemModel } from '@syncfusion/ej2-navigations';
import { extend } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
    loadCultureFiles();
    //Initialize Toolbar component
    let toolbarObj: Toolbar = new Toolbar({
        items: [
            {
                prefixIcon: 'e-icons e-cut', tooltipText: 'Cut' },
            {
                prefixIcon: 'e-icons e-copy', tooltipText: 'Copy' },
            {
                prefixIcon: 'e-icons e-paste', tooltipText: 'Paste' },
            {
                type: 'Separator' },
            {
                prefixIcon: 'e-icons e-bold', tooltipText: 'Bold' },
            {
                prefixIcon: 'e-icons e-underline', tooltipText: 'Underline' },
            {
                prefixIcon: 'e-icons e-italic', tooltipText: 'Italic' },
            {
                type: 'Separator' },
            {
                prefixIcon: 'e-icons e-align-left', tooltipText: 'Align-Left' },
            {
                prefixIcon: 'e-icons e-align-right', tooltipText: 'Align-Right' },
            {
                prefixIcon: 'e-icons e-align-center', tooltipText: 'Align-Center' },
            {
                prefixIcon: 'e-icons e-justify', tooltipText: 'Align-Justify'},
            {
                type: 'Separator' },
            {
                prefixIcon: 'e-icons e-list-unordered', tooltipText: 'Bullets'},
            {
                prefixIcon: 'e-icons e-list-ordered', tooltipText: 'Numbering' },
            {
                type: 'Separator' },
            {
                prefixIcon: 'e-icons e-undo', tooltipText: 'Undo' },
            {
                prefixIcon: 'e-icons e-redo', tooltipText: 'Redo' }
            ]
    });
    //Render initialized Toolbar component
    toolbarObj.appendTo('#toolbar_default');

    let items: ItemModel[] = [
        {
            prefixIcon: 'e-icons e-cut', tooltipText: 'Cut', text: 'Cut'
        },
        {
            prefixIcon: 'e-icons e-copy', tooltipText: 'Copy', text: 'Copy'
        },
        {
            prefixIcon: 'e-icons e-paste', tooltipText: 'Paste', text: 'Paste'
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'e-icons e-bold', tooltipText: 'Bold', text: 'Bold'
        },
        {
            prefixIcon: 'e-icons e-underline', tooltipText: 'Underline', text: 'Underline'
        },
        {
            prefixIcon: 'e-icons e-italic', tooltipText: 'Italic', text: 'Italic'
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'e-icons e-list-unordered', text: 'Bullets', tooltipText: 'Bullets'
        },
        {
            prefixIcon: 'e-icons e-list-ordered', text: 'Numbering', tooltipText: 'Numbering'
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'e-icons e-undo', tooltipText: 'Undo', text: 'Undo'
        },
        {
            prefixIcon: 'e-icons e-redo', tooltipText: 'Redo', text: 'Redo'
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'e-icons e-align-left', tooltipText: 'Align-Left', text: 'Left'
        },
        {
            prefixIcon: 'e-icons e-align-right', tooltipText: 'Align-Right', text: 'Right'
        },
        {
            prefixIcon: 'e-icons e-align-center', tooltipText: 'Align-Center', text: 'Center'
        },
        {
            prefixIcon: 'e-icons e-justify', tooltipText: 'Align-Justify', text: 'Justify'
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'e-icons e-increase-indent', tooltipText: 'Text-Indent', text: 'Indent'
        },
        {
            prefixIcon: 'e-icons e-decrease-indent', text: 'Outdent', tooltipText: 'Text-Outdent'
        },
        {
            prefixIcon: 'e-icons e-erase', text: 'Clear', tooltipText: 'Clear'
        },
    ]
    
    let toolbarObj1: Toolbar = new Toolbar({
        overflowMode: 'Scrollable',
        items: extend([], items, null, true) as ItemModel[]
    });
    toolbarObj1.appendTo('#toolbar_Scrollable');
    
    let toolbarObj2: Toolbar = new Toolbar({
        overflowMode: 'Popup',
        items: extend([], items, null, true) as ItemModel[]
    });
    toolbarObj2.appendTo('#toolbar_popup');
    
    let toolbarObj3: Toolbar = new Toolbar({
        overflowMode: 'Extended',
        items: extend([], items, null, true) as ItemModel[]
    });
    toolbarObj3.appendTo('#toolbar_Extended');
    
    let toolbarObj4: Toolbar = new Toolbar({
        overflowMode: 'MultiRow',
        items: extend([], items, null, true) as ItemModel[]
    });
    toolbarObj4.appendTo('#toolbar_MultiRow');
};