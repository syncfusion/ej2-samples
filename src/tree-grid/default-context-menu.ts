import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Resize, ExcelExport, PdfExport, Edit, Page, ContextMenu, Sort } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject(Resize, ExcelExport, PdfExport, Edit, Page, ContextMenu, Sort);

/**
 * Context menu in grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowExcelExport: true,
            allowPdfExport: true,
            allowSorting: true,
            childMapping: 'subtasks',
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            treeColumnIndex: 1,
            editSettings: { allowAdding: true, allowDeleting: true, allowEditing: true, mode: 'Row' },
            contextMenuItems: ['SortAscending', 'SortDescending',
                 'Edit', 'Delete', 'Save', 'Cancel',
                'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
                'LastPage', 'NextPage'],
            columns: [
                { field: 'taskID', headerText: 'Task ID', width: 80, isPrimaryKey: true, textAlign: 'Right', editType: 'numericedit' },
                { field: 'taskName', headerText: 'Task Name', width: 190 },
                { field: 'startDate', headerText: 'Start Date', format: 'yMd', width: 90,
                    editType: 'datepickeredit', textAlign: 'Right' },
                { field: 'endDate', headerText: 'End Date', format: 'yMd', width: 90, editType: 'datepickeredit', textAlign: 'Right' },
                { field: 'duration', headerText: 'Duration', width: 85, textAlign: 'Right', editType: 'numericedit',
                     edit: {params: {format: 'n'}} },
                { field: 'priority', headerText: 'Priority', width: 80 }
            ]
        });
    treegrid.appendTo('#TreeGrid');
};
