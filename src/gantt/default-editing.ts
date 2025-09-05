import { loadCultureFiles } from '../common/culture-loader';

import { Gantt, Edit, Selection, Toolbar, DayMarkers } from '@syncfusion/ej2-gantt';
import { editingData, editingResources } from './data-source';

/**
 * Editing Gantt sample
 */
Gantt.Inject(Edit, Selection, Toolbar, DayMarkers);
(window as any).default = (): void => {
    loadCultureFiles();
    let startDate :any;
    let gantt: Gantt = new Gantt(
        {
            dataSource: editingData,
            dateFormat: 'MMM dd, y',
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                parentID:'ParentId',
                notes: 'info',
                resourceInfo: 'resources'
            },
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                allowTaskbarEditing: true,
                showDeleteConfirmDialog: true
            },
            toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'],
            allowSelection: true,
            gridLines: 'Both',
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
            treeColumnIndex: 1,
            resourceFields: {
                id: 'resourceId',
                name: 'resourceName'
            },
            resources: editingResources,
            created:function() {
                if(document.querySelector('.e-bigger'))
                {
                  gantt.rowHeight=48;
                  gantt.taskbarHeight=28;
                }
            },
            highlightWeekends: true,
            timelineSettings: {
                topTier: {
                    unit: 'Week',
                    format: 'MMM dd, y',
                },
                bottomTier: {
                    unit: 'Day',
                },
            },
            enableHover: true,
            columns: [
                { field: 'TaskID', width: 80 },
                { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip', validationRules: { required: true, minLength: [5, 'Task name should have a minimum length of 5 characters'], } },
                { field: 'StartDate' },
                { field: 'EndDate', validationRules: { required: [customFn, 'Please enter a value greater than the start date.'] } },
                { field: 'Duration', validationRules: { required: true} },
                { field: 'Progress', validationRules: { required: true, min: 0, max: 100 } },
                { field: 'Predecessor' }
            ],
            labelSettings: {
                leftLabel: 'TaskName',
                rightLabel: 'resources'
            },
            editDialogFields: [
                { type: 'General', headerText: 'General' },
                { type: 'Dependency' },
                { type: 'Resources' },
                { type: 'Notes' },
            ],
            splitterSettings: {
                columnIndex: 3
            },
            actionBegin: function (args) {
                if (args.columnName === "EndDate" || args.requestType === "beforeOpenAddDialog" || args.requestType === "beforeOpenEditDialog") {
                    startDate = args.rowData.ganttProperties.startDate;
                }
                if (args.requestType === "taskbarediting" && args.taskBarEditAction === "ChildDrag") {
                    startDate = args.data.ganttProperties.startDate;
                }
            },
            projectStartDate: new Date('03/26/2025'),
            projectEndDate: new Date('09/10/2025'),
        });
    gantt.appendTo('#Editing');
    function customFn(args: any) {
        let endDate: Date;
        if (args.element && args.value) {
            let dateOptions = { format: gantt.dateFormat, type: 'dateTime', skeleton: 'yMd' };
            endDate =  gantt.globalize.parseDate(args.value, dateOptions);
            if (!startDate && gantt.editModule.dialogModule['beforeOpenArgs']) {
                startDate = gantt.editModule.dialogModule['beforeOpenArgs'].rowData['ganttProperties'].startDate;
                endDate = (gantt.editModule.dialogModule['beforeOpenArgs'].rowData['ganttProperties'].endDate);
            }
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
        }
        return startDate <= endDate;
    }
};
