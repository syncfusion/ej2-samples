import { loadCultureFiles } from '../common/culture-loader';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Query, Predicate } from '@syncfusion/ej2-data';
import { Schedule, ScheduleModel, Day, Week, WorkWeek, Month, Agenda, Resize, MonthAgenda, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
/**
 * schedule resources sample
 */
Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, MonthAgenda, DragAndDrop, Resize);

(window as any).default = (): void => {
    loadCultureFiles();
    let ownerCollections: Object[] = [
        { OwnerText: 'Margaret', OwnerId: 1, Color: '#ea7a57' },
        { OwnerText: 'Robert', OwnerId: 2, Color: '#df5286' },
        { OwnerText: 'Laura', OwnerId: 3, Color: '#865fcf' }
    ];
    let scheduleOptions: ScheduleModel = {
        width: '100%',
        height: '650px',
        selectedDate: new Date(2021, 5, 6),
        resources: [{
            field: 'OwnerId', title: 'Owners',
            name: 'Owners', allowMultiple: true,
            dataSource: ownerCollections,
            textField: 'OwnerText', idField: 'OwnerId', colorField: 'Color'
        }],
        eventSettings: { dataSource: (dataSource as Record<string, any>).resourceSampleData }
    };

    let scheduleObj: Schedule = new Schedule(scheduleOptions, document.getElementById('schedule'));

    let ownerOneObj: CheckBox = new CheckBox({ cssClass: 'margaret', value: '1', label: 'Margaret', checked: true, change: onChange });
    ownerOneObj.appendTo('#margaret');
    let ownerTwoObj: CheckBox = new CheckBox({ cssClass: 'robert', value: '2', label: 'Robert', checked: true, change: onChange });
    ownerTwoObj.appendTo('#robert');
    let ownerThreeObj: CheckBox = new CheckBox({ cssClass: 'laura', value: '3', label: 'Laura', checked: true, change: onChange });
    ownerThreeObj.appendTo('#laura');

    function onChange(): void {
        let predicate: Predicate;
        let checkBoxes: CheckBox[] = [ownerOneObj, ownerTwoObj, ownerThreeObj];
        checkBoxes.forEach((checkBoxObj: CheckBox) => {
            if (checkBoxObj.checked) {
                if (predicate) {
                    predicate = predicate.or('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
                } else {
                    predicate = new Predicate('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
                }
            }
        });
        scheduleObj.eventSettings.query = new Query().where(predicate);
    }
};
