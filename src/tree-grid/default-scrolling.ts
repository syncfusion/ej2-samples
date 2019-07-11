import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

/**
 * Scrolling TreeGrid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            height: 400,
            width: 'auto',
            columns: [
                { field: 'taskID', headerText: 'Task ID', width: 100, textAlign: 'Right' },
                { field: 'taskName', headerText: 'Task Name', width: 230, textAlign: 'Left' },
                { field: 'startDate', headerText: 'Start Date', width: 200, textAlign: 'Right',
                    type: 'date', format: { type: 'dateTime', format: 'dd/MM/yyyy' } },
                { field: 'endDate', headerText: 'End Date', width: 200, textAlign: 'Right',
                    type: 'date', format: { type: 'dateTime', format: 'dd/MM/yyyy' } },
                { field: 'duration', headerText: 'Duration', width: 110, textAlign: 'Right' },
                { field: 'progress', headerText: 'Progress', width: 110, textAlign: 'Right' },
                { field: 'priority', headerText: 'Priority', width: 110 },
                { field: 'approved', headerText: 'Approved', width: 110, displayAsCheckBox: true, textAlign: 'Center' }
            ]
        });
    grid.appendTo('#TreeGrid');
};
