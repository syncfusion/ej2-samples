import { loadCultureFiles } from '../common/culture-loader';
import { Query, DataManager, ReturnOption, Predicate } from '@syncfusion/ej2-data';
import { Grid } from '@syncfusion/ej2-grids';
import { Input } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import { DatePicker } from '@syncfusion/ej2-calendars';
import {
    Schedule, ScheduleModel, Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, EJ2Instance
} from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';

/**
 * Sample for searching appointments
 */

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let scheduleOptions: ScheduleModel = {
        width: '100%',
        height: '550px',
        selectedDate: new Date(2021, 0, 10),
        eventSettings: {
            dataSource: (dataSource as Record<string, any>).scheduleData,
        }
    };

    let scheduleObj: Schedule = new Schedule(scheduleOptions, document.getElementById('schedule'));

    Input.createInput({
        element: document.getElementById('events-search') as HTMLInputElement,
        properties: { placeholder: 'Enter the Search text' }
    });

    Input.createInput({
        element: document.getElementById('searchEventName') as HTMLInputElement,
        properties: { placeholder: 'Subject' }
    });

    Input.createInput({
        element: document.getElementById('searchEventLocation') as HTMLInputElement,
        properties: { placeholder: 'Location' }
    });

    let startScheduleDate: DatePicker = new DatePicker({ value: null, showClearButton: false, placeholder: 'Start Date' });
    startScheduleDate.appendTo('#startScheduleDate');

    let endScheduleDate: DatePicker = new DatePicker({ value: null, showClearButton: false, placeholder: 'End Date' });
    endScheduleDate.appendTo('#endScheduleDate');

    let searchButton: Button = new Button();
    searchButton.appendTo('#seperateSearch');
    document.getElementById('seperateSearch').onclick = () => {
        let searchObj: { [key: string]: any }[] = [];
        let startDate: Date;
        let endDate: Date;
        let formElements: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.event-search .search-field'));
        formElements.forEach((node: HTMLInputElement) => {
            let fieldOperator: string;
            let predicateCondition: string;
            let fieldValue: string | Date;
            let fieldInstance: DatePicker;
            if (node.value && node.value !== '' && !node.classList.contains('e-datepicker')) {
                fieldOperator = 'contains';
                predicateCondition = 'or';
                fieldValue = node.value;
                searchObj.push({
                    field: node.name, operator: fieldOperator, value: fieldValue, predicate: predicateCondition,
                    matchcase: true
                });
            }
            if (node.classList.contains('e-datepicker') && (((node as any) as EJ2Instance).ej2_instances[0] as DatePicker).value) {
                fieldInstance = ((node as any) as EJ2Instance).ej2_instances[0] as DatePicker;
                fieldValue = fieldInstance.value;
                if (node.classList.contains('e-start-time')) {
                    fieldOperator = 'greaterthanorequal';
                    predicateCondition = 'and';
                    startDate = new Date(+fieldValue);
                } else {
                    fieldOperator = 'lessthanorequal';
                    predicateCondition = 'and';
                    let date: Date = new Date(+fieldInstance.value);
                    fieldValue = new Date(date.setDate(date.getDate() + 1));
                    endDate = fieldValue;
                }
                searchObj.push({
                    field: node.name, operator: fieldOperator, value: fieldValue, predicate: predicateCondition,
                    matchcase: false
                });
            }
        });
        if (searchObj.length > 0) {
            let filterCondition: { [key: string]: any } = searchObj[0];
            let predicate: Predicate = new Predicate(
                filterCondition.field, filterCondition.operator, filterCondition.value, filterCondition.matchcase);
            for (let i: number = 1; i < searchObj.length; i++) {
                predicate = predicate.and(searchObj[i].field, searchObj[i].operator, searchObj[i].value, searchObj[i].matchcase);
            }
            let result: Object[] = new DataManager(scheduleObj.getEvents(startDate, endDate, true)).
                executeLocal(new Query().where(predicate));
            showSearchEvents('show', result);
        } else {
            showSearchEvents('hide');
        }
    };

    let clearButton: Button = new Button();
    clearButton.appendTo('#clear');
    document.getElementById('clear').onclick = () => {
        document.getElementById('schedule').style.display = 'block';
        (document.getElementById('form-search') as HTMLFormElement).reset();
        showSearchEvents('hide');
    };

    document.getElementById('events-search').onkeyup = (args: KeyboardEvent) => {
        let searchString: string = (args.target as HTMLInputElement).value;
        if (searchString !== '') {
            new DataManager(scheduleObj.getEvents(null, null, true)).executeQuery(new Query().
                search(searchString, ['Subject', 'Location', 'Description'], null, true, true)).then((e: ReturnOption) => {
                    if ((<Record<string, any>[]>e.result).length > 0) {
                        showSearchEvents('show', e.result);
                    } else {
                        showSearchEvents('hide');
                    }
                });
        } else {
            showSearchEvents('hide');
        }
    };

    function showSearchEvents(type: string, data?: Record<string, any>): void {
        if (type === 'show') {
            if (document.getElementById('grid').classList.contains('e-grid')) {
                let gridObj: Grid = (document.querySelector('#grid') as EJ2Instance).ej2_instances[0] as Grid;
                gridObj.dataSource = data;
                gridObj.dataBind();
            } else {
                let grid: Grid = new Grid({
                    dataSource: data,
                    height: 505,
                    width: 'auto',
                    columns: [
                        { field: 'Subject', headerText: 'Subject', width: 120 },
                        { field: 'Location', headerText: 'Location', width: 120 },
                        { field: 'StartTime', headerText: 'StartTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
                        { field: 'EndTime', headerText: 'EndTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
                    ]
                });
                grid.appendTo(document.querySelector('#grid') as HTMLElement);
                scheduleObj.element.style.display = 'none';
            }
        } else {
            let gridObj: Record<string, any>[] = (document.querySelector('#grid') as EJ2Instance).ej2_instances;
            if (gridObj && gridObj.length > 0 && !(gridObj[0] as Grid).isDestroyed) {
                (gridObj[0] as Grid).destroy();
            }
            scheduleObj.element.style.display = 'block';
        }
    }
};
