import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Edit } from '@syncfusion/ej2-treegrid';
import { CommandColumn} from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject(Edit, CommandColumn);
/**
 * Auto wrap sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            height: 400,
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                mode: 'Row'

            },
            columns: [
                {
                    field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, textAlign: 'Right',
                    validationRules: { required: true, number: true }, width: 80
                },
                { field: 'taskName', headerText: 'Task Name', editType: 'stringedit', width: 200, validationRules: { required: true } },
                {
                    field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 140,
                    editType: 'datepickeredit', format: 'yMd', validationRules: { date: true }
                },
                {
                    field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 90, editType: 'numericedit',
                    validationRules: { number: true, min: 0 }, edit: { params: { format: 'n' } }
                },
                {
                    field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 90, editType: 'numericedit',
                    validationRules: { number: true, min: 0 }, edit: { params: { format: 'n' } }
                },
                {
                    headerText: 'Manage Records', width: 130,
                    commands: [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
                        { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
                        { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
                        { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }]
                }
            ]
        });
    grid.appendTo('#Grid');
};

