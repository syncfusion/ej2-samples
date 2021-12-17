import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Year, TimelineYear, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox, ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';

Schedule.Inject(Year, TimelineYear, Resize, DragAndDrop);

/**
 * Schedule Year view sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // Initialize schedule component
    let scheduleObj: Schedule = new Schedule({
        cssClass: 'year-view',
        width: '100%', height: '555px',
        views: [
            { option: 'Year', isSelected: true },
            { option: 'TimelineYear', displayName: 'Horizontal Timeline Year' },
            {
                option: 'TimelineYear', displayName: 'Vertical Timeline Year', orientation: 'Vertical',
                group: { resources: ['Categories'] }
            }
        ],
        resources: [{
            field: 'TaskId', title: 'Category', name: 'Categories', allowMultiple: true,
            dataSource: [
                { text: 'Nancy', id: 1, color: '#df5286' },
                { text: 'Steven', id: 2, color: '#7fa900' },
                { text: 'Robert', id: 3, color: '#ea7a57' },
                { text: 'Smith', id: 4, color: '#5978ee' },
                { text: 'Micheal', id: 5, color: '#df5286' }
            ],
            textField: 'text', idField: 'id', colorField: 'color'
        }],
        firstMonthOfYear: 0,
        monthsCount: 12,
        eventSettings: { dataSource: generateEvents() },
        eventRendered: (args: EventRenderedArgs) => {
            let eventColor: string = args.data.EventColor as string;
            if (!args.element || !eventColor) {
                return;
            } else {
                args.element.style.backgroundColor = eventColor;
            }
        }
    });
    scheduleObj.appendTo('#Schedule');

    // tslint:disable-next-line:max-func-body-length
    function generateEvents(count: number = 250, date: Date = new Date()): Record<string, any>[] {
        let names: string[] = [
            'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
            'Farewell Celebration', 'Wedding Anniversary', 'Alaska: The Last Frontier', 'Deadliest Catch', 'Sports Day',
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
        let dateCollections: Record<string, any>[] = [];
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
                EventColor: colors[n],
                TaskId: (id % 5) + 1
            });
            id++;
        }
        return dateCollections;
    }

    let months: Record<string, any>[] = [
        { text: 'January', value: 0 },
        { text: 'February', value: 1 },
        { text: 'March', value: 2 },
        { text: 'April', value: 3 },
        { text: 'May', value: 4 },
        { text: 'June', value: 5 },
        { text: 'July', value: 6 },
        { text: 'August', value: 7 },
        { text: 'September', value: 8 },
        { text: 'October', value: 9 },
        { text: 'November', value: 10 },
        { text: 'December', value: 11 }
    ];
    let firstMonthObj: DropDownList = new DropDownList({
        placeholder: 'First month of year',
        floatLabelType: 'Always',
        dataSource: months,
        popupHeight: '200px',
        fields: { text: 'text', value: 'value' },
        value: 0,
        change: (args: ChangeEventArgs) => {
            scheduleObj.firstMonthOfYear = args.value as number;
        }
    });
    firstMonthObj.appendTo('#firstMonthElement');

    let numberOfMonthsObj: NumericTextBox = new NumericTextBox({
        placeholder: 'Number of months',
        floatLabelType: 'Always',
        min: 1,
        value: 12,
        max: 24,
        format: '###.##',
        change: (args: NumericChangeEventArgs) => {
            scheduleObj.monthsCount = args.value as number;
        }
    });
    numberOfMonthsObj.appendTo('#numberOfMonthsElement');
};