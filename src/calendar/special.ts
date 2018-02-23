import { Calendar, RenderDayCellEventArgs, ChangedEventArgs } from '@syncfusion/ej2-calendars';
import { addClass } from '@syncfusion/ej2-base';
/**
 * Special Calendar sample
 */

this.default = (): void => {
    let calendar: Calendar = new Calendar({
        renderDayCell: customDates, change: valueChange
    });
    calendar.appendTo('#calendar');
};
function customDates(args: RenderDayCellEventArgs): void {
    /*Date need to be customized*/
    if (args.date.getDate() === 10) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        addClass([args.element], ['special', 'e-day', 'birthday']);
        args.element.setAttribute('title', 'Birthday !');
        args.element.setAttribute('data-val', 'Birthday !');
        args.element.appendChild(span);
    }
    if (args.date.getDate() === 15) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        addClass([args.element], ['special', 'e-day', 'farewell']);
        args.element.setAttribute('title', 'Farewell !');
        args.element.setAttribute('data-val', 'Farewell !');
        args.element.appendChild(span);

    }
    if (args.date.getDate() === 25) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        addClass([args.element], ['special', 'e-day', 'vacation']);
        args.element.setAttribute('title', 'Vacation !');
        args.element.setAttribute('data-val', 'Vacation !');
        args.element.appendChild(span);

    }
}
function valueChange(args: ChangedEventArgs): void {
    let title: string = '';
    /*Displays selected date in the label*/
    if (args.event) {
        title = (<HTMLElement>args.event.currentTarget).getAttribute('data-val');
        title = title === null ? '' : ' ( ' + title + ' )';
    }
    (<HTMLInputElement>document.getElementById('date_label')).textContent = 'Selected Value: ' + args.value.toLocaleDateString() + title;

}