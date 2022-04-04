import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, DayMarkers } from '@syncfusion/ej2-gantt';
import {NumericTextBox} from '@syncfusion/ej2-inputs';
import { projectNewData } from './data-source';

/**
 * Default Gantt sample
 */

Gantt.Inject(Selection, DayMarkers);
(window as any).default = (): void => {
    loadCultureFiles();
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
            durationUnit: 'Hour',
            labelSettings: {
                leftLabel: 'TaskName'
            },
            timelineSettings: {
                topTier: {
                    unit: 'Day'
                },
                bottomTier: {
                    unit: 'Hour'
                }
            },
            projectStartDate: new Date('04/02/2019'),
            projectEndDate: new Date('07/06/2019')
        });
    gantt.appendTo('#WorkTimeRange');
    let workStartTime: NumericTextBox = new NumericTextBox({
        min: 0,
        max: 24,
        value: 8,
        change: updateTime,
        showSpinButton: true,
        step: 0.5
    });
    workStartTime.appendTo('#WorkStartTime');

    let workEndTime: NumericTextBox  = new NumericTextBox({
        min: 0,
        max: 24,
        value: 17,
        change: updateTime,
        showSpinButton: true,
        step: 0.5
    });
    workEndTime.appendTo('#WorkEndTime');


    let isTimeUpdated: boolean = false;
    function updateTime(): void {
        let defaultDate: string = '08/08/2016';
        let startDate: Date = new Date(defaultDate);
        let endDate: Date = new Date(defaultDate);
        let decPlace: number =  workStartTime.value - Math.floor(workStartTime.value);
        startDate.setHours(workStartTime.value);
        startDate.setMinutes(decPlace * 60);
        decPlace = workEndTime.value - Math.floor(workEndTime.value);
        endDate.setHours(workEndTime.value);
        endDate.setMinutes(decPlace * 60);
        /*Validate time value and update the time range*/
        if (startDate.getTime() < endDate.getTime() && isTimeUpdated === false) {
            let workingTime: any = [{ from: workStartTime.value, to: workEndTime.value }];
            gantt.dayWorkingTime = workingTime;
            isTimeUpdated = false;
        } else {
            isTimeUpdated = true;
            workStartTime.value = gantt.dayWorkingTime[0].from;
            workEndTime.value = gantt.dayWorkingTime[gantt.dayWorkingTime.length - 1].to;
        }
        isTimeUpdated = false;
    }

};
