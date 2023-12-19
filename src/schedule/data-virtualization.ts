import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Month, TimelineMonth, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { generateResourceData } from './helper';

/**
 * schedule timeline views virtual scrolling sample
 */

Schedule.Inject(Month, TimelineMonth, Resize, DragAndDrop);
(window as any).default = (): void => {
    loadCultureFiles();
    let date: Date = new Date(2023, 3, 1);
    let resourceData: Record<string, any>[] = generateResourceData(1, 1000, 'Resource');
    let dataManager: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/js/production/api/VirtualEventData',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    let scheduleObj: Schedule = new Schedule({
        height: '650px', width: '100%', currentView: 'TimelineMonth', readonly: true,
        views: [
            { option: 'TimelineMonth', enableLazyLoading: true },
            { option: 'Month', enableLazyLoading: true }
        ],
        group: {
            resources: ['Resources']
        },
        resources: [
            {
                field: 'ResourceId', title: 'Resource',
                name: 'Resources', dataSource: resourceData,
                textField: 'Text', idField: 'Id', colorField: 'Color'
            }
        ],
        selectedDate: new Date(date),
        eventSettings: { dataSource: dataManager }
    });

    scheduleObj.appendTo('#Schedule');
};
