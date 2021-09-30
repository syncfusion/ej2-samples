import { loadCultureFiles } from '../common/culture-loader';
/**
 * Inplace Editor Data Binding Sample
 */

import { InPlaceEditor, ActionBeginEventArgs, ActionEventArgs } from '@syncfusion/ej2-inplace-editor';
import { Button } from '@syncfusion/ej2-buttons';

(window as any).default = (): void => {
    loadCultureFiles();

    let editObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        type: 'Text',
        primaryKey: '1',
        adaptor: 'UrlAdaptor',
        actionOnBlur: 'Ignore',
        actionBegin: actionBeginEvent,
        actionSuccess: actionSuccessEvent,
        actionFailure: actionFailureEvent,
        url: 'http://172.16.104.41/Editor/api/WebApi/',
        emptyText: 'Enter a data to send',
        model: {
            placeholder: 'Enter a data to send'
        }
    });

    editObj.appendTo('#inplace_editor_remote');
    function actionBeginEvent(e: ActionBeginEventArgs): void {
        appendElement('<b>actionBegin</b> event called<hr>');
        appendElement(' Passing value: ' + e.data.value + ' <hr>');
    }

    function actionSuccessEvent(e: ActionEventArgs): void {
        appendElement('<b>actionSuccess</b> event called<hr>');
        appendElement('Passed value: ' + e.value + ' <hr>');
    }

    function actionFailureEvent(e: ActionEventArgs): void {
        appendElement('<b>actionFailure</b> event called<hr>');
    }

    function appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }

    let clear: Button = new Button();
    clear.appendTo('#clearButton');

    document.getElementById('clearButton').onclick = () => {
        document.getElementById('EventLog').innerHTML = '';
    };
};



