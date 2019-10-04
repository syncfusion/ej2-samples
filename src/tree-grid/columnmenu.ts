import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page, Sort, Filter, Resize, ColumnMenu } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';
import { ColumnMenuOpenEventArgs } from '@syncfusion/ej2-grids';

/**
 * Default TreeGrid sample
 */
TreeGrid.Inject(Page, Filter, Sort, Resize, ColumnMenu );

(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            childMapping: 'subtasks',
            allowPaging: true,
            pageSettings: {pageSize: 10},
            allowFiltering: true,
            columnMenuOpen: (args: ColumnMenuOpenEventArgs) => {
                if (args.parentItem != null) {
                    args.element.querySelectorAll('li')[treegrid.treeColumnIndex].style.display = 'none';
                }
            },
            filterSettings: { type: 'Menu' },
            allowSorting: true,
            showColumnMenu: true,
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 100, },
                { field: 'taskName', headerText: 'Task Name', width: 190 },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 135, format: { skeleton: 'yMd', type: 'date' } },
                { field: 'approved', headerText: 'Approved', textAlign: 'Center', width: 140, type: 'boolean', displayAsCheckBox: true },
                { field: 'priority', headerText: 'Priority', textAlign: 'Left', width: 140 }
            ]
        });
    treegrid.appendTo('#TreeGrid');
};
