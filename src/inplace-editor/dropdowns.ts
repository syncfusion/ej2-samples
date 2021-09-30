import { loadCultureFiles } from '../common/culture-loader';
/**
 * Sample of DropDownList, AutoComplete,ComboBox and “MultiSelect” which is intregrated with InPlaceEditor
 */

import { InPlaceEditor, AutoComplete, MultiSelect, ComboBox, RenderMode } from '@syncfusion/ej2-inplace-editor';
import { DropDownList, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-dropdowns';

InPlaceEditor.Inject(AutoComplete, MultiSelect, ComboBox);

(window as any).default = (): void => {
    loadCultureFiles();
    let autocompleteData: string[] = ['Australia', 'Bermuda', 'Canada', 'Cameroon', 'Denmark', 'Finland', 'Greenland', 'Poland'];
    let editObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'AutoComplete',
        value: 'Australia',
        model: {
            dataSource: autocompleteData,
            placeholder: ' Type to search country'
        },
    });
    editObj.appendTo('#autoCompleteEle');
    let multiObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'MultiSelect',
        popupSettings: {
            model: { width: 'auto' }
        },
        value: ['Canada', 'Bermuda'],
        model: {
            dataSource: autocompleteData,
            placeholder: 'Choose the countries',
            mode: 'Box'
        }
    });
    multiObj.appendTo('#multiSelectEle');
    let comboObbj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'ComboBox',
        value: 'Finland',
        model: {
            dataSource: autocompleteData,
            placeholder: 'Find a country'
        }
    });
    comboObbj.appendTo('#comboBoxEle');
    let dropObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'DropDownList',
        value: 'Canada',
        model: {
            dataSource: autocompleteData,
            placeholder: 'Find a country'
        }
    });
    dropObj.appendTo('#dropdownEle');
    // initialize DropDownList component
    let editorMode: DropDownList = new DropDownList({
        width: '90%',
        change: changeEditorMode
    });
    // render initialized DropDownList component
    editorMode.appendTo('#editorMode_dropdown');
    function changeEditorMode(e: DropDownChangeArgs): void {
        let mode: RenderMode = e.itemData.value as RenderMode;
        editObj.mode = mode;
        editObj.dataBind();
        multiObj.mode = mode;
        multiObj.dataBind();
        comboObbj.mode = mode;
        comboObbj.dataBind();
        dropObj.mode = mode;
        dropObj.dataBind();
    }
    if (document.getElementById('right-pane')) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll);
    }
    function onScroll(args: any): void {
        if (editorMode.value === 'Inline') { return; }
        if (editObj && (editObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            editObj.enableEditMode = false;
        }
        if (multiObj && (multiObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            multiObj.enableEditMode = false;
        }
        if (comboObbj && (comboObbj.element.querySelectorAll('.e-editable-open').length > 0)) {
            comboObbj.enableEditMode = false;
        }
        if (dropObj && (dropObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            dropObj.enableEditMode = false;
        }
    }
};
