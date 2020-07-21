import { loadCultureFiles } from '../common/culture-loader';
import {
    Schedule, Day, Week, WorkWeek, Month, Resize, DragAndDrop, PopupOpenEventArgs, ActionEventArgs, DragEventArgs, ResizeEventArgs
} from '@syncfusion/ej2-schedule';
import { getReadOnlyEventsData } from './helper';

Schedule.Inject(Day, Week, WorkWeek, Month, Resize, DragAndDrop);

/**
 * Schedule readonly events sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = getReadOnlyEventsData();
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        eventSettings: { dataSource: data },
        views: ['Day', 'Week', 'WorkWeek', 'Month'],
        popupOpen: onPopupOpen,
        dragStop: onDragStop,
        resizeStop: onResizeStop,
        actionBegin: onActionBegin
    });
    scheduleObj.appendTo('#Schedule');

    function onDragStop(args: DragEventArgs): void {
        args.cancel = onEventCheck(args);
    }

    function onResizeStop(args: ResizeEventArgs): void {
        args.cancel = onEventCheck(args);
    }

    function onActionBegin(args: ActionEventArgs): void {
        if ((args.requestType === 'eventCreate') || args.requestType === 'eventChange') {
            args.cancel = onEventCheck(args);
        }
    }

    function onPopupOpen(args: PopupOpenEventArgs): void {
        if ((!args.target.classList.contains('e-appointment') && (args.type === 'QuickInfo')) || (args.type === 'Editor')) {
            args.cancel = onEventCheck(args);
        }
    }

    function onEventCheck(args: any): boolean {
        let eventObj: any = args.data instanceof Array ? args.data[0] : args.data;
        return (eventObj.StartTime < new Date());
    }
};
