import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, DayMarkers } from '@syncfusion/ej2-gantt';
import {NumericTextBox} from '@syncfusion/ej2-inputs';
import { workTimeRange } from './data-source';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Default Gantt sample
 */

Gantt.Inject(Selection, DayMarkers);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: workTimeRange,
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
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
            columns: [
                { field: 'TaskName',headerText: 'Name', width: 270 },
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
            projectStartDate: new Date('04/02/2025'),
            projectEndDate: new Date('04/28/2025')
        });
    gantt.appendTo('#WorkTimeRange');
    let workDays: any = [
        { id: 'Monday', day: 'Monday' },
        { id: 'Tuesday', day: 'Tuesday' },
        { id: 'Wednesday', day: 'Wednesday' },
        { id: 'Thursday', day: 'Thursday' },
        { id: 'Friday', day: 'Friday' },
    ];
     const change1: any = (args: any) => {
        let startTime = ((<any>document.getElementById('WorkStartTime'))).ej2_instances[0].value;
        let endTime = ((<any>document.getElementById('WorkEndTime'))).ej2_instances[0].value;
        if (startTime >= endTime) {
            if(startTime < 24) {
               ((<any>document.getElementById('WorkEndTime'))).ej2_instances[0].value = startTime + 1.00;
            }
            else {
                ((<any>document.getElementById('WorkEndTime'))).ej2_instances[0].value = 0.00;
            }
        }
    };
    const change2: any = (args: any) => {
        let startTime = ((<any>document.getElementById('WorkStart'))).ej2_instances[0].value;
        let endTime = ((<any>document.getElementById('WorkEnd'))).ej2_instances[0].value;
        if (startTime >= endTime) {
            if(startTime < 24) {
               ((<any>document.getElementById('WorkEnd'))).ej2_instances[0].value = startTime + 1.00;
            }
            else {
                ((<any>document.getElementById('WorkEnd'))).ej2_instances[0].value = 0.00;
            }
        }
    };
    let workStartTime: NumericTextBox = new NumericTextBox({
        min: 0,
        max: 24,
        value: 8,
        showSpinButton: true,
        change: change1.bind(this),
        step: 0.5
    });
    workStartTime.appendTo('#WorkStartTime');
    let workEndTime: NumericTextBox  = new NumericTextBox({
        min: 0,
        max: 24,
        value: 17,
        showSpinButton: true,
        change: change1.bind(this),
        step: 0.5
    });
    workEndTime.appendTo('#WorkEndTime');
    const select: any = (args: any) => {
        let startTime: number = 8;
        let endTime: number = 17;
        for(let i=0;i<gantt.weekWorkingTime.length;i++) {
            if(gantt.weekWorkingTime[i].dayOfWeek === args.item.innerText) {
                startTime = gantt.weekWorkingTime[i].timeRange[0].from;
                endTime = gantt.weekWorkingTime[i].timeRange[0].to;
                break;
            }
        }
        (document.getElementById('WorkStart') as any).ej2_instances[0].value = startTime;
        (document.getElementById('WorkEnd') as any).ej2_instances[0].value = endTime;
    };
    let checkList1: DropDownList  =  new DropDownList ({
        dataSource: workDays,
        value: 'Monday',
        width:'100%',
        fields: { text: 'day', value: 'id' },
        select: select.bind(this),
        popupHeight: '350px'
    });
    checkList1.appendTo('#Days');
    let workStartTime1: NumericTextBox = new NumericTextBox({
        min: 0,
        max: 24,
        value: 8,
        showSpinButton: true,
        change: change2.bind(this),
        step: 0.5
    });
    workStartTime1.appendTo('#WorkStart');
    let workEndTime1: NumericTextBox  = new NumericTextBox({
        min: 0,
        max: 24,
        value: 17,
        showSpinButton: true,
        change: change2.bind(this),
        step: 0.5
    });
    workEndTime1.appendTo('#WorkEnd');
    let perform: Button = new Button();
    perform.appendTo('#perform');
    document.getElementById('perform').onclick = () => {
        let selectedDay = ((<any>document.getElementById('Days'))).ej2_instances[0].value;
        let startTime = ((<any>document.getElementById('WorkStart'))).ej2_instances[0].value;
        let endTime = ((<any>document.getElementById('WorkEnd'))).ej2_instances[0].value;
        let workingTime: any = [];
        let weekWorkingTime = gantt.weekWorkingTime;
        let isUpdated = false;
        for (let i = 0; i < weekWorkingTime.length; i++) {
            workingTime.push({ dayOfWeek: weekWorkingTime[i].dayOfWeek, timeRange: weekWorkingTime[i].timeRange });
        }
        for (let i = 0; i < workingTime.length; i++) {
            if (workingTime[i].dayOfWeek === selectedDay) {
                workingTime[i].dayOfWeek = workingTime[i].dayOfWeek;
                workingTime[i].timeRange = [{ from: startTime, to: endTime }]
                isUpdated = true;
                break;
            }
        }
        if (!isUpdated) {
            workingTime.push({ dayOfWeek: selectedDay, timeRange: [{ from: startTime, to: endTime }] });
        }
        gantt.weekWorkingTime = workingTime;
    };
    let update: Button = new Button();
    update.appendTo('#update');
    document.getElementById('update').onclick = () => {
        let startTime = ((<any>document.getElementById('WorkStartTime'))).ej2_instances[0].value;
        let endTime = ((<any>document.getElementById('WorkEndTime'))).ej2_instances[0].value;
        let workingTime = [{ from: startTime, to: endTime }];
        gantt.dayWorkingTime = workingTime;
    };
};
