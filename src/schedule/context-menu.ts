import { loadCultureFiles } from '../common/culture-loader';
import { closest, isNullOrUndefined, removeClass, remove, extend } from '@syncfusion/ej2-base';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, CellClickEventArgs } from '@syncfusion/ej2-schedule';
import { ContextMenu, MenuItemModel, BeforeOpenCloseMenuEventArgs, MenuEventArgs } from '@syncfusion/ej2-navigations';
import * as dataSource from './datasource.json';

/**
 * Schedule Context Menu sample
 */

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);
(window as any).default = (): void => {
    loadCultureFiles();
    // tslint:disable-next-line:max-func-body-length
    let data: Object[] = <Object[]>extend([], (dataSource as any).scheduleData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2021, 0, 10),
        eventSettings: { dataSource: data },
        destroyed: () => {
            menuObj.destroy();
        }
    });
    scheduleObj.appendTo('#Schedule');

    let selectedTarget: Element;
    let menuObj: ContextMenu;
    let menuItems: MenuItemModel[] = [
        { text: 'New Event', iconCss: 'e-icons e-plus', id: 'Add' },
        { text: 'New Recurring Event', iconCss: 'e-icons e-repeat', id: 'AddRecurrence' },
        { text: 'Today', iconCss: 'e-icons e-timeline-today', id: 'Today' },
        { text: 'Edit Event', iconCss: 'e-icons e-edit', id: 'Save' },
        {
            text: 'Edit Event', id: 'EditRecurrenceEvent', iconCss: 'e-icons e-edit', items: [
                { text: 'Edit Occurrence', id: 'EditOccurrence' },
                { text: 'Edit Series', id: 'EditSeries' }
            ]
        },
        { text: 'Delete Event', iconCss: 'e-icons e-trash', id: 'Delete' },
        {
            text: 'Delete Event', id: 'DeleteRecurrenceEvent', iconCss: 'e-icons e-trash', items: [
                { text: 'Delete Occurrence', id: 'DeleteOccurrence' },
                { text: 'Delete Series', id: 'DeleteSeries' }
            ]
        }
    ];
    menuObj = new ContextMenu({
        target: '.e-schedule',
        items: menuItems,
        beforeOpen: onContextMenuBeforeOpen,
        select: onMenuItemSelect,
        cssClass: 'schedule-context-menu'
    });
    menuObj.appendTo('#ScheduleContextMenu');

    function onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        let newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
        if (newEventElement) {
            remove(newEventElement);
            removeClass([document.querySelector('.e-selected-cell')], 'e-selected-cell');
        }
        scheduleObj.closeQuickInfoPopup();
        let targetElement: HTMLElement = <HTMLElement>args.event.target;
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
        } else if ((selectedTarget.classList.contains('e-work-cells') || selectedTarget.classList.contains('e-all-day-cells')) &&
            !selectedTarget.classList.contains('e-selected-cell')) {
            removeClass([].slice.call(scheduleObj.element.querySelectorAll('.e-selected-cell')), 'e-selected-cell');
            selectedTarget.classList.add('e-selected-cell');
            selectedTarget.setAttribute('aria-selected', 'true');
        }
        menuObj.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
        menuObj.showItems(['Add', 'AddRecurrence', 'Today'], true);
    }

    function onMenuItemSelect(args: MenuEventArgs): void {
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
                let activeCellsData: CellClickEventArgs =
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
                    eventObj = <{ [key: string]: Object }>new DataManager(scheduleObj.eventsData).executeLocal(new Query().
                        where(scheduleObj.eventFields.id, 'equal', eventObj[scheduleObj.eventFields.recurrenceID] as string | number))[0];
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
    }
};
