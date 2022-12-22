import { loadCultureFiles } from '../common/culture-loader';
/**
 * Sample of DatePicker,TimePicker,DateTimePicker and DateRangePicker which is intregrated with InPlaceEditor
 */

import { InPlaceEditor, TimePicker, DateRangePicker, RenderMode } from '@syncfusion/ej2-inplace-editor';
import { DropDownList, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-dropdowns';

InPlaceEditor.Inject(TimePicker, DateRangePicker);
(window as any).default = (): void => {
    loadCultureFiles();
    let dateObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'Date',
        value: new Date('5/23/2017'),
        model: {
            placeholder: 'Select a date',
        }
    });
    dateObj.appendTo('#datePickerEle');

    let timeObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'Time',
        value: new Date('5/23/2017 12:00 PM'),
        model: {
            placeholder: 'Select a time',
        }
    });
    timeObj.appendTo('#timePickerEle');

    let dateTimeObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'DateTime',
        value: new Date('5/23/2017 12:00 PM'),
        model: {
            placeholder: 'Select a date and time'
        }
    });
    dateTimeObj.appendTo('#dateTimePickerEle');

    let dateRangeObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'DateRange',
        value: [new Date('5/23/2017'), new Date('7/5/2017')],
        model: {
            placeholder: 'Select a date range',
        }
    });
    dateRangeObj.appendTo('#dateRangePickerEle');

    let editorMode: DropDownList = new DropDownList({
        width: '90%',
        change: changeEditorMode
    });
    // render initialized DropDownList component
    editorMode.appendTo('#editorMode');

    function changeEditorMode(e: DropDownChangeArgs): void {
        let mode: RenderMode = e.itemData.value as RenderMode;
        dateObj.mode = mode;
        dateObj.dataBind();
        timeObj.mode = mode;
        timeObj.dataBind();
        dateTimeObj.mode = mode;
        dateTimeObj.dataBind();
        dateRangeObj.mode = mode;
        dateRangeObj.dataBind();
    }
    if (document.getElementById('right-pane')) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll);
    }
    function onScroll(args: any): void {
        if (editorMode.value === 'Inline') { return; }
        if (dateObj && (dateObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            dateObj.enableEditMode = false;
        }
        if (timeObj && (timeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            timeObj.enableEditMode = false;
        }
        if (dateObj && (dateTimeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            dateTimeObj.enableEditMode = false;
        }
        if (dateRangeObj && (dateRangeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            dateRangeObj.enableEditMode = false;
        }
    }
};
