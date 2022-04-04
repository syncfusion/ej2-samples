import { loadCultureFiles } from '../common/culture-loader';
import { TimePicker, ItemEventArgs } from '@syncfusion/ej2-calendars';

/**
 * List Formatting sample
 */

(window as any).default = (): void => {
    loadCultureFiles();

    let timeObj: TimePicker = new TimePicker({
        placeholder: "Select a time",
        value: new Date(), itemRender: itemRanderHandler,
        cssClass: 'e-custom-style',
        open: onOpen,
    });
    timeObj.appendTo('#timepicker');

    //initial time variable declaration
    let startTime: Date;
    // scrollTo value will be assigned only if the timepicker value is not null or undefined and is a valid value.
    function onOpen(args: any): void {
        // scrollTo value will be assigned only if the timepicker value is not null or undefined and is a valid value.
        if (timeObj.value && !isNaN(+timeObj.value)) {
            //assign the current value as the scrollTo value
            timeObj.scrollTo = timeObj.value;
        }
    }

    //utilizing ItemEventArgs to access the beforeItemRender event argument
    function itemRanderHandler(args: ItemEventArgs): void {
        // inner element declaration for text
        let span: HTMLElement = document.createElement('span');
        if (args.value.getHours() === 0 && args.value.getMinutes() === 0 && args.value.getSeconds() === 0) {
            //assign the initial value to the variable
            startTime = args.value;
        }
        //get the minutes details
        let minutes: number = (+args.value - +startTime) / 60000;
        //get the hours details
        let hours: number = parseInt('' + (minutes / 60), 10);
        let mins: number = (minutes % 60) / 6;
        //displayed text formation for each LI element.
        let minText: string;
        let minsText: string = ' mins';
        let hrsText: string = ' hrs';
        if (timeObj.locale !== 'en') {
            if (timeObj.locale === 'fr-CH') {
                minsText = ' minutes';
                hrsText = ' heures';
            }
            if (timeObj.locale === 'de') {
                minsText = ' minuten';
                hrsText = ' stunden';
            }
            if (timeObj.locale === 'ar') {
                minsText = ' دقيقة';
                hrsText = ' ساعة';
            }
            if (timeObj.locale === 'zh') {
                minsText = ' 分鐘';
                hrsText = ' 小時';
            }
        }
        if (minutes === 0 || minutes === 30) {
            minText = minutes + minsText;
        } else {
            minText = (mins > 0) ? ('.' + mins) : '';
        }
        span.innerHTML = ' (' + ((hours > 0) ? (hours + minText + hrsText) : ('' + minText)) + ')';

        //disable the specific time from the selection
        if ((minutes / 60) % 3 === 0) {
            //disable the time values by addeding the e-disabled class.
            args.element.classList.add('e-disabled');
        }

        //append the custom SPAN element into LI element
        args.element.appendChild(span);
    }
};