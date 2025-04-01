import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Day, Week, Month, Resize, DragAndDrop, EventRenderedArgs, CellClickEventArgs, ActionEventArgs } from '@syncfusion/ej2-schedule';
import { extend } from '@syncfusion/ej2-base';
import { Toast } from '@syncfusion/ej2-notifications';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { applyCategoryColor } from './helper';
import * as dataSource from './datasource.json';

/**
 * schedule holiday calendar sample
 */
Schedule.Inject(Day, Week, Month, Resize, DragAndDrop);

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Record<string, any>[] = extend([], (dataSource as any).scheduleEvent, null, true
    ) as Record<string, any>[];
    let holidayList: Record<string, any>[] = extend([], (dataSource as any).holidayList, null, true
    ) as Record<string, any>[];

    let scheduleObj: Schedule = new Schedule({
        height: '100%',
        width: '100%',
        rowAutoHeight: true,
        selectedDate: new Date(2024, 7, 5),
        cssClass:"schedule-holiday-calendar",
        cellClick: clickOnHoliday,
        cellDoubleClick: clickOnHoliday,
        resizeStop: onEventDragOrResize,
        dragStop: onEventDragOrResize,
        actionBegin: onActionBegin,
        eventRendered: onEventRender,
        views: ['Month'],
        currentView: 'Month',
        eventSettings: {
            dataSource: (data as Record<string, any>[]).concat(holidayList),
        }
    });
    scheduleObj.appendTo('#Schedule');

    let holidayEventCollection: boolean = true;
    let holidayListCollection: boolean = true;

    let holidayCheckBoxObj: CheckBox = new CheckBox({
        label: 'Holiday events',
        checked: holidayListCollection,
        change: updateHolidayListCollection,
    });
    holidayCheckBoxObj.appendTo('#holiday-list');

    let eventCheckBoxObj: CheckBox = new CheckBox({
        label: 'Scheduling event on holiday',
        checked: holidayEventCollection,
        change: updateHolidayEventCollection,
    });
    eventCheckBoxObj.appendTo('#event-schedule');

    let toast: Toast = new Toast({
        title: 'Information!',
        cssClass: 'e-toast-info',
        target: '.e-schedule',
        icon: 'e-info toast-icons',
        position: { X: 'Right', Y: 'Top' },
    });
    toast.appendTo('#schedule-reminder');

    function updateHolidayEventCollection(args: ChangeEventArgs) {
        holidayEventCollection = args.checked as boolean;
        scheduleObj.refreshEvents();
    }

    function updateHolidayListCollection(args: ChangeEventArgs) {
        holidayListCollection = args.checked as boolean;
        scheduleObj.refreshEvents();
    }

    function isEventWithinHolidayRange(eventStartDate: Date, eventEndDate: Date) {
        let isInRange: boolean = false;
        for (let holiday of holidayList) {
            const holidayStartDate: Date = new Date(holiday.StartTime);
            const holidayEndDate: Date = new Date(holiday.EndTime);
            if (
                (eventStartDate >= holidayStartDate &&
                    eventStartDate <= holidayEndDate) ||
                (eventEndDate >= holidayStartDate && eventEndDate <= holidayEndDate) ||
                (eventStartDate <= holidayStartDate && eventEndDate >= holidayEndDate)
            ) {
                isInRange = true;
                break;
            }
        }
        return isInRange;
    }

    function showToastForAction(actionName: string, holidayDateRange: boolean) {
        if (!holidayDateRange) return;
        const messages: { [key: string]: string } = {
            resizeStop: 'You cannot resize an event within the holiday date range',
            dragStop: 'You cannot drop an event within the holiday date range',
            eventCreate: 'You cannot add an event within the holiday date range',
            eventChange: 'You cannot edit an event within the holiday date range',
        };
        if (messages[actionName]) {
            toast.content = messages[actionName];
            toast.show();
        }
    }

    function onActionBegin(args: ActionEventArgs) {
        const { requestType, data } = args;
        const isCreateOrChange = requestType === 'eventCreate' || requestType === 'eventChange';
        if (isCreateOrChange) {
            const eventData = requestType === 'eventCreate' ? (data as any[])[0] : (data as any);
            const adjustedEndTime = eventData.IsAllDay
                ? new Date(eventData.EndTime.setMinutes(eventData.EndTime.getMinutes() - 1))
                : eventData.EndTime;
            const isHolidayDateRange = !holidayEventCollection &&
                !eventData.RecurrenceRule &&
                isEventWithinHolidayRange(eventData.StartTime, adjustedEndTime);
            args.cancel = isHolidayDateRange;
            showToastForAction(requestType, isHolidayDateRange);
        }
    }

    function onEventRender(args: EventRenderedArgs) {
        const event = args.data;
        if (!holidayEventCollection) {
            if (!event.isHoliday && event.IsAllDay) {
                event.EndTime.setMinutes(event.EndTime.getMinutes() - 1);
            }
            args.cancel =
                !event.isHoliday &&
                isEventWithinHolidayRange(event.StartTime, event.EndTime);
        }
        if (event.isHoliday && !holidayListCollection) {
            args.cancel = true;
        }
        applyCategoryColor(args, scheduleObj.currentView);
    }

    function clickOnHoliday(args: CellClickEventArgs) {
        args.cancel =
            !holidayEventCollection &&
            isEventWithinHolidayRange(
                args.startTime,
                args.endTime.setMinutes(args.endTime.getMinutes() - 1) as any
            );
    }

    function onEventDragOrResize(args: any) {
        const isHolidayDateRange =
            !holidayEventCollection &&
            isEventWithinHolidayRange(args.data.StartTime,
                args.data.EndTime.setMinutes(args.data.EndTime.getMinutes() - 1) as any);
        args.cancel = isHolidayDateRange;
        showToastForAction(args.name, isHolidayDateRange);
    }
};
