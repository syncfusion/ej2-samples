import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page, Reorder, Sort, Edit } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';
import { Button } from '@syncfusion/ej2-buttons';

TreeGrid.Inject(Page, Reorder, Sort, Edit);
/**
 * Events sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowPaging: true,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            editSettings: { allowEditing: true },
            load: load,
            created: create,
            actionBegin: actionBegin,
            actionComplete: actionComplete,
            allowReordering: true,
            allowSorting: true,
            dataBound: dataBound,
            rowSelecting: rowSelecting,
            rowSelected: rowSelected,
            rowDeselected: rowDeselected,
            rowDeselecting: rowDeselecting,
            columnDragStart: columnDragStart,
            columnDrag: columnDrag,
            columnDrop: columnDrop,
            beginEdit: beginEdit,
            collapsing: collapsing,
            collapsed: collapsed,
            expanded: expanded,
            expanding: expanding,
            columns: [
                { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, textAlign: 'Right', width: 110 },
                { field: 'taskName', headerText: 'Task Name', width: 210, validationRules: { required: true } },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', editType: 'datepickeredit', format: 'yMd', width: 110 },
                { field: 'progress', headerText: 'Progress', width: 110, textAlign: 'Right',
                    editType: 'numericedit', edit: { params: { format: 'n' } }
                }
            ],
            pageSettings: { pageCount: 5, pageSize: 11 }
        });
    grid.appendTo('#Grid');
    let clear: Button = new Button();
    clear.appendTo('#clear');
    document.getElementById('clear').onclick = () => {
        document.getElementById('EventLog').innerHTML = '';
    };
    function collapsing(): void {
        appendElement('TreeGrid <b>collapsing</b> event called<hr>');
    }
    function collapsed(): void {
        appendElement('TreeGrid <b>collapsed</b> event called<hr>');
    }
    function expanded(): void {
        appendElement('TreeGrid <b>expanded</b> event called<hr>');
    }
    function expanding(): void {
        appendElement('TreeGrid <b>expanding</b> event called<hr>');
    }
    function beginEdit(): void {
        appendElement('TreeGrid <b>beginEdit</b> event called<hr>');
    }
    function columnDragStart(): void {
        appendElement('TreeGrid <b>columnDragStart</b> event called<hr>');
    }
    function columnDrop(): void {
        appendElement('TreeGrid <b>columnDrop</b> event called<hr>');
    }
    function columnDrag(): void {
        appendElement('TreeGrid <b>columnDrag</b> event called<hr>');
    }
    function load(): void {
        appendElement('TreeGrid <b>load</b> event called<hr>');
    }
    function create(): void {
        appendElement('TreeGrid <b>create</b> event called<hr>');
    }
    function actionBegin(): void {
        appendElement('TreeGrid <b>actionBegin</b> event called<hr>');
    }
    function actionComplete(): void {
        appendElement('TreeGrid <b>actionComplete</b> event called<hr>');
    }
    function dataBound(): void {
        appendElement('TreeGrid <b>dataBound</b> event called<hr>');
    }
    function rowSelecting(): void {
        appendElement('TreeGrid <b>rowSelecting</b> event called<hr>');
    }
    function rowSelected(): void {
        appendElement('TreeGrid <b>rowSelected</b> event called<hr>');
    }
    function rowDeselecting(): void {
        appendElement('TreeGrid <b>rowDeselecting</b> event called<hr>');
    }
    function rowDeselected(): void {
        appendElement('TreeGrid <b>rowDeselected</b> event called<hr>');
    }

};

function appendElement(html: string) : void {
    let span: HTMLElement = document.createElement('span');
    span.innerHTML = html;
    let log: HTMLElement = document.getElementById('EventLog');
    log.insertBefore(span, log.firstChild);
}

