import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Filter, Toolbar, Page } from '@syncfusion/ej2-treegrid';
import { treesampleData } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

/**
 * Default Grid sample
 */
TreeGrid.Inject(Filter, Toolbar, Page);

(window as any).default = (): void => {
    loadCultureFiles();
    let grid: TreeGrid = new TreeGrid(
    {
        dataSource: treesampleData,
       toolbar: ['ExpandAll', 'CollapseAll', {text: 'Quick Filter', tooltipText: 'Quick Filter', id: 'toolbarfilter'}],
        toolbarClick: (args: ClickEventArgs) => {
            if (args.item.id === 'toolbarfilter') {
                grid.filterByColumn('taskName', 'startswith', 'Testing');
            }
        },
        allowFiltering: true,
        childMapping: 'subtasks',
        height: 350,
        allowPaging: true,
        pageSettings: {pageSize: 11},
        treeColumnIndex: 1,
        columns: [
            {field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 90 },
            {field: 'taskName', headerText: 'Task Name', width: 130 },
            {field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', format: 'yMd'},
            {field: 'progress', headerText: 'Progress', width: 90, textAlign: 'Right' },
            {field: 'duration', headerText: 'Duration', width: 90, textAlign: 'Right' },
            { field: 'priority', headerText: 'Priority', width: 90 }
        ]
        });
    grid.appendTo('#Grid');
};
