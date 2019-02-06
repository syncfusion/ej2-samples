import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, ScheduleModel, Week, Month, ResourceDetails, TreeViewArgs, Agenda, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';

/**
 * schedule resources group sample
 */
Schedule.Inject(Week, Month, Agenda, Resize, DragAndDrop);

(window as any).default = (): void => {
    loadCultureFiles();
    interface TemplateFunction extends Window {
        getAirlineImage?: Function;
        getAirlineName?: Function;
        getAirlineModel?: Function;
        getAirlineSeats?: Function;
    }

    let scheduleOptions: ScheduleModel = {
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 3, 1),
        views: ['Week', 'Month', 'Agenda'],
        resourceHeaderTemplate: '#restemplate',
        group: {
            resources: ['Airlines']
        },
        resources: [{
            field: 'AirlineId', title: 'Airline Name',
            name: 'Airlines', allowMultiple: true,
            dataSource: [
                { AirlineName: 'Airways 1', AirlineId: 1, AirlineColor: '#EA7A57' },
                { AirlineName: 'Airways 2', AirlineId: 2, AirlineColor: '#357cd2' },
                { AirlineName: 'Airways 3', AirlineId: 3, AirlineColor: '#7fa900' }
            ],
            textField: 'AirlineName', idField: 'AirlineId', colorField: 'AirlineColor'
        }],
        eventSettings: {
            dataSource: generateEvents(),
            fields: {
                subject: { title: 'Travel Summary', name: 'Subject' },
                location: { title: 'Source', name: 'Location' },
                description: { title: 'Comments', name: 'Description' },
                startTime: { title: 'Departure Time', name: 'StartTime' },
                endTime: { title: 'Arrival Time', name: 'EndTime' }
            }
        }
    };

    let scheduleObj: Schedule = new Schedule(scheduleOptions, document.getElementById('Schedule'));

    (window as TemplateFunction).getAirlineImage = (value: ResourceDetails | TreeViewArgs) => {
        let airlineName: string = (window as TemplateFunction).getAirlineName(value);
        return airlineName.replace(' ', '-').toLowerCase();
    };
    (window as TemplateFunction).getAirlineName = (value: ResourceDetails | TreeViewArgs) => {
        return ((value as ResourceDetails).resourceData) ?
            (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] : (value as TreeViewArgs).resourceName;
    };
    (window as TemplateFunction).getAirlineModel = (value: ResourceDetails | TreeViewArgs) => {
        let airlineName: string = (window as TemplateFunction).getAirlineName(value);
        return (airlineName === 'Airways 1') ? 'CRJ 700' : (airlineName === 'Airways 2') ? 'Airbus A330' : 'ATR 72-600';
    };
    (window as TemplateFunction).getAirlineSeats = (value: ResourceDetails | TreeViewArgs) => {
        let airlineName: string = (window as TemplateFunction).getAirlineName(value);
        return (airlineName === 'Airways 1') ? 50 : (airlineName === 'Airways 2') ? 75 : 100;
    };

    function generateEvents(): Object[] {
        let subjectCollection: string[] = ['Barcelona to Los Angeles', 'Los Angeles to Barcelona'];
        let collections: Object[] = [];
        let dataCollections: number[] = [1, 2, 3];
        let id: number = 1;
        for (let data of dataCollections) {
            let startDate: Date = new Date(2018, 3, 1);
            startDate.setMilliseconds(1000 * 60 * 60 * .5 * (data - 1));
            let lastDate: Date = new Date((+startDate) + (1000 * 60 * 60 * 24 * 30));
            for (let date: Date = startDate; date.getTime() < lastDate.getTime(); date = new Date(date.getTime() + (1000 * 60 * 60 * 5))) {
                let strDate: Date = new Date(+date);
                let endDate: Date = new Date((+strDate) + (1000 * 60 * 60 * (2.5 + (0.5 * data))));
                collections.push({
                    Id: id,
                    Subject: subjectCollection[id % 2],
                    StartTime: new Date(+strDate),
                    EndTime: new Date(+endDate),
                    AirlineId: data
                });
                id += 1;
            }
        }
        return collections;
    }
};