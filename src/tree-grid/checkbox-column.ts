import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

/**
 * CheckBox Selection TreeGrid sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            height: '410',
            autoCheckHierarchy: true,
            columns: [
                { field: 'taskID', headerText: 'Task ID', width: 60, textAlign: 'Right' },
                { field: 'taskName', headerText: 'Task Name', width: 150, textAlign: 'Left', showCheckbox: true },
                { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'endDate', headerText: 'End Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
                { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' },
            ]
        });
    treegrid.appendTo('#TreeGrid');
};
