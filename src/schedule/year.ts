import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Schedule, TimelineViews, TimelineYear, Orientation, EventRenderedArgs } from '@syncfusion/ej2-schedule';

Schedule.Inject(TimelineViews, TimelineYear);

/**
 * Schedule Year view sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // Initialize schedule component
    let scheduleObj: Schedule = new Schedule({
        width: '100%', height: '555px',
        views: [
            { option: 'TimelineYear', displayName: 'Horizontal Year' }
        ],
        eventSettings: { dataSource: generateEvents() },
        eventRendered: (args: EventRenderedArgs) => applyEventColor(args)
    });
    scheduleObj.appendTo('#Schedule');

    // Initialize DropDownList component for timezone list
    let dropDownListObject: DropDownList = new DropDownList({
        popupWidth: 180,
        change: (args: ChangeEventArgs) => {
            scheduleObj.views = [{ option: 'TimelineYear', orientation: args.value as Orientation }];
            scheduleObj.dataBind();
        }
    });
    dropDownListObject.appendTo('#year-orientation');

    // custom code start
    function generateEvents(count: number = 250, yearCount: number = 5, date: Date = new Date()): Object[] {
        let names: string[] = [
            'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
            'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
            'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
            'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
        ];
        let colors: string[] = [
            '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c',
            '#fdd835', '#748ffc', '#9775fa', '#df5286', '#7fa900',
            '#fec200', '#5978ee', '#00bdae', '#ea80fc'
        ];
        let startDate: Date = new Date(date.getFullYear() - 2, 0, 1);
        let endDate: Date = new Date(date.getFullYear() + 2, 11, 31);
        let dateCollections: Object[] = [];
        for (let a: number = 0, id: number = 1; a < count; a++) {
            let start: Date = new Date(Math.random() * (endDate.getTime() - startDate.getTime()) + startDate.getTime());
            let end: Date = new Date(new Date(start.getTime()).setHours(start.getHours() + 1));
            let nCount: number = Math.floor(Math.random() * names.length);
            let n: number = Math.floor(Math.random() * colors.length);
            dateCollections.push({
                Id: id,
                Subject: names[nCount],
                StartTime: new Date(start.getTime()),
                EndTime: new Date(end.getTime()),
                IsAllDay: (id % 10) ? true : false,
                EventColor: colors[n]
            });
            id++;
        }
        return dateCollections;
    }

    function applyEventColor(args: EventRenderedArgs): void {
        let eventColor: string = args.data.EventColor as string;
        if (!args.element || !eventColor) {
            return;
        } else {
            args.element.style.backgroundColor = eventColor;
        }
    }
    // custom code end
};