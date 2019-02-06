import { loadCultureFiles } from '../common/culture-loader';
/**
 * InPlaceEditor Sample with HTML5 controls
 */

import { InPlaceEditor, ActionBeginEventArgs, DateRangePicker } from '@syncfusion/ej2-inplace-editor';

InPlaceEditor.Inject(DateRangePicker);

(window as any).default = (): void => {
    loadCultureFiles();
    let editObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        template: '#textInput',
        value: 'Janat',
        actionBegin: actionTextBegin
    });
    editObj.appendTo('#inplace_editor');

    let dateObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        template: '#dateInput',
        value: '2013-01-08',
        actionBegin: actionDateBegin
    });
    dateObj.appendTo('#inplace_editor_date');

    let selectObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        value: 'Volvo',
        template: '#selectInput',
        actionBegin: actionSelectBegin
    });
    selectObj.appendTo('#inplace_editor_select');

    function actionTextBegin(e : ActionBeginEventArgs): void {
        editObj.value = (document.getElementById('textInput') as HTMLInputElement).value;
    }
    function actionDateBegin(e : ActionBeginEventArgs): void {
        dateObj.value = (document.getElementById('dateInput') as HTMLInputElement).value;
    }
    function actionSelectBegin(e : ActionBeginEventArgs): void {
        selectObj.value = (document.getElementById('selectInput') as HTMLInputElement).value;
    }
};
