import { loadCultureFiles } from '../common/culture-loader';
import {
    Schedule, Day, Week, TimelineMonth, Agenda, DragAndDrop, Resize, Month, Year, addDays, addMonths, addYears,
    resetTime, WEEK_LENGTH, ActionEventArgs, MS_PER_MINUTE, EventRenderedArgs, MS_PER_DAY, getWeekFirstDate,
    getWeekLastDate, EJ2Instance, PopupOpenEventArgs
} from '@syncfusion/ej2-schedule';
import { Sidebar, ClickEventArgs, Toolbar } from '@syncfusion/ej2-navigations';
import { Calendar, ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { ColorPicker, TextBox } from '@syncfusion/ej2-inputs';
import { Dialog } from '@syncfusion/ej2-popups';
import { Internationalization, isNullOrUndefined, extend, createElement } from '@syncfusion/ej2-base';
import { ListView, SelectEventArgs } from '@syncfusion/ej2-lists';
import { Grid } from '@syncfusion/ej2-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import * as dataSource from './datasource.json';

Schedule.Inject(Week, Day, Month, Agenda, TimelineMonth, Year, DragAndDrop, Resize);

/**
 * Schedule Event Calendar sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    const intl: Internationalization = new Internationalization();
    let calendars: Record<string, any>[] = [
        { name: 'My Calendar', id: 1, color: '#c43081', isSelected: true },
        { name: 'Company', id: 2, color: '#ff7f50', isSelected: true },
        { name: 'Birthday', id: 3, color: '#AF27CD', isSelected: true },
        { name: 'Holiday', id: 4, color: '#808000', isSelected: true }
    ];
    let isAdd: boolean;
    let selectedCalendars: Record<string, any> = getSelectedCalendars();
    let appointmentData: Record<string, any>[] = generateCalendarData();
    let filteredData: Record<string, any> = getFilteredData();

    function generateCalendarData(): Record<string, any>[] {
        let collections: Record<string, any>[] = [];
        const dataCollections: Object[][] =
            [(dataSource as any).personalData, (dataSource as any).companyData,
            (dataSource as any).birthdayData, (dataSource as any).holidayData];
        const oldTime: number = new Date(2021, 3, 1).getTime();
        const newTime: number = resetTime(new Date()).getTime();
        for (let data of dataCollections) {
            collections = collections.concat(data);
        }
        collections = extend([], collections, null, true) as Record<string, any>[];
        for (const data of collections) {
            data.IsPlanned = !(data.Id % 2);
            data.IsAllDay = [1, 2].indexOf(data.CalendarId) <= -1;
            const diff: number = oldTime - resetTime(new Date(data.StartTime)).getTime();
            const hour: number = Math.floor(Math.random() * (13 - 9) + 9);
            data.StartTime = new Date(newTime - diff + (data.IsAllDay ? 0 : (hour * 60 * MS_PER_MINUTE)));
            data.EndTime = new Date(data.StartTime.getTime() + (data.IsAllDay ? MS_PER_DAY : MS_PER_MINUTE * 60));
            data.ResourceId = Math.floor(Math.random() * 6) + 1;
        }
        return collections;
    }

    function getSelectedCalendars(): Record<string, any> {
        const selectedIds: number[] = [];
        const selectedItems: Record<string, any>[] = [];
        for (let calendar of calendars) {
            if (calendar.isSelected) {
                selectedIds.push(calendar.id);
                selectedItems.push(calendar);
            }
        }
        return { ids: selectedIds, items: selectedItems };
    }

    function getFilteredData(): Record<string, any> {
        const planned: Record<string, any>[] = [];
        const unPlanned: Record<string, any>[] = [];
        for (const data of appointmentData) {
            if (selectedCalendars.ids.indexOf(data.CalendarId) > -1) {
                if (data.IsPlanned) {
                    planned.push(data);
                } else {
                    unPlanned.push(data);
                }
            }
        }
        return { planned: planned, unPlanned: unPlanned };
    }

    const toolbarObj: Toolbar = new Toolbar({
        clicked: toolbarClick,
        items: [
            { tooltipText: "Menu", prefixIcon: "e-menu", cssClass: 'e-menu-btn' },
            { prefixIcon: "e-chevron-left", tooltipText: 'Previous', cssClass: 'e-previous' },
            { prefixIcon: "e-chevron-right", tooltipText: 'Next', cssClass: 'e-next' },
            { text: new Date().toLocaleDateString(), cssClass: 'e-date-range' },
            { text: "Create", align: 'Right', prefixIcon: "e-plus", cssClass: 'e-create' },
            { type: 'Separator', align: 'Right' },
            { text: 'Today', align: 'Right', cssClass: 'e-today' },
            { type: 'Separator', align: 'Right' },
            { text: 'Day', align: 'Right', cssClass: 'e-day' },
            { text: 'Week', align: 'Right', cssClass: 'e-week' },
            { text: 'Month', align: 'Right', cssClass: 'e-month' },
            { text: 'Agenda', align: 'Right', cssClass: 'e-agenda' },
            { text: 'Timeline', align: 'Right', cssClass: 'e-timeline' },
            { text: 'Year', align: 'Right', cssClass: 'e-year' },
        ],
        cssClass: 'event-calendar-toolbar'
    });
    toolbarObj.appendTo("#event-calendar-toolbar");

    const unPlannedEventsToolbarObj: Toolbar = new Toolbar({
        cssClass: 'unplanned-events-toolbar',
        items: [
            { prefixIcon: "e-exit-full-screen", cssClass: 'e-exit', tooltipText: 'Open/Close Sidebar', click: collapseRightSidebar },
            { template: '<h4 id="headerText">Unplanned Events</h4>' }
        ]
    });
    unPlannedEventsToolbarObj.appendTo('#unplanned-events-toolbar');

    function collapseRightSidebar(): void {
        if (rightSidebar.isOpen) {
            rightSidebar.toggle();
        }
    }

    const leftSidebar: Sidebar = new Sidebar({
        width: '300px',
        target: '.main-content'
    });
    leftSidebar.appendTo('#sidebar-left');

    const rightSidebar: Sidebar = new Sidebar({
        width: "300px",
        target: '.main-content',
        position: 'Right',
        type: 'Push',
        isOpen: false,
        created: (): void => {
            const open: HTMLElement = rightSidebar.element.parentElement.querySelector('#plannedOpen');
            const unplannedElement: HTMLElement = rightSidebar.element.parentElement.querySelector('.unplanned-container');
            if (open) {
                open.onclick = (): void => {
                    rightSidebar.show();
                    filteredData = getFilteredData();
                    grid.dataSource = extend([], filteredData.unPlanned, null, true) as Record<string, any>[];
                    if (unplannedElement) {
                        unplannedElement.style.display = 'none';
                    }
                }
            }
        },
        close: (): void => {
            const unplannedElement: HTMLElement = rightSidebar.element.parentElement.querySelector('.unplanned-container');
            if (unplannedElement) {
                unplannedElement.style.display = 'block';
            }
        }
    });
    rightSidebar.appendTo('#sidebar-right');

    const calendarObj: Calendar = new Calendar({
        cssClass: 'selected-date-calendar',
        value: new Date(),
        change: (args: ChangeEventArgs): void => {
            if (args?.isInteracted && scheduleObj) {
                scheduleObj.selectedDate = args.value;
            }
        }
    });
    calendarObj.appendTo('#calendar');

    const dialog: Dialog = new Dialog({
        cssClass: 'calendar-edit-dialog',
        header: 'New Calendar',
        content: '<div>Calendar Name</div><div class="dialog-content"><input id="text-box"><input id="color-picker" type="color"></div>',
        showCloseIcon: true,
        animationSettings: { effect: 'Zoom' },
        visible: false,
        width: '320px',
        isModal: true,
        buttons: [{ buttonModel: { content: 'Add', isPrimary: true } }]
    });
    dialog.appendTo('#dialog');
    let outlineTextBox: TextBox = new TextBox({
        placeholder: 'Enter the calendar name',
        cssClass: 'e-outline calendar-name',
        floatLabelType: 'Never',
    });
    outlineTextBox.appendTo('#text-box');

    const colorPicker: ColorPicker = new ColorPicker({ cssClass: 'calendar-color' }, '#color-picker');

    function updateTextValue(): void {
        if (isAdd) {
            if (outlineTextBox) {
                let newValue: string = outlineTextBox.value.trim();
                newValue = newValue === "" ? "New Calendar" : newValue;
                const newId: number = (calendars.length + 1);
                const newItem: {
                    name: string;
                    id: number;
                    color: string;
                    isSelected: boolean;
                } = { name: newValue, id: newId, color: colorPicker.value, isSelected: true };
                calendars.push(newItem);
                selectedCalendars = getSelectedCalendars();
                calendarsList.dataSource = extend([], calendars, null, true) as Record<string, any>[];
                dialog.hide();
            }
            isAdd = false;
        }
    }

    const calendarsList: ListView = new ListView({
        dataSource: calendars,
        template: "<div class='calendar-list-item'><div class='calendar-name' title='${name}'>${name}</div>${if(id !== 1)}<div class='calendar-buttons'><span id='calendar-edit-btn' class='e-icons e-edit' data-calendar-id='${id}'></span><span id='calendar-delete-btn' class='e-icons e-trash' data-calendar-id='${id}'></span></div>${/if}</div>",
        headerTemplate: '<div class="calendars-list-header"><div class="header-text">Calendars</div><div class="header-icon e-icons e-plus"></div></div>',
        showCheckBox: true,
        showHeader: true,
        actionComplete: onComplete,
        select: onChange,
        fields: { id: 'id', text: 'name', isChecked: 'isSelected' },
        height: '240px'
    });
    calendarsList.appendTo('#listview-def');

    function onChange(args: SelectEventArgs) {
        if (!isNullOrUndefined(args?.event?.target)) {
            const target: HTMLElement = args.event.target as HTMLElement;
            if (target.classList.contains('e-edit') && !isNullOrUndefined(args?.data) && !isNullOrUndefined(dialog)) {
                calendarsList.refresh();
                let dialogButton = dialog.element.querySelector('#saveButton');
                if (outlineTextBox) {
                    outlineTextBox.value = (args.data as Record<string, any>).name;
                    colorPicker.value = (args.data as Record<string, any>).color;
                    dialog.buttons = [{ buttonModel: { content: 'Save', isPrimary: true } }];
                    dialog.header = 'Edit Calendar';
                    dialog.show();
                    dialog.buttons = [{
                        buttonModel: { isPrimary: true, content: 'close' }, click: function () {
                            if (outlineTextBox) {
                                const newValue: string = outlineTextBox.value.trim();
                                const newColor: string = colorPicker.value.trim();
                                if (newValue.length > 0) {
                                    calendars = calendars.map((item: Record<string, any>): Record<string, any> => {
                                        if (item.name === (args.data as Record<string, any>).name) {
                                            return { ...item, name: newValue, color: newColor };
                                        }
                                        return item;
                                    });
                                    selectedCalendars = getSelectedCalendars();
                                    calendarsList.dataSource = extend([], calendars, null, true) as Record<string, any>[];
                                    scheduleObj.refreshEvents();
                                    dialog.hide();
                                }
                            }
                        }
                    }]
                }
            } else if (target.classList.contains('e-trash') && !isNullOrUndefined(args?.item) && calendars.length > 1) {
                calendarsList.removeItem(args.item);
                calendars = calendars.filter((item: Record<string, any>): boolean => item.id !== (args.data as Record<string, any>).id);
                appointmentData = appointmentData.filter((item: Record<string, any>): boolean => item.CalendarId !== (args.data as Record<string, any>).id);
                selectedCalendars = getSelectedCalendars();
                filteredData = getFilteredData();
                scheduleObj.eventSettings.dataSource = extend([], filteredData.planned, null, true) as Record<string, any>[];
                grid.dataSource = extend([], filteredData.unPlanned, null, true) as Record<string, any>[];
            } else {
                calendarSelection(args);
            }
        } else {
            calendarSelection(args);
        }
    }

    function changeCheckboxBackgroundColor(idFromArgs: number): void {
        const listItem: Element = calendarsList.element.querySelector(`[data-uid="${idFromArgs}"]`);
        if (listItem) {
            const checkboxFrame: Element = listItem.querySelector('.e-checkbox-wrapper .e-frame.e-check, .e-css.e-checkbox-wrapper .e-frame.e-check');
            const selectedItem: Record<string, any> = calendars.find((item: Record<string, any>): boolean => item.id === idFromArgs);
            if (checkboxFrame && selectedItem?.color) {
                (checkboxFrame as HTMLElement).style.backgroundColor = selectedItem.color as string;
                (checkboxFrame as HTMLElement).style.borderColor = selectedItem.color as string;
            }
        }
    }

    function applyBackgroundColors(): void {
        calendars.forEach((calendar: Record<string, any>): void => {
            const listItem: Element = calendarsList.element.querySelector(`[data-uid="${calendar.id}"]`);
            if (listItem) {
                const checkboxFrame: Element = listItem.querySelector(`.e-checkbox-wrapper .e-frame.e-check,
                    .e-css.e-checkbox-wrapper .e-frame.e-check,.e-checkbox-wrapper .e-frame,.e-css.e-checkbox-wrapper .e-frame`);
                if (checkboxFrame) {
                    (checkboxFrame as HTMLElement).style.backgroundColor = calendar.color;
                    (checkboxFrame as HTMLElement).style.borderColor = calendar.color;
                }
            }
        });
    }

    function calendarSelection(args: SelectEventArgs): void {
        const idFromArgs: number = Number((args.data as { [key: string]: Object; }).id);
        calendars[args.index].isSelected = args.isChecked;
        selectedCalendars = getSelectedCalendars();
        if (args.isChecked) {
            changeCheckboxBackgroundColor(idFromArgs);
        }
        filteredData = getFilteredData();
        scheduleObj.eventSettings.dataSource = extend([], filteredData.planned, null, true) as Record<string, any>[];
        grid.dataSource = extend([], filteredData.unPlanned, null, true) as Record<string, any>[];
    }

    function onComplete() {
        let iconAdd: HTMLElement = calendarsList.element.querySelector(".e-plus");
        applyBackgroundColors();
        if (iconAdd) {
            iconAdd.addEventListener("click", (args: MouseEvent): void => {
                isAdd = true;
                dialog.buttons = [{ buttonModel: { content: 'Add', isPrimary: true } }];
                if (outlineTextBox) {
                    outlineTextBox.value = "";
                    colorPicker.value = "#008000ff";
                }
                dialog.header = 'New Calendar';
                dialog.show();
                dialog.buttons = [{
                    buttonModel: { isPrimary: true, content: 'Add' }, click:  function() {
                        updateTextValue();
                    }
                }]
            });
        }
    }

    const scheduleObj: Schedule = new Schedule({
        currentView: 'Week',
        selectedDate: new Date(),
        views: [
            { option: 'Day' },
            { option: 'Week' },
            { option: 'Month' },
            { option: 'Agenda' },
            { option: 'Year' },
            { option: 'TimelineMonth', group: { resources: ['Resources'] } }
        ],
        height: '650px',
        eventSettings: {
            dataSource: extend([], filteredData.planned, null, true) as Record<string, any>[]
        },
        resources: [
            {
                field: 'ResourceId', title: 'Resources',
                name: 'Resources',
                dataSource: [
                    { name: 'Nancy', id: 1, color: '#df5286' },
                    { name: 'Steven', id: 2, color: '#7fa900' },
                    { name: 'Robert', id: 3, color: '#ea7a57' },
                    { name: 'Smith', id: 4, color: '#5978ee' },
                    { name: 'Micheal', id: 5, color: '#df5286' },
                    { name: 'Root', id: 6, color: '#00bdae' }
                ],
                textField: 'name', idField: 'id', colorField: 'color'
            }
        ],
        showHeaderBar: false,
        created: () => {
            updateDateRange();
        },
        actionComplete: actionComplete,
        eventRendered: (args: EventRenderedArgs): void => {
            const categoryColor: string = calendars.find((c: Record<string, any>): boolean => c.id === args.data.CalendarId)?.color;
            if (!args.element || !categoryColor) {
                return;
            }
            if (scheduleObj.currentView === 'Agenda') {
                (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
            } else {
                args.element.style.backgroundColor = categoryColor;
            }
        },
        popupOpen: (args: PopupOpenEventArgs): void => {
            if (args.type === "Editor") {
                if (!args.element.querySelector(".custom-field-row")) {
                    const row: HTMLElement = createElement("div", { className: "custom-field-row" });
                    const formElement: HTMLElement = args.element.querySelector(".e-schedule-form");
                    formElement.firstChild.insertBefore(row, args.element.querySelector(".e-resources-row"));
                    const container: HTMLElement = createElement("div", { className: "custom-field-container" });
                    const inputEle: HTMLElement = createElement("input", { className: "e-field", attrs: { name: "CalendarId" } });
                    container.appendChild(inputEle);
                    row.appendChild(container);
                    const dropDownList: DropDownList = new DropDownList({
                        dataSource: extend([], calendars, null, true) as Record<string, any>[],
                        cssClass: "calendar-ddl",
                        fields: { text: "name", value: "id" },
                        value: args.data?.CalendarId || selectedCalendars?.ids[0] || calendars[0]?.id,
                        floatLabelType: "Always", placeholder: "Calendar"
                    });
                    dropDownList.appendTo(inputEle);
                    inputEle.setAttribute("name", "CalendarId");
                } else {
                    const calendarDDL: DropDownList = (args.element.querySelector(".calendar-ddl input") as EJ2Instance).ej2_instances[0] as DropDownList;
                    calendarDDL.dataSource = extend([], calendars, null, true) as Record<string, any>[];
                    calendarDDL.value = args.data?.CalendarId || selectedCalendars?.ids[0] || calendars[0]?.id;
                }
            } else if (args.type === "QuickInfo" && isNullOrUndefined(args.data.Id)) {
                args.cancel = true;
            }
        }
    });
    scheduleObj.appendTo('#Schedule');

    function actionComplete(args: ActionEventArgs): void {
        if (args.requestType === 'dateNavigate' || args.requestType === 'viewNavigate') {
            updateDateRange();
            if (args.requestType === 'dateNavigate' && resetTime(calendarObj?.value) !== resetTime(scheduleObj.selectedDate)) {
                calendarObj.value = scheduleObj.selectedDate;
            }
        } else if (args.requestType === "eventCreated" || args.requestType === "eventChanged" || args.requestType === "eventRemoved") {
            for (const event of args.addedRecords) {
                event.IsPlanned = true;
                appointmentData.push(event);
            }
            for (const event of args.changedRecords) {
                const index: number = appointmentData.findIndex((item: Record<string, any>): boolean => item.Id === event.Id);
                appointmentData[index] = event;
            }
            for (const event of args.deletedRecords) {
                const index: number = appointmentData.findIndex((item: Record<string, any>): boolean => item.Id === event.Id);
                appointmentData.splice(index, 1);
            }
            const events: Record<string, any>[] = args.addedRecords.concat(args.changedRecords);
            for (const event of events) {
                let calendar: Record<string, any> = selectedCalendars.items.find((item: Record<string, any>): boolean => item.id === event.CalendarId);
                if (isNullOrUndefined(calendar)) {
                    calendar = calendars.find((item: Record<string, any>): boolean => item.id === event.CalendarId);
                    calendar.isSelected = true;
                    selectedCalendars = getSelectedCalendars();
                    filteredData = getFilteredData();
                    calendarsList.dataSource = extend([], calendars, null, true) as Record<string, any>[];
                    scheduleObj.eventSettings.dataSource = extend([], filteredData.planned, null, true) as Record<string, any>[];
                    grid.dataSource = extend([], filteredData.unPlanned, null, true) as Record<string, any>[];
                }
            }
        }
    }

    function updateDateRange(): void {
        let dateRange: string = '';
        const view: string = scheduleObj.currentView;
        switch (view) {
            case 'Day':
                dateRange = intl.formatDate(scheduleObj.selectedDate, { format: 'MMMM dd, yyyy' });
                break;
            case 'Week':
            case 'Agenda': {
                let currentViewDates: Date[] = scheduleObj.getCurrentViewDates();
                if (view === 'Week' && currentViewDates.length < 1) {
                    currentViewDates = [
                        getWeekFirstDate(scheduleObj.selectedDate, scheduleObj.firstDayOfWeek),
                        getWeekLastDate(scheduleObj.selectedDate, scheduleObj.firstDayOfWeek)
                    ];
                }
                if (currentViewDates.length > 0) {
                    const start: Date = currentViewDates[0];
                    const end: Date = currentViewDates[currentViewDates.length - 1];
                    if (start.getFullYear() !== end.getFullYear()) {
                        dateRange = intl.formatDate(start, { format: 'MMMM dd, yyyy' }) + ' - ' + intl.formatDate(end, { format: 'MMMM dd, yyyy' });
                    } else if (start.getMonth() !== end.getMonth()) {
                        dateRange = intl.formatDate(start, { format: 'MMMM dd' }) + ' - ' + intl.formatDate(end, { format: 'MMMM dd, yyyy' });
                    } else {
                        dateRange = intl.formatDate(start, { format: 'MMMM dd' }) + ' - ' + intl.formatDate(end, { format: 'dd, yyyy' });
                    }
                }
                break;
            }
            case 'Month':
            case 'TimelineMonth':
                dateRange = intl.formatDate(scheduleObj.selectedDate, { format: 'MMMM yyyy' });
                break;
            case 'Year':
                dateRange = intl.formatDate(scheduleObj.selectedDate, { format: 'yyyy' });
                break;
            default:
                break;
        }
        if (dateRange !== '' && toolbarObj) {
            const dateRangeElement: HTMLElement = toolbarObj.element.querySelector('.e-date-range .e-tbar-btn-text');
            toolbarObj.element.querySelector('.e-date-range .e-tbar-btn').setAttribute('aria-label', dateRange);
            dateRangeElement.textContent = dateRange;
        }
    }

    function toolbarClick(args: ClickEventArgs): void {
        if (!args.item) {
            return;
        }
        switch (args.item.cssClass) {
            case 'e-menu-btn':
                leftSidebar.toggle();
                break;
            case 'e-create':
                if (scheduleObj && calendars.length > 0) {
                    const data: Record<string, any> = {
                        StartTime: resetTime(new Date()),
                        EndTime: resetTime(addDays(new Date(), 1)),
                        ResourceId: selectedCalendars?.ids[0] || calendars[0]?.id
                    };
                    scheduleObj.openEditor(data, 'Add', true);
                }
                break;
            case 'e-previous':
                scheduleObj.selectedDate = getPreviousNextDate(true);
                break;
            case 'e-next':
                scheduleObj.selectedDate = getPreviousNextDate(false);
                break;
            case 'e-today':
                scheduleObj.selectedDate = new Date();
                break;
            case 'e-day':
                scheduleObj.currentView = 'Day';
                break;
            case 'e-week':
                scheduleObj.currentView = 'Week';
                break;
            case 'e-month':
                scheduleObj.currentView = 'Month';
                break;
            case 'e-agenda':
                scheduleObj.currentView = 'Agenda';
                break;
            case 'e-timeline':
                scheduleObj.currentView = 'TimelineMonth';
                break;
            case 'e-year':
                scheduleObj.currentView = 'Year';
                break;
            default:
                break;
        }
    }

    function getPreviousNextDate(isPrevious: boolean): Date {
        let currentDate: Date = scheduleObj.selectedDate;
        if (scheduleObj) {
            const view: string = scheduleObj.currentView;
            switch (view) {
                case 'Day':
                case 'Agenda':
                    currentDate = addDays(currentDate, isPrevious ? -1 : 1);
                    break;
                case 'Week':
                    currentDate = addDays(currentDate, isPrevious ? -WEEK_LENGTH : WEEK_LENGTH);
                    break;
                case 'Month':
                case 'TimelineMonth':
                    currentDate = addMonths(currentDate, isPrevious ? -1 : 1);
                    break;
                case 'Year':
                    currentDate = addYears(currentDate, isPrevious ? -1 : 1);
                    break;
                default:
                    break;
            }
        }
        return currentDate;
    }

    const grid: Grid = new Grid({
        cssClass: 'unplanned-events-grid',
        dataSource: extend([], filteredData.unplanned, null, true) as Record<string, any>[],
        columns: [
            { field: 'Subject', headerText: 'Event', textAlign: 'Left', width: 120 },
            { field: 'StartTime', width: 140, headerText: 'Date', format: 'dd MMMM yyyy' },
        ]
    });
    grid.appendTo("#unplanned-events-grid");
};