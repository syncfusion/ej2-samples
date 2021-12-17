import { loadCultureFiles } from '../common/culture-loader';
import { Button } from '@syncfusion/ej2-buttons';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { applyCategoryColor } from './helper';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

/**
 * Schedule events sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).scheduleData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2021, 0, 10),
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView),
        created: OnCreate,
        actionBegin: OnActionBegin,
        actionComplete: OnActionComplete,
        actionFailure: OnActionFailure,
        cellClick: OnCellClick,
        cellDoubleClick: OnCellDoubleClick,
        destroyed: OnDestroyed,
        navigating: OnNavigating,
        eventClick: OnEventClick,
        popupOpen: OnPopupOpen,
    });
    scheduleObj.appendTo('#Schedule');
    let btn: Button = new Button();
    btn.appendTo('#clear');
    document.getElementById('clear').onclick = () => {
        document.getElementById('EventLog').innerHTML = '';
    };
    function OnCreate(): void {
        appendElement('Schedule <b>Load</b> event is triggered<hr>');
    }
    function OnActionBegin(): void {
        appendElement('Schedule <b>Action Begin</b> event is triggered<hr>');
    }
    function OnActionComplete(): void {
        appendElement('Schedule <b>Action Complete</b> event is triggered<hr>');
    }
    function OnActionFailure(): void {
        appendElement('Schedule <b>Action Failure</b> event is triggered<hr>');
    }
    function OnCellDoubleClick(): void {
        appendElement('SChedule <b>Cell Double Click</b> event is triggered<hr>');
    }
    function OnCellClick(): void {
        appendElement('Schedule <b>Cell Click</b> event is triggered<hr>');
    }
    function OnNavigating(): void {
        appendElement('Schedule <b>Navigating</b> event is triggered<hr>');
    }
    function OnDestroyed(): void {
        appendElement('Schedule <b>Destroyed</b> event is triggered<hr>');
    }
    function OnEventClick(): void {
        appendElement('Schedule <b>Event Click</b> event is triggered<hr>');
    }
    function OnPopupOpen(): void {
        appendElement('Schedule <b>Popup Open</b> event is triggered<hr>');
    }
    function appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }
};
