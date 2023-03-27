import { loadCultureFiles } from '../common/culture-loader';
import {
    addClass, closest, extend, isNullOrUndefined, remove, removeClass, Browser, Internationalization, compile
} from '@syncfusion/ej2-base';
import { Button, Switch,CheckBox, ChangeEventArgs as SwitchEventArgs } from '@syncfusion/ej2-buttons';
import { TimePicker, ChangeEventArgs as TimeEventArgs } from '@syncfusion/ej2-calendars';
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';
import { DropDownList, MultiSelect, ChangeEventArgs, CheckBoxSelection, MultiSelectChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Uploader, SelectedEventArgs } from '@syncfusion/ej2-inputs';
import {
    ContextMenu, BeforeOpenCloseMenuEventArgs, Toolbar, ClickEventArgs, MenuEventArgs as ContextMenuEventArgs, AppBar
} from '@syncfusion/ej2-navigations';
import {
    Schedule, Day, Week, WorkWeek, Month, Year, Agenda, TimelineViews, TimelineMonth, TimelineYear, Resize, DragAndDrop,
    ICalendarExport, ICalendarImport, Print, ExcelExport, ResourcesModel, CellClickEventArgs, Timezone
} from '@syncfusion/ej2-schedule';
import { DropDownButton, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { tz } from 'moment-timezone';

MultiSelect.Inject(CheckBoxSelection);
// tslint:disable-next-line:max-line-length
Schedule.Inject(Day, Week, WorkWeek, Month, Year, Agenda, TimelineViews, TimelineMonth, TimelineYear, DragAndDrop, Resize, ExcelExport, ICalendarExport, ICalendarImport, Print);

/**
 * Schedule Overview sample
 */

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();

    interface TemplateFunction extends Window {
        getDateHeaderDate?: Function;
        getDateHeaderDay?: Function;
        getWeather?: Function;
    }

    let intlObj: Internationalization = new Internationalization();
    (window as TemplateFunction).getDateHeaderDay = (value: Date) => {
        return intlObj.formatDate(value, { skeleton: 'E' });
    };
    (window as TemplateFunction).getDateHeaderDate = (value: Date) => {
        return intlObj.formatDate(value, { skeleton: 'd' });
    };
    (window as TemplateFunction).getWeather = (value: Date) => {
        switch (value.getDay()) {
            case 0:
                return '<img class="weather-image" src="src/schedule/images/weather-clear.svg"/>';
            case 1:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/>';
            case 2:
                return '<img class="weather-image" src="src/schedule/images/weather-rain.svg"/>';
            case 3:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/>';
            case 4:
                return '<img class="weather-image" src="src/schedule/images/weather-rain.svg"/>';
            case 5:
                return '<img class="weather-image" src="src/schedule/images/weather-clear.svg"/>';
            case 6:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/>';
            default:
                return null;
        }
    };

    const defaultAppBarObj: AppBar = new AppBar({
        colorMode: 'Primary'
    });
    defaultAppBarObj.appendTo('#defaultAppBar');

    let liveTimeInterval: NodeJS.Timeout | number;
    let updateLiveTime: Function = (): void => {
        let scheduleTimezone: string = scheduleObj ? scheduleObj.timezone : 'Etc/GMT';
        let timeBtn: Element = document.querySelector('.current-time');
        if (!timeBtn) {
            return;
        }
        if (scheduleObj.isAdaptive) {
            timeBtn.innerHTML = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: scheduleTimezone });
        }
        else {
            timeBtn.innerHTML = new Date().toLocaleTimeString('en-US', { timeZone: scheduleTimezone });
        }
    };

    let generateEvents: Function = (): Object[] => {
        let eventData: Object[] = [];
        let eventSubjects: string[] = [
            'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Traveling', 'Annual Conference', 'Birthday Celebration',
            'Farewell Celebration', 'Wedding Anniversary', 'Alaska: The Last Frontier', 'Deadliest Catch', 'Sports Day', 'MoonShiners',
            'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice', 'Rugby Match', 'Guitar Class',
            'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
        ];
        let weekDate: Date = new Date(new Date().setDate(new Date().getDate() - new Date().getDay()));
        let startDate: Date = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 10, 0);
        let endDate: Date = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 11, 30);
        eventData.push({
            Id: 1,
            Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
            StartTime: startDate,
            EndTime: endDate,
            Location: '',
            Description: 'Event Scheduled',
            RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;COUNT=10;',
            IsAllDay: false,
            IsReadonly: false,
            CalendarId: 1
        });
        for (let a: number = 0, id: number = 2; a < 500; a++) {
            let month: number = Math.floor(Math.random() * (11 - 0 + 1) + 0);
            let date: number = Math.floor(Math.random() * (28 - 1 + 1) + 1);
            let hour: number = Math.floor(Math.random() * (23 - 0 + 1) + 0);
            let minutes: number = Math.floor(Math.random() * (59 - 0 + 1) + 0);
            let start: Date = new Date(new Date().getFullYear(), month, date, hour, minutes, 0);
            let end: Date = new Date(start.getTime());
            end.setHours(end.getHours() + 2);
            let startDate: Date = new Date(start.getTime());
            let endDate: Date = new Date(end.getTime());
            eventData.push({
                Id: id,
                Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
                StartTime: startDate,
                EndTime: endDate,
                Location: '',
                Description: 'Event Scheduled',
                IsAllDay: id % 10 === 0,
                IsReadonly: endDate < new Date(),
                CalendarId: (a % 4) + 1
            });
            id++;
        }
        if (Browser.isIE) {
            Timezone.prototype.offset = (date: Date, timezone: string): number => tz.zone(timezone).utcOffset(date.getTime());
        }
        let overviewEvents: { [key: string]: Date }[] = extend([], eventData, null, true) as { [key: string]: Date }[];
        let timezone: Timezone = new Timezone();
        let currentTimezone: string = timezone.getLocalTimezoneName();
        for (let event of overviewEvents) {
            event.StartTime = timezone.convert(event.StartTime, 'UTC', currentTimezone);
            event.EndTime = timezone.convert(event.EndTime, 'UTC', currentTimezone);
        }
        return overviewEvents;
    };

    let isTimelineView: boolean = false;

    let printBtn: Button = new Button({ iconCss: 'e-icons e-print', cssClass: 'e-inherit' });
    printBtn.appendTo('#printBtn');
    printBtn.element.onclick = () => { scheduleObj.print(); };

    let importTemplateFn: Function = (data: Record<string, any>): NodeList => {
        const template: string = '<div class="e-template-btn"><span class="e-btn-icon e-icons e-upload-1 e-icon-left"></span>${text}</div>';
        return compile(template.trim())(data) as NodeList;
    };

    let importObj: Uploader = new Uploader({
        allowedExtensions: '.ics',
        cssClass: 'calendar-import',
        buttons: { browse: importTemplateFn({ text: 'Import' })[0] as HTMLElement },
        multiple: false,
        showFileList: false,
        selected: (args: SelectedEventArgs) => scheduleObj.importICalendar((<HTMLInputElement>args.event.target).files[0])
    });
    importObj.appendTo('#icalendar');
    document.querySelector('.calendar-import .e-btn').classList.add('e-inherit');

    let exportObj: DropDownButton = new DropDownButton({
        items: [
            { text: 'iCalendar', iconCss: 'e-icons e-export' },
            { text: 'Excel', iconCss: 'e-icons e-export-excel' }
        ],
        cssClass: 'e-inherit',
        select: (args: MenuEventArgs) => {
            if (args.item.text === 'Excel') {
                let exportDatas: Record<string, any>[] = [];
                let eventCollection: Record<string, any>[] = scheduleObj.getEvents();
                let resourceCollection: ResourcesModel[] = scheduleObj.getResourceCollections();
                let resourceData: Record<string, any>[] = resourceCollection[0].dataSource as Record<string, any>[];
                for (let resource of resourceData) {
                    let data: Record<string, any>[] = eventCollection.filter((e: Record<string, any>) =>
                        e.CalendarId === resource.CalendarId);
                    exportDatas = exportDatas.concat(data);
                }
                scheduleObj.exportToExcel({
                    exportType: 'xlsx', customData: exportDatas, fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'CalendarId']
                });
            } else {
                scheduleObj.exportToICalendar();
            }
        }
    });
    exportObj.appendTo('#exportBtn');

    let timelineTemplate: string = '<div class="template"><div class="icon-child">' +
        '<input id="timeline-views" aria-label="Timeline Views"></input></div><div class="text-child">Timeline Views</div></div>';
    let groupTemplate: string = '<div class="template"><div class="icon-child">' +
        '<input id="grouping" aria-label="Grouping"></input></div><div class="text-child">Grouping</div></div>';
    let gridlineTemplate: string = '<div class="template"><div class="icon-child">' +
        '<input id="timeSlot" aria-label="Time Slots"></input></div><div class="text-child">Time Slots</div></div>';
    let autoHeightTemplate: string = '<div class="template"><div class="icon-child">' +
        '<input id="row_auto_height" aria-label="Auto Fit Rows"></input></div><div class="text-child">Auto Fit Rows</div></div>';
    let toolbarObj: Toolbar = new Toolbar({
        height: 70,
        overflowMode: 'Scrollable',
        scrollStep: 100,
        cssClass: 'overview-toolbar',
        items: [
            { prefixIcon: 'e-icons e-plus', tooltipText: 'New Event', text: 'New Event', tabIndex: 0 },
            { prefixIcon: 'e-icons e-repeat', tooltipText: 'New Recurring Event', text: 'New Recurring Event', tabIndex: 0 },
            { type: 'Separator' },
            { prefixIcon: 'e-icons e-day', tooltipText: 'Day', text: 'Day', tabIndex: 0 },
            { prefixIcon: 'e-icons e-week', tooltipText: 'Week', text: 'Week', tabIndex: 0 },
            { prefixIcon: 'e-icons e-week', tooltipText: 'Work Week', text: 'WorkWeek', tabIndex: 0 },
            { prefixIcon: 'e-icons e-month', tooltipText: 'Month', text: 'Month', tabIndex: 0 },
            { prefixIcon: 'e-icons e-month', tooltipText: 'Year', text: 'Year', tabIndex: 0 },
            { prefixIcon: 'e-icons e-agenda-date-range', tooltipText: 'Agenda', text: 'Agenda', tabIndex: 0 },
            { tooltipText: 'Timeline Views', text: 'Timeline Views', template: timelineTemplate },
            { type: 'Separator' },
            { tooltipText: 'Grouping', text: 'Grouping', template: groupTemplate },
            { tooltipText: 'Time Slots', text: 'Time Slots', template: gridlineTemplate },
            { tooltipText: 'Auto Fit Rows', text: 'Auto Fit Rows', template: autoHeightTemplate },
        ],
        created: () => {
            liveTimeInterval = setInterval(() => { updateLiveTime(); }, 1000);

            let timelineView: CheckBox = new CheckBox({
                checked: false,
                created: () => { timelineView.element.setAttribute('tabindex', '0'); },
                change: (args: SwitchEventArgs) => {
                    isTimelineView = args.checked;
                    switch (scheduleObj.currentView) {
                        case 'Day':
                        case 'TimelineDay':
                            scheduleObj.currentView = isTimelineView ? 'TimelineDay' : 'Day';
                            break;
                        case 'Week':
                        case 'TimelineWeek':
                            scheduleObj.currentView = isTimelineView ? 'TimelineWeek' : 'Week';
                            break;
                        case 'WorkWeek':
                        case 'TimelineWorkWeek':
                            scheduleObj.currentView = isTimelineView ? 'TimelineWorkWeek' : 'WorkWeek';
                            break;
                        case 'Month':
                        case 'TimelineMonth':
                            scheduleObj.currentView = isTimelineView ? 'TimelineMonth' : 'Month';
                            break;
                        case 'Year':
                        case 'TimelineYear':
                            scheduleObj.currentView = isTimelineView ? 'TimelineYear' : 'Year';
                            break;
                        case 'Agenda':
                            scheduleObj.currentView = 'Agenda';
                            break;
                    }
                }
            });
            timelineView.appendTo('#timeline-views');
            let grouping: CheckBox = new CheckBox({
                checked: true,
                created: () => { grouping.element.setAttribute('tabindex', '0'); },
                change: (args: SwitchEventArgs) => { scheduleObj.group.resources = args.checked ? ['Calendars'] : []; }
            });
            grouping.appendTo('#grouping');
            let timeSlot: CheckBox = new CheckBox({
                checked: true,
                created: () => { timeSlot.element.setAttribute('tabindex', '0'); },
                change: (args: SwitchEventArgs) => { scheduleObj.timeScale.enable = args.checked; }
            });
            timeSlot.appendTo('#timeSlot');
            let rowAutoHeight: CheckBox = new CheckBox({
                checked: false,
                created: () => { rowAutoHeight.element.setAttribute('tabindex', '0'); },
                change: (args: SwitchEventArgs) => { scheduleObj.rowAutoHeight = args.checked; }
            });
            rowAutoHeight.appendTo('#row_auto_height');
            (document.querySelector('#settingsBtn') as HTMLButtonElement).onclick = () => {
                let settingsPanel: Element = document.querySelector('.overview-content .right-panel');
                if (settingsPanel.classList.contains('hide')) {
                    removeClass([settingsPanel], 'hide');
                    workweek.refresh();
                    resources.refresh();
                } else {
                    addClass([settingsPanel], 'hide');
                }
                scheduleObj.refreshEvents();
            };
        },
        clicked: (args: ClickEventArgs) => {
            switch (args.item.text) {
                case 'Day':
                    scheduleObj.currentView = isTimelineView ? 'TimelineDay' : 'Day';
                    break;
                case 'Week':
                    scheduleObj.currentView = isTimelineView ? 'TimelineWeek' : 'Week';
                    break;
                case 'WorkWeek':
                    scheduleObj.currentView = isTimelineView ? 'TimelineWorkWeek' : 'WorkWeek';
                    break;
                case 'Month':
                    scheduleObj.currentView = isTimelineView ? 'TimelineMonth' : 'Month';
                    break;
                case 'Year':
                    scheduleObj.currentView = isTimelineView ? 'TimelineYear' : 'Year';
                    break;
                case 'Agenda':
                    scheduleObj.currentView = 'Agenda';
                    break;
                case 'New Event':
                    let date: Date = scheduleObj.selectedDate;
                    let eventData: Object = {
                        Id: scheduleObj.getEventMaxID(),
                        Subject: '',
                        StartTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), new Date().getHours(), 0, 0),
                        EndTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), new Date().getHours() + 1, 0, 0),
                        Location: '',
                        Description: '',
                        IsAllDay: false,
                        CalendarId: 1
                    };
                    scheduleObj.openEditor(eventData, 'Add', true);
                    break;
                case 'New Recurring Event':
                    let dates: Date = scheduleObj.selectedDate;
                    let recEventData: Object = {
                        Id: scheduleObj.getEventMaxID(),
                        Subject: '',
                        StartTime: new Date(dates.getFullYear(), dates.getMonth(), dates.getDate(), new Date().getHours(), 0, 0),
                        EndTime: new Date(dates.getFullYear(), dates.getMonth(), dates.getDate(), new Date().getHours() + 1, 0, 0),
                        Location: '',
                        Description: '',
                        IsAllDay: false,
                        CalendarId: 1
                    };
                    scheduleObj.openEditor(recEventData, 'Add', true, 1);
                    break;
            }
        }
    });
    toolbarObj.appendTo('#toolbarOptions');

    let settingsBtn: Button = new Button({
        iconCss: 'e-icons e-settings',
        cssClass: 'e-inherit'
    });
    settingsBtn.appendTo('#settingsBtn');

    let resourceData: Record<string, any>[] = [
        { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
        { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
        { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
        { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
    ];
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '100%',
        cssClass: 'schedule-overview',
        views: [
            'Day', 'Week', 'WorkWeek', 'Month', 'Year', 'Agenda', 'TimelineDay',
            'TimelineWeek', 'TimelineWorkWeek', 'TimelineMonth', 'TimelineYear'
        ],
        timezone: 'UTC',
        group: { resources: ['Calendars'] },
        resources: [{
            field: 'CalendarId', title: 'Calendars', name: 'Calendars', allowMultiple: true,
            textField: 'CalendarText', idField: 'CalendarId', colorField: 'CalendarColor',
            dataSource: resourceData, query: new Query().where('CalendarId', 'equal', 1)
        }],
        dateHeaderTemplate: '<div class="date-text">${getDateHeaderDay(data.date)}</div><div class="date-text">' +
            '${getDateHeaderDate(data.date)}</div>${getWeather(data.date)}',
        eventSettings: { dataSource: generateEvents() },
        destroyed: () => {
            menuObj.destroy();
            if (liveTimeInterval) {
                clearInterval(liveTimeInterval as number);
            }
        }
    });
    scheduleObj.appendTo('#scheduler');

    let selectedTarget: Element;
    let targetElement: HTMLElement;
    let menuObj: ContextMenu = new ContextMenu({
        target: '.e-schedule',
        items: [
            { text: 'New Event', iconCss: 'e-icons e-plus', id: 'Add' },
            { text: 'New Recurring Event', iconCss: 'e-icons e-repeat', id: 'AddRecurrence' },
            { text: 'Today', iconCss: 'e-icons e-timeline-today', id: 'Today' },
            { text: 'Edit Event', iconCss: 'e-icons e-edit', id: 'Save' },
            { text: 'Delete Event', iconCss: 'e-icons e-trash', id: 'Delete' },
            {
                text: 'Delete Event', id: 'DeleteRecurrenceEvent', iconCss: 'e-icons e-trash',
                items: [
                    { text: 'Delete Occurrence', id: 'DeleteOccurrence' },
                    { text: 'Delete Series', id: 'DeleteSeries' }
                ]
            },
            {
                text: 'Edit Event', id: 'EditRecurrenceEvent', iconCss: 'e-icons e-edit',
                items: [
                    { text: 'Edit Occurrence', id: 'EditOccurrence' },
                    { text: 'Edit Series', id: 'EditSeries' }
                ]
            }
        ],
        beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
            let newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
            if (newEventElement) {
                remove(newEventElement);
                removeClass([document.querySelector('.e-selected-cell')], 'e-selected-cell');
            }
            scheduleObj.closeQuickInfoPopup();
            targetElement = <HTMLElement>args.event.target;
            if (closest(targetElement, '.e-contextmenu')) {
                return;
            }
            selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells,' +
                '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
            if (isNullOrUndefined(selectedTarget)) {
                args.cancel = true;
                return;
            }
            if (selectedTarget.classList.contains('e-appointment')) {
                let eventObj: Record<string, any> = <Record<string, any>>scheduleObj.getEventDetails(selectedTarget);
                if (eventObj.RecurrenceRule) {
                    menuObj.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
                    menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
                } else {
                    menuObj.showItems(['Save', 'Delete'], true);
                    menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
                }
                return;
            } else if ((selectedTarget.classList.contains('e-work-cells') || selectedTarget.classList.contains('e-all-day-cells')) &&
                !selectedTarget.classList.contains('e-selected-cell')) {
                removeClass([].slice.call(scheduleObj.element.querySelectorAll('.e-selected-cell')), 'e-selected-cell');
                selectedTarget.setAttribute('aria-selected', 'true');
                selectedTarget.classList.add('e-selected-cell');
            }
            menuObj.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
            menuObj.showItems(['Add', 'AddRecurrence', 'Today'], true);
        },
        select: (args: ContextMenuEventArgs) => {
            let selectedMenuItem: string = args.item.id;
            let eventObj: Record<string, any>;
            if (selectedTarget && selectedTarget.classList.contains('e-appointment')) {
                eventObj = <Record<string, any>>scheduleObj.getEventDetails(selectedTarget);
            }
            switch (selectedMenuItem) {
                case 'Today':
                    scheduleObj.selectedDate = new Date();
                    break;
                case 'Add':
                case 'AddRecurrence':
                    let selectedCells: Element[] = scheduleObj.getSelectedElements();
                    let activeCellsData: CellClickEventArgs = scheduleObj.getCellDetails(targetElement) ||
                        scheduleObj.getCellDetails(selectedCells.length > 0 ? selectedCells : selectedTarget);
                    if (selectedMenuItem === 'Add') {
                        scheduleObj.openEditor(activeCellsData, 'Add');
                    } else {
                        scheduleObj.openEditor(activeCellsData, 'Add', null, 1);
                    }
                    break;
                case 'Save':
                case 'EditOccurrence':
                case 'EditSeries':
                    if (selectedMenuItem === 'EditSeries') {
                        let query: Query = new Query().where(scheduleObj.eventFields.id, 'equal', eventObj.RecurrenceID as string | number);
                        eventObj = new DataManager(scheduleObj.eventsData).executeLocal(query)[0] as Record<string, any>;
                    }
                    scheduleObj.openEditor(eventObj, selectedMenuItem);
                    break;
                case 'Delete':
                    scheduleObj.deleteEvent(eventObj);
                    break;
                case 'DeleteOccurrence':
                case 'DeleteSeries':
                    scheduleObj.deleteEvent(eventObj, selectedMenuItem);
                    break;
            }
        },
        cssClass: 'schedule-context-menu'
    });
    menuObj.appendTo('#overviewContextMenu');

    let weekDays: Record<string, any>[] = [
        { text: 'Sunday', value: 0 },
        { text: 'Monday', value: 1 },
        { text: 'Tuesday', value: 2 },
        { text: 'Wednesday', value: 3 },
        { text: 'Thursday', value: 4 },
        { text: 'Friday', value: 5 },
        { text: 'Saturday', value: 6 }
    ];

    let weekFirstDay: DropDownList = new DropDownList({
        dataSource: weekDays,
        fields: { text: 'text', value: 'value' },
        popupHeight: 150,
        value: 0,
        change: (args: ChangeEventArgs) => scheduleObj.firstDayOfWeek = args.value as number
    });
    weekFirstDay.appendTo('#weekFirstDay');

    let workweek: MultiSelect = new MultiSelect({
        cssClass: 'schedule-workweek',
        dataSource: weekDays,
        fields: { text: 'text', value: 'value' },
        mode: 'CheckBox',
        enableSelectionOrder: false,
        showClearButton: false,
        showDropDownIcon: true,
        value: [1, 2, 3, 4, 5],
        change: (args: MultiSelectChangeEventArgs) => scheduleObj.workDays = args.value as number[]
    });
    workweek.appendTo('#workWeekDays');

    let resources: MultiSelect = new MultiSelect({
        cssClass: 'schedule-resource',
        dataSource: resourceData,
        fields: { text: 'CalendarText', value: 'CalendarId' },
        mode: 'CheckBox',
        showClearButton: false,
        showDropDownIcon: true,
        value: [1],
        change: (args: MultiSelectChangeEventArgs) => {
            let resourcePredicate: Predicate;
            for (let value of args.value) {
                if (resourcePredicate) {
                    resourcePredicate = resourcePredicate.or(new Predicate('CalendarId', 'equal', value));
                } else {
                    resourcePredicate = new Predicate('CalendarId', 'equal', value);
                }
            }
            scheduleObj.resources[0].query = resourcePredicate ? new Query().where(resourcePredicate) :
                new Query().where('CalendarId', 'equal', 1);
        }
    });
    resources.appendTo('#resources');

    let timezone: DropDownList = new DropDownList({
        dataSource: [
            { text: 'UTC -12:00', value: 'Etc/GMT+12' },
            { text: 'UTC -11:00', value: 'Etc/GMT+11' },
            { text: 'UTC -10:00', value: 'Etc/GMT+10' },
            { text: 'UTC -09:00', value: 'Etc/GMT+9' },
            { text: 'UTC -08:00', value: 'Etc/GMT+8' },
            { text: 'UTC -07:00', value: 'Etc/GMT+7' },
            { text: 'UTC -06:00', value: 'Etc/GMT+6' },
            { text: 'UTC -05:00', value: 'Etc/GMT+5' },
            { text: 'UTC -04:00', value: 'Etc/GMT+4' },
            { text: 'UTC -03:00', value: 'Etc/GMT+3' },
            { text: 'UTC -02:00', value: 'Etc/GMT+2' },
            { text: 'UTC -01:00', value: 'Etc/GMT+1' },
            { text: 'UTC +00:00', value: 'Etc/GMT' },
            { text: 'UTC +01:00', value: 'Etc/GMT-1' },
            { text: 'UTC +02:00', value: 'Etc/GMT-2' },
            { text: 'UTC +03:00', value: 'Etc/GMT-3' },
            { text: 'UTC +04:00', value: 'Etc/GMT-4' },
            { text: 'UTC +05:00', value: 'Etc/GMT-5' },
            { text: 'UTC +05:30', value: 'Asia/Calcutta' },
            { text: 'UTC +06:00', value: 'Etc/GMT-6' },
            { text: 'UTC +07:00', value: 'Etc/GMT-7' },
            { text: 'UTC +08:00', value: 'Etc/GMT-8' },
            { text: 'UTC +09:00', value: 'Etc/GMT-9' },
            { text: 'UTC +10:00', value: 'Etc/GMT-10' },
            { text: 'UTC +11:00', value: 'Etc/GMT-11' },
            { text: 'UTC +12:00', value: 'Etc/GMT-12' },
            { text: 'UTC +13:00', value: 'Etc/GMT-13' },
            { text: 'UTC +14:00', value: 'Etc/GMT-14' }
        ],
        fields: { text: 'text', value: 'value' },
        popupHeight: 150,
        value: 'Etc/GMT',
        change: (args: ChangeEventArgs) => {
            scheduleObj.timezone = args.value as string;
            updateLiveTime();
            document.querySelector('.schedule-overview #timezoneBtn').innerHTML = args.itemData.text;
        }
    });
    timezone.appendTo('#timezone');

    let dayStartHour: TimePicker = new TimePicker({
        value: new Date(new Date().setHours(0, 0, 0)), showClearButton: false,
        change: (args: TimeEventArgs) => {
            scheduleObj.startHour = new Internationalization().formatDate(args.value, { skeleton: 'Hm' });
        }
    });
    dayStartHour.appendTo('#dayStartHour');

    let dayEndHour: TimePicker = new TimePicker({
        value: new Date(new Date().setHours(23, 59, 59)), showClearButton: false,
        change: (args: TimeEventArgs) => {
            scheduleObj.endHour = new Internationalization().formatDate(args.value, { skeleton: 'Hm' });
        }
    });
    dayEndHour.appendTo('#dayEndHour');

    let workHourStart: TimePicker = new TimePicker({
        value: new Date(new Date().setHours(9, 0, 0)), showClearButton: false,
        change: (args: TimeEventArgs) => {
            scheduleObj.workHours.start = new Internationalization().formatDate(args.value, { skeleton: 'Hm' });
        }
    });
    workHourStart.appendTo('#workHourStart');

    let workHourEnd: TimePicker = new TimePicker({
        value: new Date(new Date().setHours(18, 0, 0)), showClearButton: false,
        change: (args: TimeEventArgs) => {
            scheduleObj.workHours.end = new Internationalization().formatDate(args.value, { skeleton: 'Hm' });
        }
    });
    workHourEnd.appendTo('#workHourEnd');

    let slotDuration: DropDownList = new DropDownList({
        dataSource: [
            { Name: '1 hour', Value: 60 },
            { Name: '1.5 hours', Value: 90 },
            { Name: '2 hours', Value: 120 },
            { Name: '2.5 hours', Value: 150 },
            { Name: '3 hours', Value: 180 },
            { Name: '3.5 hours', Value: 210 },
            { Name: '4 hours', Value: 240 },
            { Name: '4.5 hours', Value: 270 },
            { Name: '5 hours', Value: 300 },
            { Name: '5.5 hours', Value: 330 },
            { Name: '6 hours', Value: 360 },
            { Name: '6.5 hours', Value: 390 },
            { Name: '7 hours', Value: 420 },
            { Name: '7.5 hours', Value: 450 },
            { Name: '8 hours', Value: 480 },
            { Name: '8.5 hours', Value: 510 },
            { Name: '9 hours', Value: 540 },
            { Name: '9.5 hours', Value: 570 },
            { Name: '10 hours', Value: 600 },
            { Name: '10.5 hours', Value: 630 },
            { Name: '11 hours', Value: 660 },
            { Name: '11.5 hours', Value: 690 },
            { Name: '12 hours', Value: 720 }
        ],
        fields: { text: 'Name', value: 'Value' },
        popupHeight: 150,
        value: 60,
        change: (args: ChangeEventArgs) => scheduleObj.timeScale.interval = args.value as number
    });
    slotDuration.appendTo('#slotDuration');
    let slotInterval: DropDownList = new DropDownList({
        dataSource: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        popupHeight: 150,
        value: 2,
        change: (args: ChangeEventArgs) => scheduleObj.timeScale.slotCount = args.value as number
    });
    slotInterval.appendTo('#slotInterval');
    let timeFormat: DropDownList = new DropDownList({
        dataSource: [
            { Name: '12 hours', Value: 'hh:mm a' },
            { Name: '24 hours', Value: 'HH:mm' }
        ],
        fields: { text: 'Name', value: 'Value' },
        popupHeight: 150,
        value: 'hh:mm a',
        change: (args: ChangeEventArgs) => scheduleObj.timeFormat = args.value as string,
    });
    timeFormat.appendTo('#timeFormat');
    let weekNumber: DropDownList = new DropDownList({
        dataSource: [
            { Name: 'Off', Value: 'Off' },
            { Name: 'First Day of Year', Value: 'FirstDay' },
            { Name: 'First Full Week', Value: 'FirstFullWeek' },
            { Name: 'First Four-Day Week', Value: 'FirstFourDayWeek' }
        ],
        fields: { text: 'Name', value: 'Value' },
        popupHeight: 150,
        value: 'Off',
        change: (args: ChangeEventArgs) => {
            if (args.value === 'Off') {
                scheduleObj.showWeekNumber = false;
            } else {
                scheduleObj.showWeekNumber = true;
                scheduleObj.weekRule = args.value as any;
            }
        },
    });
    weekNumber.appendTo('#weekNumber');

    let tooltip: DropDownList = new DropDownList({
        dataSource: [
            { Name: 'Off', Value: 'Off' },
            { Name: 'On', Value: 'On' },
        ],
        fields: { text: 'Name', value: 'Value' },
        popupHeight: 150,
        value: 'Off',
        change: (args: ChangeEventArgs) => {
            if (args.value === 'Off') {
                scheduleObj.eventSettings.enableTooltip = false;
            } else {
                scheduleObj.eventSettings.enableTooltip = true;
            }
        },
    });
    tooltip.appendTo('#tooltip');
};
