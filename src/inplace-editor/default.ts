import { loadCultureFiles } from '../common/culture-loader';
/**
 * InPlaceEditor Default Sample
 */

import { InPlaceEditor, EditableType, RenderMode } from '@syncfusion/ej2-inplace-editor';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DropDownList, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-dropdowns';

(window as any).default = (): void => {
    loadCultureFiles();
    let editObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'Text',
        value: 'Andrew',
        submitOnEnter: true,
        model: { placeholder: 'Enter employee name' },
        popupSettings: { title: 'Enter Employee Name' }
    });
    editObj.appendTo('#inplace_editor');
    let numericObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'Numeric',
        value: '$100.00',
        model: {
            format: 'c2',
            value: 100,
            placeholder: 'Currency format' }
    });
    numericObj.appendTo('#numericTextBoxEle');
    let maskedObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'Mask',
        value: '012-345-6789',
        model: {
            mask: '000-000-0000'
        }
    });
    maskedObj.appendTo('#maskedTextBoxEle');
    // initialize DropDownList component
    let editorMode: DropDownList = new DropDownList({
        width: '90%',
        change: changeEditorMode
    });
    // render initialized DropDownList component
    editorMode.appendTo('#editorMode_default');
    // initialize DropDownList component
    let editableOn: DropDownList = new DropDownList({
        width: '90%',
        change: onEditableOn
    });
    // render initialized DropDownList component
    editableOn.appendTo('#editableon_default');
    function changeEditorMode(e: DropDownChangeArgs): void {
        let mode: RenderMode = e.itemData.value as RenderMode;
        editObj.mode = mode;
        editObj.dataBind();
        numericObj.mode = mode;
        numericObj.dataBind();
        maskedObj.mode = mode;
        maskedObj.dataBind();
    }
    let checkBoxObj: CheckBox = new CheckBox({ checked: true, change: onChange, labelPosition: 'Before' });
    checkBoxObj.appendTo('#showbuttons');
    function onChange(args: ChangeEventArgs): void {
        editObj.showButtons = args.checked;
        numericObj.showButtons = args.checked;
        maskedObj.showButtons = args.checked;
    }
    let enableCheckObj: CheckBox = new CheckBox({ checked: false, change: onChangeEnable, labelPosition: 'Before' });
    enableCheckObj.appendTo('#editorEnable');
    function onChangeEnable(args: ChangeEventArgs): void {
        editObj.disabled = args.checked;
        numericObj.disabled = args.checked;
        maskedObj.disabled = args.checked;
    }
    function onEditableOn(e: DropDownChangeArgs): void {
        let editableOn: EditableType = e.itemData.value as EditableType;
        editObj.editableOn = editableOn;
        editObj.dataBind();
        numericObj.editableOn = editableOn;
        numericObj.dataBind();
        maskedObj.editableOn = editableOn;
        maskedObj.dataBind();
    }

    if (document.getElementById('right-pane')) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll);
    }

    function onScroll(): void {
        if (editorMode.value === 'Inline') { return; }
        if (editObj && (editObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            editObj.enableEditMode = false;
        }
        if (numericObj && (numericObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            numericObj.enableEditMode = false;
        }
        if (maskedObj && (maskedObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            maskedObj.enableEditMode = false;
        }
    }
};
