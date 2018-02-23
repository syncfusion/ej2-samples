import { Schedule, Day, Week, WorkWeek, Month, Agenda, ActionEventArgs } from '@syncfusion/ej2-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

/**
 * Schedule remote data sample
 */

this.default = () => {
    let dataManger: DataManager = new DataManager({
        url: 'http://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        selectedDate: new Date(2017, 5, 5),
        eventSettings: { dataSource: dataManger },
        readonly: true,
        actionBegin: (args: ActionEventArgs) => {
            if (args.requestType === 'viewNavigate' || args.requestType === 'dateNavigate') {
                showSpinner(scheduleObj.element);
            }
        },
        actionFailure: () => {
            hideSpinner(scheduleObj.element);
        },
        dataBound: () => {
            hideSpinner(scheduleObj.element);
        }
    });
    scheduleObj.appendTo('#Schedule');
    // create the spinner
    createSpinner({ target: scheduleObj.element });
};
