import { loadCultureFiles } from '../common/culture-loader';
﻿import { DatePicker, RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';
import { addClass } from '@syncfusion/ej2-base';
/**
 * Special DatePicker sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let datepicker: DatePicker = new DatePicker({
        placeholder: "Choose a date",
        renderDayCell: customDates, value: new Date('1/13/2017'),
        cssClass: 'e-customStyle'
    });
    datepicker.appendTo('#datepicker');
};
function customDates(args: RenderDayCellEventArgs): void {
    /*Date need to be customized*/
    if (args.date.getDate() === 10) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.setAttribute('title', 'Birthday !');
        //use the imported method to add the multiple classes to the given element
        addClass([args.element], ['special', 'e-day', 'birthday']);
        args.element.firstElementChild.setAttribute('title', 'Birthday !');
        args.element.appendChild(span);
    }
    if (args.date.getDate() === 15) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.setAttribute('title', 'Farewell !');
        addClass([args.element], ['special', 'e-day', 'farewell']);
        args.element.firstElementChild.setAttribute('title', 'Farewell !');
        args.element.appendChild(span);

    }
    if (args.date.getDate() === 25) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.setAttribute('title', 'Vacation !');
        addClass([args.element], ['special', 'e-day', 'vacation']);
        args.element.firstElementChild.setAttribute('title', 'Vacation !');
        args.element.appendChild(span);

    }
}