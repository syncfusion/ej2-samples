import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { applyCategoryColor } from './helper';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

/**
 *  Schedule keyboard interaction sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).zooEventsData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 1, 15),
        eventSettings: { dataSource: extend([], (dataSource as { [key: string]: Object }).zooEventsData, null, true) as Object[] },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');

    //Focus the Schedule Control (alt+j) key combination
    document.body.addEventListener('keydown', (e: KeyboardEvent) => {
        let scheduleElement: HTMLElement = document.getElementById('Schedule');
        if (e.altKey && e.keyCode === 74 && scheduleElement) {
            scheduleElement.focus();
        }
    });
};
