import { Calendar, RenderDayCellEventArgs, ChangedEventArgs } from '@syncfusion/ej2-calendars';
/**
 * Special calendar sample
 */

this.default = (): void => {
    let calendar: Calendar = new Calendar({
        renderDayCell: customDates, change: valueChange
    });
    calendar.appendTo('#calendar');
};
function customDates(args: RenderDayCellEventArgs): void {
    if (args.date.getDate() === 10) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.appendChild(span);
        args.element.setAttribute('title', 'Birthday !');
        args.element.setAttribute('data-val', 'Birthday !');
    }
    if (args.date.getDate() === 15) {
        args.element.className = 'special';
        args.element.setAttribute('title', 'Farewell');
        args.element.setAttribute('data-val', 'Farewell !');
    }
    if (args.date.getDate() === 20) {
        args.element.className = 'daycell';
    }
}
function valueChange(args: ChangedEventArgs): void {
    let title: string = (<HTMLElement>event.currentTarget).querySelector('.e-link').getAttribute('data-val');
    title = title == null ? '' : ' ( ' + title + ' )';
    (<HTMLInputElement>document.getElementById('date_label')).textContent = 'Selected Value: ' + args.value.toLocaleDateString() + title;
}