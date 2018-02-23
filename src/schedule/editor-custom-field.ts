import { createElement, extend } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, PopupOpenEventArgs, EventRenderedArgs } from '@syncfusion/ej2-schedule';
import { eventsData, applyCategoryColor } from './datasource';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

/**
 *  Schedule editor custom fields sample
 */

this.default = () => {
    let data: Object[] = <Object[]>extend([], eventsData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        selectedDate: new Date(2018, 1, 15),
        eventSettings: {
            dataSource: data
        },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView),
        popupOpen: (args: PopupOpenEventArgs) => {
            if (args.type === 'Editor') {
                // Create required custom elements in initial time
                if (!args.element.querySelector('.custom-field-row')) {
                    let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
                    let formElement: HTMLElement = args.element.querySelector('.e-schedule-form');
                    formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
                    let container: HTMLElement = createElement('div', { className: 'custom-field-container' });
                    let inputEle: HTMLInputElement = createElement('input', {
                        className: 'e-field', attrs: { name: 'EventType' }
                    }) as HTMLInputElement;
                    container.appendChild(inputEle);
                    row.appendChild(container);
                    let drowDownList: DropDownList = new DropDownList({
                        dataSource: [
                            { text: 'Public Event', value: 'public-event' },
                            { text: 'Maintenance', value: 'maintenance' },
                            { text: 'Commercial Event', value: 'commercial-event' },
                            { text: 'Family Event', value: 'family-event' }
                        ],
                        fields: { text: 'text', value: 'value' },
                        value: (<{ [key: string]: Object }>(args.data)).EventType as string,
                        floatLabelType: 'Always', placeholder: 'Event Type'
                    });
                    drowDownList.appendTo(inputEle);
                    inputEle.setAttribute('name', 'EventType');
                }
            }
        }
    });
    scheduleObj.appendTo('#Schedule');
};
