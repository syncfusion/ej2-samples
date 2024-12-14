import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Toolbar } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject(Toolbar);
/**
 * Sorting sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            height: 410,
            toolbar: ['Print'],
            columns: [
                { field: 'taskID', headerText: 'Task ID', width: 70, textAlign: 'Right' },
                { field: 'taskName', headerText: 'Task Name', width: 200, textAlign: 'Left' },
                { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'endDate', headerText: 'End Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
                { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' },
                { field: 'priority', headerText: 'Priority', width: 90 }
            ],
            load: function () {
                this.grid.cssClass = document.querySelector('.fluent2-highcontrast') ? 'e-print-fluent2-highcontrast' : '';
            },
        });
    treegrid.appendTo('#TreeGrid');
};
