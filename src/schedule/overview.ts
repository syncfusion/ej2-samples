import { loadCultureFiles } from '../common/culture-loader';
import { addClass, closest, extend, isNullOrUndefined, remove, removeClass, Browser, Internationalization } from '@syncfusion/ej2-base';
import { Button, Switch, ChangeEventArgs as SwitchEventArgs } from '@syncfusion/ej2-buttons';
import { TimePicker, ChangeEventArgs as TimeEventArgs } from '@syncfusion/ej2-calendars';
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';
import { DropDownList, MultiSelect, ChangeEventArgs, CheckBoxSelection, MultiSelectChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { TextBox, Uploader, SelectedEventArgs } from '@syncfusion/ej2-inputs';
import {
    ContextMenu, BeforeOpenCloseMenuEventArgs, Toolbar, ClickEventArgs, MenuEventArgs as ContextMenuEventArgs
} from '@syncfusion/ej2-navigations';
import {
    Schedule, Day, Week, WorkWeek, Month, Year, Agenda, TimelineViews, TimelineMonth, TimelineYear, EJ2Instance, Resize, DragAndDrop,
    ICalendarExport, ICalendarImport, Print, ExcelExport, ResourcesModel, CurrentAction, CellClickEventArgs, PopupOpenEventArgs, Timezone
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
        getHeaderDetails?: Function;
        getHeaderStyles?: Function;
        getEventType?: Function;
        getResourceData?: Function;
        getDateHeaderText?: Function;
        getWeather?: Function;
    }

    let intlObj: Internationalization = new Internationalization();
    (window as TemplateFunction).getDateHeaderText = (value: Date) => {
        return intlObj.formatDate(value, { skeleton: 'Ed' });
    };
    (window as TemplateFunction).getWeather = (date: Date) => {
        let imgPath: string;
        let celsius: string;
        switch (date.getDay()) {
            case 0:
                imgPath = 'src/schedule/images/weather-clear.svg';
                celsius = '25°C';
                break;
            case 1:
                imgPath = 'src/schedule/images/weather-clouds.svg';
                celsius = '18°C';
                break;
            case 2:
                imgPath = 'src/schedule/images/weather-rain.svg';
                celsius = '10°C';
                break;
            case 3:
                imgPath = 'src/schedule/images/weather-clouds.svg';
                celsius = '16°C';
                break;
            case 4:
                imgPath = 'src/schedule/images/weather-rain.svg';
                celsius = '8°C';
                break;
            case 5:
                imgPath = 'src/schedule/images/weather-clear.svg';
                celsius = '27°C';
                break;
            case 6:
                imgPath = 'src/schedule/images/weather-clouds.svg';
                celsius = '17°C';
                break;
        }
        return '<img class="weather-image" src="' + imgPath + '"/><div class="weather-text">' + celsius + '</div>';
    };

    (window as TemplateFunction).getResourceData = (data: { [key: string]: Object }) => {
        let resources: ResourcesModel = scheduleObj.getResourceCollections().slice(-1)[0];
        let resourceData: { [key: string]: Object } =
            (resources.dataSource as { [key: string]: Object }[]).filter((resource: { [key: string]: Object }) =>
                resource.CalendarId === data.CalendarId)[0] as { [key: string]: Object };
        return resourceData;
    };

    (window as TemplateFunction).getHeaderDetails = (eventObj: { [key: string]: Date }) => {
        return intlObj.formatDate(eventObj.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
            intlObj.formatDate(eventObj.StartTime, { skeleton: 'hm' }) + ' - ' +
            intlObj.formatDate(eventObj.EndTime, { skeleton: 'hm' }) + ')';
    };

    (window as TemplateFunction).getHeaderStyles = (data: { [key: string]: Object }) => {
        if (data.elementType === 'event') {
            let resourceData: { [key: string]: Object } = (window as TemplateFunction).getResourceData(data);
            return 'background:' + resourceData.CalendarColor + '; color: #FFFFFF;';
        } else {
            return 'align-items: center; color: #919191;';
        }
    };

    (window as TemplateFunction).getEventType = (data: { [key: string]: Date }) => {
        let resourceData: { [key: string]: Object } = (window as TemplateFunction).getResourceData(data);
        return resourceData.CalendarText;
    };

    let updateLiveTime: Function = (): void => {
        let scheduleTimezone: string = scheduleObj ? scheduleObj.timezone : 'Etc/GMT';
        let timeBtn: Element = document.querySelector('.schedule-overview #timeBtn');
        if (timeBtn) {
            timeBtn.innerHTML = '<span class="e-btn-icon e-icons e-schedule-clock e-icon-left"></span>' +
                new Date().toLocaleTimeString('en-US', { timeZone: scheduleTimezone });
        }
    };

    let generateEvents: Function = (): Object[] => {
        let eventData: Object[] = [];
        let eventSubjects: string[] = [
            'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
            'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day', 'MoonShiners',
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
        let utcTimezone: never = 'UTC' as never;
        let currentTimezone: never = timezone.getLocalTimezoneName() as never;
        for (let event of overviewEvents) {
            event.StartTime = timezone.convert(event.StartTime, utcTimezone, currentTimezone);
            event.EndTime = timezone.convert(event.EndTime, utcTimezone, currentTimezone);
        }
        return overviewEvents;
    };

    let buttonClickActions: Function = (e: Event) => {
        let quickPopup: HTMLElement = scheduleObj.element.querySelector('.e-quick-popup-wrapper') as HTMLElement;
        let getSlotData: Function = (): { [key: string]: Object } => {
            let cellDetails: CellClickEventArgs = scheduleObj.getCellDetails(scheduleObj.getSelectedElements());
            let eventObj: { [key: string]: Object } = {};
            eventObj.Id = scheduleObj.getEventMaxID();
            eventObj.Subject = ((quickPopup.querySelector('#title') as EJ2Instance).ej2_instances[0] as TextBox).value;
            eventObj.StartTime = new Date(+cellDetails.startTime);
            eventObj.EndTime = new Date(+cellDetails.endTime);
            eventObj.Description = ((quickPopup.querySelector('#notes') as EJ2Instance).ej2_instances[0] as TextBox).value;
            eventObj.CalendarId = ((quickPopup.querySelector('#eventType') as EJ2Instance).ej2_instances[0] as DropDownList).value;
            return eventObj;
        };
        if ((e.target as HTMLElement).id === 'add') {
            scheduleObj.addEvent(getSlotData());
        } else if ((e.target as HTMLElement).id === 'delete') {
            let currentAction: CurrentAction;
            if ((scheduleObj.activeEventData.event as { [key: string]: string }).RecurrenceRule) {
                currentAction = 'DeleteOccurrence';
            }
            scheduleObj.deleteEvent(scheduleObj.activeEventData.event as { [key: string]: Object }, currentAction);
        } else {
            let isCellPopup: boolean = quickPopup.firstElementChild.classList.contains('e-cell-popup');
            let eventDetails: { [key: string]: Object } = isCellPopup ? getSlotData() :
                scheduleObj.activeEventData.event as { [key: string]: Object };
            let currentAction: CurrentAction = isCellPopup ? 'Add' : 'Save';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'EditOccurrence';
            }
            scheduleObj.openEditor(eventDetails, currentAction, true);
        }
        scheduleObj.closeQuickInfoPopup();
    };

    let isTimelineView: boolean = false;

    let timezoneBtn: Button = new Button({ iconCss: 'e-icons e-schedule-timezone', cssClass: 'title-bar-btn', disabled: true });
    timezoneBtn.appendTo('#timezoneBtn');

    let timeBtn: Button = new Button({ iconCss: 'e-icons e-schedule-clock', cssClass: 'title-bar-btn', disabled: true });
    timeBtn.appendTo('#timeBtn');

    let printBtn: Button = new Button({ iconCss: 'e-icons e-schedule-print', cssClass: 'title-bar-btn' });
    printBtn.appendTo('#printBtn');
    printBtn.element.onclick = () => { scheduleObj.print(); };

    let importObj: Uploader = new Uploader({
        allowedExtensions: '.ics',
        cssClass: 'calendar-import',
        buttons: { browse: 'Import' },
        multiple: false,
        showFileList: false,
        selected: (args: SelectedEventArgs) => scheduleObj.importICalendar((<HTMLInputElement>args.event.target).files[0])
    });
    importObj.appendTo('#icalendar');

    let exportObj: DropDownButton = new DropDownButton({
        items: [
            { text: 'iCalendar', iconCss: 'e-icons e-schedule-ical-export' },
            { text: 'Excel', iconCss: 'e-icons e-schedule-excel-export' }
        ],
        select: (args: MenuEventArgs) => {
            if (args.item.text === 'Excel') {
                let exportDatas: { [key: string]: Object }[] = [];
                let eventCollection: Object[] = scheduleObj.getEvents();
                let resourceCollection: ResourcesModel[] = scheduleObj.getResourceCollections();
                let resourceData: { [key: string]: Object }[] = resourceCollection[0].dataSource as { [key: string]: Object }[];
                for (let resource of resourceData) {
                    let data: Object[] = eventCollection.filter((e: { [key: string]: Object }) => e.CalendarId === resource.CalendarId);
                    exportDatas = exportDatas.concat(data as { [key: string]: Object }[]);
                }
                scheduleObj.exportToExcel({
                    exportType: 'xlsx', customData: exportDatas, fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'CalendarId']
                });
            } else {
                scheduleObj.exportToICalendar();
            }
        }
    });
    exportObj.appendTo('#exporting');

    let timelineTemplate: string = '<div style="height: 46px; line-height: 23px;"><div class="icon-child" style="text-align: center;">' +
        '<button id="timeline_views"></button></div><div class="text-child" style="font-size: 14px;">Timeline Views</div></div>';
    let allowMultiDrag: string = '<div style="height: 46px; line-height: 23px;"><div class="icon-child" style="text-align: center;">' +
        '<button id="multi_drag"></button></div><div class="text-child" style="font-size: 14px;">Allow Multi Drag</div></div>';
    let groupTemplate: string = '<div style="height: 46px; line-height: 23px;"><div class="icon-child" style="text-align: center;">' +
        '<button id="grouping"></button></div><div class="text-child" style="font-size: 14px;">Grouping</div></div>';
    let gridlineTemplate: string = '<div style="height: 46px; line-height: 23px;"><div class="icon-child" style="text-align: center;">' +
        '<button id="gridlines"></button></div><div class="text-child" style="font-size: 14px;">Gridlines</div></div>';
    let autoHeightTemplate: string = '<div style="height: 46px; line-height: 23px;"><div class="icon-child" style="text-align: center;">' +
        '<button id="row_auto_height"></button></div><div class="text-child" style="font-size: 14px;">Row Auto Height</div></div>';
    let tooltipTemplate: string = '<div style="height: 46px; line-height: 23px;"><div class="icon-child" style="text-align: center;">' +
        '<button id="tooltip"></button></div><div class="text-child" style="font-size: 14px;">Tooltip</div></div>';

    let toolbarObj: Toolbar = new Toolbar({
        height: 70,
        overflowMode: 'Scrollable',
        scrollStep: 100,
        items: [
            { prefixIcon: 'e-icons e-schedule-add-event', tooltipText: 'New Event', text: 'New Event' },
            { prefixIcon: 'e-icons e-schedule-add-recurrence-event', tooltipText: 'New Recurring Event', text: 'New Recurring Event' },
            { type: 'Separator' },
            { prefixIcon: 'e-icons e-schedule-day-view', tooltipText: 'Day', text: 'Day' },
            { prefixIcon: 'e-icons e-schedule-week-view', tooltipText: 'Week', text: 'Week' },
            { prefixIcon: 'e-icons e-schedule-workweek-view', tooltipText: 'WorkWeek', text: 'WorkWeek' },
            { prefixIcon: 'e-icons e-schedule-month-view', tooltipText: 'Month', text: 'Month' },
            { prefixIcon: 'e-icons e-schedule-year-view', tooltipText: 'Year', text: 'Year' },
            { prefixIcon: 'e-icons e-schedule-agenda-view', tooltipText: 'Agenda', text: 'Agenda' },
            { tooltipText: 'Timeline Views', text: 'Timeline Views', template: timelineTemplate },
            { type: 'Separator' },
            { tooltipText: 'Grouping', text: 'Grouping', template: groupTemplate },
            { tooltipText: 'Gridlines', text: 'Gridlines', template: gridlineTemplate },
            { tooltipText: 'Row Auto Height', text: 'Row Auto Height', template: autoHeightTemplate },
            { tooltipText: 'Tooltip', text: 'Tooltip', template: tooltipTemplate },
            { tooltipText: 'Allow Multi Drag', text: 'Allow Multi Drag', template: allowMultiDrag },
        ],
        created: () => {
            setInterval(() => { updateLiveTime(); }, 1000);

            let timelineView: Switch = new Switch({
                checked: false,
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
            timelineView.appendTo('#timeline_views');
            let multiDrag: Switch = new Switch({
                checked: false,
                change: (args: SwitchEventArgs) => { scheduleObj.allowMultiDrag = args.checked; }
            });
            multiDrag.appendTo('#multi_drag');
            let grouping: Switch = new Switch({
                checked: true,
                change: (args: SwitchEventArgs) => { scheduleObj.group.resources = args.checked ? ['Calendars'] : []; }
            });
            grouping.appendTo('#grouping');
            let gridlines: Switch = new Switch({
                checked: true,
                change: (args: SwitchEventArgs) => { scheduleObj.timeScale.enable = args.checked; }
            });
            gridlines.appendTo('#gridlines');
            let rowAutoHeight: Switch = new Switch({
                checked: false,
                change: (args: SwitchEventArgs) => { scheduleObj.rowAutoHeight = args.checked; }
            });
            rowAutoHeight.appendTo('#row_auto_height');
            let tooltip: Switch = new Switch({
                checked: false,
                change: (args: SwitchEventArgs) => { scheduleObj.eventSettings.enableTooltip = args.checked; }
            });
            tooltip.appendTo('#tooltip');

            (document.querySelector('#settingsBtn') as HTMLButtonElement).onclick = () => {
                let settingsPanel: Element = document.querySelector('.overview-content .right-panel');
                if (settingsPanel.classList.contains('hide')) {
                    removeClass([settingsPanel], 'hide');
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
    toolbarObj.appendTo('#toolbar_options');

    let settingsBtn: Button = new Button({
        iconCss: 'e-icons e-schedule-toolbar-settings',
        cssClass: 'overview-toolbar-settings', iconPosition: 'Top'
    });
    settingsBtn.appendTo('#settingsBtn');

    let resourceData: { [key: string]: Object }[] = [
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
        dateHeaderTemplate: '#date-header-template',
        quickInfoTemplates: {
            header: '#header-template',
            content: '#content-template',
            footer: '#footer-template'
        },
        eventSettings: { dataSource: generateEvents() },
        popupOpen: (args: PopupOpenEventArgs) => {
            if (args.type === 'QuickInfo') {
                let titleObj: TextBox = new TextBox({ placeholder: 'Title' });
                titleObj.appendTo(args.element.querySelector('#title') as HTMLElement);
                let typeObj: DropDownList = new DropDownList({
                    dataSource: resourceData,
                    placeholder: 'Choose Type',
                    fields: { text: 'CalendarText', value: 'CalendarId' },
                    index: 0
                });
                typeObj.appendTo(args.element.querySelector('#eventType') as HTMLElement);
                let notesObj: TextBox = new TextBox({ placeholder: 'Notes' });
                notesObj.appendTo(args.element.querySelector('#notes') as HTMLElement);

                let moreDetailsBtn: HTMLButtonElement = args.element.querySelector('#more-details') as HTMLButtonElement;
                if (moreDetailsBtn) {
                    let moreObj: Button = new Button({
                        content: 'More Details', cssClass: 'e-flat',
                        isPrimary: args.element.firstElementChild.classList.contains('e-event-popup')
                    });
                    moreObj.appendTo(moreDetailsBtn);
                    moreDetailsBtn.onclick = (e: Event) => { buttonClickActions(e); };
                }
                let addBtn: HTMLButtonElement = args.element.querySelector('#add') as HTMLButtonElement;
                if (addBtn) {
                    new Button({ content: 'Add', cssClass: 'e-flat', isPrimary: true }, addBtn);
                    addBtn.onclick = (e: Event) => { buttonClickActions(e); };
                }
                let deleteBtn: HTMLButtonElement = args.element.querySelector('#delete') as HTMLButtonElement;
                if (deleteBtn) {
                    new Button({ content: 'Delete', cssClass: 'e-flat' }, deleteBtn);
                    deleteBtn.onclick = (e: Event) => { buttonClickActions(e); };
                }
            }
        }
    });
    scheduleObj.appendTo('#scheduler');

    let selectedTarget: Element;
    let targetElement: HTMLElement;
    let menuObj: ContextMenu = new ContextMenu({
        target: '.e-schedule',
        items: [
            { text: 'New Event', iconCss: 'e-icons new', id: 'Add' },
            { text: 'New Recurring Event', iconCss: 'e-icons recurrence', id: 'AddRecurrence' },
            { text: 'Today', iconCss: 'e-icons today', id: 'Today' },
            { text: 'Edit Event', iconCss: 'e-icons edit', id: 'Save' },
            { text: 'Delete Event', iconCss: 'e-icons delete', id: 'Delete' },
            {
                text: 'Delete Event', id: 'DeleteRecurrenceEvent', iconCss: 'e-icons delete',
                items: [
                    { text: 'Delete Occurrence', id: 'DeleteOccurrence' },
                    { text: 'Delete Series', id: 'DeleteSeries' }
                ]
            },
            {
                text: 'Edit Event', id: 'EditRecurrenceEvent', iconCss: 'e-icons edit',
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
                let eventObj: { [key: string]: Object } = <{ [key: string]: Object }>scheduleObj.getEventDetails(selectedTarget);
                if (eventObj.RecurrenceRule) {
                    menuObj.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
                    menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
                } else {
                    menuObj.showItems(['Save', 'Delete'], true);
                    menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
                }
                return;
            }
            menuObj.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
            menuObj.showItems(['Add', 'AddRecurrence', 'Today'], true);
        },
        select: (args: ContextMenuEventArgs) => {
            let selectedMenuItem: string = args.item.id;
            let eventObj: { [key: string]: Object };
            if (selectedTarget && selectedTarget.classList.contains('e-appointment')) {
                eventObj = <{ [key: string]: Object }>scheduleObj.getEventDetails(selectedTarget);
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
                        eventObj = new DataManager(scheduleObj.eventsData).executeLocal(query)[0] as { [key: string]: Object };
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
    menuObj.appendTo('#ContextMenu');

    let weekDays: { [key: string]: Object }[] = [
        { text: 'Sunday', value: 0 },
        { text: 'Monday', value: 1 },
        { text: 'Tuesday', value: 2 },
        { text: 'Wednesday', value: 3 },
        { text: 'Thursday', value: 4 },
        { text: 'Friday', value: 5 },
        { text: 'Saturday', value: 6 }
    ];

    let weekFirstDay: DropDownList = new DropDownList({
        width: 170,
        dataSource: weekDays,
        fields: { text: 'text', value: 'value' },
        popupHeight: 150,
        value: 0,
        change: (args: ChangeEventArgs) => scheduleObj.firstDayOfWeek = args.value as number
    });
    weekFirstDay.appendTo('#weekFirstDay');

    let workweek: MultiSelect = new MultiSelect({
        cssClass: 'schedule-workweek',
        width: 170,
        dataSource: weekDays,
        fields: { text: 'text', value: 'value' },
        mode: 'CheckBox',
        enableSelectionOrder: false,
        showClearButton: false,
        showDropDownIcon: true,
        popupHeight: 150,
        value: [1, 2, 3, 4, 5],
        change: (args: MultiSelectChangeEventArgs) => scheduleObj.workDays = args.value as number[]
    });
    workweek.appendTo('#workWeekDays');

    let resources: MultiSelect = new MultiSelect({
        cssClass: 'schedule-resource',
        width: 170,
        dataSource: resourceData,
        fields: { text: 'CalendarText', value: 'CalendarId' },
        mode: 'CheckBox',
        showClearButton: false,
        showDropDownIcon: true,
        popupHeight: 150,
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
        width: 170,
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
            document.querySelector('.schedule-overview #timezoneBtn').innerHTML =
                '<span class="e-btn-icon e-icons e-schedule-timezone e-icon-left"></span>' + args.itemData.text;
        }
    });
    timezone.appendTo('#timezone');

    let dayStartHour: TimePicker = new TimePicker({
        width: 170, value: new Date(new Date().setHours(0, 0, 0)), showClearButton: false,
        change: (args: TimeEventArgs) => {
            scheduleObj.startHour = new Internationalization().formatDate(args.value, { skeleton: 'Hm' });
        }
    });
    dayStartHour.appendTo('#dayStartHour');

    let dayEndHour: TimePicker = new TimePicker({
        width: 170, value: new Date(new Date().setHours(23, 59, 59)), showClearButton: false,
        change: (args: TimeEventArgs) => {
            scheduleObj.endHour = new Internationalization().formatDate(args.value, { skeleton: 'Hm' });
        }
    });
    dayEndHour.appendTo('#dayEndHour');

    let workHourStart: TimePicker = new TimePicker({
        width: 170, value: new Date(new Date().setHours(9, 0, 0)), showClearButton: false,
        change: (args: TimeEventArgs) => {
            scheduleObj.workHours.start = new Internationalization().formatDate(args.value, { skeleton: 'Hm' });
        }
    });
    workHourStart.appendTo('#workHourStart');

    let workHourEnd: TimePicker = new TimePicker({
        width: 170, value: new Date(new Date().setHours(18, 0, 0)), showClearButton: false,
        change: (args: TimeEventArgs) => {
            scheduleObj.workHours.end = new Internationalization().formatDate(args.value, { skeleton: 'Hm' });
        }
    });
    workHourEnd.appendTo('#workHourEnd');

    let slotDuration: DropDownList = new DropDownList({
        width: 170,
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
        width: 170,
        dataSource: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        popupHeight: 150,
        value: 2,
        change: (args: ChangeEventArgs) => scheduleObj.timeScale.slotCount = args.value as number
    });
    slotInterval.appendTo('#slotInterval');
    let timeFormat: DropDownList = new DropDownList({
        width: 170,
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
        width: 170,
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
    weekNumber.appendTo('#week_number');

};
