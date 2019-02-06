import { loadCultureFiles } from '../common/culture-loader';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { TreeGrid, Resize, ExcelExport, PdfExport, Edit, Page, ContextMenu, Sort } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';

TreeGrid.Inject(Resize, ExcelExport, PdfExport, Edit, Page, ContextMenu, Sort);

/**
 * Context menu in grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            childMapping: 'subtasks',
            height: 400,
            treeColumnIndex: 1,
            contextMenuItems: [
                {text: 'Collapse the Row', target: '.e-content', id: 'collapserow'},
                {text: 'Expand the Row', target: '.e-content', id: 'expandrow'}
            ],
            columns: [
                { field: 'taskID', headerText: 'Task ID', width: 80, textAlign: 'Right', editType: 'numericedit' },
                { field: 'taskName', headerText: 'Task Name', width: 210 },
                { field: 'startDate', headerText: 'Start Date', format: 'yMd', width: 100,
                    editType: 'datepickeredit', textAlign: 'Right' },
                { field: 'endDate', headerText: 'End Date', format: 'yMd', width: 100, editType: 'datepickeredit', textAlign: 'Right' },
                { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right', editType: 'numericedit' },
                { field: 'progress', width: 80, headerText: 'Progress', textAlign: 'Right', editType: 'numericedit' },
                { field: 'priority', headerText: 'Priority', width: 90, editType: 'numericedit' }
            ],
            contextMenuOpen: (arg?: BeforeOpenCloseEventArgs) => {
                let elem: Element = arg.event.target as Element;
                let uid: string = elem.closest('.e-row').getAttribute('data-uid');
                if (isNullOrUndefined(getValue('hasChildRecords', treegrid.grid.getRowObjectFromUID(uid).data))) {
                    arg.cancel = true;
                } else {
                    let flag: boolean = getValue('expanded', treegrid.grid.getRowObjectFromUID(uid).data);
                    let val: string = flag ? 'none' : 'block';
                    document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
                    val = !flag ? 'none' : 'block';
                    document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
                }
            },
            contextMenuClick: (args?: MenuEventArgs) => {
                treegrid.getColumnByField('taskID');
                if (args.item.id === 'collapserow') {
                    treegrid.collapseRow(<HTMLTableRowElement>(treegrid.getSelectedRows()[0]), treegrid.getSelectedRecords()[0]);
                } else {
                    treegrid.expandRow(<HTMLTableRowElement>(treegrid.getSelectedRows()[0]), treegrid.getSelectedRecords()[0]);
                    }
            }
        });
    treegrid.appendTo('#TreeGrid');
};
