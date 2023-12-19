import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { Toast } from '@syncfusion/ej2-notifications';
import { compile } from '@syncfusion/ej2-base';
import { getReminderEvents } from './helper';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

/**
 * Schedule reminder sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let reminderInterval: number;
    let data: Record<string, any>[] = getReminderEvents();
    let scheduleObj: Schedule = new Schedule({
        height: '550px',
        timezone: 'UTC',
        eventSettings: { dataSource: data },
        created: () => {
            reminderInterval = setInterval(refreshEventReminder, 5000);
        },
        destroyed: () => {
            clearInterval(reminderInterval as number);
        }
    });
    scheduleObj.appendTo('#Schedule');
    let toastObjReminder: Toast = new Toast({
        cssClass: 'e-schedule-reminder e-toast-info',
        position: { X: 'Right', Y: 'Top' },
        newestOnTop: true,
        showCloseButton: true,
        timeOut: 0,
        target: '.e-schedule',
        animation: {
            hide: { effect: 'SlideRightOut' },
            show: { effect: 'SlideRightIn' }
        }
    });
    toastObjReminder.appendTo('#schedule-reminder');
    function refreshEventReminder() {
        let eventCollection = scheduleObj.getCurrentViewEvents();
        eventCollection.forEach((event: Record<string, any>, i: number) => {
            let dateFormat: Function = (date: Date): Date =>
                new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            const startTime: Date = dateFormat(event[scheduleObj.eventFields.startTime] as Date);
            const currentTime: Date = dateFormat(new Date(new Date().toUTCString().slice(0, -3)));
            const difference = startTime.getTime() - currentTime.getTime();
            if (startTime.getTime() >= currentTime.getTime() && difference > -1 && difference <= 5000) {
                toastObjReminder.show({
                    template: (compile(document.getElementById('reminder-template').innerHTML.trim())(event)[0] as Element).outerHTML
                });
            }
        });
    }
};
