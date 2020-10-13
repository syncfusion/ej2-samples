import { loadCultureFiles } from '../common/culture-loader';
import { Kanban, CardRenderedEventArgs, CardClickEventArgs } from '@syncfusion/ej2-kanban';
import { extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';
/**
 * Kanban Events Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // To maintain the property changes, extend the object.
    let data: Object[] = <Object[]>extend([], (dataSource as any).kanbanData, null, true);
    let kanbanObj: Kanban = new Kanban({ //Initialize Kanban control
        dataSource: data,
        keyField: 'Status',
        height: 500,
        columns: [
            { headerText: 'To Do', keyField: 'Open', allowToggle: true },
            { headerText: 'In Progress', keyField: 'InProgress', allowToggle: true },
            { headerText: 'Done', keyField: 'Close', allowToggle: true }
        ],
        cardSettings: {
            contentField: 'Summary',
            headerField: 'Id',
        },
        swimlaneSettings: {
            keyField: 'Assignee'
        },
        created: OnCreate,
        actionBegin: OnActionBegin,
        actionComplete: OnActionComplete,
        actionFailure: OnActionFailure,
        dataBinding: OnDataBinding,
        dataBound: OnDataBound,
        cardRendered: OnCardRendered,
        queryCellInfo: OnQueryCellInfo,
        cardClick: OnCardClick,
        cardDoubleClick: OnCardDoubleClick,
        dragStart: OnDragStart,
        drag: OnDrag,
        dragStop: OnDragStop
    });
    kanbanObj.appendTo('#Kanban'); //Render initialized Kanban control
    document.getElementById('clear').onclick = () => {
        document.getElementById('EventLog').innerHTML = '';
    };
    function OnCreate(): void {
        appendElement('Kanban <b>Load</b> event called<hr>');
    }
    function OnActionBegin(): void {
        appendElement('Kanban <b>Action Begin</b> event called<hr>');
    }
    function OnActionComplete(): void {
        appendElement('Kanban <b>Action Complete</b> event called<hr>');
    }
    function OnActionFailure(): void {
        appendElement('Kanban <b>Action Failure</b> event called<hr>');
    }
    function OnDataBinding(): void {
        appendElement('Kanban <b>Data Binding</b> event called<hr>');
    }
    function OnDataBound(): void {
        appendElement('Kanban <b>Data Bound</b> event called<hr>');
    }
    function OnCardRendered(args: CardRenderedEventArgs): void {
        appendElement('Kanban - ' + (args.data as { [key: string]: Object }).Id + ' - <b>Card Rendered</b> event called<hr>');
    }
    function OnQueryCellInfo(): void {
        appendElement('Kanban <b>Query Cell Info</b> event called<hr>');
    }
    function OnCardClick(args: CardClickEventArgs): void {
        appendElement('Kanban - ' + (args.data as { [key: string]: Object }).Id + ' - <b>Card Click</b> event called<hr>');
    }
    function OnCardDoubleClick(args: CardClickEventArgs): void {
        appendElement('Kanban - ' + (args.data as { [key: string]: Object }).Id + ' - <b>Card Double Click</b> event called<hr>');
    }
    function OnDragStart(): void {
        appendElement('Kanban <b>Drag Start</b> event called<hr>');
    }
    function OnDrag(): void {
        appendElement('Kanban <b>Drag</b> event called<hr>');
    }
    function OnDragStop(): void {
        appendElement('Kanban <b>Drag Stop</b> event called<hr>');
    }
    function appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }
};