import { loadCultureFiles } from '../common/culture-loader';
import { addClass } from '@syncfusion/ej2-base';
import {
    Schedule, ScheduleModel, WorkWeek, Month, ResourceDetails, PopupOpenEventArgs, ActionEventArgs, EventFieldsMapping, RenderCellEventArgs
} from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';

/**
 * schedule resources group sample
 */
Schedule.Inject(WorkWeek, Month);

(window as any).default = (): void => {
    loadCultureFiles();

    interface TemplateFunction extends Window {
        getDoctorImage?: Function;
        getDoctorName?: Function;
        getDoctorLevel?: Function;
    }

    let scheduleOptions: ScheduleModel = {
        width: '100%',
        height: '650px',
        selectedDate: new Date(2021, 3, 6),
        currentView: 'WorkWeek',
        resourceHeaderTemplate: '#resourceTemplate',
        group: {
            resources: ['Doctors']
        },
        resources: [{
            field: 'DoctorId', title: 'Doctor Name', name: 'Doctors',
            dataSource: [
                { text: 'Will Smith', id: 1, color: '#ea7a57', workDays: [1, 2, 4, 5], startHour: '08:00', endHour: '15:00' },
                { text: 'Alice', id: 2, color: 'rgb(53, 124, 210)', workDays: [1, 3, 5], startHour: '08:00', endHour: '17:00' },
                { text: 'Robson', id: 3, color: '#7fa900', startHour: '08:00', endHour: '16:00' }
            ],
            textField: 'text', idField: 'id', colorField: 'color', workDaysField: 'workDays', startHourField: 'startHour',
            endHourField: 'endHour'
        }],
        views: ['WorkWeek', 'Month'],
        eventSettings: {
            dataSource: (dataSource as any).doctorData,
            fields: {
                subject: { title: 'Service Type', name: 'Subject' },
                location: { title: 'Patient Name', name: 'Location' },
                description: { title: 'Summary', name: 'Description' },
                startTime: { title: 'From', name: 'StartTime' },
                endTime: { title: 'To', name: 'EndTime' }
            }
        },
        actionBegin: (args: ActionEventArgs) => {
            let isEventChange: boolean = (args.requestType === 'eventChange');
            if ((args.requestType === 'eventCreate' && (<Object[]>args.data).length > 0) || isEventChange) {
                let eventData: Record<string, any> = (isEventChange) ? args.data as Record<string, any> :
                    args.data[0] as Record<string, any>;
                let eventField: EventFieldsMapping = scheduleObj.eventFields;
                let startDate: Date = eventData[eventField.startTime] as Date;
                let endDate: Date = eventData[eventField.endTime] as Date;
                let resourceIndex: number = [1, 2, 3].indexOf(eventData.DoctorId as number);
                args.cancel = !isValidateTime(startDate, endDate, resourceIndex);
                if (!args.cancel) {
                    args.cancel = !scheduleObj.isSlotAvailable(startDate, endDate, resourceIndex);
                }
            }
        },
        popupOpen: (args: PopupOpenEventArgs) => {
            if (args.target && args.target.classList.contains('e-work-cells')) {
                args.cancel = !args.target.classList.contains('e-work-hours');
            }
        },
        renderCell: (args: RenderCellEventArgs) => {
            if (args.element.classList.contains('e-work-hours') || args.element.classList.contains('e-work-cells')) {
                addClass([args.element], ['willsmith', 'alice', 'robson'][parseInt(args.element.getAttribute('data-group-index'), 10)]);
            }
        }
    };

    let scheduleObj: Schedule = new Schedule(scheduleOptions, document.getElementById('Schedule'));

    function isValidateTime(startDate: Date, endDate: Date, resIndex: number): boolean {
        let resource: ResourceDetails = scheduleObj.getResourcesByIndex(resIndex);
        let startHour: number = parseInt(resource.resourceData.startHour.toString().slice(0, 2), 10);
        let endHour: number = parseInt(resource.resourceData.endHour.toString().slice(0, 2), 10);
        return (startHour <= startDate.getHours() && endHour >= endDate.getHours());
    }
    (window as TemplateFunction).getDoctorName = (value: ResourceDetails) => {
        return ((value as ResourceDetails).resourceData) ?
            (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] : value.resourceName;
    };

    (window as TemplateFunction).getDoctorImage = (value: ResourceDetails) => {
        let resourceName: string = (window as TemplateFunction).getDoctorName(value);
        return resourceName.replace(' ', '-').toLowerCase();
    };

    (window as TemplateFunction).getDoctorLevel = (value: ResourceDetails) => {
        let resourceName: string = (window as TemplateFunction).getDoctorName(value);
        return (resourceName === 'Will Smith') ? 'Cardiologist' : (resourceName === 'Alice') ? 'Neurologist' : 'Orthopedic Surgeon';
    };
};
