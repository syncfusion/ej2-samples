import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, Toolbar, DayMarkers, Edit, Filter, Sort, ContextMenu } from '@syncfusion/ej2-gantt';
import { WBSData } from './data-source';
import { CheckBox, Switch } from '@syncfusion/ej2-buttons';
/**
 * Column WBS Gantt sample
 */

Gantt.Inject(Selection, Toolbar, DayMarkers, Edit, Filter, Sort, ContextMenu);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: WBSData,
            allowSorting: true,
            enableContextMenu: true,
            enableWBS: true,
            enableAutoWbsUpdate: true,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                parentID: 'ParentId'
            },
            treeColumnIndex: 2,
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                allowTaskbarEditing: true,
                showDeleteConfirmDialog: true
            },
            columns: [
                { field: 'TaskID', headerText: 'Task ID', visible: false },
                { field: 'WBSCode', headerText: 'WBS Code',width: '150px'  },
                { field: 'TaskName', headerText: 'Task Name', allowReordering: false, width: '260px'  },
                { field: 'StartDate', headerText: 'Start Date', width: '140px'  },
                { field: 'WBSPredecessor', headerText: 'WBS Predecessor',width: '190px' },
                { field: 'Duration', headerText: 'Duration', allowEditing: false , width: '130px'},
                { field: 'Progress', headerText: 'Progress'},
            ],
            eventMarkers: [
               {
                   day: new Date('04/2/2024'),
                   label: 'Project Initiation'
               }
            ],
            dataBound: () => {
               (gantt.element.getElementsByClassName('e-span-label')[0] as HTMLElement).style.top = '125px';
               (gantt.element.getElementsByClassName('e-gantt-right-arrow')[0] as HTMLElement).style.top = '131px';
            },
            toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
            allowPdfExport: true,
            allowSelection: true,
            splitterSettings: {
                columnIndex: 4,
            },
            selectionSettings: {
                mode: 'Row',
                type: 'Single',
                enableToggle: false
            },
            tooltipSettings: {
                showTooltip: true
            },
            filterSettings: {
                type: 'Menu'
            },
            allowFiltering: true,
            gridLines: "Both",
            highlightWeekends: true,
            timelineSettings: {
                showTooltip: true,
                topTier: {
                    unit: 'Week',
                    format: 'dd/MM/yyyy'
                },
                bottomTier: {
                    unit: 'Day',
                    count: 1
                }
            },
            labelSettings: {
                taskLabel: '${Progress}%'
            },
            taskbarHeight: 20,
            rowHeight: 40,
            height: '550px',
            allowUnscheduledTasks: true,
            projectStartDate: new Date('03/31/2024'),
            projectEndDate: new Date('05/30/2024'),
        });
    gantt.appendTo('#ColumnWbs');

let columnAutoUpdate: Switch = new Switch({ value: 'autoUpdateWbs', checked: true, change: autoUpdate });
columnAutoUpdate.appendTo('#unchecked');

function autoUpdate(args: any) {
    let gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
    gantt.enableAutoWbsUpdate = args.checked;
}

};