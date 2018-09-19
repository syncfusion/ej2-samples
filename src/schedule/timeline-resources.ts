import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import {
    Schedule, TimelineViews, TimelineMonth, ResourceDetails,
    PopupOpenEventArgs, RenderCellEventArgs, EventRenderedArgs, ActionEventArgs, Resize, DragAndDrop
} from '@syncfusion/ej2-schedule';
import { roomData } from './datasource';

/**
 * schedule resource header columns sample
 */
Schedule.Inject(TimelineViews, TimelineMonth, Resize, DragAndDrop);
// tslint:disable-next-line:max-func-body-length
this.default = () => {
    interface TemplateFunction extends Window {
        getRoomName?: Function;
        getRoomType?: Function;
        getRoomCapacity?: Function;
    }
    let isReadOnly: Function = (endDate: Date): boolean => {
        return (endDate < new Date(2018, 6, 31, 0, 0));
    };
    (window as TemplateFunction).getRoomName = (value: ResourceDetails) => {
        return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField];
    };
    (window as TemplateFunction).getRoomType = (value: ResourceDetails) => {
        return (value as ResourceDetails).resourceData.type;
    };
    (window as TemplateFunction).getRoomCapacity = (value: ResourceDetails) => {
        return (value as ResourceDetails).resourceData.capacity;
    };
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 7, 1),
        currentView: 'TimelineWeek',
        workHours: {
            start: '08:00',
            end: '18:00'
        },
        timeScale: {
            slotCount: 1,
            interval: 60
        },
        views: [
            { option: 'TimelineDay' },
            { option: 'TimelineWeek' }
        ],
        resourceHeaderTemplate: '#resource-template',
        group: {
            enableCompactView: false,
            resources: ['MeetingRoom']
        },
        resources: [{
            field: 'RoomId', title: 'Room Type',
            name: 'MeetingRoom', allowMultiple: true,
            dataSource: [
                { text: 'Jammy', id: 1, color: '#ea7a57', capacity: 20, type: 'Conference' },
                { text: 'Tweety', id: 2, color: '#7fa900', capacity: 7, type: 'Cabin' },
                { text: 'Nestle', id: 3, color: '#5978ee', capacity: 5, type: 'Cabin' },
                { text: 'Phoenix', id: 4, color: '#fec200', capacity: 15, type: 'Conference' },
                { text: 'Mission', id: 5, color: '#df5286', capacity: 25, type: 'Conference' },
                { text: 'Hangout', id: 6, color: '#00bdae', capacity: 10, type: 'Cabin' },
                { text: 'Rick Roll', id: 7, color: '#865fcf', capacity: 20, type: 'Conference' },
                { text: 'Rainbow', id: 8, color: '#1aaa55', capacity: 8, type: 'Cabin' },
                { text: 'Swarm', id: 9, color: '#df5286', capacity: 30, type: 'Conference' },
                { text: 'Photogenic', id: 10, color: '#710193', capacity: 25, type: 'Conference' }
            ],
            textField: 'text', idField: 'id', colorField: 'color'
        }],
        eventSettings: {
            dataSource: <Object[]>extend([], roomData, null, true),
            fields: {
                id: 'Id',
                subject: { title: 'Summary', name: 'Subject' },
                location: { title: 'Location', name: 'Location' },
                description: { title: 'Comments', name: 'Description' },
                startTime: { title: 'From', name: 'StartTime' },
                endTime: { title: 'To', name: 'EndTime' }
            }
        },
        popupOpen: (args: PopupOpenEventArgs) => {
            let data: { [key: string]: Object } = <{ [key: string]: Object }>args.data;
            if (args.type === 'QuickInfo' || args.type === 'Editor' || args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert') {
                let target: HTMLElement = (args.type === 'RecurrenceAlert' ||
                    args.type === 'DeleteAlert') ? data.element[0] : args.target;
                if (!isNullOrUndefined(target) && target.classList.contains('e-work-cells')) {
                    if ((target.classList.contains('e-read-only-cells')) ||
                        (!scheduleObj.isSlotAvailable(data.endTime as Date, data.endTime as Date, data.groupIndex as number))) {
                        args.cancel = true;
                    }
                } else if (!isNullOrUndefined(target) && target.classList.contains('e-appointment') &&
                    (isReadOnly(data.EndTime))) {
                    args.cancel = true;
                }
            }
        },
        renderCell: (args: RenderCellEventArgs) => {
            if (args.element.classList.contains('e-work-cells')) {
                if (args.date.getHours() === 13) {
                    args.element.classList.add('e-read-only-cells');
                    args.element.classList.add('e-lunch-break');
                    args.element.innerHTML = '<span>Lunch Break </span>';
                }
                if (args.date < new Date(2018, 6, 31, 0, 0)) {
                    args.element.setAttribute('aria-readonly', 'true');
                    args.element.classList.add('e-read-only-cells');
                }
            }
            if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
                let target: HTMLElement = args.element.querySelector('.e-resource-text') as HTMLElement;
                target.innerHTML = '<div class="name">Rooms</div><div class="type">Type</div><div class="capacity">Capacity</div>';
            }
        },
        eventRendered: (args: EventRenderedArgs) => {
            let data: { [key: string]: Object } = args.data;
            if (isReadOnly(data.EndTime)) {
                args.element.setAttribute('aria-readonly', 'true');
                args.element.classList.add('e-read-only');
            }
        },
        actionBegin: (args: ActionEventArgs) => {
            if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
                let data: { [key: string]: Object };
                if (args.requestType === 'eventCreate') {
                    data = <{ [key: string]: Object }>args.data[0];
                } else if (args.requestType === 'eventChange') {
                    data = <{ [key: string]: Object }>args.data;
                }
                let groupIndex: number = scheduleObj.eventBase.getGroupIndexFromEvent(data);
                if (!scheduleObj.isSlotAvailable(data.StartTime as Date, data.EndTime as Date, groupIndex as number)) {
                    args.cancel = true;
                }
            }
        }
    });
    scheduleObj.appendTo('#Schedule');
};