import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Month, Resize, DragAndDrop, ScheduleModel, DragEventArgs } from '@syncfusion/ej2-schedule';
import { closest, extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';

Schedule.Inject( Month, Resize, DragAndDrop);

/**
 * Drag and drop from one scheduler to another scheduler
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // custom code start
    // tslint:disable-next-line:max-func-body-length
    
    function handleDragStop( args: any, sourceSchedule: Schedule, targetSchedule: Schedule, targetSelector: string ): void {
        if (closest(args.event.target as Element, targetSelector)) {
            args.cancel = true;
            const cellData = targetSchedule.getCellDetails(args.event.target as Element);
            if (cellData) {
                sourceSchedule.deleteEvent(args.data.Id);
                const resourceDetails = targetSchedule.getResourcesByIndex(cellData.groupIndex);
                const eventData = {
                    Id: targetSchedule.getEventMaxID(),
                    Subject: args.data.Subject,
                    StartTime: args.data.StartTime,
                    EndTime: args.data.EndTime,
                    IsAllDay: args.data.IsAllDay,
                    Location: args.data.Location,
                    Description: args.data.Description,
                    StartTimezone: args.data.StartTimezone,
                    EndTimezone: args.data.EndTimezone,
                    TaskId: resourceDetails.resourceData.id
                };
                targetSchedule.addEvent(eventData);
                const classElement = sourceSchedule.element.querySelector('.e-selected-cell') as HTMLElement;
                if (classElement) {
                    classElement.classList.remove('e-selected-cell');
                }
            }
        }
    }
    
    const commonScheduleOptions: ScheduleModel = {
        width: '100%',
        height: '500px',
        selectedDate: new Date(2023, 0, 4),
        views: ['Month'],
        rowAutoHeight: true,
        eventDragArea: '.content-wrapper',
        group: {
            resources: ['Employees'],
        },
        dragStop: (args: DragEventArgs) =>
            handleDragStop(args as any, firstScheduleObj, secondScheduleObj, '#second-schedule'),
    };
    
    const firstScheduleOptions: ScheduleModel = {
        ...commonScheduleOptions,
        resources: [
            {
                field: 'TaskId',
                title: 'Employee',
                name: 'Employees',
                dataSource: [
                    { text: 'Steven', id: 1, color: '#7fa900' }
                ],
                textField: 'text',
                idField: 'id',
                colorField: 'color',
            },
        ],
        eventSettings: {
            dataSource: <Object[]>extend([], (dataSource as any).resourceData, null, true),
        }
    };
    
    const secondScheduleOptions: ScheduleModel = {
        ...commonScheduleOptions,
        resources: [
            {
                field: 'TaskId',
                title: 'Employee',
                name: 'Employees',
                dataSource: [
                    { text: 'John', id: 2, color: '#ffb74d' },
                ],
                textField: 'text',
                idField: 'id',
                colorField: 'color',
            },
        ],
        eventSettings: {
            dataSource: extend([], (dataSource as any).timelineResourceData, null, true) as Record<string, any>[],
        },
        dragStop: (args: DragEventArgs) =>
            handleDragStop(args as any, secondScheduleObj, firstScheduleObj, '#first-schedule'),
    };
    
    const firstScheduleObj = new Schedule(firstScheduleOptions, '#first-schedule');
    const secondScheduleObj = new Schedule(secondScheduleOptions, '#second-schedule');
};
