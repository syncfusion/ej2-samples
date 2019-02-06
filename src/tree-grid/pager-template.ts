import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page, Toolbar, Filter, RowExpandedEventArgs, RowCollapsedEventArgs} from '@syncfusion/ej2-treegrid';
import { PageEventArgs } from '@syncfusion/ej2-grids';
import { sampleData } from './data-source';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { getValue } from '@syncfusion/ej2-base';
TreeGrid.Inject(Page, Toolbar, Filter);

/**
 * Pager Template TreeGrid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let flag: boolean = true;
    let updateTemplate: Function = () => {
        let numeric: NumericTextBox;
        this.numeric = new NumericTextBox({
            min: 1,
            max: 6,
            step: 1,
            width: '25%',
            format: '###.##',
            change: (args?: Object) => {
                let value: number = getValue('value', args);
                treegrid.goToPage(value);
            }
        });
        this.numeric.appendTo('#currentPage');
    };
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowPaging: true,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 140 },
                { field: 'taskName', headerText: 'Task Name', width: 190 },
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 140 },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 135, format: { skeleton: 'yMd', type: 'date' } }
            ],
            pageSettings: { pageCount: 2, template: '#template', pageSize: 7 },
            dataBound: () => {
                if (flag) {
                    flag = false;
                    updateTemplate();
                }
            },
            actionComplete: (args: PageEventArgs) => {
                if (args.requestType === 'paging') {
                    updateTemplate();
                }
            },
            expanded: (args?: RowExpandedEventArgs) => {
                updateTemplate();
            },
            collapsed: (args?: RowCollapsedEventArgs) => {
                updateTemplate();
            }
    });
    treegrid.appendTo('#TreeGrid');
};
