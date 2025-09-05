/**
 * resource.ts file
 */
import { loadCultureFiles } from '../common/culture-loader';
/**
 * resource.ts file
 */
import { resourceAllocationData, resourceAllocationResources } from './data-source';

import { Gantt, Selection, DayMarkers, Toolbar, Edit } from '@syncfusion/ej2-gantt';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DataManager } from '@syncfusion/ej2-data';

Gantt.Inject(Selection, DayMarkers, Toolbar, Edit);
(window as any).default = (): void => {
    loadCultureFiles();
    let dropdownlistObj: DropDownList;
    let gantt: Gantt = new Gantt(
        {
            dataSource: resourceAllocationData,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                duration: 'Duration',
                progress: 'Progress',
                resourceInfo: 'resources',
                work: 'work',
                child: 'subtasks',
                type: 'taskType'
            },
            taskType:'FixedWork',
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                allowTaskbarEditing: true,
                showDeleteConfirmDialog: true
            },
            resources: resourceAllocationResources,
            resourceFields: {
                id: 'resourceId',
                name: 'resourceName',
                unit: 'unit'
            },
            queryTaskbarInfo: function (args: any) {
                if (args.data.ganttProperties.resourceNames) {
                    let resourceName: string = args.data.ganttProperties.resourceNames;
                    if (resourceName.split('[')[0].includes('Rose Fuller')) {
                        args.taskbarBgColor = '#539ed6';
                        args.milestoneColor = '#539ed6';
                        args.progressBarBgColor = '#1c5d8e';
                        args.taskbarBorderColor = '#1c5d8e';
                        if (args.data.ganttProperties.progress === 0) {
                            args.taskLabelColor = 'black';
                        }
                    } else if (resourceName.split('[')[0].includes('Van Jack')) {
                        args.taskbarBgColor = '#ff826b';
                        args.milestoneColor = '#ff826b';
                        args.progressBarBgColor = '#b24531';
                        args.taskbarBorderColor = '#b24531';
                        if (args.data.ganttProperties.progress === 0) {
                            args.taskLabelColor = 'black';
                        }
                    } else if (resourceName.split('[')[0].includes('Bergs Anton')) {
                        args.taskbarBgColor = '#ef6fbb';
                        args.milestoneColor = '#ef6fbb';
                        args.progressBarBgColor = '#a53576';
                        args.taskbarBorderColor = '#a53576';
                        if (args.data.ganttProperties.progress === 0) {
                            args.taskLabelColor = 'black';
                        }
                    } else if (resourceName.split('[')[0].includes('Fuller King')) {
                        args.taskbarBgColor = '#87b972';
                        args.milestoneColor = '#87b972';
                        args.progressBarBgColor = '#4a7537';
                        args.taskbarBorderColor = '#4a7537';
                        if (args.data.ganttProperties.progress === 0) {
                            args.taskLabelColor = 'black';
                        }
                    } else if (resourceName.split('[')[0].includes('Tamer Vinet')) {
                        args.taskbarBgColor = '#a496cf';
                        args.milestoneColor = '#a496cf';
                        args.progressBarBgColor = '#635688';
                        args.taskbarBorderColor = '#635688';
                        if (args.data.ganttProperties.progress === 0) {
                            args.taskLabelColor = 'black';
                        }
                    }
                }
                if (args.taskbarType === 'ParentTask') {
                    args.taskbarBgColor = '#adadad';
                    args.progressBarBgColor = '#6b6b6b';
                    if (args.data.ganttProperties.progress === 0) {
                        args.taskLabelColor = 'black';
                    }
                }
            },
            workUnit: 'Hour',
            editDialogFields: [
                { type: 'Resources' }
            ],
            addDialogFields: [
                { type: 'Resources' }
            ],
            cellEdit: function (args: any) {
                // Restrict editing based on row data
                if (args.rowData.TaskID === 1 || args.rowData.TaskID === 5) {
                    args.cancel = true; // Cancel editing for this specific cell
                }
            },
            actionBegin: function (args: any) {
                if (args.requestType === 'beforeOpenEditDialog' || args.requestType === 'beforeOpenAddDialog') {
                    // Restrict editing based on row data for dialog
                    if (args.rowData.TaskID === 1 || args.rowData.TaskID === 5) {
                        args.cancel = true; // Cancel editing for this specific row dialog
                    }
                    args.Resources.selectionSettings = {};
                    args.Resources.columns.splice(0, 1);
                }
            },
            actionComplete: function(args: any) {
                if (args.requestType === 'add' && !args.data.TaskName) {
                    let taskName: string = 'Task Name ' + args.data.TaskID;
                    args.data.TaskName = taskName;
                    args.data.ganttProperties.taskName = taskName;
                    args.data.taskData.TaskName = taskName;
                }
            },
            toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
            allowSelection: true,
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
            treeColumnIndex: 1,
            highlightWeekends: true,
            columns: [
                { field: 'TaskID', visible: false },
                { field: 'TaskName', headerText: 'Task Name', width: '180' },
                {
                    field: 'resources',
                    headerText: 'Resources',
                    width: '190',
                    template: '#resColumnTemplate',
                    editType: "dropdownedit",
                    edit: {
                        read: function () {
                            // Get the selected value from the dropdown
                            let value = dropdownlistObj.value;
                            if (value == null) {
                                // If no value is selected, retain the existing resource(s)
                                value = gantt.treeGridModule.currentEditRow[gantt.taskFields.resourceInfo];
                            } else {
                                // Update the resource info with the selected value
                                gantt.treeGridModule.currentEditRow[gantt.taskFields.resourceInfo] = [value];
                            }
                            return value;
                        },
                        destroy: function () {
                            // Clean up the dropdown instance
                            dropdownlistObj.destroy();
                        },
                        write: function (args: any) {
                            // Ensure the currentEditRow object is initialized
                            gantt.treeGridModule.currentEditRow = {};
                
                            // Retrieve the existing resource(s) from the row data or set default
                            let existingResourceIds: any = gantt.treeGridModule.getResourceIds(args.rowData);
                            let selectedValue: any = (existingResourceIds && existingResourceIds.length > 0) ? existingResourceIds[0] : null;
                
                            // Initialize the DropDownList
                            dropdownlistObj = new DropDownList({
                                dataSource: new DataManager(gantt.resources),
                                fields: { text: gantt.resourceFields.name, value: gantt.resourceFields.id },
                                enableRtl: gantt.enableRtl,
                                popupHeight: '350px',
                                // Set the existing resource(s) as the selected value
                                value: selectedValue,
                            });
                            // Append the dropdown to the element
                            dropdownlistObj.appendTo(args.element);
                        },
                    },
                },
                { field: 'work', width: '110' },
                { field: 'Duration', width: 150 },
                { field: 'taskType', headerText: 'Task Type', width: 150}
            ],
            labelSettings: {
                rightLabel: 'resources',
                taskLabel: '${Progress}%'
            },
            splitterSettings: {
                columnIndex: 2
            },
             projectStartDate: new Date('03/26/2025'),
            projectEndDate: new Date('07/28/2025')
        });
    gantt.appendTo('#resource');
};