import { Schedule, Day, Week, Resize, DragAndDrop, EventRenderedArgs, PopupOpenEventArgs, View } from '@syncfusion/ej2-schedule';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';
import { applyCategoryColor } from './helper';

Schedule.Inject(Day, Week, Resize, DragAndDrop);

/**
 * Event Actions Buttons Sample
 */

(window as any).default = () => {

    let intl: Internationalization = new Internationalization();

    function getTimeString(value: Date): string {
        return intl.formatDate(value, { format: 'HH:mm' });
    }

    let data: Object[] = <Object[]>extend([], (dataSource as any).actionEventData, null, true);

    function eventTemplate(data: Record<string, any>): string {
        return '<div class="custom-event">' +
                    '<div class="event-subject">' +
                        '<span class="event-title">' + data.Subject + '</span>' +
                    '</div>' +
                    '<div class="event-actions">' +
                        '<button class="icon-btn edit-btn">' +
                            '<span class="e-icons e-edit"></span>' +
                        '</button>' +
                        '<button class="icon-btn delete-btn">' +
                            '<span class="e-icons e-trash"></span>' +
                        '</button>' +
                    '</div>' +
                '</div>' +
                '<div class="event-time">Time: ' + getTimeString(new Date(data.StartTime)) + ' - ' + getTimeString(new Date(data.EndTime)) + '</div>';
    }

    let scheduleObj: Schedule;

    function onPopupOpen(args: PopupOpenEventArgs): void {
        if (args.type === 'QuickInfo' && args.data && (args.data as any).Id > 0) {
            args.cancel = true;
        }

        if (args.type !== 'Editor') return;
        let dialog: HTMLElement = args.element ? args.element.closest('.e-dialog') as HTMLElement : null;
        if (dialog) {
            let elementsToHide = dialog.querySelectorAll('.e-repeat-parent-row, .e-recurrenceeditor');
            elementsToHide.forEach(function (el) {
                (el as HTMLElement).style.display = 'none';
            });
        }
    }

    function onEventRendered(args: EventRenderedArgs): void {
        let currentView: View = scheduleObj.currentView;
        applyCategoryColor(args, currentView);

        let eventData: any = args.data;
        let editBtn: HTMLElement = args.element.querySelector('.edit-btn') as HTMLElement;
        let deleteBtn: HTMLElement = args.element.querySelector('.delete-btn') as HTMLElement;

        if (editBtn) {
            editBtn.addEventListener('click', function (e: Event) {
                e.stopPropagation();
                scheduleObj.openEditor(eventData, 'Save');
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', function (e: Event) {
                e.stopPropagation();
                scheduleObj.deleteEvent(eventData);
            });
        }
    }

    scheduleObj = new Schedule({
        cssClass: 'event-action-buttons',
        width: '100%',
        height: '650px',
        selectedDate: new Date(2026, 0, 16),
        views: ['Day', 'Week'],
        eventSettings: {
            dataSource: data,
            template: eventTemplate
        },
        eventRendered: onEventRendered,
        popupOpen: onPopupOpen
    });

    scheduleObj.appendTo('#Schedule');
};
