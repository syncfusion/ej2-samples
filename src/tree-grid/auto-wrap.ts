import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page, Filter, Sort } from '@syncfusion/ej2-treegrid';
import { wrapData } from './data-source';

TreeGrid.Inject(Page, Filter, Sort);
/**
 * Auto wrap sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: wrapData,
            allowPaging: true,
            allowTextWrap: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            allowSorting: true,
            height: 400,
            childMapping: 'subtasks',
            pageSettings: { pageSize: 8 },
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', width: 140, textAlign: 'Right' },
                { field: 'taskName', headerText: 'Title', width: 240},
                { field: 'description', headerText: 'Description (Comprehensive Objectives for Deliverables)', width: 370},
                { field: 'employeeName', headerText: 'Assigned To', textAlign: 'Left', width: 180 },
                { field: 'priority', headerText: 'Priority', textAlign: 'Center', width: 150 },
                { field: 'status', headerText: 'Status', textAlign: 'Center', width: 130 },
                { field: 'startDate', headerText: 'Start Date', format: 'yMd', textAlign: 'Right', width: 160},
                { field: 'endDate', headerText: 'End Date', format: 'yMd', textAlign: 'Right', width: 160},
            ]
        });
    grid.appendTo('#TreeGrid');
};

