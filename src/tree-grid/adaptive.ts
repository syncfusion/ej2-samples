import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page, Filter, Sort, Edit, Toolbar } from '@syncfusion/ej2-treegrid';
import { Browser } from '@syncfusion/ej2-base';
import { sampleData } from './data-source';

TreeGrid.Inject(Page, Filter, Sort, Edit, Toolbar);

/**
 * Adaptive Tree Grid sample
 */
 (window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            enableAdaptiveUI: true,
            allowPaging: true,
            childMapping: 'subtasks',
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            height: '100%',
            load: () => {
                if (!Browser.isDevice) {
                    treegrid.grid.adaptiveDlgTarget = document.getElementsByClassName('e-mobile-content')[0] as HTMLElement;
                }
            },
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true, mode: 'Dialog' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'],
            columns: [
                { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, validationRules: { required: true, number: true}, width: 135, textAlign: 'Right' },
                { field: 'taskName', headerText: 'Task Name',validationRules: { required: true}, width: 280, textAlign: 'Left' },
                { field: 'duration', headerText: 'Duration',validationRules: {required: true}, width: 140, textAlign: 'Right' },
                { field: 'progress', headerText: 'Progress', width: 145, textAlign: 'Right' }
            ],
        });
    if (Browser.isDevice) {
        treegrid.appendTo('#adaptivedevice');
        (document.getElementsByClassName('e-mobile-layout')[0] as HTMLElement).style.display = 'none';
    } else {
        treegrid.appendTo('#adaptivebrowser');
    }
};
