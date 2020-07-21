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
        appendElement('Tree Grid <b>collapsing</b> event called<hr>');
    }
    function collapsed(): void {
        appendElement('Tree Grid <b>collapsed</b> event called<hr>');
    }
    function expanded(): void {
        appendElement('Tree Grid <b>expanded</b> event called<hr>');
    }
    function expanding(): void {
        appendElement('Tree Grid <b>expanding</b> event called<hr>');
    }
    function beginEdit(): void {
        appendElement('Tree Grid <b>beginEdit</b> event called<hr>');
    }
    function columnDragStart(): void {
        appendElement('Tree Grid <b>columnDragStart</b> event called<hr>');
    }
    function columnDrop(): void {
        appendElement('Tree Grid <b>columnDrop</b> event called<hr>');
    }
    function columnDrag(): void {
        appendElement('Tree Grid <b>columnDrag</b> event called<hr>');
    }
    function load(): void {
        appendElement('Tree Grid <b>load</b> event called<hr>');
    }
    function create(): void {
        appendElement('Tree Grid <b>create</b> event called<hr>');
    }
    function actionBegin(): void {
        appendElement('Tree Grid <b>actionBegin</b> event called<hr>');
    }
    function actionComplete(): void {
        appendElement('Tree Grid <b>actionComplete</b> event called<hr>');
    }
    function dataBound(): void {
        appendElement('Tree Grid <b>dataBound</b> event called<hr>');
    }
    function rowSelecting(): void {
        appendElement('Tree Grid <b>rowSelecting</b> event called<hr>');
    }
    function rowSelected(): void {
        appendElement('Tree Grid <b>rowSelected</b> event called<hr>');
    }
    function rowDeselecting(): void {
        appendElement('Tree Grid <b>rowDeselecting</b> event called<hr>');
    }
    function rowDeselected(): void {
        appendElement('Tree Grid <b>rowDeselected</b> event called<hr>');
    }

};

function appendElement(html: string) : void {
    let span: HTMLElement = document.createElement('span');
    span.innerHTML = html;
    let log: HTMLElement = document.getElementById('EventLog');
    log.insertBefore(span, log.firstChild);
}

