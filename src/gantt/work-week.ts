import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, DayMarkers } from '@syncfusion/ej2-gantt';
import { projectNewData } from './data-source';
import { extend } from '@syncfusion/ej2-base';
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import {  SelectEventArgs, RemoveEventArgs  } from '@syncfusion/ej2-dropdowns';

/**
 * Default Gantt sample
 */

Gantt.Inject(Selection, DayMarkers);
MultiSelect.Inject(CheckBoxSelection);

(window as any).default = (): void => {
    loadCultureFiles();
    let workDays: any = [
        { id: 'Sunday', day: 'Sunday' },
        { id: 'Monday', day: 'Monday' },
        { id: 'Tuesday', day: 'Tuesday' },
        { id: 'Wednesday', day: 'Wednesday' },
        { id: 'Thursday', day: 'Thursday' },
        { id: 'Friday', day: 'Friday' },
        { id: 'Saturday', day: 'Saturday' },
    ];
    let gantt: Gantt = new Gantt(
        {
            dataSource: projectNewData,
            height: '450px',
            highlightWeekends: true,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                child: 'subtasks'
            },
            treeColumnIndex: 1,
            columns: [
                { field: 'TaskID', width: 80 },
                { field: 'TaskName',headerText: 'Name', width: 250 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Predecessor' },
                { field: 'Progress' },
            ],
            labelSettings: {
                leftLabel: 'TaskName'
            },
            workWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            projectStartDate: new Date('03/24/2019'),
            projectEndDate: new Date('07/06/2019')
        });
    gantt.appendTo('#WorkWeek');
    const select: any = (args: SelectEventArgs) => {
        let workingDays: any = Object[7];
        let fieldInstance: MultiSelect = ((<any>document.getElementById('WorkingDays'))).ej2_instances[0] as MultiSelect;
        workingDays = extend([], fieldInstance.value, [], true);
        workingDays.push(args.item.innerText);
        gantt.workWeek = workingDays;
    };
    const removed: any = (args: RemoveEventArgs) => {
        let index: number = gantt.workWeek.indexOf(args.item.innerText);
        let fieldInstance: MultiSelect = ((<any>document.getElementById('WorkingDays'))).ej2_instances[0] as MultiSelect;
        let workingDays: any = Object[7];
        if (index !== -1) {
            workingDays = fieldInstance.value;
            gantt.workWeek = workingDays;
        }
    };
    let checkList: MultiSelect =  new MultiSelect({
        dataSource: workDays,
        select: select.bind(this),
        removed: removed.bind(this),
        value: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        fields: { text: 'day', value: 'id' },
        mode: 'CheckBox',
        showDropDownIcon: true,
        popupHeight: '350px'
    });
    checkList.appendTo('#WorkingDays');
};