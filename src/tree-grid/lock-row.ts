import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Toolbar, Edit, Page } from '@syncfusion/ej2-treegrid';
import { sampleData, lockRowDropDownData } from './data-source';
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { RowDataBoundEventArgs, BeginEditArgs } from '@syncfusion/ej2-grids';
import { addClass, removeClass } from '@syncfusion/ej2-base';

TreeGrid.Inject(Toolbar, Edit, Page);
/**
 * Auto wrap sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            childMapping: 'subtasks',
            height: 350,
            treeColumnIndex: 1,
            allowPaging: true,
            pageSettings: {pageSize: 2, pageSizeMode: 'Root'},
            editSettings: {
                allowEditing: true,
                mode: 'Row',
                newRowPosition: 'Child'

            },
            toolbar: ['Edit', 'Update', 'Cancel'],
            enableHover: false,
            rowDataBound: (args: RowDataBoundEventArgs) => {
                let key: string = 'taskID';
                if ((<Object[]>dropDownColumns.value).indexOf(args.data[key]) !== -1) {
                    addClass([args.row], 'disableRow');
                } else {
                    removeClass([args.row], 'disableRow');
                }
            },
            beginEdit: (args: BeginEditArgs) => {
                let key: string = 'taskID';
                if ((<Object[]>dropDownColumns.value).indexOf(args.rowData[key]) !== -1) {
                    args.cancel = true;
                }
            },
            columns: [
                {
                    field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, textAlign: 'Right',
                    validationRules: { required: true, number: true }, width: 100
                },
                { field: 'taskName', headerText: 'TaskName', editType: 'stringedit', width: 220, validationRules: {required: true}   },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 130, editType: 'datepickeredit',
                  format: 'yMd', edit: { params: { format:'M/d/yyyy',}}, validationRules: { date: ['M/d/yyyy', 'Please enter a valid date'] } },
                {
                    field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 140, editType: 'numericedit',
                    validationRules: { number: true, min: 0}, edit: { params: {  format: 'n'}}
                }
            ]
        });
    grid.appendTo('#Grid');

    MultiSelect.Inject(CheckBoxSelection);
    let dropDownColumns: MultiSelect = new MultiSelect({
        dataSource: lockRowDropDownData,
        mode: 'CheckBox',
        value: [2, 6],
        width: '150px',
        showDropDownIcon: true,
        popupHeight: '350px',
        select: (e: any) => {
            grid.refresh();
        },
        removed: (e: any) => {
            grid.refresh();
        }
    });
    dropDownColumns.appendTo('#lockrows');
};

