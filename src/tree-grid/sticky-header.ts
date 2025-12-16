import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

(window as any).default = (): void => {
    loadCultureFiles();
    const treeGridObj: TreeGrid = new TreeGrid({
        dataSource: sampleData,
        childMapping: 'subtasks',
        treeColumnIndex: 1,
        enableStickyHeader: true,
        columns: [
            { field: 'taskID', headerText: 'Task ID', width: 100, textAlign: 'Right' },
            { field: 'taskName', headerText: 'Task Name', width: 230, clipMode: 'EllipsisWithTooltip', textAlign: 'Left' },
            { field: 'startDate', headerText: 'Start Date', width: 200, textAlign: 'Right', type: 'date', format: { type: 'dateTime', format: 'dd/MM/yyyy' } },
            { field: 'endDate', headerText: 'End Date', width: 200, textAlign: 'Right', type: 'date', format: { type: 'dateTime', format: 'dd/MM/yyyy' } },
            { field: 'duration', headerText: 'Duration', width: 110, textAlign: 'Right' },
            { field: 'progress', headerText: 'Progress', width: 110, textAlign: 'Right' },
            { field: 'priority', headerText: 'Priority', width: 110 },
            { field: 'approved', headerText: 'Approved', width: 120, displayAsCheckBox: true, textAlign: 'Center', clipMode: 'EllipsisWithTooltip' }
        ]
    });
    treeGridObj.appendTo('#TreeGrid');
};