import { Schedule, Day, Week, WorkWeek, Month, RenderCellEventArgs, EventRenderedArgs } from '@syncfusion/ej2-schedule';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { scheduleData, applyCategoryColor } from './datasource';

Schedule.Inject(Day, Week, WorkWeek, Month);

/**
 * Schedule date header template sample
 */

this.default = () => {
    let instance: Internationalization = new Internationalization();
    (window as TemplateFunction).getDateHeaderText = (value: Date) => {
        return instance.formatDate(value, { skeleton: 'Ed' });
    };
    let getWeather: Function = (value: Date) => {
        switch (value.getDay()) {
            case 0:
                return '<img class="weather-image" src="src/schedule/images/weather-clear.svg"/><div class="weather-text">25°C</div>';
            case 1:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/><div class="weather-text">18°C</div>';
            case 2:
                return '<img class="weather-image" src="src/schedule/images/weather-rain.svg"/><div class="weather-text">10°C</div>';
            case 3:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/><div class="weather-text">16°C</div>';
            case 4:
                return '<img class="weather-image" src="src/schedule/images/weather-rain.svg"/><div class="weather-text">8°C</div>';
            case 5:
                return '<img class="weather-image" src="src/schedule/images/weather-clear.svg"/><div class="weather-text">27°C</div>';
            case 6:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/><div class="weather-text">17°C</div>';
            default:
                return null;
        }
    };
    (window as TemplateFunction).getWeather = getWeather;
    interface TemplateFunction extends Window {
        getDateHeaderText?: Function;
        getWeather?: Function;
    }

    let data: Object[] = <Object[]>extend([], scheduleData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        dateHeaderTemplate: '<div class="date-text">${getDateHeaderText(data.date)}</div>${getWeather(data.date)}',
        views: ['Day', 'Week', 'WorkWeek', 'Month'],
        selectedDate: new Date(2018, 1, 15),
        eventSettings: { dataSource: data },
        cssClass: 'schedule-date-header-template',
        renderCell: (args: RenderCellEventArgs) => {
            if (args.elementType === 'monthCells') {
                let ele: Element = document.createElement('div');
                ele.innerHTML = getWeather(args.date);
                (args.element).appendChild(ele.firstChild);
            }
        },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');
};
