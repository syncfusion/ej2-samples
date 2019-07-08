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
                {text: 'Expand the Row', target: '.e-content', id: 'expandrow'},
                { text: 'Collapse All', target: '.e-headercontent', id: 'collapseall' },
                { text: 'Expand All', target: '.e-headercontent', id: 'expandall' }
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
                let row: Element = elem.closest('.e-row');
                let uid: string = row && row.getAttribute('data-uid');
                let items: HTMLElement[] = [].slice.call(document.querySelectorAll('.e-menu-item'));
                for (let i: number = 0; i < items.length; i++) {
                  items[i].setAttribute('style', 'display: none;');
                }
                if (elem.closest('.e-row')) {
                  if ( isNullOrUndefined(uid) ||
                    isNullOrUndefined(getValue('hasChildRecords', treegrid.grid.getRowObjectFromUID(uid).data))) {
                    arg.cancel = true;
                  } else {
                    let flag: boolean = getValue('expanded', treegrid.grid.getRowObjectFromUID(uid).data);
                    let val: string = flag ? 'none' : 'block';
                    document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
                    val = !flag ? 'none' : 'block';
                    document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
                  }
                } else {
                  let len: number = treegrid.element.querySelectorAll('.e-treegridexpand').length;
                  if (len !== 0) {
                     document.querySelectorAll('li#collapseall')[0].setAttribute('style', 'display: block;');
                  } else {
                    document.querySelectorAll('li#expandall')[0].setAttribute('style', 'display: block;');
                  }
                }
            },
            contextMenuClick: (args?: MenuEventArgs) => {
                if (args.item.id === 'collapserow') {
                  treegrid.collapseRow(treegrid.getSelectedRows()[0] as HTMLTableRowElement, treegrid.getSelectedRecords()[0]);
                } else if (args.item.id === 'expandrow') {
                  treegrid.expandRow(treegrid.getSelectedRows()[0] as HTMLTableRowElement, treegrid.getSelectedRecords()[0]);
                } else if (args.item.id === 'collapseall') {
                  treegrid.collapseAll();
                } else if (args.item.id === 'expandall') {
                  treegrid.expandAll();
                }
            }
        });
    treegrid.appendTo('#TreeGrid');
};
