import { loadCultureFiles } from '../common/culture-loader';
import { VirtualScroll, TreeGrid, Toolbar, Edit, RowDD } from '@syncfusion/ej2-treegrid';
import { virtualData, dataSource } from './data-source';
/**
 * virtualscrolling sample
 */
TreeGrid.Inject(VirtualScroll, Toolbar, Edit, RowDD);

(window as any).default = (): void => {
    loadCultureFiles();
    if (!virtualData.length) {
        dataSource();
    }
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: virtualData,
            enableVirtualization: true,
            treeColumnIndex: 1,
            childMapping: 'Crew',
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                mode: 'Row',
                newRowPosition: 'Child'
            },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel','Indent', 'Outdent'],
            height: 400,
            columns: [
                { field: 'TaskID', headerText: 'Player Jersey', validationRules: { required: true, number: true }, width: 140, textAlign: 'Right', isPrimaryKey: true },
                { field: 'FIELD1', headerText: 'Player Name', validationRules: { required: true }, width: 140 },
                { field: 'FIELD2', headerText: 'Year', width: 120, textAlign: 'Right' },
                { field: 'FIELD3', headerText: 'Stint', width: 120, textAlign: 'Right' },
                { field: 'FIELD4', headerText: 'TMID', width: 120, textAlign: 'Right' }
               ]
        });
    treegrid.appendTo('#TreeGrid');
};
