import { loadCultureFiles } from '../common/culture-loader';
import { extend, Internationalization, createElement, closest, remove, addClass, removeClass } from '@syncfusion/ej2-base';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import {
    Schedule, Month, EventFieldsMapping, ActionEventArgs, ToolbarActionArgs, PopupOpenEventArgs
} from '@syncfusion/ej2-schedule';

/**
 * schedule resources group sample
 */
Schedule.Inject(Month);

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    interface TemplateFunction extends Window {
        getAirwaysName?: Function;
        getAirwaysImage?: Function;
        getFormattedTime?: Function;
    }
    let dManager: Object[] = [];
    let initialLoad: Boolean = true;
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        views: ['Month'],
        readonly: true,
        selectedDate: new Date(2018, 3, 1),
        resources: [{
            field: 'AirlineId',
            title: 'Airline',
            name: 'Airlines',
            allowMultiple: true,
            dataSource: [
                { text: 'Airways 1', id: 1 },
                { text: 'Airways 2', id: 2 },
                { text: 'Airways 3', id: 3 }
            ],
            textField: 'text', idField: 'id'
        }],
        eventSettings: {
            template: '#event-template',
            enableTooltip: true,
            tooltipTemplate: '#tooltip-template'
        },
        actionBegin: (args: ActionEventArgs & ToolbarActionArgs) => {
            if (args.requestType === 'toolbarItemRendering') {
                args.items[2].align = 'Center';
                args.items[2].suffixIcon = '';
                args.items = args.items.splice(2, 1);
            }
        },
        dataBinding: () => {
            if (initialLoad) {
                scheduleObj.eventSettings.dataSource = generateEvents(scheduleObj);
                initialLoad = false;
            }
        },
        dataBound: () => {
            let eventCollections: Object[] = scheduleObj.getCurrentViewEvents();
            eventCollections.sort((a: { [key: string]: Object }, b: { [key: string]: Object }) =>
                ((<number>a.Fare) - (<number>b.Fare)));
            let indexDate: Date = new Date((<Date>(<{ [key: string]: Object }>eventCollections[0]).StartTime).getTime());
            indexDate.setHours(0, 0, 0, 0);
            let index: number = scheduleObj.getIndexOfDate(scheduleObj.activeView.renderDates, indexDate);
            let target: HTMLElement = scheduleObj.element.querySelectorAll('.e-work-cells')[index] as HTMLElement;
            addClass([target], 'best-price');
            target.appendChild(createElement('div', { className: 'best-price', innerHTML: 'Best Price' }));
        },
        popupOpen: (args: PopupOpenEventArgs) => {
            args.cancel = true;
        }
    });
    scheduleObj.appendTo('#Schedule');

    (window as TemplateFunction).getAirwaysName = (value: number) => {
        return (value === 1) ? 'Airways 1' : (value === 2) ? 'Airways 2' : 'Airways 3';
    };
    (window as TemplateFunction).getAirwaysImage = (value: number) => {
        return (value === 1) ? 'airways-1' : (value === 2) ? 'airways-2' : 'airways-3';
    };
    (window as TemplateFunction).getFormattedTime = (date: Date) => {
        let instance: Internationalization = new Internationalization();
        return instance.formatDate(date, { skeleton: 'Hm' });
    };

    new CheckBox({ cssClass: 'e-resource e-airways-1', label: 'Airways 1', checked: true, change: onChange }, '#airways-1');
    new CheckBox({ cssClass: 'e-resource e-airways-2', label: 'Airways 2', checked: true, change: onChange }, '#airways-2');
    new CheckBox({ cssClass: 'e-resource e-airways-3', label: 'Airways 3', checked: true, change: onChange }, '#airways-3');

    function onChange(args: ChangeEventArgs): void {
        let tdElement: HTMLElement = scheduleObj.element.querySelector('.best-price:not(.e-work-cells)');
        if (tdElement) {
            removeClass([closest(tdElement, 'td')], 'best-price');
            remove(tdElement);
        }
        let scheduleData: Object[] = extend([], dManager, null, true) as Object[];
        let selectedResource: number[] = [];
        let resourceCollection: HTMLElement[] = [].slice.call(document.querySelectorAll('.e-resource'));
        resourceCollection.forEach((element: HTMLElement, index: number) => {
            if (element.getAttribute('aria-checked') === 'true') {
                selectedResource.push(index);
            }
        });
        let filteredData: Object[] = [];
        let resources: { [key: string]: Object }[] =
            scheduleObj.resourceBase.resourceCollection.slice(-1)[0].dataSource as { [key: string]: Object }[];
        for (let resource of selectedResource) {
            let data: Object[] = scheduleData.filter((event: { [key: string]: Object }) => resources[resource].id === event.AirlineId);
            filteredData = filteredData.concat(data);
        }
        filteredData = filterByFare(filteredData, scheduleObj);
        scheduleObj.eventSettings.dataSource = filteredData;
        scheduleObj.dataBind();
    }

    function filterByFare(appointments: Object[], scheduleObj: Schedule): Object[] {
        let fieldMapping: EventFieldsMapping = scheduleObj.eventFields;
        appointments.sort((object1: { [key: string]: Object }, object2: { [key: string]: Object }) => {
            let d1: number = +(object1[fieldMapping.startTime] as Date);
            let d2: number = +(object2[fieldMapping.startTime] as Date);
            let d3: number = +(object1[fieldMapping.endTime] as Date);
            let d4: number = +(object2[fieldMapping.endTime] as Date);
            return ((d1 - d2) || ((d4 - d2) - (d3 - d1)));
        });
        let renderDate: Date[] = scheduleObj.activeView.getRenderDates();
        let finalData: Object[] = [];
        for (let date of renderDate) {
            if (scheduleObj.selectedDate.getMonth() === date.getMonth()) {
                let strTime: Date = new Date(+date);
                let endTime: Date = new Date(new Date(strTime.getTime()).setHours(23, 59, 59, 59));
                let perDayData: Object[] = scheduleObj.eventBase.filterEvents(strTime, endTime, appointments);
                if (perDayData.length > 0) {
                    perDayData.sort((a: { [key: string]: Object }, b: { [key: string]: Object }) => ((<number>a.Fare) - (<number>b.Fare)));
                    finalData.push(perDayData[0]);
                }
            }
        }
        return finalData;
    }

    //custom code start 
    function generateEvents(scheduleObj: Schedule): Object[] {
        let collections: Object[] = [];
        let dataCollections: { [key: string]: Object }[] = [
            {
                Id: 100,
                StartTime: new Date(2018, 3, 1, 8, 30),
                EndTime: new Date(2018, 3, 1, 10, 0),
                AirlineId: 1
            }, {
                Id: 102,
                StartTime: new Date(2018, 3, 1, 11, 0),
                EndTime: new Date(2018, 3, 1, 12, 0),
                AirlineId: 2
            }, {
                Id: 103,
                StartTime: new Date(2018, 3, 1, 14, 0),
                EndTime: new Date(2018, 3, 1, 15, 0),
                AirlineId: 3
            }
        ];
        let start: Date = new Date(2018, 3, 1);
        let dateCollections: Date[] = Array.apply(null, { length: 30 })
            .map((value: number, index: number) => { return new Date(start.getTime() + (1000 * 60 * 60 * 24 * index)); });
        let id: number = 1;
        let day: number = 0;
        for (let date of dateCollections) {
            let resource: number = 1;
            for (let data of dataCollections) {
                let strDate: Date = new Date((<Date>data.StartTime).getTime());
                let endDate: Date = new Date((<Date>data.EndTime).getTime());
                collections.push({
                    Id: id,
                    StartTime: new Date(strDate.setDate(strDate.getDate() + day)),
                    EndTime: new Date(endDate.setDate(endDate.getDate() + day)),
                    AirlineId: resource,
                    Fare: ((Math.random() * 500) + 100).toFixed(2)
                });
                resource += 1;
                id += 1;
            }
            day += 1;
        }
        dManager = extend([], collections, null, true) as Object[];
        let filteredCollection: Object[] = filterByFare(collections, scheduleObj);
        return filteredCollection;
    }
    //custom code end 
};