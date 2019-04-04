import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { projectData } from './data-source';

/**
 * Default TreeGrid sample
 */

TreeGrid.Inject(Page);

(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: projectData,
            idMapping: 'TaskID',
            parentIdMapping: 'parentID',
            allowPaging: true,
            treeColumnIndex: 1,
            columns: [
                { field: 'TaskID', headerText: 'Task ID', textAlign: 'Right', width: 140 },
                { field: 'TaskName', headerText: 'Task Name', width: 160 },
                { field: 'StartDate', headerText: 'Start Date', textAlign: 'Right', width: 120, format: { skeleton: 'yMd', type: 'date' }},
                { field: 'EndDate', headerText: 'End Date', textAlign: 'Right', width: 120, format: { skeleton: 'yMd', type: 'date' }},
                { field: 'Duration', headerText: 'Duration', textAlign: 'Right', width: 110},
                { field: 'Progress', headerText: 'Progress', textAlign: 'Right', width: 110},
                { field: 'Priority', headerText: 'Priority', width: 110}
            ]
        });
    treegrid.appendTo('#TreeGrid');
};
