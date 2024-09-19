import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, TimelineViews, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { extend } from '@syncfusion/ej2-base';
import {  Grid, Page, Selection, RowDD, Sort, Filter, Edit,RowDropEventArgs } from '@syncfusion/ej2-grids';
import * as dataSource from './datasource.json';

Schedule.Inject(TimelineViews, Resize, DragAndDrop);
Grid.Inject(Page, Selection, RowDD, Sort, Filter, Edit);

/**
 * Schedule drag and drop from schedule to grid and grid to schedule
 */

(window as any).default = (): void => {
    loadCultureFiles();

    const data = extend([], (dataSource as any).resourceData.concat((dataSource as any).timelineResourceData), null, true);

    const gridData = [
        { Task: 'Test report validation', Duration: '3 Hours' },
        { Task: 'Timeline estimation', Duration: '4 Hours' },
        { Task: 'Workflow Analysis', Duration: '2 Hours' },
        { Task: 'Quality Analysis', Duration: '5 Hours' },
        { Task: 'Cross-browser testing', Duration: '1 Hour' },
        { Task: 'Resolution-based testing', Duration: '3 Hours' },
        { Task: 'Project Preview', Duration: '6 Hours' },
        { Task: 'Developers Meeting', Duration: '2 Hours' },
        { Task: 'Test case correction', Duration: '7 Hours' },
        { Task: 'Debugging', Duration: '4 Hours' },
        { Task: 'Exception handling', Duration: '5 Hours' },
        { Task: 'Bug fixing', Duration: '1 Hour' },
        { Task: 'Bug Automation', Duration: '3 Hours' },
        { Task: 'Bug fixing', Duration: '6 Hours' },
    ];    

    function calculateEventDuration(startTime: Date, endTime: Date): string {
        const durationInMilliseconds = endTime.getTime() - startTime.getTime();
        const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
        return durationInHours + ' Hours';
    }

    function handleDragStop(args: any, scheduleObj: Schedule, gridObj: Grid): void {
        if ((args.event.target as HTMLElement).closest('#Grid')) {
            scheduleObj.deleteEvent(args.data.Id as string);
            const startTime = new Date(args.data.StartTime as string);
            const endTime = new Date(args.data.EndTime as string);
            const formattedDuration = calculateEventDuration(startTime, endTime);
            const gridRecord = { Task: args.data.Subject, Duration: formattedDuration };
            gridObj.addRecord(gridRecord);
        }
    }
    const scheduleObj: Schedule = new Schedule({
        cssClass: 'grid-schedule',
        width: '100%',
        height: '100%',
        eventDragArea: '.content-wrapper',
        selectedDate: new Date(2023, 0, 4),
        rowAutoHeight: true,
        currentView: 'TimelineDay',
        timeScale: { slotCount: 1, interval: 60 },
        views: [{ option: 'TimelineDay' }],
        group: { enableCompactView: false, resources: ['Names'] },
        resources: [
            {
                field: 'TaskId',
                title: 'Name',
                name: 'Names',
                dataSource: [
                    { text: 'Nancy', id: 1, color: '#df5286' },
                    { text: 'Steven', id: 2, color: '#7fa900' },
                    { text: 'Robert', id: 3, color: '#ea7a57' },
                    { text: 'Smith', id: 4, color: '#5978ee' },
                    { text: 'Michael', id: 5, color: '#00bdae' },
                    { text: 'Root', id: 6, color: '#f57b42' },
                    { text: 'John', id: 7, color: '#1aaa55' },
                    { text: 'Stellah', id: 8, color: '#ffb74d' },
                    { text: 'Chirish', id: 9, color: '#7460ee' },
                    { text: 'Megan', id: 10, color: '#c0ca33' },
                ],
                textField: 'text',
                idField: 'id',
                colorField: 'color',
            },
        ],
        eventSettings: { dataSource: data as Record<string, any>[] },
        dragStop: (args: any) => handleDragStop(args, scheduleObj as any, gridObj),
        dataBound: () => {
            let resourceDataCounter = 0;
            scheduleObj.element.querySelectorAll('.e-resource-cells .e-resource-text').forEach((cell) => {
                const workcells = document.querySelector('.e-work-cells');
                if (!workcells) return;
                const timestamp = Number(workcells.getAttribute('data-date'));
                const startDate = new Date(timestamp);
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 1);
                const events = (scheduleObj as any).getEvents(startDate, endDate, true);
                if (resourceDataCounter < (scheduleObj as any).resourceCollection[0].dataSource.length) {
                    resourceDataCounter++;
                }
                const resourceEvents = events.filter((event: any) => event.TaskId === resourceDataCounter);
                const currentText = (cell as HTMLElement).innerText;
                const eventCount = resourceEvents.length;
                const resourceName = currentText.split('(')[0].trim();
                (cell as HTMLElement).innerText = resourceName + ' (' + eventCount + ')';
            });
        },
    });
    scheduleObj.appendTo('#Schedule');

    const gridObj: Grid = new Grid({
        dataSource: gridData,
        cssClass: 'drag-grid',
        width: '280px',
        height: '100%',
        allowRowDragAndDrop: true,
        columns: [
            { field: 'Task', headerText: 'Task', width: 50 },
            { field: 'Duration', headerText: 'Duration', width: 30 },
        ],
        editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
        rowDropSettings: { targetID: 'Schedule' },
        rowDrag: (args: any) => {
            args.cancel = true;
        },
        rowDrop: (args: RowDropEventArgs) => {
            args.cancel = true;
            const scheduleElement = (args.target as HTMLElement).closest('.e-content-wrap');
            if (scheduleElement && (args.target as HTMLElement).classList.contains('e-work-cells')) {
                const cellData = (scheduleObj as any).getCellDetails(args.target as HTMLElement);
                const resourceDetails = (scheduleObj as any).getResourcesByIndex(cellData.groupIndex as number);
                const durationStr = (args as any).data[0].Duration as string;
                const durationHours = parseInt(durationStr.split(' ')[0], 10);
                const startTime = new Date(cellData.startTime as Date);
                const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);
                const eventData = {
                    Id: (scheduleObj as any).getEventMaxID(),
                    Subject: (args as any).data[0].Task as string,
                    StartTime: startTime,
                    EndTime: endTime,
                    IsAllDay: cellData.isAllDay,
                    TaskId: resourceDetails.resourceData.id as number,
                };
                (scheduleObj as any).addEvent(eventData);
                gridObj.deleteRecord((args as any).data[0]);
            }
        },
        dataBound: () => {
            if (scheduleObj) {
                const selectedCells = (scheduleObj as any).element.querySelectorAll('.e-selected-cell');
                selectedCells.forEach((cell: Element) => {
                    cell.classList.remove('e-selected-cell');
                });
            }
        }
    });
    gridObj.appendTo('#Grid');
};
