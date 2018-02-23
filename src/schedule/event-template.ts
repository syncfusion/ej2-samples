import { Browser, Internationalization, extend } from '@syncfusion/ej2-base';
import { Schedule, Day, Week } from '@syncfusion/ej2-schedule';
import { webinarData } from './datasource';

Schedule.Inject(Day, Week);

/**
 * Schedule event template sample
 */

this.default = () => {
    // Used in templates to get time string
    let instance: Internationalization = new Internationalization();
    (window as TemplateFunction).getTimeString = (value: Date) => {
        return instance.formatDate(value, { skeleton: 'hm' });
    };
    interface TemplateFunction extends Window {
        getTimeString?: Function;
    }

    let data: Object[] = <Object[]>extend([], webinarData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        views: Browser.isDevice ? ['Day'] : ['Week'],
        selectedDate: new Date(2018, 1, 15),
        eventSettings: {
            dataSource: data,
            template: '#apptemplate'
        }
    });
    scheduleObj.appendTo('#Schedule');
};
