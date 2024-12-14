import { Button } from '@syncfusion/ej2-buttons';
import { Grid, Page, Selection, Reorder, Group, Sort, Filter } from '@syncfusion/ej2-grids';
import { categoryData } from './data-source';

Grid.Inject(Page, Selection, Reorder, Group, Sort, Filter);

/**
 * Events sample
 */
(window as any).default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: categoryData,
            allowPaging: true,
            pageSettings: { pageCount: 2 },
            allowGrouping: true,
            allowReordering: true,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            columns: [
                { field: 'CategoryName', headerText: 'Category Name', width: 170 },
                { field: 'ProductName', headerText: 'Product Name', width: 170 },
                { field: 'QuantityPerUnit', headerText: 'Quantity Per Unit', width: 170, allowGrouping: false },
            ],
            load: load,
            created: create,
            actionBegin: actionBegin,
            actionComplete: actionComplete,
            dataBound: dataBound,
            rowSelecting: rowSelecting,
            rowSelected: rowSelected,
            columnDragStart: columnDragStart,
            columnDrag: columnDrag,
            columnDrop: columnDrop
        });
    grid.appendTo('#Grid');

    let clear: Button = new Button();
    clear.appendTo('#clear');

    document.getElementById('clear').onclick = () => {
        document.getElementById('EventLog').innerHTML = '';
    };
    function columnDragStart(): void {
        appendElement('Grid <b>columnDragStart</b> event called<hr>');
    }
    function columnDrop(): void {
        appendElement('Grid <b>columnDrop</b> event called<hr>');
    }
    function columnDrag(): void {
        appendElement('Grid <b>columnDrag</b> event called<hr>');
    }
    function load(): void {
        appendElement('Grid <b>load</b> event called<hr>');
    }
    function create(): void {
        appendElement('Grid <b>create</b> event called<hr>');
    }
    function actionBegin(): void {
        appendElement('Grid <b>actionBegin</b> event called<hr>');
    }
    function actionComplete(): void {
        appendElement('Grid <b>actionComplete</b> event called<hr>');
    }
    function dataBound(): void {
        appendElement('Grid <b>dataBound</b> event called<hr>');
    }
    function rowSelecting(): void {
        appendElement('Grid <b>rowSelecting</b> event called<hr>');
    }
    function rowSelected(): void {
        appendElement('Grid <b>rowSelected</b> event called<hr>');
    }
    function appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }
};