import { loadCultureFiles } from '../common/culture-loader';
import {
    Schedule,
    TimelineViews,
    Resize,
    DragAndDrop,
    DragEventArgs,
    ActionEventArgs,
} from '@syncfusion/ej2-schedule';
import {
    Grid,
    RowDD,
    RowDropEventArgs,
    RowDragEventArgs,
    Selection,
} from '@syncfusion/ej2-grids';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * Schedule Auto Scheduling sample
 */

Schedule.Inject(TimelineViews, Resize, DragAndDrop);
Grid.Inject(RowDD, Selection);

(window as any).default = (): void => {
    loadCultureFiles();
    const MAX_DAILY_WORKLOAD: number = 8;
    let draggedEventData: any = null;
    let scheduleObj: Schedule;
    let gridObj: Grid;
    const scheduledAppointments: Set<string> = new Set();

    const resourceData: any[] = [
        {
            text: 'Smith',
            id: 1,
            color: '#df5286',
            group: 'Doctor',
            skills: ['Cardiology', 'General'],
        },
        {
            text: 'Lee',
            id: 2,
            color: '#7fa900',
            group: 'Doctor',
            skills: ['Pediatrics', 'General'],
        },
        {
            text: 'Patel',
            id: 3,
            color: '#ea7a57',
            group: 'Doctor',
            skills: ['Surgery', 'General'],
        },
        {
            text: 'Amy',
            id: 4,
            color: '#007bff',
            group: 'Nurse',
            skills: ['ICU', 'Ward'],
        },
        {
            text: 'John',
            id: 5,
            color: '#00bdae',
            group: 'Nurse',
            skills: ['ER', 'Ward'],
        },
        {
            text: 'Sara',
            id: 6,
            color: '#f57b42',
            group: 'Nurse',
            skills: ['ICU', 'ER'],
        },
    ];

    let gridData: any[] = [
        {
            Id: 101,
            Task: 'Cardiology Consultation',
            Duration: '2 Hours',
            RequiredSkill: 'Cardiology',
        },
        {
            Id: 102,
            Task: 'Pediatric Health Assessment',
            Duration: '1 Hour',
            RequiredSkill: 'Pediatrics',
        },
        {
            Id: 103,
            Task: 'Pre-Surgical Evaluation',
            Duration: '3 Hours',
            RequiredSkill: 'Surgery',
        },
        {
            Id: 104,
            Task: 'Critical Care Monitoring',
            Duration: '2 Hours',
            RequiredSkill: 'ICU',
        },
        {
            Id: 105,
            Task: 'Emergency Patient Intake',
            Duration: '1 Hour',
            RequiredSkill: 'ER',
        },
        {
            Id: 106,
            Task: 'Inpatient Care Management',
            Duration: '2 Hours',
            RequiredSkill: 'Ward',
        },
        {
            Id: 107,
            Task: 'General Medical Examination',
            Duration: '1 Hour',
            RequiredSkill: 'General',
        },
        {
            Id: 108,
            Task: 'Emergency Case Assessment',
            Duration: '1 Hour',
            RequiredSkill: 'ER',
        },
    ];

    function getInitialEvents(): any[] {
        const today: Date = new Date();
        today.setHours(0, 0, 0, 0);

        return [
            {
                Id: 1,
                Subject: 'Cardiac Checkup - Mr. Johnson',
                StartTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    9,
                    0
                ),
                EndTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    11,
                    30
                ),
                IsAllDay: false,
                StaffId: 1,
                RequiredSkill: 'Cardiology',
            },
            {
                Id: 2,
                Subject: 'Consultation - ECG Review',
                StartTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    12,
                    0
                ),
                EndTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    14,
                    0
                ),
                IsAllDay: false,
                StaffId: 1,
                RequiredSkill: 'Cardiology',
            },
            {
                Id: 3,
                Subject: 'Child Wellness Exam - Emma',
                StartTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    9,
                    0
                ),
                EndTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    11,
                    0
                ),
                IsAllDay: false,
                StaffId: 2,
                RequiredSkill: 'Pediatrics',
            },
            {
                Id: 4,
                Subject: 'Vaccination Clinic',
                StartTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    11,
                    30
                ),
                EndTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    13,
                    0
                ),
                IsAllDay: false,
                StaffId: 2,
                RequiredSkill: 'General',
            },
            {
                Id: 5,
                Subject: 'Pre-Op Assessment',
                StartTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    9,
                    0
                ),
                EndTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    10,
                    30
                ),
                IsAllDay: false,
                StaffId: 3,
                RequiredSkill: 'Surgery',
            },
            {
                Id: 6,
                Subject: 'Surgical Consultation - Mrs. Smith',
                StartTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    11,
                    0
                ),
                EndTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    13,
                    30
                ),
                IsAllDay: false,
                StaffId: 3,
                RequiredSkill: 'Surgery',
            },
            {
                Id: 7,
                Subject: 'ICU Patient Monitoring',
                StartTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    9,
                    30
                ),
                EndTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    12,
                    30
                ),
                IsAllDay: false,
                StaffId: 4,
                RequiredSkill: 'ICU',
            },
            {
                Id: 8,
                Subject: 'Vitals Check - ICU Ward',
                StartTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    13,
                    0
                ),
                EndTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    14,
                    0
                ),
                IsAllDay: false,
                StaffId: 4,
                RequiredSkill: 'Ward',
            },
            {
                Id: 9,
                Subject: 'ER Triage - Patient Intake',
                StartTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    9,
                    0
                ),
                EndTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    11,
                    0
                ),
                IsAllDay: false,
                StaffId: 5,
                RequiredSkill: 'ER',
            },
            {
                Id: 10,
                Subject: 'Emergency Response Team',
                StartTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    15,
                    30
                ),
                EndTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    17,
                    0
                ),
                IsAllDay: false,
                StaffId: 5,
                RequiredSkill: 'ER',
            },
            {
                Id: 11,
                Subject: 'ICU Support & Monitoring',
                StartTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    11,
                    0
                ),
                EndTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    13,
                    0
                ),
                IsAllDay: false,
                StaffId: 6,
                RequiredSkill: 'ICU',
            },
            {
                Id: 12,
                Subject: 'ER Support - Critical Care',
                StartTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    16,
                    0
                ),
                EndTime: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    17,
                    30
                ),
                IsAllDay: false,
                StaffId: 6,
                RequiredSkill: 'ER',
            },
        ];
    }

    function parseDuration(duration: string): number {
        return parseInt(duration.split(' ')[0], 10);
    }

    function safeDeleteGridRecord(record: any): void {
        if (!record) return;
        const id: any = record.Id !== undefined ? record.Id : null;
        gridData = gridData.filter((item: any) => {
            if (id !== null) {
                return item.Id !== id;
            }
            return (
                item.Task + '|' + item.RequiredSkill !==
                record.Task + '|' + record.RequiredSkill
            );
        });
        if (gridObj) {
            gridObj.dataSource = gridData;
            gridObj.dataBind();
        }
    }

    function getResourceWorkloadForDate(
        resourceId: number,
        date: Date,
        excludeEventId?: number
    ): number {
        const events: any[] = scheduleObj.getEvents() || [];
        const dayStart: Date = new Date(date);
        dayStart.setHours(0, 0, 0, 0);

        let total: number = 0;

        events.forEach((event: any) => {
            const eventDate: Date = new Date(event.StartTime);
            eventDate.setHours(0, 0, 0, 0);

            if (
                event.StaffId === resourceId &&
                eventDate.getTime() === dayStart.getTime() &&
                (!excludeEventId || event.Id !== excludeEventId)
            ) {
                total +=
                    (new Date(event.EndTime).getTime() -
                        new Date(event.StartTime).getTime()) /
                    3600000;
            }
        });

        return total;
    }

    function isTimeSlotAvailableForResource(
        resourceId: number,
        startTime: Date,
        endTime: Date
    ): boolean {
        const events: any[] = scheduleObj.getEvents() || [];

        return !events.some((event: any) => {
            if (event.StaffId !== resourceId) {
                return false;
            }

            return (
                startTime.getTime() < new Date(event.EndTime).getTime() &&
                endTime.getTime() > new Date(event.StartTime).getTime()
            );
        });
    }

    function getEventSkill(eventData: any): string {
        if (eventData.RequiredSkill) {
            return eventData.RequiredSkill;
        }

        const subject: string = eventData.Subject || '';

        for (let i: number = 0; i < resourceData.length; i++) {
            const resource: any = resourceData[i];

            for (let j: number = 0; j < resource.skills.length; j++) {
                if (subject.indexOf(resource.skills[j]) !== -1) {
                    return resource.skills[j];
                }
            }
        }

        return 'General';
    }

    function findAvailableTimeSlotForResource(
        resourceId: number,
        durationHours: number,
        date: Date,
        tempScheduledEvents?: any[]
    ): any {
        const dayStart: Date = new Date(date);
        dayStart.setHours(0, 0, 0, 0);

        const dayEnd: Date = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);

        const workingStart: Date = new Date(dayStart);
        workingStart.setHours(9, 0, 0, 0);

        const workingEnd: Date = new Date(dayStart);
        workingEnd.setHours(23, 0, 0, 0);

        let resourceEvents: any[] = scheduleObj
            .getEvents(dayStart, dayEnd)
            .filter((event: any) => event.StaffId === resourceId);

        if (tempScheduledEvents && tempScheduledEvents.length) {
            tempScheduledEvents.forEach((event: any) => {
                if (event.StaffId === resourceId) {
                    resourceEvents.push(event);
                }
            });
        }

        resourceEvents.sort((a: any, b: any) => {
            return new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime();
        });

        const durationMs: number = durationHours * 60 * 60 * 1000;

        if (resourceEvents.length === 0) {
            if (workingStart.getTime() + durationMs <= workingEnd.getTime()) {
                return {
                    startTime: new Date(workingStart),
                    endTime: new Date(workingStart.getTime() + durationMs),
                };
            }

            return null;
        }

        const firstEventStart: number = new Date(
            resourceEvents[0].StartTime
        ).getTime();

        if (workingStart.getTime() + durationMs <= firstEventStart) {
            return {
                startTime: new Date(workingStart),
                endTime: new Date(workingStart.getTime() + durationMs),
            };
        }

        for (let i: number = 0; i < resourceEvents.length - 1; i++) {
            const currentEnd: number = new Date(resourceEvents[i].EndTime).getTime();
            const nextStart: number = new Date(
                resourceEvents[i + 1].StartTime
            ).getTime();

            if (nextStart - currentEnd >= durationMs) {
                return {
                    startTime: new Date(currentEnd),
                    endTime: new Date(currentEnd + durationMs),
                };
            }
        }

        const lastEnd: number = new Date(
            resourceEvents[resourceEvents.length - 1].EndTime
        ).getTime();

        if (lastEnd + durationMs <= workingEnd.getTime()) {
            return {
                startTime: new Date(lastEnd),
                endTime: new Date(lastEnd + durationMs),
            };
        }

        return null;
    }

    function handleAutoScheduling(): void {
        const tempScheduledEvents: any[] = [];
        const workloadMap: any = {};

        resourceData.forEach((resource: any) => {
            workloadMap[resource.id] = getResourceWorkloadForDate(
                resource.id,
                scheduleObj.selectedDate
            );
        });

        const appointmentsToSchedule: any[] = gridData.filter((item: any) => {
            const key: string = item.Task + '|' + item.RequiredSkill;
            return !scheduledAppointments.has(key);
        });

        const allEvents: any[] = scheduleObj.getEvents() || [];
        let nextEventId: number = allEvents.length
            ? Math.max.apply(
                null,
                allEvents.map((e: any) => e.Id || 0)
            ) + 1
            : 1;

        appointmentsToSchedule.forEach((appt: any) => {
            const matchingResources: any[] = resourceData.filter((resource: any) => {
                return resource.skills.indexOf(appt.RequiredSkill) !== -1;
            });

            const durationHours: number = parseDuration(appt.Duration);
            let bestResource: any = null;
            let bestSlot: any = null;
            let bestWorkload: number = Infinity;

            matchingResources.forEach((resource: any) => {
                const workload: number = workloadMap[resource.id] || 0;

                if (workload + durationHours > MAX_DAILY_WORKLOAD) {
                    return;
                }

                const slot: any = findAvailableTimeSlotForResource(
                    resource.id,
                    durationHours,
                    scheduleObj.selectedDate,
                    tempScheduledEvents
                );

                if (!slot) {
                    return;
                }

                if (workload < bestWorkload) {
                    bestResource = resource;
                    bestSlot = slot;
                    bestWorkload = workload;
                }
            });

            if (!bestResource || !bestSlot) {
                return;
            }

            const eventData: any = {
                Id: nextEventId++,
                Subject: appt.Task,
                StartTime: bestSlot.startTime,
                EndTime: bestSlot.endTime,
                IsAllDay: false,
                StaffId: bestResource.id,
                RequiredSkill: appt.RequiredSkill,
            };

            scheduleObj.addEvent(eventData);
            tempScheduledEvents.push(eventData);
            workloadMap[bestResource.id] = bestWorkload + durationHours;

            scheduledAppointments.add(appt.Task + '|' + appt.RequiredSkill);
        });

        gridData = gridData.filter((item: any) => {
            const key: string = item.Task + '|' + item.RequiredSkill;
            return !scheduledAppointments.has(key);
        });

        gridObj.dataSource = gridData;
        gridObj.dataBind();

        scheduleObj.refreshTemplates('resourceHeaderTemplate');
    }

    function resourceHeaderTemplate(props: any): string {
        const workload: number = getResourceWorkloadForDate(
            props.resourceData.id,
            scheduleObj.selectedDate
        );

        return (
            '<div class="resource-header-container">' +
            '<div class="resource-header-avatar" ' +
            'style="background-color:' +
            props.resourceData.color +
            '">' +
            props.resourceData.text.charAt(0) +
            '</div>' +
            '<div class="resource-header-info">' +
            '<div class="resource-header-name">' +
            props.resourceData.text +
            '</div>' +
            '<div class="resource-header-skills">' +
            props.resourceData.skills
                .map((skill: string) => '<span class="skill-badge">' + skill + '</span>')
                .join('') +
            '</div>' +
            '</div>' +
            '<div class="resource-header-workload">' +
            workload +
            '/8h</div>' +
            '</div>'
        );
    }

    function taskTemplate(props: any): string {
        return (
            '<div class="task-template">' +
            '<div class="task-name">' +
            props.Task +
            '</div>' +
            '<div class="task-skill">' +
            props.RequiredSkill +
            '</div>' +
            '</div>'
        );
    }

    scheduleObj = new Schedule({
        width: '100%',
        height: '100%',
        cssClass: 'grid-auto-scheduling',
        currentView: 'TimelineDay',
        selectedDate: new Date(),

        group: {
            resources: ['Staff'],
        },

        views: [{ option: 'TimelineDay' }],

        resources: [
            {
                field: 'StaffId',
                title: 'Staff',
                name: 'Staff',
                allowMultiple: false,
                dataSource: resourceData,
                textField: 'text',
                idField: 'id',
                colorField: 'color',
                groupIDField: 'group',
            },
        ],

        eventSettings: {
            dataSource: getInitialEvents(),
        },

        resourceHeaderTemplate: resourceHeaderTemplate,

        allowOverlap: false,
        allowResizing: false,

        dragStart: (args: DragEventArgs) => {
            draggedEventData = args.data;
        },

        dragStop: (args: DragEventArgs) => {
            if (!draggedEventData || !args.data) {
                return;
            }

            const targetResource: any = resourceData.find((r: any) => {
                return r.id === args.data.StaffId;
            });

            const requiredSkill: string =
                draggedEventData.RequiredSkill || getEventSkill(draggedEventData);
            const startTime: Date = new Date(args.data.StartTime);
            const endTime: Date = new Date(args.data.EndTime);
            const durationHours: number =
                (endTime.getTime() - startTime.getTime()) / 3600000;

            if (targetResource && targetResource.skills.indexOf(requiredSkill) === -1) {
                args.data.StaffId = draggedEventData.StaffId;
                args.data.StartTime = draggedEventData.StartTime;
                args.data.EndTime = draggedEventData.EndTime;

                scheduleObj.saveEvent(args.data);

                draggedEventData = null;
                scheduleObj.refreshTemplates('resourceHeaderTemplate');

                return;
            }

            const workload: number = getResourceWorkloadForDate(
                args.data.StaffId,
                startTime,
                args.data.Id
            );

            if (workload + durationHours > MAX_DAILY_WORKLOAD) {
                args.data.StaffId = draggedEventData.StaffId;
                args.data.StartTime = draggedEventData.StartTime;
                args.data.EndTime = draggedEventData.EndTime;

                scheduleObj.saveEvent(args.data);

                draggedEventData = null;
                scheduleObj.refreshTemplates('resourceHeaderTemplate');

                return;
            }

            draggedEventData = null;

            scheduleObj.refreshTemplates('resourceHeaderTemplate');
        },

        actionBegin: (args: ActionEventArgs) => {
            if (args.requestType !== 'eventChange') {
                return;
            }

            const eventData: any = Array.isArray(args.data) ? args.data[0] : args.data;

            const start: Date = new Date(eventData.StartTime);
            const end: Date = new Date(eventData.EndTime);
            const duration: number = (end.getTime() - start.getTime()) / 3600000;

            const workload: number = getResourceWorkloadForDate(
                eventData.StaffId,
                start,
                eventData.Id
            );

            if (workload + duration > MAX_DAILY_WORKLOAD) {
                args.cancel = true;
            }
        },

        actionComplete: (args: ActionEventArgs) => {
            if (args.requestType === 'toolBarItemRendered') {
                const autoScheduleBtn: Button = new Button({
                    content: 'Auto Scheduling',
                    cssClass: 'e-primary',
                });
                autoScheduleBtn.appendTo('#autoScheduleBtn');

                document.getElementById('autoScheduleBtn')!.onclick =
                    handleAutoScheduling;
            }
        },

        cellClick: (args: any) => {
            args.cancel = true;
        },

        popupOpen: (args: any) => {
            if (args.type === 'Editor') {
                args.cancel = true;
            }
        },

        dataBound: (args: any) => {
            scheduleObj.refreshTemplates('resourceHeaderTemplate');
        },

        toolbarItems: [
            { align: 'Left', name: 'Previous' },
            { align: 'Left', name: 'Next' },
            { align: 'Left', name: 'DateRangeText' },
            { align: 'Right', name: 'Today' },
            {
                name: 'Custom',
                type: 'Input',
                template: '<button id="autoScheduleBtn"></button>',
                align: 'Right',
            },
        ],
    });

    scheduleObj.appendTo('#Schedule');

    gridObj = new Grid({
        dataSource: gridData,

        width: '300px',
        height: '100%',
        cssClass: 'drag-grid-data',

        allowRowDragAndDrop: true,

        rowDropSettings: {
            targetID: 'Schedule',
        },

        editSettings: {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
        },

        columns: [
            {
                field: 'Id',
                isPrimaryKey: true,
                visible: false,
            },
            {
                field: 'Task',
                headerText: 'Task',
                width: 200,
                template: taskTemplate,
            },
            {
                field: 'Duration',
                headerText: 'Duration',
                width: 110,
            },
        ],

        rowDrag: (args: RowDragEventArgs) => {
            args.cancel = true;
        },

        rowDrop: (args: RowDropEventArgs) => {
            args.cancel = true;
            const scheduleElement: any = (args.target as any).closest(
                '.e-content-wrap'
            );
            if (
                !scheduleElement ||
                !(args.target as any).classList.contains('e-work-cells')
            ) {
                return;
            }

            const cellData: any =
                scheduleObj.getCellDetails(args.target) ||
                scheduleObj.getCellDetails(scheduleElement);
            if (!cellData) return;

            const resourceDetails: any = scheduleObj.getResourcesByIndex(
                cellData.groupIndex
            );
            const durationHours: number = parseDuration((args.data as any)[0].Duration);
            const requiredSkill: string = (args.data as any)[0].RequiredSkill;

            if (
                requiredSkill &&
                resourceDetails.resourceData.skills.indexOf(requiredSkill) === -1
            ) {
                return;
            }

            const startTime: Date = new Date(cellData.startTime);
            const endTime: Date = new Date(
                startTime.getTime() + durationHours * 3600000
            );
            const currentWorkload: number = getResourceWorkloadForDate(
                resourceDetails.resourceData.id,
                startTime
            );

            if (currentWorkload + durationHours > MAX_DAILY_WORKLOAD) {
                return;
            }

            if (
                !isTimeSlotAvailableForResource(
                    resourceDetails.resourceData.id,
                    startTime,
                    endTime
                )
            ) {
                return;
            }

            const newEventData: any = {
                Id: scheduleObj.getEventMaxID(),
                Subject: (args.data as any)[0].Task,
                StartTime: startTime,
                EndTime: endTime,
                IsAllDay: cellData.isAllDay,
                StaffId: resourceDetails.resourceData.id,
                RequiredSkill: requiredSkill,
            };

            safeDeleteGridRecord((args.data as any)[0]);
            gridObj.dataSource = gridData;
            gridObj.dataBind();

            scheduleObj.addEvent(newEventData);

            scheduleObj.refreshTemplates('resourceHeaderTemplate');
        },
    });

    gridObj.appendTo('#Grid');
};