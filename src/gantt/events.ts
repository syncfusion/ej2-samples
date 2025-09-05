import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, Reorder, Sort, Resize, ContextMenu } from '@syncfusion/ej2-gantt';
import { ColumnMenu, Toolbar, Edit, Filter, DayMarkers } from '@syncfusion/ej2-gantt';
import {Button} from '@syncfusion/ej2-buttons';
import { projectNewData } from './data-source';
import { ColumnMenuOpenEventArgs } from '@syncfusion/ej2-grids';

/**
 * Events Gantt sample
 */

Gantt.Inject(Selection, Reorder, Sort, Resize, ContextMenu, ColumnMenu, Toolbar, Edit, Filter, DayMarkers );
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: projectNewData,
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
            highlightWeekends: true,
            treeColumnIndex: 1,
            allowSelection: true,
            allowReordering: true,
            allowSorting: true,
            allowResizing: true,
            enableContextMenu: true,
            showColumnMenu: true,
            created: created,
            load: load,
            dataBound: dataBound,
            toolbarClick: toolbarClick,
            beforeTooltipRender: beforeTooltipRender,
            actionBegin: actionBegin,
            actionComplete: actionComplete,
            cellEdit: cellEdit,
            endEdit: endEdit,
            taskbarEditing: taskbarEditing,
            taskbarEdited: taskbarEdited,
            rowSelecting: rowSelecting,
            rowSelected: rowSelected,
            rowDeselecting: rowDeselecting,
            rowDeselected: rowDeselected,
            columnDragStart: columnDragStart,
            columnDrag: columnDrag,
            columnDrop: columnDrop,
            expanding: expanding,
            expanded: expanded,
            collapsing: collapsing,
            collapsed: collapsed,
            columnMenuClick: columnMenuClick,
            columnMenuOpen: columnMenuOpen,
            contextMenuClick: contextMenuClick,
            contextMenuOpen: contextMenuOpen,
            resizeStart: resizeStart,
            resizing: resizing,
            resizeStop: resizeStop,
            splitterResizeStart: splitterResizeStart,
            splitterResizing: splitterResizing,
            splitterResized: splitterResized,
            recordDoubleClick: recordDoubleClick,
            onTaskbarClick: onTaskbarClick,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                parentID: 'ParentId'
            },
            columns: [
                { field: 'TaskID', width: 100 },
                { field: 'TaskName', width: 250 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Predecessor', width: 190 },
                { field: 'Progress' },
            ],
            toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Search'],
            editSettings: {
                allowEditing: true,
                allowAdding: true,
                allowDeleting: true,
                allowTaskbarEditing: true,
            },
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 2
            },
            projectStartDate: new Date('03/26/2025'),
            projectEndDate: new Date('07/20/2025')
        });
    gantt.appendTo('#Events');
    let clear: Button = new Button();
    clear.appendTo('#clear');
    document.getElementById('clear').onclick = () => {
    document.getElementById('EventLog').innerHTML = '';
    };
    function columnMenuOpen(args: ColumnMenuOpenEventArgs): void {
        if (args.parentItem != null) {
            args.element.querySelectorAll('li')[gantt.treeColumnIndex].style.display = 'none';
        }
        appendElement('Gantt <b>columnMenuOpen</b> event called<hr>');
    }
};
function created(): void {
    appendElement('Gantt <b>created</b> event called<hr>');
}
function load(): void {
    appendElement('Gantt <b>load</b> event called<hr>');
}
function dataBound(): void {
    appendElement('Gantt <b>dataBound</b> event called<hr>');
}
function toolbarClick(): void {
    appendElement('Gantt <b>toolbarClick</b> event called<hr>');
}
function beforeTooltipRender(): void {
    appendElement('Gantt <b>beforeTooltipRender</b> event called<hr>');
}
function actionBegin(): void {
    appendElement('Gantt <b>actionBegin</b> event called<hr>');
}
function actionComplete(): void {
    appendElement('Gantt <b>actionComplete</b> event called<hr>');
}
function cellEdit(): void {
    appendElement('Gantt <b>cellEdit</b> event called<hr>');
}
function endEdit(): void {
    appendElement('Gantt <b>endEdit</b> event called<hr>');
}
function taskbarEditing(): void {
    appendElement('Gantt <b>taskbarEditing</b> event called<hr>');
}
function taskbarEdited(): void {
    appendElement('Gantt <b>taskbarEdited</b> event called<hr>');
}
function rowSelecting(): void {
    appendElement('Gantt <b>rowSelecting</b> event called<hr>');
}
function rowSelected(): void {
    appendElement('Gantt <b>rowSelected</b> event called<hr>');
}
function rowDeselecting(): void {
    appendElement('Gantt <b>rowDeselecting</b> event called<hr>');
}
function rowDeselected(): void {
    appendElement('Gantt <b>rowDeselected</b> event called<hr>');
}
function columnDragStart(): void {
    appendElement('Gantt <b>columnDragStart</b> event called<hr>');
}
function columnDrag(): void {
    appendElement('Gantt <b>columnDrag</b> event called<hr>');
}
function columnDrop(): void {
    appendElement('Gantt <b>columnDrop</b> event called<hr>');
}
function expanding(): void {
    appendElement('Gantt <b>expanding</b> event called<hr>');
}
function expanded(): void {
    appendElement('Gantt <b>expanded</b> event called<hr>');
}
function collapsing(): void {
    appendElement('Gantt <b>collapsing</b> event called<hr>');
}
function collapsed(): void {
    appendElement('Gantt <b>collapsed</b> event called<hr>');
}
function columnMenuClick(): void {
    appendElement('Gantt <b>columnMenuClick</b> event called<hr>');
}
function contextMenuClick(): void {
    appendElement('Gantt <b>contextMenuClick</b> event called<hr>');
}
function contextMenuOpen(): void {
    appendElement('Gantt <b>contextMenuOpen</b> event called<hr>');
}
function resizeStart(): void {
    appendElement('Gantt <b>resizeStart</b> event called<hr>');
}
function resizing(): void {
    appendElement('Gantt <b>resizing</b> event called<hr>');
}
function resizeStop(): void {
    appendElement('Gantt <b>resizeStop</b> event called<hr>');
}
function splitterResizeStart(): void {
    appendElement('Gantt <b>splitterResizeStart</b> event called<hr>');
}
function splitterResizing(): void {
    appendElement('Gantt <b>splitterResizing</b> event called<hr>');
}
function splitterResized(): void {
    appendElement('Gantt <b>splitterResized</b> event called<hr>');
}
function recordDoubleClick(): void {
    appendElement('Gantt <b>recordDoubleClick</b> event called<hr>');
}
function onTaskbarClick(): void {
    appendElement('Gantt <b>onTaskbarClick</b> event called<hr>');
}
function appendElement(html: string): void {
    let span: HTMLElement = document.createElement('span');
    span.innerHTML = html;
    let log: HTMLElement = document.getElementById('EventLog');
    log.insertBefore(span, log.firstChild);
}
