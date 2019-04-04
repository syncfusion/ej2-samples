import { Gantt, DayMarkers, Selection } from '@syncfusion/ej2-gantt';
import { customizedData } from './data-source';

/**
 * Taskbar template Gantt sample
 */

Gantt.Inject(DayMarkers, Selection);
(window as any).default = (): void => {
    let gantt: Gantt = new Gantt(
        {
            dataSource: customizedData,
            dateFormat: 'hh:mm a',
            allowSelection: true,
            taskFields: {
                id: 'TaskId',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                dependency: 'Predecessor'
            },
            columns: [
                { field: 'TaskId', headerText: 'Event Id' },
                { field: 'TaskName', headerText: 'Event Name', width: '250', clipMode: 'EllipsisWithTooltip' },
                { field: 'StartDate', headerText: 'Start Time' },
                { field: 'EndDate', headerText: 'End Time' },
                { field: 'Winner', headerText: 'Winner' },
                { field: 'Movie', headerText: 'Movie' },
                { field: 'Performance', headerText: 'Moments / Performance Details' }
            ],
            splitterSettings: {
                columnIndex: 1
            },
            treeColumnIndex: 1,
            rowHeight: 75,
            taskbarHeight: 65,
            dayWorkingTime: [{ from: 0, to: 24 }],
            durationUnit: 'Minute',
            timelineSettings: {
                timelineUnitSize: 60,
                topTier: {
                    unit: 'Hour',
                    format: 'MMM dd, yyyy'
                },
                bottomTier: {
                    unit: 'Minutes',
                    count: 2,
                    format: 'h:mm a'
                },
            },
            eventMarkers: [
                {
                    day: new Date('03/05/2018 07:09:00 PM'),
                    label: 'Performance'
                }, {
                    day: new Date('03/05/2018 07:46:00 PM'),
                    label: 'Moments'
                }, {
                    day: new Date('03/05/2018 07:59:00 PM'),
                    label: 'Performance'
                }, {
                    day: new Date('03/05/2018 08:08:00 PM'),
                    label: 'Moments'
                }, {
                    day: new Date('03/05/2018 08:24:00 PM'),
                    label: 'Moments'
                }, {
                    day: new Date('03/05/2018 08:31:00 PM'),
                    label: 'Performance'
                }, {
                    day: new Date('03/05/2018 08:47:00 PM'),
                    label: 'Moments'
                }
            ],
            height: '450px',
            taskbarTemplate: '#childtask',
            milestoneTemplate: '#milestone',
            labelSettings: {
                leftLabel: 'TaskName',
            },
            tooltipSettings: {
                taskbar: '#tooltip',
            },
            projectStartDate: new Date('03/05/2018 06:00 PM'),
            projectEndDate: new Date('03/05/2018 09:50 PM')
        });
    gantt.appendTo('#TaskbarTemplate');
};
