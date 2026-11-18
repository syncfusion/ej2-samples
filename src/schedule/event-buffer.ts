import { loadCultureFiles } from '../common/culture-loader';
import {
    Schedule,
    Day,
    TimelineViews,
    Resize,
    DragAndDrop,
    ActionEventArgs,
    DragEventArgs
} from '@syncfusion/ej2-schedule';

import { Dialog } from '@syncfusion/ej2-popups';

Schedule.Inject(
    Day,
    TimelineViews,
    Resize,
    DragAndDrop
);

/**
 * Event Buffer Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    const roomData: Record<string, any>[] = [
        {
            RoomId: 1,
            RoomText: 'Cardiac Surgery Suite',
            Specialty: 'Cardiology',
            RoomColor: '#ef4444',
            Icon: '❤'
        },
        {
            RoomId: 2,
            RoomText: 'Orthopedic Center',
            Specialty: 'Orthopedics',
            RoomColor: '#2563eb',
            Icon: '🦴'
        },
        {
            RoomId: 3,
            RoomText: 'Neuroscience Unit',
            Specialty: 'Neurology',
            RoomColor: '#8b5cf6',
            Icon: '🧠'
        },
        {
            RoomId: 4,
            RoomText: 'Pediatric Care Suite',
            Specialty: 'Pediatrics',
            RoomColor: '#10b981',
            Icon: '👶'
        },
        {
            RoomId: 5,
            RoomText: 'Emergency Trauma Bay',
            Specialty: 'Emergency',
            RoomColor: '#f97316',
            Icon: '🚑'
        },
        {
            RoomId: 6,
            RoomText: 'Diagnostic Imaging Center',
            Specialty: 'Radiology',
            RoomColor: '#0ea5e9',
            Icon: '🔬'
        }
    ];

    const subjects: Record<string, string[]> = {
        Cardiology: [
            'Cardiac Workup',
            'Heart Valve Assessment',
            'Stress Test',
            'ECG Review',
        ],
        Orthopedics: [
            'Knee Replacement',
            'Bone Fracture Assessment',
            'Spinal Workup',
        ],
        Neurology: [
            'Neurology Workup',
            'Brain MRI Review'
        ],
        Pediatrics: [
            'Child Wellness Review',
            'Immunization Follow-up'
        ],
        Emergency: [
            'Emergency Care',
            'Acute Care',
            'Trauma Care',
            'Critical Care'
        ],
        Radiology: [
            'CT Scan Analysis',
            'MRI Scan Review'
        ]
    };
    function generateEvents(date: Date): Record<string, any>[] {
        const events: Record<string, any>[] = [];

        let id: number = date.getDate() * 100;

        roomData.forEach((room: Record<string, any>) => {

            const roomSubjects: string[] =
                subjects[room.Specialty] || ['Procedure'];

            const startPatterns = [
                { hour: 9, minute: 0 },
                { hour: 9, minute: 15 },
                { hour: 9, minute: 30 },
                { hour: 9, minute: 45 }
            ];

            const secondPatterns = [
                { hour: 11, minute: 0 },
                { hour: 11, minute: 15 },
                { hour: 11, minute: 30 },
                { hour: 11, minute: 45 }
            ];

            const pattern1 =
                startPatterns[Math.floor(Math.random() * startPatterns.length)];

            const pattern2 =
                secondPatterns[Math.floor(Math.random() * secondPatterns.length)];

            function createEvent(
                startHour: number,
                startMinute: number
            ): Record<string, any> {

                const duration: number =
                    [75, 90][Math.floor(Math.random() * 2)];

                const bufferBefore: number =
                    [30, 45, 60][Math.floor(Math.random() * 3)];

                const bufferAfter: number =
                    [30, 45, 60][Math.floor(Math.random() * 3)];

                const subject: string =
                    roomSubjects[Math.floor(Math.random() * roomSubjects.length)];

                const startTime: Date = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    startHour,
                    startMinute
                );

                const endTime: Date = new Date(
                    startTime.getTime() + duration * 60000
                );

                return {
                    Id: id++,
                    Subject: subject,
                    StartTime: startTime,
                    EndTime: endTime,
                    IsAllDay: false,
                    RoomId: room.RoomId,
                    RequiredSkill: room.Specialty,
                    bufferBefore,
                    bufferAfter
                };
            }

            events.push(createEvent(pattern1.hour, pattern1.minute));
            events.push(createEvent(pattern2.hour, pattern2.minute));
        });

        return events;
    }

    function generateAllEvents(
        selectedDate: Date
    ): Record<string, any>[] {

        const previousDate: Date = new Date(selectedDate);
        previousDate.setDate(previousDate.getDate() - 1);

        const nextDate: Date = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + 1);

        return []
            .concat(generateEvents(previousDate))
            .concat(generateEvents(selectedDate))
            .concat(generateEvents(nextDate));
    }

    const surgeryData: Record<string, any>[] =
        generateAllEvents(new Date());

    const dialogObj: Dialog = new Dialog({
        visible: false,
        isModal: true,
        width: '320px',
        header: 'Alert',
        showCloseIcon: true,
        content:
            'Events cannot be scheduled in this operating room because it does not match the required specialty.',
        buttons: [
            {
                buttonModel: {
                    content: 'Ok',
                    isPrimary: true
                },
                click: (): void => {
                    dialogObj.hide();
                }
            }
        ]
    });

    dialogObj.appendTo('#alertDialog');

    const scheduleObj: Schedule = new Schedule({
        cssClass: 'medical-scheduler',

        width: '100%',
        height: '650px',

        selectedDate: new Date(),

        currentView: 'TimelineDay',

        startHour: '08:00',

        allowOverlap: false,

        workHours: {
            start: '08:00',
            end: '18:00'
        },

        group: {
            resources: ['Rooms']
        },

        views: [
            'Day',
            'TimelineDay',
            'TimelineWeek'
        ],

        resourceHeaderTemplate: '#resourceTemplate',

        headerIndentTemplate: getHeaderIndentTemplate,

        resources: [
            {
                field: 'RoomId',
                title: 'Operating Room',
                name: 'Rooms',
                dataSource: roomData,
                textField: 'RoomText',
                idField: 'RoomId',
                colorField: 'RoomColor'
            }
        ],

        timeScale: {
            enable: true,
            interval: 60,
            slotCount: 4
        },

        dragStop: onDragStop,

        actionBegin: onActionBegin,

        eventSettings: {
            dataSource: surgeryData,

            enableBuffer: true,

            bufferTemplate: '#bufferTemplate',

            fields: {
                bufferBefore: {
                    name: 'bufferBefore'
                },
                bufferAfter: {
                    name: 'bufferAfter'
                }
            }
        }
    });

    scheduleObj.appendTo('#scheduler');

    function onDragStop(args: DragEventArgs): void {

        const data: Record<string, any> =
            args.data instanceof Array
                ? args.data[0]
                : args.data;

        const room: Record<string, any> | undefined =
            roomData.find((r: Record<string, any>) => r.RoomId === data.RoomId);

        if (!room) {
            return;
        }

        if (room.Specialty !== data.RequiredSkill) {

            args.cancel = true;

            dialogObj.setProperties({
                enableRtl:
                    scheduleObj.element.classList.contains('e-rtl')
            });

            dialogObj.show();
        }
    }

    function onActionBegin(args: ActionEventArgs): void {

        if (args.requestType === 'eventCreate') {

            const records: Record<string, any>[] =
                args.data as Record<string, any>[];

            records.forEach((event: Record<string, any>) => {

                const room = roomData.find(
                    (r: Record<string, any>) => r.RoomId === event.RoomId
                );

                if (room) {
                    event.RequiredSkill = room.Specialty;
                }
            });
        }
    }

    function getHeaderIndentTemplate(): string {

        if (scheduleObj &&
            scheduleObj.currentView === 'Day') {
            return '';
        }

        return (
            '<div class="resource-header-title">' +
            '<div class="resource-header-main">Operating Rooms</div>' +
            '<div class="resource-header-sub">Surgery Suites</div>' +
            '</div>'
        );
    }

    (window as Record<string, any>).getBufferTemplate = (
        args: Record<string, any>
    ): string => {

        const isBefore: boolean =
            args.bufferType === 'before';

        const duration: number = isBefore
            ? args.data.bufferBefore
            : args.data.bufferAfter;

        const iconSrc: string = isBefore
            ? 'https://ej2.syncfusion.com/demos/src/schedule/images/health-day.svg'
            : 'https://ej2.syncfusion.com/demos/src/schedule/images/cancer-day.svg';

        if (duration < 10) {
            return '';
        }

        const isDayView: boolean =
            scheduleObj.currentView === 'Day';

        if (isDayView) {

            if (duration <= 15) {
                return (
                    '<div class="buffer-minimal">' +
                    '<span class="buffer-duration">' +
                    duration + ' min' +
                    '</span>' +
                    '</div>'
                );
            }

            return (
                '<div class="buffer-minimal">' +
                '<img src="' + iconSrc + '" class="buffer-icon" />' +
                '<span class="buffer-duration">' +
                duration + ' min' +
                '</span>' +
                '</div>'
            );
        }

        if (duration <= 20) {
            return (
                '<div class="buffer-minimal">' +
                '<img src="' + iconSrc + '" class="buffer-icon" />' +
                '</div>'
            );
        }

        return (
            '<div class="buffer-minimal">' +
            '<img src="' + iconSrc + '" class="buffer-icon" />' +
            '<span class="buffer-duration">' +
            duration + ' min' +
            '</span>' +
            '</div>'
        );
    };

};