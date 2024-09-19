import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, NavigatingEventArgs, ActionEventArgs, Resize, DragAndDrop, View } from '@syncfusion/ej2-schedule';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

/**
 * Schedule realtime binding sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let connection: HubConnection;
    let data: Object[] = <Object[]>extend([], (dataSource as any).scheduleData, null, true);
    let isHubConnected: boolean = false;
    let scheduleObj: Schedule = new Schedule({
        height: '550px',
        selectedDate: new Date(2021, 0, 10),
        eventSettings: { dataSource: data },
        created: () => {
            const url: string = 'https://ej2.syncfusion.com/aspnetcore/schedulehub/';
            connection = new HubConnectionBuilder().withUrl(url, { withCredentials: false, skipNegotiation: true, transport: HttpTransportType.WebSockets }).withAutomaticReconnect().build();
            connection.on('ReceiveData', (action: string, data: View | Object[]) => {
                if (action == 'view') {
                    scheduleObj.currentView = data as View;
                }
                if (action === 'eventCreated' || action === 'eventChanged' || action === 'eventRemoved') {
                    scheduleObj.eventSettings.dataSource = data as Object[];
                }
            });

            connection.start().then(() => { isHubConnected = true; }).catch(() => { isHubConnected = false; });
        },
        navigating: (args: NavigatingEventArgs) => {
            if (args.action == 'view' && isHubConnected) {
                connection.invoke('SendData', args.action, args.currentView);
            }
        },
        actionComplete: (args: ActionEventArgs) => {
            if (isHubConnected && (args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved')) {
                connection.invoke('SendData', args.requestType, scheduleObj.eventSettings.dataSource);
            }
        },
    });
    scheduleObj.appendTo('#Schedule');
};
