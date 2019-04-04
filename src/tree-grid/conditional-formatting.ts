import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';


/**
 * Default Grid sample
 */
TreeGrid.Inject(Page);

(window as any).default = (): void => {
    loadCultureFiles();
    let grid: TreeGrid = new TreeGrid(
    {
        dataSource: sampleData,
        childMapping: 'subtasks',
        treeColumnIndex: 1,
        allowPaging: true,
        pageSettings: { pageSize: 11 },
        queryCellInfo: (args: QueryCellInfoEventArgs) => {
           if (args.cell.innerHTML === 'High') {
            let x: HTMLElement = document.createElement('IMG');
            x.setAttribute('src', 'src/tree-grid/images/__High.png');
            x.setAttribute('height', '15px');
            let span: HTMLElement = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(x);
            args.cell.appendChild(span);
           } else if (args.cell.innerHTML === 'Critical') {
            let y: HTMLElement = document.createElement('IMG');
            y.setAttribute('src', 'src/tree-grid/images/__Critical.png');
            y.setAttribute('height', '15px');
            let span: HTMLElement = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(y);
            args.cell.appendChild(span);
           } else if (args.cell.innerHTML === 'Low') {
            let z: HTMLElement = document.createElement('IMG');
            z.setAttribute('src', 'src/tree-grid/images/__Low.png');
            z.setAttribute('height', '15px');
            let span: HTMLElement = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(z);
            args.cell.appendChild(span);
           } else if (args.cell.innerHTML === 'Normal') {
            let a: HTMLElement = document.createElement('IMG');
            a.setAttribute('src', 'src/tree-grid/images/__Normal.png');
            a.setAttribute('height', '15px');
            let span: HTMLElement = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(a);
            args.cell.appendChild(span);
           } else if (+args.cell.innerHTML > 90 && +args.cell.innerHTML <= 100 && args.column.field === 'progress') {
              args.cell.setAttribute('style', 'background-color:#336c12;color:white;');
           } else if (+args.cell.innerHTML > 20 && args.column.field === 'progress') {
                args.cell.setAttribute('style', 'background-color:#7b2b1d;color:white;');
           }
        },
        columns: [
            { field: 'taskID', headerText: 'Task ID', width: 70, textAlign: 'Right' },
            { field: 'taskName', headerText: 'Task Name', width: 200, textAlign: 'Left' },
            { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
            { field: 'endDate', headerText: 'End Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
            { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
            { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' },
            { field: 'priority', headerText: 'Priority', width: 90 }
        ]
        });
    grid.appendTo('#Grid');
};
