import { DateTimePicker, RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';
import { addClass } from '@syncfusion/ej2-base';
/**
 * Special DateTimePicker sample
 */

this.default = (): void => {
    let dateTimeInstance: DateTimePicker = new DateTimePicker({
        renderDayCell: customDates, value: new Date('1/13/2017'),
        cssClass: 'e-customStyle'
    });
    dateTimeInstance.appendTo('#datetimepicker');
};
function customDates(args: RenderDayCellEventArgs): void {
    /*Date need to be customized*/
    if (args.date.getDate() === 10) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        addClass([args.element], ['special', 'e-day', 'birthday']);
        args.element.setAttribute('title', 'Birthday !');
        args.element.appendChild(span);
    }
    if (args.date.getDate() === 15) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        addClass([args.element], ['special', 'e-day', 'farewell']);
        args.element.setAttribute('title', 'Farewell !');
        args.element.appendChild(span);

    }
    if (args.date.getDate() === 25) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        addClass([args.element], ['special', 'e-day', 'vacation']);
        args.element.setAttribute('title', 'Vacation !');
        args.element.appendChild(span);

    }
}