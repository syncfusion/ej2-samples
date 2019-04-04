import { loadCultureFiles } from '../common/culture-loader';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);
import { Calendar, ChangedEventArgs, RenderDayCellEventArgs, Islamic } from '@syncfusion/ej2-calendars';
import { addClass } from '@syncfusion/ej2-base';
Calendar.Inject(Islamic);

/**
 * Islamic Calendar sample
 */

(window as any).default = (): void => {
    loadCultureFiles();

    let hijriCalendar: Calendar = new Calendar({
        change: valueChange,
        renderDayCell: customDates,
        calendarMode: 'Islamic'
    });
    hijriCalendar.appendTo('#calendar');
};

function valueChange(args: ChangedEventArgs): void {
  (<HTMLInputElement>document.getElementById('date_label')).textContent = 'Selected Value: ' +
    this.globalize.formatDate(args.value, { type: 'date', format: 'ddMMMyyyy', calendar: 'islamic' });
}

function customDates(args: RenderDayCellEventArgs): void {
  /*Date need to be disabled*/
  if ( args.date.getDate() === 12 || args.date.getDate() === 17 || args.date.getDate() === 28) {
    args.isDisabled = true;
  }
  /*Dates need to be customized*/
  if (args.date.getDate() === 13) {
    let span: HTMLElement;
    span = document.createElement('span');
    args.element.children[0].className += 'e-day sf-icon-cup highlight';
    addClass([args.element], ['special', 'e-day', 'dinner']);
    args.element.setAttribute('data-val', ' Dinner !');
    args.element.appendChild(span);
  }
  if (args.date.getDate() === 23) {
    let span: HTMLElement;
    span = document.createElement('span');
    args.element.children[0].className += 'e-day sf-icon-start highlight';
    span.setAttribute('class', 'sx !');
    //use the imported method to add the multiple classes to the given element
    addClass([args.element], ['special', 'e-day', 'holiday']);
    args.element.setAttribute('data-val', ' Holiday !');
    args.element.appendChild(span);
  }
}
